"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowLeft, ArrowRight, Check, Loader2, Lock, X } from "lucide-react";

import { cn } from "cn";
import { application, site } from "@/lib/content";

const fieldClass =
  "h-11 w-full rounded-lg border border-input bg-white px-3 text-[0.9375rem] text-text placeholder:text-text-3 focus-visible:border-red focus-visible:ring-2 focus-visible:ring-red/15 focus-visible:outline-none";
const labelClass =
  "block text-[0.875rem] leading-[1.45] font-semibold text-text";

// Formats US phone input as xxx-xxx-xxxx, the format the CRM expects.
function formatPhone(value: string) {
  const digits = value
    .replace(/\D/g, "")
    .replace(/^1(?=\d{10})/, "")
    .slice(0, 10);
  return [digits.slice(0, 3), digits.slice(3, 6), digits.slice(6)]
    .filter(Boolean)
    .join("-");
}

type WalkthroughFormProps = {
  title: string;
  helper: string;
  submit: string;
  note: string;
  success: string;
  compact?: boolean;
};

/**
 * Two-step application: name and email first (sent right away as a started
 * lead, like the live offer2 popup), then the practice questions. The compact
 * hero form shows step 2 in a dialog so the hero stays short; the full form
 * keeps both steps in the same card.
 */
export function WalkthroughForm({
  title,
  helper,
  submit,
  note,
  success,
  compact = false,
}: WalkthroughFormProps) {
  const id = useId();
  const formId = `${id}-form`;
  const form = useRef<HTMLFormElement>(null);
  const [step, setStep] = useState<1 | 2>(1);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle",
  );
  const [error, setError] = useState("");
  const source = compact ? "hero" : "walkthrough";
  const dialog = compact && step === 2;
  const moved = useRef(false);

  // Move focus into the newly shown step (not on first render).
  useEffect(() => {
    if (!moved.current) {
      moved.current = true;
      return;
    }
    document
      .querySelector<HTMLInputElement>(
        `[data-form='${formId}'][data-step='${step}'] input`,
      )
      ?.focus();
  }, [step, formId]);

  // While the dialog is open: lock page scroll and close on Escape.
  useEffect(() => {
    if (!dialog) return;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setStep(1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [dialog]);

  async function post(body: Record<string, unknown>) {
    console.log("[walkthrough] submit", body);
    const res = await fetch("/api/walkthrough", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const json: { ok?: boolean; error?: string } = await res
      .json()
      .catch(() => ({}));
    console.log("[walkthrough] response", res.status, json);
    if (!res.ok || !json.ok) throw new Error(json.error ?? "");
  }

  function onContinue() {
    const el = form.current;
    if (!el) return;
    const fields = [
      ...el.querySelectorAll<HTMLInputElement>("[data-step='1'] input"),
    ];
    if (!fields.every((field) => field.reportValidity())) return;

    const data = Object.fromEntries(new FormData(el));
    // Capture the started lead without making the visitor wait for it.
    post({
      stage: "start",
      source,
      firstName: data.firstName,
      email: data.email,
      website: data.website,
    }).catch(() => {});
    setError("");
    setStatus("idle");
    setStep(2);
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step === 1) {
      onContinue();
      return;
    }
    setStatus("sending");
    setError("");
    try {
      await post({
        ...Object.fromEntries(new FormData(event.currentTarget)),
        stage: "complete",
        source,
      });
      setStatus("done");
    } catch (err) {
      setError(err instanceof Error && err.message ? err.message : "");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div
        role="status"
        className={cn(
          "relative flex flex-col items-center justify-center gap-4 rounded-2xl border border-line bg-white text-center shadow-[0_30px_70px_-20px_rgba(11,18,32,.35)]",
          compact ? "min-h-[22rem] p-8" : "min-h-[32rem] p-10",
        )}
      >
        <span className="flex size-14 items-center justify-center rounded-full bg-red-soft text-red">
          <Check className="size-7" strokeWidth={3} />
        </span>
        <p className="max-w-xs text-[0.9375rem] leading-[1.6] text-text-2">
          {success}
        </p>
      </div>
    );
  }

  const progress = (
    <>
      <div className="flex items-center justify-between gap-4">
        <p className="mono-xs text-text-3 uppercase">
          {application.step} {step} {application.of} 2
        </p>
        {step === 2 ? (
          <button
            type="button"
            onClick={() => setStep(1)}
            className="flex items-center gap-1.5 text-[0.8125rem] font-semibold text-text-2 hover:text-red"
          >
            <ArrowLeft className="size-3.5" />
            {application.back}
          </button>
        ) : null}
      </div>
      <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-paper-2">
        <div
          className="h-full rounded-full bg-red transition-[width] duration-300"
          style={{ width: step === 1 ? "50%" : "100%" }}
        />
      </div>
    </>
  );

  const errorBox =
    status === "error" ? (
      <p
        role="alert"
        className="mt-5 rounded-lg border border-red/30 bg-red-soft px-3.5 py-3 text-[0.875rem] leading-[1.5] text-red"
      >
        {error || "We couldn't send your request right now."} Please try again
        or call{" "}
        <a
          href={site.phoneHref}
          className="font-semibold underline underline-offset-2"
        >
          {site.phone}
        </a>
        .
      </p>
    ) : null;

  const footer = (
    <>
      <p className="mt-3 flex items-center justify-center gap-1.5 text-[0.75rem] text-text-3">
        <Lock aria-hidden="true" className="size-3" />
        {application.secure}
      </p>
      <p className="mt-3 text-[0.8125rem] leading-[1.5] text-text-3">
        {note}{" "}
        <a
          href={site.privacyHref}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-text"
        >
          See our Privacy Policy.
        </a>
      </p>
    </>
  );

  const stepTwo = (
    <div
      data-form={formId}
      data-step="2"
      hidden={step !== 2}
      className="mt-6 grid gap-5"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          id={`${id}-last`}
          name="lastName"
          form={formId}
          label="Last name"
          autoComplete="family-name"
          placeholder="Rivera"
          required={step === 2}
        />
        <TextField
          id={`${id}-phone`}
          name="phone"
          form={formId}
          label="Phone"
          type="tel"
          autoComplete="tel"
          inputMode="numeric"
          placeholder="555-555-0123"
          pattern="\d{3}-\d{3}-\d{4}"
          title="Phone number in the format xxx-xxx-xxxx"
          onInput={(event) => {
            event.currentTarget.value = formatPhone(event.currentTarget.value);
          }}
          required={step === 2}
        />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField
          id={`${id}-focus`}
          name="taxFocus"
          form={formId}
          label={application.taxFocus.label}
          options={application.taxFocus.options}
          placeholder={application.selectPlaceholder}
          required={step === 2}
        />
        <SelectField
          id={`${id}-designation`}
          name="designation"
          form={formId}
          label={application.designation.label}
          options={application.designation.options}
          placeholder={application.selectPlaceholder}
          required={step === 2}
        />
      </div>
      <TextField
        id={`${id}-challenge`}
        name="challenge"
        form={formId}
        label={application.challenge.label}
        placeholder={application.answerPlaceholder}
      />
      <TextField
        id={`${id}-online`}
        name="onlinePresence"
        form={formId}
        label={application.onlinePresence.label}
        placeholder={application.answerPlaceholder}
      />
      <SelectField
        id={`${id}-commitment`}
        name="commitment"
        form={formId}
        label={application.commitment.label}
        options={application.commitment.options}
        placeholder={application.selectPlaceholder}
        required={step === 2}
      />

      {errorBox}

      <button
        type="submit"
        form={formId}
        disabled={status === "sending"}
        className="btn-red mt-1 w-full"
      >
        {status === "sending" ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Sending
          </>
        ) : (
          <>
            {submit}
            <ArrowRight className="size-4" />
          </>
        )}
      </button>
    </div>
  );

  return (
    <form
      ref={form}
      id={formId}
      onSubmit={onSubmit}
      noValidate={step === 1}
      className={cn(
        "relative rounded-2xl border border-line bg-white shadow-[0_30px_70px_-20px_rgba(11,18,32,.35)]",
        compact ? "p-6" : "p-6 sm:p-8",
      )}
    >
      {/* Step 1 (the compact form keeps it visible behind the dialog) */}
      <div hidden={step === 2 && !compact}>
        {compact && step === 2 ? null : progress}
        <h3
          className={cn(
            "font-display font-extrabold tracking-[-0.025em] text-text",
            compact ? "mt-5 text-[1.25rem]" : "mt-5 text-[1.5rem]",
          )}
        >
          {title}
        </h3>
        <p className="mt-1.5 text-[0.9375rem] leading-[1.5] text-text-2">
          {helper}
        </p>

        <div
          data-form={formId}
          data-step="1"
          className={cn("mt-5 grid", compact ? "gap-4" : "gap-5")}
        >
          <TextField
            id={`${id}-first`}
            name="firstName"
            label="First name"
            autoComplete="given-name"
            placeholder="Jordan"
            required
          />
          <TextField
            id={`${id}-email`}
            name="email"
            label="Work email"
            type="email"
            autoComplete="email"
            placeholder="jordan@yourfirm.com"
            required
          />
        </div>

        {step === 1 ? errorBox : null}

        <button
          type="submit"
          className={cn("btn-red w-full", compact ? "mt-6" : "mt-7")}
        >
          {application.continue}
          <ArrowRight className="size-4" />
        </button>
        {footer}
      </div>

      {/* Step 2: a dialog for the compact hero form, inline for the full form */}
      {compact ? (
        dialog &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-ink/60 p-4 backdrop-blur-sm sm:items-center sm:p-6"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setStep(1);
            }}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby={`${id}-dialog-title`}
              className="relative my-auto w-full max-w-2xl rounded-2xl bg-white p-6 shadow-[0_40px_100px_-20px_rgba(0,0,0,.5)] sm:p-8"
            >
              <button
                type="button"
                onClick={() => setStep(1)}
                aria-label="Close"
                className="absolute top-4 right-4 flex size-9 items-center justify-center rounded-full bg-paper text-text-2 hover:bg-paper-2"
              >
                <X className="size-4" />
              </button>
              <div className="pr-10">{progress}</div>
              <h3
                id={`${id}-dialog-title`}
                className="mt-5 font-display text-[1.5rem] leading-[1.15] font-extrabold tracking-[-0.025em] text-text"
              >
                {application.step2Title}
              </h3>
              <p className="mt-2 text-[0.9375rem] leading-[1.5] text-text-2">
                {application.step2Helper}
              </p>
              {stepTwo}
              <p className="mt-3 flex items-center justify-center gap-1.5 text-[0.75rem] text-text-3">
                <Lock aria-hidden="true" className="size-3" />
                {application.secure}
              </p>
            </div>
          </div>,
          document.body,
        )
      ) : (
        <div hidden={step !== 2}>
          {progress}
          <h3 className="mt-5 font-display text-[1.5rem] leading-[1.15] font-extrabold tracking-[-0.025em] text-text">
            {application.step2Title}
          </h3>
          <p className="mt-2 text-[0.9375rem] leading-[1.5] text-text-2">
            {application.step2Helper}
          </p>
          {stepTwo}
          {footer}
        </div>
      )}

      {/* Honeypot for bots; hidden from people and assistive tech. */}
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] size-px overflow-hidden"
      >
        <label htmlFor={`${id}-website`}>Website</label>
        <input
          id={`${id}-website`}
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
    </form>
  );
}

function TextField({
  id,
  label,
  ...props
}: {
  id: string;
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className={cn(labelClass, "mb-2")}>
        {label}
      </label>
      <input id={id} className={cn(fieldClass, "mt-auto")} {...props} />
    </div>
  );
}

function SelectField({
  id,
  label,
  options,
  placeholder = "Select one",
  ...props
}: {
  id: string;
  label: string;
  options: string[];
  placeholder?: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className={cn(labelClass, "mb-2")}>
        {label}
      </label>
      <select
        id={id}
        defaultValue=""
        className={cn(fieldClass, "mt-auto truncate pr-8")}
        {...props}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
