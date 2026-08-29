"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, Compass, Target, BookOpen, Crown, ShieldAlert } from "lucide-react";
import { useState, useEffect } from "react";
import { SignatureBar } from "./SignatureBar";

export function Navbar() {
  const pathname = usePathname();
  const [track, setTrack] = useState<string>("UTBK");
  const [isPro, setIsPro] = useState<boolean>(false);

  useEffect(() => {
    const savedTrack = localStorage.getItem("zanbim_track") || "UTBK";
    const savedPro = localStorage.getItem("zanbim_pro") === "true";
    setTrack(savedTrack);
    setIsPro(savedPro);

    const handleTrackChange = () => {
      const updatedTrack = localStorage.getItem("zanbim_track") || "UTBK";
      setTrack(updatedTrack);
    };

    window.addEventListener("zanbim_track_changed", handleTrackChange);
    return () => window.removeEventListener("zanbim_track_changed", handleTrackChange);
  }, [pathname]);

  const togglePro = () => {
    const nextPro = !isPro;
    setIsPro(nextPro);
    localStorage.setItem("zanbim_pro", String(nextPro));
    window.dispatchEvent(new Event("zanbim_pro_changed"));
  };

  const changeTrack = (newTrack: string) => {
    setTrack(newTrack);
    localStorage.setItem("zanbim_track", newTrack);
    window.dispatchEvent(new Event("zanbim_track_changed"));
  };

  return (
    <>
      {/* Signature Bar: Tanggal Jawa & Jadwal Sholat */}
      <SignatureBar />

      <header className="sticky top-0 z-50 w-full glass-panel border-b border-border/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Brand Logo with Custom Logo.png */}
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-[1px] shadow-glow overflow-hidden">
              <div className="w-full h-full bg-background rounded-[11px] flex items-center justify-center overflow-hidden">
                <img
                  src="/logo.png"
                  alt="ZanBimbel Logo"
                  className="w-full h-full object-contain p-1 group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-tight text-white flex items-center gap-1.5">
                ZanBimbel <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-mono">v3</span>
              </span>
              <span className="text-[10px] text-zinc-400 font-medium tracking-wide">Adaptive Learning AI</span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-zinc-900/60 p-1.5 rounded-full border border-zinc-800/80">
            <Link
              href="/dashboard"
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                pathname === "/dashboard"
                  ? "bg-indigo-600 text-white shadow-glow"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              Home
            </Link>
            <Link
              href="/diagnosis"
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                pathname.startsWith("/diagnosis")
                  ? "bg-indigo-600 text-white shadow-glow"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
              }`}
            >
              <Target className="w-3.5 h-3.5" />
              Diagnosis
            </Link>
            <Link
              href="/drill"
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                pathname.startsWith("/drill")
                  ? "bg-indigo-600 text-white shadow-glow"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Misi Drill
            </Link>
            <Link
              href="/tryout"
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                pathname.startsWith("/tryout")
                  ? "bg-indigo-600 text-white shadow-glow"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Tryout
            </Link>
            <Link
              href="/admin"
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                pathname.startsWith("/admin")
                  ? "bg-indigo-600 text-white shadow-glow"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5 text-cyan-400" />
              Admin CMS
            </Link>
          </nav>

          {/* Track Selector & Pro Status Toggle */}
          <div className="flex items-center gap-3">
            {/* Track Switcher */}
            <div className="flex items-center bg-zinc-950 p-1 rounded-lg border border-zinc-800">
              <button
                onClick={() => changeTrack("UTBK")}
                className={`px-2.5 py-1 rounded text-xs font-bold transition-all ${
                  track === "UTBK"
                    ? "bg-indigo-500/20 text-indigo-400 border border-indigo-500/40"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                UTBK
              </button>
              <button
                onClick={() => changeTrack("CPNS")}
                className={`px-2.5 py-1 rounded text-xs font-bold transition-all ${
                  track === "CPNS"
                    ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/40"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                CPNS
              </button>
            </div>

            {/* Pro Status Toggle */}
            <button
              onClick={togglePro}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all flex items-center gap-1.5 ${
                isPro
                  ? "bg-amber-500/10 text-amber-400 border-amber-500/30 shadow-glow"
                  : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700"
              }`}
              title="Klik untuk toggle status Pro/Free"
            >
              <Crown className={`w-3.5 h-3.5 ${isPro ? "text-amber-400 fill-amber-400" : "text-zinc-500"}`} />
              {isPro ? "PRO Active" : "Free Plan"}
            </button>
          </div>

        </div>
      </header>
    </>
  );
}
