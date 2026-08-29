import Image from "next/image";

import { ButtonPil } from "@/components/ui/ButtonPil";

/**
 * Satu papan kayu di section "Arah Petualangan".
 *
 * Papan kayunya (tiga bilah + bayangan) dipakai sebagai gambar hasil ekspor
 * Figma; teks dan tombolnya ditumpuk di atasnya sebagai HTML sungguhan supaya
 * bisa dibaca screen reader, di-copy, dan ikut membesar saat pengguna
 * memperbesar ukuran font.
 *
 * Posisi teks dinyatakan dalam persen terhadap gambar papan, bukan px, supaya
 * ikut menyesuaikan saat papannya mengecil di layar sempit.
 */
interface PapanArahProps {
  judul: string;
  deskripsi: string;
  labelTombol: string;
  href?: string;
  /** Tujuan belum tersedia (mis. masih menunggu Auth). */
  nonaktif?: boolean;
  alasanNonaktif?: string;
  /** Sudut miring papan, meniru dua papan yang tidak sejajar di Figma. */
  miring?: number;
}

export function PapanArah({
  judul,
  deskripsi,
  labelTombol,
  href,
  nonaktif,
  alasanNonaktif,
  miring = 0,
}: PapanArahProps) {
  return (
    <div className="relative flex w-full max-w-[520px] flex-col items-center">
      {/*
        Tiang papan — persegi panjang cokelat di belakang bilah kayu. Di Figma
        tiangnya jauh lebih tinggi dari papannya (714px vs 359px) dan menembus
        ke bawah sampai keluar batas section, jadi tingginya dipatok relatif
        terhadap lebar papan, bukan terhadap tinggi isi.
      */}
      <div
        aria-hidden
        // Di layar sempit kedua papan bertumpuk vertikal, jadi tiang sepanjang
        // versi desktop akan menusuk sampai ke papan di bawahnya.
        className="absolute top-[8%] h-[112%] w-[9%] rounded-[10px] bg-bkui-kayu shadow-[-8px_-3px_9px_rgba(0,0,0,0.25)] md:h-[190%]"
      />

      <div
        className="relative w-full"
        style={{ transform: miring ? `rotate(${miring}deg)` : undefined }}
      >
        {/* Bilah kayu */}
        <Image
          src="/image/landing/papan-kayu.webp"
          alt=""
          aria-hidden
          width={1100}
          height={699}
          sizes="(min-width: 1024px) 520px, 90vw"
          className="h-auto w-full"
        />

        {/* Judul — di bilah paling atas */}
        <p className="absolute inset-x-0 top-[6%] px-[8%] text-center font-display text-[clamp(1.75rem,4.6vw,4rem)] leading-tight text-bkui-terang [text-shadow:0_3.5px_2.3px_rgb(0_0_0_/_0.25)]">
          {judul}
        </p>

        {/* Deskripsi — di bilah tengah yang lebih gelap */}
        <p className="absolute inset-x-0 top-[42%] px-[14%] text-center font-body text-[clamp(0.75rem,1.5vw,1.25rem)] leading-[1.4] text-bkui-terang">
          {deskripsi}
        </p>
      </div>

      {/*
        Tombol ditaruh di luar pembungkus yang diputar supaya tetap tegak dan
        area kliknya tidak ikut miring. Di Figma tombolnya memang menumpuk di
        bilah paling bawah, jadi ditarik naik dengan margin negatif.
      */}
      <div className="relative -mt-[9%] flex justify-center">
        <ButtonPil
          href={href}
          nonaktif={nonaktif}
          alasanNonaktif={alasanNonaktif}
        >
          {labelTombol}
        </ButtonPil>
      </div>
    </div>
  );
}
