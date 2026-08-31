"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties, ReactNode } from "react";

interface MunculProps {
  children: ReactNode;
  /**
   * Jeda sebelum elemen ini ikut muncul, dalam milidetik. Dipakai untuk
   * memberi efek berurutan pada daftar (kartu tokoh, baris FAQ, pil timeline).
   */
  jeda?: number;
  className?: string;
}

/**
 * Memunculkan isinya dengan gerakan naik + memudar saat pertama kali masuk
 * layar.
 *
 * Dipakai untuk konten (judul, kartu, daftar), BUKAN untuk hiasan latar —
 * hiasan yang ikut bergerak masuk malah bikin section terasa goyah.
 *
 * ---------------------------------------------------------------------------
 * Kenapa IntersectionObserver, bukan `animation-timeline: view()`
 * ---------------------------------------------------------------------------
 * `animation-timeline` memang bisa melakukan ini tanpa JavaScript sama sekali,
 * tapi per 2026 baru jalan di Chrome/Edge. Halaman ini menyasar siswa SMA yang
 * mayoritas membuka dari HP dengan bermacam browser, jadi dipilih cara yang
 * jalan di semua tempat.
 *
 * Animasinya SEKALI JALAN — observer dilepas begitu elemennya muncul. Konten
 * yang memudar setiap kali di-scroll bolak-balik cepat terasa mengganggu, dan
 * observer yang terus hidup sepanjang halaman juga sia-sia.
 */
export function Muncul({ children, jeda = 0, className }: MunculProps) {
  const ref = useRef<HTMLDivElement>(null);

  /*
   * Statusnya ditulis langsung ke atribut DOM, bukan lewat `useState`.
   *
   * Dua alasan: memanggil setState di dalam useEffect kena lint
   * `react-hooks/set-state-in-effect` (aturan yang sama sudah dicatat di
   * Navbar), dan status ini murni urusan tampilan — tidak ada satupun bagian
   * React yang perlu tahu, jadi memicu render ulang hanya untuk mengganti satu
   * atribut itu mubazir.
   */
  useEffect(() => {
    const elemen = ref.current;
    if (!elemen) return;

    const tampilkan = () => elemen.setAttribute("data-tampil", "ya");

    // Browser lawas tanpa IntersectionObserver: tampilkan saja, jangan sampai
    // isinya tidak pernah muncul.
    if (typeof IntersectionObserver === "undefined") {
      tampilkan();
      return;
    }

    const pengamat = new IntersectionObserver(
      ([masuk]) => {
        if (!masuk.isIntersecting) return;
        tampilkan();
        pengamat.disconnect();
      },
      {
        // Ditahan sedikit supaya elemen baru muncul setelah benar-benar masuk
        // layar, bukan pas ujungnya baru menyentuh tepi bawah.
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.05,
      },
    );

    pengamat.observe(elemen);
    return () => pengamat.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`muncul ${className ?? ""}`}
      data-tampil="belum"
      style={jeda ? ({ transitionDelay: `${jeda}ms` } as CSSProperties) : undefined}
    >
      {children}
    </div>
  );
}
