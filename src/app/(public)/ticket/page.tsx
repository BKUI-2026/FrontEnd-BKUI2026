import { JudulSticker } from "@/components/ui/JudulSticker";
import { LatarTiket } from "@/components/tiket/LatarTiket";
import { HiasanTiket } from "@/components/tiket/HiasanTiket";
import { DaftarTier } from "@/components/tiket/DaftarTier";

/**
 * Ticket — `/ticket`
 *
 * Mengikuti desain Figma node 367:4893: judul stiker "Pesan Tiket" dan tiga
 * kartu tier (Gold, Silver, Bronze) di atas hamparan rumput berbunga.
 *
 * HANYA info tier + CTA redirect keluar ke Yesplis. DILARANG bikin payment
 * gateway, cart, atau checkout di sini (README boundary nomor 1) — dan memang
 * tidak ada: dua tombol di tiap kartu persis seperti Figma, "Lihat Detail"
 * (membuka overlay di halaman yang sama) dan "Beli di Yesplis".
 *
 * URL tujuan: env `NEXT_PUBLIC_YESPLIS_TICKET_URL` — masih kosong. Lihat
 * markdowns-fe/integrations/yesplis-redirect.md
 *
 * Isi tier masih dummy (`lib/ticket-content.ts`); endpoint `Content` di BE
 * belum ada dan shape response-nya tidak dikarang duluan.
 */
export default function TicketPage() {
  return (
    <main className="flex-1">
      <LatarTiket>
        <section aria-label="Pesan Tiket" className="relative overflow-hidden">
          <HiasanTiket />

          {/*
            Lebar & padding mengikuti Figma: kanvas 1512 dengan Frame 946
            menjorok 80px. Kartunya jadi 361px — lebar yang membuat dua
            tombolnya muat berdampingan dalam satu baris.
          */}
          <div className="mx-auto flex w-full max-w-[1512px] flex-col gap-10 px-5 py-12 lg:gap-12 lg:px-20 lg:py-[134px]">
            <JudulSticker as="h1" ukuran="h1" className="self-center text-center">
              Pesan Tiket
            </JudulSticker>

            <DaftarTier />
          </div>
        </section>
      </LatarTiket>
    </main>
  );
}
