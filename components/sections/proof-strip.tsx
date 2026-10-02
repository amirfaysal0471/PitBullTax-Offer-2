import { Calculator, ClipboardList, FileCheck2, FileText, ListChecks } from "lucide-react";

import { proofStrip } from "@/lib/content";

// One icon per item, in content order: intake, IRS records, analysis, forms, follow-up.
const icons = [ClipboardList, FileText, Calculator, FileCheck2, ListChecks];

export function ProofStrip() {
  return (
    <section className="border-y border-line bg-white py-12 lg:py-14">
      <div className="container-page">
        <p className="eyebrow text-center text-text-3">{proofStrip.label}</p>

        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {proofStrip.items.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <li
                key={item.title}
                className="flex items-start gap-3.5 rounded-2xl border border-line bg-paper p-4 lg:flex-col lg:gap-4 lg:p-5"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-red text-white">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <span>
                  <span className="block font-display text-[1.0625rem] font-extrabold tracking-[-0.02em] text-text">
                    {item.title}
                  </span>
                  <span className="mt-1 block text-[0.875rem] leading-[1.5] text-text-2">{item.body}</span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
