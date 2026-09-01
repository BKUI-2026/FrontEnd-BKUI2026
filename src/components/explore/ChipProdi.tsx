"use client";

import { motion } from "framer-motion";

import { MUNCUL_CHIP } from "./gerak";

/**
 * Chip hijau berisi nama program studi.
 *
 * Gradiennya disalin apa adanya dari Figma (Gradient/11): 62.47 derajat dari
 * `#0E4700` ke `#018B01`. Sudut miring inilah yang membedakannya dari pil
 * Timeline di Landing Page yang gradiennya tegak.
 *
 * Lebarnya 200px di desktop sesuai Figma, tapi di layar sempit dibiarkan
 * mengikuti isinya (`w-auto`) supaya tiga chip tidak memaksa baris melebar
 * lalu menggeser kartunya.
 */
export function ChipProdi({ nama }: { nama: string }) {
  return (
    <motion.li
      variants={MUNCUL_CHIP}
      className="flex items-center justify-center rounded-full bg-gradient-to-tr from-bkui-hijau-tua to-bkui-hijau-daun px-4 py-2.5 lg:w-[200px]"
      style={{
        backgroundImage:
          "linear-gradient(-62.47deg, var(--color-bkui-hijau-tua) 9.79%, var(--color-bkui-hijau-daun) 111.06%)",
      }}
    >
      <span className="text-center font-body text-xs font-medium leading-tight text-bkui-terang sm:text-sm">
        {nama}
      </span>
    </motion.li>
  );
}
