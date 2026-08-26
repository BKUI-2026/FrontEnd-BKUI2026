import { PagePlaceholder } from "@/components/PagePlaceholder";

/**
 * Daftar Mentoring — `/daftar-mentoring`
 *
 * Butuh login (Student) — beda dengan Daftar CASA & School Roadshow yang publik.
 * Salah satu tujuan dari section "Arah Petualangan" di Landing Page.
 *
 * Endpoint-nya belum ada, jangan karang shape request/response-nya.
 */
export default function DaftarMentoringPage() {
  return (
    <PagePlaceholder
      title="Daftar Mentoring"
      akses="Student"
      keterangan="Form pendaftaran program mentoring. Butuh login. Endpoint belum tersedia di BE."
    />
  );
}
