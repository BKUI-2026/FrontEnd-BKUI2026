import Image from "next/image";
import type { ReactNode } from "react";

/**
 * Latar langit halaman Explore UI.
 *
 * Di Figma latar ini milik FRAME HALAMAN (`307:2285`), bukan salah satu section
 * — makanya membungkus seluruh isi, bukan dipasang per-section seperti
 * `SectionLangit` di Landing Page.
 *
 * Susunannya TIGA lapis, bukan dua seperti section Landing Page:
 *   1. warna dasar `bkui-langit`
 *   2. `image 928` — tekstur awan, `soft-light`, opacity 38%
 *   3. `image 925` — sapuan awan, `soft-light`
 *
 * Lapis ketiga inilah yang sempat terlewat. Tanpa itu langitnya terlalu pekat
 * DAN terlalu rata — awannya nyaris tidak terlihat, padahal di Figma
 * gumpalannya jelas.
 *
 * ---------------------------------------------------------------------------
 * Kedua gambar HARUS jadi anak langsung elemen berwarna dasar
 * ---------------------------------------------------------------------------
 * `mix-blend-soft-light` berbaur dengan apa yang ada DI BELAKANGNYA dalam
 * konteks penumpukan yang sama. Waktu keduanya sempat saya bungkus dalam satu
 * `div` sendiri, yang jadi latar belakangnya bukan warna dasar melainkan
 * transparan — hasilnya foto awannya tampil mentah dan langitnya berubah jadi
 * mendung berkontras tinggi. Jangan dibungkus.
 *
 * `soft-light` juga bukan detail yang bisa ditukar dengan sekadar menurunkan
 * opacity: mode itu yang bikin awannya MENYATU dengan birunya (mengangkat yang
 * terang, menahan yang gelap) alih-alih menutupinya seperti cat.
 *
 * ---------------------------------------------------------------------------
 * Angkanya diukur, bukan dikira
 * ---------------------------------------------------------------------------
 * Warna dasar dan opacity lapis ketiga dihitung mundur dari render Figma:
 * jalur latar kosong di area konten punya rerata #A0DFFB dengan simpangan baku
 * ~11. Rerata menentukan warna dasarnya, simpangan bakunya menentukan seberapa
 * kuat lapis ketiga — dua angka itu yang bikin birunya DAN kekentalan awannya
 * sama-sama cocok, bukan cuma salah satu.
 *
 * Teksturnya `fixed`, jadi awannya diam saat halaman di-scroll dan langitnya
 * terbaca sebagai satu bentangan, bukan wallpaper yang ikut berjalan.
 * Sekaligus menghindari menggambar ulang tekstur setinggi belasan ribu piksel.
 */
export function LatarHalaman({ children }: { children: ReactNode }) {
  return (
    <div className="relative isolate bg-bkui-langit">
      <Image
        src="/image/landing/awan-tekstur.webp"
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        className="pointer-events-none fixed -z-10 object-cover opacity-[0.38] mix-blend-soft-light"
      />
      <Image
        src="/image/explore/awan-lembut.webp"
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        className="pointer-events-none fixed -z-10 object-cover opacity-[0.75] mix-blend-soft-light"
      />

      {children}
    </div>
  );
}
