import Link from "next/link";
import { ArrowRight, GraduationCap } from "lucide-react";

import { guidance } from "@/lib/content";

export function Guidance() {
  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-[1.75rem] bg-ink px-7 py-12 text-center sm:px-12 lg:py-14">
          <div aria-hidden="true" className="absolute inset-0 grid-lines" />
          <div className="relative mx-auto max-w-2xl">
            <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-red text-white">
              <GraduationCap aria-hidden="true" className="size-6" />
            </span>
            <h2 className="mt-6 font-display text-[1.625rem] leading-[1.2] font-extrabold tracking-[-0.025em] text-white sm:text-[2rem]">
              {guidance.title}
            </h2>
            <p className="mt-4 text-[1rem] leading-[1.6] text-on-dark-2">{guidance.body}</p>
            <Link href="#walkthrough" className="btn-red mt-8">
              {guidance.cta}
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
