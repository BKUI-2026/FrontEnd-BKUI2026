import { PagePlaceholder } from "@/components/PagePlaceholder";

/**
 * School Roadshow Registration — `/school-roadshow`
 *
 * Diisi PJ Sekolah (istilah PRD: perwakilan sekolah). PJ Sekolah mengakses
 * TANPA akun dan TANPA role khusus — makanya halaman ini ada di route group
 * (public), bukan (student). PJ Sekolah bukan role RBAC baru.
 *
 * Setelah submit, BE yang memicu email konfirmasi ke sekolah — FE cuma kirim
 * form. Endpoint-nya belum ada, jangan karang shape request/response-nya.
 */
export default function SchoolRoadshowRegistrationPage() {
  return (
    <PagePlaceholder
      title="School Roadshow Registration"
      akses="General Public"
      keterangan="Form pendaftaran roadshow sekolah, diisi PJ Sekolah tanpa perlu akun. Email konfirmasi dikirim oleh BE setelah submit. Endpoint belum tersedia."
    />
  );
}
