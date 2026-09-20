import { Suspense } from "react";

import { AuthScene } from "@/components/auth/AuthScene";
import { FormMasuk } from "@/components/auth/FormMasuk";

/**
 * Masuk — `/masuk`
 *
 * Mengikuti desain Figma node 707:3918 dan 824:744: kartu formulir dua kolom
 * (Email, Kata Sandi) di atas ilustrasi pohon dan bukit, lengkap dengan status
 * galatnya.
 *
 * SUDAH TERHUBUNG ke `POST /auth/login` (BE ARCH-0003).
 *
 * `Suspense` mengelilingi formulirnya karena `FormMasuk` membaca query `next`
 * (halaman yang tadi dijaga) lewat `useSearchParams`, dan Next mensyaratkan
 * pembacaan itu berada di dalam batas Suspense.
 */
export default function MasukPage() {
  return (
    <main className="flex-1">
        <section
          aria-label="Masuk ke akun"
          className="relative isolate grid min-h-[982px] place-items-center overflow-hidden px-5 py-12 max-sm:min-h-[100svh] lg:px-8"
        >
          <AuthScene variant="masuk" />
          <Suspense
            fallback={
              <p role="status" className="font-body text-base font-medium text-bkui-teks">
                Memuat formulir…
              </p>
            }
          >
            <FormMasuk />
          </Suspense>
        </section>
    </main>
  );
}
