import Image from "next/image";

import { Video } from "@/components/ui/video";
import { product } from "@/lib/content";
import { Eyebrow } from "@/components/ui/eyebrow";

export function Product() {
  return (
    <section className="bg-paper py-20 lg:py-28">
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow className="justify-center">{product.eyebrow}</Eyebrow>
          <h2 className="display t-h2 mt-7 text-text">{product.title}</h2>
          <p className="mx-auto mt-6 max-w-xl text-[1.0625rem] leading-[1.6] text-text-2">{product.body}</p>
        </div>

        <div className="mt-14 grid grid-cols-[minmax(0,1fr)] gap-5 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]">
          <div className="rounded-2xl border border-line bg-white p-2 shadow-[0_30px_70px_-30px_rgba(11,18,32,.4)] lg:self-start">
            <Video label={product.videoLabel} caption={product.videoCaption} />
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            {product.shots.map((shot, i) => (
              <figure key={shot.src} className="overflow-hidden rounded-2xl border border-line bg-white">
                <div className="relative aspect-[16/9] border-b border-line bg-white">
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    fill
                    sizes="(max-width: 1024px) 46vw, 380px"
                    className="object-contain"
                  />
                </div>
                <figcaption className="flex items-start gap-3 p-4">
                  <span className="mono-xs mt-0.5 rounded-full bg-red-soft px-2 py-0.5 text-red">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="block font-display text-[1rem] font-extrabold tracking-[-0.015em] text-text">
                      {shot.title}
                    </span>
                    <span className="mt-1 block text-[0.875rem] leading-[1.5] text-text-2">{shot.caption}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
