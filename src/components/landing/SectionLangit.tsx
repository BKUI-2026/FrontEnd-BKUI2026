import Image from "next/image";
import type { ReactNode } from "react";

/**
 * Pembungkus section Landing Page dengan latar langit.
 *
 * Semua section memakai satu warna langit yang sama supaya batas antar-frame
 * tidak terlihat seperti celah saat halaman digulir.
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
  /**
   * Matikan lapisan awan bawaan.
   *
   * Dipakai section yang sudah punya tekstur awannya sendiri
   * (`ArahPetualangan`, `VideoBKUI`) — kalau dibiarkan menyala, awannya dobel
   * dan langitnya jadi terlalu ramai.
   */
  tanpaAwan?: boolean;
  className?: string;
}

export function SectionLangit({
  children,
  id,
  dekorasi,
  tanpaAwan = false,
  className,
  ...rest
}: SectionLangitProps) {
  return (
    <section
      id={id}
      {...rest}
      className={`relative isolate overflow-hidden bg-bkui-button ${className ?? ""}`}
    >
      {/*
        Awan langit. Di Figma awan bukan layer tersendiri melainkan ikut isian
        latar tiap section, jadi asetnya diekspor terpisah sebagai `Cloud.svg`.

        Ditaruh di sini, bukan diulang di tiap section, supaya semua langit
        memakai awan yang sama persis — dan section baru otomatis kebagian.

        `object-cover` dipakai karena berkasnya jauh lebih tinggi (2221×2104)
        daripada kebanyakan section; yang terpakai hanya bagian yang kebagian
        bidangnya.
      */}
      {!tanpaAwan && (
        <Image
          src="/image/Cloud.svg"
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          /*
            Awannya dibuat memudar di tepi atas & bawah.

            Tiap section memotong berkasnya sendiri, jadi tanpa ini gumpalan
            awan terpotong tepat di batas antar-section dan sambungannya
            kelihatan sebagai garis — apalagi karena section bersebelahan
            sama-sama memulai potongan dari atas.

            Dengan memudar, awan larut ke biru langit sebelum mencapai batas,
            sehingga perpindahan antar-section terbaca mulus.
          */
          className="pointer-events-none -z-20 object-cover object-top [mask-image:linear-gradient(to_bottom,transparent_0%,black_14%,black_86%,transparent_100%)]"
        />
      )}

      {/* Dekorasi khas section ini */}
      {dekorasi}

      {/* Isi */}
      {children}
    </section>
  );
}

/**
 * Lapisan ilustrasi khas satu section — bukit, pohon, semak, bunga, jamur, dsb.
 *
 * Tiap berkas `dekor-*.webp` adalah hasil ekspor section dari Figma yang
 * langit dan area kontennya sudah dilepas, jadi tinggal ditumpuk di belakang
 * isi section (cara pembuatannya dicatat di FE-0007).
 *
 * **Ditempel ke tepi BAWAH**, bukan atas. Sebagian besar dekorasi (bukit,
 * semak, jamur) memang duduk di dasar section, sementara tinggi section di web
 * ikut isinya dan tidak pernah persis 885px seperti kanvas Figma. Kalau
 * ditempel dari atas, dasar ilustrasinya jadi menggantung di tengah section.
 *
 * `min-w-[900px]` menahan gambarnya supaya tidak ikut mengecil habis di layar
 * sempit — kalau dibiarkan menyusut, pohon dan semaknya jadi terlalu kecil
 * untuk terbaca. Kelebihannya meluber lalu terpotong `overflow-hidden` milik
 * section.
 */
export function DekorSection({
  nama,
  tinggi,
  className,
}: {
  /** Nama berkas tanpa awalan/akhiran, mis. `"video"` untuk `dekor-video.webp`. */
  nama: string;
  /** Tinggi asli berkas, dipakai next/image buat menghitung rasio. */
  tinggi: number;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-x-0 bottom-0 -z-10 overflow-hidden ${className ?? ""}`}
    >
      <Image
        src={`/image/landing/dekor-${nama}.webp`}
        alt=""
        width={1512}
        height={tinggi}
        sizes="100vw"
        className="h-auto w-full min-w-[900px]"
      />
    </div>
  );
}

/**
 * Deretan bendera segitiga yang menggantung di tepi atas section
 * (Frame 283 di Figma, dipakai ulang di tiga section).
 *
 * Sengaja tetap dipakai sebagai SVG terpisah, tidak ikut dilebur ke
 * `dekor-*.webp`: segitiga birunya (#3570B6) sewarna langit, jadi ikut terhapus
 * saat langit dilepas dari hasil ekspor. Versi SVG juga lebih tajam.
 *
 * Lebarnya dipaksa minimal 1512px lewat `min-w-[1512px]` supaya di layar lebar
 * benderanya tidak melar jadi segitiga gepeng — kalau layarnya lebih lebar dari
 * itu, gambarnya cukup dibiarkan meluber dan terpotong di kanan.
 */
export function DekorBendera({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-x-0 -top-1 -z-10 overflow-hidden ${className ?? ""}`}
    >
      <Image
        src="/icon/landing/bendera.svg"
        alt=""
        width={1512}
        height={156}
        className="bendera-goyang h-auto w-full min-w-[1512px]"
      />
    </div>
  );
}
