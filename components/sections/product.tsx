import Image from "next/image";

import { Video } from "@/components/ui/video";
import { product } from "@/lib/content";
import { Eyebrow } from "@/components/ui/eyebrow";

export function Product() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="container-page">
        <Eyebrow>{product.eyebrow}</Eyebrow>

        <div className="mt-7 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-end lg:gap-16">
          <h2 className="display t-h2 text-text">{product.title}</h2>
          <p className="max-w-md text-[1.0625rem] leading-[1.6] text-text-2">
            {product.body}
          </p>
        </div>

        <div className="mt-14 rounded-2xl border border-line bg-paper p-2 shadow-[0_30px_70px_-30px_rgba(11,18,32,.4)]">
          <Video label={product.videoLabel} caption={product.videoCaption} />
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {product.shots.map((shot) => (
            <figure
              key={shot.src}
              className="flex flex-col overflow-hidden rounded-2xl border border-line bg-white p-2"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-line bg-white">
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  fill
                  sizes="(max-width: 1024px) 92vw, 600px"
                  className="object-contain"
                />
              </div>
              <figcaption className="px-3 pt-4 pb-2">
                <span className="block font-display text-[1rem] font-extrabold tracking-[-0.015em] text-text">
                  {shot.title}
                </span>
                <span className="mt-1 block text-[0.875rem] leading-[1.5] text-text-2">
                  {shot.caption}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
