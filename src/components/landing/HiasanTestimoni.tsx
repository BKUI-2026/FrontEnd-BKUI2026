import Image from "next/image";

/** Pohon sakura dan semak dari aset vektor Figma, membingkai kartu testimoni. */
export function HiasanTestimoni() {
  const base = "/icon/landing/latest/";
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <Image src={`${base}testi-orange-swoop.svg`} alt="" width={1786} height={951} className="absolute -bottom-[74%] -left-[28%] w-[126%] max-w-none rotate-[20deg]" />
      <Image src={`${base}testi-tree-trunk.svg`} alt="" width={646} height={1321} className="absolute -left-[3%] top-[5%] h-[84%] w-auto max-w-none" />
      <Image src={`${base}testi-tree-canopy-1.svg`} alt="" width={482} height={385} className="absolute -left-[8%] -top-[5%] w-[50%] max-w-none" />
      <Image src={`${base}testi-tree-canopy-3.svg`} alt="" width={722} height={380} className="absolute -left-[11%] top-[1%] w-[52%] max-w-none" />
      <Image src={`${base}testi-tree-trunk.svg`} alt="" width={646} height={1321} className="absolute -right-[3%] top-[5%] h-[84%] w-auto max-w-none -scale-x-100" />
      <Image src={`${base}testi-tree-canopy-1.svg`} alt="" width={482} height={385} className="absolute -right-[8%] -top-[5%] w-[50%] max-w-none -scale-x-100" />
      <Image src={`${base}testi-tree-canopy-3.svg`} alt="" width={722} height={380} className="absolute -right-[11%] top-[1%] w-[52%] max-w-none -scale-x-100" />
      <Image src="/icon/landing/testi/tanah-1.svg" alt="" width={1744} height={431} className="absolute bottom-0 left-[12%] h-[16%] w-[82%] max-w-none" />
      <Image src="/icon/landing/testi/tanah-2.svg" alt="" width={1544} height={250} className="absolute bottom-[1%] left-1/2 h-auto w-[105%] max-w-none -translate-x-1/2" />
      <Image src={`${base}testi-bottom.svg`} alt="" width={1616} height={224} className="absolute bottom-0 left-1/2 h-[clamp(90px,9.25vw,140px)] w-[108%] max-w-none -translate-x-1/2 -scale-y-100" />
      <Image src={`${base}arah-plants.svg`} alt="" width={500} height={474} className="absolute -bottom-[1%] -right-[2%] w-[15%] max-w-none" />
      <Image src="/icon/landing/bunga-besar.svg" alt="" width={153} height={160} className="absolute -bottom-[7vw] -right-[5%] w-[14%] max-w-none" />
    </div>
  );
}
