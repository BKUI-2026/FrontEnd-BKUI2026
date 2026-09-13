import Image from "next/image";

import { LatarDashboard } from "./LatarDashboard";
import { SidebarDashboard } from "./SidebarDashboard";

const ACARA_DUMMY = ["mentoring-1", "mentoring-2"] as const;

export function AcaraSaya() {
  return (
    <LatarDashboard>
      <div className="flex w-full flex-col gap-8 lg:flex-row lg:items-stretch">
        <SidebarDashboard aktif="acara" />

        <main className="flex min-h-[748px] min-w-0 flex-1 flex-col items-center rounded-3xl px-0 py-8 lg:px-12 lg:py-12">
          <h1 className="font-display text-4xl leading-[1.4] text-bkui-teks sm:text-5xl">Acara Saya</h1>

          <div className="mt-6 flex w-full flex-col gap-6">
            {ACARA_DUMMY.map((id) => (
              <article key={id} className="flex flex-col gap-4 rounded-3xl bg-bkui-navbar px-6 py-6 sm:px-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="font-ui text-[28px] font-semibold leading-[1.2] text-bkui-teks">Mentoring</h2>
                    <p className="mt-1 flex items-center gap-1.5 font-body text-base font-medium text-bkui-teks sm:text-xl">
                      <Image src="/icon/dashboard/calendar.svg" alt="" aria-hidden width={24} height={24} className="size-6" />
                      27 September 2026
                    </p>
                  </div>

                  <button type="button" disabled title="Tautan Zoom akan tersedia setelah diumumkan panitia" className="flex h-12 cursor-not-allowed items-center justify-center gap-2 rounded-full bg-gradient-to-b from-bkui-oren to-bkui-oren-muda px-8 font-ui text-base font-medium text-bkui-coklat opacity-70">
                    <Image src="/icon/dashboard/external-link.svg" alt="" aria-hidden width={24} height={24} className="size-6" />
                    Akses Zoom
                  </button>
                </div>

                <p className="text-justify font-body text-base font-medium leading-[1.2] text-bkui-teks">
                  Detail sesi mentoring dan tautan pertemuan akan ditampilkan di sini setelah diumumkan oleh panitia BKUI 2026.
                </p>
              </article>
            ))}
          </div>
        </main>
      </div>
    </LatarDashboard>
  );
}
