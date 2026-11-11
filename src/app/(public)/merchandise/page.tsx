import { JudulSticker } from "@/components/ui/JudulSticker";
import { LatarHalaman } from "@/components/explore/LatarHalaman";
import { HiasanMerch } from "@/components/merch/HiasanMerch";
import { CheckoutMerch } from "@/components/merch/CheckoutMerch";

/** Katalog dan checkout merchandise memakai mode pembayaran dari backend. */
export default function MerchandiseCatalogPage() {
  return (
    <main className="flex-1">
      <LatarHalaman>
        <section aria-label="Merchandise Eksklusif" className="relative overflow-hidden">
          <HiasanMerch />

          <div className="mx-auto flex w-full max-w-[1512px] flex-col gap-10 px-5 py-12 lg:gap-12 lg:px-20 lg:py-20">
            <JudulSticker as="h1" ukuran="h1" className="self-center text-center">
              Merchandise Eksklusif
            </JudulSticker>

            <CheckoutMerch />
          </div>
        </section>
      </LatarHalaman>
    </main>
  );
}
