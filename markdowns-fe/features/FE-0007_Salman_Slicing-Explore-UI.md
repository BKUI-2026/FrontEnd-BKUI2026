---
id: FE-0007
tipe: Slides(Explore UI)+Components(HeaderExplore, JudulExplore, HiasanHeader, FilterRumpun, DaftarFakultas, KartuFakultas, ChipProdi, KaruselFoto)
author: Salman
fitur: Slicing halaman Explore UI + animasi Framer Motion
tanggal: 2026-09-01 09:10 WIB
status_integrasi: Masih Dummy Data
---

## Deskripsi

Halaman `/explore-ui` yang sebelumnya masih `PagePlaceholder` sekarang sudah
dislicing penuh dari Figma. Susunannya: header ilustrasi berjudul melengkung →
strip pembatas krem → bilah penyaring rumpun → daftar 15 fakultas
berselang-seling kiri-kanan.

Komponennya dipecah satu file per elemen visual yang berdiri sendiri di
`src/components/explore/`, mengikuti pola `components/landing/`. Hiasan yang
bergerak dipisah dari konten (`HiasanHeader`) supaya animasinya bisa dipasang
tanpa menyentuh isi.

### Header disusun per-layer, bukan satu screenshot

Di Figma header ini tumpukan layer, dan diekspor per layer:

| Layer | Berkas | Node Figma |
|---|---|---|
| Lanskap (langit, gunung, pohon, bukit, semak) | `image/explore/lanskap.webp` | `392:6496` |
| Judul melengkung | `icon/explore/judul.svg` | `332:122` |
| Matahari (dipakai 2x, beda ukuran) | `image/explore/matahari.webp` | `392:6590` / `392:6592` |
| Maskot | `image/explore/maskot-igris.webp` | `392:6574` |
| Tenda | `icon/explore/tenda.svg` | `392:6559` |
| Bingkai foto fakultas | `icon/explore/bingkai-foto.svg` | `308:2948` |
| Sapuan awan latar halaman | `image/explore/awan-lembut.webp` | `307:2287` |

### Latar halaman: tiga lapis, bukan dua

Latar langit halaman ini milik **frame halaman** (`307:2285`), bukan salah satu
section — makanya dipasang lewat `LatarHalaman` yang membungkus seluruh isi,
bukan per-section seperti `SectionLangit` di Landing Page.

Susunannya:

1. warna dasar `--color-bkui-langit`
2. `image 928` — tekstur awan, `soft-light`, opacity 38%
3. `image 925` — sapuan awan, `soft-light`, opacity 75%

Lapis ketiga sempat terlewat. Akibatnya langitnya terlalu pekat **dan** terlalu
rata: awannya nyaris tidak terlihat padahal di Figma gumpalannya jelas.

Tiga hal yang sempat menyesatkan waktu memperbaikinya:

- **Kedua gambar harus jadi anak langsung elemen berwarna dasar.**
  `mix-blend-soft-light` berbaur dengan apa yang ada di belakangnya dalam
  konteks penumpukan yang sama. Waktu keduanya dibungkus dalam satu `div`
  sendiri, latar belakangnya jadi transparan, foto awannya tampil mentah, dan
  langitnya berubah jadi mendung berkontras tinggi.
- **`image 925` tidak bisa disalin apa adanya.** Di Figma gambarnya jauh lebih
  besar dari frame-nya dan digeser, jadi yang terlihat cuma sepotong lembut.
  Dipasang `object-cover`, seluruh foto awannya ikut tampil. Yang ditiru
  HASIL AKHIRNYA, lewat opacity yang dikalibrasi.
- **Warna dasarnya bukan `#84C2F6`** seperti section Landing Page, tapi
  `#99D6F9`.

### Cara mengalibrasi warna latar (kalau perlu diulang)

Jangan mengukur lewat screenshot browser — skalanya berubah tiap kali,
kompresi JPEG menambah derau, dan kelopak sakura yang lewat mencemari
sampelnya. Saya sempat tertipu begitu dan salah menyimpulkan dua kali.

Cara yang dipakai, hasilnya eksak:

1. Ukur target dari render Figma pada jalur latar yang benar-benar kosong
   (hindari tepi kartu) — hasilnya rerata **#A0DFFB**.
2. Di halaman yang sedang jalan, bangun ulang tumpukan itu di `<canvas>`
   memakai `globalCompositeOperation = 'soft-light'` dan gambar yang SUDAH
   dimuat browser, lalu cari warna dasarnya dengan bagi dua sampai reratanya
   pas. Canvas memakai rumus blend yang sama dengan CSS, jadi angkanya bisa
   dipercaya.

