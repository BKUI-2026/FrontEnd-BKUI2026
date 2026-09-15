import { ApaItuBKUI } from "@/components/landing/ApaItuBKUI";
import { ArahPetualangan } from "@/components/landing/ArahPetualangan";
import { FAQ } from "@/components/landing/FAQ";
import { Hero } from "@/components/landing/Hero";
import { TestimoniCASA } from "@/components/landing/TestimoniCASA";
import { TokohInspirasi } from "@/components/landing/TokohInspirasi";
import { VideoBKUI } from "@/components/landing/VideoBKUI";

/**
 * Landing Page — `/`
 *
 * Urutan section mengikuti desain Figma terbaru (node 776:2541) dan daftar fitur di
 * AGENTS.md bagian 4 nomor 2: hero → deskripsi → video → Arah Petualangan →
 * Previous Speakers + Timeline → Testimoni CASA → FAQ → Sponsor → Footer.
 *
 * Halaman ini sengaja cuma merangkai; semua tampilan ada di komponen masing-
 * masing di `components/landing/`, dan semua teks konten di
 * `lib/landing-content.ts`.
 *
 * BELUM ADA SATUPUN DATA DARI API. Endpoint Content di BE belum ada, jadi
 * seluruh isinya masih dummy — lihat catatan di `lib/landing-content.ts`.
 *
 * Navbar & Footer tidak dipanggil di sini karena sudah dipasang di root layout.
 */
export default function LandingPage() {
  return (
    <main className="flex-1">
      <Hero />
      <ApaItuBKUI />
      <VideoBKUI />
      <ArahPetualangan />
      <TokohInspirasi />
      <TestimoniCASA />
      <FAQ />
    </main>
  );
}
