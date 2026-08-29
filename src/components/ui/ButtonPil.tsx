import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Tombol pil putih-kebiruan — komponen `Button` di Figma (style `Button/Large`).
 *
 * Ukurannya dikunci ke token Figma: tinggi 64, padding kiri-kanan 36, jarak
 * ikon-teks 12, label Delight Medium 20px. Di layar sempit tingginya diturunkan
 * supaya tombol tidak memakan tempat berlebihan.
 *
 * Dipakai di Hero ("Jelajahi Lebih Lanjut") dan di kedua papan Arah Petualangan.
 * Bedakan dari `ButtonPesanTiket` — itu CTA oren khusus tiket di navbar.
 *
 * Ada dua bentuk pemakaian:
 * - `href` diisi  → dirender sebagai <Link>/<a> (navigasi)
 * - `onClick`     → dirender sebagai <button> (aksi di halaman, mis. scroll)
 *
 * `nonaktif` dipakai untuk tujuan yang belum ada (mis. flow yang menunggu Auth).
 * Warnanya sengaja TIDAK dipudarkan supaya tetap sama dengan Figma; penanda
 * belum aktifnya lewat kursor + `title`, sama seperti ButtonMasukSiswa.
 */
const KELAS_DASAR =
  "inline-flex h-14 items-center justify-center gap-3 rounded-full bg-bkui-navbar px-7 font-ui text-base font-medium text-bkui-teks shadow-[0_2px_10px_rgba(0,0,0,0.25)] transition-transform sm:h-16 sm:px-9 sm:text-xl";

const KELAS_AKTIF = "hover:-translate-y-0.5 focus-visible:-translate-y-0.5";

interface ButtonPilProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  /** Tujuan belum tersedia — tombol dirender tapi tidak bisa diklik. */
  nonaktif?: boolean;
  /** Alasan tombol dinonaktifkan, tampil sebagai tooltip. */
  alasanNonaktif?: string;
  className?: string;
}

export function ButtonPil({
  children,
  href,
  onClick,
  nonaktif,
  alasanNonaktif,
  className,
}: ButtonPilProps) {
  const kelas = `${KELAS_DASAR} ${nonaktif ? "cursor-not-allowed" : KELAS_AKTIF} ${className ?? ""}`;

  if (nonaktif || (!href && !onClick)) {
    return (
      <button type="button" disabled title={alasanNonaktif} className={kelas}>
        {children}
      </button>
    );
  }

  if (href) {
    return (
      <Link href={href} className={kelas}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={kelas}>
      {children}
    </button>
  );
}
