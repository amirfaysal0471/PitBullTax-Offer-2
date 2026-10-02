import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import { cn } from "cn";
import { headerCta, software } from "@/lib/content";
import { Eyebrow } from "@/components/ui/eyebrow";

export function Software() {
  return (
    <section id="software" className="scroll-mt-24 bg-white py-20 lg:py-28">
      <div className="container-page">
        <Eyebrow className="justify-center">{software.eyebrow}</Eyebrow>

        <div className="mt-12 grid gap-16 lg:gap-24">
          {software.rows.map((row, i) => (
            <div
              key={row.title}
              className="grid grid-cols-[minmax(0,1fr)] items-center gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-16"
            >
              <figure
                className={cn(
                  "overflow-hidden rounded-2xl border border-line bg-white shadow-[0_34px_80px_-34px_rgba(11,18,32,.45)]",
                  i % 2 === 1 && "lg:order-2",
                )}
              >
                <div className="flex items-center gap-1.5 border-b border-line bg-paper px-4 py-3">
                  <span aria-hidden="true" className="size-2.5 rounded-full bg-red/70" />
                  <span aria-hidden="true" className="size-2.5 rounded-full bg-amber-400/80" />
                  <span aria-hidden="true" className="size-2.5 rounded-full bg-emerald-400/80" />
                  <figcaption className="mono-xs ml-3 truncate text-text-3">
                    PitBullTax · {row.image.label}
                  </figcaption>
                </div>
                <Image
                  src={row.image.src}
                  alt={row.image.alt}
                  width={row.image.width}
                  height={row.image.height}
                  sizes="(max-width: 1024px) 92vw, 620px"
                  className="h-auto w-full"
                />
              </figure>

              <div className={cn(i % 2 === 1 && "lg:order-1")}>
                <h2 className="display text-[2rem] leading-[1.05] text-text sm:text-[2.5rem]">
                  {row.title}
                </h2>
                <p className="mt-5 max-w-lg text-[1.0625rem] leading-[1.6] text-text-2">{row.body}</p>
                <ul className="mt-6 grid gap-3">
                  {row.points.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-[0.9375rem] leading-[1.5] text-text">
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-red text-white">
                        <Check className="size-3" strokeWidth={3.5} />
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
                {i === 0 ? (
                  <Link href="#walkthrough" className="btn-red mt-8">
                    {headerCta}
                    <ArrowRight className="size-4" />
                  </Link>
                ) : null}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 rounded-2xl border border-line bg-paper p-6 sm:p-10">
          <h3 className="font-display text-[1.375rem] font-extrabold tracking-[-0.025em] text-text sm:text-[1.625rem]">
            {software.toolsTitle}
          </h3>
          <ul className="mt-6 flex flex-wrap gap-2.5">
            {software.tools.map((tool) => (
              <li
                key={tool}
                className="flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-[0.875rem] font-medium text-text"
              >
                <span aria-hidden="true" className="size-1.5 rounded-full bg-red" />
                {tool}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
