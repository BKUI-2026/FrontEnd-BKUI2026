"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useId, useState, type FormEvent, type ReactNode } from "react";

import {
  ApiError,
  NetworkError,
  daftarMentoring,
  type BerkasMentoring,
  type DataDaftar,
} from "@/lib/api";
import { useSesi } from "@/lib/auth-state";
import { kompresGambar } from "@/lib/kompres-gambar";

import { KolomIsian } from "./KolomIsian";

const PROVINSI_INDONESIA = [
  "Aceh",
  "Sumatera Utara",
  "Sumatera Barat",
  "Riau",
  "Kepulauan Riau",
  "Jambi",
  "Sumatera Selatan",
  "Bangka Belitung",
  "Bengkulu",
  "Lampung",
  "DKI Jakarta",
  "Banten",
  "Jawa Barat",
  "Jawa Tengah",
  "DI Yogyakarta",
  "Jawa Timur",
  "Bali",
  "Nusa Tenggara Barat",
  "Nusa Tenggara Timur",
  "Kalimantan Barat",
  "Kalimantan Tengah",
  "Kalimantan Selatan",
  "Kalimantan Timur",
  "Kalimantan Utara",
  "Sulawesi Utara",
  "Gorontalo",
  "Sulawesi Tengah",
  "Sulawesi Barat",
  "Sulawesi Selatan",
  "Sulawesi Tenggara",
  "Maluku",
  "Maluku Utara",
  "Papua",
  "Papua Barat",
  "Papua Selatan",
  "Papua Tengah",
  "Papua Pegunungan",
  "Papua Barat Daya",
] as const;

const FASE = [
  "Akun",
  "Sekolah",
  "Kartu Pelajar",
  "Esai",
  "Media Sosial",
] as const;

const FIELD_PER_FASE = [
  ["nama", "sekolah", "telepon", "line", "email", "sandi", "konfirmasi-sandi"],
  ["jenis-kelamin", "usia", "nisn", "kelas", "provinsi"],
  ["kartu-pelajar"],
  ["minat", "kelebihan-kekurangan", "kontribusi", "komitmen"],
  ["bukti-instagram", "bukti-tiktok", "bukti-x", "bukti-story"],
] as const;

/**
 * Form daftar mentoring bertahap.
 *
 * Catatan integrasi: endpoint auth yang sudah tersedia baru menerima data akun
 * dasar. Field mentoring tambahan sengaja sudah disiapkan di UI dengan `name`
 * yang stabil, tapi belum dikirim ke endpoint lain sampai kontrak BE mentoring
 * final.
 */
/**
 * Pembungkus satu fase. Disembunyikan lewat atribut `hidden`, yang sekaligus
 * mengeluarkan isinya dari urutan tab dan dari pembaca layar — jadi pendaftar
 * tidak bisa ter-tab ke kolom langkah lain yang sedang tidak terlihat.
 */
function Fase({ aktif, children }: { aktif: boolean; children: ReactNode }) {
  return <div hidden={!aktif}>{children}</div>;
}

