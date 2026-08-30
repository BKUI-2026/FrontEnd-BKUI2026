import Image from "next/image";

import { DAFTAR_SPONSOR } from "@/lib/landing-content";

/**
 * Deretan sponsor & partner, tepat di atas Footer.
 *
 * Di Figma isinya masih lingkaran hijau kosong — logo aslinya belum diberikan,
 * jadi di sini pun tetap lingkaran placeholder. Menebak sponsor mana saja yang
 * ikut jelas tidak boleh.
 *
 * Meski namanya "carousel" di daftar fitur, yang dibuat adalah baris yang bisa
 * digeser (scroll horizontal), bukan slideshow otomatis:
 * - bisa digeser pakai jari, trackpad, roda mouse, maupun Tab
 * - tidak ada yang bergerak sendiri, jadi logo tidak pernah kabur saat dibaca
 * - kalau logonya sedikit, barisnya otomatis rata tengah tanpa perlu diatur
 *
 * Begitu logo aslinya ada, cukup isi `logo` di `DAFTAR_SPONSOR`; komponen ini
 * tidak perlu diubah.
 */
export function SponsorCarousel() {
  return (
    <section aria-labelledby="judul-sponsor" className="relative isolate min-h-[18.52vw]">
      {/* Pita sponsor + rumput dari Figma, jadi transisi dari FAQ ke footer */}
      <Image
        src="/image/landing/dekor-sponsor.webp"
        alt=""
        aria-hidden
        width={1512}
        height={280}
        sizes="100vw"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-auto w-full min-w-[900px]"
      />

      <h2 id="judul-sponsor" className="sr-only">
        Sponsor dan partner BKUI 2026
      </h2>

      <ul className="flex snap-x snap-mandatory gap-8 overflow-x-auto px-8 py-10 [scrollbar-width:none] sm:justify-center sm:py-14 [&::-webkit-scrollbar]:hidden">
        {DAFTAR_SPONSOR.map((sponsor) => (
          <li key={sponsor.id} className="shrink-0 snap-center">
            {sponsor.logo ? (
              <Image
                src={sponsor.logo}
                alt={sponsor.nama}
                width={160}
                height={160}
                className="size-24 rounded-full object-contain sm:size-40"
              />
            ) : (
              /* Placeholder: lingkaran hijau seperti di Figma. Ditandai
                 aria-hidden karena belum mewakili sponsor manapun. */
              <div
                aria-hidden
                className="size-24 rounded-full bg-bkui-hijau sm:size-40"
              />
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
