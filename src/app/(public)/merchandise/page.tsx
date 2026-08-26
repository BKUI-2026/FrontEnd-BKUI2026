import { PagePlaceholder } from "@/components/PagePlaceholder";

/**
 * Merchandise Catalog — `/merchandise`
 *
 * HANYA katalog + CTA redirect keluar ke Yesplis.
 * DILARANG bikin cart, checkout, atau form pembayaran di sini
 * (README boundary nomor 1). Transaksi sepenuhnya di Yesplis.
 *
 * URL tujuan: env `NEXT_PUBLIC_YESPLIS_MERCH_URL` — masih TBD, lihat
 * markdowns-fe/integrations/yesplis-redirect.md
 */
export default function MerchandiseCatalogPage() {
  return (
    <PagePlaceholder
      title="Merchandise Catalog"
      akses="General Public"
      keterangan="Katalog merchandise BKUI. Pembelian TIDAK diproses di sini — hanya CTA redirect keluar ke Yesplis. URL Yesplis masih TBD."
    />
  );
}
