import { LatarHalaman } from "@/components/explore/LatarHalaman";
import { HiasanDaftar } from "@/components/auth/HiasanDaftar";
import { FormDaftar } from "@/components/auth/FormDaftar";

/**
 * Daftar Akun — `/daftar`
 *
 * Mengikuti desain Figma node 358:4779: kartu formulir enam kolom di atas
 * ilustrasi pohon, bukit rumput, dan maskot.
 *
 * BELUM TERHUBUNG KE BE. Endpoint auth belum ada dan shape request-nya tidak
 * dikarang duluan (README boundary nomor 4), jadi tombol "Daftar" dimatikan —
 * alasan lengkapnya di `components/auth/FormDaftar.tsx`.
 *
 * Rutenya `/daftar`, bukan `/register`: seluruh salinan teks di desain ini
 * berbahasa Indonesia, dan rute `daftar-casa` serta `daftar-mentoring` yang
 * sudah ada memakai kata yang sama.
 */
export default function DaftarAkunPage() {
  return (
    <main className="flex-1">
      <LatarHalaman>
        <section
          aria-label="Daftar akun"
          className="relative grid min-h-[calc(100svh-6rem)] place-items-center overflow-hidden px-5 py-12 lg:px-8 lg:py-16"
        >
          <HiasanDaftar />
          <FormDaftar />
        </section>
      </LatarHalaman>
    </main>
  );
}
