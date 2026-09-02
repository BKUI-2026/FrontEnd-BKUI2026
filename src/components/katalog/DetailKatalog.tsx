"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { angkaRupiah, type ItemKatalog } from "@/lib/katalog";
import { env } from "@/lib/env";

interface DetailKatalogProps {
  /** Item yang sedang dibuka, atau null kalau overlay tertutup. */
  item: ItemKatalog | null;
  onTutup: () => void;
}

/**
 * Overlay detail item katalog (Figma `338:1339`) — dipakai Merchandise maupun
 * Tiket.
 *
 * ---------------------------------------------------------------------------
 * Kenapa `<dialog>`, bukan `<div>` yang ditaruh di atas halaman
 * ---------------------------------------------------------------------------
 * Elemen `<dialog>` yang dibuka lewat `showModal()` memberi banyak hal gratis
 * yang kalau ditulis tangan gampang terlewat dan sulit diuji:
 *
 * - fokus keyboard terkurung di dalam overlay, tidak bocor ke kartu di
 *   belakangnya
 * - Escape menutup
 * - fokus kembali ke tombol "Lihat Detail" yang membukanya
 * - dirender di lapisan teratas browser, jadi tidak bisa tertutup elemen lain
 *   dan tidak perlu adu z-index dengan navbar atau kelopak sakura
 *
 * Yang tidak gratis cuma dua, jadi ditambahkan di bawah: menutup saat latar
 * diklik, dan mengunci scroll halaman di belakangnya.
 *
 * ---------------------------------------------------------------------------
 * Isinya tetap katalog, bukan transaksi
 * ---------------------------------------------------------------------------
 * Satu-satunya tombol aksi di sini "Beli di Yesplis" — sama seperti di kartu,
 * link keluar biasa. Tidak ada jumlah beli, pilihan ukuran, atau tambah ke
 * keranjang (README boundary nomor 1).
 */
export function DetailKatalog({ item, onTutup }: DetailKatalogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  /*
   * `onTutup` disimpan di ref supaya listener `close` di bawah tidak perlu
   * dipasang ulang tiap render induk. Tanpa ini, listener-nya lepas-pasang
   * terus dan gampang meleset dari event yang datang di sela-selanya.
   */
  const tutupRef = useRef(onTutup);
  useEffect(() => {
    // Menulis ref HARUS di dalam effect, bukan saat render — React melarangnya
    // karena nilai yang ditulis saat render bisa terbuang kalau render diulang.
    tutupRef.current = onTutup;
  }, [onTutup]);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    // Memanggil API DOM, bukan setState — aman dari lint set-state-in-effect.
    if (item && !dialog.open) dialog.showModal();
    if (!item && dialog.open) dialog.close();
  }, [item]);

  /*
   * Sinkronisasi balik saat overlay ditutup DARI SISI BROWSER — Escape, atau
   * tombol tutup bawaan sistem.
   *
   * Ditangani lewat `addEventListener` langsung, bukan prop `onClose` React.
   * Event `close` tidak merambat naik (non-bubbling), dan waktu memakai prop
   * React state-nya tidak ikut ter-update: `detail` di induk tetap berisi
   * item yang sama, sehingga menekan "Lihat Detail" pada kartu yang sama
   * tidak menghasilkan perubahan state — dan overlaynya tidak pernah terbuka
   * lagi. Ini bukan teori: ketahuan waktu diuji, kartu yang sudah pernah
   * dibuka jadi mati.
   */
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const saatTutup = () => tutupRef.current();
    // `cancel` mendahului `close` saat Escape ditekan. Keduanya didengarkan
    // supaya state tetap sinkron meski salah satunya tidak sampai.
    dialog.addEventListener("close", saatTutup);
    dialog.addEventListener("cancel", saatTutup);
    return () => {
      dialog.removeEventListener("close", saatTutup);
      dialog.removeEventListener("cancel", saatTutup);
    };
  }, []);

  return (
    <dialog
      ref={ref}
      // Klik pada elemen <dialog> sendiri berarti klik di area latar: isinya
      // ada di <div> anak, yang menghentikan event-nya sebelum sampai sini.
      onClick={(e) => {
        if (e.target === ref.current) onTutup();
      }}
      aria-label={item ? `Detail ${item.nama}` : undefined}
      className="m-auto w-[calc(100vw-2rem)] max-w-[1282px] bg-transparent p-0 backdrop:bg-black/50"
    >
      {item && <IsiDetail key={item.id} item={item} onTutup={onTutup} />}
    </dialog>
  );
}

