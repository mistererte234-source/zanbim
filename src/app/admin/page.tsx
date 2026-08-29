"use client";

import { useState, useEffect } from "react";
import { ShieldCheck, AlertCircle, Plus, Upload, Download, Eye, RefreshCw, Layers, CheckCircle2, Lock, KeyRound, EyeOff, Radio, Smartphone, Monitor, Globe, Activity, MapPin, Battery, Cpu, Wifi, MessageSquare, Info, X, Zap } from "lucide-react";
import { ItemPayload, ValidationResult } from "@/lib/types";

export default function AdminPortalPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>("");
  const [pinError, setPinError] = useState<boolean>(false);

  const [activeTab, setActiveTab] = useState<"logs" | "items">("logs");
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [filterTrack, setFilterTrack] = useState<string>("ALL");
  const [previewItem, setPreviewItem] = useState<any | null>(null);

  // Mata-Mata Forensic Logs State
  const [logsData, setLogsData] = useState<{
    totalVisits: number;
    deviceCounts: Record<string, number>;
    trackCounts: Record<string, number>;
    cityCounts: Record<string, number>;
    referrerCounts: Record<string, number>;
    logs: any[];
  }>({
    totalVisits: 0,
    deviceCounts: {},
    trackCounts: {},
    cityCounts: {},
    referrerCounts: {},
    logs: [],
  });
  const [logsLoading, setLogsLoading] = useState<boolean>(false);
  const [selectedForensicLog, setSelectedForensicLog] = useState<any | null>(null);

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
          cityCounts: data.cityCounts || {},
          referrerCounts: data.referrerCounts || {},
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
    <div className="max-w-6xl mx-auto py-4 sm:py-6 px-2 sm:px-4 flex flex-col gap-6">
      
      {/* Header Banner */}
      <div className="glass-panel p-5 sm:p-6 rounded-3xl border border-indigo-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-gradient-to-r from-indigo-950/50 via-zinc-900 to-zinc-950 shadow-glow">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 font-bold text-xl shrink-0">
            🛡️
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-bold font-mono">
                INTEL FORENSIK AKTIF
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mt-1">
              Admin & Telemetri Mata-Mata
            </h1>
            <p className="text-xs text-zinc-400">
              Pelacakan forensik live: Lokasi Geo, ISP/Jaringan, Perangkat, Baterai, Asal Traffic WA, dan Bank Soal.
            </p>
          </div>
        </div>

        {/* Tab Buttons */}
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
            🕵️‍♂️ Mata-Mata Forensik
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

      {/* TAB 1: MATA-MATA (LIVE FORENSIC VISITOR AUDIT) */}
      {activeTab === "logs" && (
        <div className="flex flex-col gap-6">
          
          {/* Summary Grid (4 Hacker Cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            
            {/* Card 1: Total Visits */}
            <div className="glass-panel p-4 rounded-2xl border border-zinc-800 flex flex-col justify-between gap-2">
              <span className="text-[11px] text-zinc-400 font-semibold flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-indigo-400" /> Total Log Telemetri
              </span>
              <div className="text-2xl font-black text-white font-mono">
                {logsData.totalVisits} <span className="text-xs text-zinc-500 font-normal">Events</span>
              </div>
              <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" /> Real-time Live Sensor
              </span>
            </div>

            {/* Card 2: Geo / Cities */}
            <div className="glass-panel p-4 rounded-2xl border border-zinc-800 flex flex-col justify-between gap-2">
              <span className="text-[11px] text-zinc-400 font-semibold flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-400" /> Wilayah Pengunjung
              </span>
              <div className="flex flex-wrap gap-1 max-h-16 overflow-y-auto no-scrollbar">
                {Object.entries(logsData.cityCounts).slice(0, 3).map(([city, cnt]) => (
                  <span key={city} className="px-2 py-0.5 rounded-lg bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-300 font-mono">
                    {city}: <strong>{cnt}</strong>
                  </span>
                ))}
              </div>
              <span className="text-[10px] text-zinc-500">Edge IP Geolocation</span>
            </div>

            {/* Card 3: Devices & OS */}
            <div className="glass-panel p-4 rounded-2xl border border-zinc-800 flex flex-col justify-between gap-2">
              <span className="text-[11px] text-zinc-400 font-semibold flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5 text-cyan-400" /> Perangkat & OS
              </span>
              <div className="flex flex-wrap gap-1 max-h-16 overflow-y-auto no-scrollbar">
                {Object.entries(logsData.deviceCounts).slice(0, 3).map(([dev, cnt]) => (
                  <span key={dev} className="px-2 py-0.5 rounded-lg bg-zinc-900 border border-zinc-800 text-[10px] text-cyan-300 font-mono truncate max-w-full">
                    {dev}: <strong>{cnt}</strong>
                  </span>
                ))}
              </div>
              <span className="text-[10px] text-zinc-500">Hardware & Screen Probe</span>
            </div>

            {/* Card 4: Traffic Sources (WhatsApp, etc.) */}
            <div className="glass-panel p-4 rounded-2xl border border-zinc-800 flex flex-col justify-between gap-2">
              <span className="text-[11px] text-zinc-400 font-semibold flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" /> Asal Rujukan (Referrer)
              </span>
              <div className="flex flex-wrap gap-1 max-h-16 overflow-y-auto no-scrollbar">
                {Object.entries(logsData.referrerCounts).slice(0, 3).map(([ref, cnt]) => (
                  <span key={ref} className="px-2 py-0.5 rounded-lg bg-zinc-900 border border-zinc-800 text-[10px] text-emerald-300 font-mono truncate max-w-full">
                    {ref}: <strong>{cnt}</strong>
                  </span>
                ))}
              </div>
              <span className="text-[10px] text-zinc-500">Traffic Source Attribution</span>
            </div>

          </div>

          {/* Detailed Forensic Table */}
          <div className="glass-panel p-4 sm:p-5 rounded-3xl border border-zinc-800 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
                <h3 className="font-extrabold text-white text-sm sm:text-base">Audit Trail Log Pengunjung & Forensik Lengkap</h3>
              </div>
              <button
                onClick={fetchLogs}
                disabled={logsLoading}
                className="px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 font-bold hover:text-white flex items-center gap-1.5 active:scale-95 transition-all"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${logsLoading ? "animate-spin text-indigo-400" : ""}`} />
                Refresh Sensor
              </button>
            </div>

            {logsData.logs.length === 0 ? (
              <div className="py-12 text-center text-zinc-400 text-xs">
                Belum ada telemetri baru. Sensor otomatis mencatat setiap user mengakses link web lo.
              </div>
            ) : (
              <div className="overflow-x-auto rounded-2xl border border-zinc-800">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-zinc-900/90 text-zinc-400 border-b border-zinc-800">
                    <tr>
                      <th className="p-3">Waktu & Lokasi</th>
                      <th className="p-3">Perangkat / Browser</th>
                      <th className="p-3">Jalur & Target</th>
                      <th className="p-3">Asal Traffic</th>
                      <th className="p-3">Koneksi & Baterai</th>
                      <th className="p-3 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/60 bg-zinc-950/40 text-zinc-300">
                    {logsData.logs.map((log: any, idx: number) => {
                      const geo = log.geo || {};
                      const dev = log.device || {};
                      const net = log.network || {};
                      const sess = log.session || {};

                      return (
                        <tr key={log.id || idx} className="hover:bg-zinc-900/50 transition-colors">
                          
                          {/* Waktu & Lokasi */}
                          <td className="p-3 whitespace-nowrap">
                            <span className="font-bold text-white block">
                              {new Date(log.timestamp || sess.timestamp).toLocaleTimeString("id-ID")} WIB
                            </span>
                            <span className="text-[10px] text-zinc-400 flex items-center gap-1 mt-0.5">
                              <MapPin className="w-3 h-3 text-rose-400" />
                              {geo.city || "Surabaya"}, {geo.country || "ID"}
                            </span>
                          </td>

                          {/* Perangkat & Browser */}
                          <td className="p-3 whitespace-nowrap">
                            <span className="text-white font-sans font-semibold block">
                              {dev.model || "Desktop PC"}
                            </span>
                            <span className="text-[10px] text-cyan-300 block font-mono">
                              {dev.os || "OS"} • {dev.browser || "Browser"}
                            </span>
                          </td>

                          {/* Jalur & Target */}
                          <td className="p-3 whitespace-nowrap">
                            <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold text-[10px] inline-block">
                              {sess.track || log.track || "UTBK"}
                            </span>
                            <span className="text-[11px] text-zinc-300 font-sans block mt-0.5 max-w-[160px] truncate">
                              {sess.target || log.target || "Default Target"}
                            </span>
                          </td>

                          {/* Asal Traffic */}
                          <td className="p-3 whitespace-nowrap">
                            <span className="text-emerald-400 font-sans font-medium text-[11px] block">
                              {sess.referrer || "Direct (Ketik URL)"}
                            </span>
                            <span className="text-[10px] text-zinc-500">
                              Kunjungan Ke-{sess.visitCount || 1}
                            </span>
                          </td>

                          {/* Jaringan & Baterai */}
                          <td className="p-3 whitespace-nowrap text-[11px]">
                            <span className="text-zinc-300 block flex items-center gap-1 font-mono">
                              <Wifi className="w-3 h-3 text-indigo-400" /> {net.type || "4G"} ({net.speed || "Fast"})
                            </span>
                            <span className="text-[10px] text-zinc-400 block font-mono">
                              {dev.battery && dev.battery !== "N/A" ? dev.battery : "🔋 Normal"}
                            </span>
                          </td>

                          {/* Forensic Inspect Button */}
                          <td className="p-3 whitespace-nowrap text-right">
                            <button
                              onClick={() => setSelectedForensicLog(log)}
                              className="px-2.5 py-1 rounded-lg bg-indigo-600/30 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/40 text-[11px] font-bold transition-all"
                            >
                              🔍 Detail
                            </button>
                          </td>

                        </tr>
                      );
                    })}
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

      {/* FORENSIC INSPECTOR MODAL */}
      {selectedForensicLog && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
          <div className="glass-panel p-5 sm:p-6 rounded-3xl border border-indigo-500/40 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-glow flex flex-col gap-4 relative animate-in zoom-in-95 duration-200">
            
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-indigo-400" />
                <h3 className="font-extrabold text-white text-base">Inspeksi Forensik Telemetri Pengunjung</h3>
              </div>
              <button
                onClick={() => setSelectedForensicLog(null)}
                className="p-1.5 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Geo & Network Banner */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-zinc-900/80 p-3 rounded-2xl border border-zinc-800 text-xs font-mono">
              <div>
                <span className="text-zinc-500 block text-[10px]">Kota / Lokasi</span>
                <span className="text-white font-bold">{selectedForensicLog.geo?.city || "Surabaya"}, {selectedForensicLog.geo?.country || "ID"}</span>
              </div>
              <div>
                <span className="text-zinc-500 block text-[10px]">IP Address</span>
                <span className="text-cyan-300 font-bold">{selectedForensicLog.ip || "127.0.0.1"}</span>
              </div>
              <div>
                <span className="text-zinc-500 block text-[10px]">Koneksi & RTT</span>
                <span className="text-amber-300 font-bold">{selectedForensicLog.network?.type || "4G"} ({selectedForensicLog.network?.latency || "30ms"})</span>
              </div>
              <div>
                <span className="text-zinc-500 block text-[10px]">Status Baterai</span>
                <span className="text-emerald-300 font-bold">{selectedForensicLog.device?.battery || "🔋 90%"}</span>
              </div>
            </div>

            {/* Hardware & Browser Telemetry */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Spesifikasi Hardware & Perangkat</span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono bg-zinc-950/60 p-3 rounded-xl border border-zinc-800/80">
                <div>
                  <span className="text-zinc-500 block text-[10px]">Model Perangkat:</span>
                  <span className="text-white">{selectedForensicLog.device?.model || "Apple iPhone"}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-[10px]">Sistem Operasi:</span>
                  <span className="text-white">{selectedForensicLog.device?.os || "iOS 18"}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-[10px]">Browser:</span>
                  <span className="text-white">{selectedForensicLog.device?.browser || "Mobile Safari"}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-[10px]">Resolusi Layar:</span>
                  <span className="text-white">{selectedForensicLog.device?.screenRes || "393x852"}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-[10px]">CPU Cores & RAM:</span>
                  <span className="text-white">{selectedForensicLog.device?.cpuCores || 6} Cores / {selectedForensicLog.device?.ram || "6 GB"}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-[10px]">Bahasa & Zona Waktu:</span>
                  <span className="text-white">{selectedForensicLog.network?.language || "id-ID"} ({selectedForensicLog.network?.timeZone || "Asia/Jakarta"})</span>
                </div>
              </div>
            </div>

            {/* Session & Target Intent */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Aktivitas & Rujukan Kunjungan</span>
              <div className="bg-zinc-950/60 p-3 rounded-xl border border-zinc-800/80 text-xs flex flex-col gap-2 font-sans">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Rujukan Asal (Referrer):</span>
                  <strong className="text-emerald-400 font-mono">{selectedForensicLog.session?.referrer || "Direct Link"}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Jalur Dipilih:</span>
                  <strong className="text-indigo-400 font-mono">{selectedForensicLog.session?.track || "UTBK"}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Target Prodi / Instansi:</span>
                  <strong className="text-white">{selectedForensicLog.session?.target || "Belum Diatur"}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Session Identifier:</span>
                  <span className="font-mono text-zinc-500 text-[10px]">{selectedForensicLog.session?.sessionId || "sess_001"}</span>
                </div>
              </div>
            </div>

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
