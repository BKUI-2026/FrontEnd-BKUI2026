import { DaftarFakultas } from "@/components/explore/DaftarFakultas";
import { HeaderExplore } from "@/components/explore/HeaderExplore";
import { LatarHalaman } from "@/components/explore/LatarHalaman";

/**
 * Explore UI — `/explore-ui`
 *
 * Katalog fakultas & program studi UI, mengikuti desain Figma node 307:2285.
 * Susunannya: header ilustrasi → strip pembatas → penyaring rumpun → daftar
 * fakultas berselang-seling.
 *
 * Halaman ini cuma merangkai; seluruh tampilan ada di `components/explore/`
 * dan seluruh teks di `lib/explore-content.ts`.
 *
 * BELUM ADA SATUPUN DATA DARI API. Sumbernya entity `Content` di BE dan
 * endpoint-nya belum ada, jadi shape response-nya tidak boleh dikarang duluan
 * (README boundary nomor 4). Deskripsi, daftar prodi selain Fasilkom, dan foto
 * fakultas masih placeholder — catatannya lengkap di `lib/explore-content.ts`.
 *
 * Latar langitnya dipasang lewat `LatarHalaman`, yang membungkus SELURUH isi —
 * di Figma latar itu memang milik frame halaman, bukan milik satu section.
 * Header ikut dibungkus tapi menutupinya sendiri dengan `lanskap.webp`.
 */
export default function ExploreUIPage() {
  return (
    <main className="flex-1">
      <LatarHalaman>
        <HeaderExplore />

        <section aria-label="Daftar fakultas Universitas Indonesia">
          <DaftarFakultas />
        </section>
      </LatarHalaman>
    </main>
  );
}
