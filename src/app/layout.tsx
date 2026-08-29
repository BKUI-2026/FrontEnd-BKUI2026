import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { SakuraBerjatuhan } from "@/components/ui/SakuraBerjatuhan";
import { fontBody, fontDisplay, fontUi } from "@/lib/fonts";

import "./globals.css";

export const metadata: Metadata = {
  title: "BKUI 2026 — Bedah Kampus Universitas Indonesia",
  description:
    "Platform resmi Bedah Kampus Universitas Indonesia (BKUI) 2026 — BEM UI.",
};

/**
 * Root layout.
 *
 * Navbar & Footer tampil di semua halaman. Ketiga font dari Figma dipasang di
 * sini sebagai CSS variable di elemen <html>, lalu dipakai lewat token Tailwind
 * `font-display` / `font-ui` / `font-body` yang didaftarkan di globals.css.
 *
 * `fontBody.className` ikut dipasang supaya Inter jadi font default seluruh
 * halaman — teks yang tidak diberi kelas font apa pun tetap memakai font yang
 * benar, bukan font sistem.
 *
 * Props diketik eksplisit, bukan pakai `LayoutProps<"/">` bawaan Next. Tipe itu
 * baru ada setelah `next build`/`next dev` sempat jalan, jadi `npm run typecheck`
 * di repo yang baru di-clone akan error kalau kita bergantung padanya.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="id"
      className={`h-full antialiased ${fontDisplay.variable} ${fontUi.variable} ${fontBody.variable} ${fontBody.className}`}
    >
      <body className="flex min-h-full flex-col bg-bkui-navbar">
        <SakuraBerjatuhan />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
