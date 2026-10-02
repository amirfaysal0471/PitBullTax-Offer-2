import { audience } from "@/lib/content";

export function Audience() {
  return (
    <section className="bg-paper py-12 lg:py-14">
      <div className="container-page text-center">
        <p className="eyebrow text-text-2">{audience.label}</p>
        <ul aria-label="Who PitBullTax is for" className="mt-6 flex flex-wrap justify-center gap-2.5">
          {audience.items.map((item) => (
            <li
              key={item}
              className="rounded-full border border-line bg-white px-5 py-2.5 font-display text-[1rem] font-extrabold tracking-[-0.02em] whitespace-nowrap text-text shadow-sm"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
