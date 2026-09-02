import { TIKET_DEKOR_SVG } from "./tiket-dekor.svg";

/**
 * Lapisan ilustrasi halaman Tiket: bunga kuning & semak sakura di kiri atas,
 * matahari oranye di kanan atas, aliran biru dan kelopak di kiri bawah,
 * hamparan kuning di kanan bawah.
 *
 * SVG, bukan gambar rata. Disisipkan langsung ke halaman (bukan `<img src>`)
 * karena teksturnya berkas WebP terpisah, dan SVG yang dimuat lewat `<img>`
 * dijalankan terkunci: ia tidak boleh mengambil berkas dari luar dirinya.
 *
 * DITEMPEL KE TEPI ATAS dengan rasio aslinya, bukan diregangkan. Di desktop
 * tingginya persis sama dengan kanvas Figma sehingga seluruh hiasan pas di
 * tempatnya. Di layar sempit halamannya jauh lebih panjang; sisanya diisi
 * rumput polos dari `LatarTiket` — lebih baik daripada meregangkan ilustrasi
 * sampai gepeng.
 */
export function HiasanTiket() {
  return (
    <svg
      viewBox="0 0 1512 885"
      // Wajib: bentuk yang cuma bergaris tanpa isian akan terisi HITAM tanpa
      // atribut ini. Ada di ekspor Figma, ikut ditulis ulang di sini.
      fill="none"
      aria-hidden
      focusable="false"
      className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-auto w-full min-w-[1100px]"
      dangerouslySetInnerHTML={{ __html: TIKET_DEKOR_SVG }}
    />
  );
}
