import { HERO_SVG } from "./hero-ilustrasi.svg";

/**
 * Ilustrasi Hero Landing Page — SVG sungguhan, bukan gambar rata.
 *
 * ---------------------------------------------------------------------------
 * Kenapa diganti dari WebP
 * ---------------------------------------------------------------------------
 * Sebelumnya seluruh hero ini satu berkas `hero-bkui2026.webp` berukuran
 * 1512x885 — persis 1x kanvas Figma. Di layar retina (dan hampir semua HP
 * sekarang) gambarnya diperbesar 2-3 kali, jadi judulnya berbayang dan rumput
 * serta sinar mataharinya pecah. Tidak ada mutu WebP yang bisa memperbaiki itu;
 * yang salah bentuknya, bukan kompresinya.
 *
 * Sekarang isinya vektor: tajam di zoom berapa pun, dan tiap layer masih jadi
 * grup tersendiri yang bisa dianimasikan.
 *
 * ---------------------------------------------------------------------------
 * Kenapa disisipkan langsung (inline), bukan <img src="hero.svg">
 * ---------------------------------------------------------------------------
 * Empat teksturnya (langit, rumput, urat kayu, maskot) disimpan sebagai berkas
 * WebP terpisah supaya bisa di-cache browser dan tidak menggelembungkan SVG-nya
 * — kalau ikut ter-embed base64, berkasnya jadi 10 MB.
 *
 * Tapi SVG yang dimuat lewat `<img>` dijalankan terkunci: ia TIDAK boleh
 * mengambil berkas dari luar dirinya, jadi keempat tekstur itu tidak akan
 * pernah muncul. Disisipkan langsung ke halaman, teksturnya dimuat seperti
 * gambar biasa — sekaligus membuat grup di dalamnya bisa disentuh CSS untuk
 * animasi.
 *
 * Ini server component, jadi 238 KB markup-nya ikut di HTML (sekitar 74 KB
 * setelah kompresi) dan TIDAK menambah satu byte pun JavaScript ke browser.
 *
 * `dangerouslySetInnerHTML` di sini aman: isinya berkas statis hasil ekspor
 * yang ikut di repo, bukan masukan dari pengguna atau API.
 */
export function HeroIlustrasi() {
  return (
    <svg
      viewBox="0 0 1512 885"
      /*
       * `fill="none"` WAJIB ada. Sebagian bentuk di ilustrasi ini cuma
       * bergaris tanpa isian, dan di SVG bentuk tanpa atribut `fill`
       * otomatis terisi HITAM. Ekspor Figma menaruh atribut ini di elemen
       * <svg>-nya; karena elemen itu ditulis ulang di sini, atributnya ikut
       * ditulis ulang juga. Tanpa ini muncul bidang hitam besar di bukit
       * kiri bawah.
       */
      fill="none"
      // Ilustrasi murni — judul yang sebenarnya ditulis sebagai <h1> khusus
      // screen reader di `Hero`, jadi jangan sampai dibacakan dua kali.
      aria-hidden
      focusable="false"
      className="hero-ilustrasi h-full w-full"
      dangerouslySetInnerHTML={{ __html: HERO_SVG }}
    />
  );
}
