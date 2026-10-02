import { application } from "@/lib/content";

type Lead = {
  // "start" = name + email from step 1; "complete" = the full application.
  stage: "start" | "complete";
  source: "hero" | "walkthrough";
  firstName: string;
  email: string;
  lastName?: string;
  phone?: string;
  taxFocus?: string;
  designation?: string;
  challenge?: string;
  onlinePresence?: string;
  commitment?: string;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function text(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

// Normalizes a US phone number to xxx-xxx-xxxx; returns "" when it is not 10 digits.
function phoneNumber(value: unknown) {
  const digits = text(value, 40).replace(/\D/g, "").replace(/^1(?=\d{10})/, "");
  return digits.length === 10
    ? `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`
    : "";
}

function parseLead(body: Record<string, unknown>): Lead | string {
  const lead: Lead = {
    stage: body.stage === "start" ? "start" : "complete",
    source: body.source === "hero" ? "hero" : "walkthrough",
    firstName: text(body.firstName, 100),
    email: text(body.email, 254).toLowerCase(),
  };

  if (!lead.firstName) return "First name is required.";
  if (!EMAIL.test(lead.email)) return "A valid work email is required.";
  if (lead.stage === "start") return lead;

  lead.lastName = text(body.lastName, 100);
  lead.phone = phoneNumber(body.phone);
  lead.taxFocus = text(body.taxFocus, 100);
  lead.designation = text(body.designation, 100);
  lead.challenge = text(body.challenge, 2000) || undefined;
  lead.onlinePresence = text(body.onlinePresence, 500) || undefined;
  lead.commitment = text(body.commitment, 200);

  if (!lead.lastName) return "Last name is required.";
  if (!lead.phone) return "Please enter a phone number in the format xxx-xxx-xxxx.";
  if (!application.taxFocus.options.includes(lead.taxFocus)) return "Please select your tax focus.";
  if (!application.designation.options.includes(lead.designation)) {
    return "Please select your professional designation.";
  }
  if (!application.commitment.options.includes(lead.commitment)) {
    return "Please select your commitment level.";
  }
  return lead;
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real visitors never see or fill this field.
  if (text(body.website, 200)) {
    return Response.json({ ok: true });
  }

  const lead = parseLead(body);
  if (typeof lead === "string") {
    return Response.json({ ok: false, error: lead }, { status: 422 });
  }

  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (!webhook) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[walkthrough] LEAD_WEBHOOK_URL not set; lead not forwarded:", lead);
      return Response.json({ ok: true });
    }
    console.error("[walkthrough] LEAD_WEBHOOK_URL is not configured.");
    return Response.json(
      { ok: false, error: "We couldn't send your request right now." },
      { status: 503 },
    );
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.LEAD_WEBHOOK_SECRET
          ? { Authorization: `Bearer ${process.env.LEAD_WEBHOOK_SECRET}` }
          : {}),
      },
      body: JSON.stringify({
        ...lead,
        page: "offer2",
        submittedAt: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) throw new Error(`CRM responded ${res.status}`);
  } catch (error) {
    console.error("[walkthrough] Failed to forward lead:", error);
    return Response.json(
      { ok: false, error: "We couldn't send your request right now." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
