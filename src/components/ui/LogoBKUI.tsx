import Image from "next/image";
import Link from "next/link";

interface LogoBKUIProps {
  /** Ukuran sisi logo dalam px. Navbar pakai 56. */
  ukuran?: number;
  className?: string;
}

/**
 * Logo utama BKUI 2026, sekaligus link balik ke Beranda.
 *
 * Aset: public/logo/mainLogoBKUI2026.svg
 */
export function LogoBKUI({ ukuran = 56, className }: LogoBKUIProps) {
  return (
    <Link href="/" aria-label="BKUI 2026 — kembali ke Beranda" className={className}>
      <Image
        src="/logo/mainLogoBKUI2026.svg"
        alt="Logo BKUI 2026"
        width={ukuran}
        height={ukuran}
        priority
      />
    </Link>
  );
}
