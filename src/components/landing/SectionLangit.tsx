import Image from "next/image";
import type { ReactNode } from "react";

/**
 * Pembungkus section Landing Page dengan latar langit.
 *
 * Di Figma tiap section adalah frame `Desktop` 1512x885 dengan latar yang sama:
 * warna dasar biru muda, foto awan (`image 928`) di atasnya, lalu lapis putih
 * tipis (`image 925`) yang melembutkan semuanya.
 *
 * Ketiganya sudah digabung jadi satu file `langit.webp`, jadi di sini tinggal
 * dipasang apa adanya — tidak perlu diutak-atik opasitasnya lagi. Warnanya
 * dicocokkan langsung ke hasil render Figma (lihat FE-0006), bukan dikira-kira.
 *
 * Daripada mengulang kelas background di sembilan tempat, latarnya dipusatkan
 * di sini.
 *
 * Langitnya dipasang sebagai <Image> di lapis terpisah, bukan `background-image`
 * CSS, supaya tetap lewat optimasi next/image dan bisa ditandai `aria-hidden` —
 * ini murni dekorasi, tidak ada informasi yang perlu dibacakan screen reader.
 *
 * Tinggi section TIDAK dikunci ke 885px. Di Figma tingginya tetap karena kanvas
 * desktop memang setinggi itu; di web, tinggi harus ikut isinya supaya teks
 * tidak terpotong saat font lebih besar atau layar lebih sempit.
 */
interface SectionLangitProps {
  children: ReactNode;
  /** Dipakai sebagai target anchor (mis. tombol "Jelajahi Lebih Lanjut"). */
  id?: string;
  /** Judul section untuk screen reader kalau judul visualnya berupa gambar. */
  "aria-label"?: string;
  /** Dekorasi tambahan (pohon, bunga, rumput) — dirender di atas langit. */
  dekorasi?: ReactNode;
  className?: string;
}

export function SectionLangit({
  children,
  id,
  dekorasi,
  className,
  ...rest
}: SectionLangitProps) {
  return (
    <section
      id={id}
      {...rest}
      className={`relative isolate overflow-hidden bg-bkui-button ${className ?? ""}`}
    >
      {/* Lapis 1 — langit berawan, menutup seluruh section */}
      <Image
        src="/image/landing/langit.webp"
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        className="-z-10 object-cover"
      />

      {/* Lapis 2 — dekorasi khas section ini */}
      {dekorasi}

      {/* Lapis 3 — isi */}
      {children}
    </section>
  );
}

/**
 * Deretan bendera segitiga yang menggantung di tepi atas section
 * (Frame 283 di Figma, dipakai ulang di tiga section).
 *
 * Lebarnya dipaksa minimal 1512px lewat `min-w-[1512px]` supaya di layar lebar
 * benderanya tidak melar jadi segitiga gepeng — kalau layarnya lebih lebar dari
 * itu, gambarnya cukup dibiarkan meluber dan terpotong di kanan.
 */
export function DekorBendera({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-x-0 top-0 -z-10 overflow-hidden ${className ?? ""}`}
    >
      <Image
        src="/icon/landing/bendera.svg"
        alt=""
        width={1512}
        height={156}
        className="h-auto w-full min-w-[1512px]"
      />
    </div>
  );
}
