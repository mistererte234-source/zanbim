"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Compass, Target, BookOpen, Sparkles, ArrowRight, Award, ShieldAlert, CheckCircle2, Briefcase, Landmark } from "lucide-react";
import { Track } from "@/lib/types";

export default function DashboardPage() {
  const [track, setTrack] = useState<Track>("UTBK");
  const [targetName, setTargetName] = useState("Belum Diatur");
  const [isPro, setIsPro] = useState(false);

  useEffect(() => {
    const savedTrack = (localStorage.getItem("zanbim_track") as Track) || "UTBK";
    const savedTarget = localStorage.getItem("zanbim_target") || "Target Belum Diatur";
    const savedPro = localStorage.getItem("zanbim_pro") === "true";

    setTrack(savedTrack);
    setTargetName(savedTarget);
    setIsPro(savedPro);

    const handleTrackChange = () => {
      const updatedTrack = (localStorage.getItem("zanbim_track") as Track) || "UTBK";
      const updatedTarget = localStorage.getItem("zanbim_target") || "Target Belum Diatur";
      setTrack(updatedTrack);
      setTargetName(updatedTarget);
    };

    window.addEventListener("zanbim_track_changed", handleTrackChange);
    return () => window.removeEventListener("zanbim_track_changed", handleTrackChange);
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 flex flex-col gap-8">
      {/* Welcome Banner */}
      <div className="glass-panel p-8 rounded-3xl border border-indigo-500/30 flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-indigo-950/50 via-purple-950/30 to-zinc-900 shadow-glow relative overflow-hidden">
        <div className="flex flex-col gap-2 relative z-10">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-xs font-bold font-mono">
              Jalur Active: {track}
            </span>
            {isPro && (
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold font-mono flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-amber-400" /> PRO Active
              </span>
            )}
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Selamat Datang di Dashboard ZanBimbel v3
          </h1>
          <p className="text-zinc-400 text-sm max-w-xl">
            Target Pilihan: <strong className="text-white">{targetName}</strong>. Sistem siap menganalisis gap kemampuan Anda.
          </p>
        </div>

        <Link
          href="/diagnosis"
          className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 text-white font-bold text-sm shadow-glow hover:opacity-90 transition-all flex items-center gap-2 shrink-0 relative z-10"
        >
          <Target className="w-4 h-4" /> Tes Diagnosis Baru
        </Link>
      </div>

      {/* 3 Core Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Stat 1: Skor Utis/Estimasi */}
        <div className="glass-panel p-6 rounded-2xl border border-zinc-800 flex flex-col gap-2">
          <span className="text-xs text-zinc-400 font-medium">
            {track === "UTBK" && "Estimasi Indeks UTBK"}
            {track === "CPNS" && "Perkiraan Skor SKD Total"}
            {track === "REKRUTMEN" && "Estimasi Indeks IQ HRD"}
            {track === "DEWAN_RI" && "Skor Kelayakan Legislator"}
          </span>
          <div className="text-4xl font-black text-white font-mono">
            {track === "UTBK" && "650 / 800"}
            {track === "CPNS" && "395 / 550"}
            {track === "REKRUTMEN" && "IQ 132"}
            {track === "DEWAN_RI" && "88% Fit"}
          </div>
          <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Berada di Jalur Target
          </span>
        </div>

        {/* Stat 2: Skill Gaps Identified */}
        <div className="glass-panel p-6 rounded-2xl border border-zinc-800 flex flex-col gap-2">
          <span className="text-xs text-zinc-400 font-medium">Skill Gaps Terdeteksi</span>
          <div className="text-4xl font-black text-indigo-400 font-mono">3 Top Gaps</div>
          <span className="text-xs text-zinc-400">Siap Ditutup via Misi Drill</span>
        </div>

        {/* Stat 3: Misi Harian */}
        <div className="glass-panel p-6 rounded-2xl border border-zinc-800 flex flex-col gap-2">
          <span className="text-xs text-zinc-400 font-medium">Status Misi Harian</span>
          <div className="text-4xl font-black text-cyan-400 font-mono">1/3 Selesai</div>
          <span className="text-xs text-zinc-400">2 Soal Varian Menunggu</span>
        </div>

      </div>

      {/* Daily Mission Widget */}
      <div className="glass-panel p-6 rounded-2xl border border-zinc-800 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-white text-base">Misi Drill Terfokus Hari Ini</h3>
              <p className="text-xs text-zinc-400">Soal disesuaikan dengan gap kemampuan terendah Anda di jalur {track}</p>
            </div>
          </div>

          <Link
            href="/drill"
            className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-xs font-bold text-white flex items-center gap-1.5"
          >
            Lanjut Drill <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
