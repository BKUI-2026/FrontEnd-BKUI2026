import Image from "next/image";
import Link from "next/link";

interface LogoBKUIProps {
  /** Lebar logo dalam px. Navbar pakai 56. */
  ukuran?: number;
  className?: string;
}

/**
 * Logo utama BKUI 2026, sekaligus link balik ke Beranda.
 *
 * Aset: public/logo/mainLogoBKUI2026.svg — ukuran asli 439x435, JANGAN diisi
 * sebagai kotak. Sempat ditulis 56x56 dan next/image protes karena rasionya
 * tidak cocok: Tailwind memaksa `height: auto` lewat preflight, jadi cuma
 * lebarnya yang benar-benar terkendali sementara tingginya ikut rasio asli.
 * Ukuran tampilnya diatur lewat CSS (`style.width` + `h-auto`), bukan lewat
 * prop width/height.
 */
export function LogoBKUI({ ukuran = 56, className }: LogoBKUIProps) {
  return (
    <Link href="/" aria-label="BKUI 2026 — kembali ke Beranda" className={className}>
      <Image
        src="/logo/mainLogoBKUI2026.svg"
        alt="Logo BKUI 2026"
        width={439}
        height={435}
        priority
        className="h-auto"
        style={{ width: ukuran }}
      />
    </Link>
  );
}
