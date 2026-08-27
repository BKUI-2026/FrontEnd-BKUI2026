import Image from "next/image";
import Link from "next/link";

/**
 * CTA "Pesan Tiket" — tombol oren dengan ikon tiket.
 *
 * Mengarah ke halaman /ticket, BUKAN langsung ke Yesplis. Alasannya: URL Yesplis
 * masih TBD (lihat integrations/yesplis-redirect.md), dan menaruh redirect
 * keluar di satu tempat (halaman Ticket) lebih gampang diurus daripada
 * tersebar di navbar + halaman.
 *
 * TIDAK ADA checkout/cart/payment di sini — transaksi sepenuhnya di Yesplis
 * (README boundary nomor 1).
 */
export function ButtonPesanTiket({ className }: { className?: string }) {
  return (
    <Link
      href="/ticket"
      className={`inline-flex items-center gap-2 rounded-full bg-bkui-oren px-6 py-3 text-base font-medium text-black transition-opacity hover:opacity-90 ${className ?? ""}`}
    >
      <Image
        src="/icon/lucide/Vector.svg"
        alt=""
        width={26}
        height={19}
        aria-hidden
      />
      Pesan Tiket
    </Link>
  );
}
