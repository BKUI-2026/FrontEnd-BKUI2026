/**
 * Aturan gerak bersama untuk halaman Explore UI.
 *
 * Dikumpulkan di satu file supaya seluruh section punya ritme yang sama —
 * kalau tiap komponen memilih durasi sendiri-sendiri, halamannya terasa
 * tersusun dari potongan yang tidak saling kenal.
 *
 * ---------------------------------------------------------------------------
 * Kenapa cuma `opacity` dan `transform`
 * ---------------------------------------------------------------------------
 * Halaman ini dibuka 10.000+ orang, sebagian besar dari HP. Dua properti itu
 * bisa dikerjakan compositor GPU tanpa menghitung ulang layout tiap frame;
 * menganimasi `width`/`height`/`top` memaksa reflow dan langsung terasa patah
 * di perangkat kelas menengah ke bawah.
 *
 * Semua elemen yang bergerak juga sudah memesan ruangnya lebih dulu (lapisan
 * hiasan `absolute`, kartu yang tingginya ditentukan isinya), jadi tidak ada
 * satupun animasi di sini yang menggeser tata letak — CLS tetap nol.
 */
import type { Transition, Variants } from "framer-motion";

/**
 * Rentang "sekali muncul" saat elemen masuk layar.
 *
 * `once: true` disengaja: konten yang memudar tiap kali di-scroll bolak-balik
 * cepat mengganggu, apalagi di halaman sepanjang ini.
 *
 * `margin` bawah -10% menahan animasi sampai elemennya benar-benar masuk,
 * bukan pas ujungnya baru menyentuh tepi layar. Angkanya disamakan dengan
 * `rootMargin` komponen `Muncul` di Landing Page.
 */
export const SEKALI_MASUK = { once: true, margin: "0px 0px -10% 0px" } as const;

/** Naik + memudar masuk. Dipakai judul section, kartu, dan blok isi kartu. */
export const MUNCUL: Variants = {
  sembunyi: { opacity: 0, y: 28 },
  tampil: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

/**
 * Pembungkus yang memunculkan anak-anaknya berurutan, bukan serentak.
 *
 * 90ms adalah jarak yang cukup untuk terbaca sebagai "satu per satu" tapi
 * belum terasa lambat; di atas ~150ms elemen terakhir mulai terasa tertinggal.
 */
export const BERURUTAN: Variants = {
  sembunyi: {},
  tampil: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

/** Versi rapat untuk deretan chip yang jumlahnya banyak dan kecil-kecil. */
export const BERURUTAN_RAPAT: Variants = {
  sembunyi: {},
  tampil: { transition: { staggerChildren: 0.06 } },
};

/** Chip kecil: ikut naik sedikit sambil sedikit membesar. */
export const MUNCUL_CHIP: Variants = {
  sembunyi: { opacity: 0, y: 12, scale: 0.94 },
  tampil: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] },
  },
};

/**
 * Transisi untuk sentuhan langsung (hover, tap, pil tab yang bergeser).
 *
 * Pegas, bukan durasi tetap: responsnya terasa mengikuti jari/kursor. Damping
 * 30 dipilih supaya berhenti tanpa memantul — pantulan di elemen navigasi
 * terbaca sebagai mainan, bukan kontrol.
 */
export const SENTUHAN: Transition = { type: "spring", stiffness: 420, damping: 30 };

/**
 * Dipakai saat pengguna menyalakan "kurangi animasi" di OS.
 *
 * Elemennya TETAP tampil — yang dimatikan cuma perpindahannya. Menyembunyikan
 * konten karena animasinya dimatikan justru membuat halaman tidak terbaca.
 */
export const TANPA_GERAK: Variants = {
  sembunyi: { opacity: 1, y: 0, scale: 1 },
  tampil: { opacity: 1, y: 0, scale: 1, transition: { duration: 0 } },
};
