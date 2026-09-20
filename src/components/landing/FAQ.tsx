import Image from "next/image";

import {
  SectionLangit,
  StripPembatas,
} from "@/components/landing/SectionLangit";
import { JudulSticker } from "@/components/ui/JudulSticker";
import { Muncul } from "@/components/ui/Muncul";
import { SponsorCarousel } from "@/components/landing/SponsorCarousel";
import { DAFTAR_FAQ, type ItemFAQ } from "@/lib/landing-content";

/**
 * Section Frequently Asked Questions — accordion.
 *
 * Dibangun dari <details>/<summary> bawaan HTML, BUKAN state React. Karena itu
 * komponen ini tetap server component: tidak ada JavaScript yang perlu dikirim
 * ke browser hanya untuk buka-tutup panel, accordion-nya sudah bisa dibuka
 * sebelum JS selesai dimuat, dan perilaku keyboard serta pembacaan screen reader
 * ditangani browser sendiri.
 *
 * Beberapa panel boleh terbuka bersamaan (tidak dikunci satu-satunya) — di
 * Figma tidak ada indikasi panel lain harus tertutup, dan memaksa menutup
 * jawaban yang sedang dibaca orang lebih menjengkelkan daripada membantu.
 */
export function FAQ() {
  return (
    <SectionLangit
      className="pt-[max(64px,7.54vw)]"
      dekorasi={
        <>
          <StripPembatas />
          <Image src="/icon/landing/latest/faq-decoration.svg" alt="" aria-hidden width={965} height={424} className="pointer-events-none absolute -left-[5%] -top-[8%] -z-10 w-[110%] max-w-none opacity-90" />
          <Image src="/icon/landing/latest/faq-grass-back.svg" alt="" aria-hidden width={2634} height={811} className="pointer-events-none absolute -bottom-[15%] left-[-22%] -z-10 w-[160%] max-w-none" />
          <Image src="/icon/landing/latest/faq-grass-front.svg" alt="" aria-hidden width={2576} height={482} className="pointer-events-none absolute -bottom-[12%] left-[-22%] -z-10 w-[160%] max-w-none" />
        </>
      }
    >
      <div className="relative mx-auto flex w-full max-w-[1144px] flex-col items-center gap-8 px-5 sm:gap-14 sm:px-8">
        <Muncul>
          <JudulSticker as="h2" ukuran="h1" className="text-center">
            Frequently Asked Questions
          </JudulSticker>
        </Muncul>

        <ul className="flex w-full flex-col gap-6">
          {DAFTAR_FAQ.slice(0, 6).map((item, i) => (
            <li key={item.id}>
              <Muncul jeda={i * 80}>
                {/* Panel pertama terbuka sejak awal, sama seperti di Figma. */}
                <BarisFAQ item={item} terbukaAwal={i === 0} />
              </Muncul>
            </li>
          ))}
        </ul>
        {DAFTAR_FAQ.length > 6 && (
          <details className="group w-full">
            <summary className="mx-auto flex w-fit cursor-pointer list-none items-center gap-2 rounded-full bg-bkui-hijau px-6 py-3 font-ui text-lg text-white [&::-webkit-details-marker]:hidden">
              Lihat pertanyaan lainnya
              <Image src="/icon/landing/chevron-bawah.svg" alt="" aria-hidden width={24} height={24} className="size-6 brightness-0 invert transition-transform group-open:rotate-180" />
            </summary>
            <ul className="mt-6 flex flex-col gap-6">
              {DAFTAR_FAQ.slice(6).map((item) => (
                <li key={item.id}><BarisFAQ item={item} terbukaAwal={false} /></li>
              ))}
            </ul>
          </details>
        )}
      </div>
      <SponsorCarousel tergabung />
    </SectionLangit>
  );
}

function BarisFAQ({
  item,
  terbukaAwal,
}: {
  item: ItemFAQ;
  terbukaAwal: boolean;
}) {
  return (
    <details
      open={terbukaAwal}
      // `group` dipakai supaya ikon chevron bisa ikut berputar saat panelnya
      // terbuka, lewat varian `group-open:`.
      className="group rounded-3xl border-4 border-bkui-hijau-garis bg-gradient-to-b from-bkui-kartu-atas to-bkui-kartu-bawah px-6 py-5 transition-transform duration-300 hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:px-8 sm:py-6"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-body text-base font-medium leading-[1.4] text-bkui-hijau-garis group-open:font-bold sm:text-xl [&::-webkit-details-marker]:hidden">
        {item.pertanyaan}
        <Image
          src="/icon/landing/chevron-bawah.svg"
          alt=""
          aria-hidden
          width={28}
          height={28}
          className="w-6 shrink-0 transition-transform group-open:-scale-y-100 sm:w-7"
        />
      </summary>

      <p className="mt-3 font-body text-base font-medium leading-[1.4] text-bkui-hijau-garis sm:text-xl">
        {item.jawaban}
      </p>
    </details>
  );
}
