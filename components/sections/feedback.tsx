import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ClipboardList, FileCheck2, FileSearch } from "lucide-react";

import { feedback } from "@/lib/content";
import { Eyebrow } from "@/components/ui/eyebrow";

// Icon and real software screen for each stage: prepare, assess, act.
const stages = [
  {
    icon: ClipboardList,
    screen: {
      src: "/screens/step-by-step-workflow.jpg",
      width: 966,
      height: 579,
      alt: "PitBullTax Step-by-Step Workflow with client intake and questionnaire steps",
    },
  },
  {
    icon: FileSearch,
    screen: {
      src: "/live/resolution-evaluation.webp",
      width: 966,
      height: 700,
      alt: "PitBullTax Resolution Evaluation comparing resolution options for a sample client",
    },
  },
  {
    icon: FileCheck2,
    screen: {
      src: "/live/irs-tax-liability-dashboard.webp",
      width: 1000,
      height: 588,
      alt: "PitBullTax IRS tax liability and Offer in Compromise filings with forms in the sidebar",
    },
  },
];

export function Feedback() {
  return (
    <section id="feedback" className="relative scroll-mt-24 overflow-hidden bg-navy py-20 lg:py-28">
      <div aria-hidden="true" className="absolute inset-0 grid-lines" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-64 -left-48 size-[40rem] opacity-70 glow-red"
      />

      <div className="container-page relative">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:items-end lg:gap-16">
          <div>
            <Eyebrow>{feedback.eyebrow}</Eyebrow>
            <h2 className="display t-h2 mt-7 text-white">{feedback.title}</h2>
          </div>
          <div>
            <p className="max-w-md text-[1.0625rem] leading-[1.6] text-on-dark-2">{feedback.body}</p>
            <Link href="#walkthrough" className="btn-red mt-7">
              {feedback.cta}
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>

        <ol className="mt-14 grid gap-5 md:grid-cols-3 md:gap-4 lg:gap-6">
          {feedback.items.map((item, i) => {
            const stage = stages[i % stages.length];
            const Icon = stage.icon;
            return (
              <li key={item.title} className="relative flex">
                <article className="flex w-full flex-col overflow-hidden rounded-2xl border border-line-dark bg-navy-2 transition-colors hover:border-red/50">
                  <div className="relative aspect-[16/10] border-b border-line-dark bg-white">
                    <Image
                      src={stage.screen.src}
                      alt={stage.screen.alt}
                      fill
                      sizes="(max-width: 768px) 92vw, 380px"
                      className="object-contain"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-3">
                      <span className="flex size-10 items-center justify-center rounded-full bg-red text-white">
                        <Icon aria-hidden="true" className="size-5" />
                      </span>
                      <span className="mono-xs text-on-dark-3">Stage {String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <h3 className="mt-4 font-display text-[1.5rem] font-extrabold tracking-[-0.025em] text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[0.9375rem] leading-[1.6] text-on-dark-2">{item.body}</p>
                  </div>
                </article>

                {i < feedback.items.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className="absolute top-1/2 -right-5 z-10 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full border-4 border-navy bg-red text-white md:flex lg:-right-6"
                  >
                    <ArrowRight className="size-4" />
                  </span>
                ) : null}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