function IsiDetail({ item, onTutup }: { item: ItemKatalog; onTutup: () => void }) {
  const [foto, setFoto] = useState(0);
  const urlYesplis = env.yesplisMerchUrl;

  const geser = (arah: 1 | -1) =>
    setFoto((i) => (i + arah + item.jumlahFoto) % item.jumlahFoto);

  return (
    <div className="overlay-detail flex flex-col items-end gap-5 rounded-3xl bg-gradient-to-b from-bkui-kartu-atas to-bkui-kartu-bawah p-6 sm:p-10 lg:gap-5 lg:px-14 lg:py-[72px]">
      <button
        type="button"
        onClick={onTutup}
        aria-label="Tutup detail"
        className="shrink-0 cursor-pointer rounded-full p-1 text-bkui-coklat transition-opacity hover:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bkui-hijau"
      >
        <Image src="/icon/merch/tutup.svg" alt="" aria-hidden width={16} height={16} className="size-4" />
      </button>

      <div className="flex w-full flex-col items-center gap-8 lg:flex-row lg:gap-12">
        {/*
          Area foto. Rasionya dikunci 600:446 sesuai Figma supaya tinggi
          overlay tidak berubah saat foto aslinya nanti masuk.
        */}
        <div className="relative aspect-[600/446] w-full shrink-0 overflow-hidden rounded bg-bkui-coklat lg:w-[600px]">
          <p className="absolute inset-0 flex items-center justify-center font-ui text-sm text-bkui-terang/45">
            Foto {foto + 1} menyusul
          </p>

          <TombolGeser arah="mundur" onClick={() => geser(-1)} />
          <TombolGeser arah="maju" onClick={() => geser(1)} />

          <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
            {Array.from({ length: item.jumlahFoto }, (_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setFoto(i)}
                aria-label={`Foto ke-${i + 1} dari ${item.jumlahFoto}`}
                aria-current={i === foto}
                className={`size-2 cursor-pointer rounded-full bg-bkui-terang transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bkui-terang ${
                  i === foto ? "opacity-100" : "opacity-40"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex w-full flex-col gap-6 text-bkui-coklat lg:w-[522px]">
          <h2 className="font-display text-3xl leading-[1.4] sm:text-4xl lg:text-[64px]">
            {item.nama}
          </h2>

          <p className="font-body text-base font-medium leading-[1.4] opacity-60 lg:text-xl">
            Stocks Available: {item.stok}
          </p>

          {/* "Rp" pakai font display, angkanya Delight extra bold — sesuai Figma. */}
          <p className="text-2xl leading-[1.4] lg:text-[32px]">
            <span className="font-display">Rp</span>
            <span className="font-ui font-extrabold">{angkaRupiah(item.harga)}</span>
          </p>

          <p className="font-body text-base font-medium leading-[1.4] lg:text-xl">
            {item.deskripsi}
          </p>

          {urlYesplis ? (
            <a
              href={urlYesplis}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-16 w-fit items-center justify-center rounded-full bg-bkui-oren px-9 font-ui text-lg font-medium text-bkui-coklat transition-transform hover:-translate-y-0.5 focus-visible:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bkui-hijau lg:text-xl"
            >
              Beli di Yesplis
            </a>
          ) : (
            <button
              type="button"
              disabled
              title="URL Yesplis belum diberikan"
              className="h-16 w-fit cursor-not-allowed rounded-full bg-bkui-oren px-9 font-ui text-lg font-medium text-bkui-coklat opacity-60 lg:text-xl"
            >
              Beli di Yesplis
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Panah geser foto. Satu berkas SVG dipakai untuk dua arah — yang ke kanan
 * tinggal dicerminkan, persis seperti di Figma.
 */
function TombolGeser({ arah, onClick }: { arah: "maju" | "mundur"; onClick: () => void }) {
  const maju = arah === "maju";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={maju ? "Foto berikutnya" : "Foto sebelumnya"}
      className={`absolute top-1/2 z-10 -translate-y-1/2 cursor-pointer rounded-full p-1 transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bkui-terang ${
        maju ? "right-3" : "left-3"
      }`}
    >
      <Image
        src="/icon/merch/chevron.svg"
        alt=""
        aria-hidden
        width={28}
        height={28}
        className={`size-7${maju ? " -scale-x-100" : ""}`}
      />
    </button>
  );
}
