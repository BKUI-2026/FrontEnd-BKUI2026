import Image from "next/image";

/** Strip Figma sudah memuat lingkaran placeholder; jangan digambar dua kali. */
export function SponsorCarousel({ tergabung = false }: { tergabung?: boolean }) {
  const isi = (
    <>
      <h2 id="judul-sponsor" className="sr-only">Sponsor dan partner BKUI 2026</h2>
      <Image src="/icon/landing/latest/sponsor-strip.svg?v=2" alt="" aria-hidden width={1696} height={208} sizes="(max-width: 900px) 900px, 100vw" unoptimized className="pointer-events-none absolute left-1/2 top-0 h-auto w-[max(900px,100%)] max-w-none -translate-x-1/2" />
    </>
  );
  const className = "relative isolate h-[max(145px,17vw)] overflow-hidden bg-[url('/image/landing/dekor-sponsor.webp')] bg-cover bg-bottom";
  if (tergabung) return <div aria-labelledby="judul-sponsor" className={className}>{isi}</div>;
  return (
    <section
      aria-labelledby="judul-sponsor"
      className={className}
    >
      {isi}
    </section>
  );
}
