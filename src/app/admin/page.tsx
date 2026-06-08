"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

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

export default function AdminPage() {
  const [passcode, setPasscode] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [authError, setAuthError] = useState("");
  
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Tabs & Contacts states
  const [adminTab, setAdminTab] = useState<'news' | 'contacts'>('news');
  const [contacts, setContacts] = useState<any[]>([]);
  const [contactsLoading, setContactsLoading] = useState(false);

  // Form states
  const [editingItem, setEditingItem] = useState<NewsItem | null>(null);
  const [titleLo, setTitleLo] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [descLo, setDescLo] = useState("");
  const [descEn, setDescEn] = useState("");
  const [category, setCategory] = useState("spatial_planning");
  const [dateLo, setDateLo] = useState("");
  const [dateEn, setDateEn] = useState("");
  const [icon, setIcon] = useState("🥾");
  const [imageUrl, setImageUrl] = useState("");

  // Categories list
  const categories = [
    { value: "spatial_planning", labelLo: "🗺️ ການວາງແຜນພື້ນທີ່ (Spatial Planning)", labelEn: "Spatial Planning" },
    { value: "law_enforcement", labelLo: "🥾 ການບັງຄັບໃຊ້ກົດໝາຍ (Law Enforcement)", labelEn: "Law Enforcement" },
    { value: "outreach", labelLo: "📢 ການໂຄສະນາເຜີຍແຜ່ ແລະ ປູກຈິດສຳນຶກ (Outreach)", labelEn: "Outreach & Awareness" },
    { value: "livelihood", labelLo: "🎓 ການພັດທະນາຊີວິດການເປັນທີ່ເຊື່ອມໂຍງກັບການອະນຸລັກ (Livelihood)", labelEn: "Livelihood link conservation" },
    { value: "coordination", labelLo: "🤝 ການປະສານງານ ແລະ ການຮ່ວມງານ (Coordination)", labelEn: "Coordination" },
    { value: "monitoring", labelLo: "📊 ການຕິດຕາມກວດກາ (Monitoring)", labelEn: "Monitoring" },
  ];

  // Emojis list
  const emojis = ["🥾", "🎓", "🤝", "🐘", "🌱", "📢", "🚨", "🌳", "🏕️", "🗺️", "🐆", "🐻"];

  // Authenticate session with passcode
  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === "bomu2026" || passcode === "admin123") {
      setIsAuthorized(true);
      setAuthError("");
      localStorage.setItem("bomu_admin_auth", "true");
    } else {
      setAuthError("ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ! Invalid passcode!");
    }
  };

  useEffect(() => {
    const isAuthed = localStorage.getItem("bomu_admin_auth");
    if (isAuthed === "true") {
      setIsAuthorized(true);
    }
  }, []);

  // Fetch news when authorized
  useEffect(() => {
    if (!isAuthorized) return;

    async function fetchNews() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("news")
          .select("*")
          .order("id", { ascending: false });
        if (error) throw error;
        setNews(data || []);
      } catch (err: any) {
        console.error("Error fetching news:", err);
        setError(err.message || "Failed to load news");
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, [isAuthorized]);

  // Fetch contacts when authorized or tab switches
  useEffect(() => {
    if (!isAuthorized) return;

    async function fetchContacts() {
      try {
        setContactsLoading(true);
        const { data, error } = await supabase
          .from("contacts")
          .select("*")
          .order("id", { ascending: false });
        if (error) throw error;
        setContacts(data || []);
      } catch (err: any) {
        console.error("Error fetching contacts:", err);
      } finally {
        setContactsLoading(false);
      }
    }

    fetchContacts();
  }, [isAuthorized, adminTab]);

  const handleDeleteContact = async (id: number) => {
    if (!window.confirm("ທ່ານຕ້ອງການລົບຂໍ້ຄວາມນີ້ແທ້ບໍ່? Are you sure you want to delete this message?")) return;

    try {
      setActionLoading(true);
      setError("");
      setSuccessMsg("");

      const { error } = await supabase
        .from("contacts")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setContacts(contacts.filter(c => c.id !== id));
      setSuccessMsg("ລົບຂໍ້ຄວາມສຳເລັດ! Message deleted successfully!");
    } catch (err: any) {
      console.error("Error deleting contact:", err);
      setError(err.message || "Failed to delete message");
    } finally {
      setActionLoading(false);
    }
  };

  // Handle Edit selection
  const startEdit = (item: NewsItem) => {
    setEditingItem(item);
    setTitleLo(item.title_lo);
    setTitleEn(item.title_en);
    setDescLo(item.desc_lo);
    setDescEn(item.desc_en);
    setCategory(item.category);
    setDateLo(item.date_lo);
    setDateEn(item.date_en);
    setIcon(item.icon);
    setImageUrl(item.image_url || "");
    setError("");
    setSuccessMsg("");
    // Scroll to form
    document.getElementById("news-form")?.scrollIntoView({ behavior: "smooth" });
  };

  // Reset form
  const resetForm = () => {
    setEditingItem(null);
    setTitleLo("");
    setTitleEn("");
    setDescLo("");
    setDescEn("");
    setCategory("spatial_planning");
    setDateLo("");
    setDateEn("");
    setIcon("🥾");
    setImageUrl("");
    setError("");
  };

  // Create or Update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleLo || !titleEn || !descLo || !descEn || !dateLo || !dateEn) {
      setError("กรุณากรอกข้อมูลให้ครบถ้วน / Please fill out all required fields.");
      return;
    }

    try {
      setActionLoading(true);
      setError("");
      setSuccessMsg("");

      const payload = {
        title_lo: titleLo,
        title_en: titleEn,
        desc_lo: descLo,
        desc_en: descEn,
        category,
        date_lo: dateLo,
        date_en: dateEn,
        icon,
        image_url: imageUrl || null,
      };

      if (editingItem) {
        // Update
        const { data, error } = await supabase
          .from("news")
          .update(payload)
          .eq("id", editingItem.id)
          .select();

        if (error) throw error;

        setNews(news.map(n => n.id === editingItem.id ? { ...n, ...payload } : n));
        setSuccessMsg("ແກ້ໄຂຂ່າວສຳເລັດ! News article updated successfully!");
      } else {
        // Insert
        const { data, error } = await supabase
          .from("news")
          .insert([payload])
          .select();

        if (error) throw error;

        if (data && data[0]) {
          setNews([data[0], ...news]);
        }
        setSuccessMsg("ເພີ່ມຂ່າວສຳເລັດ! News article added successfully!");
      }

      resetForm();
    } catch (err: any) {
      console.error("Error saving news:", err);
      setError(err.message || "Failed to save news article");
    } finally {
      setActionLoading(false);
    }
  };

  // Delete
  const handleDelete = async (id: number) => {
    if (!window.confirm("ທ່ານຕ້ອງການລົບຂ່າວນີ້ແທ້ບໍ່? Are you sure you want to delete this article?")) return;

    try {
      setActionLoading(true);
      setError("");
      setSuccessMsg("");

      const { error } = await supabase
        .from("news")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setNews(news.filter(n => n.id !== id));
      setSuccessMsg("ລົບຂ່າວສຳເລັດ! News article deleted successfully!");
      if (editingItem?.id === id) {
        resetForm();
      }
    } catch (err: any) {
      console.error("Error deleting news:", err);
      setError(err.message || "Failed to delete news article");
    } finally {
      setActionLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("bomu_admin_auth");
    setIsAuthorized(false);
    setPasscode("");
  };

  // Auth Screen
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-forest-950 text-white flex flex-col items-center justify-center p-4">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="admin-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#admin-grid)" />
          </svg>
        </div>

        <div className="w-full max-w-md p-8 rounded-3xl bg-forest-900/60 border border-forest-800 backdrop-blur-md shadow-2xl space-y-6 relative z-10">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto text-3xl">
              🛡️
            </div>
            <h1 className="text-xl sm:text-2xl font-black">ລະບົບຈັດການຂໍ້ມູນຂ່າວສານ</h1>
            <p className="text-xs text-forest-300">BOMU news & Activities Admin Portal</p>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-forest-300">ລະຫັດຜ່ານ (Admin Passcode)</label>
              <input
                type="password"
                placeholder="••••••••"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-forest-950 border border-forest-800 text-white placeholder-forest-700 focus:outline-none focus:border-emerald-500 text-sm"
                required
              />
            </div>

            {authError && (
              <p className="text-xs text-red-400 font-semibold bg-red-950/40 border border-red-900/30 p-2.5 rounded-lg text-center">
                {authError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold transition-colors cursor-pointer text-sm"
            >
              ເຂົ້າສູ່ລະບົບ / Access Portal
            </button>
          </form>

          <div className="text-center pt-2">
            <a href="/" className="text-xs text-forest-400 hover:text-white transition-colors">
              ← ກັບຄືນໜ້າຫຼັກ / Back to Website
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-forest-950 text-white">
      {/* Header Banner */}
      <header className="border-b border-forest-900 bg-forest-900/40 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">🛡️</span>
            <div>
              <h1 className="text-sm sm:text-base font-black">BOMU Admin Dashboard</h1>
              <p className="text-[10px] text-forest-400">ລະບົບຄຸ້ມຄອງຂ່າວສານ Supabase</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <a 
              href="/"
              className="px-3.5 py-1.5 rounded-lg border border-forest-850 bg-forest-950 hover:bg-forest-900 text-[10px] sm:text-xs font-bold transition-all"
            >
              🌐 ເຂົ້າເວັບໄຊ / View Site
            </a>
            <button
              onClick={handleLogout}
              className="px-3.5 py-1.5 rounded-lg bg-red-650 hover:bg-red-500 text-[10px] sm:text-xs font-bold transition-all cursor-pointer"
            >
              🔒 ອອກຈາກລະບົບ / Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
        {/* Navigation Tabs */}
        <div className="flex border-b border-forest-900 gap-4">
          <button
            onClick={() => setAdminTab("news")}
            className={`pb-3 px-2 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
              adminTab === "news"
                ? "border-emerald-500 text-white"
                : "border-transparent text-forest-400 hover:text-forest-200"
            }`}
          >
            📰 ຈັດການຂ່າວສານ / Manage News
          </button>
          <button
            onClick={() => setAdminTab("contacts")}
            className={`pb-3 px-2 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
              adminTab === "contacts"
                ? "border-emerald-500 text-white"
                : "border-transparent text-forest-400 hover:text-forest-200"
            }`}
          >
            📥 ຂໍ້ຄວາມຕິດຕໍ່ / Contact Messages ({contacts.length})
          </button>
        </div>

        {/* Alerts */}
        {error && (
          <div className="p-4 rounded-2xl bg-red-950/40 border border-red-900/40 text-red-300 text-xs sm:text-sm font-semibold">
            ⚠️ ຂໍ້ຜິດພາດ: {error}
          </div>
        )}
        {successMsg && (
          <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-900/40 text-emerald-350 text-xs sm:text-sm font-semibold">
            ✅ ສຳເລັດ: {successMsg}
          </div>
        )}

        {adminTab === "news" ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Form to Add/Edit (45%) */}
            <div id="news-form" className="lg:col-span-5 bg-forest-900/30 border border-forest-900 rounded-3xl p-6 space-y-6">
              <div className="border-b border-forest-900 pb-3 flex justify-between items-center">
                <h2 className="text-base sm:text-lg font-bold text-white flex items-center space-x-2">
                  <span className="w-1.5 h-6 bg-emerald-500 rounded-full inline-block"></span>
                  <span>{editingItem ? "✏️ ແກ້ໄຂຂໍ້ມູນຂ່າວ" : "➕ ເພີ່ມຂ່າວສານໃໝ່"}</span>
                </h2>
                {editingItem && (
                  <button
                    onClick={resetForm}
                    className="text-xs text-forest-400 hover:text-white"
                  >
                    ยกเลิก / Cancel
                  </button>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Lao Title */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-forest-300">ຫົວຂໍ້ຂ່າວ (ພາສາລາວ) *</label>
                  <input
                    type="text"
                    placeholder="ໃສ່ຫົວຂໍ້ຂ່າວພາສາລາວ..."
                    value={titleLo}
                    onChange={(e) => setTitleLo(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-forest-950 border border-forest-850 text-white placeholder-forest-750 focus:outline-none focus:border-emerald-500 text-xs sm:text-sm"
                    required
                  />
                </div>

                {/* English Title */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-forest-300">News Title (English) *</label>
                  <input
                    type="text"
                    placeholder="Enter English news title..."
                    value={titleEn}
                    onChange={(e) => setTitleEn(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-forest-950 border border-forest-850 text-white placeholder-forest-750 focus:outline-none focus:border-emerald-500 text-xs sm:text-sm"
                    required
                  />
                </div>

                {/* Lao Desc */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-forest-300">ເນື້ອໃນຂ່າວສັງເຂບ (ພາສາລາວ) *</label>
                  <textarea
                    rows={4}
                    placeholder="ໃສ່ລາຍລະອຽດຂ່າວສັງເຂບ..."
                    value={descLo}
                    onChange={(e) => setDescLo(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-forest-950 border border-forest-850 text-white placeholder-forest-750 focus:outline-none focus:border-emerald-500 text-xs sm:text-sm"
                    required
                  />
                </div>

                {/* English Desc */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-forest-300">News Description (English) *</label>
                  <textarea
                    rows={4}
                    placeholder="Enter English news description..."
                    value={descEn}
                    onChange={(e) => setDescEn(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-forest-950 border border-forest-850 text-white placeholder-forest-750 focus:outline-none focus:border-emerald-500 text-xs sm:text-sm"
                    required
                  />
                </div>

                {/* Category */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-forest-300">ໝວດໝູ່ / Category *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-forest-950 border border-forest-850 text-white focus:outline-none focus:border-emerald-500 text-xs sm:text-sm"
                  >
                    {categories.map((c) => (
                      <option key={c.value} value={c.value} className="bg-forest-950 text-white">
                        {c.labelLo}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Lao Date */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-forest-300">ວັນທີ (ພາສາລາວ) *</label>
                    <input
                      type="text"
                      placeholder="ເຊັ່ນ: 07 ມິຖຸນາ 2026"
                      value={dateLo}
                      onChange={(e) => setDateLo(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-forest-950 border border-forest-850 text-white placeholder-forest-750 focus:outline-none focus:border-emerald-500 text-xs"
                      required
                    />
                  </div>

                  {/* English Date */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-forest-300">Date (English) *</label>
                    <input
                      type="text"
                      placeholder="e.g. 07 June 2026"
                      value={dateEn}
                      onChange={(e) => setDateEn(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-forest-950 border border-forest-850 text-white placeholder-forest-750 focus:outline-none focus:border-emerald-500 text-xs"
                      required
                    />
                  </div>
                </div>

                {/* Icon Picker */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-forest-300 block">ເລືອກ Icon ສະແດງຂ່າວ / Icon *</label>
                  <div className="flex flex-wrap gap-2">
                    {emojis.map((em) => (
                      <button
                        key={em}
                        type="button"
                        onClick={() => setIcon(em)}
                        className={`text-lg p-2.5 rounded-xl border transition-all ${
                          icon === em
                            ? "bg-emerald-500/20 border-emerald-500 text-white scale-110 shadow-md"
                            : "bg-forest-950 border-forest-850 text-forest-400 hover:border-forest-700"
                        }`}
                      >
                        {em}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Image URL */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-forest-300">ຮູບພາບປະກອບ (Image URL - Optional)</label>
                  <input
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-forest-950 border border-forest-850 text-white placeholder-forest-750 focus:outline-none focus:border-emerald-500 text-xs sm:text-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={actionLoading}
                  className="w-full py-3 mt-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:bg-forest-800 text-white font-bold transition-all shadow-md text-xs sm:text-sm cursor-pointer"
                >
                  {actionLoading 
                    ? "ກຳລັງປະມວນຜົນ / Processing..." 
                    : editingItem 
                      ? "ບັນທຶກການແກ້ໄຂ / Save Changes" 
                      : "ເພີ່ມຂ່າວສານ / Add News Article"
                  }
                </button>
              </form>
            </div>

            {/* Right Column: List of News Articles (55%) */}
            <div className="lg:col-span-7 space-y-4">
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center space-x-2">
                <span className="w-1.5 h-6 bg-emerald-500 rounded-full inline-block"></span>
                <span>📰 ລາຍການຂ່າວທັງໝົດ ({news.length} ລາຍການ)</span>
              </h2>

              {loading ? (
                <div className="p-16 text-center text-forest-400 text-sm font-semibold flex items-center justify-center space-x-2">
                  <svg className="animate-spin h-6 w-6 text-emerald-400" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>ກຳລັງໂຫຼດຂ່າວສານ... Loading articles...</span>
                </div>
              ) : news.length === 0 ? (
                <div className="p-16 text-center text-forest-450 border border-dashed border-forest-800 rounded-3xl text-sm">
                  ບໍ່ມີຂໍ້ມູນຂ່າວສານໃນລະບົບ / No news articles found.
                </div>
              ) : (
                <div className="space-y-4 max-h-[750px] overflow-y-auto pr-1">
                  {news.map((item) => (
                    <div
                      key={item.id}
                      className={`p-5 rounded-3xl bg-forest-900/20 border transition-all ${
                        editingItem?.id === item.id 
                          ? "border-emerald-500/80 bg-emerald-950/10 shadow-lg" 
                          : "border-forest-900 bg-forest-900/20 hover:border-forest-800"
                      } flex flex-col sm:flex-row justify-between gap-4`}
                    >
                      <div className="flex gap-4">
                        <div className="text-3xl shrink-0 p-3 bg-forest-950 border border-forest-850 rounded-2xl h-fit">
                          {item.icon}
                        </div>
                        <div className="space-y-2">
                          <div className="flex flex-wrap gap-2 items-center text-[10px] font-bold text-forest-400">
                            <span className="px-2 py-0.5 rounded bg-forest-950">
                              {categories.find(c => c.value === item.category)?.labelEn || item.category}
                            </span>
                            <span>📅 {item.date_lo} / {item.date_en}</span>
                          </div>
                          <div className="space-y-1">
                            <h4 className="font-bold text-xs sm:text-sm text-white line-clamp-1">
                              Lao: {item.title_lo}
                            </h4>
                            <h4 className="font-bold text-xs sm:text-sm text-forest-200 line-clamp-1 italic">
                              Eng: {item.title_en}
                            </h4>
                            <p className="text-[11px] text-forest-400 line-clamp-2 mt-1">
                              {item.desc_lo}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex sm:flex-col justify-end gap-2 border-t sm:border-t-0 border-forest-900 pt-3 sm:pt-0 shrink-0">
                        <button
                          onClick={() => startEdit(item)}
                          className="flex-1 sm:flex-initial px-3 py-1.5 rounded-lg border border-forest-800 bg-forest-950 hover:bg-forest-900 text-[10px] sm:text-xs font-bold text-emerald-450 hover:text-emerald-400 flex items-center justify-center gap-1 cursor-pointer"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          disabled={actionLoading}
                          className="flex-1 sm:flex-initial px-3 py-1.5 rounded-lg border border-red-900 bg-red-950/20 hover:bg-red-950 text-[10px] sm:text-xs font-bold text-red-400 hover:text-red-300 flex items-center justify-center gap-1 cursor-pointer"
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <h2 className="text-base sm:text-lg font-bold text-white flex items-center space-x-2">
              <span className="w-1.5 h-6 bg-emerald-500 rounded-full inline-block"></span>
              <span>📥 ລາຍການຂໍ້ຄວາມຕິດຕໍ່ ({contacts.length} ຂໍ້ຄວາມ)</span>
            </h2>

            {contactsLoading ? (
              <div className="p-16 text-center text-forest-400 text-sm font-semibold flex items-center justify-center space-x-2">
                <svg className="animate-spin h-6 w-6 text-emerald-400" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>ກຳລັງໂຫຼດຂໍ້ຄວາມ... Loading messages...</span>
              </div>
            ) : contacts.length === 0 ? (
              <div className="p-16 text-center text-forest-450 border border-dashed border-forest-800 rounded-3xl text-sm">
                ບໍ່ມີຂໍ້ຄວາມຕິດຕໍ່ໃນລະບົບ / No contact submissions found.
              </div>
            ) : (
              <div className="space-y-4">
                {contacts.map((item) => (
                  <div
                    key={item.id}
                    className="p-6 rounded-3xl bg-forest-900/20 border border-forest-900 hover:border-forest-850 flex flex-col sm:flex-row justify-between items-start gap-4"
                  >
                    <div className="space-y-3 w-full">
                      <div className="flex flex-wrap gap-x-4 gap-y-1 items-center text-[10px] sm:text-xs font-bold">
                        <span className="text-white text-sm">👤 {item.name}</span>
                        <span className="text-emerald-450 font-semibold bg-emerald-950/20 border border-emerald-900/10 px-2.5 py-0.5 rounded-lg">
                          📞 {item.contact}
                        </span>
                        <span className="text-forest-450">📅 {new Date(item.created_at).toLocaleString('lo-LA')}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-forest-200 leading-relaxed bg-forest-950/40 p-4 rounded-2xl border border-forest-900 whitespace-pre-wrap">
                        {item.message}
                      </p>
                    </div>

                    <div className="flex sm:flex-col justify-end shrink-0 w-full sm:w-auto">
                      <button
                        onClick={() => handleDeleteContact(item.id)}
                        disabled={actionLoading}
                        className="w-full sm:w-auto px-4 py-2 rounded-xl border border-red-900 bg-red-950/20 hover:bg-red-950 text-[10px] sm:text-xs font-bold text-red-400 hover:text-red-300 flex items-center justify-center gap-1 cursor-pointer transition-colors"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
