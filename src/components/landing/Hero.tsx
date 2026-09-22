import Image from "next/image";
import { TombolJelajahi } from "./TombolJelajahi";

/**
 * Hero Landing Page terbaru — Figma node 776:2545 + CTA turun.
 *
 * Judul "Bedah Kampus UI 2026" adalah bagian dari ilustrasi: di Figma
 * teksnya dilengkungkan mengikuti path dan diberi outline berlapis, jadi
 * bentuknya tidak bisa direproduksi dengan teks HTML tanpa kehilangan
 * karakternya. Karena itu ilustrasinya dipakai apa adanya, dan judul yang
 * sebenarnya ditulis sebagai <h1> khusus screen reader — supaya halaman tetap
 * punya satu heading level 1 yang benar untuk pembaca layar dan mesin pencari.
 *
 * Ilustrasinya sendiri SVG hasil ekspor frame terbaru, bukan WebP rata.
 * Versi WebP-nya cuma 1x kanvas Figma sehingga berbayang di layar retina.
 *
 * Tombol "Jelajahi Lebih Lanjut" di Figma ikut menempel di ilustrasi. Grup
 * `Button`-nya disembunyikan di SVG hasil ekspor dan diganti tombol HTML
 * sungguhan, supaya bisa difokus lewat keyboard, terbaca screen reader, dan
 * ukurannya menyesuaikan layar.
 */

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
  "linear-gradient(to right, #4b8c1a 0%, #5fac30 30%, #764521 58%, #f4df61 80%, #e7d64c 100%)";

export function Hero() {
  const labelTombol = (
    <>
      Jelajahi Lebih Lanjut
    </>
  );

  return (
    <section className="relative">
      <h1 className="sr-only">Bedah Kampus UI 2026</h1>

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
        <Image
          src="/icon/landing/landing-hero-latest.png"
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          priority
          unoptimized
          className="select-none [user-drag:none] [-webkit-user-drag:none]"
        />
        <div aria-hidden className="bikun-masuk pointer-events-none absolute left-[76%] top-[41.6%] w-[24%]">
          <Image
            src="/icon/landing/bikun-extracted.svg"
            alt=""
            width={363}
            height={309}
            unoptimized
            className="bikun-melayang h-auto w-full"
          />
        </div>

        {/*
          Posisi tombol mengikuti Figma (tengah, 86.9% dari atas frame). Karena
          pembungkusnya rasio tetap, posisi persen ini tetap pas di lebar layar
          berapapun.

          Disembunyikan di bawah breakpoint md: di layar sempit tinggi
          ilustrasinya cuma ~200px, dan tombol setinggi 56px di atasnya akan
          menutupi hampir separuh gambar.
        */}
        <div className="absolute left-1/2 top-[89.8%] hidden -translate-x-1/2 -translate-y-1/2 md:block">
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
