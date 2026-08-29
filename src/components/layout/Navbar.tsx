"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Sparkles, Compass, Target, BookOpen, Crown, ChevronDown, Layers, Lock, KeyRound, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { SignatureBar } from "./SignatureBar";
import { Track } from "@/lib/types";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [track, setTrack] = useState<Track>("UTBK");
  const [isPro, setIsPro] = useState<boolean>(false);
  const [showMobileTrackMenu, setShowMobileTrackMenu] = useState<boolean>(false);

  // 7x Click Secret Admin Gate
  const [logoClickCount, setLogoClickCount] = useState<number>(0);
  const [showPinModal, setShowPinModal] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>("");
  const [pinError, setPinError] = useState<boolean>(false);
  const clickTimeoutRef = useRef<any>(null);

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

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();

    setLogoClickCount((prev) => {
      const newCount = prev + 1;
      if (newCount >= 7) {
        setShowPinModal(true);
        setPinInput("");
        setPinError(false);
        return 0;
      }
      return newCount;
    });

    clearTimeout(clickTimeoutRef.current);
    clickTimeoutRef.current = setTimeout(() => {
      setLogoClickCount(0);
    }, 3000);
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === "Zanbim@2026!") {
      sessionStorage.setItem("zanbim_admin_unlocked", "true");
      setShowPinModal(false);
      router.push("/admin");
    } else {
      setPinError(true);
    }
  };

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
      {/* Signature Bar: Tanggal Jawa */}
      <SignatureBar />

      <header className="sticky top-0 z-40 w-full glass-panel border-b border-border/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-2">
          
          {/* Brand Logo with 7x Click Secret Action */}
          <div
            onClick={handleLogoClick}
            className="flex items-center gap-2 sm:gap-3 group shrink-0 cursor-pointer select-none"
            title="ZanBimbel"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-[1px] shadow-glow overflow-hidden active:scale-95 transition-transform">
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
          </div>

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

      {/* Secret PIN Modal (Triggered by 7x Logo Click) */}
      {showPinModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel p-6 rounded-3xl border border-indigo-500/40 max-w-sm w-full shadow-glow flex flex-col gap-4 relative animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowPinModal(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-white text-base">Portal Rahasia Admin</h3>
                <p className="text-xs text-zinc-400">Masukkan PIN Keamanan</p>
              </div>
            </div>

            <form onSubmit={handlePinSubmit} className="flex flex-col gap-3">
              <div className="relative">
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    setPinError(false);
                  }}
                  placeholder="Ketik PIN..."
                  autoFocus
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 font-mono tracking-wider"
                />
                <KeyRound className="w-4 h-4 text-zinc-500 absolute right-3.5 top-3.5" />
              </div>

              {pinError && (
                <p className="text-xs text-rose-400 font-medium">
                  ❌ PIN salah! Akses ditolak.
                </p>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold text-xs shadow-glow hover:opacity-95 active:scale-95 transition-all"
              >
                Buka Dashboard Admin
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
