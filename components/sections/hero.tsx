import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { WalkthroughForm } from "@/components/forms/walkthrough-form";
import { hero } from "@/lib/content";
import { Eyebrow } from "@/components/ui/eyebrow";

export function Hero() {
  const [before, after] = hero.title.split(hero.titleAccent);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-paper to-white pt-12 pb-16 sm:pt-14 lg:py-16">
      <div aria-hidden="true" className="absolute inset-0 grid-lines-light" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-40 size-[46rem] opacity-60 glow-red"
      />

      <div className="container-page relative">
        {/* Copy and form start on the same top line. */}
        <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:gap-14">
          <div>
            <Eyebrow>{hero.eyebrow}</Eyebrow>

            <h1 className="display mt-6 text-[clamp(2.125rem,1.3rem+2.4vw,3.25rem)] leading-[1.02] text-text lg:mt-5">
              {before}
              <span className="swoosh">{hero.titleAccent}</span>
              {after}
            </h1>

            <p className="mt-7 max-w-xl text-[1.0625rem] leading-[1.6] text-text-2 lg:mt-6">
              {hero.body}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="#walkthrough" className="btn-red">
                {hero.primary}
                <ArrowRight className="size-4" />
              </Link>
              <Link href="#case-workflow" className="btn-outline-light">
                {hero.secondary}
              </Link>
            </div>
          </div>

          <WalkthroughForm compact {...hero.form} />
        </div>

        {/* G09 spans the full width below copy and form; it fills the frame from the top. */}
        <figure className="mt-12 overflow-hidden rounded-xl border border-line bg-white shadow-[0_26px_60px_-12px_rgba(11,18,32,.25)] lg:mt-14">
          <figcaption className="flex items-center gap-2 border-b border-line bg-paper px-4 py-2.5">
            <span aria-hidden="true" className="size-2.5 rounded-full bg-red/70" />
            <span aria-hidden="true" className="size-2.5 rounded-full bg-amber-400/80" />
            <span aria-hidden="true" className="size-2.5 rounded-full bg-emerald-400/80" />
            <span className="mono-xs ml-2 text-text-3">{hero.visual.caption}</span>
          </figcaption>
          <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[2/1]">
            <Image
              src={hero.visual.src}
              alt={hero.visual.alt}
              fill
              preload
              sizes="(max-width: 1280px) 92vw, 1200px"
              className="object-cover object-left-top"
            />
          </div>
        </figure>
      </div>
    </section>
  );
}
