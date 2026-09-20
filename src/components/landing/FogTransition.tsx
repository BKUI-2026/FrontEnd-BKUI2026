/** Kabut tipis di tepi section; tidak menambah tinggi atau celah halaman. */
export function FogTransition() {
  return (
    <div aria-hidden className="pointer-events-none relative z-20 h-0">
      <div className="absolute inset-x-0 top-0 h-20 -translate-y-1/2 overflow-hidden opacity-35 [mask-image:linear-gradient(to_bottom,transparent,black_35%,black_65%,transparent)] sm:h-28">
        <div className="absolute -left-[10%] top-[18%] h-[65%] w-[45%] rounded-[50%] bg-white/45 blur-3xl" />
        <div className="absolute left-[24%] top-[35%] h-[55%] w-[38%] rounded-[50%] bg-[#eaf7ff]/55 blur-3xl" />
        <div className="absolute right-[-8%] top-[12%] h-[70%] w-[48%] rounded-[50%] bg-white/45 blur-3xl" />
      </div>
    </div>
  );
}
