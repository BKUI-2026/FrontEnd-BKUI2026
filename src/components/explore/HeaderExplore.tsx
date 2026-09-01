import Image from "next/image";

import { HiasanHeader } from "./HiasanHeader";
import { JudulExplore } from "./JudulExplore";

/**
 * Header halaman Explore UI — ilustrasi perkemahan dengan judul melengkung.
 *
 * Rasionya dikunci ke 1512:885 (ukuran frame Figma) supaya ilustrasinya tidak
 * pernah terpotong: di layar sempit seluruh pemandangan ikut mengecil utuh.
 * Rasio tetap ini juga yang membuat semua lapisan hiasan bisa diposisikan
 * dalam persen, dan yang menjamin tidak ada pergeseran tata letak saat
 * gambarnya selesai dimuat.
 *
 * Langitnya sudah menyatu di dalam `lanskap.webp` (di Figma layer langit
 * terpisahnya disembunyikan pada frame ini), jadi header TIDAK memakai
 * `SectionLangit` — kalau dibungkus, langitnya jadi dobel.
 */
export function HeaderExplore() {
  return (
    <section className="relative isolate overflow-hidden">
      <h1 className="sr-only">
        Yuk, intip 14 fakultas dan 1 pendidikan vokasi di Universitas Indonesia
      </h1>

      <div className="relative aspect-[1512/885] w-full">
        {/* Lapis 1 — lanskap: langit, gunung, pohon, bukit, semak sakura. */}
        <Image
          src="/image/explore/lanskap.webp"
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />

        {/* Lapis 2 — matahari, tenda, maskot (masing-masing bergerak sendiri). */}
        <HiasanHeader />

        {/* Lapis 3 — judul. */}
        <JudulExplore />
      </div>

      {/*
        `Rectangle 815` di Figma: strip krem 24px yang memisahkan header dari
        daftar fakultas. Dibuat sebagai kotak CSS, bukan ikut dilebur ke
        gambar — cuma satu warna solid, tidak ada alasan jadi bitmap.
      */}
      <div aria-hidden className="h-6 w-full bg-bkui-strip" />
    </section>
  );
}
