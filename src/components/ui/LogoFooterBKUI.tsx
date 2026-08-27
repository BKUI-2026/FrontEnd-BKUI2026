import Image from "next/image";

/**
 * Lockup logo BKUI 2026 versi horizontal (maskot + wordmark + tagline
 * "Makara Expedition"), dipakai di sisi kanan Footer.
 *
 * Aset: public/logo/footerLogoBKUI2026.svg — rasio asli 517×176.
 *
 * CATATAN: PM menyebut aset ini "frameBKUI2026", tapi file dengan nama itu
 * belum ada di public/. Yang dipakai di sini file footerLogoBKUI2026.svg
 * karena ukuran & isinya cocok dengan desain. Perlu dikonfirmasi.
 */
export function LogoFooterBKUI({ lebar = 259 }: { lebar?: number }) {
  // Jaga rasio asli 517:176 biar logonya tidak gepeng.
  const tinggi = Math.round((lebar * 176) / 517);

  return (
    <Image
      src="/logo/footerLogoBKUI2026.svg"
      alt="BKUI 2026 — Makara Expedition: Take the step, Discover the path"
      width={lebar}
      height={tinggi}
    />
  );
}
