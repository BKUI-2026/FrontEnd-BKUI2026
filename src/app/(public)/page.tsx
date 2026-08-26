import { PagePlaceholder } from "@/components/PagePlaceholder";

/**
 * Landing Page — `/`
 *
 * Nanti memuat section "Arah Petualangan" (istilah PRD): role-routing ke
 * Daftar Mentoring / School Roadshow Registration. Section itu belum dibuat
 * karena butuh acuan Figma — di luar scope FE-0002.
 */
export default function LandingPage() {
  return (
    <PagePlaceholder
      title="Landing Page"
      akses="General Public"
      keterangan="Halaman utama BKUI 2026. Nanti berisi section Arah Petualangan yang mengarahkan pengunjung ke Daftar Mentoring atau School Roadshow Registration."
    />
  );
}
