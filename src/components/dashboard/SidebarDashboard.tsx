import Image from "next/image";
import Link from "next/link";

export function SidebarDashboard({ aktif }: { aktif: "profil" | "acara" }) {
  const kelasMenu = (terpilih: boolean) =>
    `flex h-[52px] w-full items-center justify-center rounded-2xl border-2 font-ui text-xl font-medium text-bkui-teks transition-colors ${
      terpilih ? "border-bkui-teks" : "border-transparent hover:bg-white/40"
    }`;

  return (
    <aside className="flex w-full shrink-0 flex-col items-center gap-10 rounded-3xl bg-bkui-navbar px-8 py-10 lg:w-[440px] lg:gap-12 lg:py-12">
      <p className="font-ui text-[28px] font-semibold leading-[1.2] text-bkui-teks">Kasa</p>

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
        disabled
        title="Fitur keluar tersedia setelah autentikasi terhubung"
        className="h-[52px] w-full max-w-[280px] cursor-not-allowed rounded-2xl bg-bkui-merah-muda font-ui text-xl font-medium text-bkui-merah"
      >
        Keluar
      </button>
    </aside>
  );
}
