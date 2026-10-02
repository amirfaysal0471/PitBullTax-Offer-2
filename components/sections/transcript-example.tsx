"use client";

import { useState } from "react";
import { ArrowRight, ChevronRight } from "lucide-react";

import { cn } from "cn";
import { transcriptExample, type EventTone } from "@/lib/content";

const toneDot: Record<EventTone, string> = {
  event: "bg-slate-400",
  review: "bg-amber-400",
  question: "bg-sky-400",
  next: "bg-red",
};

const toneLabel = Object.fromEntries(
  transcriptExample.legend.map((item) => [item.tone, item.label]),
) as Record<EventTone, string>;

export function TranscriptExample() {
  const { events } = transcriptExample;
  const [active, setActive] = useState(events.length - 1);
  const event = events[active];

  return (
    <section id="irs-records" className="scroll-mt-24 bg-white py-20 lg:py-24">
      <div className="container-page">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="display text-[2rem] leading-[1.05] text-text sm:text-[2.5rem]">
              {transcriptExample.title}
            </h2>
            <p className="mt-4 text-[1.0625rem] leading-[1.6] text-text-2">{transcriptExample.subtitle}</p>
          </div>
          <ul className="flex flex-wrap gap-2 lg:max-w-sm lg:justify-end">
            {transcriptExample.legend.map((item) => (
              <li
                key={item.label}
                className="flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-[0.8125rem] text-text-2"
              >
                <span className={cn("size-2 rounded-full", toneDot[item.tone])} />
                {item.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 grid grid-cols-[minmax(0,1fr)] overflow-hidden rounded-2xl border border-line shadow-[0_30px_70px_-35px_rgba(11,18,32,.45)] lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          {/* Event list */}
          <ol className="divide-y divide-line bg-white">
            {events.map((item, i) => {
              const isActive = i === active;
              return (
                <li key={item.code}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-pressed={isActive}
                    className={cn(
                      "flex w-full items-center gap-4 px-5 py-4 text-left transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-red sm:px-6",
                      isActive ? "bg-red-soft" : "hover:bg-paper",
                    )}
                  >
                    <span className={cn("size-2.5 shrink-0 rounded-full", toneDot[item.tone])} />
                    <span className="mono-xs w-14 shrink-0 text-text-2">{item.code}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[0.9375rem] font-semibold text-text">{item.label}</span>
                      <span className="mono-xs mt-0.5 block text-text-3">{item.date}</span>
                    </span>
                    <ChevronRight className={cn("size-4 shrink-0", isActive ? "text-red" : "text-text-3")} />
                  </button>
                </li>
              );
            })}
          </ol>

          {/* Detail */}
          <div aria-live="polite" className="flex flex-col bg-navy-2 p-7 sm:p-9">
            <div className="flex items-center justify-between gap-4">
              <p className="font-mono text-[2rem] leading-none font-medium text-white">{event.code}</p>
              <span
                className={cn(
                  "mono-xs inline-flex items-center gap-1.5 rounded-full px-3 py-2 uppercase",
                  event.tone === "next" ? "bg-red text-white" : "bg-white/10 text-on-dark-2",
                )}
              >
                {toneLabel[event.tone]}
                {event.tone === "next" ? <ArrowRight className="size-3.5" /> : null}
              </span>
            </div>

            <h3 className="mt-8 font-display text-[1.5rem] leading-[1.2] font-extrabold tracking-[-0.02em] text-white">
              {event.label}
            </h3>

            <dl className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-white/5 p-4">
                <dt className="eyebrow text-[0.6875rem] text-on-dark-3">Date</dt>
                <dd className="mt-1.5 font-mono text-[1rem] text-white">{event.date}</dd>
              </div>
              <div className="rounded-xl bg-white/5 p-4">
                <dt className="eyebrow text-[0.6875rem] text-on-dark-3">Amount</dt>
                <dd className="mt-1.5 font-mono text-[1rem] text-white">{event.amount}</dd>
              </div>
            </dl>

            <p className="mt-6 text-[0.9375rem] leading-[1.65] text-on-dark-2">{event.detail}</p>

            <span aria-hidden="true" className="flex-1" />
            <p className="mono-xs mt-8 inline-block self-start rounded-full border border-dashed border-white/25 px-3 py-1.5 text-on-dark-3">
              {transcriptExample.example}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
