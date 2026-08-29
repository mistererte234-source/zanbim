# PRD — ZanBimbel (nama kerja)
## Bimbel AI untuk UTBK/SNBT + CPNS
**Dokumen untuk Lody (implementor).** Jangan improvisasi visi. Ikuti loop produk di bawah.
**Owner:** ZanDev  
**Tanggal:** 2026-08-28  
**Status:** Draft v1 — siap dipecah jadi epic/ticket  
**Bahasa UI:** Indonesia  
**Stack default:** Next.js + TypeScript + Tailwind (dark-first) · Postgres · Python opsional untuk generator soal & scoring

---

## 1. Satu kalimat produk

Siswa/pelamar daftar, pilih target (prodi+kampus atau formasi CPNS), kerjakan tes diagnosis, dapat skor awal + peta kelemahan per tipe soal, lalu AI menyusun tahapan latihan sampai estimasi skor menyentuh ambang kompetitif target — setiap soal punya cara penyelesaian lengkap, bukan cuma kunci.

Ini **bimbel yang dijual**, bukan bank soal gratisan.

---

## 2. Masalah yang dibayar user

1. Tidak tahu posisi kemampuan vs jurusan/formasi incaran.
2. Belajar acak: semua materi, tidak ada urutan.
3. Pembahasan di pasaran sering cuma “jawaban C”.
4. Tryout tanpa rencana perbaikan = habis waktu.
5. UTBK dinilai IRT (bukan jumlah benar); CPNS gugur jika satu subtes di bawah ambang — orang masih belajar seolah keduanya sama.

---

## 3. Bukan produk ini

- Bukan scraper bank soal Pintarly / Pahamify / SoalCAT / BKN.
- Bukan klaim “soal asli UTBK/BKN”.
- Bukan chatbot bebas “jelasin materi Pancasila”.
- Bukan komunitas / live class di MVP.
- Bukan ranking nasional palsu.

Konten = soal original + varian isomorf + PDF/sumber yang owner punya haknya. Label publik: **soal setara + pembahasan**.

---

## 4. Dua track, satu engine

| | UTBK / SNBT | CPNS / SKD |
|---|---|---|
| Target user | Siswa kelas 12 / gap year | Pelamar CPNS/PPPK/sekolah kedinasan |
| Target object | PTN + prodi (1–4 pilihan) | Instansi + formasi + jenis kebutuhan |
| “Skor syarat” | Estimasi kompetitif dari data historis (p50 / p75 / aman). **Bukan angka resmi SNPMB.** | Ambang resmi per subtes + target buffer untuk ranking |
| Skala skor internal | Estimasi 200–800 per subtes + komposit | 0–550; TWK max 150, TIU 175, TKP 225 |
| Aturan menang | Kompetitif vs peminat/daya tampung | Wajib tembus SEMUA ambang; 1 subtes gagal = gugur |
| Ambang acuan formasi umum (pakai sebagai default, update kalau Kepmen baru) | — | TWK 65 · TIU 80 · TKP 166 |

UI sama. Engine aturan beda. Jangan campur rumus.

---

## 5. Loop produk (wajib)

```
Daftar
 → pilih track
 → set target
 → tes diagnosis (25–40 menit, bukan full exam)
 → laporan: skor awal, gap, 3 kelemahan termahal vs target
 → generate rencana 4 tahap + exit criteria
 → misi harian: drill + pembahasan steps/traps + 2–3 varian dari yang salah
 → update ability profile
 → re-diagnosa / tryout berkala
 → rencana menyesuaikan
```

Tanpa target + diagnosis + exit criteria, ini cuma quiz app. Tolak scope itu.

---

## 6. User stories inti

### U1 — Onboarding
Sebagai calon, saya pilih UTBK atau CPNS, isi target, lalu langsung didorong ke diagnosis — tidak ke dashboard kosong.

### U2 — Diagnosis
Saya kerjakan tes singkat berwaktu. Sistem tidak menampilkan kunci di tengah tes. Setelah selesai saya lihat:
- skor/estimasi awal
- breakdown subtes + skill
- gap ke target (p50/p75/aman atau ambang+buffer)
- 3 skill yang paling nahan masuk target

### U3 — Rencana
Saya dapat tahapan berurutan. Saya tidak bisa loncat tahap jika exit criteria belum terpenuhi (kecuali override admin).

