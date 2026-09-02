/**
 * Bentuk data bersama untuk kartu katalog.
 *
 * Di Figma, kartu produk Merchandise (`338:1061`) dan kartu tier Tiket
 * (`367:4924`) BUKAN dua desain mirip — keduanya susunan yang sama persis,
 * sampai ke lebar tombolnya (146px + 159px). Jadi komponennya juga satu, dan
 * tipe ini yang menyambungkan keduanya.
 *
 * Yang membedakan cuma isinya: merchandise punya `kategori` untuk penyaring,
 * tier tiket tidak. Field khusus seperti itu ditambahkan di tipe masing-masing
 * halaman, bukan di sini.
 *
 * ---------------------------------------------------------------------------
 * Sengaja TIDAK punya field transaksi
 * ---------------------------------------------------------------------------
 * Tidak ada jumlah beli, varian terpilih, atau status keranjang — dan jangan
 * ditambahkan. Merch maupun Tiket sama-sama katalog: seluruh pembelian keluar
 * ke Yesplis (AGENTS.md 5.4, README boundary nomor 1).
 */
export interface ItemKatalog {
  id: string;
  nama: string;
  /** Rupiah penuh tanpa desimal. Diformat saat dirender, bukan disimpan sebagai teks. */
  harga: number;
  stok: number;
  /** Paragraf di overlay detail. Tidak tampil di kartu. */
  deskripsi: string;
  /** Cacah slide carousel di overlay detail. Fotonya sendiri belum ada. */
  jumlahFoto: number;
}

/** Angka rupiah tanpa awalan, mis. "1.000.000.000". */
export function angkaRupiah(nilai: number): string {
  return new Intl.NumberFormat("id-ID").format(nilai);
}

/**
 * Rp1.000.000.000 — format Indonesia, tanpa spasi setelah "Rp" seperti di Figma.
 *
 * Dipakai di kartu, yang seluruh harganya satu gaya huruf. Di overlay detail
 * "Rp" dan angkanya beda font, jadi di sana `angkaRupiah` yang dipakai.
 */
export function rupiah(nilai: number): string {
  return `Rp${angkaRupiah(nilai)}`;
}
