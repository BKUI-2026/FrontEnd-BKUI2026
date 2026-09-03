"use client";

import { motion } from "framer-motion";

import { env } from "@/lib/env";
import { rupiah, type ItemKatalog } from "@/lib/katalog";
import { MUNCUL, MUNCUL_TEGAS } from "@/components/explore/gerak";

/**
 * Satu kartu katalog — dipakai untuk produk Merchandise maupun tier Tiket.
 *
 * Di Figma keduanya bukan dua desain mirip melainkan susunan yang sama persis,
 * sampai ke lebar tombolnya. Jadi komponennya satu.
 *
 * ---------------------------------------------------------------------------
 * Tidak ada keranjang, dan itu disengaja
 * ---------------------------------------------------------------------------
 * Dua tombolnya persis seperti di Figma: "Lihat Detail" dan "Beli di Yesplis".
 * Tidak ada tombol tambah-ke-keranjang, tidak ada jumlah beli, tidak ada
 * checkout. Seluruh transaksi terjadi di Yesplis (AGENTS.md bagian 5.4).
 *
 * "Beli di Yesplis" adalah <a> biasa dengan `target="_blank"` — murni pindah
 * halaman keluar, bukan form yang mengirim apa-apa.
 *
 * "Lihat Detail" membuka overlay di halaman yang sama, bukan pindah rute.
 */
interface KartuKatalogProps {
  item: ItemKatalog;
  /** Membuka overlay detail milik katalog. */
  onLihatDetail: () => void;
  /**
   * Gerak masuk yang lebih terasa. Dipakai halaman Tiket, yang isinya cuma
   * tiga kartu dan muat satu layar — di sana gerak halus nyaris tidak terbaca.
   */
  tegas?: boolean;
}

export function KartuKatalog({ item, onLihatDetail, tegas = false }: KartuKatalogProps) {
  // URL Yesplis belum diberikan. Selama kosong tombolnya dimatikan, bukan
  // ditebak — menautkan ke URL karangan lebih berbahaya daripada tombol mati.
  const urlYesplis = env.yesplisMerchUrl;

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
          <span className="font-ui text-sm text-bkui-teks/45">Foto menyusul</span>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1 text-bkui-teks">
          <h3 className="font-display text-2xl leading-[1.4] lg:text-[32px]">{item.nama}</h3>
          <p className="font-ui text-xl font-semibold leading-[1.2] lg:text-[28px]">
            {rupiah(item.harga)}
          </p>
          <p className="font-body text-sm font-medium leading-[1.3] opacity-60">
            Stocks Available: {item.stok}
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

          {urlYesplis ? (
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
