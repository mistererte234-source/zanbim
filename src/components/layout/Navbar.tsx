"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, Compass, Target, BookOpen, Crown, ShieldAlert, ChevronDown, Layers } from "lucide-react";
import { useState, useEffect } from "react";
import { SignatureBar } from "./SignatureBar";
import { Track } from "@/lib/types";

export function Navbar() {
  const pathname = usePathname();
  const [track, setTrack] = useState<Track>("UTBK");
  const [isPro, setIsPro] = useState<boolean>(false);
  const [showMobileTrackMenu, setShowMobileTrackMenu] = useState<boolean>(false);

  useEffect(() => {
    const savedTrack = (localStorage.getItem("zanbim_track") as Track) || "UTBK";
    const savedPro = localStorage.getItem("zanbim_pro") === "true";
    setTrack(savedTrack);
    setIsPro(savedPro);

    const handleTrackChange = () => {
      const updatedTrack = (localStorage.getItem("zanbim_track") as Track) || "UTBK";
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

  const changeTrack = (newTrack: Track) => {
    setTrack(newTrack);
    localStorage.setItem("zanbim_track", newTrack);
    setShowMobileTrackMenu(false);
    window.dispatchEvent(new Event("zanbim_track_changed"));
  };

  const trackLabels: Record<Track, { label: string; badge: string; color: string }> = {
    UTBK: { label: "UTBK SNBT", badge: "UTBK", color: "indigo" },
    CPNS: { label: "CPNS SKD", badge: "CPNS", color: "cyan" },
    REKRUTMEN: { label: "Rekrutmen HRD", badge: "HRD IQ", color: "emerald" },
    DEWAN_RI: { label: "Dewan RI", badge: "Dewan", color: "amber" },
    DOSEN: { label: "Seleksi Dosen", badge: "Dosen", color: "purple" },
  };

  return (
    <>
      {/* Signature Bar: Tanggal Jawa & Jadwal Sholat */}
      <SignatureBar />

      <header className="sticky top-0 z-40 w-full glass-panel border-b border-border/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-2">
          
          {/* Brand Logo with Custom Logo.png */}
          <Link href="/dashboard" className="flex items-center gap-2 sm:gap-3 group shrink-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-[1px] shadow-glow overflow-hidden">
              <div className="w-full h-full bg-background rounded-[11px] flex items-center justify-center overflow-hidden">
                <img
                  src="/logo.png"
                  alt="ZanBimbel Logo"
                  className="w-full h-full object-contain p-0.5 sm:p-1 group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-sm sm:text-lg tracking-tight text-white flex items-center gap-1">
                ZanBimbel <span className="text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-mono">v3</span>
              </span>
              <span className="text-[9px] text-zinc-400 font-medium tracking-wide hidden xs:inline">Adaptive Learning AI</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-zinc-900/60 p-1.5 rounded-full border border-zinc-800/80">
            <Link
              href="/dashboard"
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
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
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
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
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
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
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
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
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                pathname.startsWith("/admin")
                  ? "bg-indigo-600 text-white shadow-glow"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5 text-cyan-400" />
              Admin
            </Link>
          </nav>

          {/* Right Header Elements: Track Selector & Pro Toggle */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            
            {/* Desktop: 5 Track Buttons */}
            <div className="hidden md:flex items-center bg-zinc-950 p-1 rounded-xl border border-zinc-800 text-xs">
              {(["UTBK", "CPNS", "REKRUTMEN", "DEWAN_RI", "DOSEN"] as Track[]).map((t) => (
                <button
                  key={t}
                  onClick={() => changeTrack(t)}
                  className={`px-2 py-1 rounded-lg font-bold transition-all text-[11px] ${
                    track === t
                      ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 shadow-sm"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  {trackLabels[t].badge}
                </button>
              ))}
            </div>

            {/* Mobile: Sleek iOS Track Pill Dropdown */}
            <div className="md:hidden relative">
              <button
                onClick={() => setShowMobileTrackMenu(!showMobileTrackMenu)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-bold text-indigo-300 shadow-sm"
              >
                <Layers className="w-3 h-3 text-indigo-400" />
                <span>{trackLabels[track].badge}</span>
                <ChevronDown className="w-3 h-3 text-zinc-400" />
              </button>

              {/* Mobile Track Sheet Dropdown */}
              {showMobileTrackMenu && (
                <div className="absolute right-0 top-9 z-50 w-48 glass-panel p-2 rounded-2xl border border-zinc-800 shadow-glow flex flex-col gap-1">
                  <span className="text-[10px] uppercase font-bold text-zinc-400 px-2 py-1">Pilih Jalur Asesmen</span>
                  {(["UTBK", "CPNS", "REKRUTMEN", "DEWAN_RI", "DOSEN"] as Track[]).map((t) => (
                    <button
                      key={t}
                      onClick={() => changeTrack(t)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-between ${
                        track === t
                          ? "bg-indigo-600 text-white"
                          : "text-zinc-300 hover:bg-zinc-800/60"
                      }`}
                    >
                      <span>{trackLabels[t].label}</span>
                      {track === t && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Pro Status Toggle */}
            <button
              onClick={togglePro}
              className={`px-2 sm:px-2.5 py-1 rounded-xl text-xs font-bold border transition-all flex items-center gap-1 ${
                isPro
                  ? "bg-amber-500/15 text-amber-400 border-amber-500/40 shadow-glow"
                  : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700"
              }`}
              title="Klik untuk toggle status Pro/Free"
            >
              <Crown className={`w-3.5 h-3.5 ${isPro ? "text-amber-400 fill-amber-400" : "text-zinc-400"}`} />
              <span className="text-[11px] font-mono">{isPro ? "PRO" : "Free"}</span>
            </button>
          </div>

        </div>
      </header>
    </>
  );
}
