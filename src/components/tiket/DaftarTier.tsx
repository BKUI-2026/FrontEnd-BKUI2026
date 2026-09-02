"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import { TIER } from "@/lib/ticket-content";
import type { ItemKatalog } from "@/lib/katalog";
import { BERURUTAN_TIER, SEKALI_MASUK } from "@/components/explore/gerak";
import { KartuKatalog } from "@/components/katalog/KartuKatalog";
import { DetailKatalog } from "@/components/katalog/DetailKatalog";

/**
 * Tiga kartu tier tiket beserta overlay detailnya.
 *
 * Struktur state-nya sama dengan `KatalogMerch`, termasuk penghitung `pembuka`
 * yang dipakai sebagai `key` overlay — alasannya dicatat lengkap di sana:
 * tanpa itu, kartu yang sudah pernah dibuka bisa tidak mau terbuka lagi.
 *
 * Tidak ada penyaring di sini: Figma memang cuma menampilkan tiga tier.
 */
export function DaftarTier() {
  const [detail, setDetail] = useState<ItemKatalog | null>(null);
  const [pembuka, setPembuka] = useState(0);

  const bukaDetail = (item: ItemKatalog) => {
    setDetail(item);
    setPembuka((n) => n + 1);
  };

  return (
    <>
      <motion.div
        variants={BERURUTAN_TIER}
        initial="sembunyi"
        whileInView="tampil"
        viewport={SEKALI_MASUK}
        className="mx-auto grid w-full max-w-[1115px] gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {TIER.map((tier) => (
          <KartuKatalog key={tier.id} item={tier} tegas onLihatDetail={() => bukaDetail(tier)} />
        ))}
      </motion.div>

      <DetailKatalog key={pembuka} item={detail} onTutup={() => setDetail(null)} />
    </>
  );
}
