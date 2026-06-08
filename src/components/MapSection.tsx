"use client";

import React, { useState } from "react";

export default function MapSection() {
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);

  const zones = {
    offset: {
      name: "ເຂດຊົດເຊີຍຊີວະນາໆພັນ ນ້ຳຈວນ-ນ້ຳຊັ່ງ",
      area: "ປະມານ 60,000 ເຮັກຕາ",
      terrain: "ພູເຂົາສູງຊັນ, ປ່າດົງດິບແລ້ງ ແລະ ປ່າປະສົມຜັດໃບ",
      importance: "ເປັນແຫຼ່ງທີ່ຢູ່ອາໄສຂອງສັດປ່າຫາຍາກ ແລະ ໃກ້ຈະສູນພັນ ເຊັ່ນ: ຊ້າງປ່າ, ທະນີແກ້ມຂາວ, ນົກຂວາ, ແລະ ອື່ນໆ.",
      status: "ເຂດຄຸ້ມຄອງພິເສດ (ປິດການເປີດເຜີຍພິກັດລະອຽດ)",
    },
    reservoir: {
      name: "ອ່າງເກັບນ້ຳ ໂຄງການໄຟຟ້ານ້ຳງຽບ 1",
      area: "ປະມານ 67 ຕາຕະລາງກິໂລແມັດ",
      terrain: "ອ່າງເກັບນ້ຳ ແລະ ພື້ນທີ່ອ້ອມຂ້າງ",
      importance: "ພື້ນທີ່ສ້າງພະລັງງານໄຟຟ້າ ນ້ຳງຽບ 1 ທີ່ເປັນທີ່ມາຂອງຄວາມຈຳເປັນໃນການສ້າງເຂດຊົດເຊີຍຊີວະນາໆພັນ.",
      status: "ພື້ນທີ່ດຳເນີນງານໄຟຟ້ານ້ຳງຽບ 1",
    },
    buffer: {
      name: "ເຂດກັນຊົນຮ່ວມກັບຊຸມຊົນ (Buffer Zone)",
      area: "ພື້ນທີ່ອ້ອມຂ້າງເຂດຊົດເຊີຍ",
      terrain: "ເຂດທຳມາຫາກິນ ແລະ ປ່າຊຸມຊົນ",
      importance: "ເຂດຈຳກັດການນຳໃຊ້ຊັບພະຍາກອນ, ສົ່ງເສີມການມີສ່ວນຮ່ວມຂອງຊຸມຊົນ 12 ບ້ານອ້ອມຂ້າງ ເພື່ອຫຼຸດຜ່ອນການບຸກລຸກເຂດຊົດເຊີຍ.",
      status: "ພື້ນທີ່ຄຸ້ມຄອງຮ່ວມກັບບ້ານຈັດຕັ້ງ",
    },
  };

  return (
    <div className="w-full py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-7xl mx-auto px-4">
        {/* Interactive SVG Map */}
        <div className="lg:col-span-7 bg-forest-950 p-6 rounded-3xl border border-forest-900 shadow-2xl relative overflow-hidden">
          <div className="absolute top-4 left-4 z-10 bg-forest-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-forest-850">
            <span className="text-xs font-semibold text-emerald-400">ແຜນທີ່ພື້ນທີ່ໂຄງການ (ໂດຍສັງເຂບ)</span>
          </div>

          {/* Map Image SVG */}
          <svg
            viewBox="0 0 800 600"
            className="w-full h-auto text-white"
            fill="none"
            stroke="currentColor"
          >
            {/* Background Map Contours / Rivers */}
            <path
              d="M 50,200 Q 150,180 250,250 T 450,220 T 650,300 T 750,250"
              stroke="#0f3d1f"
              strokeWidth="4"
              strokeDasharray="5,5"
            />
            <path
              d="M 100,500 Q 250,450 350,480 T 550,420 T 700,520"
              stroke="#0f3d1f"
              strokeWidth="3"
              strokeDasharray="5,5"
            />

            {/* Nam Ngiep River System */}
            <path
              d="M 400,0 Q 380,150 320,250 T 220,380 T 150,550 T 120,600"
              stroke="#1b5a8a"
              strokeWidth="6"
              className="opacity-40"
            />
            {/* Nam Chouan River */}
            <path
              d="M 700,100 Q 620,180 500,220 T 320,250"
              stroke="#1b5a8a"
              strokeWidth="4"
              className="opacity-40"
            />

            {/* ZONE 2: NN1 Reservoir Area */}
            <path
              d="M 280,240 C 270,200 240,220 220,280 C 200,340 180,360 200,380 C 220,400 250,370 260,350 C 270,330 290,300 280,240 Z"
              fill={hoveredZone === "reservoir" ? "#1e5e8a" : "#1b4f73"}
              stroke="#3182ce"
              strokeWidth="2"
              className="cursor-pointer transition-all duration-300"
              onMouseEnter={() => setHoveredZone("reservoir")}
              onMouseLeave={() => setHoveredZone(null)}
            />

            {/* ZONE 1: Nam Chouan-Nam Sang Offset Site (Large green zone) */}
            <path
              d="M 320,250 C 400,200 550,150 680,180 C 720,200 750,260 720,320 C 690,380 610,400 540,380 C 480,360 420,390 380,340 C 340,290 310,280 320,250 Z"
              fill={hoveredZone === "offset" ? "#16a34a" : "#14532d"}
              fillOpacity="0.85"
              stroke="#4ade80"
              strokeWidth="3"
              className="cursor-pointer transition-all duration-300"
              onMouseEnter={() => setHoveredZone("offset")}
              onMouseLeave={() => setHoveredZone(null)}
            />

            {/* ZONE 3: Buffer Zone (Surrounding the green offset site) */}
            <path
              d="M 280,200 C 380,130 550,100 720,130 C 770,160 800,260 760,360 C 710,440 600,450 510,420 C 450,400 390,440 330,380 C 280,320 260,260 280,200 Z"
              fill="none"
              stroke="#eab308"
              strokeWidth="2"
              strokeDasharray="6,4"
              className="cursor-pointer hover:stroke-yellow-400 transition-all duration-300"
              onMouseEnter={() => setHoveredZone("buffer")}
              onMouseLeave={() => setHoveredZone(null)}
            />

            {/* Text Labels on Map */}
            <text x="440" y="280" fill="#ffffff" fontSize="16" fontWeight="bold" className="pointer-events-none drop-shadow-md">
              ເຂດຊົດເຊີຍ ນ້ຳຈວນ-ນ້ຳຊັ່ງ
            </text>
            <text x="440" y="305" fill="#a7f3d0" fontSize="12" className="pointer-events-none">
              (Nam Chouan-Nam Sang Offset Site)
            </text>

            <text x="120" y="330" fill="#ffffff" fontSize="13" fontWeight="bold" className="pointer-events-none rotate-12 drop-shadow-md">
              ອ່າງເກັບນ້ຳ ນ້ຳງຽບ 1
            </text>

            <text x="520" y="445" fill="#fef08a" fontSize="13" fontWeight="bold" className="pointer-events-none drop-shadow-md">
              ເຂດກັນຊົນຮ່ວມກັບຊຸມຊົນ (Buffer Zone)
            </text>

            {/* Safe indicators (e.g. Village general locations, no sensitive cameras) */}
            {/* Village 1 */}
            <circle cx="360" cy="400" r="6" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />
            <text x="372" y="404" fill="#cbd5e1" fontSize="11" fontWeight="500">ບ. ນ້ຳຢ້າງ</text>

            {/* Village 2 */}
            <circle cx="680" cy="410" r="6" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />
            <text x="692" y="414" fill="#cbd5e1" fontSize="11" fontWeight="500">ບ. ນ້ຳຈວນ</text>

            {/* Village 3 */}
            <circle cx="580" cy="140" r="6" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />
            <text x="592" y="144" fill="#cbd5e1" fontSize="11" fontWeight="500">ບ. ວັງມອນ</text>

            {/* Compass Rose */}
            <g transform="translate(720, 80)">
              <circle cx="0" cy="0" r="25" fill="#064e3b" stroke="#34d399" strokeWidth="1.5" />
              <line x1="0" y1="-22" x2="0" y2="22" stroke="#34d399" strokeWidth="2" />
              <line x1="-22" y1="0" x2="22" y2="0" stroke="#34d399" strokeWidth="2" />
              <polygon points="0,-22 -5,-5 0,0" fill="#34d399" />
              <polygon points="0,22 5,5 0,0" fill="#047857" />
              <text x="-4" y="-27" fill="#ffffff" fontSize="12" fontWeight="bold">N</text>
            </g>
          </svg>

          {/* Map Wording Disclaimers */}
          <p className="text-[10px] text-forest-400 mt-4 text-center italic">
            * ຂໍ້ຄວນລະວັງ: ແຜນທີ່ສະແດງໂດຍສັງເຂບເພື່ອຄວາມປອດໄພ. ບໍ່ມີການເປີດເຜີຍພິກັດລະອຽດຂອງກ້ອງດັກຖ່າຍ (Camera Traps), ເສັ້ນທາງລາດຕະເວນ ຫຼື ຈຸດພົບເຫັນສັດປ່າທີ່ຖືກຄຸກຄາມ.
          </p>
        </div>

        {/* Informative Side Panel */}
        <div className="lg:col-span-5 space-y-6">
          <h3 className="text-2xl font-bold text-forest-800 dark:text-white leading-tight">
            ພື້ນທີ່ຄຸ້ມຄອງ ແລະ ຂອບເຂດຄວາມຮັບຜິດຊອບ
          </h3>
          <p className="text-sm text-forest-600 dark:text-forest-300 leading-relaxed">
            ເຂດຊົດເຊີຍຊີວະນາໆພັນ ນ້ຳຈວນ-ນ້ຳຊັ່ງ ເປັນເຂດປ່າສະຫງວນ ແລະ ຟື້ນຟູທີ່ຖືກກຳນົດຂຶ້ນເພື່ອເປັນການຊົດເຊີຍຜົນກະທົບດ້ານຊີວະນາໆພັນ ທີ່ບໍ່ສາມາດຫຼີກລ່ຽງໄດ້ຈາກການສ້າງເຂື່ອນໄຟຟ້ານ້ຳງຽບ 1.
          </p>

          {/* Dynamic Information Displayed on Hover */}
          <div className="p-5 rounded-2xl bg-white dark:bg-forest-900 border border-forest-100 dark:border-forest-800 shadow-md min-h-[200px] flex flex-col justify-between">
            {hoveredZone ? (
              <div className="animate-fade-in space-y-3">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${
                    hoveredZone === "offset" ? "bg-green-500" : hoveredZone === "reservoir" ? "bg-blue-500" : "bg-yellow-500"
                  }`} />
                  <span className="text-sm font-bold text-forest-800 dark:text-white">
                    {zones[hoveredZone as keyof typeof zones].name}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-forest-400">ຂະໜາດພື້ນທີ່</p>
                  <p className="text-sm font-semibold text-forest-700 dark:text-forest-200">
                    {zones[hoveredZone as keyof typeof zones].area}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-forest-400">ລັກສະນະພູມສັນຖານ</p>
                  <p className="text-sm text-forest-700 dark:text-forest-200">
                    {zones[hoveredZone as keyof typeof zones].terrain}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-forest-400">ຄວາມສຳຄັນທາງນິເວດ</p>
                  <p className="text-sm text-forest-600 dark:text-forest-300 leading-relaxed">
                    {zones[hoveredZone as keyof typeof zones].importance}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center py-6">
                <svg className="w-12 h-12 text-forest-300 animate-pulse mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
                <p className="text-sm font-semibold text-forest-500">
                  ເອົາເມົ້າສ໌ໄປຊີໃສ່ພື້ນທີ່ໃນແຜນທີ່
                </p>
                <p className="text-xs text-forest-400 mt-1">
                  ເພື່ອເບິ່ງລາຍລະອຽດຂະໜາດພື້ນທີ່ ແລະ ຄວາມສຳຄັນທາງດ້ານຊີວະນາໆພັນ
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
