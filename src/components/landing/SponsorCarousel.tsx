import { JudulSticker } from "@/components/ui/JudulSticker";

export function SponsorCarousel({ tergabung = false }: { tergabung?: boolean }) {
  const isi = (
    <div id="judul-sponsor" className="absolute inset-x-0 top-[12%] flex justify-center px-5 sm:top-[9%]">
      <JudulSticker
        as="h2"
        ukuran="title"
        className="whitespace-nowrap text-center text-[clamp(2.15rem,6.2vw,6.5rem)]"
      >
        Sponsored By
      </JudulSticker>
    </div>
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
