"use client";

import { useState } from "react";

import { rupiah } from "@/lib/katalog";
import type { KontrolDetail } from "@/components/katalog/DetailKatalog";
import { skuDari, type ProdukMerch } from "@/lib/merch-content";
import { alasanTidakBisaDibeli, type KatalogTampil } from "@/lib/merch";
import { kelasTombol } from "@/lib/tombol";
import { BATAS_JUMLAH } from "./keranjang-merch";

interface PemilihVarianProps {
  produk: ProdukMerch;
  katalog: KatalogTampil;
  kontrol: KontrolDetail;
  onTambah: (sku: string, jumlah: number) => void;
}

const OPSI = "min-h-11 cursor-pointer rounded-full border px-4 py-2 font-ui text-sm font-medium transition-colors focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-bkui-hijau has-[:checked]:border-bkui-coklat has-[:checked]:bg-bkui-coklat has-[:checked]:text-bkui-terang has-[:disabled]:cursor-not-allowed has-[:disabled]:border-dashed has-[:disabled]:opacity-45";
const KONTROL = "inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-bkui-coklat/30 font-ui text-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bkui-hijau disabled:opacity-40";

/**
 * Pilihan warna/ukuran/desain + jumlah di overlay detail. SKU baru terbentuk
 * setelah semua grup dipilih; opsi yang semua kombinasinya habis dinonaktifkan
 * supaya pembeli tidak memilih varian yang pasti ditolak BE.
 */
export function PemilihVarian({ produk, katalog, kontrol, onTambah }: PemilihVarianProps) {
  const [pilihan, setPilihan] = useState<(string | undefined)[]>(() => produk.varian.map((g) => g.opsi.length === 1 ? g.opsi[0].kode : undefined));
  const [jumlah, setJumlah] = useState(1);
  const sku = skuDari(produk, pilihan);
  const data = sku ? katalog.sku.get(sku) : undefined;
  const alasan = alasanTidakBisaDibeli(produk, katalog);
  const batas = Math.min(BATAS_JUMLAH, data?.stok ?? 0);

  /** Masih ada stok untuk opsi ini, mengingat pilihan di grup lain? */
  const tersedia = (grup: number, kode: string) => {
    if (!katalog.dibuka) return true;
    return [...katalog.sku.values()].some((s) => {
      if (s.produk.id !== produk.id || s.stok <= 0) return false;
      const bagian = s.sku.slice(produk.skuDasar.length + 1).split("-");
      return bagian[grup] === kode && pilihan.every((p, i) => i === grup || !p || bagian[i] === p);
    });
  };

  const pilih = (grup: number, kode: string, foto?: number) => {
    setPilihan((lama) => lama.map((p, i) => (i === grup ? kode : p)));
    setJumlah(1);
    if (foto !== undefined) kontrol.pilihFoto(foto);
  };

  let teksTombol = "Tambah ke Keranjang";
  if (alasan) teksTombol = alasan;
  else if (!sku) teksTombol = `Pilih ${produk.varian.find((_, i) => !pilihan[i])?.nama.toLowerCase() ?? "varian"}`;
  else if (!data || data.stok <= 0) teksTombol = "Varian ini habis";

  return (
    <div className="flex flex-col gap-5">
      {produk.varian.map((grup, i) => (
        <fieldset key={grup.nama} className="flex flex-col gap-2">
          <legend className="mb-2 font-ui text-base font-semibold">{grup.nama}</legend>
          <div className="flex flex-wrap gap-2">
            {grup.opsi.map((opsi) => (
              <label key={opsi.kode} className={OPSI}>
                <input
                  type="radio"
                  name={`${produk.id}-${grup.nama}`}
                  value={opsi.kode}
                  checked={pilihan[i] === opsi.kode}
                  disabled={!tersedia(i, opsi.kode)}
                  onChange={() => pilih(i, opsi.kode, opsi.foto)}
                  className="sr-only"
                />
                {opsi.label}
              </label>
            ))}
          </div>
        </fieldset>
      ))}

      {data && katalog.dibuka && (
        <p className="font-body text-sm font-medium opacity-70">
          {rupiah(data.harga)} · sisa stok {data.stok}
        </p>
      )}

      {!alasan && data && data.stok > 0 && (
        <div className="flex items-center gap-2" role="group" aria-label="Jumlah">
          <button type="button" className={KONTROL} disabled={jumlah <= 1} onClick={() => setJumlah((n) => n - 1)} aria-label="Kurangi jumlah">−</button>
          <output aria-live="polite" className="min-w-8 text-center font-ui text-lg font-semibold">{jumlah}</output>
          <button type="button" className={KONTROL} disabled={jumlah >= batas} onClick={() => setJumlah((n) => n + 1)} aria-label="Tambah jumlah">+</button>
        </div>
      )}

      <button
        type="button"
        disabled={!!alasan || !data || data.stok <= 0}
        onClick={() => {
          if (!sku) return;
          onTambah(sku, jumlah);
          kontrol.tutup();
        }}
        className={`${kelasTombol("sekunder", "besar")} w-full sm:w-fit`}
      >
        {teksTombol}
      </button>
    </div>
  );
}
