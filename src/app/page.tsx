"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import dynamic from "next/dynamic";
const LeafletMap = dynamic(() => import("@/components/LeafletMap"), {
  ssr: false,
  loading: () => <div className="w-full h-[450px] bg-forest-950 rounded-3xl flex items-center justify-center text-white font-semibold">Loading Map...</div>
});
import OrgChart from "@/components/OrgChart";
import FeedbackForm from "@/components/FeedbackForm";
import { supabase } from "@/lib/supabaseClient";
import { Language, translations } from "@/data/translations";

interface NewsItem {
  id: number;
  created_at: string;
  title_lo: string;
  title_en: string;
  desc_lo: string;
  desc_en: string;
  category: string;
  date_lo: string;
  date_en: string;
  icon: string;
  image_url?: string | null;
}

export default function Home() {
  const [lang, setLang] = useState<Language>("lo");
  const [news, setNews] = useState<NewsItem[]>([]);
  const [newsLoading, setNewsLoading] = useState(true);
  const [newsError, setNewsError] = useState(false);
  const [newsFilter, setNewsFilter] = useState<string>("all");
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const t = translations[lang];

  useEffect(() => {
    async function fetchNews() {
      try {
        setNewsLoading(true);
        const { data, error } = await supabase
          .from("news")
          .select("*")
          .order("id", { ascending: false });
        if (error) throw error;
        setNews(data || []);
      } catch (err) {
        console.error("Error fetching news from Supabase:", err);
        setNewsError(true);
      } finally {
        setNewsLoading(false);
      }
    }
    fetchNews();
  }, []);

  const filteredNews = newsFilter === "all" ? news : news.filter((item) => item.category === newsFilter);

  const categories = [
    { value: "all", label: t.news.categories.all },
    { value: "spatial_planning", label: t.news.categories.spatial_planning },
    { value: "law_enforcement", label: t.news.categories.law_enforcement },
    { value: "outreach", label: t.news.categories.outreach },
    { value: "livelihood", label: t.news.categories.livelihood },
    { value: "coordination", label: t.news.categories.coordination },
    { value: "monitoring", label: t.news.categories.monitoring },
  ];

  const handleScrollTo = (anchor: string) => {
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
    <div className="flex flex-col min-h-screen">
      <Navbar lang={lang} setLang={setLang} />

      {/* 3.1 ໜ້າຫຼັກ / Hero Section */}
      <section
        id="home"
        className="relative bg-gradient-to-br from-forest-950 via-forest-900 to-emerald-950 text-white pt-28 pb-20 sm:py-32 overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-forest-500/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Column Left: Overview Text */}
            <div className="lg:col-span-6 space-y-6 animate-fade-in">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase tracking-widest">
                {t.hero.subtitle}
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white">
                {t.hero.title}
              </h1>
              <p className="text-sm sm:text-base text-forest-200 leading-relaxed font-medium">
                {t.hero.desc}
              </p>
              <div className="pt-2 flex flex-wrap gap-4">
                <button
                  onClick={() => handleScrollTo("#about")}
                  className="px-6 py-3 rounded-full text-xs sm:text-sm font-bold bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg transition-all duration-300 hover:scale-103 cursor-pointer"
                >
                  {t.hero.btnAbout}
                </button>
                <button
                  onClick={() => handleScrollTo("#contact")}
                  className="px-6 py-3 rounded-full text-xs sm:text-sm font-bold bg-transparent border border-white/30 hover:border-white text-white transition-all duration-300 cursor-pointer"
                >
                  {t.hero.btnContact}
                </button>
              </div>
            </div>

            {/* Column Right: GeoJSON Map */}
            <div className="lg:col-span-6 w-full">
              <LeafletMap lang={lang} />
            </div>
          </div>
        </div>
      </section>

      {/* 3.2 ໜ້າກ່ຽວກັບໂຄງການ (About Section) */}
      <section id="about" className="py-20 bg-forest-50/20 dark:bg-forest-950/20 border-t border-b border-forest-100/30 dark:border-forest-900/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
            <h2 className="text-xs font-black uppercase tracking-wider text-forest-500">
              {lang === "lo" ? "ຂໍ້ມູນພື້ນຖານ" : "BASIC INFORMATION"}
            </h2>
            <p className="text-2xl sm:text-3xl font-bold text-forest-900 dark:text-white leading-tight">
              {t.about.title}
            </p>
            <div className="w-16 h-1 bg-emerald-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* What is the project */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-forest-900 border border-forest-100 dark:border-forest-850 shadow-sm space-y-4">
              <h3 className="text-lg sm:text-xl font-bold text-forest-900 dark:text-white flex items-center space-x-2">
                <span className="w-1.5 h-6 bg-emerald-500 rounded-full inline-block"></span>
                <span>{t.about.whatTitle}</span>
              </h3>
              <p className="text-xs sm:text-sm text-forest-700 dark:text-forest-200 leading-relaxed font-semibold">
                {t.about.whatDesc1}
              </p>
              <p className="text-xs sm:text-sm text-forest-600 dark:text-forest-400 leading-relaxed">
                {t.about.whatDesc2}
              </p>
            </div>

            {/* Why biodiversity offset */}
            <div className="p-6 sm:p-8 rounded-3xl bg-forest-50/40 dark:bg-forest-900/20 border border-forest-100/45 dark:border-forest-800/40 space-y-4">
              <h3 className="text-lg sm:text-xl font-bold text-forest-900 dark:text-white flex items-center space-x-2">
                <span className="w-1.5 h-6 bg-emerald-500 rounded-full inline-block"></span>
                <span>{t.about.whyTitle}</span>
              </h3>
              <div className="space-y-3 text-xs sm:text-sm text-forest-750 dark:text-forest-200">
                <div className="flex items-start space-x-2.5">
                  <span className="text-emerald-500 font-bold shrink-0 mt-0.5">✓</span>
                  <p>{t.about.whyItem1}</p>
                </div>
                <div className="flex items-start space-x-2.5">
                  <span className="text-emerald-500 font-bold shrink-0 mt-0.5">✓</span>
                  <p>{t.about.whyItem2}</p>
                </div>
                <div className="flex items-start space-x-2.5">
                  <span className="text-emerald-500 font-bold shrink-0 mt-0.5">✓</span>
                  <p>{t.about.whyItem3}</p>
                </div>
                <div className="flex items-start space-x-2.5">
                  <span className="text-emerald-500 font-bold shrink-0 mt-0.5">✓</span>
                  <p>{t.about.whyItem4}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3.3 ໜ້າໂຄງຮ່າງການຄຸ້ມຄອງ (Governance Section) */}
      <section id="governance" className="py-20 bg-white dark:bg-forest-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
            <h2 className="text-xs font-black uppercase tracking-wider text-forest-500">
              {lang === "lo" ? "ການຮ່ວມມື ແລະ ຄຸ້ມຄອງ" : "COOPERATION & STEWARDSHIP"}
            </h2>
            <p className="text-2xl sm:text-3xl font-bold text-forest-900 dark:text-white leading-tight">
              {t.governance.title}
            </p>
            <div className="w-16 h-1 bg-emerald-500 mx-auto rounded-full"></div>
          </div>
          <OrgChart lang={lang} />
        </div>
      </section>

      {/* 3.4 ໜ້າກິດຈະກຳໂຄງການ (Activities Section) */}
      <section id="activities" className="py-20 bg-forest-50/20 dark:bg-forest-950/20 border-t border-b border-forest-100/30 dark:border-forest-900/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
            <h2 className="text-xs font-black uppercase tracking-wider text-forest-500">
              {lang === "lo" ? "ແຜນການຈັດຕັ້ງປະຕິບັດ" : "IMPLEMENTATION PLANS"}
            </h2>
            <p className="text-2xl sm:text-3xl font-bold text-forest-900 dark:text-white leading-tight">
              {t.activities.subtitle}
            </p>
            <div className="w-16 h-1 bg-emerald-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.activities.list.map((act, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white dark:bg-forest-900 border border-forest-100 dark:border-forest-850 shadow-sm hover:shadow-md transition-all duration-300 space-y-3"
              >
                <div className="text-3xl p-3 bg-forest-50 dark:bg-forest-950 rounded-2xl w-fit">
                  {act.icon}
                </div>
                <h4 className="text-sm sm:text-base font-bold text-forest-900 dark:text-white">
                  {act.title}
                </h4>
                <p className="text-xs sm:text-sm text-forest-600 dark:text-forest-400 leading-relaxed">
                  {act.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3.5 ໜ້າຂ່າວສານ (News Section - Supabase Connected) */}
      <section id="news" className="py-20 bg-white dark:bg-forest-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-4">
            <h2 className="text-xs font-black uppercase tracking-wider text-forest-500">
              {lang === "lo" ? "ການເຄື່ອນໄຫວຫຼ້າສຸດ" : "LATEST MOVEMENTS"}
            </h2>
            <p className="text-2xl sm:text-3xl font-bold text-forest-900 dark:text-white leading-tight">
              {t.news.title}
            </p>
            <div className="w-16 h-1 bg-emerald-500 mx-auto rounded-full"></div>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-2 pb-4 border-b border-forest-100 dark:border-forest-900 justify-center">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setNewsFilter(cat.value)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                  newsFilter === cat.value
                    ? "bg-forest-600 text-white shadow-md"
                    : "bg-forest-50 dark:bg-forest-900 text-forest-750 dark:text-forest-300 hover:bg-forest-100 dark:hover:bg-forest-800"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* News Grid */}
          {newsLoading ? (
            <div className="text-center py-16 text-forest-400 text-sm font-semibold flex items-center justify-center space-x-2">
              <svg className="animate-spin h-5 w-5 text-forest-500" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>{t.news.loading}</span>
            </div>
          ) : newsError ? (
            <div className="text-center py-16 text-red-500 text-sm font-semibold">
              ⚠️ {t.news.error}
            </div>
          ) : filteredNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredNews.map((item) => (
                <article
                  key={item.id}
                  onClick={() => setSelectedNews(item)}
                  className="bg-white dark:bg-forest-900 rounded-3xl border border-forest-100 dark:border-forest-850 overflow-hidden shadow-sm hover:shadow-md cursor-pointer hover:border-forest-300 dark:hover:border-forest-750 hover:scale-[1.015] transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="p-6 space-y-3">
                    <div className="flex justify-between items-center text-[10px] font-bold text-forest-450 uppercase tracking-wide">
                      <span>📅 {lang === "lo" ? item.date_lo : item.date_en}</span>
                      <span className="px-2 py-0.5 rounded bg-forest-50 dark:bg-forest-950 text-forest-650 dark:text-forest-300">
                        {categories.find((c) => c.value === item.category)?.label || item.category}
                      </span>
                    </div>
                    <h4 className="text-sm sm:text-base font-bold text-forest-900 dark:text-white leading-snug line-clamp-2">
                      {lang === "lo" ? item.title_lo : item.title_en}
                    </h4>
                    <p className="text-xs sm:text-sm text-forest-600 dark:text-forest-400 leading-relaxed line-clamp-4">
                      {lang === "lo" ? item.desc_lo : item.desc_en}
                    </p>
                  </div>
                  <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-forest-50 dark:border-forest-850 bg-forest-50/10 dark:bg-forest-950/10">
                    <span className="text-2xl">{item.icon}</span>
                    <button className="text-[10px] sm:text-xs font-bold text-forest-650 dark:text-forest-300 hover:underline cursor-pointer">
                      {t.news.btnMore} →
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-forest-400 text-sm">
              {t.news.noNews}
            </div>
          )}
        </div>
      </section>

      {/* 3.6 ໜ້າຕິດຕໍ່ພົວພັນ (Contact Section) */}
      <section id="contact" className="py-20 bg-forest-50/20 dark:bg-forest-950/20 border-t border-forest-100/30 dark:border-forest-900/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
            <h2 className="text-xs font-black uppercase tracking-wider text-forest-500">
              {lang === "lo" ? "ຊ່ອງທາງຕິດຕໍ່" : "GET IN TOUCH"}
            </h2>
            <p className="text-2xl sm:text-3xl font-bold text-forest-900 dark:text-white leading-tight">
              {t.contact.title}
            </p>
            <div className="w-16 h-1 bg-emerald-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Address, email, phone, Facebook */}
            <div className="lg:col-span-5 space-y-6">
              <h4 className="text-base sm:text-lg font-bold text-forest-900 dark:text-white">
                {t.contact.addressTitle}
              </h4>
              <div className="p-6 rounded-3xl bg-white dark:bg-forest-900 border border-forest-100 dark:border-forest-850 shadow-sm space-y-6">
                
                {/* Office Location */}
                <div className="flex items-start space-x-3.5">
                  <div className="text-2xl p-2.5 bg-forest-50 dark:bg-forest-950 rounded-xl shrink-0">
                    🏛️
                  </div>
                  <div className="space-y-1">
                    <h5 className="font-bold text-xs sm:text-sm text-forest-900 dark:text-white">
                      {lang === "lo" ? "ໜ່ວຍງານ BOMU ແຂວງບໍລິຄຳໄຊ" : "BOMU Office Bolikhamxay"}
                    </h5>
                    <p className="text-[11px] sm:text-xs text-forest-600 dark:text-forest-400 leading-relaxed">
                      {t.contact.addressDesc}
                    </p>
                  </div>
                </div>

                {/* Email Address */}
                <div className="flex items-start space-x-3.5">
                  <div className="text-2xl p-2.5 bg-forest-50 dark:bg-forest-950 rounded-xl shrink-0">
                    📧
                  </div>
                  <div className="space-y-1">
                    <h5 className="font-bold text-xs sm:text-sm text-forest-900 dark:text-white">
                      {t.contact.email}
                    </h5>
                    <p className="text-[11px] sm:text-xs text-forest-600 dark:text-forest-400">
                      ncnx.bio@gmail.com
                    </p>
                  </div>
                </div>

                {/* Telephone */}
                <div className="flex items-start space-x-3.5">
                  <div className="text-2xl p-2.5 bg-forest-50 dark:bg-forest-950 rounded-xl shrink-0">
                    📞
                  </div>
                  <div className="space-y-1">
                    <h5 className="font-bold text-xs sm:text-sm text-forest-900 dark:text-white">
                      {t.contact.tel}
                    </h5>
                    <p className="text-[11px] sm:text-xs text-forest-600 dark:text-forest-400">
                      {t.contact.telValue}
                    </p>
                  </div>
                </div>

                {/* Facebook or other social links */}
                <div className="flex items-start space-x-3.5">
                  <div className="text-2xl p-2.5 bg-forest-50 dark:bg-forest-950 rounded-xl shrink-0">
                    📱
                  </div>
                  <div className="space-y-1">
                    <h5 className="font-bold text-xs sm:text-sm text-forest-900 dark:text-white">
                      {t.contact.social}
                    </h5>
                    <a 
                      href="https://www.facebook.com/profile.php?id=61590520657822"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] sm:text-xs text-emerald-600 dark:text-emerald-400 font-semibold hover:underline block"
                    >
                      facebook.com/namchouannamsang.offset
                    </a>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Column: Visitor feedback form */}
            <div className="lg:col-span-7">
              <FeedbackForm lang={lang} />
            </div>
          </div>
        </div>
      </section>

      <Footer lang={lang} />

      {/* News Detail Modal */}
      {selectedNews && (
        <div 
          className="fixed inset-0 z-[1000] bg-forest-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedNews(null)}
        >
          <div 
            className="relative bg-white dark:bg-forest-900 border border-forest-100 dark:border-forest-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl p-6 sm:p-8 max-h-[85vh] overflow-y-auto space-y-6 animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Cross Button */}
            <button
              onClick={() => setSelectedNews(null)}
              className="absolute top-4 right-4 text-forest-400 hover:text-forest-900 dark:hover:text-white text-xl p-2 cursor-pointer transition-colors"
            >
              ✕
            </button>

            {/* Header Metadata */}
            <div className="flex justify-between items-center text-xs font-bold text-forest-450 uppercase tracking-wide border-b border-forest-50 dark:border-forest-850 pb-4 pr-10">
              <span className="px-3 py-1 rounded bg-forest-50 dark:bg-forest-950 text-forest-650 dark:text-forest-300 text-[10px] sm:text-xs font-semibold">
                {categories.find((c) => c.value === selectedNews.category)?.label || selectedNews.category}
              </span>
              <span>📅 {lang === "lo" ? selectedNews.date_lo : selectedNews.date_en}</span>
            </div>

            {/* News Icon & Title */}
            <div className="flex items-start space-x-4">
              <span className="text-4xl shrink-0 p-3 bg-forest-50 dark:bg-forest-950 rounded-2xl">
                {selectedNews.icon}
              </span>
              <h3 className="text-lg sm:text-2xl font-black text-forest-900 dark:text-white leading-snug">
                {lang === "lo" ? selectedNews.title_lo : selectedNews.title_en}
              </h3>
            </div>

            {/* News Image if present */}
            {selectedNews.image_url && (
              <div className="relative group cursor-zoom-in rounded-2xl overflow-hidden border border-forest-100 dark:border-forest-800 bg-forest-950/10 dark:bg-forest-950/40 p-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={selectedNews.image_url} 
                  alt="news" 
                  className="w-full h-auto max-h-[420px] object-contain mx-auto block hover:opacity-95 transition-opacity"
                  onClick={() => setIsLightboxOpen(true)}
                />
                <div 
                  className="absolute bottom-4 right-4 bg-forest-900/80 backdrop-blur-md text-white text-[10px] px-2.5 py-1 rounded-md border border-forest-750/30 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                >
                  🔍 {lang === "lo" ? "ຄລິກເພື່ອເບິ່ງຮູບໃຫຍ່" : "Click to zoom"}
                </div>
              </div>
            )}

            {/* Description Text */}
            <div className="text-xs sm:text-sm text-forest-750 dark:text-forest-200 leading-relaxed space-y-4 whitespace-pre-wrap">
              {lang === "lo" ? selectedNews.desc_lo : selectedNews.desc_en}
            </div>

            {/* Bottom Close Button */}
            <div className="pt-4 border-t border-forest-50 dark:border-forest-850 flex justify-end">
              <button
                onClick={() => setSelectedNews(null)}
                className="px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold bg-forest-600 hover:bg-forest-500 text-white transition-colors cursor-pointer"
              >
                {lang === "lo" ? "ປິດ" : "Close"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Lightbox Modal */}
      {isLightboxOpen && selectedNews && selectedNews.image_url && (
        <div 
          className="fixed inset-0 z-[2000] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4 animate-fade-in cursor-zoom-out"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Close button */}
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 text-white/70 hover:text-white text-2xl p-2 cursor-pointer transition-colors bg-white/10 hover:bg-white/20 rounded-full w-12 h-12 flex items-center justify-center border border-white/10"
          >
            ✕
          </button>
          
          {/* Fullscreen Image Container */}
          <div className="relative max-w-5xl max-h-[90vh] flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={selectedNews.image_url} 
              alt="zoom-news" 
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl animate-scale-up cursor-zoom-out"
              onClick={() => setIsLightboxOpen(false)}
            />
            {/* Image caption */}
            <p className="text-white/85 text-xs sm:text-sm font-semibold mt-4 text-center max-w-2xl px-4 select-none bg-forest-900/60 backdrop-blur-md py-2 px-4 rounded-xl border border-forest-800">
              {lang === "lo" ? selectedNews.title_lo : selectedNews.title_en}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
