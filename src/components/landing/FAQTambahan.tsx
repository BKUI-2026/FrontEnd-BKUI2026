"use client";

import Image from "next/image";
import { useId, useState } from "react";

import { BarisFAQ } from "@/components/landing/BarisFAQ";
import type { ItemFAQ } from "@/lib/landing-content";

/** Tombol "Lihat pertanyaan lainnya" dengan tinggi konten yang dianimasikan. */
export function FAQTambahan({ items }: { items: readonly ItemFAQ[] }) {
  const [terbuka, setTerbuka] = useState(false);
  const idDaftar = useId();

  return (
    <div className="w-full">
      <button
        type="button"
        aria-expanded={terbuka}
        aria-controls={idDaftar}
        onClick={() => setTerbuka((sebelumnya) => !sebelumnya)}
        className="mx-auto flex w-fit cursor-pointer items-center gap-2 rounded-full bg-bkui-hijau px-6 py-3 font-ui text-lg text-white transition-transform duration-300 hover:-translate-y-0.5 focus-visible:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bkui-kuning motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:focus-visible:translate-y-0"
      >
        {terbuka ? "Sembunyikan pertanyaan" : "Lihat pertanyaan lainnya"}
        <Image
          src="/icon/landing/chevron-bawah.svg"
          alt=""
          aria-hidden
          width={24}
          height={24}
          className={`size-6 brightness-0 invert transition-transform duration-500 ease-out motion-reduce:transition-none ${terbuka ? "rotate-180" : ""}`}
        />
      </button>

      <div
        id={idDaftar}
        aria-hidden={!terbuka}
        inert={!terbuka}
        className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out motion-reduce:transition-none ${terbuka ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="min-h-0 overflow-hidden">
          <ul className="mt-6 flex flex-col gap-3 sm:gap-4">
            {items.map((item) => (
              <li key={item.id}>
                <BarisFAQ item={item} terbukaAwal={false} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
