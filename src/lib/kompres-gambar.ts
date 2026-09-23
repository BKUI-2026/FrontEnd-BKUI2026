/**
 * Mengecilkan gambar di browser sebelum diunggah.
 *
 * Kenapa perlu: foto kartu pelajar dari kamera HP biasanya 2–5 MB. Dikalikan
 * 5 berkas × ~10.000 pendaftar, itu lebih dari 100 GB — melebihi sisa disk
 * server. Dikecilkan lebih dulu, totalnya turun ke kisaran 25 GB dan muat.
 *
 * Bonusnya di sisi pendaftar: yang diunggah lewat jaringan seluler jadi ratusan
 * KB, bukan beberapa MB, sehingga unggahan tidak putus di tengah jalan.
 *
 * Setelannya sengaja TIDAK agresif — 2000 piksel pada kualitas 85. Tujuannya
 * cuma memangkas ukuran berlebih; teks NISN dan detail kartu tetap terbaca
 * jelas bahkan saat diperbesar panitia.
 */

/** Sisi terpanjang setelah dikecilkan. Foto lebih kecil dibiarkan apa adanya. */
const SISI_MAKS = 2000;

/** Kualitas JPEG. 85 masih sulit dibedakan dari aslinya secara kasat mata. */
const KUALITAS = 0.85;

/**
 * Di bawah ukuran ini tidak usah diproses — hasilnya belum tentu lebih kecil,
 * dan memprosesnya cuma menambah waktu tunggu.
 */
const BATAS_LEWATI = 400 * 1024;

/**
 * Kembalikan versi terkompresi dari `berkas`.
 *
 * Berkas dikembalikan APA ADANYA (tanpa diubah) bila:
 * - bukan gambar, mis. PDF
 * - sudah kecil
 * - browser gagal membacanya, mis. HEIC dari iPhone yang tidak didukung
 *
 * Kegagalan sengaja tidak dilempar: lebih baik mengunggah berkas asli yang
 * besar daripada menggagalkan pendaftaran orang karena urusan kompresi.
 */
export async function kompresGambar(berkas: File): Promise<File> {
  if (!berkas.type.startsWith("image/")) return berkas;
  if (berkas.size <= BATAS_LEWATI) return berkas;

  try {
    // `imageOrientation: "from-image"` penting: tanpa itu foto potret dari HP
    // kehilangan info rotasi EXIF-nya dan tersimpan miring 90 derajat.
    const bitmap = await createImageBitmap(berkas, {
      imageOrientation: "from-image",
    });

    const skala = Math.min(1, SISI_MAKS / Math.max(bitmap.width, bitmap.height));
    const lebar = Math.round(bitmap.width * skala);
    const tinggi = Math.round(bitmap.height * skala);

    const kanvas = document.createElement("canvas");
    kanvas.width = lebar;
    kanvas.height = tinggi;

    const konteks = kanvas.getContext("2d");
    if (!konteks) return berkas;
    konteks.drawImage(bitmap, 0, 0, lebar, tinggi);
    bitmap.close();

    const blob = await new Promise<Blob | null>((selesai) =>
      kanvas.toBlob(selesai, "image/jpeg", KUALITAS),
    );
    if (!blob) return berkas;

    // Kalau hasilnya justru lebih besar (bisa terjadi pada PNG kecil berwarna
    // datar), pakai yang asli saja.
    if (blob.size >= berkas.size) return berkas;

    return new File([blob], gantiEkstensiJpg(berkas.name), {
      type: "image/jpeg",
      lastModified: Date.now(),
    });
  } catch {
    return berkas;
  }
}

/** Kompres beberapa berkas sekaligus. Urutannya dipertahankan. */
export function kompresSemua(berkas: File[]): Promise<File[]> {
  return Promise.all(berkas.map(kompresGambar));
}

function gantiEkstensiJpg(nama: string): string {
  return nama.replace(/\.[^.]+$/, "") + ".jpg";
}
