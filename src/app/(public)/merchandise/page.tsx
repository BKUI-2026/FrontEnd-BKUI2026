import { JudulSticker } from "@/components/ui/JudulSticker";
import { LatarHalaman } from "@/components/explore/LatarHalaman";
import { HiasanMerch } from "@/components/merch/HiasanMerch";
import { KatalogMerch } from "@/components/merch/KatalogMerch";

/**
 * Merchandise Catalog — `/merchandise`
 *
 * Mengikuti desain Figma node 337:389: judul stiker, panel penyaring kategori,
 * dan kisi kartu produk di atas latar langit berdekorasi gunung & pepohonan.
 *
 * HANYA katalog + CTA redirect keluar ke Yesplis. DILARANG bikin cart,
 * checkout, atau form pembayaran di sini (README boundary nomor 1) — dan
 * memang tidak ada: dua tombol di tiap kartu persis seperti Figma, "Lihat
 * Detail" dan "Beli di Yesplis".
 *
 * URL tujuan: env `NEXT_PUBLIC_YESPLIS_MERCH_URL` — masih kosong, jadi
 * tombolnya dimatikan sampai diisi. Lihat
 * markdowns-fe/integrations/yesplis-redirect.md
 *
 * Seluruh isi katalog masih dummy (`lib/merch-content.ts`); endpoint `Content`
 * di BE belum ada dan shape response-nya tidak dikarang duluan.
 */
export default function MerchandiseCatalogPage() {
  return (
    <main className="flex-1">
      <LatarHalaman>
        <section aria-label="Merchandise Eksklusif" className="relative overflow-hidden">
          <HiasanMerch />

{/*
            Lebar & padding mengikuti Figma persis: kanvas 1512 dengan Frame 946
            menjorok 80px, jadi isinya 1352px. Angka ini bukan selera — kartu
            produknya jadi 361px, dan pada lebar itulah dua tombolnya ("Lihat
            Detail" + "Beli di Yesplis") muat berdampingan dalam satu baris
            dengan sisa nol. Sedikit saja lebih sempit, tombolnya turun.
          */}
          <div className="mx-auto flex w-full max-w-[1512px] flex-col gap-10 px-5 py-12 lg:gap-12 lg:px-20 lg:py-20">
            <JudulSticker as="h1" ukuran="h1" className="self-center text-center">
              Merchandise Eksklusif
            </JudulSticker>

            <KatalogMerch />
          </div>
        </section>
      </LatarHalaman>
    </main>
  );
}
