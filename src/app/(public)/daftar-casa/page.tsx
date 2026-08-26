import { PagePlaceholder } from "@/components/PagePlaceholder";

/**
 * Daftar CASA — `/daftar-casa`
 *
 * CASA adalah nama form pendaftaran publik (istilah PRD). Bisa diisi tanpa akun,
 * jadi ada di route group (public).
 *
 * Setelah submit, BE yang memicu notifikasi WhatsApp ke pendaftar — FE cuma
 * kirim form. Endpoint-nya belum ada, jangan karang shape request/response-nya.
 */
export default function DaftarCASAPage() {
  return (
    <PagePlaceholder
      title="Daftar CASA"
      akses="General Public"
      keterangan="Form pendaftaran CASA, bisa diisi tanpa akun. Konfirmasi WhatsApp dikirim oleh BE setelah submit. Endpoint belum tersedia."
    />
  );
}
