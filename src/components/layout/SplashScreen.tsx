"use client";

import { useState, useEffect } from "react";
import { Compass } from "lucide-react";
import { getJawaDate } from "@/lib/jawa-calendar";

export function SplashScreen({ onComplete }: { onComplete?: () => void }) {
  const [isVisible, setIsVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [jawaDate, setJawaDate] = useState<string>("");

  useEffect(() => {
    const info = getJawaDate();
    setJawaDate(info.fullHeaderStr);

    const timer1 = setTimeout(() => {
      setFadeOut(true);
    }, 1800);

    const timer2 = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
    }, 2300);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] bg-[#070709]/95 backdrop-blur-3xl flex flex-col items-center justify-center transition-all duration-500 overflow-hidden ${
        fadeOut ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
      }`}
    >
      {/* Background Ambient Glows for Frosted Glass Effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[420px] h-[420px] bg-indigo-600/25 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[340px] h-[340px] bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative flex flex-col items-center gap-6 text-center z-10 p-6 max-w-md w-full">
        
        {/* Pure Frameless Transparent PNG Logo with Outer Glow (No Square Box) */}
        <div className="relative flex items-center justify-center p-2">
          <img
            src="/logo.png"
            alt="ZanBimbel Logo"
            className="w-28 h-28 sm:w-36 sm:h-36 object-contain logo-splash-glow select-none"
            onError={(e) => {
              (e.target as HTMLElement).style.display = "none";
            }}
          />
        </div>

        {/* Brand Title */}
        <div className="flex flex-col items-center gap-1.5">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center gap-2">
            ZanBimbel <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 font-mono">v3.0</span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 font-medium tracking-wide">
            Enterprise Adaptive Assessment AI
          </p>
        </div>

        {/* Tanggal Jawa & Hijriah Glass Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl glass-panel text-zinc-300 text-xs font-semibold shadow-glow">
          <Compass className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: "12s" }} />
          <span className="font-mono text-[11px] sm:text-xs">{jawaDate}</span>
        </div>

        {/* iOS Micro Loader Progress Line */}
        <div className="w-44 h-1 bg-zinc-900/80 rounded-full overflow-hidden mt-3 border border-zinc-800/80">
          <div className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 w-full animate-in slide-in-from-left duration-1000" />
        </div>

      </div>
    </div>
  );
}
