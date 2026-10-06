import Image from "next/image";
import { Check } from "lucide-react";

import { cn } from "cn";
import { platform, offerings } from "@/lib/content";
import { Eyebrow } from "@/components/ui/eyebrow";

export function Platform() {
  const p = platform;

  return (
    <section id="platform" className="scroll-mt-24 bg-paper py-20 lg:py-28">
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:items-end lg:gap-16">
          <div>
            <Eyebrow>{p.eyebrow}</Eyebrow>
            <h2 className="display t-h2 mt-7 text-text">{p.title}</h2>
          </div>
          <p className="max-w-md text-[1.0625rem] leading-[1.6] text-text-2">
            {p.body}
          </p>
        </div>

        {/* 3 + 2 grid of tools, each led by its real software screen */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {p.cards.map((card, i) => (
            <article
              key={card.title}
              className={cn(
                "group flex flex-col overflow-hidden rounded-2xl border border-line bg-white transition-shadow hover:shadow-[0_30px_70px_-35px_rgba(11,18,32,.45)]",
                i < 3 ? "lg:col-span-2" : "lg:col-span-3",
                i === 2 && "sm:col-span-2 lg:col-span-2",
              )}
            >
              <div className="relative border-b border-line bg-paper-2/60 p-3 pb-0">
                <span className="mono-xs absolute top-3 left-3 z-10 rounded-full bg-red px-2.5 py-1 text-white">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="overflow-hidden rounded-t-xl border border-b-0 border-line bg-white">
                  {"image" in card && card.image ? (
                    <>
                      <p className="border-l-4 border-[#f0506e] bg-[#d9ecfc] py-2 pr-3 pl-14 text-[0.75rem] font-bold tracking-[0.02em] text-[#0b1220] uppercase">
                        {card.image.label}
                      </p>
                      <div className="relative aspect-[16/10]">
                        <Image
                          src={card.image.src}
                          alt={card.image.alt}
                          fill
                          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 400px"
                          className="object-cover object-left-top"
                        />
                      </div>
                    </>
                  ) : null}
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-[1.375rem] font-extrabold tracking-[-0.025em] text-text">
                  {card.title}
                </h3>
                <p className="mt-2 text-[0.9375rem] leading-[1.55] text-text-2">
                  {card.body}
                </p>
                <ul className="mt-auto flex flex-wrap gap-2 pt-5">
                  {card.links.map((link) => (
                    <li
                      key={link}
                      className="mono-xs rounded-full bg-red-soft px-3 py-1.5 text-red"
                    >
                      {link}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        {/* Two offerings */}
        <div className="mt-16 overflow-hidden rounded-2xl bg-ink">
          <h3 className="display px-7 pt-9 text-[1.75rem] text-white sm:px-10 sm:text-[2.125rem]">
            {offerings.title}
          </h3>
          <p className="max-w-2xl px-7 pt-3 text-[1rem] leading-[1.6] text-on-dark-2 sm:px-10">
            {offerings.body}
          </p>
          <div className="mt-8 grid md:grid-cols-2">
            {offerings.items.map((way, i) => (
              <article
                key={way.title}
                className={cn(
                  "border-t border-white/10 p-7 sm:p-10",
                  i === 1 && "md:border-l",
                )}
              >
                <p className="display text-[2.5rem] leading-none text-red">
                  {way.kicker}
                </p>
                <h4 className="mt-4 font-display text-[1.375rem] font-extrabold tracking-[-0.025em] text-white">
                  {way.title}
                </h4>
                <p className="mt-2 text-[0.9375rem] leading-[1.55] text-on-dark-2">
                  {way.body}
                </p>
                <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-2.5">
                  {way.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2.5 text-[0.9375rem] text-on-dark-2"
                    >
                      <Check
                        className="mt-1 size-3.5 shrink-0 text-red"
                        strokeWidth={3}
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
