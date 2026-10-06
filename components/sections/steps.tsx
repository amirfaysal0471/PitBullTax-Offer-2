"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "cn";
import { Video } from "@/components/ui/video";
import { headerCta, steps } from "@/lib/content";
import { Eyebrow } from "@/components/ui/eyebrow";

// Label shown in the browser frame for each step's screen.
const screenLabels = [
  "PitBullTax Software Presentation",
  "Step-by-Step Workflow",
  "Video Tutorials",
];

// Each step stays on screen this long before the next one plays.
const STEP_MS = 5000;

export function Steps() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [clicked, setClicked] = useState(false);
  const step = steps.items[active];
  const playing = !paused && !clicked;

  // Auto-advance through the steps; restarts the timer whenever the step changes.
  useEffect(() => {
    if (!playing) return;
    const timer = setTimeout(
      () => setActive((i) => (i + 1) % steps.items.length),
      STEP_MS,
    );
    return () => clearTimeout(timer);
  }, [active, playing]);

  // Software screen for the active step (shared by the desktop and mobile layouts).
  const screen = (
    <figure className="overflow-hidden rounded-2xl border border-line bg-white shadow-[0_40px_90px_-35px_rgba(11,18,32,.5)]">
      <div className="flex items-center gap-1.5 border-b border-line bg-paper px-4 py-3">
        <span aria-hidden="true" className="size-2.5 rounded-full bg-red/70" />
        <span
          aria-hidden="true"
          className="size-2.5 rounded-full bg-amber-400/80"
        />
        <span
          aria-hidden="true"
          className="size-2.5 rounded-full bg-emerald-400/80"
        />
        <figcaption className="mono-xs ml-3 truncate text-text-3">
          PitBullTax · {screenLabels[active] ?? step.title}
        </figcaption>
        <span className="mono-xs ml-auto shrink-0 rounded-full bg-red-soft px-2.5 py-0.5 text-red">
          Step {step.n} / {steps.items.length}
        </span>
      </div>
      <div className="relative flex aspect-[3/2] items-center justify-center bg-white">
        {step.video ? (
          <Video compact fill poster={{ src: step.image, alt: step.alt }} />
        ) : (
          <Image
            key={step.image}
            src={step.image}
            alt={step.alt}
            fill
            sizes="(max-width: 1024px) 92vw, 680px"
            className="object-cover object-top"
          />
        )}
      </div>
    </figure>
  );

  const progressBar = (
    <span className="block h-1 overflow-hidden rounded-full bg-paper-2">
      <span
        key={`${active}-${playing}`}
        className="block h-full rounded-full bg-red"
        style={
          playing
            ? { animation: `step-progress ${STEP_MS}ms linear forwards` }
            : { width: "100%" }
        }
      />
    </span>
  );

  function select(i: number) {
    setActive(i);
    setClicked(true);
  }

  return (
    <section id="how-it-works" className="scroll-mt-24 bg-paper py-20 lg:py-28">
      <div className="container-page">
        <Eyebrow>{steps.eyebrow}</Eyebrow>
        <h2 className="display t-h2 mt-7 max-w-3xl text-text">{steps.title}</h2>

        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="mt-14 hidden items-start gap-14 lg:grid lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]"
        >
          {/* Step list */}
          <ol className="relative grid gap-3">
            <span
              aria-hidden="true"
              className="absolute top-8 bottom-24 left-[2.625rem] w-px bg-line sm:left-[2.875rem]"
            />
            {steps.items.map((item, i) => {
              const isActive = i === active;
              return (
                <li key={item.n} className="relative">
                  <button
                    type="button"
                    onClick={() => select(i)}
                    aria-pressed={isActive}
                    className={cn(
                      "flex w-full items-start gap-5 rounded-2xl border p-5 text-left transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red sm:p-6",
                      isActive
                        ? "border-red/30 bg-white shadow-[0_24px_60px_-30px_rgba(232,20,31,.45)]"
                        : "border-transparent hover:bg-white/60",
                    )}
                  >
                    <span
                      className={cn(
                        "relative z-10 flex size-11 shrink-0 items-center justify-center rounded-full font-display text-[1rem] font-extrabold ring-4 transition-colors",
                        isActive
                          ? "bg-red text-white ring-red-soft"
                          : "bg-white text-text-2 ring-paper",
                      )}
                    >
                      {item.n}
                    </span>
                    <span>
                      <span
                        className={cn(
                          "block font-display text-[1.25rem] font-extrabold tracking-[-0.02em]",
                          isActive ? "text-text" : "text-text-2",
                        )}
                      >
                        {item.title}
                      </span>
                      <span className="mt-1.5 block text-[0.9375rem] leading-[1.55] text-text-2">
                        {item.body}
                      </span>
                      {isActive ? (
                        <span className="mt-4 block">{progressBar}</span>
                      ) : null}
                    </span>
                  </button>
                </li>
              );
            })}
            <li className="pt-3 pl-5 sm:pl-6">
              <Link href="#walkthrough" className="btn-red">
                {headerCta}
                <ArrowRight className="size-4" />
              </Link>
            </li>
          </ol>

          <div className="lg:sticky lg:top-28">{screen}</div>
        </div>

        {/* Mobile: step tabs, then the screen, then the active step's text */}
        <div className="mt-10 lg:hidden">
          <div
            role="tablist"
            aria-label={steps.eyebrow}
            className="grid grid-cols-3 gap-2"
          >
            {steps.items.map((item, i) => {
              const isActive = i === active;
              return (
                <button
                  key={item.n}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => select(i)}
                  className={cn(
                    "flex flex-col items-center gap-1.5 rounded-xl border px-2 py-3 text-center transition-colors",
                    isActive
                      ? "border-red/30 bg-white shadow-sm"
                      : "border-transparent bg-white/50",
                  )}
                >
                  <span
                    className={cn(
                      "flex size-8 items-center justify-center rounded-full font-display text-[0.875rem] font-extrabold",
                      isActive ? "bg-red text-white" : "bg-paper-2 text-text-2",
                    )}
                  >
                    {item.n}
                  </span>
                  <span
                    className={cn(
                      "text-[0.75rem] leading-[1.25] font-semibold",
                      isActive ? "text-text" : "text-text-3",
                    )}
                  >
                    {item.short}
                  </span>
                </button>
              );
            })}
          </div>
          <div className="mt-3">{progressBar}</div>

          <div className="mt-6">{screen}</div>

          <div role="tabpanel" aria-live="polite" className="mt-6">
            <h3 className="font-display text-[1.375rem] font-extrabold tracking-[-0.02em] text-text">
              {step.title}
            </h3>
            <p className="mt-2 text-[0.9375rem] leading-[1.6] text-text-2">
              {step.body}
            </p>
            <Link href="#walkthrough" className="btn-red mt-6 w-full sm:w-auto">
              {headerCta}
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
