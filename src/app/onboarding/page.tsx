"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Target, BookOpen, ArrowRight, SkipForward, CheckCircle2, Building2, GraduationCap } from "lucide-react";

export default function OnboardingPage() {
  const router = useRouter();
  const [track, setTrack] = useState<"UTBK" | "CPNS">("UTBK");
  const [targetName, setTargetName] = useState("");

  const handleStartDiagnosis = (skipTarget = false) => {
    localStorage.setItem("zanbim_track", track);
    if (!skipTarget && targetName) {
      localStorage.setItem("zanbim_target", targetName);
    } else {
      localStorage.removeItem("zanbim_target");
    }
    // Trigger custom event so all pages instantly sync
    window.dispatchEvent(new Event("zanbim_track_changed"));
    router.push(`/diagnosis?track=${track}`);
  };

  const utbkPresets = [
    "ITB - Teknik Informatika",
    "UI - Kedokteran",
    "UGM - Ilmu Hukum",
    "Unpad - Ilmu Komunikasi",
    "ITS - Teknik Elektro",
  ];

  const cpnsPresets = [
    "Kemenkeu - Analis Kebijakan",
    "Kemendagri - Staff Kelurahan / Pamong",
    "Kemenkumham - Penjaga Tahanan",
    "Kejaksaan RI - Ahli Pertama Pengelola",
    "Kemenkes - Dokter Umum",
  ];

  const activePresets = track === "UTBK" ? utbkPresets : cpnsPresets;

  return (
    <div className="max-w-2xl mx-auto py-10 px-4 flex flex-col gap-8">
      
      <div className="text-center flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold text-white">Pilih Jalur & Target Spesifik Kamu</h1>
        <p className="text-sm text-zinc-400">
          Setiap instansi, kementerian, atau jurusan kampus punya fokus bobot skill yang berbeda. Pilih target lo biar ZanBimbel bikin rencana presisi.
        </p>
      </div>

      {/* Track Selection Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* UTBK Card */}
        <div
          onClick={() => {
            setTrack("UTBK");
            setTargetName("");
          }}
          className={`glass-panel p-6 rounded-2xl border cursor-pointer transition-all flex flex-col gap-3 relative ${
            track === "UTBK"
              ? "border-indigo-500 bg-indigo-950/30 shadow-glow"
              : "border-zinc-800 hover:border-zinc-700 opacity-70"
          }`}
        >
          {track === "UTBK" && (
            <CheckCircle2 className="w-5 h-5 text-indigo-400 absolute top-4 right-4" />
          )}
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
            <GraduationCap className="w-5 h-5 text-indigo-400" />
          </div>
          <h3 className="text-lg font-bold text-white">Track UTBK / SNBT</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Target Kampus PTN & Jurusan (Saintek/Soshum). Indeks Kemampuan 200–800 dengan bobot subtes spesifik.
          </p>
        </div>

        {/* CPNS Card */}
        <div
          onClick={() => {
            setTrack("CPNS");
            setTargetName("");
          }}
          className={`glass-panel p-6 rounded-2xl border cursor-pointer transition-all flex flex-col gap-3 relative ${
            track === "CPNS"
              ? "border-cyan-500 bg-cyan-950/30 shadow-glow-cyan"
              : "border-zinc-800 hover:border-zinc-700 opacity-70"
          }`}
        >
          {track === "CPNS" && (
            <CheckCircle2 className="w-5 h-5 text-cyan-400 absolute top-4 right-4" />
          )}
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
            <Building2 className="w-5 h-5 text-cyan-400" />
          </div>
          <h3 className="text-lg font-bold text-white">Track CPNS / SKD</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Target Kementerian, Instansi, & Formasi. Evaluasi Ambang SKD BKN (TWK, TIU, TKP) + Buffer Ranking.
          </p>
        </div>
      </div>

      {/* Target Input & Presets Section */}
      <div className="glass-panel p-6 rounded-2xl border border-zinc-800 flex flex-col gap-4">
        <label className="text-sm font-semibold text-zinc-200 flex items-center justify-between">
          <span>Target {track === "UTBK" ? "PTN & Jurusan Kamu" : "Kementerian / Instansi & Formasi"}</span>
          <span className="text-xs font-normal text-zinc-500">Bisa diketik bebas</span>
        </label>

        <input
          type="text"
          value={targetName}
          onChange={(e) => setTargetName(e.target.value)}
          placeholder={track === "UTBK" ? "Tulis PTN & Jurusan (misal: ITB - STEI)" : "Tulis Instansi & Formasi (misal: Kemenkeu - Analis)"}
          className="w-full px-4 py-3 rounded-xl glass-input text-sm"
        />

        {/* Preset Chips */}
        <div className="flex flex-col gap-2 pt-1">
          <span className="text-[11px] text-zinc-400 font-semibold">Atau pilih contoh target populer:</span>
          <div className="flex flex-wrap gap-2">
            {activePresets.map((preset) => (
              <button
                key={preset}
                onClick={() => setTargetName(preset)}
                className={`px-3 py-1.5 rounded-lg text-xs border transition-all ${
                  targetName === preset
                    ? "bg-indigo-600 text-white border-indigo-500 shadow-glow"
                    : "bg-zinc-900/80 text-zinc-300 border-zinc-800 hover:border-zinc-700 hover:text-white"
                }`}
              >
                {preset}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => handleStartDiagnosis(true)}
          className="flex-1 py-3.5 rounded-xl glass-panel text-zinc-400 font-semibold text-sm hover:text-white hover:bg-zinc-800 transition-all flex items-center justify-center gap-2"
        >
          <SkipForward className="w-4 h-4" />
          Lewati Dulu (Naikkan Indeks)
        </button>
        <button
          onClick={() => handleStartDiagnosis(false)}
          className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold text-sm shadow-glow hover:opacity-95 transition-all flex items-center justify-center gap-2"
        >
          Simpan Target & Diagnosis
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
