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
    // `relative z-50` bukan sekadar hiasan: lapisan kelopak sakura itu `fixed
    // z-40` menutupi seluruh layar, dan elemen ber-z-index selalu menang atas
    // elemen tanpa posisi. Tanpa ini kelopaknya melintas DI DEPAN footer.
    // Angkanya disamakan dengan Navbar — keduanya sama-sama bingkai halaman
    // yang harus berada di atas kelopak.
    <footer className="relative z-50 w-full bg-bkui-button">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-5 py-10 sm:px-8 sm:py-12 md:flex-row md:items-start md:justify-between">
        {/* Kiri — kontak */}
        <div>
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
            {/*
              Font display dari Figma belum disiapkan di project (belum ada
              design token font), jadi sementara pakai bobot paling tebal dari
              font default.
            */}
            <h2 className="text-3xl font-extrabold tracking-tight text-black sm:text-4xl">
              Contact Us
            </h2>

            <ul className="flex items-center gap-1 sm:gap-2">
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
                        className="inline-flex size-11 items-center justify-center rounded-full transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
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
            className="mt-2 inline-flex min-h-11 items-center break-all text-base text-black hover:underline sm:mt-4"
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
