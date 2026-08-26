import { PagePlaceholder } from "@/components/PagePlaceholder";

/**
 * Profile — `/profile`
 *
 * Butuh login (Student). Belum ada guard autentikasi karena endpoint auth di BE
 * belum ada — guard menyusul setelah kontraknya rilis.
 */
export default function ProfilePage() {
  return (
    <PagePlaceholder
      title="Profile"
      akses="Student"
      keterangan="Halaman profil akun. Butuh login. Endpoint auth & profil belum tersedia di BE."
    />
  );
}
