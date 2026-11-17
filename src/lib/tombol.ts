const DASAR =
  "tombol-kertas inline-flex items-center justify-center gap-2 rounded-3xl text-center font-ui font-medium leading-none disabled:cursor-not-allowed disabled:bg-none disabled:bg-bkui-nonaktif disabled:text-bkui-teks-nonaktif";

const UKURAN = {
  kecil: "h-12 px-8 text-base",
  besar: "h-16 px-9 text-xl",
} as const;

const WARNA = {
  sekunder: "bg-gradient-to-b from-bkui-oren to-bkui-oren-muda text-bkui-coklat",
  terang: "bg-bkui-navbar text-bkui-teks",
} as const;

/** Kelas komponen `Button` di Design System Figma (`30:2197`). */
export function kelasTombol(warna: keyof typeof WARNA = "sekunder", ukuran: keyof typeof UKURAN = "kecil"): string {
  return `${DASAR} ${UKURAN[ukuran]} ${WARNA[warna]}`;
}

