import Image from "next/image";
import Link from "next/link";

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
 * Tombol "Jelajahi Lebih Lanjut" di Figma ikut menempel di gambar. Tombol itu
 * SUDAH DIHAPUS dari file ilustrasi (`hero-bkui2026.webp`) dan diganti tombol
 * HTML sungguhan, supaya bisa difokus lewat keyboard, terbaca screen reader,
 * dan ukurannya menyesuaikan layar.
 */

/** Anchor tujuan tombol — section pertama setelah hero. */
const TUJUAN_JELAJAHI = "#apa-itu-bkui";

/**
 * Warna tepi bawah ilustrasi, disalin dari piksel baris terakhir gambar.
 * Dipakai buat menyambung strip tombol versi mobile supaya tidak ada garis
 * batas yang kelihatan antara gambar dan strip di bawahnya.
 */
const SAMBUNGAN_RUMPUT =
  "linear-gradient(to right, #6EBF08 0%, #71C009 30%, #EAD105 45%, #EAD105 100%)";

export function Hero() {
  const labelTombol = (
    <>
      Jelajahi Lebih Lanjut
      <span aria-hidden className="text-xl leading-none">
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
        <Image
          src="/image/landing/hero-bkui2026.webp"
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          // Gambar pertama yang dilihat pengunjung — dimuat lebih dulu supaya
          // tidak ada jeda kosong di atas halaman.
          priority
          className="object-cover"
        />

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
