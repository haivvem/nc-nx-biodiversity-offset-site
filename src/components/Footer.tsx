import React from "react";
import { Language, translations } from "@/data/translations";

interface FooterProps {
  lang: Language;
}

export default function Footer({ lang }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const c = translations[lang].contact;
  const g = translations[lang].governance.roles;

  return (
    <footer className="bg-forest-950 text-white border-t border-forest-900 mt-auto">
      {/* Partner Logos / Badges Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-b border-forest-900/60">
        <p className="text-center text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-forest-450 mb-6">
          {lang === "lo" ? "ພາກສ່ວນຈັດຕັ້ງປະຕິບັດ ແລະ ສະໜັບສະໜູນ" : "IMPLEMENTING AGENCIES & SUPPORTING PARTNERS"}
        </p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 items-center justify-items-center opacity-85 hover:opacity-100 transition-opacity duration-300">
          {/* PAFO Bolikhamxay */}
          <div className="flex flex-col items-center text-center">
            <div className="w-11 h-11 rounded-full bg-emerald-700 flex items-center justify-center font-bold text-white mb-2 shadow-md text-xs">
              PAFO
            </div>
            <span className="text-[9px] text-forest-300 font-medium max-w-[130px] leading-tight">
              {g.province.title}
            </span>
          </div>

          {/* BOMU */}
          <div className="flex flex-col items-center text-center">
            <div className="w-11 h-11 rounded-full bg-forest-600 flex items-center justify-center font-bold text-white mb-2 shadow-md text-xs">
              BOMU
            </div>
            <span className="text-[9px] text-forest-300 font-medium max-w-[130px] leading-tight">
              {g.bomu.title}
            </span>
          </div>

          {/* NN1PC */}
          <div className="flex flex-col items-center text-center">
            <div className="w-11 h-11 rounded-full bg-blue-900 flex items-center justify-center font-bold text-white mb-2 shadow-md text-xs">
              NN1
            </div>
            <span className="text-[9px] text-forest-300 font-medium max-w-[130px] leading-tight">
              {g.nn1pc.title}
            </span>
          </div>

          {/* BSP / WCS */}
          <div className="flex flex-col items-center text-center">
            <div className="w-11 h-11 rounded-full bg-slate-800 flex items-center justify-center font-bold text-white mb-2 shadow-md text-xs">
              WCS
            </div>
            <span className="text-[9px] text-forest-300 font-medium max-w-[130px] leading-tight">
              {g.advisor.title}
            </span>
          </div>

          {/* ADB */}
          <div className="flex flex-col items-center text-center">
            <div className="w-11 h-11 rounded-full bg-sky-950 flex items-center justify-center font-bold text-white mb-2 shadow-md text-xs">
              ADB
            </div>
            <span className="text-[9px] text-forest-300 font-medium max-w-[130px] leading-tight">
              {g.adb.title}
            </span>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Contact */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-3">
            <h3 className="text-sm sm:text-base font-bold text-white">
              {lang === "lo" ? "ໂຄງການຄຸ້ມຄອງເຂດຊົດເຊີຍຊີວະນາໆພັນ ນ້ຳຈວນ-ນ້ຳຊັ່ງ" : "Nam Chouan-Nam Sang Biodiversity Offset Management Project"}
            </h3>
            <p className="text-xs sm:text-sm text-forest-350 leading-relaxed max-w-lg">
              {lang === "lo"
                ? "ເຂດຊົດເຊີຍຊີວະນາໆພັນ (Biodiversity Offset Site) ທີ່ເກີດຈາກການຊົດເຊີຍຜົນກະທົບດ້ານຊີວະນາໆພັນຂອງໂຄງການໄຟຟ້ານ້ຳງຽບ 1, ນຳພາການຄຸ້ມຄອງໂດຍພາກລັດ ພ້ອມການສະໜັບສະໜູນດ້ານງົບປະມານ ແລະ ວິຊາການ."
                : "A designated biodiversity offset site compensating for ecological impacts from the Nam Ngiep 1 Hydropower Project, managed under governmental lead with multi-stakeholder technical and budget support."}
            </p>
          </div>
          <div className="space-y-4 md:justify-self-end">
            <h3 className="text-sm sm:text-base font-bold text-white">{lang === "lo" ? "ຕິດຕໍ່ພົວພັນ" : "Contact Information"}</h3>
            <ul className="space-y-2 text-xs sm:text-sm text-forest-300">
              <li className="flex items-start max-w-md">
                <svg className="w-4 h-4 mr-2 text-forest-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{c.addressDesc}</span>
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-forest-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>info@namchouan-namsang.org</span>
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-forest-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 00.099.72l-1.313 1.313a10.97 10.97 0 005.676 5.676l1.313-1.313a1 1 0 01.72-.099l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>{c.telValue}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-forest-900/60 text-center text-[10px] text-forest-450 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© {currentYear} {lang === "lo" ? "ໂຄງການຄຸ້ມຄອງເຂດຊົດເຊີຍຊີວະນາໆພັນ ນ້ຳຈວນ-ນ້ຳຊັ່ງ. ສະຫງວນລິຂະສິດ." : "Nam Chouan-Nam Sang Biodiversity Offset Project. All rights reserved."}</p>
          <div className="flex space-x-4">
            <span className="hover:text-white cursor-pointer">{lang === "lo" ? "ນະໂຍບາຍ" : "Privacy Policy"}</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">{lang === "lo" ? "ເງື່ອນໄຂ" : "Terms of Use"}</span>
            <span>•</span>
            <a href="/admin" className="hover:text-white cursor-pointer">{lang === "lo" ? "ຈັດການຂໍ້ມູນ" : "Admin Panel"}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
