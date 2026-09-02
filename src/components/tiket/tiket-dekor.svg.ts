/**
 * BERKAS HASIL EKSPOR — JANGAN DIEDIT TANGAN.
 *
 * Lapisan dekorasi halaman Tiket (bunga kuning, matahari oranye, semak sakura,
 * kelopak, aliran biru, bentuk kuning), diekspor sebagai SVG dari Figma frame
 * `367:4893` lalu diproses:
 *
 *   1. lima tekstur raster dikeluarkan jadi WebP di `public/image/tiket/`
 *   2. dua `<rect>` latar kanvas Figma dan rect langit #84C2F6 dibuang
 *   3. grup `Group 282` (alas rumput + teksturnya) dibuang — rumputnya
 *      disediakan `LatarTiket` supaya bisa mengikuti tinggi halaman berapa pun
 *   4. grup `Frame 946` (judul dan tiga kartu tier) dibuang — dirender HTML
 *   5. `<pattern>` dan `<image>` yatim ikut dihapus
 *   6. grup butiran selebar kanvas (`mix-blend-mode: multiply`) dibuang dan
 *      dipindah ke `LatarTiket` sebagai lapisan CSS. Di dalam SVG ia tidak
 *      punya apa-apa untuk dikalikan setelah alas rumputnya dibuang, jadi
 *      tampil mentah sebagai bidang krem yang menutupi seluruh halaman
 *   7. tiap bunga & matahari DIBUNGKUS `<g>` polos supaya bisa diputar CSS
 *      tanpa menimpa atribut `transform` bawaannya dari Figma
 *
 * Hasilnya 18 KB. Cara membuat ulang: lihat FE-0010.
 */
