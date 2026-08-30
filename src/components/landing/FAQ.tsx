import Image from "next/image";

import {
  DekorSection,
  SectionLangit,
  StripPembatas,
} from "@/components/landing/SectionLangit";
import { JudulSticker } from "@/components/ui/JudulSticker";
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
      className="min-h-[73.35vw] pb-16 pt-[max(64px,7.54vw)]"
      dekorasi={
        <>
          <StripPembatas />
          <DekorSection nama="faq" tinggi={1109} />
        </>
      }
    >
      <div className="relative mx-auto flex w-full max-w-[1144px] flex-col items-center gap-8 px-5 sm:gap-14 sm:px-8">
        <JudulSticker as="h2" ukuran="h1" className="text-center">
          Frequently Asked Questions
        </JudulSticker>

        <ul className="flex w-full flex-col gap-6">
          {DAFTAR_FAQ.map((item, i) => (
            <li key={item.id}>
              {/* Panel pertama terbuka sejak awal, sama seperti di Figma. */}
              <BarisFAQ item={item} terbukaAwal={i === 0} />
            </li>
          ))}
        </ul>
      </div>
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
      className="group rounded-3xl border-4 border-bkui-hijau-garis bg-gradient-to-b from-bkui-kartu-atas to-bkui-kartu-bawah px-6 py-5 sm:px-8 sm:py-6"
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
