"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

import { cn } from "cn";
import { caseJourney } from "@/lib/content";
import { Eyebrow } from "@/components/ui/eyebrow";

const pad = (n: number) => String(n).padStart(2, "0");

export function CaseJourney() {
  const [active, setActive] = useState(0);
  const { stages } = caseJourney;
  const stage = stages[active];
  const last = stages.length - 1;
  const progress = (active / last) * 100;

  return (
    <section
      id="case-workflow"
      className="scroll-mt-24 bg-white py-20 lg:py-28"
    >
      <div className="container-page">
        <Eyebrow>{caseJourney.eyebrow}</Eyebrow>

        <div className="mt-7 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-end lg:gap-16">
          <h2 className="display t-h2 text-text">{caseJourney.title}</h2>
          <p className="max-w-md text-[1.0625rem] leading-[1.6] text-text-2">
            {caseJourney.body}
          </p>
        </div>

        <div className="relative mt-14">
          <div
            aria-hidden="true"
            className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl bg-red"
          />

          <div className="relative rounded-2xl border border-line bg-white p-6 sm:p-8 lg:p-10">
            {/* Stage track */}
            <div className="relative">
              <span
                aria-hidden="true"
                className="absolute top-5 right-[10%] left-[10%] h-0.5 bg-paper-2"
              />
              <span
                aria-hidden="true"
                className="absolute top-5 left-[10%] h-0.5 bg-red transition-[width] duration-300"
                style={{ width: `${progress * 0.8}%` }}
              />

              <ol className="relative grid grid-cols-5">
                {stages.map((item, i) => {
                  const done = i < active;
                  const current = i === active;
                  return (
                    <li key={item.title} className="flex justify-center">
                      <button
                        type="button"
                        onClick={() => setActive(i)}
                        aria-pressed={current}
                        aria-label={`Stage ${i + 1}: ${item.title}`}
                        className="group flex flex-col items-center gap-3 rounded-[4px] text-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red"
                      >
                        <span
                          className={cn(
                            "flex size-10 items-center justify-center rounded-full font-display text-[0.9375rem] font-extrabold ring-4 ring-white transition-colors",
                            current && "bg-red text-white",
                            done && "bg-ink text-white",
                            !current &&
                              !done &&
                              "bg-paper-2 text-text-2 group-hover:bg-line",
                          )}
                        >
                          {done ? (
                            <Check className="size-4" strokeWidth={3} />
                          ) : (
                            i + 1
                          )}
                        </span>
                        <span
                          className={cn(
                            "hidden max-w-[10rem] text-[0.875rem] leading-[1.35] font-semibold md:block",
                            current
                              ? "text-text"
                              : "text-text-3 group-hover:text-text-2",
                          )}
                        >
                          {item.title}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>

            {/* Stage detail */}
            <div
              aria-live="polite"
              className="mt-10 grid gap-8 border-t border-line pt-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-14"
            >
              <div>
                <p className="mono-xs text-red">
                  Stage {pad(active + 1)} / {pad(stages.length)}
                </p>
                <h3 className="mt-3 font-display text-[1.5rem] leading-[1.15] font-extrabold tracking-[-0.025em] text-text sm:text-[1.75rem]">
                  {stage.title}
                </h3>
                <p className="mt-3 max-w-md text-[0.9375rem] leading-[1.6] text-text-2">
                  {stage.body}
                </p>
              </div>

              <div className="rounded-xl bg-paper p-5 sm:p-6">
                <p className="eyebrow text-[0.6875rem] text-text-3">
                  {caseJourney.toolsLabel}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {stage.tools.map((tool) => (
                    <li
                      key={tool}
                      className="rounded-full border border-line bg-white px-3.5 py-2 text-[0.875rem] font-medium text-text"
                    >
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 flex flex-col-reverse gap-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-md text-[0.8125rem] leading-[1.5] text-text-3">
                {caseJourney.footnote}
              </p>

              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  onClick={() => setActive((i) => Math.max(0, i - 1))}
                  disabled={active === 0}
                  aria-label="Previous stage"
                  className="flex size-11 items-center justify-center rounded-full border border-line text-text transition-colors hover:bg-paper disabled:opacity-40 disabled:hover:bg-transparent"
                >
                  <ArrowLeft className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setActive((i) => Math.min(last, i + 1))}
                  disabled={active === last}
                  className="btn-red h-11 px-5 text-sm disabled:opacity-40"
                >
                  Next stage
                  <ArrowRight className="size-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