### U4 — Latihan
Saya buka app, dapat **1 misi hari ini** (jumlah soal + skill + batas waktu). Setelah jawab, saya wajib bisa lihat:
- kunci
- langkah penyelesaian berurutan
- kenapa opsi lain salah (traps)
- 1 analogi/pola (opsional)

### U5 — Varian
Jika saya salah, sistem berikan 2–3 soal isomorf (pola sama, angka/konteks beda) sebelum lanjut misi.

### U6 — Tutor AI (berbayar, terbatas)
Jika langkah masih tidak ketemu, saya bisa tanya 1 pertanyaan kontekstual tentang **soal yang sedang dibuka**. AI tidak boleh keluar dari soal itu + skill itu. Bukan chat bebas.

### U7 — Tryout
Setelah tahap tertentu, saya dapat tryout berwaktu (subtes atau full). Skor masuk ability profile dan bisa menggeser rencana.

### U8 — Admin konten
Owner bisa import JSONL, review kunci, generate varian, publish/unpublish item.

---

## 7. Diagnosis blueprint

### 7.1 Prinsip
- Cepat selesai (target 35 menit UTBK / 40 menit CPNS).
- Coverage per **skill**, bukan hanya per subtes.
- Campuran mudah–sedang–sulit supaya estimasi tidak gepeng.
- Item diagnosis jangan dipakai lagi di drill 7 hari pertama (leak).

### 7.2 UTBK — paket diagnosis v1 (~40–50 item)

| Subtes | Item | Skill yang wajib ketahuan |
|---|---|---|
| PU | 8 | analogi, silogisme/simpulan, sebab-akibat, kuantitas |
| PPU | 5 | wawasan terapan, rujukan teks singkat |
| PBM | 5 | perbaikan kalimat, koherensi |
| PK | 7 | aritmetika, aljabar dasar, perbandingan, data |
| LBI | 6 | ide pokok, inferensi, kosakata konteks |
| LBE | 5 | main idea, inference, vocab-in-context |
| PM | 6 | aljabar terapan, geometri sederhana, peluang/data |

Timer per blok. Boleh 1 sesi utuh dengan progress bar.

### 7.3 CPNS — paket diagnosis v1 (~45 item)

| Subtes | Item | Catatan |
|---|---|---|
| TWK | 10 | Pancasila, UUD, NKRI, integritas/bela negara |
| TIU | 16 | verbal, numerik, figural, logika |
| TKP | 19 | pelayanan, profesionalisme, jejaring, anti-radikal — skor 1–5 bukan benar/salah |

CPNS diagnosis harus memakai rubrik TKP (bukan A=benar).

### 7.4 Output diagnosis (API)

```json
{
  "track": "UTBK",
  "composite_estimate": 618,
  "scale_note": "estimasi internal, bukan skor SNPMB resmi",
  "by_subtest": [{ "code": "PM", "estimate": 540, "accuracy": 0.33 }],
  "by_skill": [
    {
      "skill": "pm.aljabar",
      "accuracy": 0.25,
      "n": 4,
      "confidence": "low",
      "target_weight": "high",
      "gap_cost": 0.91
    }
  ],
  "error_mix": { "konsep": 0.5, "buru_buru": 0.2, "salah_baca": 0.2, "tebak": 0.1 },
  "top_gaps": ["pm.aljabar", "pk.perbandingan", "lbe.inferensi"],
  "vs_target": {
    "target_id": "...",
    "ref": { "p50": 712, "p75": 738, "safe": 750 },
    "gap_to_safe": -132
  }
}
```

`gap_cost` = (1 - accuracy) × target_weight × confidence_factor.  
Rencana diurut dari `gap_cost` tertinggi.  
Jika `n < 4`, confidence = low; jangan overclaim.

---

## 8. Generator rencana

Empat tahap tetap. Isi skill-nya dinamis.

| Tahap | Nama | Tujuan | Exit criteria (default) |
|---|---|---|---|
| 0 | Stabilisasi | Amankan soal mudah/sedang di skill yang sudah ≥60% | akurasi ≥80% pada item difficulty 1–2, n≥15 |
| 1 | Tutup lubang fatal | 2–3 skill gap_cost tertinggi | akurasi ≥80%, n≥25, median waktu di bawah budget skill |
| 2 | Naikkan ceiling | Item sulit + varian isomorf | akurasi ≥70% pada difficulty 3, 1 paket drill lulus |
| 3 | Simulasi | Tryout berwaktu | tryout mencapai p50 target (UTBK) atau semua ambang+buffer (CPNS) |
| 4 | Buffer | Geser ke p75/aman atau ranking formasi | opsional pre-exam |

