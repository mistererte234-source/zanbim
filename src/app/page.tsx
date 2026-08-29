"use client";

import Link from "next/link";
import { Sparkles, Target, ArrowRight, ShieldCheck, Zap, TrendingUp, CheckCircle, Flame } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center py-6 sm:py-12 px-2 sm:px-4 gap-10 sm:gap-16 max-w-6xl mx-auto">
      
      {/* Hero Section */}
      <section className="text-center flex flex-col items-center gap-4 sm:gap-6 relative w-full">
        {/* Glow backdrop */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-60 sm:w-72 h-60 sm:h-72 bg-cyan-500/15 rounded-full blur-[100px] pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-[11px] sm:text-xs font-semibold tracking-wide shadow-glow">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
          Enterprise Adaptive Platform v3.0
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white max-w-4xl leading-[1.2]">
          Bukan bank soal biasa. <br />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent">
            AI Asesmen Presisi Tinggi.
          </span>
        </h1>

        <p className="text-sm sm:text-lg text-zinc-300 max-w-2xl font-normal leading-relaxed px-2">
          ZanBimbel mengukur posisi Anda vs target, mendeteksi kenapa masih berjarak, lalu memberikan latihan adaptif + cara penyelesaian sampai celah kompetensi tertutup.
        </p>

        {/* 5 Track Quick Badges */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 max-w-lg mt-1">
          {["🎓 UTBK SNBT", "🏛️ CPNS SKD", "💼 HRD IQ", "🏛️ DEWAN RI", "🎓 DOSEN PTN"].map((t) => (
            <span key={t} className="px-2.5 py-1 rounded-lg bg-zinc-900/80 border border-zinc-800 text-[11px] font-bold text-zinc-300">
              {t}
            </span>
          ))}
        </div>

        {/* CTA Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mt-4 w-full sm:w-auto px-4 sm:px-0">
          <Link
            href="/onboarding"
            className="w-full sm:w-auto px-8 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 text-white font-bold text-sm sm:text-base shadow-glow active:scale-[0.985] hover:opacity-95 transition-all flex items-center justify-center gap-2 group"
          >
            Mulai Tes Diagnosis
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/dashboard"
            className="w-full sm:w-auto px-8 py-3.5 sm:py-4 rounded-2xl glass-panel text-zinc-200 font-semibold text-sm sm:text-base hover:bg-zinc-800/80 active:scale-[0.985] transition-all flex items-center justify-center gap-2"
          >
            Masuk Dashboard
          </Link>
        </div>

        {/* Anti-Claims Notice */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mt-4 text-[11px] sm:text-xs text-zinc-400 bg-zinc-900/40 px-3.5 py-2 rounded-xl border border-zinc-800/60">
          <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Soal HOTS Terverifikasi</span>
          <span className="hidden xs:inline">•</span>
          <span>Pedagogi Adaptif</span>
          <span className="hidden xs:inline">•</span>
          <span>Tanpa Janji Palsu</span>
        </div>
      </section>

      {/* 4 Pertanyaan Produk Section */}
      <section className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[
          {
            num: "01",
            q: "Saya di mana?",
            desc: "Ukur Indeks Kemampuan (200-800), Skor SKD, IQ HRD, & Kelayakan Dewan secara transparan.",
            icon: Target,
            color: "text-indigo-400",
            border: "border-indigo-500/20",
          },
          {
            num: "02",
            q: "Saya lemah di apa, dan kenapa?",
            desc: "Identifikasi 3 skill gap utama beserta jebakan berpikir (traps) yang merusak skor.",
            icon: Zap,
            color: "text-cyan-400",
            border: "border-cyan-500/20",
          },
          {
            num: "03",
            q: "Saya harus apa hari ini?",
            desc: "Dapatkan Misi Harian fokus 1 skill gap tanpa perlu bingung memilih bank soal.",
            icon: Flame,
            color: "text-amber-400",
            border: "border-amber-500/20",
          },
          {
            num: "04",
            q: "Saya benar-benar naik?",
            desc: "Bukti konkrit melalui varian isomorfik (Type A) & tryout replikasi tanpa halusinasi.",
            icon: TrendingUp,
            color: "text-emerald-400",
            border: "border-emerald-500/20",
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className={`glass-panel p-5 sm:p-6 rounded-2xl border ${item.border} flex flex-col gap-2.5`}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-zinc-500 font-bold">{item.num}</span>
              <item.icon className={`w-5 h-5 ${item.color}`} />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white leading-snug">{item.q}</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* Free vs Pro Comparison */}
      <section className="w-full glass-panel p-5 sm:p-8 rounded-3xl border border-zinc-800/80 flex flex-col gap-5 sm:gap-6">
        <div className="text-center flex flex-col gap-1.5">
          <h2 className="text-xl sm:text-2xl font-bold text-white">Kedalaman Personalisasi Belajar</h2>
          <p className="text-xs sm:text-sm text-zinc-400">Free memberikan gambaran nyata. Pro memberikan akselerasi tanpa batas.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Free Tier */}
          <div className="p-5 sm:p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex flex-col gap-4">
            <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
              <h3 className="font-bold text-white text-base sm:text-lg">ZanBimbel Free</h3>
              <span className="text-xs px-2.5 py-0.5 rounded bg-zinc-800 text-zinc-300 font-mono">Starter</span>
            </div>
            <ul className="space-y-2 text-xs text-zinc-300">
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" /> 1x Tes Diagnosis per Track</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" /> 10 Soal Drill Harian</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" /> 3 Pembahasan Penuh / Hari</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" /> Mini Tryout 25-30 Soal / Minggu</li>
            </ul>
          </div>

          {/* Pro Tier */}
          <div className="p-5 sm:p-6 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 flex flex-col gap-4 relative overflow-hidden shadow-glow">
            <div className="absolute top-0 right-0 bg-gradient-to-l from-indigo-500 to-purple-600 text-[10px] font-extrabold px-3 py-1 text-white rounded-bl-lg">
              RECOMMENDED
            </div>
            <div className="flex justify-between items-center border-b border-indigo-500/20 pb-3">
              <h3 className="font-bold text-white text-base sm:text-lg flex items-center gap-1.5">
                ZanBimbel Pro <Sparkles className="w-4 h-4 text-amber-400 fill-amber-400" />
              </h3>
              <span className="text-xs px-2.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono border border-indigo-500/40">Unlimited</span>
            </div>
            <ul className="space-y-2 text-xs text-zinc-200">
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-indigo-400 shrink-0" /> Diagnosis Ulang & Pembanding Tren</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-indigo-400 shrink-0" /> Drill Sesuai Misi Unlimited</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-indigo-400 shrink-0" /> Pembahasan Penuh + Langkah & Jebakan Unlimited</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-indigo-400 shrink-0" /> 2 Varian Isomorfik setelah Salah (Type A)</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-indigo-400 shrink-0" /> Full Tryout Replikasi Track Sesuai Ruleset</li>
            </ul>
          </div>
        </div>
      </section>

    </div>
  );
}
