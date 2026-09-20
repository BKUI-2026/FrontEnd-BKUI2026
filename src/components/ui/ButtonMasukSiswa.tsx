import Link from "next/link";

/**
 * Tombol "Masuk sebagai Siswa" — muncul saat pengunjung belum masuk.
 *
 * Sejak endpoint auth BE tersedia (BE ARCH-0003), tombol ini hidup dan
 * mengarah ke halaman Masuk. Sebelumnya sengaja dimatikan karena belum ada
 * tujuan yang pasti.
 */
export function ButtonMasukSiswa({ className }: { className?: string }) {
  return (
    <Link
      href="/masuk"
      className={`inline-flex items-center justify-center rounded-full bg-bkui-button px-6 py-3 text-base font-medium text-black transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bkui-hijau ${className ?? ""}`}
    >
      Masuk sebagai Siswa
    </Link>
  );
}
