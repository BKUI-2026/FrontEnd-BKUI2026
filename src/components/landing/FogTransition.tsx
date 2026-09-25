import Image from "next/image";

/** Kabut awan berlapis yang memudar di sambungan antarseksi. */
export function FogTransition() {
  return (
    <div aria-hidden className="pointer-events-none relative z-20 h-0">
      <div className="absolute inset-x-0 top-0 h-[112px] -translate-y-1/2 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent_0%,black_22%,black_78%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_22%,black_78%,transparent_100%)] sm:h-[144px]">
        <Image
          src="/icon/landing/latest/awan.png"
          alt=""
          width={2835}
          height={1158}
          sizes="150vw"
          className="absolute left-1/2 top-1/2 h-auto w-[150%] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-70 sm:hidden"
        />
        <Image
          src="/icon/landing/latest/awan.png"
          alt=""
          width={2835}
          height={1158}
          sizes="58vw"
          className="absolute -left-[14%] top-[45%] hidden h-auto w-[58vw] max-w-none -translate-y-1/2 opacity-70 sm:block"
        />
        <Image
          src="/icon/landing/latest/awan.png"
          alt=""
          width={2835}
          height={1158}
          sizes="58vw"
          className="absolute left-[21%] top-1/2 hidden h-auto w-[58vw] max-w-none -translate-y-1/2 opacity-85 sm:block"
        />
        <Image
          src="/icon/landing/latest/awan.png"
          alt=""
          width={2835}
          height={1158}
          sizes="58vw"
          className="absolute left-[56%] top-[54%] hidden h-auto w-[58vw] max-w-none -translate-y-1/2 opacity-70 sm:block"
        />
      </div>
    </div>
  );
}
