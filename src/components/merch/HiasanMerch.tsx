import { MERCH_DEKOR_SVG } from "./merch-dekor.svg";

/**
 * Lapisan ilustrasi halaman Merchandise: gunung bersalju di kiri atas, pohon
 * cemara di kiri bawah, semak sakura di kanan, semak zaitun di kanan bawah.
 *
 * SVG, bukan gambar rata — tajam di layar berapa pun kerapatannya. Disisipkan
 * langsung ke halaman (bukan `<img src="...">`) karena teksturnya berupa enam
 * berkas WebP terpisah, dan SVG yang dimuat lewat `<img>` dijalankan terkunci:
 * ia tidak boleh mengambil berkas dari luar dirinya.
 *
 * DITEMPEL KE TEPI BAWAH, bukan atas. Kanvas Figma tingginya tetap 1774px
 * sementara tinggi halaman di web ikut isinya — sembilan kartu di desktop,
 * bertumpuk jadi jauh lebih panjang di HP. Sebagian besar dekorasi (tanah,
 * pohon, semak) duduk di dasar halaman, jadi menempel dari bawah membuat
 * dasarnya selalu pas. Kalau ditempel dari atas, gunung dan pohonnya
 * menggantung di tengah katalog.
 *
 * `min-w-[1100px]` menahannya supaya tidak ikut mengecil habis di layar
 * sempit — kalau dibiarkan menyusut, gunung dan pohonnya terlalu kecil untuk
 * terbaca. Kelebihannya meluber lalu terpotong `overflow-hidden` milik
 * halaman.
 */
export function HiasanMerch() {
  return (
    <svg
      viewBox="0 0 1512 1774"
      /*
       * `fill="none"` wajib: sebagian bentuk di sini cuma bergaris tanpa
       * isian, dan di SVG bentuk tanpa atribut `fill` otomatis terisi HITAM.
       * Atribut ini ada di ekspor Figma; karena elemen <svg>-nya ditulis ulang
       * di sini, atributnya ikut ditulis ulang juga.
       */
      fill="none"
      preserveAspectRatio="xMidYMax meet"
      aria-hidden
      focusable="false"
      className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-auto w-full min-w-[1100px]"
      dangerouslySetInnerHTML={{ __html: MERCH_DEKOR_SVG }}
    />
  );
}
