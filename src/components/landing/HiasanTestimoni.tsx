import Image from "next/image";

/** Elemen pohon sakura dan bukit dari Figma 776:3087, bukan foto section. */
export function HiasanTestimoni() {
  const base = "/icon/landing/latest/";
  const pohon = (
    <>
      <Image src={`${base}testi-tree-trunk.svg`} alt="" width={646} height={1321} className="absolute -left-[45%] top-[20%] h-[86%] w-auto max-w-none" />
      <Image src={`${base}testi-tree-canopy-1.svg`} alt="" width={482} height={385} className="absolute left-[12%] top-[10%] w-[85%] max-w-none -rotate-[25deg] scale-y-[-1]" />
      <Image src={`${base}testi-tree-canopy-2.svg`} alt="" width={550} height={276} className="absolute -left-[32%] top-[17%] w-[98%] max-w-none rotate-[14deg] scale-y-[-1]" />
      <Image src={`${base}testi-tree-canopy-3.svg`} alt="" width={722} height={380} className="absolute -left-[24%] -top-[2%] w-[112%] max-w-none -rotate-[11deg] scale-y-[-1]" />
    </>
  );
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <Image src={`${base}testi-orange-swoop.svg`} alt="" width={1786} height={951} className="absolute -bottom-[62%] left-[-34%] w-[133%] max-w-none rotate-[28deg]" />
      <Image src={`${base}testi-bottom.svg`} alt="" width={1616} height={224} className="absolute -bottom-[7%] left-[-4%] w-[108%] max-w-none" />
      <div className="absolute -left-[17%] -top-[16%] h-[120%] w-[35%] origin-bottom-left tertiup-angin">{pohon}</div>
      <div className="absolute -right-[3%] -top-[12%] h-[120%] w-[38%] origin-bottom-right scale-x-[-1]">{pohon}</div>
      <Image src={`${base}testi-tree-canopy-3.svg`} alt="" width={722} height={380} className="absolute -right-[12%] -top-[9%] w-[48%] max-w-none scale-x-[-1]" />
    </div>
  );
}
