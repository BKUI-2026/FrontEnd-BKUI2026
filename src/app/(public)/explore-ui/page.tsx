import { DaftarFakultas } from "@/components/explore/DaftarFakultas";
import { HeaderExplore } from "@/components/explore/HeaderExplore";
import { LatarHalaman } from "@/components/explore/LatarHalaman";

/**
 * Explore UI — `/explore-ui`
 *
 * Katalog fakultas & program studi UI, mengikuti desain Figma node 551:4325.
 * Susunannya: header ilustrasi → strip pembatas → penyaring rumpun → daftar
 * fakultas berselang-seling.
 *
 * Halaman ini cuma merangkai; seluruh tampilan ada di `components/explore/`
 * dan seluruh teks di `lib/explore-content.ts`.
 *
 * BELUM ADA DATA DARI API. Deskripsi fakultas berasal dari dokumen konten tim,
 * sementara daftar prodi selain Fasilkom dan foto masih placeholder. Endpoint
 * `Content` belum ada, jadi shape response-nya tidak dikarang duluan (README
 * boundary nomor 4). Catatan lengkap ada di `lib/explore-content.ts`.
 *
 * Latar langitnya dipasang lewat `LatarHalaman`, yang membungkus SELURUH isi —
 * di Figma latar itu memang milik frame halaman, bukan milik satu section.
 * Header ikut dibungkus tapi menutupinya sendiri dengan komposisi layer hero.
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
