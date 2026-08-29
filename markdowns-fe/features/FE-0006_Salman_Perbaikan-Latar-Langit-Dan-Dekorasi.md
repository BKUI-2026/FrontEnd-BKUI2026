---
id: FE-0006
tipe: Components(SectionLangit)+Components(ApaItuBKUI)
author: Salman
fitur: Perbaikan Latar Langit & Dekorasi Section "Apa itu BKUI"
tanggal: 2026-08-29 10:05 WIB
status_integrasi: Masih Dummy Data
---

## Deskripsi

Memperbaiki dua hal yang di FE-0005 belum sama dengan Figma:

1. **Awannya nyaris tidak kelihatan** — latar section jadi biru polos, padahal
   di desain awannya jelas terlihat.
2. **Rangka kayu & dedaunan di section "Apa itu BKUI 2026" belum ada sama
   sekali** — di Figma section ini dibingkai balok kayu mendatar & tegak, plus
   dedaunan, bunga pink, dan sulur di pojok kiri atas.

Entry ini **menggantikan cara pembuatan latar langit** yang ditulis di FE-0005
bagian "Aset". Cara lama (`awan.webp` + `opacity` CSS) tidak dipakai lagi.

## Referensi Desain

Figma BKUI-2026, section `75:730`. Node latar: `75:816` (image 928) dan
`100:473` (image 925).

## Yang diubah

### 1. Latar langit — dicocokkan ke render Figma, bukan dikira-kira

**Kenapa yang lama salah.** Di FE-0005 saya mengekspor node `image 928` dan
`image 925` lalu menumpuknya. Yang keluar dari Figma untuk kedua node itu ternyata
hasil olahan yang sudah nyaris putih semua, jadi kalau ditempel penuh langitnya
jadi putih polos. Waktu itu saya akali dengan menurunkan `opacity` sampai 45–70%,
dan hasilnya kebalikannya: birunya menang, awannya hilang.

**Cara sekarang.** Yang dipakai adalah **foto awan aslinya** (`rawImages` dari
node `75:816`) — bukan hasil ekspor node-nya. Foto itu masih terlalu kontras
kalau dipakai langsung, jadi warnanya dicocokkan ke hasil render Figma lewat
transformasi affine per kanal:

```
gain   = std(langit Figma) / std(foto awan)
offset = mean(langit Figma) - gain * mean(foto awan)
```

Nilai target diambil dari tiga potongan langit bersih pada render section asli.
Hasilnya cocok sampai selisih < 1 dari target:

| | R | G | B |
|---|---|---|---|
| Target (render Figma) | 165,3 | 224,9 | 251,5 |
| Hasil `langit.webp` | 164,8 | 224,4 | 250,5 |

Karena warnanya sudah final di dalam file, `SectionLangit` tinggal memasangnya
apa adanya — **tidak ada lagi `opacity` yang perlu diutak-atik**. Ini juga yang
bikin cara barunya lebih tahan banting: kalau ada yang mengubah warna latar
section, langitnya tidak ikut berubah arti.

`awan.webp` dihapus, diganti `langit.webp` (43 KB).

### 2. Dekorasi rangka kayu

Ditambahkan `public/image/landing/dekor-apaitu.webp` (128 KB): balok kayu
mendatar + tegak, dedaunan, bunga pink, dan sulur.

Aset ini tidak diekspor per-node (dekorasinya tersebar di 8 node terpisah tanpa
grup pembungkus). Yang dilakukan: ekspor satu section penuh, lalu dipisahkan
secara terprogram:

- **Langit dibuang** dengan tes warna `biru >= hijau >= merah && biru > 150` —
  langit selalu memenuhi itu, dekorasi (kayu cokelat, daun hijau, bunga pink)
  tidak.
- **Area konten dibuang** (kotak tenda + judul + paragraf), karena semuanya
  dirender sebagai HTML.
- **Kelopak sakura statis dibuang**, karena di web kelopaknya sudah jadi animasi
  (`SakuraBerjatuhan`) — kalau ikut dibawa jadi dobel.

Dua catatan yang bikin ini tidak sesederhana kelihatannya, tolong diingat kalau
nanti mengekstrak dekorasi section lain dengan cara yang sama:

- **Kayu cokelat dan kelopak pink sama-sama "merah > hijau".** Yang membedakan
  birunya: kelopak pink punya biru **di atas** hijau, kayu cokelat **di bawah**.
  Tanpa itu, tes kelopak ikut menghapus seluruh baloknya.
- **Kelopak digambar di atas balok**, jadi menghapusnya meninggalkan lubang
  berbentuk kelopak. Lubangnya ditambal dengan merata-ratakan piksel kayu di
  sekelilingnya. Masknya juga perlu dilebarkan 4px dulu — tepi kelopak yang
  halus warnanya sudah tercampur langit sehingga lolos dari tes warna, dan sisa
  cincinnya jadi bibit penambalan yang memunculkan kelopaknya lagi sebagai
  bayangan pucat.

### 3. Jarak atas section disesuaikan

`ApaItuBKUI` sebelumnya `py-14 sm:py-20`. Dengan rangka kayu terpasang, balok
mendatarnya jadi menabrak judul. Jarak atasnya diubah jadi `pt-[max(140px,14vw)]`
mengikuti Figma (judul mulai di y=215 dari lebar frame 1512 ≈ 14vw), supaya
isinya lewat di bawah balok seperti di desain.

Gambar dekorasinya dikunci `min-w-[900px]`: kalau ikut mengecil di layar sempit,
baloknya jadi setipis garis dan dedaunannya tidak terbaca. Kelebihannya dibiarkan
meluber lalu terpotong `overflow-hidden` milik section.

## Status Integrasi API

Tidak berubah — masih **`Masih Dummy Data`**. Perubahan ini murni visual, tidak
menyentuh data maupun API.

## Catatan

**Section lain masih belum lengkap dekorasinya.** Yang sudah terpasang baru
bendera segitiga, pohon cemara di Testimoni, pohon di After Movie, dan bunga di
Timeline. Di Figma masih ada semak, bukit, jamur, dan bunga-bunga kecil di
beberapa section yang belum saya bawa. Cara ekstraksinya sudah terbukti jalan di
entry ini, jadi tinggal diulang per section.

**Verifikasi:** `npm run typecheck`, `npm run lint`, `npm run build` semuanya
lolos (exit 0). Dicek visual di browser pada lebar 1512px: awan terlihat jelas di
semua section, rangka kayu terpasang dan tidak menabrak judul, kelopak tidak
dobel.
