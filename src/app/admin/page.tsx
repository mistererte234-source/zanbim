"use client";

import { useState, useEffect } from "react";
import { ShieldCheck, AlertCircle, Plus, Upload, Download, Eye, RefreshCw, Layers, CheckCircle2, Lock, KeyRound, EyeOff, Radio, Smartphone, Monitor, Globe, Activity } from "lucide-react";
import { ItemPayload, ValidationResult } from "@/lib/types";
import { validateItemGate } from "@/lib/gate-validator";

export default function AdminPortalPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>("");
  const [pinError, setPinError] = useState<boolean>(false);

  const [activeTab, setActiveTab] = useState<"items" | "logs">("logs");
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [filterTrack, setFilterTrack] = useState<string>("ALL");
  const [previewItem, setPreviewItem] = useState<any | null>(null);

  // Mata-Mata Live Visitor Logs State
  const [logsData, setLogsData] = useState<{
    totalVisits: number;
    deviceCounts: Record<string, number>;
    trackCounts: Record<string, number>;
    logs: any[];
  }>({
    totalVisits: 0,
    deviceCounts: {},
    trackCounts: {},
    logs: [],
  });
  const [logsLoading, setLogsLoading] = useState<boolean>(false);

  useEffect(() => {
    const isUnlocked = sessionStorage.getItem("zanbim_admin_unlocked") === "true";
    if (isUnlocked) {
      setIsAuthenticated(true);
      fetchItems();
      fetchLogs();
    }
  }, []);

  const handlePinAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === "Zanbim@2026!") {
      sessionStorage.setItem("zanbim_admin_unlocked", "true");
      setIsAuthenticated(true);
      fetchItems();
      fetchLogs();
    } else {
      setPinError(true);
    }
  };

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/items");
      const data = await res.json();
      if (data.items) {
        setItems(data.items);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const fetchLogs = async () => {
    setLogsLoading(true);
    try {
      const res = await fetch("/api/admin/logs");
      const data = await res.json();
      if (data.success) {
        setLogsData({
          totalVisits: data.totalVisits,
          deviceCounts: data.deviceCounts || {},
          trackCounts: data.trackCounts || {},
          logs: data.logs || [],
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLogsLoading(false);
    }
  };

  // If not authenticated, render Secret PIN Gate
  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto py-16 px-4 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="glass-panel p-8 rounded-3xl border border-indigo-500/40 w-full shadow-glow flex flex-col gap-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 mx-auto shadow-glow">
            <Lock className="w-8 h-8" />
          </div>

          <div className="flex flex-col gap-1.5">
            <h1 className="text-2xl font-extrabold text-white">Admin Access Gate</h1>
            <p className="text-xs text-zinc-400">
              Dashboard ini disembunyikan. Masukkan PIN keamanan admin untuk membuka dashboard.
            </p>
          </div>

          <form onSubmit={handlePinAuth} className="flex flex-col gap-4">
            <div className="relative text-left">
              <label className="text-[11px] font-semibold text-zinc-400 mb-1.5 block">PIN Keamanan</label>
              <input
                type="password"
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  setPinError(false);
                }}
                placeholder="Ketik PIN Admin..."
                autoFocus
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 font-mono tracking-widest"
              />
            </div>

            {pinError && (
              <p className="text-xs text-rose-400 font-medium bg-rose-950/40 p-2.5 rounded-lg border border-rose-500/30">
                ❌ PIN salah! Akses ditolak.
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold text-sm shadow-glow hover:opacity-95 active:scale-95 transition-all"
            >
              Buka Akses Admin
            </button>
          </form>
        </div>
      </div>
    );
  }

  const filteredItems = filterTrack === "ALL" ? items : items.filter((it) => it.track === filterTrack);

  return (
    <div className="max-w-6xl mx-auto py-6 px-2 sm:px-4 flex flex-col gap-6">
      
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-indigo-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-gradient-to-r from-indigo-950/50 via-zinc-900 to-zinc-950 shadow-glow">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 font-bold text-xl shrink-0">
            🛡️
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-bold font-mono">
                ADMIN AUTHORIZED
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mt-1">
              Admin & Monitoring Dashboard
            </h1>
            <p className="text-xs text-zinc-400">
              Live visitor tracking, audit log akses, dan manajemen bank soal 5 Track.
            </p>
          </div>
        </div>

        {/* Tab Buttons: Mata-Mata vs Bank Soal */}
        <div className="flex items-center gap-2 bg-zinc-900/80 p-1.5 rounded-2xl border border-zinc-800 w-full md:w-auto">
          <button
            onClick={() => {
              setActiveTab("logs");
              fetchLogs();
            }}
            className={`flex-1 md:flex-none px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === "logs"
                ? "bg-indigo-600 text-white shadow-glow"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            🕵️‍♂️ Mata-Mata Akses
          </button>
          <button
            onClick={() => {
              setActiveTab("items");
              fetchItems();
            }}
            className={`flex-1 md:flex-none px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === "items"
                ? "bg-indigo-600 text-white shadow-glow"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
            📦 Bank Soal ({items.length})
          </button>
        </div>
      </div>

      {/* TAB 1: MATA-MATA (VISITOR & AUDIT LOGS) */}
      {activeTab === "logs" && (
        <div className="flex flex-col gap-6">
          
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Total Visits */}
            <div className="glass-panel p-5 rounded-2xl border border-zinc-800 flex flex-col gap-1">
              <span className="text-xs text-zinc-400 font-medium flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-indigo-400" /> Total Aktivitas & Akses
              </span>
              <div className="text-3xl font-black text-white font-mono mt-1">
                {logsData.totalVisits} <span className="text-xs text-zinc-500 font-normal">Events</span>
              </div>
              <span className="text-[11px] text-emerald-400 font-semibold">● Real-time Live Tracking</span>
            </div>

            {/* Device Breakdown */}
            <div className="glass-panel p-5 rounded-2xl border border-zinc-800 flex flex-col gap-1">
              <span className="text-xs text-zinc-400 font-medium flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5 text-cyan-400" /> Perangkat Pengunjung
              </span>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {Object.entries(logsData.deviceCounts).map(([dev, count]) => (
                  <span key={dev} className="px-2 py-0.5 rounded-lg bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-300 font-mono">
                    {dev}: <strong>{count}</strong>
                  </span>
                ))}
              </div>
            </div>

            {/* Popular Tracks */}
            <div className="glass-panel p-5 rounded-2xl border border-zinc-800 flex flex-col gap-1">
              <span className="text-xs text-zinc-400 font-medium flex items-center gap-1.5">
                <Monitor className="w-3.5 h-3.5 text-amber-400" /> Jalur Favorit User
              </span>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {Object.entries(logsData.trackCounts).map(([trk, count]) => (
                  <span key={trk} className="px-2 py-0.5 rounded-lg bg-zinc-900 border border-zinc-800 text-[11px] text-amber-300 font-mono">
                    {trk}: <strong>{count}</strong>
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Logs Table Card */}
          <div className="glass-panel p-5 rounded-3xl border border-zinc-800 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
                <h3 className="font-extrabold text-white text-base">Riwayat Akses Pengunjung Terkini</h3>
              </div>
              <button
                onClick={fetchLogs}
                disabled={logsLoading}
                className="px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 font-bold hover:text-white flex items-center gap-1.5 active:scale-95 transition-all"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${logsLoading ? "animate-spin text-indigo-400" : ""}`} />
                Refresh Data
              </button>
            </div>

            {logsData.logs.length === 0 ? (
              <div className="py-12 text-center text-zinc-400 text-xs">
                Belum ada log akses baru yang tercatat. Sistem akan mencatat setiap ada kunjungan ke web.
              </div>
            ) : (
              <div className="overflow-x-auto rounded-2xl border border-zinc-800">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-zinc-900/90 text-zinc-400 border-b border-zinc-800">
                    <tr>
                      <th className="p-3">Waktu</th>
                      <th className="p-3">Perangkat</th>
                      <th className="p-3">Halaman / Jalur</th>
                      <th className="p-3">Target Pilihan</th>
                      <th className="p-3">IP Address</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/60 bg-zinc-950/40 text-zinc-300">
                    {logsData.logs.map((log: any, idx: number) => (
                      <tr key={log.id || idx} className="hover:bg-zinc-900/40 transition-colors">
                        <td className="p-3 text-zinc-400 whitespace-nowrap text-[11px]">
                          {new Date(log.timestamp || log.time).toLocaleTimeString("id-ID")}
                        </td>
                        <td className="p-3 whitespace-nowrap font-sans font-medium text-white">
                          {log.device || "Desktop"}
                        </td>
                        <td className="p-3 whitespace-nowrap">
                          <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold text-[10px]">
                            {log.track || "UTBK"}
                          </span>{" "}
                          <span className="text-zinc-400 text-[11px]">{log.path || "/"}</span>
                        </td>
                        <td className="p-3 text-zinc-300 font-sans text-[11px] max-w-[180px] truncate">
                          {log.target || "Default"}
                        </td>
                        <td className="p-3 text-zinc-500 text-[11px]">
                          {log.ip || "127.0.0.1"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>
      )}

      {/* TAB 2: BANK SOAL MANAGEMENT */}
      {activeTab === "items" && (
        <div className="flex flex-col gap-4">
          
          {/* Filters & Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1 bg-zinc-900/80 p-1 rounded-xl border border-zinc-800 text-xs">
              {["ALL", "UTBK", "CPNS", "REKRUTMEN", "DEWAN_RI", "DOSEN"].map((trk) => (
                <button
                  key={trk}
                  onClick={() => setFilterTrack(trk)}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                    filterTrack === trk
                      ? "bg-indigo-600 text-white"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {trk}
                </button>
              ))}
            </div>

            <button
              onClick={fetchItems}
              disabled={loading}
              className="px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 font-bold hover:text-white flex items-center gap-1.5"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-indigo-400" : ""}`} />
              Muat Ulang
            </button>
          </div>

          {/* Items List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredItems.map((item: any) => (
              <div
                key={item.id}
                className="glass-panel p-4 rounded-2xl border border-zinc-800 flex flex-col justify-between gap-3 hover:border-zinc-700 transition-all"
              >
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono text-[10px] font-bold">
                      {item.track} • {item.subtest}
                    </span>
                    <span className="text-[10px] text-zinc-500 font-mono">Diff {item.difficulty}</span>
                  </div>
                  <h4 className="font-bold text-white text-xs font-mono">{item.id}</h4>
                  <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed">
                    {item.stem}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-zinc-800/80 pt-2 text-[11px]">
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Gate Passed
                  </span>
                  <button
                    onClick={() => setPreviewItem(item)}
                    className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 hover:text-white flex items-center gap-1"
                  >
                    <Eye className="w-3 h-3" /> Preview Soal
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* Item Preview Modal */}
      {previewItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel p-6 rounded-3xl border border-zinc-800 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-glow flex flex-col gap-4 relative">
            <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
              <div>
                <span className="text-xs font-mono text-indigo-400 font-bold">{previewItem.id}</span>
                <h3 className="font-bold text-white text-base mt-0.5">Detail Item Soal ({previewItem.track})</h3>
              </div>
              <button
                onClick={() => setPreviewItem(null)}
                className="text-xs px-3 py-1.5 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
              >
                Tutup
              </button>
            </div>

            <p className="text-sm text-white font-medium whitespace-pre-line leading-relaxed">
              {previewItem.stem}
            </p>

            <div className="flex flex-col gap-2">
              {Object.entries(previewItem.options || {}).map(([k, v]: any) => (
                <div key={k} className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs flex gap-2">
                  <span className="font-bold text-indigo-400">{k}.</span>
                  <span className="text-zinc-200">{v}</span>
                </div>
              ))}
            </div>

            {previewItem.solution && (
              <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-xs flex flex-col gap-2">
                <span className="font-bold text-indigo-300">💡 Konsep: {previewItem.solution.concept}</span>
                <ol className="list-decimal list-inside space-y-1 text-zinc-300">
                  {previewItem.solution.steps?.map((s: string, idx: number) => (
                    <li key={idx}>{s}</li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
