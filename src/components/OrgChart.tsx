"use client";

import React, { useState } from "react";
import { Language, translations } from "@/data/translations";

interface OrgChartProps {
  lang: Language;
}

export default function OrgChart({ lang }: OrgChartProps) {
  const [selectedNode, setSelectedNode] = useState<string>("bomu");
  const t = translations[lang].governance;

  const nodes = [
    { id: "central", title: t.roles.central.title, role: t.roles.central.role, desc: t.roles.central.desc },
    { id: "province", title: t.roles.province.title, role: t.roles.province.role, desc: t.roles.province.desc },
    { id: "nn1pc", title: t.roles.nn1pc.title, role: t.roles.nn1pc.role, desc: t.roles.nn1pc.desc },
    { id: "adb", title: t.roles.adb.title, role: t.roles.adb.role, desc: t.roles.adb.desc },
    { id: "bomu", title: t.roles.bomu.title, role: t.roles.bomu.role, desc: t.roles.bomu.desc },
    { id: "envOffice", title: t.roles.envOffice.title, role: t.roles.envOffice.role, desc: t.roles.envOffice.desc },
    { id: "advisor", title: t.roles.advisor.title, role: t.roles.advisor.role, desc: t.roles.advisor.desc },
  ];

  const selectedData = nodes.find((n) => n.id === selectedNode) || nodes[4];

  return (
    <div className="w-full bg-white dark:bg-forest-950 p-6 md:p-8 rounded-3xl border border-forest-100 dark:border-forest-900 shadow-lg relative overflow-hidden">
      {/* Chart Layout Header */}
      <h3 className="text-sm font-bold text-center text-forest-550 dark:text-forest-400 uppercase tracking-widest mb-10">
        {lang === "lo" ? "ໂຄງຮ່າງການຈັດຕັ້ງຂອງໂຄງການຄຸ້ມຄອງ" : "ORGANIZATIONAL STRUCTURE"}
      </h3>

      {/* Responsive Visual Diagram Container */}
      <div className="max-w-4xl mx-auto overflow-x-auto select-none pb-4">
        <div className="relative w-[920px] h-[380px] mx-auto">
          
          {/* SVG Connector Lines */}
          <svg className="absolute inset-0 w-full h-full text-slate-350 dark:text-forest-800 pointer-events-none" fill="none" stroke="currentColor" strokeWidth="2.5">
            {/* Central to Province vertical arrow */}
            <path d="M 300,80 L 300,150" />
            <polygon points="300,150 295,141 305,141" fill="currentColor" />

            {/* Province to BOMU vertical arrow */}
            <path d="M 300,210 L 300,280" />
            <polygon points="300,280 295,271 305,271" fill="currentColor" />

            {/* NN1PC to ESD Office vertical arrow */}
            <path d="M 580,210 L 580,290" />
            <polygon points="580,290 575,281 585,281" fill="currentColor" />

            {/* ADB to Advisor vertical double-headed arrow */}
            <path d="M 820,210 L 820,290" />
            <polygon points="820,210 815,219 825,219" fill="currentColor" />
            <polygon points="820,290 815,281 825,281" fill="currentColor" />

            {/* NN1PC to Province double-headed arrow */}
            <path d="M 490,180 L 420,180" />
            <polygon points="420,180 428,175 428,185" fill="currentColor" />
            <polygon points="490,180 482,175 482,185" fill="currentColor" />

            {/* NN1PC to ADB double-headed arrow */}
            <path d="M 670,180 L 740,180" />
            <polygon points="670,180 678,175 678,185" fill="currentColor" />
            <polygon points="740,180 732,175 732,185" fill="currentColor" />

            {/* Advisor to ESD Office arrow */}
            <path d="M 740,320 L 670,320" />
            <polygon points="670,320 678,315 678,325" fill="currentColor" />

            {/* ESD Office to BOMU arrow */}
            <path d="M 490,320 L 420,320" />
            <polygon points="420,320 428,315 428,325" fill="currentColor" />
          </svg>

          {/* SVG Text Labels (Reporting & Contracting) */}
          <div className="absolute left-[680px] top-[152px] w-[50px] text-center pointer-events-none">
            <span className="text-[9px] font-bold text-forest-450 dark:text-forest-400 bg-white dark:bg-forest-950 px-1 py-0.5 rounded shadow-sm border border-forest-100/50 dark:border-forest-900/50">
              {lang === "lo" ? "ລາຍງານ" : "Report"}
            </span>
          </div>

          <div className="absolute left-[830px] top-[242px] w-[80px] text-left pointer-events-none pl-1">
            <span className="text-[9px] font-bold text-forest-450 dark:text-forest-400 bg-white dark:bg-forest-950 px-1 py-0.5 rounded shadow-sm border border-forest-100/50 dark:border-forest-900/50 whitespace-nowrap">
              {lang === "lo" ? "ເຮັດສັນຍາໂດຍກົງ" : "Direct Contract"}
            </span>
          </div>

          {/* Left Side Row Labels */}
          <div className="absolute left-[10px] top-[36px] w-[140px] text-right font-black text-[11px] sm:text-xs text-forest-500 dark:text-forest-400">
            {lang === "lo" ? "ຂັ້ນສູນກາງ" : "Central Level"}
          </div>
          <div className="absolute left-[10px] top-[170px] w-[140px] text-right font-black text-[11px] sm:text-xs text-forest-500 dark:text-forest-400">
            {lang === "lo" ? "ຂັ້ນແຂວງ" : "Provincial Level"}
          </div>
          <div className="absolute left-[10px] top-[310px] w-[140px] text-right font-black text-[10px] sm:text-xs text-forest-500 dark:text-forest-400 leading-tight">
            {lang === "lo" ? "ໜ່ວຍງານຈັດຕັ້ງປະຕິບັດ" : "Implementation Unit"}
          </div>

          {/* Nodes */}
          {/* Row 1, Col 1: Central Node */}
          <button
            onClick={() => setSelectedNode("central")}
            style={{ left: "180px", top: "20px", width: "240px", height: "60px" }}
            className={`absolute p-2 rounded-2xl border text-xs font-bold flex items-center justify-center text-center shadow-md transition-all duration-300 cursor-pointer ${
              selectedNode === "central"
                ? "border-emerald-500 dark:border-emerald-400 bg-emerald-50/10 dark:bg-emerald-950/20 ring-4 ring-emerald-500/20 font-black scale-102 text-emerald-700 dark:text-emerald-300"
                : "border-slate-200 dark:border-forest-850 bg-slate-50 dark:bg-forest-900 text-slate-800 dark:text-forest-100 hover:border-emerald-400 hover:bg-slate-100 dark:hover:bg-forest-850/80"
            }`}
          >
            {nodes[0].title}
          </button>

          {/* Row 2, Col 1: Bolikhamxay Province */}
          <button
            onClick={() => setSelectedNode("province")}
            style={{ left: "180px", top: "150px", width: "240px", height: "60px" }}
            className={`absolute p-2 rounded-2xl border text-xs font-bold flex items-center justify-center text-center shadow-md transition-all duration-300 cursor-pointer ${
              selectedNode === "province"
                ? "border-emerald-500 dark:border-emerald-400 bg-emerald-50/10 dark:bg-emerald-950/20 ring-4 ring-emerald-500/20 font-black scale-102 text-emerald-700 dark:text-emerald-300"
                : "border-slate-200 dark:border-forest-850 bg-slate-50 dark:bg-forest-900 text-slate-800 dark:text-forest-100 hover:border-emerald-400 hover:bg-slate-100 dark:hover:bg-forest-850/80"
            }`}
          >
            {nodes[1].title}
          </button>

          {/* Row 2, Col 2: Nam Ngiep 1 */}
          <button
            onClick={() => setSelectedNode("nn1pc")}
            style={{ left: "490px", top: "150px", width: "180px", height: "60px" }}
            className={`absolute p-2 rounded-2xl border text-xs font-bold flex items-center justify-center text-center shadow-md transition-all duration-300 cursor-pointer ${
              selectedNode === "nn1pc"
                ? "border-emerald-500 dark:border-emerald-400 bg-emerald-50/10 dark:bg-emerald-950/20 ring-4 ring-emerald-500/20 font-black scale-102 text-emerald-700 dark:text-emerald-300"
                : "border-slate-200 dark:border-forest-850 bg-slate-50 dark:bg-forest-900 text-slate-800 dark:text-forest-100 hover:border-emerald-400 hover:bg-slate-100 dark:hover:bg-forest-850/80"
            }`}
          >
            {nodes[2].title}
          </button>

          {/* Row 2, Col 3: ADB */}
          <button
            onClick={() => setSelectedNode("adb")}
            style={{ left: "740px", top: "150px", width: "160px", height: "60px" }}
            className={`absolute p-2 rounded-2xl border text-xs font-bold flex items-center justify-center text-center shadow-md transition-all duration-300 cursor-pointer ${
              selectedNode === "adb"
                ? "border-emerald-500 dark:border-emerald-400 bg-emerald-50/10 dark:bg-emerald-950/20 ring-4 ring-emerald-500/20 font-black scale-102 text-emerald-700 dark:text-emerald-300"
                : "border-slate-200 dark:border-forest-850 bg-slate-50 dark:bg-forest-900 text-slate-800 dark:text-forest-100 hover:border-emerald-400 hover:bg-slate-100 dark:hover:bg-forest-850/80"
            }`}
          >
            {nodes[3].title}
          </button>

          {/* Row 3, Col 1: BOMU (PAFO Field Unit) */}
          <button
            onClick={() => setSelectedNode("bomu")}
            style={{ left: "180px", top: "280px", width: "240px", height: "80px" }}
            className={`absolute p-2 rounded-2xl border text-[10px] sm:text-xs font-bold flex items-center justify-center text-center shadow-md transition-all duration-300 cursor-pointer ${
              selectedNode === "bomu"
                ? "border-emerald-500 dark:border-emerald-400 bg-emerald-50/10 dark:bg-emerald-950/20 ring-4 ring-emerald-500/20 font-black scale-102 text-emerald-700 dark:text-emerald-300"
                : "border-slate-200 dark:border-forest-850 bg-slate-50 dark:bg-forest-900 text-slate-800 dark:text-forest-100 hover:border-emerald-400 hover:bg-slate-100 dark:hover:bg-forest-850/80"
            }`}
          >
            {nodes[4].title}
          </button>

          {/* Row 3, Col 2: ESD Office */}
          <button
            onClick={() => setSelectedNode("envOffice")}
            style={{ left: "490px", top: "290px", width: "180px", height: "60px" }}
            className={`absolute p-2 rounded-2xl border text-xs font-bold flex items-center justify-center text-center shadow-md transition-all duration-300 cursor-pointer ${
              selectedNode === "envOffice"
                ? "border-emerald-500 dark:border-emerald-400 bg-emerald-50/10 dark:bg-emerald-950/20 ring-4 ring-emerald-500/20 font-black scale-102 text-emerald-700 dark:text-emerald-300"
                : "border-slate-200 dark:border-forest-850 bg-slate-50 dark:bg-forest-900 text-slate-800 dark:text-forest-100 hover:border-emerald-400 hover:bg-slate-100 dark:hover:bg-forest-850/80"
            }`}
          >
            {nodes[5].title}
          </button>

          {/* Row 3, Col 3: Advisor */}
          <button
            onClick={() => setSelectedNode("advisor")}
            style={{ left: "740px", top: "290px", width: "160px", height: "60px" }}
            className={`absolute p-2 rounded-2xl border text-xs font-bold flex items-center justify-center text-center shadow-md transition-all duration-300 cursor-pointer ${
              selectedNode === "advisor"
                ? "border-emerald-500 dark:border-emerald-400 bg-emerald-50/10 dark:bg-emerald-950/20 ring-4 ring-emerald-500/20 font-black scale-102 text-emerald-700 dark:text-emerald-300"
                : "border-slate-200 dark:border-forest-850 bg-slate-50 dark:bg-forest-900 text-slate-800 dark:text-forest-100 hover:border-emerald-400 hover:bg-slate-100 dark:hover:bg-forest-850/80"
            }`}
          >
            {nodes[6].title}
          </button>

        </div>
      </div>

      {/* Info Display Overlay Card */}
      <div className="w-full max-w-4xl mx-auto mt-8 p-6 rounded-2xl bg-forest-50/50 dark:bg-forest-900/30 border border-forest-100 dark:border-forest-850 shadow-inner animate-fade-in space-y-3">
        <div className="flex items-center space-x-2">
          <div className="w-3.5 h-3.5 rounded-full bg-emerald-500" />
          <h4 className="text-sm sm:text-base font-bold text-forest-900 dark:text-white">
            {selectedData.title}
          </h4>
        </div>
        <div className="text-[10px] sm:text-xs font-semibold text-forest-500 uppercase tracking-wider">
          {lang === "lo" ? "ບົດບາດຫຼັກ" : "Key Role"}: <span className="text-forest-750 dark:text-forest-200">{selectedData.role}</span>
        </div>
        <p className="text-xs sm:text-sm text-forest-650 dark:text-forest-300 leading-relaxed">
          {selectedData.desc}
        </p>
      </div>
    </div>
  );
}
