import { MASUK_DEKOR_SVG } from "./masuk-dekor.svg";

/**
 * Lapisan ilustrasi halaman Masuk: bukit rumput, maskot di kanan, jamur, dan
 * dedaunan di kiri.
 *
 * Alasan teknisnya sama persis dengan `HiasanDaftar` — SVG disisipkan langsung
 * (bukan `<img src>`) karena teksturnya berkas terpisah, dan dipasang `slice`
 * menutupi seluruh section supaya tidak menyisakan langit kosong di salah satu
 * tepi berapa pun tinggi halamannya.
 */
export function HiasanMasuk() {
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
      dangerouslySetInnerHTML={{ __html: MASUK_DEKOR_SVG }}
    />
  );
}
