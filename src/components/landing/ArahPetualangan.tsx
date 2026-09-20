import Image from "next/image";

import { SectionLangit } from "@/components/landing/SectionLangit";
import { JudulSticker } from "@/components/ui/JudulSticker";

const MATA_ACARA = [
  {
    judul: "Bedah Universitas",
    deskripsi:
      "Sesi gelar wicara inspiratif yang menghadirkan jajaran alumni UI. Fokus utamanya adalah memberikan gambaran kepada peserta mengenai dinamika kehidupan selama masa perkuliahan.",
  },
  {
    judul: "Bedah Fakultas",
    deskripsi:
      "Kegiatan penjelajahan yang mengajak peserta turun langsung merasakan atmosfer fakultas impian mereka, peserta akan diajak berkeliling UI menggunakan Bis Kuning.",
  },
  {
    judul: "Bedah Jurusan",
    deskripsi:
      "Menghadirkan venue eksibisi di sekitar balairung UI yang diisi dengan perwakilan setiap program studi di UI. Sesi ini menjadi kesempatan bagi para peserta untuk berdiskusi dan menggali informasi sedalam mungkin.",
  },
] as const;

/**
 * Posisi tiap papan pada kanvas Figma 1512 × 1148.
 *
 * Nilai `top` diambil dari koordinat frame papannya di Figma — y 305, 297, dan
 * 667 — bukan dikira-kira. Sebelumnya ketiganya ~20px terlalu tinggi, yang
 * bikin papan atas nyaris menempel ke pil "Mata Acara".
 */
const POSISI_PAPAN = [
  "lg:left-[7.21%] lg:top-[26.57%]",
  "lg:left-[51.65%] lg:top-[25.87%]",
  "lg:left-[29.43%] lg:top-[58.10%]",
] as const;

/**
 * Kemiringan tiap papan, mengikuti Figma.
 *
 * Angkanya bukan kira-kira: tepi atas ketiga papan diukur dari render Figma
 * node `776:2920`, hasilnya −1,50° / +1,51° / −1,49°. Dibulatkan ke 1,5°
 * karena selisihnya di bawah setengah piksel pada lebar papan.
 *
 * Papan kiri & bawah miring berlawanan arah jarum jam, papan kanan searah —
 * itu yang bikin susunannya terlihat "ditempel tangan", bukan kaku sejajar.
 */
const ROTASI_PAPAN = [
  "-rotate-[1.5deg]",
  "rotate-[1.5deg]",
  "-rotate-[1.5deg]",
] as const;

