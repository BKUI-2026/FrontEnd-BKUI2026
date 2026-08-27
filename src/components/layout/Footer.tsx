import Image from "next/image";

import { LogoFooterBKUI } from "@/components/ui/LogoFooterBKUI";

/** Alamat email resmi BKUI, sesuai desain Figma footer. */
const EMAIL_BKUI = "bedahkampusui@gmail.com";

/**
 * Ikon sosial media di footer.
 *
 * `href` sengaja masih null: URL akun sosmed BKUI belum diberikan, dan menebak
 * URL akun orang/organisasi jelas tidak boleh. Selama null, ikonnya dirender
 * sebagai gambar biasa (tidak bisa diklik).
 *
 * Begitu URL-nya ada, tinggal isi `href` — bagian render di bawah otomatis
 * membungkusnya jadi link.
 */
const SOSMED: { nama: string; ikon: string; lebar: number; tinggi: number; href: string | null }[] =
  [
    { nama: "TikTok", ikon: "/icon/tiktokIcon.svg", lebar: 21, tinggi: 24, href: "https://www.tiktok.com/@bkui_official" },
    { nama: "X", ikon: "/icon/twitterIcon.png", lebar: 27, tinggi: 24, href: "https://x.com/BKUI_Official" },
    { nama: "Instagram", ikon: "/icon/instaIcon.png", lebar: 24, tinggi: 24, href: "https://www.instagram.com/bkui.official/" },
  ];

/**
 * Footer utama — mengikuti desain Figma.
 *
 * Kiri : "Contact Us" + ikon sosmed, lalu alamat email
 * Kanan: lockup logo BKUI 2026, lalu baris hak cipta
 *
 * Background full width (menyamai navbar), tapi isinya dibatasi `max-w-7xl`
 * dan ditengahkan — di Figma isi footer memang menjorok dari tepi layar.
 */
export function Footer() {
  return (
    <footer className="w-full bg-bkui-button">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-8 py-12 md:flex-row md:items-start md:justify-between">
        {/* Kiri — kontak */}
        <div>
          <div className="flex items-center gap-4">
            {/*
              Font display dari Figma belum disiapkan di project (belum ada
              design token font), jadi sementara pakai bobot paling tebal dari
              font default.
            */}
            <h2 className="text-4xl font-extrabold tracking-tight text-black">
              Contact Us
            </h2>

            <ul className="flex items-center gap-4">
              {SOSMED.map((item) => {
                const gambar = (
                  <Image
                    src={item.ikon}
                    alt={item.nama}
                    width={item.lebar}
                    height={item.tinggi}
                  />
                );

                return (
                  <li key={item.nama}>
                    {item.href ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`BKUI 2026 di ${item.nama}`}
                        className="inline-block transition-opacity hover:opacity-70"
                      >
                        {gambar}
                      </a>
                    ) : (
                      gambar
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <a
            href={`mailto:${EMAIL_BKUI}`}
            className="mt-4 inline-block text-base text-black hover:underline"
          >
            {EMAIL_BKUI}
          </a>
        </div>

        {/* Kanan — logo & hak cipta */}
        <div className="flex flex-col gap-3 md:items-end">
          <LogoFooterBKUI />
          <p className="text-base text-black">
            &copy; 2026 BKUI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