export const TIKET_DEKOR_SVG = `

<g id="ANJAY PANJANG BGT">

<g id="Desktop" clip-path="url(#clip0_198_39)">


<path class="tiket-air" id="Vector 153" d="M96.7444 386.755C335.575 415.681 309.922 712.935 270.565 836.73C92.5088 851.705 -237.955 816.478 -161.95 725.504C-66.9435 611.786 -201.794 350.597 96.7444 386.755Z" fill="#84C2F6" stroke="white" stroke-width="7.41669"/>
<g id="Vector 154" filter="url(#filter2_d_198_39)">
<path d="M241.835 528.67C234.031 505.768 198.542 454.409 119.025 432.188C149.269 442.447 216.172 476.107 241.835 528.67Z" fill="#3570B6"/>
<path d="M179.411 481.926C150.161 464.209 81.5282 431.127 40.9956 440.54C54.8713 438.413 101.98 443.712 179.411 481.926Z" fill="#3570B6"/>
<path d="M150.331 488.356C177.275 498.405 229.653 535.366 229.292 604.016C229.324 606.057 229.271 607.951 229.145 609.681C229.234 607.769 229.283 605.881 229.292 604.016C228.866 576.632 213.065 522.967 150.331 488.356Z" fill="#3570B6"/>
<path d="M-36.0805 555.231C-32.3759 584.64 -10.0352 652.771 49.6906 690.025C30.1333 676.849 -14.4011 631.442 -36.0805 555.231Z" fill="#3570B6"/>
</g>
<g id="Mask group_2">
<path id="Vector 143" d="M75.7921 589.62C336.879 785.73 675.552 921.518 812.252 964.898L976.495 1079.37C961.307 1139.68 903.008 1235.07 791.309 1134.13C679.61 1033.19 95.0562 834.354 -183.258 747.555C-205.694 613.197 -185.295 393.509 75.7921 589.62Z" fill="#36260E"/>
<mask id="mask1_198_39" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="-191" y="511" width="1168" height="668">
<path id="Vector 144" d="M75.7921 589.62C336.879 785.73 675.552 921.518 812.252 964.898L976.495 1079.37C961.307 1139.68 903.008 1235.07 791.309 1134.13C679.61 1033.19 95.0562 834.354 -183.258 747.555C-205.694 613.197 -185.295 393.509 75.7921 589.62Z" fill="#4F3021"/>
</mask>
<g mask="url(#mask1_198_39)">
<g id="Rectangle" opacity="0.43" style="mix-blend-mode:soft-light">
<rect width="1453.61" height="365.499" transform="matrix(-0.937686 -0.347484 -0.347484 0.937686 1131.89 923.72)" fill="url(#pattern1_198_39)"/>
</g>
</g>
</g>
<path id="Vector 83" d="M1722.03 649.778C921.458 519.258 867.122 1502.91 334 1142.25L746.129 1658.78L1754.24 854.436L1722.03 649.778Z" fill="url(#paint0_linear_198_39)" stroke="white" stroke-width="28.359"/>

<g id="Group 162">
<path id="Vector" d="M-254.68 307.228C-233.807 311.722 -207.757 312.478 -180.229 308.623C-126.804 301.139 -66.3428 276.041 -26.6506 224.924C10.7282 237.814 50.5968 240.693 82.1421 228.408C98.7942 221.923 113.125 211.194 123.264 195.569C132.254 181.714 137.706 164.382 138.875 143.453C178.902 146.054 210.617 139.672 234.752 124.852C258.422 110.318 273.975 88.1769 283.044 60.4566C320.688 72.9816 355.281 64.8623 376.977 45.3634C397.376 27.0314 405.756 -0.976326 394.433 -28.9262C436.948 -27.5113 473.222 -32.866 501.924 -46.395C533.822 -61.4308 555.92 -86.3706 566.683 -121.95L569.531 -131.365L559.695 -131.624L-286.432 -153.856L-294.005 -154.055L-294.123 -146.481L-300.759 277.47L-300.792 279.478L-299.816 281.234C-296.055 287.999 -289.704 293.38 -282.106 297.555C-274.461 301.756 -265.115 304.981 -254.68 307.228Z" fill="#F08AB9" stroke="white" stroke-width="15"/>
<g id="Mask group_3" style="mix-blend-mode:soft-light" opacity="0.6">
<mask id="mask2_198_39" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="-309" y="-163" width="889" height="481">
<path id="Vector_2" d="M-254.68 306.586C-233.807 311.08 -207.757 311.837 -180.229 307.981C-126.804 300.498 -66.3428 275.399 -26.6506 224.282C10.7282 237.172 50.5968 240.051 82.1421 227.767C98.7942 221.281 113.125 210.552 123.264 194.928C132.254 181.072 137.706 163.74 138.875 142.811C178.902 145.413 210.617 139.03 234.752 124.21C258.422 109.676 273.975 87.5352 283.044 59.8149C320.688 72.3399 355.281 64.2206 376.977 44.7218C397.376 26.3897 405.756 -1.61802 394.433 -29.5678C436.948 -28.153 473.222 -33.5077 501.924 -47.0367C533.822 -62.0725 555.92 -87.0123 566.683 -122.592L569.531 -132.007L559.695 -132.265L-286.432 -154.498L-294.005 -154.697L-294.123 -147.123L-300.759 276.828L-300.792 278.836L-299.816 280.592C-296.055 287.357 -289.704 292.738 -282.106 296.913C-274.461 301.114 -265.115 304.339 -254.68 306.586Z" fill="#F08AB9" stroke="white" stroke-width="15"/>
</mask>
<g mask="url(#mask2_198_39)">
<rect id="81724ff1758640c6d76f09f8f2c6dbfd 2" x="462.629" y="-256.505" width="519.01" height="772.885" transform="rotate(90 462.629 -256.505)" fill="url(#pattern3_198_39)" stroke="white" stroke-width="11.2587"/>
</g>
</g>
</g>
<g id="Group 344" class="tiket-kelopak">
<g id="Vector 21" filter="url(#filter3_i_198_39)">
<path d="M-24.036 590.053C108.956 527.896 105.74 916.776 24.4762 942.644C-96.1394 842.553 -105.52 579.308 -60.822 586.093C-53.1057 578.086 -34.3646 581.465 -24.036 590.053Z" fill="url(#paint1_linear_198_39)"/>
</g>
<g id="Vector 23" filter="url(#filter4_i_198_39)">
<path d="M328.063 761.131C433.665 863.1 69.3257 999.146 16.1114 932.508C66.4632 784.083 308.963 681.195 318.608 725.363C328.845 729.706 332.39 748.415 328.063 761.131Z" fill="url(#paint2_linear_198_39)"/>
</g>
<g id="Vector 22" filter="url(#filter5_i_198_39)">
<path d="M23.2913 935.565C114.976 828.672 227.922 719.378 233.545 656.57C239.169 593.761 196.239 586.293 146.74 617.443C97.2418 648.592 39.757 777.4 23.2913 935.565Z" fill="url(#paint3_linear_198_39)"/>
</g>
</g>
<g class="tiket-bunga tiket-bunga-1"><rect id="slice5 5" x="181.827" y="223.698" width="98.2999" height="101.621" transform="rotate(120.293 181.827 223.698)" fill="url(#pattern4_198_39)"/></g>
<g class="tiket-bunga tiket-bunga-2"><rect id="slice5 6" x="250.087" y="109.249" width="122.403" height="126.538" transform="rotate(120.293 250.087 109.249)" fill="url(#pattern5_198_39)"/></g>
<g class="tiket-bunga tiket-bunga-3"><rect id="slice5 7" x="125.391" y="114.637" width="158.47" height="163.824" transform="rotate(120.293 125.391 114.637)" fill="url(#pattern6_198_39)"/></g>

<g class="tiket-matahari tiket-matahari-1"><rect id="slice8 3" x="1225" y="173.354" width="130.171" height="134" transform="rotate(-49.4903 1225 173.354)" fill="url(#pattern7_198_39)"/></g>
<g class="tiket-matahari tiket-matahari-2"><rect id="slice8 4" x="1302.6" y="68.6696" width="235" height="242" transform="rotate(-49.4903 1302.6 68.6696)" fill="url(#pattern8_198_39)"/></g>
</g>
</g>
<defs>
<filter id="filter0_n_198_39" x="-3.8418" y="-16" width="1520.84" height="1075.17" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feTurbulence type="fractalNoise" baseFrequency="4.6132335662841797 4.6132335662841797" stitchTiles="stitch" numOctaves="3" result="noise" seed="243" />
<feColorMatrix in="noise" type="luminanceToAlpha" result="alphaNoise" />
<feComponentTransfer in="alphaNoise" result="coloredNoise1">
<feFuncA type="discrete" tableValues="0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 "/>
</feComponentTransfer>
<feComposite operator="in" in2="shape" in="coloredNoise1" result="noise1Clipped" />
<feFlood flood-color="rgba(0, 0, 0, 0.25)" result="color1Flood" />
<feComposite operator="in" in2="noise1Clipped" in="color1Flood" result="color1" />
<feMerge result="effect1_noise_198_39">
<feMergeNode in="shape" />
<feMergeNode in="color1" />
</feMerge>
</filter>
<filter id="filter1_f_198_39" x="-100.734" y="-172.734" width="1817.47" height="1212.47" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="0.867071" result="effect1_foregroundBlur_198_39"/>
</filter>
<filter id="filter2_d_198_39" x="-36.0804" y="432.188" width="281.257" height="266.692" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="2.06718" dy="7.57968"/>
<feGaussianBlur stdDeviation="0.637382"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.43 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_198_39"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_198_39" result="shape"/>
</filter>
<pattern id="pattern1_198_39" patternContentUnits="objectBoundingBox" width="1" height="1">
<use xlink:href="#image1_198_39" transform="scale(0.000833333 0.000416667)"/>
</pattern>
<pattern id="pattern3_198_39" patternContentUnits="objectBoundingBox" width="1" height="1">
<use xlink:href="#image3_198_39" transform="scale(0.00125 0.000833333)"/>
</pattern>
<filter id="filter3_i_198_39" x="-85.4309" y="581.554" width="170.953" height="365.139" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="47.5802" dy="6.07407"/>
<feGaussianBlur stdDeviation="2.02469"/>
<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.910225 0 0 0 0 1 0 0 0 0 0.649038 0 0 0 0.1 0"/>
<feBlend mode="normal" in2="shape" result="effect1_innerShadow_198_39"/>
</filter>
<filter id="filter4_i_198_39" x="16.1115" y="715.04" width="335.099" height="239.19" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="39.4815" dy="26.321"/>
<feGaussianBlur stdDeviation="2.02469"/>
<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.747425 0 0 0 0 1 0 0 0 0 0.649038 0 0 0 0.1 0"/>
<feBlend mode="normal" in2="shape" result="effect1_innerShadow_198_39"/>
</filter>
<filter id="filter5_i_198_39" x="23.2913" y="599.573" width="214.8" height="340.042" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="19.2346" dy="29.358"/>
<feGaussianBlur stdDeviation="2.02469"/>
<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.80013 0 0 0 0 1 0 0 0 0 0.644231 0 0 0 0.1 0"/>
<feBlend mode="normal" in2="shape" result="effect1_innerShadow_198_39"/>
</filter>
<pattern id="pattern4_198_39" patternContentUnits="objectBoundingBox" width="1" height="1">
<use xlink:href="#image4_198_39" transform="scale(0.00337838 0.00326797)"/>
</pattern>
<pattern id="pattern5_198_39" patternContentUnits="objectBoundingBox" width="1" height="1">
<use xlink:href="#image4_198_39" transform="scale(0.00337838 0.00326797)"/>
</pattern>
<pattern id="pattern6_198_39" patternContentUnits="objectBoundingBox" width="1" height="1">
<use xlink:href="#image4_198_39" transform="scale(0.00337838 0.00326797)"/>
</pattern>
<filter id="filter6_d_198_39" x="533.408" y="131.584" width="451.581" height="99.9015" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="4.89962" dy="7.53788"/>
<feGaussianBlur stdDeviation="0.753787"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_198_39"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_198_39" result="shape"/>
</filter>
<filter id="filter7_d_198_39" x="541.801" y="140.584" width="430.189" height="77.9036" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="0.9" dy="3.54"/>
<feGaussianBlur stdDeviation="0.753787"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_198_39"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_198_39" result="shape"/>
</filter>
<filter id="filter8_d_198_39" x="194.5" y="307" width="369" height="453" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="4"/>
<feGaussianBlur stdDeviation="2"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_198_39"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_198_39" result="shape"/>
</filter>
<filter id="filter9_d_198_39" x="571.5" y="307" width="369" height="453" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="4"/>
<feGaussianBlur stdDeviation="2"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_198_39"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_198_39" result="shape"/>
</filter>
<filter id="filter10_d_198_39" x="948.5" y="307" width="369" height="453" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="4"/>
<feGaussianBlur stdDeviation="2"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_198_39"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_198_39" result="shape"/>
</filter>
<pattern id="pattern7_198_39" patternContentUnits="objectBoundingBox" width="1" height="1">
<use xlink:href="#image5_198_39" transform="scale(0.00294118 0.00285714)"/>
</pattern>
<pattern id="pattern8_198_39" patternContentUnits="objectBoundingBox" width="1" height="1">
<use xlink:href="#image5_198_39" transform="scale(0.00294225 0.00285714)"/>
</pattern>
<linearGradient id="paint0_linear_198_39" x1="1093.89" y1="836.218" x2="1345.23" y2="1262.04" gradientUnits="userSpaceOnUse">
<stop stop-color="#FFEF45"/>
<stop offset="0.484845" stop-color="#FC4503"/>
</linearGradient>
<linearGradient id="paint1_linear_198_39" x1="-3.70632" y1="662.977" x2="23.4634" y2="942.754" gradientUnits="userSpaceOnUse">
<stop stop-color="#EE1552"/>
<stop offset="1" stop-color="#FAAEBB"/>
</linearGradient>
<linearGradient id="paint2_linear_198_39" x1="267.225" y1="806.191" x2="15.651" y2="931.611" gradientUnits="userSpaceOnUse">
<stop stop-color="#EE1552"/>
<stop offset="1" stop-color="#FAAEBB"/>
</linearGradient>
<linearGradient id="paint3_linear_198_39" x1="169.991" y1="787.037" x2="54.8049" y2="762.722" gradientUnits="userSpaceOnUse">
<stop stop-color="#EE1552"/>
<stop offset="1" stop-color="#FAAEBB"/>
</linearGradient>
<clipPath id="clip0_198_39">
<rect width="1512" height="885" fill="white"/>
</clipPath>

<image id="image1_198_39" data-name="_Image18.jpg" width="1200" height="2400" preserveAspectRatio="none" xlink:href="/image/tiket/tekstur-1.webp"/>

<image id="image3_198_39" data-name="81724ff1758640c6d76f09f8f2c6dbfd.jpg" width="800" height="1200" preserveAspectRatio="none" xlink:href="/image/tiket/tekstur-3.webp"/>
<image id="image4_198_39" data-name="slice5.png" width="296" height="306" preserveAspectRatio="none" xlink:href="/image/tiket/tekstur-4.webp"/>
<image id="image5_198_39" data-name="slice8.png" width="340" height="350" preserveAspectRatio="none" xlink:href="/image/tiket/tekstur-5.webp"/>
</defs>
`;
