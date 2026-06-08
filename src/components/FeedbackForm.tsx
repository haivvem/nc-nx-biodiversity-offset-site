"use client";

import React, { useState } from "react";
import { Language, translations } from "@/data/translations";
import { supabase } from "@/lib/supabaseClient";

interface FeedbackFormProps {
  lang: Language;
}

export default function FeedbackForm({ lang }: FeedbackFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    message: "",
  });

  const t = translations[lang].contact;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { error: insertError } = await supabase
        .from("contacts")
        .insert([
          {
            name: formData.name,
            contact: formData.contact,
            message: formData.message,
          }
        ]);

      if (insertError) throw insertError;
      
      setSubmitted(true);
      setFormData({
        name: "",
        contact: "",
        message: "",
      });
    } catch (err: any) {
      console.error("Error submitting contact form:", err);
      setError(
        lang === "lo" 
          ? "ເກີດຂໍ້ຜິດພາດໃນການສົ່ງຂໍ້ມູນ. ກະລຸນາລອງໃໝ່ອີກຄັ້ງ." 
          : "Failed to send message. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-white dark:bg-forest-900/40 p-6 md:p-8 rounded-3xl border border-forest-100 dark:border-forest-850 shadow-md">
      <h3 className="text-lg font-bold text-forest-900 dark:text-white mb-2">{t.formTitle}</h3>
      <p className="text-xs text-forest-500 mb-6">{t.formDesc}</p>

      {submitted ? (
        <div className="text-center py-8 space-y-4 animate-fade-in">
          <div className="w-16 h-16 bg-emerald-100 dark:bg-forest-950 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto text-3xl shadow-inner font-bold">
            ✓
          </div>
          <h4 className="text-lg font-bold text-forest-900 dark:text-white">{t.successTitle}</h4>
          <p className="text-xs text-forest-550 dark:text-forest-400 max-w-sm mx-auto leading-relaxed">
            {t.successDesc}
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-2 px-5 py-2 rounded-full text-xs font-bold bg-forest-650 hover:bg-forest-550 text-white transition-colors"
          >
            {t.btnNew}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <p className="text-xs text-red-500 font-semibold bg-red-950/20 border border-red-900/10 p-2.5 rounded-lg text-center animate-fade-in">
              ⚠️ {error}
            </p>
          )}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-forest-750 dark:text-forest-300 uppercase tracking-wide">
              {t.labelName}
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder={t.placeholderName}
              className="w-full px-4 py-2 text-xs bg-forest-50/40 dark:bg-forest-950/20 border border-forest-100 dark:border-forest-850 rounded-xl focus:ring-2 focus:ring-forest-500 focus:border-forest-500 outline-none text-forest-850 dark:text-white transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-forest-750 dark:text-forest-300 uppercase tracking-wide">
              {t.labelContact}
            </label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              required
              placeholder={t.placeholderContact}
              className="w-full px-4 py-2 text-xs bg-forest-50/40 dark:bg-forest-950/20 border border-forest-100 dark:border-forest-850 rounded-xl focus:ring-2 focus:ring-forest-500 focus:border-forest-500 outline-none text-forest-850 dark:text-white transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-forest-750 dark:text-forest-300 uppercase tracking-wide">
              {t.labelMessage}
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              placeholder={t.placeholderMessage}
              className="w-full px-4 py-2.5 text-xs bg-forest-50/40 dark:bg-forest-950/20 border border-forest-100 dark:border-forest-850 rounded-xl focus:ring-2 focus:ring-forest-500 focus:border-forest-500 outline-none text-forest-850 dark:text-white transition-all resize-y"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-forest-600 to-emerald-600 hover:from-forest-500 hover:to-emerald-500 shadow-md transition-all duration-300 disabled:opacity-50"
          >
            {loading ? t.btnSubmitting : t.btnSubmit}
          </button>
        </form>
      )}
    </div>
  );
}
