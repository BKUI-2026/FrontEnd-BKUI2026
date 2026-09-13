import { FormRoadshow } from "@/components/roadshow/FormRoadshow";
import { HiasanRoadshow } from "@/components/roadshow/HiasanRoadshow";
import { JudulSticker } from "@/components/ui/JudulSticker";

/**
 * School Roadshow Registration — `/school-roadshow`
 *
 * Diisi PJ Sekolah (istilah PRD: perwakilan sekolah). PJ Sekolah mengakses
 * TANPA akun dan TANPA role khusus — makanya halaman ini ada di route group
 * (public), bukan (student). PJ Sekolah bukan role RBAC baru.
 *
 * Slicing mengikuti Figma node 691:1836. Endpoint submit belum tersedia, jadi
 * form hanya menjalankan validasi client dan tidak mengirim data pribadi.
 */
export default function SchoolRoadshowRegistrationPage() {
  return (
    <main className="flex-1">
      <section
        aria-label="Pendaftaran School Roadshow"
        className="relative isolate flex min-h-[1280px] items-center overflow-hidden px-5 py-16 lg:h-[1103px] lg:min-h-0 lg:px-8 lg:py-0"
      >
        <HiasanRoadshow />

        <div className="relative z-10 mx-auto flex w-full max-w-[1020px] flex-col items-center gap-10">
          <div className="flex flex-col items-center gap-6 text-center">
            <JudulSticker
              as="h1"
              ukuran="h1"
              className="whitespace-normal lg:whitespace-nowrap"
            >
              Sekolah Kalian Ingin Dikunjungi?
            </JudulSticker>
            <p className="font-ui text-xl font-semibold leading-[1.2] text-bkui-terang sm:text-2xl lg:text-[28px]">
              Ayo daftarkan sekolah kalian terlebih dahulu di sini!
            </p>
          </div>

          <p className="rounded-3xl bg-[#cc0000] px-3 py-1 text-center font-body text-sm font-medium leading-[1.2] text-bkui-netral sm:text-base">
            Form ini hanya dapat diisi oleh perwakilan guru pada sekolah yang didaftarkan.
          </p>

          <FormRoadshow />
        </div>
      </section>
    </main>
  );
}
