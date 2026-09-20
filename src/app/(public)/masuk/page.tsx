import { AuthScene } from "@/components/auth/AuthScene";
import { FormMasuk } from "@/components/auth/FormMasuk";

/**
 * Masuk — `/masuk`
 *
 * Mengikuti desain Figma node 707:3918 dan 824:744: kartu formulir dua kolom
 * (Email, Kata Sandi) di atas ilustrasi pohon dan bukit, lengkap dengan status
 * galatnya.
 *
 * BELUM TERHUBUNG KE BE. Endpoint auth belum ada dan shape request-nya tidak
 * dikarang duluan (README boundary nomor 4). Tombolnya tetap hidup supaya
 * status galat di desain bisa ditinjau; yang dijalankan cuma pemeriksaan format
 * milik frontend — alasan lengkapnya di `components/auth/FormMasuk.tsx`.
 */
export default function MasukPage() {
  return (
    <main className="flex-1">
        <section
          aria-label="Masuk ke akun"
          className="relative isolate grid min-h-[982px] place-items-center overflow-hidden px-5 py-12 max-sm:min-h-[100svh] lg:px-8"
        >
          <AuthScene variant="masuk" />
          <FormMasuk />
        </section>
    </main>
  );
}
