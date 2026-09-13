import Image from "next/image";
import type { ReactNode } from "react";

/** Latar bentang alam Dashboard, disusun dari aset ekspor node Figma. */
export function LatarDashboard({ children }: { children: ReactNode }) {
  return (
    <section className="relative isolate min-h-[885px] overflow-hidden bg-bkui-button">
      <Image
        src="/image/dashboard/awan-tekstur.webp"
        alt=""
        aria-hidden
        fill
        priority
        sizes="100vw"
        className="-z-30 object-cover opacity-50 mix-blend-soft-light"
      />

      <Image
        src="/image/dashboard/pohon-kiri.svg"
        alt=""
        aria-hidden
        width={492}
        height={549}
        priority
        className="pointer-events-none absolute -left-48 top-0 -z-20 hidden h-[549px] w-[492px] lg:block"
      />
      <Image
        src="/image/dashboard/rumput.svg"
        alt=""
        aria-hidden
        width={2785}
        height={654}
        className="pointer-events-none absolute -bottom-20 left-1/2 -z-20 h-[66%] w-[185%] max-w-none -translate-x-1/2"
      />

      <Image src="/image/dashboard/semak-1.svg" alt="" aria-hidden width={663} height={314} className="pointer-events-none absolute -bottom-24 -left-44 -z-10 hidden w-[430px] lg:block" />
      <Image src="/image/dashboard/semak-2.svg" alt="" aria-hidden width={801} height={479} className="pointer-events-none absolute -bottom-44 -left-52 -z-10 hidden w-[520px] lg:block" />
      <Image src="/image/dashboard/jamur-1.svg" alt="" aria-hidden width={82} height={100} className="pointer-events-none absolute bottom-6 right-[9%] -z-10 hidden w-16 lg:block" />
      <Image src="/image/dashboard/jamur-2.svg" alt="" aria-hidden width={57} height={69} className="pointer-events-none absolute bottom-16 right-[22%] -z-10 hidden w-11 lg:block" />
      <Image src="/image/dashboard/jamur-3.svg" alt="" aria-hidden width={57} height={69} className="pointer-events-none absolute bottom-28 right-[5%] -z-10 hidden w-10 lg:block" />

      <div className="relative z-10 mx-auto flex min-h-[885px] w-full max-w-[1400px] items-center px-5 py-12 sm:px-8 lg:px-10">
        {children}
      </div>
    </section>
  );
}
