import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import { finalCta } from "@/lib/content";

export function FinalCta() {
  return (
    <section className="bg-red py-20 lg:py-28">
      <div className="container-page">
        <h2 className="display t-h2 text-white">
          {finalCta.line1}
          <br />
          <span className="text-outline">{finalCta.line2}</span>
        </h2>

        <div className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="max-w-md text-[1.0625rem] leading-[1.6] text-white">
              {finalCta.body}
            </p>
            <ul className="mt-6 grid gap-2.5">
              {finalCta.points.map((point) => (
                <li key={point} className="flex items-center gap-3 text-[0.9375rem] font-medium text-white">
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-white text-red">
                    <Check className="size-3" strokeWidth={3.5} />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative self-start lg:self-auto">
            <span
              aria-hidden="true"
              className="absolute inset-0 translate-x-2 translate-y-2 rounded-full bg-ink/40"
            />
            <Link href="#walkthrough" className="btn-ink relative">
              {finalCta.cta}
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
