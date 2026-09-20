import { Suspense } from "react";

import { TerimaCallbackGoogle } from "@/components/auth/TerimaCallbackGoogle";

/**
 * Tujuan pendaratan setelah Google SSO — `/auth/callback`.
 *
 * Alamat ini bukan pilihan FE: BE yang mengarahkan browser ke sini setelah
 * menukar kode OAuth, membawa `access_token` & `expires_in` di query string
 * (kontrak BE ARCH-0003, `integrations/google-sso.md`).
 *
 * Halaman ini ada meski belum ada tombol "Masuk dengan Google" di UI. Tanpa
 * halaman ini, siapa pun yang sampai ke alur Google akan mendarat di 404
 * PADAHAL sesinya sudah terlanjur dibuat di server — keadaan yang jauh lebih
 * membingungkan daripada sekadar tombol yang belum ada.
 *
 * `Suspense` wajib: komponen di dalamnya membaca query string, dan Next
 * menolak `useSearchParams` yang tidak dibungkus batas Suspense.
 */
export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <main className="flex flex-1 items-center justify-center px-6 py-24">
          <p role="status" className="font-body text-base font-medium text-bkui-teks">
            Menyelesaikan proses masuk…
          </p>
        </main>
      }
    >
      <TerimaCallbackGoogle />
    </Suspense>
  );
}
