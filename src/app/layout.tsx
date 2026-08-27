import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { SakuraBerjatuhan } from "@/components/ui/SakuraBerjatuhan";

import "./globals.css";

export const metadata: Metadata = {
  title: "BKUI 2026 — Bedah Kampus Universitas Indonesia",
  description:
    "Platform resmi Bedah Kampus Universitas Indonesia (BKUI) 2026 — BEM UI.",
};

/**
 * Root layout.
 *
 * Navbar tampil di semua halaman (FE-0003) — strukturnya sudah jadi, tapi
 * style-nya masih netral karena belum dislicing dari Figma. Footer belum ada.
 * Font juga belum ditentukan, nunggu design token dari Figma.
 *
 * Props diketik eksplisit, bukan pakai `LayoutProps<"/">` bawaan Next. Tipe itu
 * baru ada setelah `next build`/`next dev` sempat jalan, jadi `npm run typecheck`
 * di repo yang baru di-clone akan error kalau kita bergantung padanya.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <SakuraBerjatuhan />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
