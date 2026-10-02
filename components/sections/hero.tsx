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
        <div className="grid grid-cols-[minmax(0,1fr)] items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:gap-14">
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

          <div className="relative lg:pb-36">
            <div className="relative z-10 lg:mr-12">
              <WalkthroughForm compact {...hero.form} />
            </div>

            {/* Product visual: behind the form on desktop, below it on mobile */}
            <div className="mt-10 overflow-hidden rounded-xl border border-line bg-white p-1.5 shadow-[0_26px_60px_-12px_rgba(11,18,32,.25)] lg:absolute lg:right-[-10%] lg:bottom-0 lg:mt-0 lg:w-[82%]">
              <Image
                src={hero.visual.src}
                alt={hero.visual.alt}
                width={hero.visual.width}
                height={hero.visual.height}
                preload
                sizes="(max-width: 1024px) 92vw, 480px"
                className="h-auto w-full rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
