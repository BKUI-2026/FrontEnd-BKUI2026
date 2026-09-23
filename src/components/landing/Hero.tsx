import Image from "next/image";
import { CountdownHero } from "./CountdownHero";
import { TombolJelajahi } from "./TombolJelajahi";

/**
 * Hero Landing Page terbaru — Figma node 776:2545 + CTA turun.
 *
 * Judul "Bedah Kampus UI 2026" ditumpuk sebagai teks HTML di atas ilustrasi
 * supaya tetap tajam saat rasio Hero berubah. Tiga lapis warnanya mengikuti
 * stiker judul lain: isi hijau, outline krem, outline pink, dan bayangan.
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
/* Khusus strip CTA mobile: dimulai dari warna jalan di tepi ilustrasi, lalu
   memudar menjadi kabut/langit agar tidak membentuk garis datar di bawah jalan. */
const SAMBUNGAN_JALAN_KE_LANGIT =
  "linear-gradient(to bottom, #70655d 0%, #8eabbc 34%, #d7e8e9 67%, var(--color-bkui-button) 100%)";

export function Hero() {
  const labelTombol = (
    <>
      Jelajahi Lebih Lanjut
    </>
  );

  return (
    <section
      /*
        Latar Hero memakai warna yang sama dengan `SectionLangit`. Mask hanya
        dipasang pada ilustrasinya, sehingga gambar melarut ke langit tanpa
        membuka warna body putih atau menindih konten "Apa Itu BKUI". WebKit
        butuh properti mask versi prefiksnya.
      */
      className="relative z-10 bg-bkui-button"
    >
      {/*
        Desktop memakai rasio frame Figma. Di mobile, Hero diberi tinggi sendiri
        agar judul dan countdown punya ruang napas; ilustrasi menggunakan
        `object-cover`, sehingga tepi ilustrasi boleh terpotong tanpa menyisakan
        ruang kosong sebelum transisi awan.
      */}
        {/*
          `overflow-hidden` di sini bukan sekadar kerapian.

          Bikun berhenti di `left-84%` dengan lebar `20%`, jadi tepi kanannya
          berada di 104% — melewati layar tepat 4% (77px di layar 1920px, 60px
          di 1512px). Tanpa dipotong, luberan itu memanjangkan halaman dan
          seluruh Landing Page bisa digeser ke samping. Saat animasinya
          berjalan, bikun bahkan sampai 110% di luar layar.

          Dipotong memang yang benar: bikun sengaja digambar seolah melaju
          keluar dari bingkai.
        */}
      <div className="relative h-[130vw] min-h-[360px] max-h-[500px] w-full overflow-hidden md:aspect-[1512/900] md:h-auto md:min-h-0 md:max-h-none">
        {/*
          Ilustrasinya menempati seluruh kotak berasio tetap ini. Karena SVG,
          tidak ada yang perlu dimuat lebih dulu: markup-nya sudah ikut di HTML
          dan tergambar begitu halaman sampai — tidak ada jeda kosong seperti
          waktu masih berupa gambar.
        */}
        <Image
          src="/icon/landing/latest/hero-image.png"
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          priority
          unoptimized
          className="select-none object-cover object-center md:object-fill [mask-image:linear-gradient(to_bottom,black_0%,black_66%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_66%,transparent_100%)] [user-drag:none] [-webkit-user-drag:none]"
        />

        {/* Judul yang sebelumnya menyatu dalam ekspor Hero. Tiga salinan tiap
            baris ditumpuk sama seperti `.judul-sticker`, tetapi tidak memakai
            animasi masuk agar Hero langsung terbaca saat halaman dibuka. */}
        <h1 className="pointer-events-none absolute inset-x-0 top-[15%] z-10 flex flex-col items-center text-center font-display leading-none">
          <span className="sr-only">Bedah Kampus UI 2026</span>

          <span aria-hidden className="judul-sticker -my-[0.3em] whitespace-nowrap text-[clamp(3rem,7.3vw,7rem)]">
            <span className="judul-sticker__pink">BEDAH KAMPUS</span>
            <span className="judul-sticker__krem">BEDAH KAMPUS</span>
            <span className="judul-sticker__isi">BEDAH KAMPUS</span>
          </span>
          <span aria-hidden className="judul-sticker -my-[0.34em] text-[clamp(2.45rem,8.2vw,8rem)]">
            <span className="judul-sticker__pink">
              UI <span className="font-ui font-extrabold">2026</span>
            </span>
            <span className="judul-sticker__krem">
              UI <span className="font-ui font-extrabold">2026</span>
            </span>
            <span className="judul-sticker__isi">
              UI <span className="font-ui font-extrabold">2026</span>
            </span>
          </span>
        </h1>

        <div className="pointer-events-none absolute inset-x-0 top-[52%] z-10 sm:top-[54%]">
          <CountdownHero />
        </div>

        <div aria-hidden className="bikun-masuk pointer-events-none absolute left-[76%] top-[50%] w-[24%] md:left-[84%] md:top-[41.6%] md:w-[20%]">
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
        <div className="absolute left-1/2  top-[60%] md:top-[85%] hidden -translate-x-1/2 -translate-y-1/2 md:block">
          <TombolJelajahi>{labelTombol}</TombolJelajahi>
        </div>
      </div>

      {/* Versi mobile — tombol turun ke strip sendiri di bawah ilustrasi. */}
      <div
        className="relative z-30 -mt-20 flex justify-center px-5 pb-6 pt-2 md:hidden"
        style={{ backgroundImage: SAMBUNGAN_JALAN_KE_LANGIT }}
      >
        <TombolJelajahi>{labelTombol}</TombolJelajahi>
      </div>
    </section>
  );
}
