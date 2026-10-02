"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Quote, Star } from "lucide-react";

import { cn } from "cn";
import { headerCta, testimonials } from "@/lib/content";
import { Eyebrow } from "@/components/ui/eyebrow";

const QUOTE_MS = 7000;

export function Testimonials() {
  const { items } = testimonials;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [clicked, setClicked] = useState(false);
  const playing = !paused && !clicked;

  // Rotate through the quotes; the timer restarts whenever the quote changes.
  useEffect(() => {
    if (!playing) return;
    const timer = setTimeout(() => setActive((i) => (i + 1) % items.length), QUOTE_MS);
    return () => clearTimeout(timer);
  }, [active, playing, items.length]);

  return (
    <section id="testimonials" className="scroll-mt-24 bg-paper py-20 lg:py-24">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow className="justify-center">{testimonials.eyebrow}</Eyebrow>
          <h2 className="display mt-6 text-[2rem] leading-[1.05] text-text sm:text-[2.75rem]">
            {testimonials.title}
          </h2>
        </div>

        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="mx-auto mt-12 max-w-3xl"
        >
          <figure className="relative rounded-2xl border border-line bg-white p-6 shadow-[0_30px_70px_-40px_rgba(11,18,32,.45)] sm:p-10">
            <div className="flex items-center justify-between">
              <Quote aria-hidden="true" className="size-8 text-red sm:size-10" />
              <span aria-label="5 out of 5 stars" className="flex gap-0.5 text-amber-400">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} aria-hidden="true" className="size-4 fill-current" />
                ))}
              </span>
            </div>

            {/* All quotes share one grid cell, so the card keeps the height of the longest. */}
            <div aria-live="polite" className="mt-5 grid">
              {items.map((item, i) => (
                <div
                  key={item.name}
                  aria-hidden={i !== active}
                  className={cn(
                    "col-start-1 row-start-1 transition-opacity duration-500",
                    i === active ? "opacity-100" : "pointer-events-none opacity-0",
                  )}
                >
                  <blockquote className="text-[1rem] leading-[1.7] text-text sm:text-[1.125rem]">
                    “{item.quote}”
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3.5">
                    <Image
                      src={item.photo}
                      alt=""
                      width={48}
                      height={48}
                      className="size-12 rounded-full object-cover ring-4 ring-red-soft"
                    />
                    <span>
                      <span className="block font-display text-[1.0625rem] font-extrabold tracking-[-0.015em] text-text">
                        {item.name}
                      </span>
                      <span className="mono-xs text-text-3">PitBullTax customer</span>
                    </span>
                  </figcaption>
                </div>
              ))}
            </div>

            <span className="absolute inset-x-6 bottom-0 h-1 overflow-hidden rounded-full bg-paper-2 sm:inset-x-10">
              <span
                key={`${active}-${playing}`}
                className="block h-full rounded-full bg-red"
                style={playing ? { animation: `step-progress ${QUOTE_MS}ms linear forwards` } : { width: "100%" }}
              />
            </span>
          </figure>

          {/* Reviewer picker */}
          <div className="mt-5 flex flex-wrap justify-center gap-2.5">
            {items.map((item, i) => (
              <button
                key={item.name}
                type="button"
                onClick={() => {
                  setActive(i);
                  setClicked(true);
                }}
                aria-label={`Show review from ${item.name}`}
                aria-pressed={i === active}
                className={cn(
                  "flex items-center gap-2.5 rounded-full border p-1 transition-colors sm:pr-4",
                  i === active ? "border-red/40 bg-white shadow-sm" : "border-transparent hover:bg-white/70",
                )}
              >
                <Image
                  src={item.photo}
                  alt=""
                  width={40}
                  height={40}
                  className={cn(
                    "size-10 rounded-full object-cover transition-opacity",
                    i === active ? "opacity-100" : "opacity-60",
                  )}
                />
                <span
                  className={cn(
                    "hidden text-[0.875rem] font-semibold sm:inline",
                    i === active ? "text-text" : "text-text-3",
                  )}
                >
                  {item.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-5 text-center">
          <p className="font-display text-[1.125rem] font-extrabold tracking-[-0.02em] text-text sm:text-[1.25rem]">
            {testimonials.cta}
          </p>
          <Link href="#walkthrough" className="btn-red">
            {headerCta}
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
