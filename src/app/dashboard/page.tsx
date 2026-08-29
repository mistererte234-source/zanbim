"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Compass, Flame, Target, Zap, ArrowRight, CheckCircle2 } from "lucide-react";

export default function DashboardPage() {
  const [track, setTrack] = useState<string>("UTBK");
  const [targetName, setTargetName] = useState<string | null>(null);
  const [diagnosisSummary, setDiagnosisSummary] = useState<any>(null);

  const syncState = () => {
    const savedTrack = localStorage.getItem("zanbim_track") || "UTBK";
    const savedTarget = localStorage.getItem("zanbim_target");
    setTrack(savedTrack);
    setTargetName(savedTarget);

    const savedResult = localStorage.getItem("zanbim_diagnosis_result");
    if (savedResult) {
      try {
        const parsed = JSON.parse(savedResult);
        if (parsed.summary?.type === savedTrack) {
          setDiagnosisSummary(parsed);
        } else {
          setDiagnosisSummary(null);
        }
      } catch (e) {
        setDiagnosisSummary(null);
      }
    } else {
      setDiagnosisSummary(null);
    }
  };

  useEffect(() => {
    syncState();

    window.addEventListener("zanbim_track_changed", syncState);
    return () => window.removeEventListener("zanbim_track_changed", syncState);
  }, []);

  const summary = diagnosisSummary?.summary;
  const topGaps = diagnosisSummary?.topGaps;
  const weakestSkill = topGaps?.[0];

  return (
    <div className="max-w-5xl mx-auto py-6 px-2 flex flex-col gap-8">
      
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 rounded-3xl border border-zinc-800">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            Selamat Datang di ZanBimbel <span className="text-xs px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-mono">{track}</span>
          </h1>
          <p className="text-xs text-zinc-400">
            Target: <strong className="text-white">{targetName || "Naikkan Indeks (Umum)"}</strong>
          </p>
        </div>

        <Link
          href="/onboarding"
          className="px-4 py-2 rounded-xl glass-panel text-xs text-zinc-400 hover:text-white transition-all flex items-center gap-1.5 self-start sm:self-auto"
        >
          Ubah Track / Target
        </Link>
      </div>

      {/* 3 Angka Utama Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Stat 1: Indeks / Skor */}
        <div className="glass-panel p-6 rounded-2xl border border-indigo-500/20 flex flex-col gap-2">
          <span className="text-xs text-zinc-400 font-semibold flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-indigo-400" />
            {track === "UTBK" ? "Indeks Kemampuan" : "Skor Total SKD"}
          </span>
          <div className="text-3xl font-extrabold text-white glow-text-indigo">
            {summary ? (track === "UTBK" ? summary.indeks : `${summary.total} / 550`) : "Belum Diagnosis"}
          </div>
          <span className="text-[11px] text-zinc-500">
            {summary ? (track === "UTBK" ? "Internal (200 - 800)" : "Resmi BKN Ruleset") : "Mulai diagnosis sekarang"}
          </span>
        </div>

        {/* Stat 2: Total Gap */}
        <div className="glass-panel p-6 rounded-2xl border border-cyan-500/20 flex flex-col gap-2">
          <span className="text-xs text-zinc-400 font-semibold flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-cyan-400" />
            Skill Gap Terdeteksi
          </span>
          <div className="text-3xl font-extrabold text-white">
            {topGaps ? `${topGaps.length} Skill Terlemah` : "0 Skill"}
          </div>
          <span className="text-[11px] text-zinc-500">Berdasarkan bukti attempt</span>
        </div>

        {/* Stat 3: Skill Terlemah Saat Ini */}
        <div className="glass-panel p-6 rounded-2xl border border-rose-500/20 flex flex-col gap-2">
          <span className="text-xs text-zinc-400 font-semibold flex items-center gap-1.5">
            <Target className="w-4 h-4 text-rose-400" />
            Fokus Skill Utama
          </span>
          <div className="text-sm font-bold text-white truncate">
            {weakestSkill ? weakestSkill.label : "Latihan Umum"}
          </div>
          <span className="text-[11px] text-zinc-500 font-mono truncate">
            {weakestSkill ? weakestSkill.code : "Misi Hari Ini"}
          </span>
        </div>
      </div>

      {/* Daily Mission Widget */}
      <div className="glass-panel p-8 rounded-3xl border border-indigo-500/40 flex flex-col gap-6 shadow-glow relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-500 p-[1px]">
              <div className="w-full h-full bg-background rounded-[15px] flex items-center justify-center">
                <Flame className="w-6 h-6 text-amber-400" />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Misi Hari Ini</h2>
              <p className="text-xs text-zinc-400">12 Soal • 1 Fokus Skill • 35 Menit</p>
            </div>
          </div>

          <Link
            href={`/drill?track=${track}${weakestSkill ? `&skill=${weakestSkill.code}` : ""}`}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 text-white font-bold text-sm shadow-glow hover:opacity-95 transition-all flex items-center justify-center gap-2"
          >
            Kerjakan Misi Hari Ini
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-zinc-300">
          <div className="flex items-center gap-2 bg-zinc-900/60 p-3.5 rounded-xl border border-zinc-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Fokus 1 Subtes Terlemah</span>
          </div>
          <div className="flex items-center gap-2 bg-zinc-900/60 p-3.5 rounded-xl border border-zinc-800">
            <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
            <span>Langkah & Jebakan Penjelasan</span>
          </div>
          <div className="flex items-center gap-2 bg-zinc-900/60 p-3.5 rounded-xl border border-zinc-800">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>2 Varian Isomorfik (Pro)</span>
          </div>
        </div>
      </div>

    </div>
  );
}
