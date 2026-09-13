import { HiasanRoadshow } from "@/components/roadshow/HiasanRoadshow";
import { SuccessRoadshow } from "@/components/roadshow/SuccessRoadshow";

/**
 * Halaman tujuan setelah backend mengonfirmasi pendaftaran School Roadshow.
 * Belum ditautkan dari form karena endpoint registrasi belum tersedia.
 */
export default function SchoolRoadshowSuccessPage() {
  return (
    <main className="flex-1">
      <section
        aria-label="Pendaftaran School Roadshow berhasil"
        className="relative isolate flex min-h-[760px] items-center overflow-hidden px-5 py-16 lg:h-[885px] lg:min-h-0 lg:px-8 lg:py-0"
      >
        <HiasanRoadshow variant="success" />

        <div className="relative z-10 mx-auto flex w-full justify-center">
          <SuccessRoadshow />
        </div>
      </section>
    </main>
  );
}
