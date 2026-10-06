import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ClipboardList,
  FileCheck2,
  FileSearch,
} from "lucide-react";

import { feedback } from "@/lib/content";
import { Eyebrow } from "@/components/ui/eyebrow";

// Icon and real software screen for each stage: prepare, assess, act.
const stages = [
  {
    icon: ClipboardList,
    screen: {
      src: "/screens/g04-client-questionnaire.webp",
      width: 1600,
      height: 959,
      alt: "PitBullTax Client Questionnaire with sections such as taxpayer, dependents, IRS liability, employment and banking",
    },
  },
  {
    icon: FileSearch,
    screen: {
      src: "/screens/g05-resolution-evaluation.webp",
      width: 1600,
      height: 1159,
      alt: "PitBullTax Resolution Evaluation comparing resolution options for a sample client",
    },
  },
  {
    icon: FileCheck2,
    screen: {
      src: "/screens/g07-form-433-a-entry.webp",
      width: 1175,
      height: 850,
      alt: "PitBullTax Form 433-A entry screen with personal information and address fields, and Forms In Use in the sidebar",
    },
  },
];

export function Feedback() {
  return (
    <section
      id="feedback"
      className="relative scroll-mt-24 overflow-hidden bg-navy py-20 lg:py-28"
    >
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
            <p className="max-w-md text-[1.0625rem] leading-[1.6] text-on-dark-2">
              {feedback.body}
            </p>
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
                  <div className="p-6 pb-5">
                    <div className="flex items-center gap-3">
                      <span className="flex size-10 items-center justify-center rounded-full bg-red text-white">
                        <Icon aria-hidden="true" className="size-5" />
                      </span>
                      <span className="mono-xs text-on-dark-3">
                        Stage {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="mt-4 font-display text-[1.5rem] font-extrabold tracking-[-0.025em] text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[0.9375rem] leading-[1.6] text-on-dark-2">
                      {item.body}
                    </p>
                  </div>
                  {/* Same-size frame in every card; the screen fills it from the top. */}
                  <div className="mt-auto px-3 pb-3">
                    <div className="relative aspect-[966/700] overflow-hidden rounded-lg border border-line-dark bg-white">
                      <Image
                        src={stage.screen.src}
                        alt={stage.screen.alt}
                        fill
                        sizes="(max-width: 768px) 92vw, 380px"
                        className="object-cover object-left-top"
                      />
                    </div>
                  </div>
                </article>

                {i < feedback.items.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className="absolute top-11 -right-5 z-10 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full border-4 border-navy bg-red text-white md:flex lg:-right-6"
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
