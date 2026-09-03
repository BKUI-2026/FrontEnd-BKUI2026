"use client";

import { useEffect, useRef } from "react";
import type { ElementType, ReactNode } from "react";

/** Ukuran judul, mengikuti skala Heading di Figma. */
type UkuranJudul = "title" | "h1" | "h2" | "h3";

interface JudulStickerProps {
  /**
   * Teksnya harus string, bukan ReactNode — komponen ini merender teks yang
   * sama tiga kali (satu per lapis outline), jadi isinya wajib bisa disalin.
   */
  children: string;
  /** Level heading yang dipakai. Default `h2`. */
  as?: Extract<ElementType, "h1" | "h2" | "h3" | "p" | "span">;
  ukuran?: UkuranJudul;
  className?: string;
}

/**
 * Judul "stiker" khas BKUI 2026: isi hijau, outline krem, outline pink, dan
 * bayangan jatuh — dipakai di hampir semua judul section di Figma.
 *
 * Sengaja dibuat sebagai TEKS SUNGGUHAN, bukan gambar hasil ekspor Figma:
 * - tetap tajam di layar berapapun kerapatannya
 * - bisa dibaca screen reader, di-search, dan diterjemahkan browser
 * - judul baru cukup ditulis, tidak perlu minta aset baru ke designer
 *
 * Cara menumpuk tiga lapisnya ada di `.judul-sticker` pada globals.css.
 *
 * ---------------------------------------------------------------------------
 * Judulnya "ditempel", bukan memudar masuk
 * ---------------------------------------------------------------------------
 * Saat pertama masuk layar, judul jatuh sedikit miring lalu mendarat melewati
 * posisinya — gerakan tangan menempelkan stiker. Keyframe-nya di globals.css
 * (`judul-ditempel`); di sini cuma pemicunya.
 *
 * Statusnya ditulis LANGSUNG ke atribut DOM, bukan lewat `useState`: memanggil
 * setState di dalam useEffect kena lint `react-hooks/set-state-in-effect`, dan
 * status ini murni urusan tampilan — tidak ada bagian React yang perlu tahu.
 * Pola dan alasannya sama persis dengan komponen `Muncul`.
 *
 * Animasinya SEKALI JALAN; pengamatnya dilepas begitu judulnya muncul.
 *
 * Dua lapis outline ditandai `aria-hidden` supaya screen reader tidak membaca
 * judul yang sama tiga kali.
 */
const UKURAN: Record<UkuranJudul, string> = {
  // Heading/Title — 72px di Figma
  title: "text-[clamp(2.25rem,7vw,4.5rem)]",
  // Heading/H1 — 64px
  h1: "text-[clamp(2rem,6vw,4rem)]",
  // Heading/H2 — 48px
  h2: "text-[clamp(1.75rem,4.5vw,3rem)]",
  // Heading/H3 — 32px
  h3: "text-[clamp(1.25rem,3vw,2rem)]",
};

export function JudulSticker({
  children,
  as: Tag = "h2",
  ukuran = "h1",
  className,
}: JudulStickerProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const elemen = ref.current;
    if (!elemen) return;

    const tempel = () => elemen.setAttribute("data-tampil", "ya");

    // Browser lawas tanpa IntersectionObserver: tampilkan saja, jangan sampai
    // judulnya tidak pernah muncul.
    if (typeof IntersectionObserver === "undefined") {
      tempel();
      return;
    }

    const pengamat = new IntersectionObserver(
      ([masuk]) => {
        if (!masuk.isIntersecting) return;
        tempel();
        pengamat.disconnect();
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );

    pengamat.observe(elemen);

    /*
     * Jaring pengaman, dan ini bukan kehati-hatian berlebihan.
     *
     * Sebelum animasi ini ada, judul selalu terlihat. Sekarang judul mulai dari
     * `opacity: 0` dan baru muncul kalau pengamat viewport melaporkan sesuatu.
     * Artinya satu kegagalan kecil di situ = SELURUH judul di situs hilang —
     * mode gagal yang jauh lebih buruk daripada animasi yang tidak jalan.
     *
     * Pengamat viewport ikut siklus menggambar browser: di tab yang tidak
     * sedang digambar (mis. halaman dibuka di tab latar), laporannya tidak
     * pernah datang. Biasanya itu sembuh sendiri begitu tab-nya dilihat, tapi
     * "biasanya" bukan jaminan yang pantas dipertaruhkan untuk judul.
     *
     * Jadi setelah 1,2 detik judulnya ditampilkan apa pun yang terjadi.
     */
    const pengaman = window.setTimeout(tempel, 1200);

    return () => {
      pengamat.disconnect();
      window.clearTimeout(pengaman);
    };
  }, []);

  return (
    <Tag
      ref={ref as React.Ref<HTMLHeadingElement>}
      data-tampil="belum"
      className={`judul-sticker font-display ${UKURAN[ukuran]} ${className ?? ""}`}
    >
      <span aria-hidden className="judul-sticker__pink">
        {children}
      </span>
      <span aria-hidden className="judul-sticker__krem">
        {children}
      </span>
      <span className="judul-sticker__isi">{children}</span>
    </Tag>
  );
}

/**
 * Pembungkus judul + isi section.
 *
 * Dipisah jadi komponen sendiri karena tiap section di Figma memakai jarak yang
 * sama antara judul dan isinya, dan lebar isi yang sama (maks. 1144px, sesuai
 * Frame 939/940). Kalau ditulis ulang per section, jaraknya cepat melenceng.
 */
export function IsiSection({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative mx-auto w-full max-w-[1144px] px-5 sm:px-8 ${className ?? ""}`}
    >
      {children}
    </div>
  );
}
