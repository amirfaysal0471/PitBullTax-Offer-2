import { Check } from "lucide-react";

import { WalkthroughForm } from "@/components/forms/walkthrough-form";
import { walkthrough } from "@/lib/content";
import { Eyebrow } from "@/components/ui/eyebrow";

export function Walkthrough() {
  return (
    <section id="walkthrough" className="scroll-mt-24 bg-white py-16 lg:py-24">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-[1.75rem] bg-red p-6 sm:p-10 lg:p-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-32 -bottom-40 size-[34rem] rounded-full bg-white/10"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -left-24 size-[18rem] rounded-full bg-ink/10"
          />

          <div className="relative grid grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
            <div className="lg:pt-2">
              <Eyebrow tone="light">{walkthrough.eyebrow}</Eyebrow>
              <h2 className="display t-h2 mt-7 text-white">{walkthrough.title}</h2>
              <p className="mt-6 max-w-md text-[1.0625rem] leading-[1.6] text-white/85">{walkthrough.body}</p>

              <ul className="mt-9 grid gap-3">
                {walkthrough.agenda.map((item) => (
                  <li key={item.time} className="flex items-start gap-3.5 rounded-2xl bg-white/10 p-4">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-white text-red">
                      <Check className="size-4" strokeWidth={3} />
                    </span>
                    <span>
                      <span className="block text-[0.9375rem] font-semibold text-white">{item.title}</span>
                      <span className="mt-0.5 block text-[0.875rem] leading-[1.5] text-white/80">{item.body}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:self-start">
              <WalkthroughForm {...walkthrough.form} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
