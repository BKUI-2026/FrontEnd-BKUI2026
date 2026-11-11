import { JudulSticker } from "@/components/ui/JudulSticker";
import { LatarHalaman } from "@/components/explore/LatarHalaman";
import { HiasanMerch } from "@/components/merch/HiasanMerch";
import { KatalogMerch } from "@/components/merch/KatalogMerch";

/** Pratinjau katalog Figma: produk bisa masuk keranjang, checkout masih diblokir. */
export default function MerchandiseCatalogPage() {
  return (
    <main className="flex-1">
      <LatarHalaman>
        <section aria-label="Merchandise Eksklusif" className="relative overflow-hidden">
          <HiasanMerch />

          <div className="mx-auto flex w-full max-w-[1512px] flex-col gap-10 px-5 py-12 lg:gap-[72px] lg:px-20 lg:pb-[138px] lg:pt-20">
            <JudulSticker as="h1" ukuran="title" className="-my-[0.28em] self-center text-center">
              Merchandise Eksklusif
            </JudulSticker>

            <KatalogMerch />
          </div>
        </section>
      </LatarHalaman>
    </main>
  );
}