Hasilnya: dasar `#99D6F9` → rerata `#A1DFFB`. Meleset 1 dari target.

### Jebakan: ekspor node Figma membakar latar langit

Ekspor PNG/WebP sebuah node lewat Figma MCP **selalu ikut membawa latar frame
induknya** — di sini langit `#84C2F6` — sebagai piksel opaque, bukan
transparan. Efeknya tidak langsung kelihatan: kotak biru di matahari tidak
terlihat karena kebetulan duduk di atas langit yang sewarna, tapi judul dan
maskot langsung tampil sebagai kotak biru besar yang menutupi lanskap.

Dua jalan keluar yang dipakai:

- **Judul → ekspor SVG.** Latarnya di SVG cuma tiga `<rect>` di paling atas,
  tinggal dibuang. Teksnya sudah jadi path, jadi tidak bergantung font
  terpasang, dan bayangan jatuhnya tetap utuh sebagai filter SVG.
- **Matahari & maskot → pakai `rawImages`.** Itu berkas sumber yang diunggah
  desainer, dan latarnya memang transparan sejak awal.

Latar itu **tidak bisa** dibersihkan dari versi rasternya dengan menghapus
warna: bayangan judul itu hitam 40% di atas biru, jadi penghapusan warna apa
pun akan mengubahnya jadi gumpalan biru gelap.

Catatan untuk nanti: kalau ada aset Figma baru yang tampil sebagai kotak biru,
penyebabnya hampir pasti ini — bukan bug CSS.

Semua layer diposisikan dalam **persen** terhadap kanvas Figma 1512x885, dan
pembungkusnya mengunci rasio yang sama — jadi satu set angka berlaku di semua
lebar layar, tanpa breakpoint sendiri per hiasan.

Langit **tidak** memakai `SectionLangit` di bagian header: pada frame ini layer
langit terpisahnya disembunyikan di Figma dan warnanya sudah menyatu di
`lanskap.webp`. Kalau ikut dibungkus, langitnya jadi dobel. Area daftar
fakultas di bawahnya tetap pakai `SectionLangit`.

### Animasi (Framer Motion)

`framer-motion` ditambahkan ke `package.json` — sebelumnya belum ada. Aturan
gerak bersama dikumpulkan di `components/explore/gerak.ts` supaya seluruh
halaman punya ritme yang sama.

| Elemen | Gerakan | Catatan |
|---|---|---|
| Judul header | fade + naik + skala 0.96→1, 600ms | `animate`, bukan `whileInView` — sudah di layar sejak awal |
| Dua matahari | berputar 90s & 70s, arah berlawanan | pelan disengaja, biar tidak menarik perhatian dari judul |
| Tenda & maskot | mengambang naik-turun, jeda berbeda | supaya tidak terbaca sebagai satu benda |
| Pil filter rumpun | meluncur antar tab (`layoutId`) | luncurannya membawa informasi: mata mengikuti dari pilihan lama ke baru |
| Tombol filter | hover 1.03 / tap 0.97, pegas | |
| Kartu fakultas | fade + naik 28px saat masuk layar | `viewport.once` — tidak berulang saat scroll bolak-balik |
| Isi kartu | berurutan 90ms | judul → paragraf → chip → sorotan |
| Chip prodi | berurutan 60ms, naik + membesar | |
| Panel fakultas | terangkat 6px saat hover | membantu memisahkan satu fakultas dari tetangganya |
| Titik carousel | melebar 16→54px | |

Seluruhnya menghormati `prefers-reduced-motion` lewat `useReducedMotion()`:
gerakannya dimatikan, tapi **elemennya tetap tampil** — menyembunyikan konten
karena animasinya dimatikan justru bikin halaman tidak terbaca.

## Referensi Desain

