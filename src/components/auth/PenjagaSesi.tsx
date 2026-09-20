"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";

import { useSesi } from "@/lib/auth-state";

/**
 * Penjaga rute untuk halaman yang butuh akun.
 *
 * Tiga keadaan, dan ketiganya penting:
 *
 * - "memuat" → tampilkan penanda tunggu. Sesi dipulihkan lewat permintaan ke
 *   BE, jadi pada render pertama FE memang belum tahu siapa pengunjungnya.
 *   Melempar keluar di detik ini akan mengusir orang yang sebenarnya sudah
 *   masuk, setiap kali mereka memuat ulang halaman.
 * - "tamu"  → alihkan ke halaman Masuk sambil membawa tujuan semula, supaya
 *   setelah masuk mereka kembali ke halaman yang tadi dituju.
 * - "masuk" → tampilkan isinya.
 *
 * Ini penjaga di sisi klien: gunanya mengarahkan pengguna, BUKAN mengamankan
 * data. Yang menjaga data tetap BE — setiap endpoint privat memeriksa token
 * sendiri dan membalas 401 tanpa peduli apa yang dilakukan FE.
 */
export function PenjagaSesi({ children }: { children: ReactNode }) {
  const { status } = useSesi();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === "tamu") {
      router.replace(`/masuk?next=${encodeURIComponent(pathname)}`);
    }
  }, [status, router, pathname]);

  if (status === "masuk") return <>{children}</>;

  return (
    <main className="flex flex-1 items-center justify-center px-6 py-24">
      <p
        role="status"
        className="text-center font-body text-base font-medium text-bkui-teks"
      >
        {status === "memuat"
          ? "Menyiapkan halaman…"
          : "Mengalihkan ke halaman masuk…"}
      </p>
    </main>
  );
}
