/**
 * Pembungkus yang dipasang ULANG tiap kali halaman berganti.
 *
 * Bedanya dengan `layout.tsx`: layout bertahan antar navigasi (itulah kenapa
 * Navbar, Footer, dan lapisan sakura tinggal di sana dan tidak berkedip).
 * Template dibuat ulang tiap pindah halaman — persis yang dibutuhkan untuk
 * memutar animasi masuk.
 *
 * `flex flex-1 flex-col` bukan hiasan: `<body>` adalah kolom flex dan `<main>`
 * di dalam tiap halaman memakai `flex-1` untuk mendorong Footer ke bawah.
 * Menyisipkan pembungkus di antaranya memutus rantai itu, jadi pembungkusnya
 * harus meneruskan sifat yang sama.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="halaman-masuk flex flex-1 flex-col">{children}</div>;
}
