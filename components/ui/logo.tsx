import Image from "next/image";

import { cn } from "cn";
import { site } from "@/lib/content";

/** `onLight` swaps in the dark-lettered logo for white backgrounds. */
export function Logo({
  className,
  eager = false,
  onLight = false,
}: {
  className?: string;
  eager?: boolean;
  onLight?: boolean;
}) {
  return (
    <Image
      src={onLight ? site.logoDark : site.logo}
      alt="PitBullTax Software"
      width={1830}
      height={524}
      loading={eager ? "eager" : undefined}
      className={cn("h-7 w-auto shrink-0 self-start object-contain object-left sm:h-8", className)}
    />
  );
}
