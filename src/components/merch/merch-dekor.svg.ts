/**
 * BERKAS HASIL EKSPOR — JANGAN DIEDIT TANGAN.
 *
 * Lapisan dekorasi halaman Merchandise (gunung, pohon cemara, semak sakura,
 * semak zaitun, tanah hijau), diekspor sebagai SVG dari Figma frame `337:389`
 * lalu diproses:
 *
 *   1. enam tekstur raster yang tadinya ter-embed base64 dikeluarkan jadi
 *      berkas WebP di `public/image/merch/` — kalau dibiarkan, SVG-nya 19 MB
 *   2. dua `<rect>` latar kanvas Figma (#F5F5F5 dan #FDFDFC) dibuang
 *   3. rect langit #84C2F6 dan dua grup tekstur awan (`image 928`/`image 925`)
 *      DIBUANG juga — langitnya disediakan `LatarHalaman`, yang bisa mengikuti
 *      tinggi halaman berapa pun. Kalau ikut di SVG, langitnya jadi dobel dan
 *      terpotong di halaman yang lebih panjang dari kanvas Figma.
 *   4. grup `Frame 946` (judul, filter, dan sembilan kartu) dibuang — semuanya
 *      dirender sebagai HTML sungguhan
 *   5. dua `<pattern>` yatim yang tinggal setelah langit dibuang ikut dihapus,
 *      berikut `<image>` 7,7 MB yang mereka rujuk
 *
 * Hasilnya 18 KB (sekitar 2 KB setelah kompresi).
 *
 * Cara membuat ulang kalau desainnya berubah: lihat FE-0009.
 */
