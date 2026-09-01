"use client";

import { useState } from "react";

import { fakultasUntuk, type FilterRumpun as Filter } from "@/lib/explore-content";
import { FilterRumpun } from "./FilterRumpun";
import { KartuFakultas } from "./KartuFakultas";

/**
 * Daftar fakultas beserta penyaring rumpunnya.
 *
 * Ini satu-satunya tempat yang memegang state pilihan filter. `FilterRumpun`
 * dan `KartuFakultas` sengaja dibuat tanpa state sendiri supaya keduanya bisa
 * dipakai ulang dan diuji tanpa menyeret logika penyaringan.
 *
 * `key={aktif}` pada pembungkus daftar bukan sekadar penanda React: ia MEMAKSA
 * kartu dibuat ulang tiap kali filternya diganti, sehingga animasi "muncul"
 * di tiap kartu jalan lagi untuk hasil saringan yang baru. Tanpa itu, React
 * akan memakai ulang elemen lama dan daftarnya berganti isi begitu saja —
 * mata pengguna kehilangan tanda bahwa isinya memang berubah.
 *
 * Ini juga satu-satunya animasi yang boleh berulang di halaman ini. Sisanya
 * sekali jalan (`viewport.once`), karena yang berulang cuma menghasilkan
 * kedipan tiap kali orang scroll bolak-balik.
 */
export function DaftarFakultas() {
  const [aktif, setAktif] = useState<Filter>("Semua");
  const daftar = fakultasUntuk(aktif);

  return (
    <div className="mx-auto flex w-full max-w-[1372px] flex-col gap-10 px-5 py-12 lg:gap-14 lg:px-8 lg:py-16">
      <FilterRumpun aktif={aktif} onPilih={setAktif} />

      <div key={aktif} className="flex flex-col gap-12 lg:gap-16">
        {daftar.map((fakultas, i) => (
          <KartuFakultas
            key={fakultas.id}
            fakultas={fakultas}
            // Selang-seling mengikuti Figma: yang kedua, keempat, dst. dibalik.
            terbalik={i % 2 === 1}
          />
        ))}
      </div>
    </div>
  );
}
