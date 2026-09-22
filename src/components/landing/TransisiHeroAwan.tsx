import Image from "next/image";

/**
 * Pita awan khusus di batas Hero → "Apa Itu BKUI".
 *
 * Dibuat berbeda dari `FogTransition`: transisi ini mempunyai urutan warna
 * langit → putih bertekstur awan → langit. Tingginya nol dalam layout, jadi
 * ia hanya menumpuk pada ruang kosong di awal section "Apa Itu BKUI" dan
 * tidak menambah jarak sebelum konten.
 */
export function TransisiHeroAwan() {
  return (
    <div aria-hidden className="pointer-events-none relative z-20 h-0">
      <div className="absolute inset-x-0 top-0 h-[86px] -translate-y-1/2 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent_0%,black_18%,black_76%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_18%,black_76%,transparent_100%)] sm:h-[clamp(120px,11vw,168px)]">
        {/* Awan sengaja TIDAK diberi alas putih penuh: bentuk tepi PNG tetap
            terlihat organik. Tiga salinan bertumpuk tipis menutup lebar layar
            tanpa berubah menjadi satu pita putih lurus. */}
        <Image
          src="/icon/landing/latest/awan.png"
          alt=""
          width={2835}
          height={1158}
          sizes="150vw"
          className="absolute left-1/2 top-1/2 h-auto w-[150%] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-60 mix-blend-screen sm:hidden"
        />
        <Image
          src="/icon/landing/latest/awan.png"
          alt=""
          width={2835}
          height={1158}
          sizes="(min-width: 1536px) 880px, 58vw"
          className="absolute -left-[14%] top-[45%] hidden h-auto w-[58vw] min-w-[320px] max-w-[880px] -translate-y-1/2 opacity-75 mix-blend-screen sm:block"
        />
        <Image
          src="/icon/landing/latest/awan.png"
          alt=""
          width={2835}
          height={1158}
          sizes="(min-width: 1536px) 880px, 58vw"
          className="absolute left-[21%] top-1/2 hidden h-auto w-[58vw] min-w-[320px] max-w-[880px] -translate-y-1/2 opacity-90 mix-blend-screen sm:block"
        />
        <Image
          src="/icon/landing/latest/awan.png"
          alt=""
          width={2835}
          height={1158}
          sizes="(min-width: 1536px) 880px, 58vw"
          className="absolute left-[56%] top-[54%] hidden h-auto w-[58vw] min-w-[320px] max-w-[880px] -translate-y-1/2 opacity-75 mix-blend-screen sm:block"
        />
      </div>
    </div>
  );
}
