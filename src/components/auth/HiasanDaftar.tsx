import { DAFTAR_DEKOR_SVG } from "./daftar-dekor.svg";

/**
 * Lapisan ilustrasi halaman Daftar Akun: pohon di kiri atas, bukit rumput
 * hijau-oranye di bawah, maskot di kanan, jamur dan kelopak.
 *
 * SVG, bukan gambar rata. Disisipkan langsung ke halaman (bukan `<img src>`)
 * karena teksturnya berkas WebP terpisah, dan SVG yang dimuat lewat `<img>`
 * dijalankan terkunci: ia tidak boleh mengambil berkas dari luar dirinya.
 *
 * Dipasang `slice` menutupi seluruh section, bukan ditempel ke satu tepi.
 * Halaman ini isinya cuma satu kartu formulir dan tingginya kira-kira satu
 * layar, tapi berapa pun tingginya nanti, ilustrasi ini harus tetap menutup
 * penuh — pohon di atas dan rumput di bawah sama-sama bagian dari komposisinya,
 * jadi menempel ke salah satu tepi saja akan menyisakan langit kosong di tepi
 * yang lain.
 */
export function HiasanDaftar() {
  return (
    <svg
      viewBox="0 0 1512 982"
      // Wajib: bentuk yang cuma bergaris tanpa isian akan terisi HITAM tanpa
      // atribut ini. Ada di ekspor Figma, ikut ditulis ulang di sini.
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
      focusable="false"
      className="pointer-events-none absolute inset-0 -z-10 size-full"
      dangerouslySetInnerHTML={{ __html: DAFTAR_DEKOR_SVG }}
    />
  );
}
