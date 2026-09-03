"use client";

import Link from "next/link";
import type { ReactNode } from "react";

/** Section pertama setelah hero. */
const TUJUAN = "apa-itu-bkui";

/**
 * Tombol "Jelajahi Lebih Lanjut" di Hero.
 *
 * ---------------------------------------------------------------------------
 * Kenapa scroll-nya ditulis sendiri, bukan `scroll-behavior: smooth`
 * ---------------------------------------------------------------------------
 * `scroll-behavior: smooth` bawaan browser memakai kurva yang sama untuk jarak
 * berapa pun dan durasi yang tidak bisa diatur. Di halaman ini jaraknya hampir
 * satu layar penuh, dan hasilnya terasa seperti halaman yang direnggut.
 *
 * Yang ditulis di sini berangkat cepat lalu melambat panjang saat tiba
 * (easeOutQuint) — gerakan orang berjalan menuju sesuatu, bukan dilempar.
 * Durasinya ikut jarak, dibatasi 650-1100ms supaya tidak pernah terasa lambat.
 *
 * ---------------------------------------------------------------------------
 * Angin berhembus saat langkah pertama
 * ---------------------------------------------------------------------------
 * Menekan tombol ini juga menembakkan `data-hembus` di elemen <html>, yang
 * menggeser seluruh lapisan kelopak sakura ke samping lalu kembali (lihat
 * `hembusan-angin` di globals.css).
 *
 * Bukan sekadar hiasan: tema acaranya "Makara Expedition — take the step,
 * discover the path", dan tombol ini secara harfiah langkah pertamanya. Jadi
 * dunianya bereaksi.
 *
 * ---------------------------------------------------------------------------
 * Tetap <a> dengan href sungguhan
 * ---------------------------------------------------------------------------
 * Tanpa JavaScript, tombolnya tetap melompat ke section yang benar lewat
 * anchor biasa. Yang ditambahkan JavaScript cuma cara perjalanannya.
 */
export function TombolJelajahi({ children }: { children: ReactNode }) {
  const berangkat = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const tujuan = document.getElementById(TUJUAN);
    // Kalau sectionnya tidak ketemu, biarkan anchor bawaan yang bekerja.
    if (!tujuan) return;

    e.preventDefault();

    document.documentElement.dataset.hembus = "ya";
    window.setTimeout(() => {
      delete document.documentElement.dataset.hembus;
    }, 2500);

    /*
     * Fokus dipindahkan ke section tujuan. Anchor biasa melakukan ini sendiri;
     * begitu `preventDefault` dipanggil, tugas itu jadi tanggung jawab kita —
     * tanpanya, pengguna keyboard tetap tertinggal di tombol dan Tab
     * berikutnya membawa mereka kembali ke atas halaman.
     */
    tujuan.setAttribute("tabindex", "-1");
    tujuan.focus({ preventScroll: true });

    const akhir = tujuan.getBoundingClientRect().top + window.scrollY;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.scrollTo(0, akhir);
      return;
    }

    const awal = window.scrollY;
    const jarak = akhir - awal;
    const durasi = Math.min(1100, Math.max(650, Math.abs(jarak) * 0.6));
    const mulai = performance.now();
    let selesai = false;

    const langkah = (kini: number) => {
      const bagian = Math.min(1, (kini - mulai) / durasi);
      // easeOutQuint — melambat panjang di ujung, seperti tiba di tujuan.
      const halus = 1 - Math.pow(1 - bagian, 5);
      window.scrollTo(0, awal + jarak * halus);
      if (bagian < 1) {
        requestAnimationFrame(langkah);
      } else {
        selesai = true;
      }
    };

    requestAnimationFrame(langkah);

    /*
     * Jaring pengaman. `requestAnimationFrame` BERHENTI kalau tab-nya tidak
     * sedang digambar — pindah tab tepat setelah menekan tombol sudah cukup.
     * Tanpa ini, `preventDefault` sudah terlanjur membatalkan lompatan bawaan
     * dan pengunjung tertinggal di tempat, tidak pernah sampai ke tujuan.
     *
     * Jadi kalau sampai lewat waktunya animasi belum juga selesai, posisinya
     * disetel langsung. Di pemakaian normal cabang ini tidak pernah kena.
     */
    window.setTimeout(() => {
      if (!selesai) window.scrollTo(0, akhir);
    }, durasi + 250);
  };

  return (
    <Link
      href={`#${TUJUAN}`}
      onClick={berangkat}
      className="tombol-kertas inline-flex h-14 items-center justify-center gap-3 rounded-full bg-bkui-navbar px-7 font-ui text-base font-medium text-bkui-teks shadow-[0_4px_14px_rgba(0,0,0,0.18)] sm:h-16 sm:px-9 sm:text-xl"
    >
      {children}
    </Link>
  );
}
