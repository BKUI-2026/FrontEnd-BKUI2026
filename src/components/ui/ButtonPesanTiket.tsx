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
      className={`inline-flex h-16 items-center justify-center gap-3 rounded-full bg-gradient-to-b from-bkui-oren to-bkui-oren-muda px-9 font-ui text-xl font-medium leading-none text-bkui-coklat transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bkui-hijau ${className ?? ""}`}
    >
      <Image
        src="/icon/lucide/Vector.svg"
        alt=""
        width={28}
        height={28}
        aria-hidden
        className="size-7 object-contain"
      />
      Pesan Tiket
    </Link>
  );
}
