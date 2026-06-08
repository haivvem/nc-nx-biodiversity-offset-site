"use client";

import React, { useState } from "react";

export default function PerformanceDashboard() {
  const [activeTab, setActiveTab] = useState<"summary" | "patrols" | "community">("summary");

  const stats = [
    { label: "ຈຳນວນຄັ້ງລາດຕະເວນ", value: "382", unit: "ຄັ້ງ", change: "+12% ປີຕໍ່ປີ", icon: "🧭" },
    { label: "ໄລຍະທາງລາດຕະເວນ", value: "28,450", unit: "ກິໂລແມັດ", change: "ກວມເອົາພື້ນທີ່ຫຼັກ", icon: "🥾" },
    { label: "ບ້ານຮ່ວມມືອະນຸລັກ", value: "12", unit: "ບ້ານ", change: "100% ຂອງເປົ້າໝາຍ", icon: "🏡" },
    { label: "ບຸກຄະລາກອນທີ່ໄດ້ຮັບການອົບຮົມ", value: "48", unit: "ທ່ານ", change: "ພາກລັດ & ພະນັກງານພາກສະໜາມ", icon: "🎓" },
    { label: "ຈຸດຕິດຕາມກ້ອງດັກຖ່າຍ", value: "85", unit: "ຈຸດ", change: "ຕິດຕາມຊີວະນາໆພັນ", icon: "📷" },
    { label: "ກັບດັກສັດປ່າທີ່ຖືກທຳລາຍ", value: "1,420", unit: "ກັບ", change: "ປົກປ້ອງຊີວິດສັດປ່າ", icon: "🛡️" },
  ];

  const yearlyData = [
    { year: "2023", patrols: 80, kms: 6200, staff: 20 },
    { year: "2024", patrols: 142, kms: 11500, staff: 32 },
    { year: "2025", patrols: 285, kms: 22100, staff: 45 },
    { year: "2026", patrols: 382, kms: 28450, staff: 48 },
  ];

  return (
    <div className="w-full bg-white dark:bg-forest-950 rounded-3xl border border-forest-100 dark:border-forest-900 shadow-xl p-6 md:p-8">
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-forest-100 dark:border-forest-900">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-forest-900 dark:text-white">
            ແຜງຄວບຄຸມການດຳເນີນງານ ແລະ ຕົວຊີ້ວັດ (Dashboard)
          </h3>
          <p className="text-sm text-forest-500 mt-1">
            ສະຫຼຸບຕົວເລກການດຳເນີນງານໃນການຄຸ້ມຄອງເຂດຊົດເຊີຍຊີວະນາໆພັນ ນ້ຳຈວນ-ນ້ຳຊັ່ງ
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex bg-forest-100 dark:bg-forest-900 p-1 rounded-xl mt-4 md:mt-0 max-w-xs sm:max-w-md">
          <button
            onClick={() => setActiveTab("summary")}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
              activeTab === "summary"
                ? "bg-forest-600 text-white shadow-md"
                : "text-forest-600 dark:text-forest-300 hover:text-forest-900 dark:hover:text-white"
            }`}
          >
            ພາບລວມຕົວເລກ
          </button>
          <button
            onClick={() => setActiveTab("patrols")}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
              activeTab === "patrols"
                ? "bg-forest-600 text-white shadow-md"
                : "text-forest-600 dark:text-forest-300 hover:text-forest-900 dark:hover:text-white"
            }`}
          >
            ສະຖິຕິການລາດຕະເວນ
          </button>
          <button
            onClick={() => setActiveTab("community")}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
              activeTab === "community"
                ? "bg-forest-600 text-white shadow-md"
                : "text-forest-600 dark:text-forest-300 hover:text-forest-900 dark:hover:text-white"
            }`}
          >
            ການມີສ່ວນຮ່ວມຂອງຊຸມຊົນ
          </button>
        </div>
      </div>

      {/* Tab Content 1: Summary Grid */}
      {activeTab === "summary" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="p-5 rounded-2xl bg-forest-50/50 dark:bg-forest-900/40 border border-forest-100/50 dark:border-forest-800/40 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5 flex items-start space-x-4"
            >
              <div className="text-3xl p-3 bg-white dark:bg-forest-900 rounded-xl shadow-inner border border-forest-100/30">
                {stat.icon}
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold uppercase tracking-wider text-forest-500">
                  {stat.label}
                </p>
                <div className="flex items-baseline space-x-1">
                  <span className="text-2xl font-black text-forest-900 dark:text-white font-mono">
                    {stat.value}
                  </span>
                  <span className="text-xs font-semibold text-forest-600 dark:text-forest-400">
                    {stat.unit}
                  </span>
                </div>
                <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                  {stat.change}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab Content 2: Patrol Stats Progress Chart */}
      {activeTab === "patrols" && (
        <div className="space-y-8 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Chart Area */}
            <div className="md:col-span-8 space-y-4">
              <h4 className="text-sm font-bold text-forest-800 dark:text-white uppercase tracking-wider">
                ການເຕີບໂຕຂອງໄລຍະທາງລາດຕະເວນສະສົມ (ກິໂລແມັດ)
              </h4>
              <div className="space-y-4 pt-4">
                {yearlyData.map((data, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold text-forest-700 dark:text-forest-300">
                      <span>ປີ {data.year}</span>
                      <span>{data.kms.toLocaleString()} ກມ ({data.patrols} ຄັ້ງ)</span>
                    </div>
                    <div className="w-full bg-forest-100 dark:bg-forest-900 h-3 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-forest-500 to-emerald-600 h-full rounded-full transition-all duration-1000"
                        style={{ width: `${(data.kms / 28450) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Side Commentary */}
            <div className="md:col-span-4 p-5 rounded-2xl bg-forest-50/50 dark:bg-forest-900/30 border border-forest-100/50 dark:border-forest-800/50 text-sm leading-relaxed space-y-3">
              <h5 className="font-bold text-forest-800 dark:text-white">ຜົນການລາດຕະເວນຫຼັກ:</h5>
              <ul className="list-disc pl-4 space-y-2 text-forest-650 dark:text-forest-300">
                <li>ເພີ່ມຄວາມຖີ່ການລາດຕະເວນໃນເຂດທີ່ມີຄວາມສ່ຽງສູງ.</li>
                <li>ນຳໃຊ້ລະບົບ SMART (Spatial Monitoring and Reporting Tool) ເພື່ອບັນທຶກ ແລະ ວິເຄາະຂໍ້ມູນ.</li>
                <li>ລາດຕະເວນຮ່ວມລະຫວ່າງເຈົ້າໜ້າທີ່ BOMU ແລະ ກອງຫຼອນທ້ອງຖິ່ນ.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content 3: Community and Livelihoods */}
      {activeTab === "community" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
          <div className="p-5 rounded-2xl border border-forest-100 dark:border-forest-800 bg-white dark:bg-forest-900/20 space-y-4">
            <h4 className="font-bold text-forest-800 dark:text-white">ບ້ານຮ່ວມມື ແລະ ສັນຍາອະນຸລັກ</h4>
            <p className="text-sm text-forest-600 dark:text-forest-300 leading-relaxed">
              ໂຄງການໄດ້ເຊັນບົດບັນທຶກຄວາມເຂົ້າໃຈ (MoU) ແລະ ສັນຍາອະນຸລັກຊີວະນາໆພັນຮ່ວມກັບ 12 ບ້ານເປົ້າໝາຍ ເພື່ອຮ່ວມກັນປົກປັກຮັກສາ, ກວດກາ ແລະ ກີດກັ້ນການລັກລອບລ່າສັດ ຫຼື ຕັດໄມ້.
            </p>
            <div className="flex justify-between items-center text-xs text-forest-550 dark:text-forest-400 font-semibold pt-2">
              <span>ບ້ານທີ່ເຂົ້າຮ່ວມ: 12 / 12 ບ້ານ</span>
              <span>ອັດຕາການມີສ່ວນຮ່ວມ: 100%</span>
            </div>
            <div className="w-full bg-forest-100 dark:bg-forest-900 h-2 rounded-full overflow-hidden">
              <div className="bg-forest-500 h-full rounded-full w-full" />
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-forest-100 dark:border-forest-800 bg-white dark:bg-forest-900/20 space-y-4">
            <h4 className="font-bold text-forest-800 dark:text-white">ການສ້າງອາຊີບທາງເລືອກ</h4>
            <p className="text-sm text-forest-600 dark:text-forest-300 leading-relaxed">
              ເພື່ອຫຼຸດຜ່ອນການເພິ່ງພາຊັບພະຍາກອນປ່າໄມ້ຫຼາຍເກີນໄປ, ໂຄງການໄດ້ສະໜັບສະໜູນການປູກພືດທົດແທນ, ການລ້ຽງສັດ, ແລະ ໃຫ້ທຶນພັດທະນາກຸ່ມອາຊີບຕ່າງໆ ໃນບ້ານເປົ້າໝາຍ.
            </p>
            <div className="flex justify-between items-center text-xs text-forest-550 dark:text-forest-400 font-semibold pt-2">
              <span>ຄອບຄົວທີ່ໄດ້ຮັບຜົນປະໂຫຍດ: 250+ ຄອບຄົວ</span>
              <span>ງົບປະມານສະໜັບສະໜູນ: 100% ຕາມ CA</span>
            </div>
            <div className="w-full bg-forest-100 dark:bg-forest-900 h-2 rounded-full overflow-hidden">
              <div className="bg-forest-500 h-full rounded-full w-full" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