Aturan CPNS override: skill di subtes yang **di bawah ambang** selalu tahap 0/1, mengalahkan skill lain meski gap_cost lebih kecil.

Setiap tahap punya `daily_quota` (mis. 20 item, 35 menit) dan `review_wrong_first`.

---

## 9. Model soal (kontrak konten)

Setiap item yang tampil ke user wajib punya field ini. Tanpa `steps`, item tidak boleh `published`.

```json
{
  "id": "utbk-pm-aljabar-014",
  "track": "UTBK",
  "subtest": "PM",
  "skill": "pm.aljabar",
  "difficulty": 2,
  "status": "published",
  "stem": "...",
  "stimulus": null,
  "options": { "A": "...", "B": "...", "C": "...", "D": "...", "E": "..." },
  "answer": "C",
  "scoring": { "type": "mcq", "correct": 1, "wrong": 0 },
  "steps": [
    "Ubah kalimat soal ke persamaan.",
    "Substitusi / isolasi variabel.",
    "Cek masuk akal."
  ],
  "traps": {
    "A": "Lupa urutan operasi.",
    "B": "Pakai persen ke harga sudah didiskon dua kali."
  },
  "parent_id": null,
  "mutation": null,
  "source": "original",
  "explanation_level": "full"
}
```

TKP:

```json
{
  "scoring": { "type": "tkp_likert", "key": { "A": 2, "B": 5, "C": 3, "D": 1, "E": 4 } },
  "steps": ["Nilai yang diuji: integritas vs loyalitas palsu.", "Pilih yang patuh aturan + tetap kooperatif."]
}
```

---

## 10. Tutor AI — aturan ketat

Fitur jualan, tapi harus dikandangkan.

**Boleh**
- Jelaskan ulang langkah N dengan analogi lain.
- Tanya balik: “yang mana yang belum ketemu, langkah 1 atau 2?”
- Buat 1 varian baru dari item ini (angka beda), lalu hitung kunci.

**Tidak boleh**
- Jawab soal yang belum dijawab user (kecuali mode bahas).
- Chat di luar konteks item + skill.
- Mengaku soal ini “asli UTBK 2026 / soal BKN”.
- Spill item diagnosis / kunci tryout aktif.

Kuota: Free 3 pesan/hari. Pro 50 pesan/hari. Setiap pesan terikat `item_id`.

Prompt system (ringkas untuk Lody):
> Kamu tutor bimbel. Hanya bahas item_id yang dikirim. Bahasa Indonesia lurus. Langkah bernomor. Jangan bertele-tele. Jika user minta jawaban sebelum submit, tolak.

---

## 11. Informasi arsitektur

### 11.1 Apps
- `apps/web` — Next.js App Router, dark `#09090B`, glass border tipis, typography rapat. Mode tryout fullscreen tanpa navigasi marketing.
- `apps/admin` — bisa route `/admin` dulu.
- `packages/item-schema` — Zod schema item, dipakai web + importer.

### 11.2 Data (Postgres)

```
users
profiles                 track default, timezone
targets                  track, ptn/prodi ATAU instansi/formasi, ref_scores jsonb, weights jsonb
items
item_variants            parent_id → items
skills                   code, subtest, track
diagnostic_blueprints    list item_id + time budget
sessions                 type: diagnostic | drill | tryout | tutor
session_items
attempts                 choice, correct/tkp_score, time_ms, error_tag
ability_snapshots        per user, per skill, computed
plans                    stages jsonb, current_stage, status
plan_stages
daily_missions
ai_threads               item_id, messages, quota_used
```

### 11.3 Scoring internal (MVP, jangan pura-pura IRT penuh)
MVP boleh:
- UTBK: percent correct berbobot difficulty (1x / 1.25x / 1.6x) → map ke 200–800 dengan kalibrasi kasar.
- Simpan raw pattern untuk upgrade IRT 2PL nanti (`a`,`b` di item).
- Jangan tampilkan “skor IRT resmi”. Copy: **Estimasi kemampuan internal**.

CPNS: rumus BKN. TWK/TIU benar = 5. TKP = skor opsi 1–5. Bandingkan ke ambang per subtes dulu, baru total.

