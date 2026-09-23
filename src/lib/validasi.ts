/**
 * Aturan validasi yang dipakai bersama seluruh formulir.
 *
 * Dikumpulkan di satu berkas supaya pesan untuk kesalahan yang sama berbunyi
 * sama di mana pun — pengisi form yang salah format nomor di halaman Daftar
 * dan di halaman Profil tidak sepantasnya membaca dua kalimat berbeda.
 *
 * Semua fungsi mengembalikan `null` kalau isiannya sah, atau kalimat bahasa
 * Indonesia kalau tidak. Pemanggilnya yang memutuskan mau ditampilkan di mana.
 *
 * Aturan di sini sengaja LEBIH LONGGAR daripada aturan di BE, tidak lebih
 * ketat. Tugasnya memberi tahu kesalahan yang jelas tanpa perlu menunggu
 * perjalanan ke server; keputusan akhir tetap milik BE. Kalau FE lebih ketat,
 * ada isian sah yang ditolak tanpa pernah sampai ke server.
 */

export type Galat = Record<string, string>;

export function wajib(nilai: string, label: string): string | null {
  return nilai.trim() ? null : `${label} wajib diisi.`;
}

/**
 * Pemeriksaan email paling longgar yang tetap berguna: ada isi sebelum @,
 * sesudah @, dan sebuah titik di domainnya. Aturan email yang "ketat" terkenal
 * menolak alamat yang sebenarnya sah.
 */
export function email(nilai: string, label = "Email"): string | null {
  const v = nilai.trim();
  if (!v) return `${label} wajib diisi.`;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? null : `Format ${label.toLowerCase()} belum benar.`;
}

/**
 * Ubah nomor Indonesia ke bentuk +62.
 *
 * Orang menulis nomornya bermacam-macam: 0812…, 62812…, +62 812-3456-7890.
 * Semuanya nomor yang sama. Dulu form Daftar menolak mentah-mentah apa pun
 * yang bukan diawali +62 — padahal 08 justru bentuk yang paling lazim diketik
 * orang Indonesia. Sekarang dinormalkan, bukan ditolak.
 */
export function normalisasiTelepon(nilai: string): string {
  const angka = nilai.replace(/[\s()-]/g, "");
  if (angka.startsWith("+62")) return angka;
  if (angka.startsWith("62")) return `+${angka}`;
  if (angka.startsWith("0")) return `+62${angka.slice(1)}`;
  return angka;
}

export function telepon(nilai: string, label = "Nomor WhatsApp"): string | null {
  const v = nilai.trim();
  if (!v) return `${label} wajib diisi.`;
  if (/[^\d\s+()-]/.test(v)) return `${label} hanya boleh berisi angka.`;
  const normal = normalisasiTelepon(v);
  if (!/^\+62\d{8,13}$/.test(normal)) {
    return `${label} belum benar. Contoh: 081234567890.`;
  }
  return null;
}

export function sandi(nilai: string): string | null {
  if (!nilai) return "Kata sandi wajib diisi.";
  return nilai.length >= 8 ? null : "Kata sandi minimal 8 karakter.";
}

export function sandiSama(nilai: string, pembanding: string): string | null {
  if (!nilai) return "Konfirmasi kata sandi wajib diisi.";
  return nilai === pembanding ? null : "Konfirmasi kata sandi belum sama.";
}

export function nisn(nilai: string): string | null {
  const v = nilai.trim();
  if (!v) return "NISN wajib diisi.";
  return /^\d{10}$/.test(v) ? null : "NISN harus tepat 10 digit angka.";
}

export function usia(nilai: string): string | null {
  const v = nilai.trim();
  if (!v) return "Usia wajib diisi.";
  const n = Number(v);
  if (!Number.isInteger(n)) return "Usia harus berupa angka.";
  if (n < 10 || n > 25) return "Usia harus antara 10 sampai 25 tahun.";
  return null;
}

export function panjangMinimal(
  nilai: string,
  minimal: number,
  label: string,
): string | null {
  const v = nilai.trim();
  if (!v) return `${label} wajib diisi.`;
  return v.length >= minimal
    ? null
    : `${label} terlalu pendek, minimal ${minimal} karakter.`;
}

export function jumlahPositif(nilai: string, label: string): string | null {
  const v = nilai.trim();
  if (!v) return `${label} wajib diisi.`;
  const n = Number(v);
  if (!Number.isInteger(n) || n < 1) return `${label} harus berupa angka minimal 1.`;
  if (n > 100_000) return `${label} tidak masuk akal.`;
  return null;
}

/** Berkas unggahan wajib ada dan tidak melebihi batas BE (5 MB). */
export function berkasWajib(nilai: FormDataEntryValue | null, label: string): string | null {
  if (!(nilai instanceof File) || nilai.size === 0) return `${label} belum diunggah.`;
  if (nilai.size > 5 * 1024 * 1024) return `${label} melebihi 5 MB.`;
  return null;
}

/**
 * Buang entri yang `null` supaya sisanya benar-benar berisi galat saja.
 * Memudahkan pemanggil: `const g = kumpulkan({...}); if (adaGalat(g)) ...`
 */
export function kumpulkan(hasil: Record<string, string | null>): Galat {
  const galat: Galat = {};
  for (const [kunci, pesan] of Object.entries(hasil)) {
    if (pesan) galat[kunci] = pesan;
  }
  return galat;
}

export function adaGalat(galat: Galat): boolean {
  return Object.keys(galat).length > 0;
}

/**
 * Pindahkan fokus ke kolom bermasalah yang pertama, dan gulirkan ke sana.
 *
 * Ini bagian yang sering terlupa: menampilkan pesan saja tidak cukup kalau
 * kolomnya ada di luar layar. Pengisi form cuma melihat tombol yang "tidak
 * bereaksi" dan tidak tahu harus ke mana.
 */
export function fokuskanGalatPertama(form: HTMLFormElement, galat: Galat): void {
  const nama = Object.keys(galat)[0];
  if (!nama) return;
  const elemen = form.elements.namedItem(nama);
  const target =
    elemen instanceof RadioNodeList ? elemen[0] : (elemen as HTMLElement | null);
  if (target instanceof HTMLElement) {
    target.scrollIntoView({ behavior: "smooth", block: "center" });
    target.focus({ preventScroll: true });
  }
}