export function FormDaftar() {
  const router = useRouter();
  const { daftar, masuk, user } = useSesi();

  const [faseAktif, setFaseAktif] = useState(0);
  const [pesanGalat, setPesanGalat] = useState<string | null>(null);
  const [sedangKirim, setSedangKirim] = useState(false);
  /** Tahap yang sedang berjalan — pengiriman ini beberapa langkah, bukan satu. */
  const [pesanProses, setPesanProses] = useState("");

  const validasiFase = (form: HTMLFormElement, fase = faseAktif) => {
    const data = new FormData(form);

    for (const field of FIELD_PER_FASE[fase]) {
      const nilai = data.get(field);
      const kosong = nilai instanceof File ? nilai.size === 0 : !String(nilai ?? "").trim();
      if (kosong) {
        setPesanGalat("Lengkapi semua kolom di langkah ini sebelum lanjut.");
        return false;
      }
    }

    if (fase === 0) {
      const nama = String(data.get("nama") ?? "");
      const email = String(data.get("email") ?? "").trim();
      const telepon = String(data.get("telepon") ?? "").trim();
      const sandi = String(data.get("sandi") ?? "");
      const konfirmasi = String(data.get("konfirmasi-sandi") ?? "");

      if (nama !== nama.toUpperCase()) {
        setPesanGalat("Nama lengkap wajib memakai huruf kapital.");
        return false;
      }
      if (!/^\+62\d{7,14}$/.test(telepon)) {
        setPesanGalat("Nomor WhatsApp pakai format +62, contoh: +628964321000.");
        return false;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setPesanGalat("Format email belum benar.");
        return false;
      }
      if (sandi.length < 8) {
        setPesanGalat("Kata sandi minimal 8 karakter.");
        return false;
      }
      if (sandi !== konfirmasi) {
        setPesanGalat("Konfirmasi kata sandi belum sama dengan kata sandinya.");
        return false;
      }
    }

    if (fase === 1) {
      const usia = Number(data.get("usia"));
      const nisn = String(data.get("nisn") ?? "").trim();
      if (!Number.isInteger(usia) || usia < 10 || usia > 25) {
        setPesanGalat("Usia harus berupa angka yang valid.");
        return false;
      }
      if (!/^\d{10}$/.test(nisn)) {
        setPesanGalat("NISN harus berisi 10 digit angka.");
        return false;
      }
    }

    setPesanGalat(null);
    return true;
  };

  const lanjut = (e: FormEvent<HTMLButtonElement>) => {
    const form = e.currentTarget.form;
    if (!form || !validasiFase(form)) return;
    setFaseAktif((fase) => Math.min(fase + 1, FASE.length - 1));
  };

  const kembali = () => {
    setPesanGalat(null);
    setFaseAktif((fase) => Math.max(fase - 1, 0));
  };

  /**
   * Pastikan ada sesi yang siap dipakai mengirim form mentoring.
   *
   * Pendaftaran mentoring butuh akun, tapi akunnya belum tentu perlu DIBUAT.
   * Pendaftar yang percobaan sebelumnya gagal di tengah jalan sudah punya akun
   * dari percobaan itu, dan sebagian memang sudah punya akun sejak awal.
   *
   * Sebelumnya form selalu memanggil daftar, jadi orang-orang itu selalu
   * ditolak "Email sudah terdaftar." tanpa jalan untuk melanjutkan — akunnya
   * ada, tapi pendaftaran mentoringnya tidak pernah bisa masuk. Sekarang kalau
   * emailnya sudah dipakai, kita coba masuk memakai kata sandi yang barusan
   * diketik lalu meneruskan pendaftarannya.
   */
  const siapkanAkun = async (data: DataDaftar) => {
    // Sudah login dengan email yang sama? Tidak perlu apa-apa lagi.
    if (user?.email?.toLowerCase() === data.email.toLowerCase()) return;

    try {
      await daftar(data);
      return;
    } catch (galat) {
      if (!(galat instanceof ApiError) || galat.status !== 409) throw galat;
    }

    // 409 = email sudah dipakai. Coba masuk dengan kata sandi yang diketik.
    setPesanProses("Masuk ke akun yang sudah ada…");
    try {
      await masuk(data.email, data.password);
    } catch (galat) {
      if (galat instanceof ApiError && galat.status === 401) {
        // Emailnya benar-benar milik orang ini tapi sandinya beda, ATAU
        // emailnya milik orang lain. Keduanya tidak bisa kita bedakan dari
        // sini, jadi pesannya dibuat yang menolong keduanya.
        const pesan =
          "Email ini sudah punya akun, tapi kata sandinya tidak cocok. " +
          "Pakai kata sandi akun tersebut, atau masuk dulu lewat halaman Masuk.";
        throw new ApiError(pesan, 409, [pesan]);
      }
      throw galat;
    }
  };

  const kirim = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sedangKirim) return;

    // Seluruh fase diperiksa ulang, bukan cuma fase yang sedang terbuka.
    // Pendaftar bisa saja mengubah isian langkah awal lalu melompat lewat
    // tombol Kembali, dan kolom yang tersembunyi tetap ikut terkirim.
    // Kalau ada yang tidak lolos, layarnya dipindahkan ke langkah itu supaya
    // pesan galatnya muncul di sebelah kolom yang dimaksud.
    for (let fase = 0; fase < FASE.length; fase += 1) {
      if (!validasiFase(e.currentTarget, fase)) {
        setFaseAktif(fase);
        return;
      }
    }

    const data = new FormData(e.currentTarget);
    const nama = String(data.get("nama") ?? "").trim();
    const sekolah = String(data.get("sekolah") ?? "").trim();
    const telepon = String(data.get("telepon") ?? "").replace(/\s/g, "");
    const email = String(data.get("email") ?? "").trim();
    const sandi = String(data.get("sandi") ?? "");

    const teks = (k: string) => String(data.get(k) ?? "").trim();

    // Kelima berkas wajib. Diperiksa DI SINI, sebelum akun dibuat — kalau
    // dicek setelahnya, pendaftar yang lupa satu bukti sudah terlanjur punya
    // akun dan harus mengulang lewat jalur lain.
    const NAMA_BERKAS = [
      ["kartuPelajar", "kartu-pelajar", "Kartu pelajar"],
      ["buktiInstagram", "bukti-instagram", "Bukti follow Instagram"],
      ["buktiTiktok", "bukti-tiktok", "Bukti follow TikTok"],
      ["buktiX", "bukti-x", "Bukti follow X"],
      ["buktiStory", "bukti-story", "Bukti unggah Story"],
    ] as const;

    const mentah: Record<string, File> = {};
    for (const [kunci, kolom, label] of NAMA_BERKAS) {
      const berkas = data.get(kolom);
      if (!(berkas instanceof File) || berkas.size === 0) {
        setPesanGalat(`${label} belum diunggah.`);
        setFaseAktif(kolom === "kartu-pelajar" ? 2 : 4);
        return;
      }
      mentah[kunci] = berkas;
    }

    setPesanGalat(null);
    setSedangKirim(true);

    // Sebagian galat cuma bisa diketahui server — yang paling sering, email
    // sudah dipakai orang lain. Langkahnya dicatat supaya pendaftar tidak
    // ditinggal di layar Media Sosial sambil membaca keluhan soal email yang
    // kolomnya ada di langkah pertama.
    let langkah: "akun" | "mentoring" = "akun";

    try {
      // Dikecilkan di browser sebelum dikirim. Foto kartu dari HP bisa
      // beberapa MB; tanpa ini unggahan lewat jaringan seluler sering putus,
      // dan 5 berkas x ribuan pendaftar cepat menghabiskan disk server.
      setPesanProses("Menyiapkan berkas…");
      const berkas = Object.fromEntries(
        await Promise.all(
          Object.entries(mentah).map(async ([kunci, file]) => [
            kunci,
            await kompresGambar(file),
          ]),
        ),
      ) as unknown as BerkasMentoring;

      setPesanProses("Membuat akun…");
      await siapkanAkun({
        fullName: nama,
        email,
        password: sandi,
        // Form ini menanyakan NISN dan kelas X/XI/XII, jadi yang mengisinya
        // memang siswa — role STUDENT diberikan langsung supaya bisa lanjut
        // mengirim pendaftaran mentoringnya.
        isHighSchoolStudent: true,
        ...(sekolah ? { institution: sekolah } : {}),
        ...(telepon ? { phoneNumber: telepon } : {}),
      });

      langkah = "mentoring";
      setPesanProses("Mengirim pendaftaran…");
      await daftarMentoring(
        {
          jenisKelamin:
            teks("jenis-kelamin") === "Perempuan" ? "PEREMPUAN" : "LAKI_LAKI",
          usia: Number(teks("usia")),
          nisn: teks("nisn"),
          kelas: teks("kelas") as "X" | "XI" | "XII",
          provinsi: teks("provinsi"),
          ...(teks("line") ? { idLine: teks("line") } : {}),
          minat: teks("minat"),
          kelebihanKekurangan: teks("kelebihan-kekurangan"),
          kontribusi: teks("kontribusi"),
          komitmen: teks("komitmen"),
        },
        berkas,
      );

      router.replace("/dashboard");
    } catch (galat) {
      setPesanProses("");
      // Sudah pernah mengirim pendaftaran mentoring sebelumnya. Itu bukan
      // kegagalan — yang diinginkan pendaftar memang sudah tercapai, jadi
      // antar saja ke dashboard alih-alih menakutinya dengan pesan merah.
      if (
        galat instanceof ApiError &&
        galat.status === 409 &&
        langkah === "mentoring"
      ) {
        router.replace("/dashboard");
        return;
      }

      if (galat instanceof ApiError) {
        // Galat pembuatan akun selalu berasal dari kolom di langkah pertama.
        if (langkah === "akun" && !galat.terlaluSering) setFaseAktif(0);
        setPesanGalat(
          galat.terlaluSering
            ? "Terlalu banyak percobaan pendaftaran. Coba lagi sebentar lagi."
            : galat.messages.join(" "),
        );
      } else if (galat instanceof NetworkError) {
        setPesanGalat(galat.message);
      } else {
        setPesanGalat("Terjadi kesalahan tak terduga. Coba lagi.");
      }
      setSedangKirim(false);
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-[1040px] flex-col items-center rounded-3xl bg-bkui-navbar px-5 py-8 shadow-[0_4px_4px_rgba(0,0,0,0.25)] sm:px-10 sm:py-12 lg:px-16">
      <h1 className="text-center font-display text-4xl leading-[1.4] text-bkui-teks-tua sm:text-5xl lg:text-[72px]">
        Daftar
      </h1>

      <RoadmapFase faseAktif={faseAktif} />

      <form onSubmit={kirim} noValidate className="mt-8 flex w-full max-w-[860px] flex-col items-center gap-7">
        {/*
          Seluruh fase tetap TERPASANG di DOM; yang tidak aktif disembunyikan.

          Ini bukan soal gaya. Sebelumnya tiap fase dirender bersyarat
          (`faseAktif === 0 && <FaseAkun />`), jadi begitu pendaftar maju ke
          langkah berikutnya, input langkah sebelumnya dilepas dari DOM dan
          nilainya ikut hilang. Saat submit di langkah 5, `new FormData(form)`
          mengembalikan nama, email, dan kata sandi KOSONG — pendaftaran selalu
          ditolak server, dan pesan galatnya (soal langkah 1) muncul di layar
          langkah 5.

          Elemen ber-`display:none` tetap ikut terkirim bersama form, dan berkas
          yang sudah dipilih tetap menempel di input-nya. Jadi menyembunyikan,
          bukan melepas, adalah yang benar di sini.
        */}
        <div className="w-full">
          <Fase aktif={faseAktif === 0}>
            <FaseAkun />
          </Fase>
          <Fase aktif={faseAktif === 1}>
            <FaseSekolah />
          </Fase>
          <Fase aktif={faseAktif === 2}>
            <FaseKartuPelajar />
          </Fase>
          <Fase aktif={faseAktif === 3}>
            <FaseEsai />
          </Fase>
          <Fase aktif={faseAktif === 4}>
            <FaseSosial />
          </Fase>
        </div>

        <p
          role="alert"
          className="min-h-6 max-w-[640px] text-center font-body text-sm font-medium leading-[1.4] text-bkui-galat sm:text-base"
        >
          {pesanGalat}
        </p>

        <div className="flex w-full flex-col-reverse items-center justify-center gap-3 sm:flex-row">
          {faseAktif > 0 && (
            <button
              type="button"
              onClick={kembali}
              className="h-14 w-full cursor-pointer rounded-full border-2 border-bkui-teks px-8 font-ui text-lg font-medium text-bkui-teks transition-opacity hover:opacity-80 sm:w-auto"
            >
              Kembali
            </button>
          )}

          {faseAktif < FASE.length - 1 ? (
            <button
              type="button"
              onClick={lanjut}
              className="tombol-kertas h-14 w-full cursor-pointer rounded-full bg-bkui-button px-8 font-ui text-lg font-medium capitalize text-bkui-teks focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bkui-hijau sm:w-auto lg:text-xl"
            >
              Lanjut
            </button>
          ) : (
            <button
              type="submit"
              disabled={sedangKirim}
              aria-busy={sedangKirim}
              className="tombol-kertas h-14 w-full cursor-pointer rounded-full bg-bkui-button px-8 font-ui text-lg font-medium capitalize text-bkui-teks focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bkui-hijau disabled:cursor-wait disabled:opacity-70 sm:w-auto lg:text-xl"
            >
              {sedangKirim ? pesanProses || "Memproses..." : "Kirim Pendaftaran"}
            </button>
          )}
        </div>
      </form>

      <p className="mt-8 flex flex-wrap items-center justify-center gap-2 text-center text-sm">
        <span className="font-body font-medium leading-[1.2] text-bkui-teks-tua">
          Sudah punya akun?
        </span>
        <Link
          href="/masuk"
          className="inline-flex min-h-11 items-center px-1 font-ui font-medium capitalize leading-none text-bkui-coklat-tua-teks hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bkui-hijau"
        >
          Masuk
        </Link>
      </p>
    </div>
  );
}

