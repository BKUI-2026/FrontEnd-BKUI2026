/**
 * Sumber tunggal daftar menu navigasi.
 *
 * Navbar (dan nanti Footer) baca dari sini, jangan hardcode link di masing-masing
 * komponen — biar rute yang berubah cukup diedit di satu tempat.
 *
 * Isi & urutan menu mengikuti desain Figma navbar (FE-0004).
 */

/** Dua kondisi RBAC yang ada. Tidak ada yang ketiga. */
export type Akses = "General Public" | "Student";

/**
 * Siapa yang melihat sebuah menu.
 *
 * Dulu field ini bernama `akses` dan bernilai sama dengan tipe `Akses`, tapi
 * artinya membingungkan: "General Public" dipakai untuk menandai "tampil ke
 * semua orang", bukan "tampil hanya ke yang belum login". Begitu ada menu
 * yang justru harus HILANG setelah jadi siswa, nama lama itu tidak bisa lagi
 * menjelaskan apa pun.
 */
export type TampilUntuk =
  /** Selalu tampil, login maupun tidak. */
  | "semua"
  /** Hilang begitu pengguna berstatus siswa. */
  | "belumSiswa"
  /** Hanya untuk yang sudah berstatus siswa. */
  | "siswa";

export interface NavItem {
  label: string;
  href: string;
  tampilUntuk: TampilUntuk;
}

export const NAV_ITEMS: readonly NavItem[] = [
  { label: "Beranda", href: "/", tampilUntuk: "semua" },
  { label: "Explore UI", href: "/explore-ui", tampilUntuk: "semua" },
  /*
   * Hilang setelah pengguna berstatus siswa.
   *
   * Role STUDENT diberikan justru saat pendaftaran mentoring dikirim, jadi
   * siswa yang melihat menu ini sudah pasti terdaftar — dan mengajaknya
   * mendaftar lagi cuma membingungkan. Statusnya ada di halaman "Acara Saya"
   * pada dashboard, yang dijangkau lewat avatar di navbar.
   */
  { label: "Daftar Mentoring", href: "/daftar-mentoring", tampilUntuk: "belumSiswa" },
] as const;

/*
 * Catatan soal halaman yang TIDAK ada di navbar (sesuai desain Figma):
 *
 * - /ticket      → tidak jadi item menu, tapi diwakili tombol CTA "Pesan Tiket"
 * - /daftar-casa → tidak ada di navbar sama sekali. Rutenya tetap hidup;
 *                  kemungkinan diakses dari Landing Page (section Arah
 *                  Petualangan). Perlu dikonfirmasi ke PM.
 * - /dashboard   → tidak ada di navbar. Belum jelas diakses dari mana,
 *                  kontennya juga belum ditentukan.
 * - /profile     → diwakili ikon avatar di ujung kanan navbar.
 */

/** Menu yang boleh dilihat oleh kondisi akses tertentu. */
export function menuUntuk(akses: Akses): readonly NavItem[] {
  const siswa = akses === "Student";
  return NAV_ITEMS.filter(
    (item) =>
      item.tampilUntuk === "semua" ||
      (siswa ? item.tampilUntuk === "siswa" : item.tampilUntuk === "belumSiswa"),
  );
}
