import Image from "next/image";

function Gambar({
  src,
  className,
  sizes = "100vw",
}: {
  src: string;
  className: string;
  sizes?: string;
}) {
  return <Image src={src} alt="" fill sizes={sizes} className={`object-contain ${className}`} />;
}

function TeksturMask({ gambar, mask }: { gambar: string; mask: string }) {
  return (
    <div
      className="absolute inset-0 bg-cover bg-center opacity-60 mix-blend-soft-light"
      style={{
        backgroundImage: `url(${gambar})`,
        maskImage: `url(${mask})`,
        WebkitMaskImage: `url(${mask})`,
        maskPosition: "center",
        WebkitMaskPosition: "center",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskSize: "100% 100%",
        WebkitMaskSize: "100% 100%",
      }}
    />
  );
}

/**
 * Dekorasi School Roadshow dari layer asli Figma node 691:1852.
 * Pembungkus menggunakan koordinat kanvas 1512x1103; layer di dalamnya tetap
 * SVG/PNG asli, sehingga tidak ada kotak warna latar hasil ekspor frame.
 */
export function HiasanRoadshow({ variant = "form" }: { variant?: "form" | "success" }) {
  const success = variant === "success";

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden bg-[#7a783b]">
      <Image
        src="/image/roadshow/tekstur-rumput.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-[0.52] mix-blend-soft-light"
      />

      <div className="absolute left-[-19.58%] top-[-16.54%] h-[53.39%] w-[58.22%] -scale-x-100 rotate-[-178.46deg]">
        <Gambar src="/image/roadshow/bidang-pink.svg" className="" />
        <TeksturMask
          gambar="/image/roadshow/tekstur-daun.webp"
          mask="/image/roadshow/bidang-pink.svg"
        />
      </div>

      <div
        className={`absolute left-[-6.35%] w-[14.64%] ${success ? "top-[3.62%] h-[24.8%]" : "top-[2.9%] h-[19.89%]"}`}
      >
        <Gambar
          src="/image/roadshow/bunga-kuning.png"
          sizes="15vw"
          className="rotate-[120.29deg]"
        />
      </div>
      <div
        className={`absolute left-[5.23%] w-[11.31%] ${success ? "top-[5.13%] h-[19.15%]" : "top-[4.12%] h-[15.37%]"}`}
      >
        <Gambar
          src="/image/roadshow/bunga-kuning.png"
          sizes="12vw"
          className="rotate-[120.29deg]"
        />
      </div>
      <div
        className={`absolute left-[2.94%] w-[9.08%] ${success ? "top-[19.48%] h-[15.38%]" : "top-[15.63%] h-[12.34%]"}`}
      >
        <Gambar
          src="/image/roadshow/bunga-kuning.png"
          sizes="10vw"
          className="rotate-[120.29deg]"
        />
      </div>

      <div
        className={`absolute right-[-2.25%] w-[22.26%] ${success ? "top-[-12.43%] h-[37.95%]" : "top-[-9.97%] h-[30.45%]"}`}
      >
        <Gambar
          src="/image/roadshow/bunga-oranye.png"
          sizes="23vw"
          className="rotate-[-49.49deg]"
        />
      </div>
      <div
        className={`absolute right-[3.9%] w-[12.33%] ${success ? "top-[8.4%] h-[21.02%]" : "top-[11.6%] h-[16.86%]"}`}
      >
        <Gambar
          src="/image/roadshow/bunga-oranye.png"
          sizes="13vw"
          className="rotate-[-49.49deg]"
        />
      </div>

      <div
        className={`absolute left-[-15.81%] w-[83.91%] -scale-y-100 rotate-[-172.95deg] ${success ? "top-[56.61%] h-[77.74%]" : "top-[64.19%] h-[62.37%]"}`}
      >
        <Gambar src="/image/roadshow/batang-kayu.svg" className="" />
        <TeksturMask
          gambar="/image/roadshow/tekstur-kayu.webp"
          mask="/image/roadshow/batang-kayu.svg"
        />
      </div>
      <div
        className={`absolute left-[22.09%] w-[99.23%] rotate-[-38.59deg] ${success ? "top-[30.96%] h-[156.47%]" : "top-[31.19%] h-[125.55%]"}`}
      >
        <Gambar src="/image/roadshow/bidang-oranye.svg" className="" />
      </div>
      <div
        className={`absolute left-[-11.97%] w-[34.51%] rotate-[98.9deg] ${success ? "top-[40%] h-[58.33%]" : "top-[50.95%] h-[46.8%]"}`}
      >
        <Gambar src="/image/roadshow/bidang-biru.svg" className="" />
      </div>
      <div
        className={`absolute left-[-3.61%] w-[20.39%] rotate-[98.9deg] ${success ? "top-[46.49%] h-[34.36%]" : "top-[56.07%] h-[27.57%]"}`}
      >
        <Gambar src="/image/roadshow/garis-biru.svg" className="" />
      </div>

      <div
        className={`absolute left-[-6.32%] w-[13.13%] rotate-[83.8deg] ${success ? "top-[64.33%] h-[43.17%]" : "top-[70.47%] h-[34.64%]"}`}
      >
        <Gambar src="/image/roadshow/kelopak-1.svg" className="" />
      </div>
      <div
        className={`absolute left-[-1.38%] w-[26.42%] rotate-[152.85deg] ${success ? "top-[78.31%] h-[34.98%]" : "top-[81.69%] h-[28.07%]"}`}
      >
        <Gambar src="/image/roadshow/kelopak-2.svg" className="" />
      </div>
      <div
        className={`absolute left-[1.25%] w-[14.89%] rotate-[-168.2deg] ${success ? "top-[65.19%] h-[43.97%]" : "top-[71.17%] h-[35.28%]"}`}
      >
        <Gambar src="/image/roadshow/kelopak-3.svg" className="" />
      </div>
    </div>
  );
}
