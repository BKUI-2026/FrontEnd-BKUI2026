import Image from "next/image";

import { ButtonPil } from "@/components/ui/ButtonPil";

/**
 * Satu papan kayu di section "Arah Petualangan".
 *
 * Seluruh ukuran & posisinya diambil dari Figma (node `224:53` untuk papan
 * kanan, `228:167` untuk papan kiri), lalu diubah jadi persen terhadap kotak
 * bilah kayu yang berukuran 591,5 x 359,7.
 *
 * Papannya terdiri dari TIGA bilah terpisah dengan kemiringan berbeda-beda
 * (1,92° / 0,25° / -0,57°) — bukan satu gambar utuh. Itu yang bikin papannya
 * terlihat seperti kayu yang dipaku satu per satu, bukan stiker. Papan kiri
 * memakai berkas bilah yang sama persis, cuma dicerminkan.
 *
 * Ukuran teks memakai satuan `cqw` (persen lebar container) supaya judul dan
 * deskripsi ikut mengecil proporsional bersama papannya. Kalau pakai ukuran
 * tetap, di layar sempit teksnya meluber keluar bilah.
 */

/** Tiga bilah kayu, posisi & kemiringan relatif terhadap kotak papan. */
const BILAH = [
  { berkas: "bilah-atas.svg", kiri: "50%", atas: "19.99%", lebar: "99.34%", tinggi: "34.47%", putar: 1.92 },
  { berkas: "bilah-tengah.svg", kiri: "50.01%", atas: "53.91%", lebar: "77.28%", tinggi: "39.57%", putar: 0.25 },
  { berkas: "bilah-bawah.svg", kiri: "49.65%", atas: "84.84%", lebar: "82.83%", tinggi: "29%", putar: -0.57 },
] as const;

interface PapanArahProps {
  judul: string;
  deskripsi: string;
  labelTombol: string;
  href?: string;
  /** Tujuan belum tersedia (mis. masih menunggu Auth). */
  nonaktif?: boolean;
  alasanNonaktif?: string;
  /**
   * Papan kiri adalah cerminan papan kanan di Figma — bilah, kemiringan judul,
   * dan arah bayangannya semua terbalik.
   */
  cermin?: boolean;
}

export function PapanArah({
  judul,
  deskripsi,
  labelTombol,
  href,
  nonaktif,
  alasanNonaktif,
  cermin = false,
}: PapanArahProps) {
  const arah = cermin ? -1 : 1;

  return (
    <div className="@container relative w-full max-w-[591px]">
      {/* Kotak berasio sama dengan kotak bilah di Figma (591,5 x 359,7) */}
      <div className="relative aspect-[591.5/359.7] w-full">
        {/*
          Tiang. Mulai 14,5% DI ATAS bilah teratas dan menjulur sampai 198%
          tingginya ke bawah — di Figma tiangnya memang menembus keluar batas
          section lalu terpotong.
        */}
        <div
          aria-hidden
          className="absolute rounded-[3.6%] bg-bkui-kayu"
          style={{
            left: "45.5%",
            top: "-14.46%",
            width: "8.93%",
            height: "198.5%",
            boxShadow: `${-9.912 * arah}px -4.248px 9.346px rgba(0,0,0,0.25)`,
          }}
        />

        {BILAH.map((b) => (
          <Image
            key={b.berkas}
            src={`/icon/landing/arah/${b.berkas}`}
            alt=""
            aria-hidden
            width={0}
            height={0}
            sizes="(min-width: 768px) 591px, 90vw"
            className="absolute"
            style={{
              left: b.kiri,
              top: b.atas,
              width: b.lebar,
              height: b.tinggi,
              transform: `translate(-50%, -50%) rotate(${b.putar * arah}deg)${cermin ? " scaleX(-1)" : ""}`,
            }}
          />
        ))}

        {/* Judul — miring 1,94° mengikuti kemiringan bilah teratas */}
        <p
          className="absolute text-center font-display leading-[1.4] text-bkui-terang [text-shadow:0_3.5px_2.3px_rgb(0_0_0_/_0.25)]"
          style={{
            left: "50%",
            top: "8.7%",
            width: "60%",
            fontSize: "max(20px, 10.82cqw)",
            transform: `translateX(-50%) rotate(${1.94 * arah}deg)`,
          }}
        >
          {judul}
        </p>

        {/* Deskripsi — di bilah tengah yang lebih gelap */}
        <p
          className="absolute text-center font-body leading-[1.4] text-bkui-terang"
          style={{
            left: "50%",
            top: "43.5%",
            width: "62.38%",
            fontSize: "max(10px, 3.38cqw)",
            transform: "translateX(-50%)",
          }}
        >
          {deskripsi}
        </p>

        {/*
          Tombol ditaruh di 77,3% tinggi papan sesuai Figma, tapi ukurannya
          TIDAK ikut mengecil bersama papan — target sentuh yang menyusut di HP
          jadi susah dipencet.
        */}
        <div
          className="absolute flex justify-center"
          style={{ left: "50%", top: "77.3%", transform: "translate(-50%, -50%)" }}
        >
          <ButtonPil
            href={href}
            nonaktif={nonaktif}
            alasanNonaktif={alasanNonaktif}
            className="whitespace-nowrap"
          >
            {labelTombol}
          </ButtonPil>
        </div>
      </div>
    </div>
  );
}
