"use client";

import { createPortal } from "react-dom";

/**
 * Tombol keranjang mengambang di kiri bawah, sejajar dengan "Tanya MinCan
 * Aja!" di kanan bawah. Gayanya meniru tombol MinCan (garis coklat + bayangan
 * keras) supaya keduanya terbaca sepasang.
 *
 * Dirender lewat portal ke <body>: pembungkus halaman memakai animasi
 * `transform`, dan elemen `fixed` di dalam leluhur yang ber-transform ikut
 * menempel ke leluhur itu, bukan ke layar. Komponen ini hanya dipasang setelah
 * keranjang terbaca di browser, jadi `document` pasti ada.
 */
export function TombolCheckout({ jumlah, onClick }: { jumlah: number; onClick: () => void }) {
  return createPortal(
    <button
      type="button"
      onClick={onClick}
      aria-label={`Checkout, ${jumlah} barang di keranjang`}
      className="group fixed bottom-4 left-3 z-[70] flex cursor-pointer items-center gap-2 focus-visible:outline-none sm:bottom-7 sm:left-7"
    >
      <span className="relative flex size-16 shrink-0 items-center justify-center rounded-full border-[3px] border-bkui-coklat-garis bg-gradient-to-b from-bkui-oren to-bkui-oren-muda text-bkui-coklat shadow-[4px_5px_0_#754325] transition-transform duration-200 group-hover:scale-105 group-focus-visible:scale-105 sm:size-20">
        <svg aria-hidden viewBox="0 0 24 24" className="size-7 sm:size-8" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 7h12l-1 13H7L6 7Z" />
          <path d="M9 7a3 3 0 0 1 6 0" />
        </svg>
        {jumlah > 0 && (
          <span aria-hidden className="absolute -right-1 -top-1 flex min-w-6 items-center justify-center rounded-full border-2 border-bkui-coklat-garis bg-white px-1 font-ui text-xs font-bold text-bkui-coklat">
            {jumlah}
          </span>
        )}
      </span>
      <span className="relative rounded-2xl border-2 border-bkui-coklat-garis bg-white px-3 py-2 font-ui text-xs max-[379px]:hidden font-semibold text-bkui-hijau-tua shadow-[3px_4px_0_#754325] transition-transform duration-200 group-hover:-translate-y-1 group-focus-visible:-translate-y-1 sm:px-4 sm:text-base">
        Checkout
        <span aria-hidden className="absolute -left-[8px] top-1/2 size-4 -translate-y-1/2 rotate-45 border-b-2 border-l-2 border-bkui-coklat-garis bg-white" />
      </span>
    </button>,
    document.body,
  );
}
