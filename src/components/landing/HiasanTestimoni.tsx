import Image from "next/image";

/**
 * Pohon sakura, bukit, dan semak dari aset vektor Figma, membingkai kartu
 * testimoni.
 *
 * URUTAN PENTING: bukit kuning (`testi-orange-swoop`) digambar SESUDAH kedua
 * bukit biru. Sebelumnya ia yang pertama, jadi tertimbun biru dan yang tersisa
 * cuma segaris tipis di tepi bawah — padahal di Figma bukit kuning justru
 * berdiri di depan pita biru.
 */
export function HiasanTestimoni() {
  const base = "/icon/landing/latest/";
  const leftTree = "absolute -left-[12%] top-[5%] h-[84%] w-auto max-w-none sm:-left-[3%] hidden lg:block";
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <Image src={`${base}testi-tree-trunk.svg`} alt="" width={646} height={1321} className="absolute -right-[12%] top-[5%] h-[84%] w-auto max-w-none -scale-x-100 sm:-right-[3%] hidden lg:block lg:block" />
      <Image src={`${base}testi-tree-trunk.svg`} alt="" width={646} height={1321} className={leftTree} />
      <Image
        src={`${base}bottom-part-testi.webp`}
        alt=""
        width={1512}
        height={1138}
        sizes="100vw"
        className="absolute bottom-0 right-0 h-[45vw] w-full max-w-none object-cover object-bottom sm:h-auto sm:object-contain"
      />

      <Image src={`${base}testi-tree-canopy-1.svg`} alt="" width={482} height={300} className="absolute -left-[12%] -top-[1%] w-[38%] max-w-none sm:-left-[8%] sm:w-[50%] hidden lg:block" />
      <Image src={`${base}testi-tree-canopy-3.svg`} alt="" width={722} height={310} className="absolute -left-[15%] top-[2%] w-[40%] max-w-none sm:-left-[11%] sm:w-[52%] hidden lg:block" />

      <Image src={`${base}testi-tree-canopy-1.svg`} alt="" width={482} height={300} className="absolute -right-[12%] -top-[1%] w-[38%] max-w-none -scale-x-100 sm:-right-[8%] sm:w-[50%] hidden lg:block" />
      <Image src={`${base}testi-tree-canopy-3.svg`} alt="" width={722} height={310} className="absolute -right-[15%] top-[2%] w-[40%] max-w-none -scale-x-100 sm:-right-[11%] sm:w-[52%] hidden lg:block" />
    {/* <Image src="/icon/landing/testi/tanah-1.svg" alt="" width={1744} height={431} className="absolute bottom-0 left-[12%] h-[16%] w-[82%] max-w-none" />
      <Image src="/icon/landing/testi/tanah-2.svg" alt="" width={1544} height={250} className="absolute bottom-[1%] left-1/2 h-auto w-[105%] max-w-none -translate-x-1/2" />
      <Image src={`${base}testi-orange-swoop.svg`} alt="" width={1786} height={951} className="absolute -bottom-[78%] -left-[28%] w-[126%] max-w-none rotate-[20deg]" />
      <Image src={`${base}testi-bottom.svg`} alt="" width={1616} height={224} className="absolute -bottom-[11%] left-[26%] h-auto w-[82%] max-w-none -scale-y-100" />
      <Image src={`${base}arah-plants.svg`} alt="" width={500} height={474} className="absolute -bottom-[1%] -right-[2%] w-[15%] max-w-none" />
      <Image src="/icon/landing/bunga-besar.svg" alt="" width={153} height={160} className="absolute -bottom-[7vw] -right-[5%] w-[14%] max-w-none" /> */}

    </div>
  );
}
