import { HiasanArah } from "@/components/landing/HiasanArah";
import { PapanArah } from "@/components/landing/PapanArah";
import { SectionLangit, StripPembatas } from "@/components/landing/SectionLangit";
import { JudulSticker } from "@/components/ui/JudulSticker";
import { Muncul } from "@/components/ui/Muncul";
import { SUBJUDUL_ARAH_PETUALANGAN } from "@/lib/landing-content";

/**
 * Section "Arah Petualangan" (istilah PRD) — dua papan kayu yang mengarahkan
 * pengunjung ke jalur yang sesuai:
 *
 * - **Peserta** → beli tiket siswa (lewat halaman /ticket, lalu keluar ke Yesplis)
 * - **Sekolah** → pendaftaran School Roadshow, diisi PJ Sekolah tanpa login
 *
 * Ini titik percabangan role yang disebut AGENTS.md bagian 5.1 & 5.2. Karena
 * jalur Sekolah TIDAK butuh login (PRD menegaskan PJ Sekolah cukup akses
 * publik), papan kanan langsung mengarah ke halamannya.
 *
 * -------------------------------------------------------------------------
 * Status: LINK PESERTA MASIH PLACEHOLDER
 * -------------------------------------------------------------------------
 * Di PRD, jalur Peserta bermuara ke pendaftaran Mentoring yang butuh login
 * sebagai Student, sementara endpoint auth di BE belum ada. Tombolnya dibuat
 * mengarah ke /ticket — halaman publik yang sudah ada rutenya — karena itu yang
 * tertulis di label tombolnya ("Pesan Tiket Siswa"), BUKAN menebak rute login.
 *
 * Begitu Auth jalan, cek ke PM apakah tombol ini seharusnya mengarah ke
 * /daftar-mentoring untuk pengunjung yang sudah login.
 */
export function ArahPetualangan() {
  return (
    <SectionLangit
      className="min-h-[58.53vw] pb-20 pt-[max(56px,6.02vw)] sm:pb-28"
      dekorasi={
        <>
          <StripPembatas />
          <HiasanArah />
        </>
      }
    >
      <div className="relative mx-auto flex w-full max-w-[1240px] flex-col items-center px-5 sm:px-8">
        <Muncul className="flex flex-col items-center">
          <JudulSticker as="h2" ukuran="h1" className="text-center">
            Tentukan Arah Petualanganmu
          </JudulSticker>

          <p className="mt-1 text-center font-ui text-base font-semibold text-bkui-teks sm:text-xl">
            {SUBJUDUL_ARAH_PETUALANGAN}
          </p>
        </Muncul>

        <div className="mt-12 flex w-full flex-col items-center gap-14 sm:mt-16 md:flex-row md:items-start md:justify-center md:gap-8">
          <Muncul jeda={120} className="flex w-full max-w-[591px] justify-center">
          <PapanArah
            judul="Peserta"
            deskripsi="Eksplorasi masa depanmu. Tiket ini memberikan akses ke seluruh rangkaian acara puncak Bedah Kampus UI."
            labelTombol="Pesan Tiket Siswa"
            href="/ticket"
            cermin
          />
          </Muncul>
          <Muncul jeda={260} className="flex w-full max-w-[591px] justify-center">
          <PapanArah
            judul="Sekolah"
            deskripsi="Daftarkan instansi Pendidikanmu untuk prioritas kunjungan roadshow representatif kami."
            labelTombol="Daftarkan Sekolah"
            href="/school-roadshow"
          />
          </Muncul>
        </div>
      </div>
    </SectionLangit>
  );
}
