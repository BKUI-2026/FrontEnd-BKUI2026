"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import { produkUntuk, type Kategori, type Produk } from "@/lib/merch-content";
import { BERURUTAN, SEKALI_MASUK } from "@/components/explore/gerak";
import { FilterMerch } from "./FilterMerch";
import { KartuKatalog } from "@/components/katalog/KartuKatalog";
import { DetailKatalog } from "@/components/katalog/DetailKatalog";

/**
 * Katalog merchandise: panel penyaring di kiri, kisi produk di kanan.
 *
 * Satu-satunya tempat yang memegang state pilihan kategori. `FilterMerch` dan
 * `KartuMerch` sengaja tanpa state sendiri supaya bisa dipakai ulang.
 *
 * `key` pada pembungkus kisi memaksa kartu dibuat ulang tiap kali saringannya
 * berubah, sehingga animasi "muncul" jalan lagi untuk hasil yang baru — tanpa
 * itu React memakai ulang elemen lama dan isinya berganti begitu saja.
 *
 * Di bawah `lg` panel filter naik ke atas kisi dan kotak centangnya berbaris
 * mendatar: sidebar 212px di layar 390px akan menyisakan lebar kartu yang tidak
 * terbaca.
 */
export function KatalogMerch() {
  const [terpilih, setTerpilih] = useState<readonly Kategori[]>([]);
  /*
   * Overlay detail dipegang di sini, satu untuk seluruh katalog — bukan satu
   * <dialog> per kartu. Sembilan dialog yang isinya sama cuma menggandakan
   * markup tanpa guna; yang tampil toh selalu satu.
   */
  const [detail, setDetail] = useState<Produk | null>(null);
  /*
   * Penghitung yang naik tiap kali detail diminta, dipakai sebagai `key`
   * <DetailMerch>.
   *
   * Kelihatannya berlebihan, tapi menutup satu mode gagal yang buruk: overlay
   * dibuka lewat `showModal()` dari dalam effect yang bergantung pada `produk`.
   * Kalau karena satu dan lain hal state tidak sempat kembali null saat overlay
   * ditutup, menekan "Lihat Detail" pada kartu yang SAMA tidak mengubah state,
   * effect-nya tidak jalan, dan kartu itu mati selamanya — sementara kartu lain
   * tetap normal, jadi bug-nya sulit ditemukan.
   *
   * Dengan `key` yang selalu berubah, komponennya dipasang ulang dan overlay
   * pasti terbuka. Efek sampingnya kebetulan diinginkan: carousel fotonya ikut
   * kembali ke foto pertama.
   */
  const [pembuka, setPembuka] = useState(0);

  const bukaDetail = (produk: Produk) => {
    setDetail(produk);
    setPembuka((n) => n + 1);
  };
  const daftar = produkUntuk(terpilih);

  const ubah = (kategori: Kategori) =>
    setTerpilih((lama) =>
      lama.includes(kategori) ? lama.filter((k) => k !== kategori) : [...lama, kategori],
    );

  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-6">
      <div className="lg:w-[212px] lg:shrink-0">
        <FilterMerch terpilih={terpilih} onUbah={ubah} />
      </div>

      <motion.div
        key={terpilih.join("|")}
        variants={BERURUTAN}
        initial="sembunyi"
        whileInView="tampil"
        viewport={SEKALI_MASUK}
        className="grid flex-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
      >
        {daftar.map((produk) => (
          <KartuKatalog key={produk.id} item={produk} onLihatDetail={() => bukaDetail(produk)} />
        ))}
      </motion.div>

      <DetailKatalog key={pembuka} item={detail} onTutup={() => setDetail(null)} />
    </div>
  );
}
