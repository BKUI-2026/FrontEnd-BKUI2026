import Link from "next/link";

import { HeroIlustrasi } from "./HeroIlustrasi";

/**
 * Hero Landing Page — ilustrasi perkemahan "Makara Expedition" + CTA turun.
 *
 * Judul "Selamat Datang di BKUI 2026" adalah bagian dari ilustrasi: di Figma
 * teksnya dilengkungkan mengikuti path dan diberi outline berlapis, jadi
 * bentuknya tidak bisa direproduksi dengan teks HTML tanpa kehilangan
 * karakternya. Karena itu ilustrasinya dipakai apa adanya, dan judul yang
 * sebenarnya ditulis sebagai <h1> khusus screen reader — supaya halaman tetap
 * punya satu heading level 1 yang benar untuk pembaca layar dan mesin pencari.
 *
 * Ilustrasinya sendiri SVG (lihat `HeroIlustrasi`), bukan lagi satu WebP rata.
 * Versi WebP-nya cuma 1x kanvas Figma sehingga berbayang di layar retina.
 *
 * Tombol "Jelajahi Lebih Lanjut" di Figma ikut menempel di ilustrasi. Grup
 * `Button`-nya SUDAH DIBUANG dari SVG hasil ekspor dan diganti tombol HTML
 * sungguhan, supaya bisa difokus lewat keyboard, terbaca screen reader, dan
 * ukurannya menyesuaikan layar.
 */

/** Anchor tujuan tombol — section pertama setelah hero. */
const TUJUAN_JELAJAHI = "#apa-itu-bkui";

/**
 * Warna tepi bawah ilustrasi, diukur dari empat baris piksel terakhir hasil
 * render. Dipakai buat menyambung strip tombol versi mobile supaya tidak ada
 * garis batas yang kelihatan antara ilustrasi dan strip di bawahnya.
 *
 * Angkanya WAJIB diukur ulang kalau ilustrasinya berubah — nilai lama masih
 * disalin dari `hero-bkui2026.webp` dan langsung meleset jauh begitu hero-nya
 * diganti SVG, karena tepi bawah versi vektor jauh lebih pucat.
 *
 * Batang pohon yang gelap di sekitar 90% sengaja tidak dijadikan stop: di
 * ilustrasi ia cuma selebar batang, tapi sebagai stop gradien ia akan melebar
 * jadi pita cokelat selebar layar.
 */
const SAMBUNGAN_RUMPUT =
  "linear-gradient(to right, #70B536 0%, #9ECC46 30%, #F8F2DA 58%, #E5D145 76%, #DDD586 100%)";

export function Hero() {
  const labelTombol = (
    <>
      Jelajahi Lebih Lanjut
      <span aria-hidden className="naik-turun text-xl leading-none">
        ↓
      </span>
    </>
  );

  return (
    <section className="relative">
      <h1 className="sr-only">Selamat Datang di BKUI 2026</h1>

      {/*
        Rasio dikunci ke 1512:885 (ukuran frame di Figma) supaya ilustrasinya
        tidak pernah terpotong — di layar sempit gambarnya ikut mengecil utuh.
      */}
      <div className="relative aspect-[1512/885] w-full">
        {/*
          Ilustrasinya menempati seluruh kotak berasio tetap ini. Karena SVG,
          tidak ada yang perlu dimuat lebih dulu: markup-nya sudah ikut di HTML
          dan tergambar begitu halaman sampai — tidak ada jeda kosong seperti
          waktu masih berupa gambar.
        */}
        <div className="absolute inset-0">
          <HeroIlustrasi />
        </div>

        {/*
          Posisi tombol mengikuti Figma (tengah, 86.9% dari atas frame). Karena
          pembungkusnya rasio tetap, posisi persen ini tetap pas di lebar layar
          berapapun.

          Disembunyikan di bawah breakpoint md: di layar sempit tinggi
          ilustrasinya cuma ~200px, dan tombol setinggi 56px di atasnya akan
          menutupi hampir separuh gambar.
        */}
        <div className="absolute left-1/2 top-[86.9%] hidden -translate-x-1/2 -translate-y-1/2 md:block">
          <TombolJelajahi>{labelTombol}</TombolJelajahi>
        </div>
      </div>

      {/* Versi mobile — tombol turun ke strip sendiri di bawah ilustrasi. */}
      <div
        className="flex justify-center px-5 pb-8 pt-2 md:hidden"
        style={{ backgroundImage: SAMBUNGAN_RUMPUT }}
      >
        <TombolJelajahi>{labelTombol}</TombolJelajahi>
      </div>
    </section>
  );
}

/**
 * Tombol turun ke section berikutnya.
 *
 * Sengaja memakai anchor `#`, bukan handler JavaScript: tanpa JS pun tetap
 * jalan, dapat perilaku fokus keyboard yang benar secara gratis, dan tidak
 * memaksa hero jadi client component.
 */
function TombolJelajahi({ children }: { children: React.ReactNode }) {
  return (
    <Link
      href={TUJUAN_JELAJAHI}
      className="inline-flex h-14 items-center justify-center gap-3 rounded-full bg-bkui-navbar px-7 font-ui text-base font-medium text-bkui-teks shadow-[0_4px_14px_rgba(0,0,0,0.18)] transition-transform hover:-translate-y-0.5 focus-visible:-translate-y-0.5 sm:h-16 sm:px-9 sm:text-xl"
    >
      {children}
    </Link>
  );
}
