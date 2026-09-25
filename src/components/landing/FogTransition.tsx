import Image from "next/image";

/** Kabut awan berlapis yang memudar di sambungan antarseksi. */
export function FogTransition() {
  return (
    <div aria-hidden className="pointer-events-none relative z-40 h-0">
      <div className="absolute inset-x-0 top-0 h-[168px] -translate-y-1/2 overflow-hidden backdrop-blur-[2px] [mask-image:linear-gradient(to_bottom,transparent_0%,black_28%,black_72%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_28%,black_72%,transparent_100%)] sm:h-[280px]">
        <Image
          src="/image/landing/awan-tekstur.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[center_68%] opacity-45 mix-blend-screen"
        />
        <Image
          src="/icon/landing/latest/awan.png"
          alt=""
          width={2835}
          height={1158}
          sizes="150vw"
          className="absolute left-1/2 top-1/2 h-auto w-[150%] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-90 sm:hidden"
        />
        <Image
          src="/icon/landing/latest/awan.png"
          alt=""
          width={2835}
          height={1158}
          sizes="58vw"
          className="absolute -left-[14%] top-[47%] hidden h-auto w-[58vw] max-w-none -translate-y-1/2 opacity-82 sm:block"
        />
        <Image
          src="/icon/landing/latest/awan.png"
          alt=""
          width={2835}
          height={1158}
          sizes="58vw"
          className="absolute left-[21%] top-1/2 hidden h-auto w-[58vw] max-w-none -translate-y-1/2 opacity-95 sm:block"
        />
        <Image
          src="/icon/landing/latest/awan.png"
          alt=""
          width={2835}
          height={1158}
          sizes="58vw"
          className="absolute left-[56%] top-[53%] hidden h-auto w-[58vw] max-w-none -translate-y-1/2 opacity-82 sm:block"
        />
      </div>
    </div>
  );
}
