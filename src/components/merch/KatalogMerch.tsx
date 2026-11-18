"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import type { ProdukMerch } from "@/lib/merch-content";
import { alasanTidakBisaDibeli, gabungKatalog, useKatalogMerch } from "@/lib/merch";
import { BERURUTAN, SEKALI_MASUK } from "@/components/explore/gerak";
import { KartuKatalog } from "@/components/katalog/KartuKatalog";
import { DetailKatalog } from "@/components/katalog/DetailKatalog";
import { KeranjangMerch } from "./KeranjangMerch";
import { PemilihVarian } from "./PemilihVarian";
import { TombolCheckout } from "./TombolCheckout";
import { useKeranjangMerch } from "./keranjang-merch";

/**
 * Katalog merchandise: kisi produk, overlay detail dengan pemilih varian, dan
 * tombol Checkout mengambang di kiri bawah.
 *
 * Produk tanpa varian langsung masuk keranjang dari kartunya. Produk bervarian
 * membuka overlay detail lebih dulu karena SKU-nya baru jelas setelah warna /
 * ukuran / desain dipilih.
 */
export function KatalogMerch() {
  const router = useRouter();
  const keadaan = useKatalogMerch();
  const katalog = gabungKatalog(keadaan.jenis === "siap" ? keadaan.katalog : null);
  const keranjang = useKeranjangMerch();
  const [keranjangTerbuka, setKeranjangTerbuka] = useState(false);
  const [pesan, setPesan] = useState("");
  const totalItem = keranjang.isi.reduce((total, row) => total + row.jumlah, 0);
  /*
   * Satu overlay detail untuk seluruh katalog. `pembuka` dipakai sebagai `key`
   * supaya overlay selalu dipasang ulang saat dibuka, termasuk untuk kartu yang
   * sama, dan carousel kembali ke foto pertama.
   */
  const [detail, setDetail] = useState<ProdukMerch | null>(null);
  const [pembuka, setPembuka] = useState(0);

  const bukaDetail = (produk: ProdukMerch) => {
    setDetail(produk);
    setPembuka((n) => n + 1);
  };

  const tambah = (sku: string, jumlah: number) => {
    keranjang.tambah(sku, jumlah);
    const data = katalog.sku.get(sku);
    setPesan(`${data ? data.produk.nama : sku} ditambahkan ke keranjang.`);
  };

  return (
    <>
      <motion.div
        variants={BERURUTAN}
        initial="sembunyi"
        whileInView="tampil"
        viewport={SEKALI_MASUK}
        className="grid min-w-0 gap-x-4 gap-y-6 sm:grid-cols-2 xl:grid-cols-3"
      >
        {katalog.produk.map((produk) => {
          const alasan = alasanTidakBisaDibeli(produk, katalog);
          const bervarian = produk.varian.length > 0;
          return (
            <KartuKatalog
              key={produk.id}
              item={produk}
              urlYesplis=""
              onLihatDetail={() => bukaDetail(produk)}
              onTambahKeranjang={alasan ? undefined : bervarian ? () => bukaDetail(produk) : () => tambah(produk.skuDasar, 1)}
              teksTambah={bervarian ? "Pilih Varian" : "Tambah"}
              teksNonaktif={alasan ?? undefined}
            />
          );
        })}
      </motion.div>
      <p role="status" className="sr-only">{pesan}</p>

      <DetailKatalog
        key={pembuka}
        item={detail}
        urlYesplis=""
        onTutup={() => setDetail(null)}
        aksi={detail ? (kontrol) => (
          <PemilihVarian produk={detail} katalog={katalog} kontrol={kontrol} onTambah={tambah} />
        ) : undefined}
      />

      {keranjang.siap && <TombolCheckout jumlah={totalItem} onClick={() => setKeranjangTerbuka(true)} />}

      {keranjangTerbuka && (
        <KeranjangMerch
          katalog={katalog}
          isi={keranjang.isi}
          onCheckout={() => router.push("/checkout")}
          onUbahJumlah={keranjang.ubahJumlah}
          onHapus={keranjang.hapus}
          onTutup={() => setKeranjangTerbuka(false)}
        />
      )}
    </>
  );
}