function RoadmapFase({ faseAktif }: { faseAktif: number }) {
  return (
    <ol className="mt-5 flex w-full max-w-[760px] items-start" aria-label="Progres pendaftaran">
      {FASE.map((fase, i) => {
        const aktif = i === faseAktif;
        const selesai = i < faseAktif;

        return (
          <li
            key={fase}
            aria-current={aktif ? "step" : undefined}
            className="relative flex min-w-0 flex-1 flex-col items-center text-center"
          >
            {i > 0 && (
              <span
                aria-hidden
                className={`absolute right-1/2 top-[18px] h-1 w-full -translate-y-1/2 transition-colors sm:top-[22px] ${
                  selesai ? "bg-bkui-button" : "bg-bkui-teks/15"
                }`}
              />
            )}
            <div
              className={`relative z-10 flex size-9 items-center justify-center rounded-full border-2 font-ui text-sm font-semibold transition-all sm:size-11 sm:text-base ${
                aktif
                  ? "border-bkui-teks bg-bkui-button text-bkui-teks shadow-[0_0_0_5px_rgba(132,194,246,0.25)]"
                  : selesai
                    ? "border-bkui-button bg-bkui-button text-bkui-teks"
                    : "border-bkui-teks/25 bg-bkui-navbar text-bkui-teks/55"
              }`}
            >
              {i + 1}
            </div>
            <span
              className={`mt-2 max-w-[90px] font-ui text-[11px] font-medium leading-tight sm:text-sm ${
                aktif || selesai ? "text-bkui-teks" : "text-bkui-teks/55"
              }`}
            >
              {fase}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

function FaseAkun() {
  return (
    <PanelFase>
      <div className="grid w-full gap-x-6 gap-y-6 md:grid-cols-2">
        <KolomIsian label="Nama Lengkap" name="nama" placeholder="Contoh: MUHAMMAD ALIF" autoComplete="name" />
        <KolomIsian label="Asal Sekolah" name="sekolah" placeholder="Contoh: SMA NEGERI 8 JAKARTA" autoComplete="organization" />
        <KolomIsian label="Nomor Whatsapp Pribadi" name="telepon" type="tel" placeholder="Contoh: +628964321000" autoComplete="tel" />
        <KolomIsian label="ID Line Pribadi" name="line" placeholder="Contoh: alifbkui26" autoComplete="off" />
        <KolomIsian label="Email Pribadi" name="email" type="email" placeholder="Contoh: nama@email.com" autoComplete="email" />
        <KolomIsian label="Buat kata sandi baru" name="sandi" type="password" placeholder="Minimal 8 karakter" autoComplete="new-password" />
        <div className="md:col-span-2 md:max-w-[calc(50%-12px)]">
          <KolomIsian
            label="Konfirmasi kata sandi baru"
            name="konfirmasi-sandi"
            type="password"
            placeholder="Masukkan ulang kata sandi"
            autoComplete="new-password"
          />
        </div>
      </div>
    </PanelFase>
  );
}

function FaseSekolah() {
  return (
    <PanelFase>
      <div className="grid w-full gap-x-6 gap-y-6 md:grid-cols-2">
        <RadioGroup label="Jenis Kelamin" name="jenis-kelamin" options={["Laki-Laki", "Perempuan"]} />
        <KolomAngka label="Usia" name="usia" placeholder="Contoh: 17" />
        <KolomIsian label="Nomor Induk Siswa Nasional (NISN)" name="nisn" placeholder="Contoh: 1234567890" autoComplete="off" />
        <RadioGroup label="Berada di kelas berapa kamu sekarang" name="kelas" options={["X", "XI", "XII"]} />
        <KolomSelect label="Provinsi asal sekolah" name="provinsi" options={PROVINSI_INDONESIA} placeholder="Pilih provinsi" />
      </div>
    </PanelFase>
  );
}

function FaseKartuPelajar() {
  return (
    <PanelFase>
      <KolomFile label="Lampirkan bukti kartu pelajar" name="kartu-pelajar" />
    </PanelFase>
  );
}

function FaseEsai() {
  return (
    <PanelFase>
      <div className="grid w-full gap-6">
        <KolomTeksArea label="Apa yang membuatmu berminat mengikuti program ini?" name="minat" placeholder="Ceritakan alasan dan harapanmu mengikuti Mentoring BKUI 2026." />
        <KolomTeksArea label="Apa kelebihan dan kekurangan yang kamu miliki?" name="kelebihan-kekurangan" placeholder="Tulis kelebihan yang bisa kamu bawa dan kekurangan yang sedang kamu perbaiki." />
        <KolomTeksArea label="Kontribusi seperti apa yang akan kamu berikan pada program ini?" name="kontribusi" placeholder="Contoh: aktif berdiskusi, membantu teman kelompok, dan menjaga komitmen sampai akhir." />
        <RadioGroup
          label="Program ini akan dilaksanakan selama kurang lebih 3 bulan secara daring. Saya bersedia berkomitmen mengikuti rangkaian Mentoring Bedah Kampus UI 2026 hingga selesai."
          name="komitmen"
          options={["Ya, bersedia", "Tidak, bersedia"]}
        />
      </div>
    </PanelFase>
  );
}

function FaseSosial() {
  return (
    <PanelFase>
      <div className="grid w-full gap-x-6 gap-y-6 md:grid-cols-2">
        <KolomFile label="Bukti Follow Instagram bkui.official" name="bukti-instagram" />
        <KolomFile label="Bukti Follow Tiktok bkui.official" name="bukti-tiktok" />
        <KolomFile label="Bukti Follow X @BKUI_Official" name="bukti-x" />
        <KolomFile label="Bukti unggah Feeds Open Recruitment Mentoring BKUI 2026 ke Instagram Story" name="bukti-story" />
      </div>
    </PanelFase>
  );
}

function PanelFase({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <section className="auth-card-enter flex w-full flex-col gap-6">
      {children}
    </section>
  );
}

function FieldShell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex w-full flex-col gap-2">
      <span className="font-body text-sm font-medium leading-[1.35] text-bkui-teks">
        {label}
      </span>
      {children}
    </div>
  );
}

function RadioGroup({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: readonly string[];
}) {
  return (
    <FieldShell label={label}>
      <div className="flex min-h-10 flex-wrap items-center gap-2 rounded-lg border border-bkui-teks px-3 py-2">
        {options.map((option) => (
          <label key={option} className="inline-flex min-h-8 cursor-pointer items-center gap-2 rounded-full px-2 font-body text-sm font-medium text-bkui-teks">
            <input name={name} type="radio" value={option} className="size-4 accent-bkui-hijau" />
            {option}
          </label>
        ))}
      </div>
    </FieldShell>
  );
}

function KolomAngka({ label, name, placeholder }: { label: string; name: string; placeholder: string }) {
  const id = useId();

  return (
    <div className="flex w-full flex-col gap-2">
      <label htmlFor={id} className="font-body text-sm font-medium leading-[1.35] text-bkui-teks">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type="number"
        inputMode="numeric"
        placeholder={placeholder}
        className="h-10 rounded-lg border border-bkui-teks bg-transparent px-4 font-body text-sm font-medium leading-[1.2] text-bkui-teks placeholder:text-bkui-teks/65 focus:outline-2 focus:outline-offset-2 focus:outline-bkui-hijau"
      />
    </div>
  );
}

function KolomSelect({
  label,
  name,
  options,
  placeholder,
}: {
  label: string;
  name: string;
  options: readonly string[];
  placeholder: string;
}) {
  const id = useId();

  return (
    <div className="flex w-full flex-col gap-2 md:col-span-2">
      <label htmlFor={id} className="font-body text-sm font-medium leading-[1.35] text-bkui-teks">
        {label}
      </label>
      <select
        id={id}
        name={name}
        defaultValue=""
        className="h-10 rounded-lg border border-bkui-teks bg-transparent px-4 font-body text-sm font-medium leading-[1.2] text-bkui-teks focus:outline-2 focus:outline-offset-2 focus:outline-bkui-hijau"
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}

function KolomFile({ label, name }: { label: string; name: string }) {
  const id = useId();

  return (
    <div className="flex w-full flex-col gap-2">
      <label htmlFor={id} className="font-body text-sm font-medium leading-[1.35] text-bkui-teks">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type="file"
        accept="image/*,.pdf"
        className="min-h-10 rounded-lg border border-bkui-teks bg-transparent px-4 py-2 font-body text-sm font-medium leading-[1.2] text-bkui-teks file:mr-4 file:cursor-pointer file:rounded-full file:border-0 file:bg-bkui-button file:px-4 file:py-1.5 file:font-ui file:text-sm file:font-medium file:text-bkui-teks focus:outline-2 focus:outline-offset-2 focus:outline-bkui-hijau"
      />
    </div>
  );
}

function KolomTeksArea({
  label,
  name,
  placeholder,
}: {
  label: string;
  name: string;
  placeholder: string;
}) {
  const id = useId();

  return (
    <div className="flex w-full flex-col gap-2">
      <label htmlFor={id} className="font-body text-sm font-medium leading-[1.35] text-bkui-teks">
        {label}
      </label>
      <textarea
        id={id}
        name={name}
        placeholder={placeholder}
        rows={4}
        className="min-h-28 resize-y rounded-lg border border-bkui-teks bg-transparent px-4 py-3 font-body text-sm font-medium leading-[1.4] text-bkui-teks placeholder:text-bkui-teks/65 focus:outline-2 focus:outline-offset-2 focus:outline-bkui-hijau"
      />
    </div>
  );
}
