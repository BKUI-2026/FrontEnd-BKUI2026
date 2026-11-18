import { JudulSticker } from "@/components/ui/JudulSticker";
import { LatarHalaman } from "@/components/explore/LatarHalaman";
import { HiasanMerch } from "@/components/merch/HiasanMerch";
import { KatalogMerch } from "@/components/merch/KatalogMerch";

/** Katalog merchandise; checkout dibuka panitia lewat panel admin. */
export default function MerchandiseCatalogPage() {
  return (
    <main className="flex-1">
      <LatarHalaman>
        <section aria-label="Merchandise Eksklusif" className="relative overflow-hidden">
          <HiasanMerch />

          <div className="mx-auto flex w-full max-w-[1512px] flex-col gap-10 px-5 py-12 lg:gap-[72px] lg:px-20 lg:pb-[138px] lg:pt-20">
            <div className="flex flex-col items-center gap-6 lg:gap-8">
              <JudulSticker as="h1" ukuran="title" className="-my-[0.28em] self-center text-center">
                Merchandise Eksklusif
              </JudulSticker>
              <p className="rounded-full bg-bkui-krem-kartu px-5 py-2 text-center font-body text-sm font-medium leading-[1.35] text-bkui-teks shadow-sm sm:text-base">
                Merch akan diambil di main event.
              </p>
            </div>

            <KatalogMerch />
          </div>
        </section>
      </LatarHalaman>
    </main>
  );
}
