import { ArrowRight, Check, X } from "lucide-react";

import { comparison } from "@/lib/content";
import { Eyebrow } from "@/components/ui/eyebrow";

export function Comparison() {
  const { manual, focused } = comparison;
  // Each manual step is paired with the PitBullTax step that replaces it.
  const rows = manual.items.map((item, i) => [item, focused.items[i]] as const);

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow className="justify-center">{comparison.eyebrow}</Eyebrow>
          <h2 className="display t-h2 mt-7 text-text">{comparison.title}</h2>
          <p className="mx-auto mt-6 max-w-2xl text-[1.0625rem] leading-[1.6] text-text-2">{comparison.body}</p>
        </div>

        <div className="mx-auto mt-14 max-w-5xl overflow-hidden rounded-2xl border border-line shadow-[0_30px_70px_-40px_rgba(11,18,32,.4)]">
          <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:grid-cols-[minmax(0,1fr)_3.5rem_minmax(0,1fr)]">
            <div className="flex items-center justify-between gap-3 bg-paper px-4 py-5 sm:px-7">
              <h3 className="font-display text-[1rem] font-extrabold tracking-[-0.02em] text-text sm:text-[1.25rem]">
                {manual.title}
              </h3>
              <span className="mono-xs hidden rounded-full bg-paper-2 px-2.5 py-1 text-text-2 uppercase sm:inline">
                {manual.badge}
              </span>
            </div>
            <div aria-hidden="true" className="hidden bg-paper md:block" />
            <div className="flex items-center justify-between gap-3 bg-ink px-4 py-5 sm:px-7">
              <h3 className="font-display text-[1rem] font-extrabold tracking-[-0.02em] text-white sm:text-[1.25rem]">
                {focused.title}
              </h3>
              <span className="mono-xs hidden rounded-full bg-red px-2.5 py-1 text-white uppercase sm:inline">
                {focused.badge}
              </span>
            </div>
          </div>

          <ul>
            {rows.map(([before, after]) => (
              <li
                key={before}
                className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] border-t border-line md:grid-cols-[minmax(0,1fr)_3.5rem_minmax(0,1fr)]"
              >
                <p className="flex items-start gap-3 px-4 py-5 text-[0.9375rem] leading-[1.5] text-text-2 sm:px-7">
                  <X className="mt-0.5 size-4 shrink-0 text-text-3" strokeWidth={2.5} />
                  {before}
                </p>
                <span aria-hidden="true" className="hidden items-center justify-center md:flex">
                  <span className="flex size-8 items-center justify-center rounded-full bg-red-soft text-red">
                    <ArrowRight className="size-4" />
                  </span>
                </span>
                <p className="flex items-start gap-3 bg-red-soft/40 px-4 py-5 text-[0.9375rem] leading-[1.5] font-medium text-text sm:px-7">
                  <Check className="mt-0.5 size-4 shrink-0 text-red" strokeWidth={3} />
                  {after}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
