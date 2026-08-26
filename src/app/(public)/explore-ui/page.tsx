import { PagePlaceholder } from "@/components/PagePlaceholder";

/**
 * Explore UI — `/explore-ui`
 *
 * Konten diambil dari entity `Content` di BE, tapi endpoint-nya belum ada.
 * Jangan karang shape response-nya (README boundary nomor 4).
 */
export default function ExploreUIPage() {
  return (
    <PagePlaceholder
      title="Explore UI"
      akses="General Public"
      keterangan="Halaman jelajah informasi seputar Universitas Indonesia. Sumber datanya entity Content di BE — endpoint belum tersedia."
    />
  );
}