export const MERCH_DEKOR_SVG = `

<g id="ANJAY PANJANG BGT">

<g id="Desktop" clip-path="url(#clip0_198_38)">



<rect id="Rectangle" x="-121" y="241" width="1674.42" height="991.443" fill="url(#pattern2_198_38)"/>
<g id="Group 2147257843">
<mask id="mask0_198_38" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="-121" y="281" width="1634" height="951">
<g id="Group">
<path id="Vector" fill-rule="evenodd" clip-rule="evenodd" d="M328.476 1062.17L-64.6475 1087.62L-91.4371 755.074L64.3948 599.798L326.9 339.559C326.9 339.559 343.086 306.163 411.77 310.871C464.992 314.519 594.785 466.325 650.521 534.484L731.325 454.379C731.325 454.379 747.51 420.982 816.194 425.69C884.878 430.399 1081.08 681.843 1081.08 681.843L1201.69 840.465L1482.74 1128.43L339.777 1202.44L328.476 1062.17Z" fill="#3570B6"/>
<path id="Vector_2" fill-rule="evenodd" clip-rule="evenodd" d="M301.333 1093.38L-62.7266 1116.95C-78.8475 1117.99 -92.8263 1105.98 -94.1159 1089.97L-120.906 757.421C-121.596 748.849 -118.475 740.407 -112.366 734.319L43.4656 579.043L43.5191 578.99L302.778 321.97C310.451 309.281 337.869 276.347 413.804 281.553C433.673 282.915 463.362 298.662 495.322 325.422C547.152 368.819 610.323 440.345 652.674 490.847L707.203 436.79C714.875 424.101 742.294 391.167 818.228 396.373C830.057 397.184 844.844 402.247 861.141 412.021C879.593 423.088 901.26 440.59 923.893 461.634C1006.56 538.501 1104.44 663.832 1104.44 663.832L1104.66 664.124L1224.17 821.302L1503.96 1107.97C1511.98 1116.19 1514.47 1128.31 1510.33 1139C1506.18 1149.69 1496.16 1157.01 1484.66 1157.76L341.698 1231.77C325.577 1232.81 311.598 1220.8 310.308 1204.79L301.333 1093.38ZM328.476 1062.17L339.777 1202.44L1482.74 1128.43L1201.69 840.465L1081.08 681.843C1081.08 681.843 884.878 430.399 816.194 425.69C747.51 420.982 731.325 454.379 731.325 454.379L650.521 534.484C594.785 466.325 464.992 314.519 411.77 310.871C343.086 306.163 326.9 339.559 326.9 339.559L64.3947 599.798L-91.4372 755.074L-64.6475 1087.62L328.476 1062.17Z" fill="white"/>
</g>
</mask>
<g mask="url(#mask0_198_38)">
<g id="Group_2">
<path id="Vector_3" fill-rule="evenodd" clip-rule="evenodd" d="M328.476 1062.17L-64.6475 1087.62L-91.4371 755.074L64.3948 599.798L326.9 339.559C326.9 339.559 343.086 306.162 411.77 310.871C464.992 314.519 594.785 466.325 650.521 534.484L731.325 454.379C731.325 454.379 747.51 420.981 816.194 425.69C884.878 430.399 1081.08 681.843 1081.08 681.843L1201.69 840.465L1482.74 1128.43L339.777 1202.44L328.476 1062.17Z" fill="#3570B6"/>
<path id="Vector_4" fill-rule="evenodd" clip-rule="evenodd" d="M301.333 1093.38L-62.7266 1116.95C-78.8475 1117.99 -92.8263 1105.98 -94.1159 1089.97L-120.906 757.421C-121.596 748.849 -118.475 740.407 -112.366 734.319L43.4656 579.043L43.5191 578.99L302.778 321.97C310.451 309.281 337.869 276.347 413.804 281.553C433.673 282.915 463.362 298.662 495.322 325.422C547.152 368.819 610.323 440.345 652.674 490.847L707.203 436.79C714.875 424.101 742.294 391.167 818.228 396.373C830.057 397.184 844.844 402.247 861.141 412.021C879.593 423.088 901.26 440.59 923.893 461.634C1006.56 538.501 1104.44 663.832 1104.44 663.832L1104.66 664.124L1224.17 821.302L1503.96 1107.97C1511.98 1116.19 1514.47 1128.31 1510.33 1139C1506.18 1149.69 1496.16 1157.01 1484.66 1157.76L341.698 1231.77C325.577 1232.81 311.598 1220.8 310.308 1204.79L301.333 1093.38ZM328.476 1062.17L339.777 1202.44L1482.74 1128.43L1201.69 840.465L1081.08 681.843C1081.08 681.843 884.878 430.399 816.194 425.69C747.51 420.982 731.325 454.379 731.325 454.379L650.521 534.484C594.785 466.325 464.992 314.519 411.77 310.871C343.086 306.163 326.9 339.559 326.9 339.559L64.3947 599.798L-91.4372 755.074L-64.6475 1087.62L328.476 1062.17Z" fill="white"/>
</g>
<g id="Group_3" style="mix-blend-mode:soft-light" opacity="0.62">
<g id="Group_4">
<g id="Group_5">
<rect id="Rectangle_2" x="-216" y="-594.634" width="1698.75" height="2531" fill="url(#pattern3_198_38)"/>
</g>
</g>
</g>
</g>
</g>
<g id="Group_6">
<path id="Vector_5" fill-rule="evenodd" clip-rule="evenodd" d="M1770.53 576.82C1749.77 536.414 1598.81 535.247 1529.05 638.102C1459.85 610.411 1382.22 625.452 1381.73 717.991C1303.43 710.389 1262.75 742.615 1247.57 801.849C1177.63 771.454 1120.39 832.443 1152.53 888.605C1065.67 882.87 1008.65 908.641 989.967 974.885L1763.67 995.23L1770.53 576.82Z" stroke="white" stroke-width="36.8437" stroke-linecap="round" stroke-linejoin="round"/>
<path id="Vector_6" fill-rule="evenodd" clip-rule="evenodd" d="M1770.53 576.82C1749.77 536.414 1598.81 535.247 1529.05 638.102C1459.85 610.411 1382.22 625.452 1381.73 717.991C1303.43 710.389 1262.75 742.615 1247.57 801.849C1177.63 771.454 1120.39 832.443 1152.53 888.605C1065.67 882.87 1008.65 908.641 989.967 974.885L1763.67 995.23L1770.53 576.82Z" fill="#F39DC5"/>
<g id="Clip path group">
<mask id="mask1_198_38" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="989" y="551" width="782" height="445">
<g id="_clip4">
<path id="Vector_7" d="M1770.53 576.82C1749.77 536.414 1598.81 535.247 1529.05 638.102C1459.85 610.411 1382.23 625.452 1381.74 717.991C1303.43 710.389 1262.75 742.615 1247.57 801.849C1177.63 771.454 1120.39 832.443 1152.53 888.605C1065.67 882.87 1008.65 908.641 989.968 974.885L1763.67 995.23L1770.53 576.82Z" fill="white"/>
</g>
</mask>
<g mask="url(#mask1_198_38)">
<g id="Group_7">
<g id="Group_8">
<g id="Group_9">
<rect id="Rectangle_3" x="999.97" y="555.374" width="659.936" height="438.143" fill="url(#pattern4_198_38)"/>
</g>
</g>
</g>
</g>
</g>
</g>
<g id="Group_10">
<path id="Vector_8" fill-rule="evenodd" clip-rule="evenodd" d="M-199.073 895.27C-199.073 895.27 -58.1933 830.647 193.273 822.36C444.739 814.073 878.443 952.196 1076.41 964.718C1274.38 977.239 1509.72 883.455 1732.77 894.309C1955.82 905.164 1845.93 1569.93 1845.93 1569.93L1623.61 1882.53L-302 1961.71L-199.073 895.27Z" fill="#165524"/>
<g id="Clip path group_2">
<mask id="mask2_198_38" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="-302" y="822" width="2176" height="1140">
<g id="_clip8">
<path id="Vector_9" d="M-199.073 895.269C-199.073 895.269 -58.1929 830.645 193.273 822.358C444.74 814.071 878.443 952.194 1076.41 964.716C1274.38 977.237 1509.72 883.453 1732.77 894.307C1955.82 905.162 1845.93 1569.93 1845.93 1569.93L1623.61 1882.53L-302 1961.71L-199.073 895.269Z" fill="white"/>
</g>
</mask>
<g mask="url(#mask2_198_38)">
<g id="Group_11">
<g id="Group_12">
<g id="Group_13">
<rect id="Rectangle_4" x="-228" y="746" width="1803" height="1214" fill="url(#pattern5_198_38)"/>
</g>
</g>
</g>
</g>
</g>
</g>
<g id="Group_14">
<path id="Vector_10" fill-rule="evenodd" clip-rule="evenodd" d="M1600.02 1378.42C1576.37 1339.57 1425.51 1349.3 1363.26 1457.08C1292.14 1434.42 1215.69 1455.05 1221.89 1547.51C1143.13 1545.58 1104.82 1580.7 1093.95 1640.96C1021.89 1615.66 969.12 1680.71 1005.29 1734.48C918.109 1735.03 863.02 1764.89 849.147 1832.4L1623.4 1796.83L1600.02 1378.42Z" stroke="white" stroke-width="23.9519" stroke-linecap="round" stroke-linejoin="round"/>
<path id="Vector_11" fill-rule="evenodd" clip-rule="evenodd" d="M1600.02 1378.42C1576.37 1339.57 1425.51 1349.3 1363.26 1457.08C1292.14 1434.42 1215.69 1455.05 1221.89 1547.51C1143.13 1545.58 1104.82 1580.7 1093.95 1640.96C1021.89 1615.66 969.12 1680.71 1005.29 1734.48C918.109 1735.03 863.02 1764.89 849.147 1832.4L1623.4 1796.83L1600.02 1378.42Z" fill="#9B990C"/>
<g id="Clip path group_3">
<mask id="mask3_198_38" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="849" y="1357" width="775" height="476">
<g id="_clip11">
<path id="Vector_12" d="M1600.02 1378.42C1576.37 1339.57 1425.51 1349.3 1363.26 1457.08C1292.14 1434.42 1215.69 1455.05 1221.89 1547.51C1143.13 1545.58 1104.82 1580.7 1093.95 1640.96C1021.89 1615.66 969.12 1680.71 1005.29 1734.48C918.109 1735.03 863.02 1764.89 849.147 1832.4L1623.4 1796.83L1600.02 1378.42Z" fill="white"/>
</g>
</mask>
<g mask="url(#mask3_198_38)">
<g id="Group_15">
<g id="Group_16">
<g id="Group_17">
<rect id="Rectangle_5" x="807.535" y="1385.61" width="790.974" height="492.377" transform="rotate(-4.1368 807.535 1385.61)" fill="url(#pattern6_198_38)"/>
</g>
</g>
</g>
</g>
</g>
</g>
<g id="Group_18">
<rect id="Rectangle_6" x="-315" y="942" width="1345.78" height="1417" fill="url(#pattern7_198_38)"/>
</g>

</g>
</g>
<defs>
<pattern id="pattern2_198_38" patternContentUnits="objectBoundingBox" width="1" height="1">
<use xlink:href="#image1_198_38" transform="scale(0.000605327 0.00101626)"/>
</pattern>
<pattern id="pattern3_198_38" patternContentUnits="objectBoundingBox" width="1" height="1">
<use xlink:href="#image2_198_38" transform="scale(0.000596659 0.000398089)"/>
</pattern>
<pattern id="pattern4_198_38" patternContentUnits="objectBoundingBox" width="1" height="1">
<use xlink:href="#image3_198_38" transform="scale(0.00206186 0.00310559)"/>
</pattern>
<pattern id="pattern5_198_38" patternContentUnits="objectBoundingBox" width="1" height="1">
<use xlink:href="#image4_198_38" transform="scale(0.000803213 0.00117509)"/>
</pattern>
<pattern id="pattern6_198_38" patternContentUnits="objectBoundingBox" width="1" height="1">
<use xlink:href="#image5_198_38" transform="scale(0.00111359 0.00178891)"/>
</pattern>
<pattern id="pattern7_198_38" patternContentUnits="objectBoundingBox" width="1" height="1">
<use xlink:href="#image6_198_38" transform="scale(0.00105708 0.000998004)"/>
</pattern>
<filter id="filter0_d_198_38" x="340.682" y="77.584" width="837.073" height="99.9014" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="4.89962" dy="7.53788"/>
<feGaussianBlur stdDeviation="0.753787"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_198_38"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_198_38" result="shape"/>
</filter>
<filter id="filter1_d_198_38" x="349.074" y="86.584" width="815.681" height="77.9035" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="0.9" dy="3.54"/>
<feGaussianBlur stdDeviation="0.753787"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_198_38"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_198_38" result="shape"/>
</filter>
<filter id="filter2_d_198_38" x="313" y="253" width="369" height="453" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="4"/>
<feGaussianBlur stdDeviation="2"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_198_38"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_198_38" result="shape"/>
</filter>
<filter id="filter3_d_198_38" x="690" y="253" width="369" height="453" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="4"/>
<feGaussianBlur stdDeviation="2"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_198_38"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_198_38" result="shape"/>
</filter>
<filter id="filter4_d_198_38" x="1067" y="253" width="369" height="453" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="4"/>
<feGaussianBlur stdDeviation="2"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_198_38"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_198_38" result="shape"/>
</filter>
<filter id="filter5_d_198_38" x="313" y="722" width="369" height="453" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="4"/>
<feGaussianBlur stdDeviation="2"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_198_38"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_198_38" result="shape"/>
</filter>
<filter id="filter6_d_198_38" x="690" y="722" width="369" height="453" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="4"/>
<feGaussianBlur stdDeviation="2"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_198_38"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_198_38" result="shape"/>
</filter>
<filter id="filter7_d_198_38" x="1067" y="722" width="369" height="453" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="4"/>
<feGaussianBlur stdDeviation="2"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_198_38"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_198_38" result="shape"/>
</filter>
<filter id="filter8_d_198_38" x="313" y="1191" width="369" height="453" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="4"/>
<feGaussianBlur stdDeviation="2"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_198_38"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_198_38" result="shape"/>
</filter>
<filter id="filter9_d_198_38" x="690" y="1191" width="369" height="453" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="4"/>
<feGaussianBlur stdDeviation="2"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_198_38"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_198_38" result="shape"/>
</filter>
<filter id="filter10_d_198_38" x="1067" y="1191" width="369" height="453" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="4"/>
<feGaussianBlur stdDeviation="2"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_198_38"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_198_38" result="shape"/>
</filter>
<clipPath id="clip0_198_38">
<rect width="1512" height="1774" fill="white"/>
</clipPath>

<image id="image1_198_38" data-name="_Image2.png" width="1652" height="984" preserveAspectRatio="none" xlink:href="/image/merch/gunung.webp"/>
<image id="image2_198_38" data-name="_Image1.png" width="1676" height="2512" preserveAspectRatio="none" xlink:href="/image/merch/tekstur-gunung.webp"/>
<image id="image3_198_38" data-name="_Image5.png" width="485" height="322" preserveAspectRatio="none" xlink:href="/image/merch/semak-sakura.webp"/>
<image id="image4_198_38" data-name="_Image9.png" width="1245" height="851" preserveAspectRatio="none" xlink:href="/image/merch/tanah-hijau.webp"/>
<image id="image5_198_38" data-name="_Image12.png" width="898" height="559" preserveAspectRatio="none" xlink:href="/image/merch/semak-zaitun.webp"/>
<image id="image6_198_38" data-name="_Image6.png" width="946" height="1002" preserveAspectRatio="none" xlink:href="/image/merch/pohon-cemara.webp"/>
</defs>
`;
