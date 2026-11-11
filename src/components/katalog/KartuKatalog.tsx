"use client";

import { motion } from "framer-motion";

import { rupiah, type ItemKatalog } from "@/lib/katalog";
import { MUNCUL, MUNCUL_TEGAS } from "@/components/explore/gerak";

/**
 * Kartu bersama Merchandise dan Ticket. Merchandise dapat memberi callback
 * keranjang pratinjau; tanpa callback, CTA tetap redirect ke Yesplis.
 */
interface KartuKatalogProps {
  item: ItemKatalog;
  /** URL partner sesuai jenis katalog: tiket atau merchandise. */
  urlYesplis: string;
  /** Membuka overlay detail milik katalog. */
  onLihatDetail: () => void;
  /** Aksi keranjang untuk pratinjau merchandise; tiket tetap memakai Yesplis. */
  onTambahKeranjang?: () => void;
  /**
   * Gerak masuk yang lebih terasa. Dipakai halaman Tiket, yang isinya cuma
   * tiga kartu dan muat satu layar — di sana gerak halus nyaris tidak terbaca.
   */
  tegas?: boolean;
}

export function KartuKatalog({
  item,
  urlYesplis,
  onLihatDetail,
  onTambahKeranjang,
  tegas = false,
}: KartuKatalogProps) {
  return (
    <motion.article
      variants={tegas ? MUNCUL_TEGAS : MUNCUL}
      whileHover={{ y: tegas ? -10 : -6 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group flex flex-col gap-7 rounded-3xl bg-bkui-krem-kartu p-6 drop-shadow-[0_4px_2px_rgba(0,0,0,0.1)]"
    >
      {/*
        Foto produknya belum ada — di Figma pun kotaknya masih kosong. Tingginya
        dikunci 200px supaya kartu tidak berubah ukuran begitu fotonya masuk.
      */}
      {/*
        `overflow-hidden` + isian yang membesar saat kartunya ditunjuk: fotonya
        seolah mendekat di balik jendela kartu, bukan seluruh kartu yang
        membengkak. Yang membesar isinya, bingkainya tetap — itu yang bikin
        terbaca sebagai jendela.
      */}
      <div className="h-[200px] w-full overflow-hidden rounded-2xl bg-bkui-navbar">
        <div className="flex size-full items-center justify-center transition-transform duration-300 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100">
          {!onTambahKeranjang && <span className="px-4 text-center font-ui text-sm text-bkui-teks/55">
            Foto resmi segera hadir
          </span>}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1 text-bkui-teks">
          <h3 className="font-display text-2xl leading-[1.4] lg:text-[32px]">{item.nama}</h3>
          <p className="font-ui text-xl font-semibold leading-[1.2] lg:text-[28px]">
            {item.harga === null ? (onTambahKeranjang ? "Segera diumumkan" : "Harga segera diumumkan") : rupiah(item.harga)}
          </p>
          <p className="font-body text-sm font-medium leading-[1.3] opacity-60">
            {item.stok === null ? "Ketersediaan akan diperbarui" : `Stok tersedia: ${item.stok}`}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/*
            Detailnya dibuka sebagai overlay di halaman yang sama (Figma
            338:1339), bukan pindah ke rute lain — makanya <button>, bukan
            <a>. Isinya dirender `DetailMerch` milik katalog.
          */}
          <button
            type="button"
            onClick={onLihatDetail}
            className="tombol-kertas h-12 shrink-0 cursor-pointer rounded-3xl bg-bkui-navbar px-8 font-ui text-base font-medium text-bkui-teks focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bkui-hijau"
          >
            Lihat Detail
          </button>

          {onTambahKeranjang ? (
            <button
              type="button"
              onClick={onTambahKeranjang}
              aria-label={`Tambah ${item.nama} ke keranjang`}
              className="tombol-kertas h-12 shrink-0 cursor-pointer rounded-3xl bg-gradient-to-b from-bkui-oren to-bkui-oren-muda px-8 font-ui text-base font-medium text-bkui-coklat focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bkui-hijau"
            >
              Keranjang
            </button>
          ) : urlYesplis ? (
            <a
              href={urlYesplis}
              target="_blank"
              rel="noopener noreferrer"
              className="tombol-kertas inline-flex h-12 shrink-0 items-center justify-center rounded-3xl bg-bkui-oren px-8 font-ui text-base font-medium text-bkui-coklat focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bkui-hijau"
            >
              Beli di Yesplis
            </a>
          ) : (
            <button
              type="button"
              disabled
              title="URL Yesplis belum diberikan"
              className="h-12 shrink-0 cursor-not-allowed rounded-3xl bg-bkui-oren px-8 font-ui text-base font-medium text-bkui-coklat opacity-60"
            >
              Beli di Yesplis
            </button>
          )}
        </div>
      </div>
    </motion.article>
  );
}
