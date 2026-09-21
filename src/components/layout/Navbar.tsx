"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { ButtonPesanTiket } from "@/components/ui/ButtonPesanTiket";
import { LogoBKUI } from "@/components/ui/LogoBKUI";
import { useAkses } from "@/lib/auth-state";
import { menuUntuk } from "@/lib/navigation";

/**
 * Navbar utama — mengikuti desain Figma (FE-0004).
 *
 * Daftar menunya diambil dari lib/navigation.ts, tidak di-hardcode di sini.
 */
export function Navbar() {
  const pathname = usePathname();
  const akses = useAkses();
  const kurangiGerak = useReducedMotion();
  const [menuTerbuka, setMenuTerbuka] = useState(false);
  const [navbarTersembunyi, setNavbarTersembunyi] = useState(false);
  const scrollSebelumnya = useRef(0);

  useEffect(() => {
    scrollSebelumnya.current = window.scrollY;

    const tanganiScroll = () => {
      const scrollSekarang = window.scrollY;
      const selisihScroll = scrollSekarang - scrollSebelumnya.current;

      // Abaikan gerakan kecil supaya navbar tidak berkedip saat scroll berhenti.
      if (Math.abs(selisihScroll) < 8) return;

      setNavbarTersembunyi(selisihScroll > 0 && scrollSekarang > 80);
      scrollSebelumnya.current = scrollSekarang;
    };

    window.addEventListener("scroll", tanganiScroll, { passive: true });
    return () => window.removeEventListener("scroll", tanganiScroll);
  }, []);

  /*
   * Sejak sesi BE terhubung, keadaan navbar dibaca dari sesi sungguhan — bukan
   * lagi ditebak dari pathname seperti saat slicing.
   *
   * Dua hal yang berbeda dan sengaja dipisah:
   * - `sudahLogin` (punya sesi) menentukan avatar vs tombol "Masuk".
   * - `akses` (role STUDENT) menentukan isi menu. Akun yang sudah masuk tapi
   *   belum berstatus siswa tidak melihat menu Mentoring, karena memang belum
   *   bisa memakainya.
   */
  const menu = menuUntuk(akses);
  const halamanAktif = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href + "/"));

  const transisiSpotlight = {
    duration: kurangiGerak ? 0 : 0.48,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  };

  // Tutup menu mobile tiap pindah halaman — kalau tidak, panelnya tetap terbuka
  // menutupi konten halaman baru.
  //
  // Ini pola "menyesuaikan state saat render" yang direkomendasikan React, bukan
  // useEffect. Versi useEffect bikin panel sempat ter-render sekali dalam kondisi
  // terbuka sebelum ditutup (dan kena lint react-hooks/set-state-in-effect).
  // Cara ini juga tetap jalan kalau pindah halaman lewat tombol back/forward.
  const [pathSebelumnya, setPathSebelumnya] = useState(pathname);
  if (pathname !== pathSebelumnya) {
    setPathSebelumnya(pathname);
    setMenuTerbuka(false);
  }

  return (
    // Shadow sengaja lebar & tipis (blur besar, opacity kecil) biar terbaca
    // sebagai bayangan lembut, bukan garis tegas di bawah navbar.
    <header
      className={`sticky top-0 z-50 bg-bkui-navbar shadow-[0_4px_15px_rgba(26,116,142,0.10)] transition-transform duration-300 ease-out motion-reduce:transition-none ${
        navbarTersembunyi && !menuTerbuka ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <nav aria-label="Navigasi utama" className="relative w-full px-5 py-3 lg:px-8">
        <div className="flex min-h-[73px] items-center justify-between gap-4">
          <LogoBKUI ukuran={65} className="flex h-[73px] items-center justify-center rounded-[10px]" />

          {/* Menu desktop */}
          <ul className="hidden flex-1 items-center justify-center gap-5 px-5 lg:flex">
            {menu.map((item) => {
              const aktif = halamanAktif(item.href);
              return (
                <motion.li key={item.href} layout="position" className="relative">
                  <Link
                    href={item.href}
                    aria-current={aktif ? "page" : undefined}
                    className="relative inline-flex h-16 items-center justify-center rounded-full px-9 font-ui text-xl font-medium leading-none text-bkui-teks transition-colors duration-200 hover:bg-bkui-button/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bkui-hijau"
                  >
                    {aktif && (
                      <motion.span
                        layoutId="navbar-active-spotlight"
                        transition={transisiSpotlight}
                        className="absolute inset-0 rounded-full border-2 border-bkui-teks bg-bkui-button/55 shadow-[0_5px_14px_rgba(26,39,49,0.16)]"
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </Link>
                </motion.li>
              );
            })}
          </ul>

          {/* Aksi kanan — desktop */}
          <div className="hidden items-center gap-5 lg:flex">
            <div className="relative">
              <ButtonPesanTiket className="relative z-10" />
              {halamanAktif("/ticket") && (
                <motion.span
                  layoutId="navbar-active-spotlight"
                  transition={transisiSpotlight}
                  className="pointer-events-none absolute inset-0 z-20 rounded-full border-2 border-bkui-teks shadow-[0_5px_14px_rgba(26,39,49,0.18)]"
                />
              )}
            </div>
            <div className="relative">
              <Link
                href="/school-roadshow"
                aria-current={halamanAktif("/school-roadshow") ? "page" : undefined}
                className="relative z-10 inline-flex h-16 items-center justify-center rounded-full bg-gradient-to-b from-bkui-button from-[23.44%] to-[#c1e0fa] px-9 font-ui text-xl font-medium leading-none text-bkui-teks transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bkui-hijau"
              >
                Kunjungan Sekolah
              </Link>
              {halamanAktif("/school-roadshow") && (
                <motion.span
                  layoutId="navbar-active-spotlight"
                  transition={transisiSpotlight}
                  className="pointer-events-none absolute inset-0 z-20 rounded-full border-2 border-bkui-teks shadow-[0_5px_14px_rgba(26,39,49,0.18)]"
                />
              )}
            </div>
          </div>

          {/* Tombol menu mobile */}
          <button
            type="button"
            onClick={() => setMenuTerbuka((terbuka) => !terbuka)}
            aria-expanded={menuTerbuka}
            aria-controls="menu-mobile"
            aria-label={menuTerbuka ? "Tutup menu" : "Buka menu"}
            className="ml-auto rounded-full bg-bkui-button px-5 py-2.5 font-ui text-base font-medium text-bkui-teks lg:hidden"
          >
            {menuTerbuka ? "Tutup" : "Menu"}
          </button>
        </div>

        {/*
          Panel menu mobile. Versi mobile TIDAK ada di desain Figma yang
          diberikan — layout di bawah ini turunan dari versi desktop, perlu
          dicek ke designer.
        */}
        <AnimatePresence initial={false}>
          {menuTerbuka && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                duration: kurangiGerak ? 0 : 0.36,
                ease: [0.22, 1, 0.22, 1],
              }}
              className="absolute inset-x-0 top-full z-10 overflow-hidden bg-bkui-navbar shadow-[0_8px_16px_rgba(0,0,0,0.10)] lg:hidden"
            >
              <div id="menu-mobile" className="border-t border-black/10 px-8 pb-6 pt-2">
                <ul className="flex flex-col py-2">
                  {menu.map((item) => {
                    const aktif = halamanAktif(item.href);
                    return (
                      <li key={item.href} className="relative">
                        <Link
                          href={item.href}
                          aria-current={aktif ? "page" : undefined}
                          className={`relative z-10 block rounded-lg px-3 py-2.5 text-base ${
                            aktif ? "font-semibold text-black" : "text-black/80"
                          }`}
                        >
                          {item.label}
                        </Link>
                        {aktif && (
                          <motion.span
                            layoutId="mobile-active-spotlight"
                            transition={transisiSpotlight}
                            className="absolute inset-0 rounded-lg bg-bkui-button/55"
                          />
                        )}
                      </li>
                    );
                  })}
                </ul>

                <div className="flex flex-col gap-3">
                  <ButtonPesanTiket className="justify-center" />
                  <Link
                    href="/school-roadshow"
                    className="rounded-full bg-bkui-button px-6 py-3 text-center font-ui text-base font-medium text-bkui-teks"
                  >
                    Kunjungan Sekolah
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