### 11.4 Target scores table
Seed 20–40 prodi populer Jatim + nasional (Unair, ITS, UNAIR kedokteran, UI, UGM, ITB, Unesa, dll.) dengan kolom:
`year, ptn, prodi, p50, p75, safe, n_source, note`
Sumber: kompilasi publik / input manual owner. Ada badge `perkiraan`.

CPNS: tabel `thresholds` by tahun + jenis formasi.

---

## 12. IA / layar MVP

1. Landing — 1 CTA: mulai tes / daftar. Janji: diagnosis + rencana, bukan “10.000 soal”.
2. Auth (email + Google).
3. Pilih track.
4. Set target (search prodi / formasi).
5. Brief diagnosis + mulai.
6. Player soal (nomor, timer, flag, opsi).
7. Laporan diagnosis.
8. Papan rencana (tahap, progress, tombol misi hari ini).
9. Player drill + panel pembahasan (tabs: Langkah / Opsi salah / Varian).
10. Drawer tutor AI.
11. Tryout lobby + hasil vs target.
12. Akun + kuota + upgrade.
13. Admin items CRUD + import JSONL.

Mobile-first. Tryout harus enak di HP.

---

## 13. Monetisasi

| Plan | Isi |
|---|---|
| Free | Diagnosis 1x, 15 soal drill/hari, pembahasan 5 item/hari, tutor 3 chat/hari, tryout mini 1x/minggu |
| Pro (inti revenue) | Unlimited drill sesuai rencana, pembahasan penuh, tutor 50/hari, tryout penuh, analitik gap, generate varian |
| Intensif (nanti) | SKB 1 formasi / paket 30 hari menjelang ujian |

Harga jangan dikunci di PRD. Owner yang set. Yang dikunci: **paywall ada di pembahasan penuh + rencana adaptif + tutor**, bukan di daftar soal.

Copy legal di footer dan laporan:
> Soal latihan original/setara. Bukan soal resmi SNPMB/BKN. Skor adalah estimasi internal.

---

## 14. MVP out of scope

- Live class, mentor manusia, forum.
- Semua formasi SKB.
- IRT 3PL produksi.
- App native store.
- Scraper kompetitor.
- Payment kompleks (cukup Midtrans atau dummy flag `is_pro` dulu).

---

## 15. Urutan build untuk Lody (wajib ikuti)

### Sprint 0 — fondasi
Zod item schema, Postgres migrations, seed 30 item (15 UTBK + 15 SKD) lengkap steps+traps, auth, theme gelap.

### Sprint 1 — diagnosis
Blueprint, player, scoring, halaman laporan gap vs 1 target dummy.

### Sprint 2 — rencana + misi
Plan generator 4 tahap, daily mission, drill player + pembahasan.

### Sprint 3 — varian + tutor
Generate 2 varian dari item salah (template dulu; AI belakangan), chat terkunci item_id.

### Sprint 4 — tryout + paywall flag
Paket berwaktu, bandingkan ke target, batasi free.

Jangan mulai dari landing marketing yang indah kalau player soal belum nyaman.

---

## 16. Kriteria selesai MVP

- User baru → target → diagnosis → lihat 3 gap dalam < 45 menit sesi pertama.
- Misi hari berikutnya otomatis dari tahap 1.
- Setiap item published punya steps ≥ 2 dan traps untuk opsi salah.
- Tidak ada klaim “soal asli” di UI.
- Admin bisa import JSONL 30 item tanpa sentuh SQL.
- Tutor menolak pertanyaan di luar item aktif.

---

## 17. Prompt lempar ke Lody (copy apa adanya)

Kerjakan ZanBimbel sesuai PRD ini. Jangan ubah loop produk.  
Prioritas: schema item + diagnosis + laporan gap + rencana tahap + player soal + pembahasan.  
UI dark, Indonesia, mobile-first.  
Jangan bangun scraper. Jangan klaim soal resmi.  
Mulai Sprint 0–1. Kalau ragu, tanya owner — jangan mengarang fitur komunitas.

---

## 18. Catatan owner ke implementor

- Kualitas 30 soal berpembahasan ketat > 2.000 soal kosong.
- “Skor syarat jurusan” selalu ditulis sebagai estimasi.
- CPNS: UI harus teriak kalau satu subtes di bawah ambang.
- Pembahasan adalah SKU. Kalau steps lemah, produk tidak layak dijual.
