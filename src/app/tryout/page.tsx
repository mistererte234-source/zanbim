"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Sparkles, Crown, Timer, ShieldAlert, ArrowRight, PlayCircle } from "lucide-react";

export default function TryoutLobbyPage() {
  const [track, setTrack] = useState("UTBK");
  const [isPro, setIsPro] = useState(false);

  useEffect(() => {
    setTrack(localStorage.getItem("zanbim_track") || "UTBK");
    setIsPro(localStorage.getItem("zanbim_pro") === "true");
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-8 px-2 flex flex-col gap-8">
      
      <div className="text-center flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold text-white flex items-center justify-center gap-2">
          Tryout Lobby {track} <Sparkles className="w-6 h-6 text-indigo-400" />
        </h1>
        <p className="text-xs text-zinc-400 max-w-xl mx-auto">
          Simulasi ujian berwaktu tanpa bahasan di tengah. Evaluasi performa riil dan pemicu penyesuaian otomatis rencana belajar.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Mini Tryout (Free) */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-zinc-800 flex flex-col gap-6 flex-1 glass-panel-hover">
          <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
            <div>
              <h2 className="text-xl font-bold text-white">Mini Tryout</h2>
              <span className="text-xs text-zinc-400 font-mono">Free Tier Weekly</span>
            </div>
            <span className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 text-xs font-mono">Free</span>
          </div>

          <ul className="space-y-3 text-xs text-zinc-300 flex-1">
            <li className="flex items-center gap-2">⏱️ 25 - 30 Soal Campur Subtes</li>
            <li className="flex items-center gap-2">⏳ Timer Berwaktu Ketat</li>
            <li className="flex items-center gap-2">📊 Evaluasi Indeks & Ambang SKD</li>
            <li className="flex items-center gap-2">❌ Tanpa Pembahasan Penuh di Tengah</li>
          </ul>

          <Link
            href={`/diagnosis?track=${track}`}
            className="w-full py-3.5 rounded-xl glass-panel text-white font-bold text-xs hover:bg-zinc-800 transition-all flex items-center justify-center gap-2"
          >
            <PlayCircle className="w-4 h-4 text-indigo-400" />
            Mulai Mini Tryout
          </Link>
        </div>

        {/* Full Tryout (Pro) */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-indigo-500/30 flex flex-col gap-6 flex-1 shadow-glow relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-gradient-to-l from-indigo-500 to-purple-600 text-[10px] font-extrabold px-3 py-1 text-white rounded-bl-lg">
            PRO UNLIMITED
          </div>

          <div className="flex justify-between items-center border-b border-indigo-500/20 pb-4">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                Full Tryout Replikasi <Crown className="w-4 h-4 text-amber-400 fill-amber-400" />
              </h2>
              <span className="text-xs text-indigo-300 font-mono">Paket Lengkap Sesuai Track</span>
            </div>
          </div>

          <ul className="space-y-3 text-xs text-zinc-200 flex-1">
            <li className="flex items-center gap-2">🎯 Replikasi Format Lengkap Diagnosis x1.5</li>
            <li className="flex items-center gap-2">⏳ Timer CPNS 100-110 Menit / UTBK Full</li>
            <li className="flex items-center gap-2">🔄 Auto-Replan Rencana Belajar (2+ Skill Pindah Kuartil)</li>
            <li className="flex items-center gap-2">📈 Analitik Tren Grafik Kemajuan</li>
          </ul>

          {isPro ? (
            <Link
              href={`/diagnosis?track=${track}`}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold text-xs shadow-glow hover:opacity-95 transition-all flex items-center justify-center gap-2"
            >
              <PlayCircle className="w-4 h-4" />
              Mulai Full Tryout
            </Link>
          ) : (
            <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 text-center flex flex-col gap-2">
              <span className="text-xs text-zinc-400">Aktifkan Pro Toggle di Navbar untuk mencoba</span>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
