/** Gelombang putih yang menutup sambungan antarseksi tanpa menambah tinggi. */
export function FogTransition() {
  return (
    <div aria-hidden className="pointer-events-none relative z-20 h-0">
      <svg
        viewBox="0 0 1512 64"
        preserveAspectRatio="none"
        className="absolute inset-x-0 top-0 h-[50px] w-full -translate-y-1/2"
      >
        <defs>
          <linearGradient id="awan-belakang" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#dcdedc" />
            <stop offset="48%" stopColor="#e8e7e2" />
            <stop offset="100%" stopColor="#f4f1e9" />
          </linearGradient>
          <linearGradient id="awan-tengah" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ebeae5" />
            <stop offset="50%" stopColor="#f7f5ef" />
            <stop offset="100%" stopColor="#fffdf8" />
          </linearGradient>
          <linearGradient id="awan-depan" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="52%" stopColor="#faf9f5" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
        </defs>
        <path
          d="M0 8C105 31 211 -7 326 13C441 33 526 31 636 7C746 -17 851 32 965 13C1079 -6 1175 35 1288 9C1401 -17 1461 4 1512 12V45C1410 66 1304 34 1191 53C1078 72 980 34 866 52C752 70 650 34 538 54C426 74 315 34 204 53C93 72 35 49 0 45V8Z"
          fill="url(#awan-belakang)"
          opacity="0.86"
        />
        <path
          d="M0 14C99 -8 194 34 304 13C414 -8 504 36 616 16C728 -4 808 -9 915 18C1022 45 1112 -6 1220 14C1328 34 1418 -9 1512 13V49C1417 31 1325 70 1216 49C1107 28 1017 69 906 48C795 27 706 70 596 48C486 26 396 68 286 47C176 26 87 67 0 48V14Z"
          fill="url(#awan-tengah)"
          opacity="0.94"
        />
        <path
          d="M0 18C116 -3 207 0 310 24C413 48 487 -5 599 11C711 27 767 41 876 13C985 -15 1064 38 1173 16C1282 -6 1386 -5 1512 20V43C1394 67 1302 43 1195 37C1088 31 1001 69 890 45C779 21 690 65 579 43C468 21 382 68 274 44C166 20 79 65 0 42V18Z"
          fill="url(#awan-depan)"
        />
      </svg>
    </div>
  );
}
