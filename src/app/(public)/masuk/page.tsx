import { LatarHalaman } from "@/components/explore/LatarHalaman";
import { HiasanMasuk } from "@/components/auth/HiasanMasuk";
import { FormMasuk } from "@/components/auth/FormMasuk";

/**
 * Masuk — `/masuk`
 *
 * Mengikuti desain Figma node 359:4815: kartu formulir dua kolom (Email, Kata
 * Sandi) di atas ilustrasi bukit rumput dan maskot, lengkap dengan status
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
      <LatarHalaman>
        <section
          aria-label="Masuk ke akun"
          className="relative grid min-h-[calc(100svh-6rem)] place-items-center overflow-hidden px-5 py-12 lg:px-8 lg:py-16"
        >
          <HiasanMasuk />
          <FormMasuk />
        </section>
      </LatarHalaman>
    </main>
  );
}