/** Komposisi section Figma 776:2747 pada kanvas 1512 × 1148. */
export function ArahPetualangan() {
  return (
    <SectionLangit tanpaAwan>
      <div className="relative min-h-[1100px] w-full overflow-hidden pb-28 pt-20 [container-type:inline-size] lg:aspect-[1512/1148] lg:min-h-0 lg:p-0">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 hidden h-[12%] bg-gradient-to-b from-[#add919] via-[#add919] to-transparent lg:block" />
        <Image
          src="/icon/landing/latest/arah-hijau-atas.svg"
          alt=""
          aria-hidden
          width={1924}
          height={773}
          className="pointer-events-none absolute -left-[33.93%] -top-[43.95%] h-auto w-[135.33%] max-w-none -rotate-[12.55deg]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-[33.93%] -top-[43.95%] aspect-[1924/773] w-[135.33%] -rotate-[12.55deg] bg-[url('/image/landing/hero/rumput-tekstur.webp')] bg-cover opacity-25 mix-blend-soft-light [mask-image:url('/icon/landing/latest/arah-hijau-atas.svg')] [mask-repeat:no-repeat] [mask-size:100%_100%]"
        />
        <Image
          src="/image/landing/awan-tekstur.webp"
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          className="pointer-events-none object-cover opacity-[0.38] mix-blend-soft-light [mask-image:linear-gradient(to_bottom,transparent,black_18%,black_78%,transparent)]"
        />
        <Image
          src="/icon/landing/latest/arah-banner-latest.svg"
          alt=""
          aria-hidden
          width={1805}
          height={1007}
          className="pointer-events-none absolute -left-[13.69%] top-[2.09%] h-auto w-[119.35%] max-w-none"
        />
        <Image
          src="/icon/landing/latest/arah-bukit-kiri.svg"
          alt=""
          aria-hidden
          width={1325}
          height={626}
          className="pointer-events-none absolute -left-[22%] bottom-[-24%] h-auto w-[82%] max-w-none"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-[22%] bottom-[-24%] aspect-[1325/626] w-[82%] bg-[url('/image/landing/hero/rumput-tekstur.webp')] bg-cover opacity-25 mix-blend-soft-light [mask-image:url('/icon/landing/latest/arah-bukit-kiri.svg')] [mask-repeat:no-repeat] [mask-size:100%_100%]"
        />
        <Image src="/icon/landing/latest/arah-rumput-kecil-1.svg" alt="" aria-hidden width={34} height={23} className="pointer-events-none absolute left-[16.7%] top-[75.4%] h-auto w-[2.3%] min-w-3" />
        <Image src="/icon/landing/latest/arah-rumput-kecil-2.svg" alt="" aria-hidden width={34} height={23} className="pointer-events-none absolute left-[4.4%] top-[81.7%] h-auto w-[2.3%] min-w-3" />
        <Image src="/icon/landing/latest/arah-rumput-kecil-3.svg" alt="" aria-hidden width={34} height={23} className="pointer-events-none absolute left-[7.7%] top-[92.5%] h-auto w-[2.3%] min-w-3" />
        <Image
          src="/icon/landing/latest/arah-bukit-bawah.svg"
          alt=""
          aria-hidden
          width={1413}
          height={452}
          className="pointer-events-none absolute left-[5.6%] top-[91%] h-auto w-[93.4%] max-w-none"
        />
        <Image
          src="/icon/landing/latest/arah-plants.svg"
          alt=""
          aria-hidden
          width={515}
          height={488}
          className="pointer-events-none absolute bottom-[-9%] right-[-7%] z-20 h-auto w-[34.1%] min-w-[240px] max-w-none"
        />

        <div className="relative z-20 flex flex-col items-center gap-3 px-5 text-center lg:absolute lg:inset-x-0 lg:top-[7.93%] lg:gap-[0.6cqw] lg:p-0">
          {/*
            `-my-[0.28em]` membatalkan efek LAYOUT dari padding milik
            `.judul-sticker` — padding itu ada supaya outline pink tebalnya
            tidak terpotong, tapi ikut menambah 0.56em (40px pada font 72px)
            ke tinggi elemen. Akibatnya pil "Mata Acara" terdorong 41px ke
            bawah dan menempel ke papan.

            Paddingnya tetap ada, jadi outline tetap utuh; yang hilang cuma
            sumbangannya ke tinggi baris. Hasilnya teks judul mulai di y=91 dan
            pil di y=200, sama dengan Figma.
          */}
          <JudulSticker as="h2" ukuran="title" className="-my-[0.28em] text-[clamp(22px,4.76cqw,72px)] lg:whitespace-nowrap lg:text-[4.76cqw]">
            Tentukan Arah Petualanganmu
          </JudulSticker>
          <p className="rounded-full bg-gradient-to-r from-bkui-hijau-daun to-bkui-hijau-tua px-4 py-2 font-ui text-sm font-semibold leading-[1.2] text-bkui-netral sm:text-lg lg:px-[1.6cqw] lg:py-[0.66cqw] lg:text-[1.85cqw]">
            Mata Acara Bedah Kampus UI 2026
          </p>
        </div>

        <ul className="relative z-10 mx-auto mt-12 flex w-full max-w-[610px] flex-col gap-5 px-4 sm:px-8 lg:static lg:m-0 lg:max-w-none lg:p-0">
          {MATA_ACARA.map((acara, index) => (
            <li
              key={acara.judul}
              className={`relative h-[260px] w-full sm:aspect-[613/367] sm:h-auto ${POSISI_PAPAN[index]} lg:absolute lg:w-[40.54%]`}
            >
              {/*
                Miring + "timbul" saat disentuh kursor, sesuai catatan desainer
                di Figma. Naik sedikit lalu membesar tipis, dengan bayangan yang
                ikut menebal supaya terbaca sebagai terangkat, bukan sekadar
                bergeser.

                `motion-safe:` dipakai supaya pengguna yang mematikan animasi di
                sistemnya tidak ikut kena gerakannya; papannya tetap miring,
                yang hilang cuma transisinya.
              */}
              <article
                className={`relative flex h-full w-full flex-col items-center justify-center px-[10%] pb-[3%] text-center text-bkui-terang ${ROTASI_PAPAN[index]} drop-shadow-[0_6px_10px_rgba(0,0,0,0.25)] transition-[transform,filter] duration-300 ease-out motion-safe:hover:-translate-y-2 motion-safe:hover:scale-[1.03] motion-safe:hover:drop-shadow-[0_16px_22px_rgba(0,0,0,0.35)]`}
              >
                <Image
                  src="/icon/landing/latest/arah-board.svg"
                  alt=""
                  aria-hidden
                  fill
                  sizes="(min-width: 1024px) 41vw, 610px"
                  className="pointer-events-none z-0"
                />
                <div aria-hidden className="pointer-events-none absolute inset-[5.5%_4%_7.5%] z-0 overflow-hidden rounded-[2%] opacity-55 mix-blend-soft-light">
                  <div className="absolute left-1/2 top-1/2 h-[180%] w-[55%] -translate-x-1/2 -translate-y-1/2 rotate-90 bg-[url('/icon/landing/latest/arah-wood-texture.jpg')] bg-cover bg-center" />
                </div>
                <h3 className="relative z-10 font-display text-[clamp(24px,5vw,48px)] leading-[1.4] [text-shadow:1px_2px_1px_#1a2731] [-webkit-text-stroke:1px_#1a2731] lg:text-[3.175cqw]">
                  {acara.judul}
                </h3>
                <p className="relative z-10 max-w-[393px] font-body text-sm font-medium leading-[1.4] sm:text-lg lg:max-w-[69%] lg:text-[1.323cqw]">
                  {acara.deskripsi}
                </p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </SectionLangit>
  );
}
