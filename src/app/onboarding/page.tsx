"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Target, Compass, Sparkles, ArrowRight, CheckCircle2, ShieldAlert, Briefcase, Landmark } from "lucide-react";
import { Track } from "@/lib/types";

export default function OnboardingPage() {
  const router = useRouter();
  const [track, setTrack] = useState<Track>("UTBK");

  // Sub-track target selections
  const [targetPtn, setTargetPtn] = useState("Universitas Indonesia");
  const [targetProdi, setTargetProdi] = useState("Ilmu Komputer");
  const [targetMinistry, setTargetMinistry] = useState("Kementerian Keuangan");
  const [targetFormasi, setTargetFormasi] = useState("Analis Kebijakan Ahli Pertama");

  // HRD Candidate Role
  const [hrdRole, setHrdRole] = useState("IT & Software Engineering");

  // DPR RI Commission Selection
  const [dprCommission, setDprCommission] = useState("Komisi III (Hukum, HAM, & Keamanan)");

  const hrdRolesList = [
    "IT & Software Engineering",
    "Keuangan & Akuntansi",
    "Pemasaran & Penjualan (Marketing & Sales)",
    "SDM & Operasional (HR & Ops)",
    "Management Trainee (Generalist)",
  ];

  const dprCommissionsList = [
    "Komisi I (Pertahanan, Luar Negeri, & Kominfo)",
    "Komisi II (Pemerintahan Dalam Negeri & KPU)",
    "Komisi III (Hukum, HAM, KPK, & Keamanan)",
    "Komisi IV (Pertanian, Kehutanan, & Kelautan)",
    "Komisi V (Infrastruktur, Perhubungan, & PUPR)",
    "Komisi VI (Perdagangan, BUMN, & UMKM)",
    "Komisi VII (Energi, ESDM, Riset, & Inovasi)",
    "Komisi VIII (Agama, Sosial, & Kebencanaan)",
    "Komisi IX (Kesehatan, Ketenagakerjaan, & BPJS)",
    "Komisi X (Pendidikan, Olahraga, & Pariwisata)",
    "Komisi XI (Keuangan, Perbankan, BI, & Bappenas)",
  ];

  const handleSaveAndStart = () => {
    localStorage.setItem("zanbim_track", track);
    
    let targetName = "";
    if (track === "UTBK") targetName = `${targetPtn} - ${targetProdi}`;
    else if (track === "CPNS") targetName = `${targetMinistry} - ${targetFormasi}`;
    else if (track === "REKRUTMEN") targetName = `Karyawan: ${hrdRole}`;
    else if (track === "DEWAN_RI") targetName = `Anggota DPR RI: ${dprCommission}`;

    localStorage.setItem("zanbim_target", targetName);
    window.dispatchEvent(new Event("zanbim_track_changed"));
    router.push(`/diagnosis?track=${track}`);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 flex flex-col gap-8">
      {/* Header Banner */}
      <div className="text-center flex flex-col items-center gap-3">
        <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" /> Langkah 1: Pilih Target & Jalur Pengujian
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Sesuaikan Asesmen dengan Target Anda
        </h1>
        <p className="text-zinc-400 max-w-xl text-sm leading-relaxed">
          ZanBimbel v3 mendukung tes adaptif untuk **Siswa UTBK**, **Calon ASN CPNS**, **Rekrutmen Karyawan HRD (Tes IQ Top Corp)**, dan **Kelayakan Calon Anggota DPR RI**.
        </p>
      </div>

      {/* 4 Cards Track Switcher */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Card 1: UTBK */}
        <div
          onClick={() => setTrack("UTBK")}
          className={`p-5 rounded-2xl border cursor-pointer transition-all flex flex-col gap-3 relative ${
            track === "UTBK"
              ? "bg-indigo-950/40 border-indigo-500/80 shadow-glow"
              : "bg-zinc-900/60 border-zinc-800 hover:border-zinc-700"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold">
              🎓
            </div>
            {track === "UTBK" && <CheckCircle2 className="w-5 h-5 text-indigo-400" />}
          </div>
          <div>
            <h3 className="font-extrabold text-white text-lg">UTBK SNBT 2026</h3>
            <p className="text-xs text-zinc-400 mt-1">
              Tes Potensi Skolastik (TPS), Literasi Indonesia, Literasi Inggris, & Penalaran Matematika.
            </p>
          </div>
        </div>

        {/* Card 2: CPNS */}
        <div
          onClick={() => setTrack("CPNS")}
          className={`p-5 rounded-2xl border cursor-pointer transition-all flex flex-col gap-3 relative ${
            track === "CPNS"
              ? "bg-cyan-950/40 border-cyan-500/80 shadow-glow"
              : "bg-zinc-900/60 border-zinc-800 hover:border-zinc-700"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold">
              🏛️
            </div>
            {track === "CPNS" && <CheckCircle2 className="w-5 h-5 text-cyan-400" />}
          </div>
          <div>
            <h3 className="font-extrabold text-white text-lg">CPNS SKD 2026</h3>
            <p className="text-xs text-zinc-400 mt-1">
              Tes Wawasan Kebangsaan (TWK 65), Tes Inteligensi Umum (TIU 80), & TKP Likert (166).
            </p>
          </div>
        </div>

        {/* Card 3: REKRUTMEN HRD */}
        <div
          onClick={() => setTrack("REKRUTMEN")}
          className={`p-5 rounded-2xl border cursor-pointer transition-all flex flex-col gap-3 relative ${
            track === "REKRUTMEN"
              ? "bg-emerald-950/40 border-emerald-500/80 shadow-glow"
              : "bg-zinc-900/60 border-zinc-800 hover:border-zinc-700"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold">
              <Briefcase className="w-5 h-5" />
            </div>
            {track === "REKRUTMEN" && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
          </div>
          <div>
            <h3 className="font-extrabold text-white text-lg">Rekrutmen HRD & Tes IQ</h3>
            <p className="text-xs text-zinc-400 mt-1">
              Tes IQ Matriks Raven, Penalaran Kritis, Finansial Numerik, & Psikotes Kerja Perusahaan Top.
            </p>
          </div>
        </div>

        {/* Card 4: DEWAN RI */}
        <div
          onClick={() => setTrack("DEWAN_RI")}
          className={`p-5 rounded-2xl border cursor-pointer transition-all flex flex-col gap-3 relative ${
            track === "DEWAN_RI"
              ? "bg-amber-950/40 border-amber-500/80 shadow-glow"
              : "bg-zinc-900/60 border-zinc-800 hover:border-zinc-700"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-amber-600/20 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold">
              <Landmark className="w-5 h-5" />
            </div>
            {track === "DEWAN_RI" && <CheckCircle2 className="w-5 h-5 text-amber-400" />}
          </div>
          <div>
            <h3 className="font-extrabold text-white text-lg">Tes Kelayakan Dewan RI</h3>
            <p className="text-xs text-zinc-400 mt-1">
              Uji Asesmen Kelayakan Legislator Komisi I - XI (Fungsi Legislasi, Budgeting APBN, & Wawasan).
            </p>
          </div>
        </div>

      </div>

      {/* Target Customization Form */}
      <div className="glass-panel p-6 rounded-2xl border border-zinc-800 flex flex-col gap-5">
        <h3 className="font-bold text-white text-base flex items-center gap-2">
          <Target className="w-4 h-4 text-indigo-400" />
          Rincian Spesifikasi Target Anda
        </h3>

        {track === "UTBK" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-zinc-400 mb-1.5 block">Perguruan Tinggi Negeri (PTN)</label>
              <input
                type="text"
                value={targetPtn}
                onChange={(e) => setTargetPtn(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-indigo-500"
                placeholder="Contoh: Universitas Gadjah Mada"
              />
            </div>
            <div>
              <label className="text-xs text-zinc-400 mb-1.5 block">Program Studi (Prodi)</label>
              <input
                type="text"
                value={targetProdi}
                onChange={(e) => setTargetProdi(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-indigo-500"
                placeholder="Contoh: Kedokteran / Kedinasan"
              />
            </div>
          </div>
        )}

        {track === "CPNS" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-zinc-400 mb-1.5 block">Kementerian / Lembaga Target</label>
              <input
                type="text"
                value={targetMinistry}
                onChange={(e) => setTargetMinistry(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-cyan-500"
                placeholder="Contoh: Kementerian Hukum dan HAM"
              />
            </div>
            <div>
              <label className="text-xs text-zinc-400 mb-1.5 block">Formasi Jabatan Target</label>
              <input
                type="text"
                value={targetFormasi}
                onChange={(e) => setTargetFormasi(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-cyan-500"
                placeholder="Contoh: Pemeriksa Keagamaan / Auditor"
              />
            </div>
          </div>
        )}

        {track === "REKRUTMEN" && (
          <div>
            <label className="text-xs text-zinc-400 mb-1.5 block">Pilih Bidang / Posisi Karyawan Target</label>
            <select
              value={hrdRole}
              onChange={(e) => setHrdRole(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-emerald-500"
            >
              {hrdRolesList.map((role) => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>
        )}

        {track === "DEWAN_RI" && (
          <div>
            <label className="text-xs text-zinc-400 mb-1.5 block">Pilih Komisi DPR RI Target</label>
            <select
              value={dprCommission}
              onChange={(e) => setDprCommission(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-amber-500"
            >
              {dprCommissionsList.map((comm) => (
                <option key={comm} value={comm}>{comm}</option>
              ))}
            </select>
          </div>
        )}

        <button
          onClick={handleSaveAndStart}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 text-white font-bold text-base hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-glow mt-2"
        >
          Simpan Target & Mulai Tes Diagnosis
          <ArrowRight className="w-5 h-5" />
        </button>

      </div>
    </div>
  );
}
