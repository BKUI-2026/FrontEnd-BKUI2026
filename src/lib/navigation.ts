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

export interface NavItem {
  label: string;
  href: string;
  /**
   * Siapa yang boleh melihat menu ini.
   * - "General Public" → selalu tampil, termasuk saat sudah login
   * - "Student"        → hanya tampil setelah login
   */
  akses: Akses;
}

export const NAV_ITEMS: readonly NavItem[] = [
  { label: "Beranda", href: "/", akses: "General Public" },
  { label: "Explore UI", href: "/explore-ui", akses: "General Public" },
  // Diisi PJ Sekolah — tanpa akun, jadi tetap General Public.
  { label: "School Roadshow", href: "/school-roadshow", akses: "General Public" },
  { label: "Merchandise", href: "/merchandise", akses: "General Public" },

  // Di Figma, "Mentoring" hanya muncul pada navbar versi logged in.
  { label: "Mentoring", href: "/daftar-mentoring", akses: "Student" },
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
  if (akses === "Student") return NAV_ITEMS;
  return NAV_ITEMS.filter((item) => item.akses === "General Public");
}
