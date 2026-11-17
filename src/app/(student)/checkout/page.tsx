import { LatarHalaman } from "@/components/explore/LatarHalaman";
import { CheckoutMerch } from "@/components/merch/CheckoutMerch";
import { JudulSticker } from "@/components/ui/JudulSticker";

export default function CheckoutPage() {
  return (
    <main className="flex-1">
      <LatarHalaman>
        <section aria-label="Checkout merchandise" className="mx-auto flex w-full max-w-[1512px] flex-col gap-10 px-5 py-12 lg:px-20 lg:py-20">
          <JudulSticker as="h1" ukuran="title" className="-my-[0.28em] self-center text-center">
            Checkout
          </JudulSticker>
          <CheckoutMerch />
        </section>
      </LatarHalaman>
    </main>
  );
}
