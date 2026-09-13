import { ProfilDashboard } from "@/components/dashboard/ProfilDashboard";

/**
 * Profile — `/profile`
 *
 * Butuh login (Student). Belum ada guard autentikasi karena endpoint auth di BE
 * belum ada — guard menyusul setelah kontraknya rilis.
 */
export default function ProfilePage() {
  return <ProfilDashboard />;
}
