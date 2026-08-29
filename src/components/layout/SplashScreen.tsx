"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Sparkles, Compass } from "lucide-react";
import { getJawaDate } from "@/lib/jawa-calendar";

export function SplashScreen({ onComplete }: { onComplete?: () => void }) {
  const [isVisible, setIsVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [jawaDate, setJawaDate] = useState<string>("");

  useEffect(() => {
    const info = getJawaDate();
    setJawaDate(`${info.weton}, ${info.hijriStr}`);

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
      className={`fixed inset-0 z-[100] bg-[#09090B] flex flex-col items-center justify-center transition-all duration-500 ${
        fadeOut ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
      }`}
    >
      {/* Background Glow */}
      <div className="absolute w-96 h-96 bg-indigo-600/20 rounded-full blur-[140px] animate-pulse" />
      <div className="absolute w-72 h-72 bg-cyan-500/15 rounded-full blur-[110px]" />

      <div className="relative flex flex-col items-center gap-6 text-center z-10 p-6">
        
        {/* Animated Logo Container */}
        <div className="relative group">
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 blur-md opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse" />
          <div className="relative w-28 h-28 rounded-2xl bg-zinc-950 p-2 border border-zinc-800 flex items-center justify-center shadow-glow overflow-hidden">
            <img
              src="/logo.png"
              alt="ZanBimbel Logo"
              className="w-full h-full object-contain transform hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                // Fallback to Icon if image error
                (e.target as HTMLElement).style.display = "none";
              }}
            />
          </div>
        </div>

        {/* Brand Title */}
        <div className="flex flex-col items-center gap-1.5">
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            ZanBimbel <span className="text-xs px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-mono">v3</span>
          </h1>
          <p className="text-xs text-zinc-400 font-medium tracking-wide">
            Adaptive Bimbel AI • UTBK & CPNS SKD
          </p>
        </div>

        {/* Tanggal Jawa & Hijriah Badge (Ciri Khas) */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/80 border border-zinc-800 text-zinc-300 text-xs font-medium backdrop-blur-md shadow-glow">
          <Compass className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: "10s" }} />
          <span>{jawaDate}</span>
        </div>

        {/* Micro Loader Progress Line */}
        <div className="w-48 h-1 bg-zinc-900 rounded-full overflow-hidden mt-4">
          <div className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 w-full animate-in slide-in-from-left duration-1000" />
        </div>

      </div>
    </div>
  );
}
