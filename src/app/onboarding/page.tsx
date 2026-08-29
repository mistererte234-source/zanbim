"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Target, Compass, Sparkles, ArrowRight, CheckCircle2, ShieldAlert, Briefcase, Landmark, GraduationCap, School, Award, TrendingUp } from "lucide-react";
import { Track } from "@/lib/types";
import { TOP_10_PTN } from "@/lib/ptn-data";

export default function OnboardingPage() {
  const router = useRouter();
  const [track, setTrack] = useState<Track>("UTBK");

  // UTBK Target selections
  const [selectedPtnId, setSelectedPtnId] = useState<string>("ui");
  const [selectedMajorName, setSelectedMajorName] = useState<string>("Pendidikan Dokter");

  // CPNS Target selections
  const [targetMinistry, setTargetMinistry] = useState("Kementerian Keuangan");
  const [targetFormasi, setTargetFormasi] = useState("Analis Kebijakan Ahli Pertama");

  // HRD Candidate Role
  const [hrdRole, setHrdRole] = useState("IT & Software Engineering");

  // DPR RI Commission Selection
  const [dprCommission, setDprCommission] = useState("Komisi III (Hukum, HAM, & Keamanan)");

  // Dosen Target Selection
  const [dosenUniversity, setDosenUniversity] = useState("Universitas Gadjah Mada (UGM)");
  const [dosenField, setDosenField] = useState("Teknologi, Informasi, & Sains Data");

  const currentPtn = TOP_10_PTN.find((p) => p.id === selectedPtnId) || TOP_10_PTN[0];
  const currentMajor = currentPtn.majors.find((m) => m.name === selectedMajorName) || currentPtn.majors[0];

  const handlePtnChange = (ptnId: string) => {
    setSelectedPtnId(ptnId);
    const ptn = TOP_10_PTN.find((p) => p.id === ptnId);
    if (ptn && ptn.majors.length > 0) {
      setSelectedMajorName(ptn.majors[0].name);
    }
  };

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

  const dosenFieldsList = [
    "Teknologi, Informasi, & Sains Data",
    "Sains Dasar & Rekayasa Teknik",
    "Sosial, Politik, Hukum, & Ekonomi",
    "Kedokteran & Ilmu Kesehatan masyarakat",
    "Pendidikan, Bahasa, & Keguruan",
    "Seni, Desain, & Industri Kreatif",
  ];

  const handleSaveAndStart = () => {
    localStorage.setItem("zanbim_track", track);
    
    let targetName = "";
    if (track === "UTBK") {
      targetName = `${currentPtn.shortName} - ${currentMajor.name}`;
      localStorage.setItem("zanbim_ptn", currentPtn.name);
      localStorage.setItem("zanbim_major", currentMajor.name);
      localStorage.setItem("zanbim_target_score", String(currentMajor.passingScore));
      localStorage.setItem("zanbim_major_category", currentMajor.category);
    } else if (track === "CPNS") {
      targetName = `${targetMinistry} - ${targetFormasi}`;
    } else if (track === "REKRUTMEN") {
      targetName = `Karyawan: ${hrdRole}`;
    } else if (track === "DEWAN_RI") {
      targetName = `Anggota DPR RI: ${dprCommission}`;
    } else if (track === "DOSEN") {
      targetName = `Dosen ${dosenUniversity} (${dosenField})`;
    }

    localStorage.setItem("zanbim_target", targetName);
    window.dispatchEvent(new Event("zanbim_track_changed"));
    router.push(`/diagnosis?track=${track}`);
  };

  return (
    <div className="max-w-5xl mx-auto py-6 sm:py-8 px-2 sm:px-4 flex flex-col gap-6 sm:gap-8">
      {/* Header Banner */}
      <div className="text-center flex flex-col items-center gap-2.5">
        <span className="px-3.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow-glow">
          <Sparkles className="w-3.5 h-3.5" /> Langkah 1: Tentukan Target Spesifik Anda
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Pilih Jalur & Standar Kelulusan Target
        </h1>
        <p className="text-zinc-400 max-w-xl text-xs sm:text-sm leading-relaxed">
          Setiap jurusan dan kampus punya standar skor penerimaan berbeda. AI kami akan mengukur gap kemampuan Anda langsung ke passing grade target.
        </p>
      </div>

      {/* 5 Cards Track Switcher */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        
        {/* Card 1: UTBK */}
        <div
          onClick={() => setTrack("UTBK")}
          className={`p-4 sm:p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between gap-3 relative ${
            track === "UTBK"
              ? "bg-indigo-950/60 border-indigo-500 text-white shadow-glow scale-[1.02]"
              : "glass-panel text-zinc-400 hover:text-zinc-200 hover:border-zinc-700"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-2xl">🎓</span>
            {track === "UTBK" && <CheckCircle2 className="w-5 h-5 text-indigo-400" />}
          </div>
          <div>
            <h3 className="font-bold text-white text-sm">UTBK SNBT 2026</h3>
            <p className="text-[11px] text-zinc-400 mt-0.5 leading-relaxed">10 PTN Top & Passing Score</p>
          </div>
        </div>

        {/* Card 2: CPNS */}
        <div
          onClick={() => setTrack("CPNS")}
          className={`p-4 sm:p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between gap-3 relative ${
            track === "CPNS"
              ? "bg-cyan-950/60 border-cyan-500 text-white shadow-glow-cyan scale-[1.02]"
              : "glass-panel text-zinc-400 hover:text-zinc-200 hover:border-zinc-700"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-2xl">🏛️</span>
            {track === "CPNS" && <CheckCircle2 className="w-5 h-5 text-cyan-400" />}
          </div>
          <div>
            <h3 className="font-bold text-white text-sm">CPNS SKD 2026</h3>
            <p className="text-[11px] text-zinc-400 mt-0.5 leading-relaxed">TWK, TIU, TKP Likert 1-5</p>
          </div>
        </div>

        {/* Card 3: REKRUTMEN HRD */}
        <div
          onClick={() => setTrack("REKRUTMEN")}
          className={`p-4 sm:p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between gap-3 relative ${
            track === "REKRUTMEN"
              ? "bg-emerald-950/60 border-emerald-500 text-white shadow-glow-emerald scale-[1.02]"
              : "glass-panel text-zinc-400 hover:text-zinc-200 hover:border-zinc-700"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-2xl">💼</span>
            {track === "REKRUTMEN" && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
          </div>
          <div>
            <h3 className="font-bold text-white text-sm">Rekrutmen HRD</h3>
            <p className="text-[11px] text-zinc-400 mt-0.5 leading-relaxed">Tes IQ Raven & Logika Karyawan</p>
          </div>
        </div>

        {/* Card 4: DEWAN RI */}
        <div
          onClick={() => setTrack("DEWAN_RI")}
          className={`p-4 sm:p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between gap-3 relative ${
            track === "DEWAN_RI"
              ? "bg-amber-950/60 border-amber-500 text-white shadow-glow scale-[1.02]"
              : "glass-panel text-zinc-400 hover:text-zinc-200 hover:border-zinc-700"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-2xl">🏛️</span>
            {track === "DEWAN_RI" && <CheckCircle2 className="w-5 h-5 text-amber-400" />}
          </div>
          <div>
            <h3 className="font-bold text-white text-sm">Anggota Dewan RI</h3>
            <p className="text-[11px] text-zinc-400 mt-0.5 leading-relaxed">Fit & Proper Test Komisi I–XI</p>
          </div>
        </div>

        {/* Card 5: DOSEN */}
        <div
          onClick={() => setTrack("DOSEN")}
          className={`p-4 sm:p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between gap-3 relative ${
            track === "DOSEN"
              ? "bg-purple-950/60 border-purple-500 text-white shadow-glow scale-[1.02]"
              : "glass-panel text-zinc-400 hover:text-zinc-200 hover:border-zinc-700"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-2xl">🎓</span>
            {track === "DOSEN" && <CheckCircle2 className="w-5 h-5 text-purple-400" />}
          </div>
          <div>
            <h3 className="font-bold text-white text-sm">Seleksi Dosen</h3>
            <p className="text-[11px] text-zinc-400 mt-0.5 leading-relaxed">Tri Dharma & Uji NIDN</p>
          </div>
        </div>

      </div>

      {/* Target Selector Configurations */}
      <div className="glass-panel p-5 sm:p-8 rounded-3xl border border-white/10 flex flex-col gap-6 shadow-xl">
        
        {/* ================= UTBK CONFIG (10 PTN & MAJORS) ================= */}
        {track === "UTBK" && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1 border-b border-white/10 pb-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <School className="w-5 h-5 text-indigo-400" />
                Target Perguruan Tinggi Negeri (10 PTN Favorit)
              </h2>
              <p className="text-xs text-zinc-400">
                Pilih kampus dan jurusan impian Anda untuk memuat standar skor kelulusan (*passing grade*) resmi.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Select PTN */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-zinc-300">Pilih Kampus Negeri (PTN)</label>
                <select
                  value={selectedPtnId}
                  onChange={(e) => handlePtnChange(e.target.value)}
                  className="bg-zinc-900 border border-zinc-700/80 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all font-medium"
                >
                  {TOP_10_PTN.map((ptn) => (
                    <option key={ptn.id} value={ptn.id}>
                      {ptn.name} — ({ptn.location})
                    </option>
                  ))}
                </select>
              </div>

              {/* Select Major */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-zinc-300">Pilih Program Studi / Jurusan</label>
                <select
                  value={selectedMajorName}
                  onChange={(e) => setSelectedMajorName(e.target.value)}
                  className="bg-zinc-900 border border-zinc-700/80 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all font-medium"
                >
                  {currentPtn.majors.map((m) => (
                    <option key={m.name} value={m.name}>
                      [{m.category}] {m.name} — Min Skor {m.passingScore} ({m.competitiveness})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Target Score Summary Card */}
            <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-glow">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-mono font-bold text-sm">
                  🎯
                </div>
                <div>
                  <span className="text-[11px] font-bold text-indigo-300 uppercase tracking-wider">Standar Target Skor UTBK SNBT</span>
                  <h4 className="text-base font-extrabold text-white">{currentPtn.shortName} — {currentMajor.name}</h4>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <span className="px-3 py-1 rounded-xl bg-indigo-600 text-white font-mono font-black text-sm shadow-glow">
                  Min {currentMajor.passingScore} / 800
                </span>
                <span className="px-2.5 py-1 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-300 font-bold text-xs">
                  {currentMajor.competitiveness}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ================= CPNS CONFIG ================= */}
        {track === "CPNS" && (
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3">
              <Landmark className="w-5 h-5 text-cyan-400" />
              Target Kementerian / Lembaga & Jabatan Formasi CPNS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-zinc-300">Kementerian / Lembaga Target</label>
                <select
                  value={targetMinistry}
                  onChange={(e) => setTargetMinistry(e.target.value)}
                  className="bg-zinc-900 border border-zinc-700/80 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="Kementerian Keuangan">Kementerian Keuangan (Kemenkeu)</option>
                  <option value="Kementerian Hukum dan HAM">Kementerian Hukum dan HAM (Kemenkumham)</option>
                  <option value="Kementerian Luar Negeri">Kementerian Luar Negeri (Kemlu)</option>
                  <option value="Kejaksaan Agung RI">Kejaksaan Agung RI</option>
                  <option value="Kementerian PUPR">Kementerian PUPR</option>
                  <option value="Kementerian Kesehatan">Kementerian Kesehatan (Kemenkes)</option>
                  <option value="Kementerian Komunikasi & Informatika">Kementerian Kominfo</option>
                  <option value="Badan Pemeriksa Keuangan">Badan Pemeriksa Keuangan (BPK)</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-zinc-300">Jabatan Formasi / Bidang</label>
                <input
                  type="text"
                  value={targetFormasi}
                  onChange={(e) => setTargetFormasi(e.target.value)}
                  placeholder="Contoh: Analis Kebijakan / Auditor / Pranata Komputer"
                  className="bg-zinc-900 border border-zinc-700/80 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500 font-medium"
                />
              </div>
            </div>
          </div>
        )}

        {/* ================= REKRUTMEN HRD CONFIG ================= */}
        {track === "REKRUTMEN" && (
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3">
              <Briefcase className="w-5 h-5 text-emerald-400" />
              Target Divisi / Posisi Rekrutmen Perusahaan
            </h2>
            <div className="flex flex-col gap-2 max-w-md">
              <label className="text-xs font-semibold text-zinc-300">Divisi Karir yang Dilamar</label>
              <select
                value={hrdRole}
                onChange={(e) => setHrdRole(e.target.value)}
                className="bg-zinc-900 border border-zinc-700/80 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500"
              >
                {hrdRolesList.map((role) => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* ================= DEWAN RI CONFIG ================= */}
        {track === "DEWAN_RI" && (
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3">
              <Landmark className="w-5 h-5 text-amber-400" />
              Target Komisi DPR RI (Fit & Proper Test)
            </h2>
            <div className="flex flex-col gap-2 max-w-xl">
              <label className="text-xs font-semibold text-zinc-300">Pilih Komisi Sektoral</label>
              <select
                value={dprCommission}
                onChange={(e) => setDprCommission(e.target.value)}
                className="bg-zinc-900 border border-zinc-700/80 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
              >
                {dprCommissionsList.map((komisi) => (
                  <option key={komisi} value={komisi}>{komisi}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* ================= DOSEN CONFIG ================= */}
        {track === "DOSEN" && (
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3">
              <GraduationCap className="w-5 h-5 text-purple-400" />
              Target Kampus & Rumpun Bidang Dosen
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-zinc-300">Target Universitas / Institut</label>
                <input
                  type="text"
                  value={dosenUniversity}
                  onChange={(e) => setDosenUniversity(e.target.value)}
                  placeholder="Contoh: Universitas Indonesia / UGM / ITB / PTS Favorit"
                  className="bg-zinc-900 border border-zinc-700/80 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500 font-medium"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-zinc-300">Rumpun Ilmu / Bidang Keahlian</label>
                <select
                  value={dosenField}
                  onChange={(e) => setDosenField(e.target.value)}
                  className="bg-zinc-900 border border-zinc-700/80 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500"
                >
                  {dosenFieldsList.map((f) => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* CTA Button */}
        <button
          onClick={handleSaveAndStart}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 text-white font-extrabold text-sm sm:text-base shadow-glow hover:opacity-95 active:scale-[0.985] transition-all flex items-center justify-center gap-2 mt-2"
        >
          Simpan Target & Mulai Tes Diagnosis
          <ArrowRight className="w-5 h-5" />
        </button>

      </div>
    </div>
  );
}
