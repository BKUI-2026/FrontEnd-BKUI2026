import Image from "next/image";
import type { ReactNode } from "react";

/**
 * Latar halaman Tiket: rumput hijau tua.
 *
 * Halaman ini satu-satunya yang latarnya BUKAN langit. Di Figma kameranya
 * seolah menunduk ke rumput, jadi `LatarHalaman` milik Explore/Merch tidak
 * dipakai di sini.
 *
 * Warnanya (`bkui-rumput`) diukur dari render Figma pada area rumput yang
 * bersih dari kartu dan bunga — rerata #606420. Di Figma warna itu hasil
 * menumpuk dua rect dan sebuah tekstur ber-blur; hasil akhirnya yang ditiru,
 * bukan cara menumpuknya, karena selisihnya tidak terlihat mata sementara
 * meniru filter blur-nya mahal di setiap frame.
 *
 * Teksturnya BERKAS YANG SAMA dengan tekstur rumput ilustrasi Hero — Figma
 * memakai gambar sumber yang sama di kedua tempat. Dipakai ulang supaya tidak
 * ada salinan ketiga di repo.
 *
 * `fixed` supaya rumputnya diam saat halaman di-scroll dan tetap menutup layar
 * berapa pun tinggi halamannya — tiga kartu berjajar di desktop, bertumpuk
 * jauh lebih panjang di HP.
 *
 * Kedua lapisan tekstur HARUS jadi anak langsung elemen berwarna dasar:
 * `mix-blend-mode` berbaur dengan apa yang ada di belakangnya dalam konteks
 * penumpukan yang sama, jadi kalau dibungkus `div` sendiri yang jadi latarnya
 * transparan dan hasilnya tampil mentah.
 */
export function LatarTiket({ children }: { children: ReactNode }) {
  return (
    <div className="relative isolate bg-bkui-rumput">
      <Image
        src="/image/landing/hero/rumput-tekstur.webp"
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        className="pointer-events-none fixed -z-10 object-cover opacity-[0.35] mix-blend-soft-light"
      />

      {/*
        Lapisan butiran selebar kanvas, `multiply` — di Figma ini `Group` yang
        menutupi seluruh frame.

        Tempatnya di sini, bukan di dalam SVG dekorasi. `mix-blend-mode`
        berbaur dengan apa yang ada di belakangnya DALAM konteks penumpukan yang
        sama; begitu alas rumputnya dipindah ke CSS, di dalam SVG ia tidak punya
        apa-apa untuk dikalikan dan tampil mentah sebagai bidang krem yang
        menutupi seluruh halaman.
      */}
      <Image
        src="/image/tiket/butiran.webp"
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        className="pointer-events-none fixed -z-10 object-cover mix-blend-multiply"
      />

      {children}
    </div>
  );
}
