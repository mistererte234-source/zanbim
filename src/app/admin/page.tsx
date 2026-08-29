"use client";

import { useState, useEffect } from "react";
import { ShieldAlert, Plus, Upload, Download, Eye, CheckCircle2, XCircle, FileText, RefreshCw, Sparkles, Filter } from "lucide-react";
import { validateItemGate } from "@/lib/gate-validator";
import { INITIAL_TAXONOMY } from "@/lib/taxonomy";

export default function AdminCMSPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"list" | "create" | "import">("list");

  // JSONL Import state
  const [jsonlContent, setJsonlContent] = useState("");
  const [importResults, setImportResults] = useState<any>(null);
  const [importing, setImporting] = useState(false);

  // Preview Modal
  const [previewItem, setPreviewItem] = useState<any | null>(null);

  // Create Form State
  const [formData, setFormData] = useState<any>({
    id: "utbk.pm.aljabar.persamaan.099",
    version: 1,
    track: "UTBK",
    subtest: "PM",
    skill: "utbk.pm.aljabar.persamaan",
    difficulty: 2,
    status: "published",
    item_type: "mcq",
    stem: "Soal baru dari admin...",
    options: { A: "Opsi A", B: "Opsi B", C: "Opsi C", D: "Opsi D", E: "Opsi E" },
    answer: "A",
    solution: {
      concept: "Konsep dasar aljabar...",
      steps: ["Langkah 1: Analisis bentuk persamaan.", "Langkah 2: Selesaikan nilai variabel."],
      traps: { B: "Jebakan B", C: "Jebakan C", D: "Jebakan D", E: "Jebakan E" },
    },
  });

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

  useEffect(() => {
    fetchItems();
  }, []);

  const handleJsonlImport = async () => {
    if (!jsonlContent.trim()) return;
    setImporting(true);
    try {
      const res = await fetch("/api/admin/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "jsonl_import",
          content: jsonlContent,
        }),
      });
      const data = await res.json();
      setImportResults(data);
      fetchItems();
    } catch (e) {
      console.error(e);
    } finally {
      setImporting(false);
    }
  };

  const handleCreateItem = async () => {
    const gateRes = validateItemGate(formData);
    if (!gateRes.valid) {
      alert(`Gate Validation Error:\n- ${gateRes.errors.join("\n- ")}`);
      return;
    }

    try {
      const res = await fetch("/api/admin/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        alert("Item berhasil dibuat dan lolos Gate Validation!");
        fetchItems();
        setActiveTab("list");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const exportJsonl = () => {
    const jsonlString = items.map((i) => JSON.stringify(i.payload)).join("\n");
    const blob = new Blob([jsonlString], { type: "application/x-ndjson" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `zanbimbel_items_export_${Date.now()}.jsonl`;
    a.click();
  };

  return (
    <div className="max-w-6xl mx-auto py-6 px-2 flex flex-col gap-6">
      
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 rounded-3xl border border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
            <ShieldAlert className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              Admin Content Engine & Gate Portal
            </h1>
            <p className="text-xs text-zinc-400">Manage item pool, JSONL bulk import, & publish gate compliance.</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={exportJsonl}
            className="px-3.5 py-2 rounded-xl glass-panel text-xs font-semibold text-zinc-300 hover:text-white flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" /> Export JSONL
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-zinc-800 pb-3 gap-2">
        <button
          onClick={() => setActiveTab("list")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === "list" ? "bg-indigo-600 text-white shadow-glow" : "text-zinc-400 hover:text-white"
          }`}
        >
          <FileText className="w-3.5 h-3.5" /> Item Pool ({items.length})
        </button>
        <button
          onClick={() => setActiveTab("create")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === "create" ? "bg-indigo-600 text-white shadow-glow" : "text-zinc-400 hover:text-white"
          }`}
        >
          <Plus className="w-3.5 h-3.5" /> Tambah Item Baru
        </button>
        <button
          onClick={() => setActiveTab("import")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === "import" ? "bg-indigo-600 text-white shadow-glow" : "text-zinc-400 hover:text-white"
          }`}
        >
          <Upload className="w-3.5 h-3.5" /> Bulk Import JSONL
        </button>
      </div>

      {/* TAB 1: ITEM POOL LIST */}
      {activeTab === "list" && (
        <div className="glass-panel p-6 rounded-3xl border border-zinc-800 flex flex-col gap-4">
          <div className="flex justify-between items-center pb-3 border-b border-zinc-800">
            <h2 className="text-sm font-bold text-white">Daftar Item Terdaftar</h2>
            <button onClick={fetchItems} className="text-xs text-indigo-400 flex items-center gap-1">
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} /> Refresh
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-900/80 text-zinc-400 uppercase font-mono text-[10px]">
                <tr>
                  <th className="p-3">ID & Versi</th>
                  <th className="p-3">Track / Subtes</th>
                  <th className="p-3">Tipe</th>
                  <th className="p-3">Skill Taxonomy</th>
                  <th className="p-3">Gate Status</th>
                  <th className="p-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                {items.map(({ dbRecord, payload }: any) => {
                  const gateRes = payload ? validateItemGate(payload) : { valid: false, errors: ["Payload kosong"] };

                  return (
                    <tr key={`${dbRecord.id}_${dbRecord.version}`} className="hover:bg-zinc-900/40">
                      <td className="p-3 font-mono font-bold text-white">
                        {dbRecord.id} <span className="text-zinc-500">v{dbRecord.version}</span>
                      </td>
                      <td className="p-3 font-semibold">
                        <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 mr-1.5">{dbRecord.track}</span>
                        {dbRecord.subtest}
                      </td>
                      <td className="p-3 uppercase font-mono text-[11px] text-cyan-400">{dbRecord.itemType}</td>
                      <td className="p-3 font-mono text-[11px] text-zinc-400">{dbRecord.skillCode}</td>
                      <td className="p-3">
                        {gateRes.valid ? (
                          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-semibold flex items-center gap-1 w-fit">
                            <CheckCircle2 className="w-3 h-3" /> Published
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 font-semibold flex items-center gap-1 w-fit">
                            <XCircle className="w-3 h-3" /> Gate Error
                          </span>
                        )}
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => setPreviewItem(payload)}
                          className="px-2.5 py-1 rounded bg-zinc-800 text-zinc-300 hover:text-white flex items-center gap-1 ml-auto"
                        >
                          <Eye className="w-3.5 h-3.5 text-indigo-400" /> Preview
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: BULK IMPORT JSONL */}
      {activeTab === "import" && (
        <div className="glass-panel p-6 rounded-3xl border border-zinc-800 flex flex-col gap-4">
          <h2 className="text-sm font-bold text-white">Bulk Import Item (Format JSONL / NDJSON)</h2>
          <p className="text-xs text-zinc-400">
            Tempelkan baris JSONL. Setiap baris mewakili 1 item valid lengkap dengan schema, options A-E, steps, & traps.
          </p>

          <textarea
            rows={10}
            value={jsonlContent}
            onChange={(e) => setJsonlContent(e.target.value)}
            placeholder='{"id":"utbk.pm.aljabar.persamaan.001","version":1,"track":"UTBK","subtest":"PM","skill":"utbk.pm.aljabar.persamaan","difficulty":2,"status":"published","item_type":"mcq","stem":"...","options":{"A":"...","B":"...","C":"...","D":"...","E":"..."},"answer":"B","solution":{"concept":"...","steps":["...","..."],"traps":{"A":"...","C":"...","D":"...","E":"..."}}}'
            className="w-full p-4 rounded-xl glass-input text-xs font-mono"
          />

          <button
            onClick={handleJsonlImport}
            disabled={importing || !jsonlContent.trim()}
            className="w-full py-3 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow-glow hover:bg-indigo-500 transition-all flex items-center justify-center gap-2"
          >
            {importing ? <RefreshCw className="w-4 h-4 animate-spin" /> : "Jalankan Gate Validation & Import Bulk"}
          </button>

          {/* Import Results Report */}
          {importResults && (
            <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col gap-3 text-xs">
              <span className="font-bold text-white">
                Hasil Import: {importResults.successCount} item berhasil di-publish.
              </span>
              <div className="max-h-48 overflow-y-auto space-y-1 font-mono text-[11px]">
                {importResults.results?.map((res: any, idx: number) => (
                  <div key={idx} className={res.valid ? "text-emerald-400" : "text-rose-400"}>
                    Baris {res.line}: {res.valid ? `✅ Success [${res.id}]` : `❌ Gate Error: ${res.errors?.join(", ")}`}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* PREVIEW PLAYER MODAL */}
      {previewItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel max-w-2xl w-full p-6 sm:p-8 rounded-3xl border border-indigo-500/40 flex flex-col gap-6 relative max-h-[90vh] overflow-y-auto shadow-glow">
            <button
              onClick={() => setPreviewItem(null)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white font-mono font-bold text-sm"
            >
              ✕ Close
            </button>

            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded bg-indigo-500/20 text-indigo-300 font-mono text-xs border border-indigo-500/30">
                Preview Player
              </span>
              <span className="text-xs text-zinc-400 font-mono">{previewItem.id}</span>
            </div>

            <p className="text-base text-white leading-relaxed">{previewItem.stem}</p>

            <div className="flex flex-col gap-2">
              {Object.entries(previewItem.options || {}).map(([key, val]: any) => (
                <div key={key} className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs flex items-center gap-3">
                  <span className="w-6 h-6 rounded bg-zinc-800 text-zinc-300 font-mono font-bold flex items-center justify-center">
                    {key}
                  </span>
                  <span className="text-zinc-200">{val}</span>
                  {previewItem.answer === key && <span className="ml-auto text-emerald-400 font-bold">Kunci</span>}
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/20 text-xs flex flex-col gap-2">
              <strong className="text-indigo-300">Konsep:</strong> {previewItem.solution?.concept}
              <strong className="text-indigo-300 mt-1">Langkah:</strong>
              <ul className="list-disc list-inside space-y-1 text-zinc-300">
                {previewItem.solution?.steps?.map((st: string, i: number) => (
                  <li key={i}>{st}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
