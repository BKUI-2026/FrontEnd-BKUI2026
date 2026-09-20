import { AuthScene } from "@/components/auth/AuthScene";
import { FormDaftar } from "@/components/auth/FormDaftar";

/**
 * Daftar Akun — `/daftar`
 *
 * Mengikuti desain Figma terbaru node 824:1117: kartu enam kolom di atas
 * ilustrasi pohon dan bukit tanpa maskot.
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
        <section
          aria-label="Daftar akun"
          className="relative isolate grid min-h-[982px] place-items-center overflow-hidden px-5 py-12 max-sm:min-h-[100svh] lg:px-8"
        >
          <AuthScene variant="daftar" />
          <FormDaftar />
        </section>
    </main>
  );
}
