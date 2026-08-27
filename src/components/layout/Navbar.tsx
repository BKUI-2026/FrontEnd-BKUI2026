"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { AvatarProfil } from "@/components/ui/AvatarProfil";
import { ButtonMasukSiswa } from "@/components/ui/ButtonMasukSiswa";
import { ButtonPesanTiket } from "@/components/ui/ButtonPesanTiket";
import { LogoBKUI } from "@/components/ui/LogoBKUI";
import { useAkses } from "@/lib/auth-state";
import { menuUntuk } from "@/lib/navigation";

/**
 * Navbar utama — mengikuti desain Figma (FE-0004).
 *
 * Dua kondisi, sesuai RBAC linear:
 * - General Public → menu tanpa "Mentoring", plus tombol "Masuk sebagai Siswa"
 * - Student        → menu dengan "Mentoring", plus ikon avatar ke Profile
 *
 * Keduanya sama-sama menampilkan CTA "Pesan Tiket".
 *
 * Daftar menunya diambil dari lib/navigation.ts, tidak di-hardcode di sini.
 */
export function Navbar() {
  const pathname = usePathname();
  const akses = useAkses();
  const [menuTerbuka, setMenuTerbuka] = useState(false);

  const menu = menuUntuk(akses);
  const sudahLogin = akses === "Student";

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
    <header className="sticky top-0 z-50 bg-bkui-navbar shadow-[0_4px_16px_rgba(0,0,0,0.10)]">
      <nav aria-label="Navigasi utama" className="w-full px-8">
        <div className="flex h-20 items-center gap-4">
          <LogoBKUI ukuran={56} />

          {/* Menu desktop */}
          <ul className="hidden flex-1 items-center justify-center gap-10 lg:flex">
            {menu.map((item) => {
              const aktif = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={aktif ? "page" : undefined}
                    className={
                      aktif
                        ? "text-base font-semibold text-black"
                        : "text-base text-black/80 transition-colors hover:text-black"
                    }
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Aksi kanan — desktop */}
          <div className="ml-auto hidden items-center gap-3 lg:flex">
            <ButtonPesanTiket />
            {sudahLogin ? <AvatarProfil /> : <ButtonMasukSiswa />}
          </div>

          {/* Tombol menu mobile */}
          <button
            type="button"
            onClick={() => setMenuTerbuka((terbuka) => !terbuka)}
            aria-expanded={menuTerbuka}
            aria-controls="menu-mobile"
            aria-label={menuTerbuka ? "Tutup menu" : "Buka menu"}
            className="ml-auto rounded-full bg-bkui-button px-5 py-2.5 text-base font-medium text-black lg:hidden"
          >
            {menuTerbuka ? "Tutup" : "Menu"}
          </button>
        </div>

        {/*
          Panel menu mobile. Versi mobile TIDAK ada di desain Figma yang
          diberikan — layout di bawah ini turunan dari versi desktop, perlu
          dicek ke designer.
        */}
        {menuTerbuka && (
          <div id="menu-mobile" className="border-t border-black/10 pb-4 lg:hidden">
            <ul className="flex flex-col py-2">
              {menu.map((item) => {
                const aktif = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={aktif ? "page" : undefined}
                      className={
                        aktif
                          ? "block py-2.5 text-base font-semibold text-black"
                          : "block py-2.5 text-base text-black/80"
                      }
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="flex flex-col gap-3">
              <ButtonPesanTiket className="justify-center" />
              {sudahLogin ? (
                <Link
                  href="/profile"
                  className="rounded-full bg-bkui-button px-6 py-3 text-center text-base font-medium text-black"
                >
                  Profile
                </Link>
              ) : (
                <ButtonMasukSiswa className="w-full" />
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
