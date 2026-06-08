"use client";

import React, { useState, useEffect } from "react";
import { Language, translations } from "@/data/translations";

interface NavbarProps {
  lang: Language;
  setLang: (lang: Language) => void;
}

export default function Navbar({ lang, setLang }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = translations[lang].nav;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { name: t.home, anchor: "#home" },
    { name: t.about, anchor: "#about" },
    { name: t.governance, anchor: "#governance" },
    { name: t.activities, anchor: "#activities" },
    { name: t.news, anchor: "#news" },
    { name: t.contact, anchor: "#contact" },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, anchor: string) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.querySelector(anchor);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-forest-900/90 text-white shadow-lg backdrop-blur-md border-b border-forest-800/50 py-2"
          : "bg-transparent text-white py-3.5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo / Title */}
          <a href="#home" onClick={(e) => handleScrollTo(e, "#home")} className="flex items-center space-x-3 group">
            <div className="w-14 h-14 rounded-full overflow-hidden flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/BOMU_Logo.png"
                alt="BOMU Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className="block text-sm sm:text-base font-bold leading-tight text-white tracking-wide">
                {lang === "lo" ? "ເຂດຊົດເຊີຍຊີວະນາໆພັນ" : "Biodiversity Offset"}
              </span>
              <span className="block text-[10px] sm:text-xs font-medium text-forest-300 tracking-wider">
                {lang === "lo" ? "ນ້ຳຈວນ-ນ້ຳຊັ່ງ (NC-NX)" : "Nam Chouan-Nam Sang"}
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {menuItems.map((item, idx) => (
              <a
                key={idx}
                href={item.anchor}
                onClick={(e) => handleScrollTo(e, item.anchor)}
                className="px-4 py-2 rounded-md text-sm font-bold transition-all duration-200 hover:bg-forest-800 text-white/90 hover:text-white"
              >
                {item.name}
              </a>
            ))}

            {/* Language Switcher */}
            <div className="flex items-center ml-6 bg-forest-950/40 rounded-lg p-0.5 border border-forest-800/60">
              <button
                onClick={() => setLang("lo")}
                className={`px-2.5 py-1 text-xs font-bold rounded ${
                  lang === "lo"
                    ? "bg-forest-650 text-white shadow-sm"
                    : "text-white/60 hover:text-white"
                }`}
              >
                LA
              </button>
              <button
                onClick={() => setLang("en")}
                className={`px-2.5 py-1 text-xs font-bold rounded ${
                  lang === "en"
                    ? "bg-forest-650 text-white shadow-sm"
                    : "text-white/60 hover:text-white"
                }`}
              >
                EN
              </button>
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center space-x-3">
            {/* Language Switcher Mobile */}
            <div className="flex items-center bg-forest-950/40 rounded-lg p-0.5 border border-forest-800/60">
              <button
                onClick={() => setLang("lo")}
                className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                  lang === "lo" ? "bg-forest-650 text-white" : "text-white/60"
                }`}
              >
                LA
              </button>
              <button
                onClick={() => setLang("en")}
                className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                  lang === "en" ? "bg-forest-650 text-white" : "text-white/60"
                }`}
              >
                EN
              </button>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white/90 hover:text-white hover:bg-forest-800 focus:outline-none transition-colors"
            >
              {isOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 z-40 bg-forest-950/98 backdrop-blur-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ top: scrolled ? "65px" : "80px" }}
      >
        <div className="px-4 pt-4 pb-20 space-y-3 overflow-y-auto max-h-[calc(100vh-80px)]">
          {menuItems.map((item, idx) => (
            <a
              key={idx}
              href={item.anchor}
              onClick={(e) => handleScrollTo(e, item.anchor)}
              className="block px-3 py-3 rounded-md text-base font-bold text-white hover:bg-forest-800"
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
