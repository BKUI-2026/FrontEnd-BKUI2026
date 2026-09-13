import Image from "next/image";

/** Success state dari Figma node 551:6130, ditampilkan setelah API mengonfirmasi submit. */
export function SuccessRoadshow() {
  return (
    <div className="flex h-auto min-h-[520px] w-full max-w-[1000px] flex-col items-center justify-center gap-10 rounded-3xl bg-bkui-krem-kartu px-6 py-16 text-center drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] sm:min-h-[606px] sm:px-9">
      <Image
        src="/icon/roadshow/pendaftaran-berhasil.svg"
        alt=""
        width={200}
        height={200}
        priority
        className="size-36 sm:size-[200px]"
      />

      <div className="flex flex-col items-center">
        <h1 className="font-display text-[36px] leading-[1.4] text-bkui-teks sm:text-5xl">
          Pendaftaran Berhasil<span className="font-ui font-extrabold">!</span>
        </h1>
        <p className="font-ui text-xl font-semibold leading-[1.2] text-bkui-teks sm:text-[28px]">
          Data sekolah berhasil kami terima.
        </p>
      </div>
    </div>
  );
}
