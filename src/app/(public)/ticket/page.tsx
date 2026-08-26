import { PagePlaceholder } from "@/components/PagePlaceholder";

/**
 * Ticket — `/ticket`
 *
 * HANYA info tiket + CTA redirect keluar ke Yesplis.
 * DILARANG bikin cart, checkout, atau form pembayaran di sini
 * (README boundary nomor 1). Transaksi sepenuhnya di Yesplis.
 *
 * URL tujuan: env `NEXT_PUBLIC_YESPLIS_TICKET_URL` — masih TBD, lihat
 * markdowns-fe/integrations/yesplis-redirect.md
 */
export default function TicketPage() {
  return (
    <PagePlaceholder
      title="Ticket"
      akses="General Public"
      keterangan="Informasi tiket acara BKUI. Pembelian TIDAK diproses di sini — hanya CTA redirect keluar ke Yesplis. URL Yesplis masih TBD."
    />
  );
}
