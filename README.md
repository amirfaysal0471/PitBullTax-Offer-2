# PitBullTax — Offer 2 landing page

Landing page for **offer2.pitbulltax.com** (tax resolution platform),
built with Next.js 16 (App Router), React 19 and Tailwind CSS 4.

Package: `pitbulltax-offer-2` · Repo: https://github.com/amirfaysal0471/PitBullTax-Offer-2
Sister project: `../Offer-1` (offer.pitbulltax.com, IRS transcript delivery) is a separate repo.
Offer 2 started as a copy of Offer 1; the two codebases are now independent.

**Live:** https://pitbulltax-offer-2.vercel.app

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3001 (Offer 1 uses 3000)
```

Other scripts: `npm run build`, `npm start`, `npm run lint`, `npm run typecheck`,
and `npm run check` (typecheck + lint).

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `LEAD_WEBHOOK_URL` | Production | CRM / lead-routing webhook that receives walkthrough form submissions. Without it, production returns an error to the visitor; development only logs the lead. |
| `LEAD_WEBHOOK_SECRET` | No | Sent as `Authorization: Bearer <secret>` to the webhook. |

## Project structure

```
app/
  layout.tsx                 # fonts, metadata
  page.tsx                   # section order of the landing page
  globals.css                # design tokens & shared utility classes
  api/walkthrough/route.ts   # validates form submissions, forwards to the CRM
components/
  layout/                    # header, footer
  sections/                  # one component per page section, in page order
  forms/walkthrough-form.tsx # booking form (compact in the hero, full in #walkthrough)
  ui/                        # small shared pieces: logo, video, eyebrow
lib/content.ts               # all page copy, links and image paths (offer2 copy from the content handoff)
public/
  brand/                     # logo
  screens/                   # sanitized product screenshots
  steps/                     # "How it works" step images
```

Page copy lives in `lib/content.ts`; edit text there rather than in the components.

## Lead payload

`POST /api/walkthrough` forwards JSON like:

```json
{
  "source": "walkthrough",
  "firstName": "…",
  "lastName": "…",
  "email": "…",
  "phone": "…",
  "state": "…",
  "professionalType": "…",
  "comments": "…",
  "page": "offer2",
  "submittedAt": "2026-10-01T12:00:00.000Z"
}
```

`source` is `hero` (short form: name, email, phone) or `walkthrough` (full form).
`page` is always `offer2`, so the CRM can tell these leads apart from Offer 1 (`offer`).

## Differences from Offer 1

- All copy follows the OFFER2 blocks of the content handoff (tax resolution focus).
- Section 08 is an interactive five-stage case workflow (`components/sections/case-journey.tsx`) instead of the CSED calculator.
- The transcript example uses case-oriented legend tones (account event, review point, client question, next step) and lives at `#irs-records`; the nav "Case workflow" link points to `#case-workflow`.
- Hero visual is the Step-by-Step Workflow case overview.
- Light "software" look, like the existing offer2.pitbulltax.com: red top bar, white header with the dark-lettered logo
  (`public/brand/pitbulltax-software-dark.png`), light hero with a red underline swoosh, pill buttons and rounder cards.
  The platform section stays as the one dark band.

## Before launch

- Set `LEAD_WEBHOOK_URL` in the hosting environment.
- Tax subject-matter review of the transcript example codes and descriptions.
- Confirm the case workflow stage descriptions and tool names (`caseJourney` in `lib/content.ts`).
- Confirm all screenshots contain demo data only.
