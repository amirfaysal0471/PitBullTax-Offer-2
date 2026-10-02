import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import { finalCta } from "@/lib/content";

export function FinalCta() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-[1.75rem] bg-red px-7 py-16 text-center sm:px-12 lg:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-40 -left-32 size-[30rem] rounded-full bg-white/10"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -bottom-48 size-[26rem] rounded-full bg-ink/15"
          />

          <div className="relative mx-auto max-w-2xl">
            <h2 className="display t-h2 text-white">
              {finalCta.line1} <span className="text-outline">{finalCta.line2}</span>
            </h2>
            <p className="mx-auto mt-6 max-w-md text-[1.0625rem] leading-[1.6] text-white/90">{finalCta.body}</p>
            <ul className="mx-auto mt-7 flex max-w-xl flex-wrap justify-center gap-2.5">
              {finalCta.points.map((point) => (
                <li
                  key={point}
                  className="flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-[0.875rem] font-medium text-white"
                >
                  <Check className="size-3.5" strokeWidth={3.5} />
                  {point}
                </li>
              ))}
            </ul>
            <Link href="#walkthrough" className="btn-ink mt-9">
              {finalCta.cta}
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
