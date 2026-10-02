import Image from "next/image";

import { community } from "@/lib/content";

export function Community() {
  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="container-page">
        <h2 className="display max-w-2xl text-[1.75rem] text-text sm:text-[2.25rem]">
          {community.title}
        </h2>
        <p className="mt-4 max-w-2xl text-[1.0625rem] leading-[1.6] text-text-2">{community.body}</p>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {community.items.map((item) => (
            <article
              key={item.title}
              className="flex items-center gap-5 rounded-2xl border border-line bg-white p-4 sm:p-5"
            >
              <Image
                src={item.image.src}
                alt={item.image.alt}
                width={240}
                height={240}
                sizes="140px"
                className="size-28 shrink-0 rounded-xl object-cover sm:size-36"
              />
              <div>
                <p className="mono-xs text-red uppercase">{item.kicker}</p>
                <h3 className="mt-1.5 font-display text-[1.1875rem] font-extrabold tracking-[-0.02em] text-text">
                  {item.title}
                </h3>
                <p className="mt-2 text-[0.875rem] leading-[1.55] text-text-2">{item.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
