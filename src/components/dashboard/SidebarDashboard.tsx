"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useSesi } from "@/lib/auth-state";

/**
 * Sidebar dashboard siswa.
 *
 * Nama yang tampil diambil dari sesi. Foto profil masih placeholder — BE belum
 * punya penyimpanan foto, jadi tidak ada yang bisa ditampilkan di sana.
 */
export function SidebarDashboard({ aktif }: { aktif: "profil" | "acara" }) {
  const { user, keluar } = useSesi();
  const router = useRouter();
  const [sedangKeluar, setSedangKeluar] = useState(false);

  const kelasMenu = (terpilih: boolean) =>
    `flex h-[52px] w-full items-center justify-center rounded-2xl border-2 font-ui text-xl font-medium text-bkui-teks transition-colors ${
      terpilih ? "border-bkui-teks" : "border-transparent hover:bg-white/40"
    }`;

  async function tanganiKeluar() {
    if (sedangKeluar) return;
    setSedangKeluar(true);
    // `keluar` sudah menelan galatnya sendiri dan selalu membersihkan sesi di
    // sisi klien, jadi di sini tidak ada cabang gagal yang perlu ditangani.
    await keluar();
    router.replace("/");
  }

  /** Sapaan pakai nama depan saja — sidebar-nya sempit, nama lengkap terpotong. */
  const namaTampil = user?.fullName.trim().split(/\s+/)[0] ?? "";

  return (
    <aside className="flex w-full shrink-0 flex-col items-center gap-10 rounded-3xl bg-bkui-navbar px-8 py-10 lg:w-[440px] lg:gap-12 lg:py-12">
      <p className="max-w-full truncate font-ui text-[28px] font-semibold leading-[1.2] text-bkui-teks">
        {namaTampil}
      </p>

      <Image
        src="/icon/dashboard/avatar-placeholder.svg"
        alt="Foto profil belum tersedia"
        width={300}
        height={271}
        priority
        className="h-auto w-[220px] lg:w-[300px]"
      />

      <nav aria-label="Menu dashboard siswa" className="flex w-full max-w-[280px] flex-col gap-4">
        <Link href="/profile" aria-current={aktif === "profil" ? "page" : undefined} className={kelasMenu(aktif === "profil")}>
          Profil Saya
        </Link>
        <Link href="/dashboard" aria-current={aktif === "acara" ? "page" : undefined} className={kelasMenu(aktif === "acara")}>
          Acara Saya
        </Link>
      </nav>

      <button
        type="button"
        onClick={tanganiKeluar}
        disabled={sedangKeluar}
        aria-busy={sedangKeluar}
        className="h-[52px] w-full max-w-[280px] cursor-pointer rounded-2xl bg-bkui-merah-muda font-ui text-xl font-medium text-bkui-merah transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bkui-merah disabled:cursor-wait disabled:opacity-70"
      >
        {sedangKeluar ? "Keluar…" : "Keluar"}
      </button>
    </aside>
  );
}