Figma node [`307:2285`](https://www.figma.com/design/VleKZ99jmDFvSpE88joNQZ/BKUI-2026?node-id=307-2285)
("Desktop", 1512x2590).

**Figma belum punya varian mobile/tablet untuk halaman ini** — sama seperti
Landing Page (lihat FE-0005). Layout di bawah `lg` seluruhnya turunan sendiri:
kolom bertumpuk, selang-seling kiri-kanan dilepas, padding & ukuran teks
dikecilkan. Perlu direview desainer.

## Status Integrasi API

Belum ada satupun request ke BE. Sumbernya entity `Content` dan endpoint-nya
belum ada, jadi shape response-nya tidak dikarang duluan (README boundary
nomor 4). Semua isi ada di `src/lib/explore-content.ts`.

Yang **nyata** di file itu: nama 14 fakultas + Program Pendidikan Vokasi dan
pengelompokan rumpunnya, plus tiga prodi Fakultas Ilmu Komputer (isian
desainer di Figma).

Yang masih **placeholder** dan wajib diganti sebelum live:
- seluruh deskripsi (Lorem ipsum, persis seperti di Figma)
- daftar prodi selain Fasilkom → sementara "Program Studi 1/2/3"
- foto fakultas (di Figma pun bingkainya masih kosong) → slide bertuliskan
  "Foto menyusul"

Daftar prodi fakultas lain sengaja **tidak** saya isi sendiri: salah menulis
program studi di situs resmi universitas jauh lebih merugikan daripada
placeholder yang jelas terbaca sebagai placeholder.

## Catatan

- **Dua elipsis kecil di dekat tenda belum dibawa** (`Ellipse 2` `392:6576` dan
  `Ellipse 3` `392:6577`, masing-masing < 50px). Keduanya diputar di Figma
  sementara SVG hasil ekspornya lurus, dan sudut putarnya tidak terbaca dari
  metadata. Perlu ditanyakan ke desainer sebelum ditaruh dengan sudut tebakan.
- **`Group 392:6580` (semak sakura depan) juga belum dipasang.** Hasil
  ekspornya membawa latar langit biru yang tidak transparan, jadi kalau
  ditumpuk malah menutupi lanskap. Isinya sekilas sudah terwakili di
  `lanskap.webp`, tapi perlu dicek ulang berdampingan dengan Figma.
- **Titik carousel adalah satu-satunya animasi `width` di halaman ini**, dan
  itu disengaja. Aturan umumnya cuma menganimasi `transform`/`opacity` supaya
  tidak memicu layout tiap frame, tapi di sini perubahan bentuknya yang membawa
  informasi dan `scaleX` akan menggepengkan ujung pilnya jadi lonjong.
  Ongkosnya terkurung di empat elemen 16px dalam kolom yang lebarnya sudah
  pasti.
- **Filter rumpun dipakai `role="group"` + `aria-pressed`, bukan `role="tablist"`.**
  Pola tab ARIA menjanjikan satu panel per tab dan navigasi panah kiri-kanan;
  yang terjadi di sini cuma satu daftar yang disaring.
- **Urutan DOM tidak ikut dibalik** pada kartu selang-seling — yang dibalik
  cuma tampilannya (`lg:flex-row-reverse`). Urutan fokus keyboard & pembaca
  layar tetap deskripsi lalu foto untuk setiap fakultas.
- Tiga design token baru di `globals.css`: `--color-bkui-oren-muda` (#FFAD83,
  Secondary/30, latar tab aktif), `--color-bkui-coklat-tua` (#3B1807, ujung
  gelap gradien titik carousel), dan `--color-bkui-langit` (#99D6F9, warna
  dasar latar halaman — dikalibrasi, bukan diambil dari variabel Figma).
- **Section Landing Page mungkin punya masalah yang sama.** `SectionLangit`
  cuma memakai dua lapis pertama. Kalau langit di Landing Page terasa terlalu
  pekat dibanding Figma, penyebabnya kemungkinan besar lapis ketiga yang belum
  ada di sana juga. Belum saya sentuh — perlu dicek dan diputuskan terpisah
  supaya tidak mengubah halaman yang sudah disetujui.
- **Sudah diverifikasi visual di browser (desktop).** Header, judul, dua
  matahari, tenda, maskot, strip pembatas, bilah filter, dan kartu fakultas
  berselang-seling semuanya cocok dengan render Figma. Posisi tenda — yang
  sempat diragukan karena metadata bounding box-nya tidak konsisten — ternyata
  benar: maskot memang duduk persis di kiri tenda.
- **Lebar HP & tablet belum dilihat mata.** Susunannya CSS murni (kolom
  bertumpuk, selang-seling dilepas), tapi tetap perlu dicek langsung.
- **Kolom foto sempat kolaps.** Panel `lg:w-[880px]` dan kolom foto `400px`
  cuma muat berdampingan tepat di kanvas Figma 1512px; sedikit lebih sempit
  saja kolom fotonya menyusut sampai tinggal selebar deretan titik. Panelnya
  sekarang `lg:flex-1 lg:max-w-[880px]` supaya panel yang mengalah, bukan foto.
- **Kalau aset terlihat masih versi lama setelah diganti**, itu cache image
  optimizer Next. `rm -rf .next/cache/images` + restart dev server sering masih
  kurang karena browser juga menyimpan URL `/_next/image` yang sama; cara paling
  pasti adalah mengganti nama berkasnya (itu sebabnya maskot bernama
  `maskot-igris.webp`).
