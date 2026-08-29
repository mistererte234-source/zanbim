# PRD ZanBimbel v3 — Production Slice
**Adaptive bimbel AI untuk UTBK/SNBT & CPNS/SKD**

| | |
|---|---|
| Version | 3.0 Production |
| Tanggal | 28 Agustus 2026 |
| Owner | ZanDev |
| Implementor | Lody |
| Status | Wajib diikuti. v2 = visi jangka panjang, **bukan** backlog sprint. |
| Stack | Next.js App Router + TypeScript + Tailwind + PostgreSQL. Satu runtime dulu (Next API). Jangan pecah Python service. |
| UI | Indonesia, mobile-first, dark `#09090B` |
| Relasi dokumen | v2 ChatGPT = north star. File ini = yang dibangun dan dijual. Konflik? **File ini menang.** |

---

## 0. Kalimat jual (pakai di landing, jangan diubah maknanya)

Bukan bank soal. Bukan tryout random.

**ZanBimbel mengukur posisi kamu vs target, mencari tahu kenapa masih jauh, lalu kasih latihan + cara penyelesaian sampai kemampuan itu ketutup — lalu ngecek lagi apakah kamu benar-benar bisa, bukan cuma hafal 1 soal.**

Empat pertanyaan produk, setiap fitur wajib jawab salah satu:

1. Saya di mana?
2. Saya lemah di apa, dan kenapa?
3. Saya harus apa hari ini?
4. Saya benar-benar naik atau cuma merasa naik?

Fitur yang tidak menjawab 1–4 = bukan MVP.

---

## 1. Posisi vs pesaing

| Pesaing | Yang mereka jual | Yang kita jangan tiru | Yang kita rebut |
|---|---|---|---|
| Pintarly / Pahamify / Aimasuk | Volume soal + tryout IRT-ish | Kejar jumlah soal | Rencana dari diagnosis |
| SoalCAT / CPNSOnline | Simulasi CAT | SKD doang tanpa jalur perbaikan | Ambang per subtes + buffer ranking |
| CAT BKN / simulasi SNPMB | Format resmi | Klaim “resmi” | Pedagogi |
| Chatbot les | Penjelasan bebas | Chat tanpa soal aktif | Tutor terkunci item + hint dari solusi tersimpan |

**Moat yang bisa dibangun tahun 1:** soal berpembahasan ketat + skill graph kecil tapi bersih + data attempt orang Indonesia + rencana yang berubah karena bukti, bukan karena mood AI.

Bukan moat: model LLM, jumlah soal, ranking nasional.

---

## 2. Yang dijual vs yang gratis

Paywall = **kedalaman personalisasi**, tapi free tidak boleh jadi demo mati.

| | Free | Pro |
|---|---|---|
| Diagnosis | 1x / track | Ulang + bandingkan |
| Target | 1 target | 4 target UTBK / 2 formasi |
| Drill sesuai rencana | 10 soal/hari | Unlimited sesuai misi |
| Pembahasan penuh (langkah + jebakan) | 3 item/hari | Unlimited |
| Varian isomorf setelah salah | Tidak | 2 varian / item salah |
| Tryout | Mini 25 soal / minggu | Full sesuai track |
| Tutor AI | 3 pesan/hari, terikat item | 40 pesan/hari |
| Analitik gap | Ringkas | Subtes + skill + error + tren |

Harga tidak dikunci di PRD. Yang dikunci: **rencana adaptif + varian + full tryout + pembahasan tak terbatas = Pro.**

Larangan copy:

- “soal asli UTBK / soal BKN”
- “skor UTBK kamu = …”
- “peluang diterima 73%”
- “IRT” di UI
- jaminan lolos

Skor selalu berlabel tipe: `internal` | `simulation` | `benchmark_estimate` | `threshold`.

---

## 3. Dua track, satu app, dua ruleset

### UTBK
Target: PTN + prodi (opsional di awal).  
Skor: **Indeks Kemampuan ZanBimbel** 200–800 (internal).  
Menang: mendekati **benchmark kompetitif estimasi** kalau data ada; kalau tidak, naikkan indeks + tutup skill prioritas.

### CPNS/SKD
Target: instansi + formasi + jenis kebutuhan (umum/khusus) + tahun ruleset.  
Skor: rumus BKN. TWK/TIU benar = 5. TKP = 1–5 per opsi. Max 150 / 175 / 225.  
Menang: **tembus SEMUA ambang**, baru kejar buffer ranking.

Ruleset CPNS **configurable di DB**, bukan hardcoded di UI.

Default formasi umum (update lewat ruleset, jangan dikunci selamanya):

```text
TWK 65 / 150
TIU 80 / 175
TKP 166 / 225
```

Jika satu subtes `below_threshold`, semua skill di subtes itu prioritas di atas skill lain. UI wajib banner merah, bukan cuma total 420.

---

## 4. Loop yang diimplementasi (bukan 20 kotak)

```text
Daftar → pilih track
  → target (boleh skip)
  → diagnosis fixed 35–40 menit
  → laporan: indeks, subtes, 3 gap, vs target bila ada
  → rencana 4 tahap + 1 misi hari ini
  → kerjakan 12 soal 1 fokus
  → salah → bahas steps/traps → (Pro) 2 varian angka
  → update skill state
  → misi berikutnya bisa bergeser
  → tryout → update lagi
```

Target skip: mode **Naikkan indeks**. Pasang prodi/formasi kapan saja; gap dihitung ulang.

Diagnosis putus di tengah: simpan progress, boleh lanjut 24 jam.

---

## 5. Skill taxonomy v1 (versioned, jangan dirusak)

Format code: `track.subtest.domain.skill`

### UTBK — pakai ini dulu, jangan 200 skill

```
utbk.pu.logika.silogisme
utbk.pu.logika.sebab_akibat
utbk.pu.logika.analogi
utbk.pu.kuantitas.perbandingan_kuantitas
utbk.ppu.wawasan.teks_pendek
utbk.pbm.bahasa.kalimat_efektif
utbk.pbm.bahasa.koherensi
utbk.pk.aritmetika.persen_perbandingan
utbk.pk.aljabar.persamaan_linear
utbk.pk.data.tabel_grafik
utbk.lbi.baca.ide_pokok
utbk.lbi.baca.inferensi
utbk.lbe.baca.main_idea
utbk.lbe.baca.inference
utbk.pm.aljabar.persamaan
utbk.pm.geometri.dasar
utbk.pm.data.peluang_statistika
```

### CPNS

```
cpns.twk.pilar.pancasila
cpns.twk.pilar.uud
cpns.twk.pilar.nkri
cpns.twk.integritas.bela_negara
cpns.tiu.verbal.analogi_silogisme
cpns.tiu.numerik.deret
cpns.tiu.numerik.aritmetika
cpns.tiu.figural.pola
cpns.tiu.logika.penalaran
cpns.tkp.pelayanan.publik
cpns.tkp.kerja.profesionalisme
cpns.tkp.kerja.jejaring
cpns.tkp.nilai.integritas_antikorupsi
```

Tambah skill = migrasi `skill_versions`. Jangan rename code yang sudah punya attempt.

---

## 6. Item contract (inti CMS)

Tanpa field wajib → `status` tidak bisa `published`.

### MCQ (UTBK semua, TWK, TIU)

```json
{
  "id": "utbk.pm.aljabar.persamaan.014",
  "version": 1,
  "track": "UTBK",
  "subtest": "PM",
  "skill": "utbk.pm.aljabar.persamaan",
  "difficulty": 2,
  "status": "published",
  "item_type": "mcq",
  "stem": "...",
  "stimulus": null,
  "options": { "A": "", "B": "", "C": "", "D": "", "E": "" },
  "answer": "C",
  "solution": {
    "concept": "satu kalimat konsep",
    "steps": ["langkah 1", "langkah 2", "cek masuk akal"],
    "traps": { "A": "kenapa salah", "B": "...", "D": "...", "E": "..." }
  },
  "diagnostic_only": false,
  "source_type": "original",
  "parent_id": null,
  "variant_type": null
}
```

### TKP (wajib union terpisah)

```json
{
  "item_type": "tkp_likert",
  "options": { "A": "...", "B": "...", "C": "...", "D": "...", "E": "..." },
  "tkp_key": { "A": 2, "B": 5, "C": 3, "D": 1, "E": 4 },
  "solution": {
    "concept": "nilai yang diuji: integritas vs loyalitas buta",
    "steps": ["patuh aturan", "tetap kooperatif", "jangan tutupi kesalahan"],
    "traps": { "A": "mengabaikan aturan demi teman" }
  }
}
```

Player TKP: **jangan** tampilkan hijau “benar”. Tampilkan skor opsi setelah submit (Pro / kuota bahasan).

Gate publish:

- schema valid
- 5 opsi
- MCQ: `answer` ∈ A–E
- TKP: `tkp_key` semua 1–5, ada tepat satu opsi bernilai 5
- `steps.length >= 2`
- traps untuk setiap opsi non-kunci (MCQ) atau opsi skor ≤ 2 (TKP)
- skill ada di taxonomy

Pipeline: `draft → validate → human review → published`.  
AI generate **tidak** auto-publish.

Item published **immutable**. Edit = `version + 1`. Attempt lama tetap ke version lama.

---

## 7. Diagnosis v1 — fixed blueprint

Bukan adaptive testing. Bukan full exam.

| Track | Item | Durasi | Catatan |
|---|---|---|---|
| UTBK | 42 | 35 menit | sebar sesuai §5, mix difficulty 1–2–3 |
| CPNS | 45 | 40 menit | TWK 10 · TIU 16 · TKP 19 |

Aturan:

- tidak ada kunci di tengah
- item `diagnostic_only=true` cooldown 14 hari dari drill
- putus = resume
- selesai = tulis `learner_skill_states` + 1 `learner_snapshot`

---

## 8. Skor & learner state v1 (jangan lebih kaya)

### UTBK indeks internal

Per item bobot difficulty: `1 → 1.0` · `2 → 1.25` · `3 → 1.6`

```text
raw = sum(benar * bobot) / sum(bobot)
index = 200 + raw * 600
```

Tampil: **Indeks Kemampuan ZanBimbel: 618 (internal, bukan skor SNPMB).**  
Jangan map-kan ke “setara UTBK 618” tanpa kalibrasi empiris.

### CPNS

Hitung persis ruleset aktif. Simpan `twk, tiu, tkp, total, below_threshold[]`.

### Skill state yang DISIMPAN

```text
n
n_correct          (TKP: n_high dimana skor opsi >= 4)
weighted_acc
median_ms
last_practiced_at
confidence         = min(1, n / 8)
```

Jangan simpan `retention`, `trend`, `difficulty_ceiling` di MVP.

**Jangan render “Mastery 100%” jika n < 8.**  
Copy jika n kecil: **Belum cukup bukti.**

### Error tag v1 — 4 pilihan user setelah salah (opsional)

```
konsep | hitung | salah_baca | waktu
```

Tanpa AI classifier.

---

## 9. Gap & prioritas v1 (rumus terkunci)

```text
gap        = 1 - weighted_acc          # jika n=0, gap=1
conf       = min(1, n / 8)
W_target   = 1.0 | 1.25 | 1.5          # low/mid/high dari target.weights, default 1
thresh_boost = 1.4 jika skill.subtes CPNS below_threshold, else 1

priority = gap * W_target * conf * thresh_boost
```

Kalau `n < 3` dan skill relevan target: tetap masuk antrean diagnosis lanjutan, tapi jangan tulis “kelemahan parah”.

Sort desc. Ambil 3 untuk laporan, 2–4 untuk tahap 1.

**Target weights default UTBK** (boleh dioverride per prodi nanti):

```
Kedokteran / farmasi / teknik: PM high, PK high, LBE mid
Hukum / HI / soshum: LBI high, PU high, PPU mid
Umum / belum pilih: semua 1.0
```

Benchmark prodi: tabel `target_benchmarks (year, ptn, prodi, low, competitive, high, source, n, quality)`.

Jika `source` kosong atau `quality=none`:

> Benchmark belum tersedia. Target latihan: tutup 3 skill teratas dan naikkan indeks.

**Dilarang mengarang angka historis.**

---

## 10. Rencana & misi v1

Empat tahap. Isi skill dinamis.

| Tahap | Fokus | Exit (semua harus) |
|---|---|---|
| 0 Stabilisasi | skill ber-acc ≥ 0.6, difficulty 1–2, tekan error `waktu`/`hitung` | n≥12, weighted_acc≥0.80, confidence≥0.75 |
| 1 Tutup lubang | 2–4 skill priority tertinggi | sama + median_ms di bawah budget skill |
| 2 Ceiling | difficulty 3 + varian | weighted_acc≥0.70 pada diff 3, n≥10 |
| 3 Simulasi | tryout berwaktu | UTBK: indeks ≥ competitive bila ada, else +40 dari diagnosis. CPNS: semua ambang + buffer (default +15 TIU, +10 TWK, +15 TKP) |

Budget waktu default per item: PU/LBI/LBE 75s, PK/PM/TIU numerik 90s, TKP 50s, TWK 45s.

### Misi harian (satu-satunya CTA home)

```text
12 item
1 skill fokus (kadang 2 jika tahap 0)
35 menit
salah → wajib buka tab Cara sebelum soal berikutnya
Pro → 2 varian Type A dari item salah, masuk sesi yang sama (maks +4 item)
```

Bukan 8 guided + 5 standard + 3 variant + 2 challenge. Itu dropout.

---

## 11. Varian v1

Hanya **Type A — surface mutation** (angka, nama, satuan).  
Skill, struktur, daya kognitif sama. Kunci dihitung ulang.

Production: template/author atau generator + **validasi numerik + human review**.  
Jangan auto-serve varian AI mentah ke user.

Type B–E = backlog konten, bukan sprint app.

Mastery confirmation ringan: original salah + 2 varian benar → `n_correct` naik, belum auto lulus tahap.

---

## 12. Tutor AI v1

Bukan chatbot. Bukan pembuat solusi dari nol.

Input wajib: `user_id, item_id, version, attempt, hint_level`.

Tiga level saja:

| Level | Isi | Sumber |
|---|---|---|
| 0 | Kerjakan sendiri | — |
| 1 | Arah | `solution.concept` + 1 kalimat arah, tanpa kunci |
| 2 | Bahas penuh | render `steps` + `traps` tersimpan. AI hanya boleh parafrase, dilarang menambah langkah baru yang mengubah kunci |

Dilarang: jawab sebelum submit di diagnosis/tryout; klaim resmi; keluar skill item.

Kuota lihat §2.

---

## 13. Tryout v1

Berbeda dari drill: tidak ada bahasan, tidak ada tutor, timer jalan.

| | Mini (free) | Full (Pro) |
|---|---|---|
| UTBK | 25 item campur | 1 paket mendekati komposisi diagnosis × 1.5 atau pecah 2 subtes prioritas |
| CPNS | 30 item | 110 / 100 menit, ruleset aktif |

Selesai → snapshot baru → boleh `replan` jika 2+ skill pindah kuartil priority.

---

## 14. Data model — yang boleh dibuat sekarang

Jangan buat 25 tabel spekulatif.

```
users
profiles                 default_track, is_pro, tz

rulesets                 track, year, payload jsonb
skills                   code pk, track, subtest, domain, label, version

items                    id, version, unique(id, version), item_type, payload jsonb, status
item_reviews             item_id, version, reviewer, verdict

targets                  user_id, track, payload jsonb
target_benchmarks        natural key tahun+ptn+prodi

sessions                 type: diagnostic|drill|tryout|tutor
session_items
attempts                 item_id, version, choice, score, time_ms, error_tag null

learner_skill_states     user_id, skill, n, n_correct, weighted_acc, median_ms, last_at
learner_snapshots        user_id, source_session, indexes jsonb

plans                    user_id, track, stages jsonb, current_stage
daily_missions           plan_id, date, skill, item_ids, status

ai_threads               item_id, version, messages jsonb, tokens

events                   name, user_id, payload, ts
```

Events v1 hanya:

`diagnostic_completed | answer_submitted | explanation_opened | mission_completed | tryout_completed | tutor_message_sent`

---

## 15. Admin

Wajib:

- CRUD draft
- preview player
- validate gate
- approve/publish
- unpublish
- import JSONL + error per baris
- export
- lihat `attempt_count, correct_rate, option_distribution` setelah ada data

Dilarang: ubah item version yang sudah punya attempt (buat version baru).

---

## 16. UX wajib

1. Landing — CTA **Mulai diagnosis**. Bukan “10.000 soal”.
2. Track.
3. Target dengan **Lewati dulu**.
4. Brief diagnosis (durasi, tanpa kunci, tujuan).
5. Player: nomor, timer, flag, opsi besar, aman di HP.
6. Laporan: indeks / SKD pecah, 3 gap, benchmark atau “belum ada”, CTA mulai misi.
7. Home login = misi hari ini + 3 angka (indeks, gap, skill terlemah).
8. Setelah jawab drill: tab **Cara / Jebakan / Coba lagi**.
9. Tryout lobby.
10. Akun + sisa kuota + upgrade.
11. `/admin`.

CPNS report: kalau `below_threshold`, blok paling atas.

---

## 17. Legal & konten

- Soal original / setara. Provenance di metadata.
- Tidak scrape kompetitor.
- Tidak seed benchmark fiktif.
- AI provider hanya terima stem + solution tersimpan + pertanyaan user. Jangan kirim PII.
- Hapus akun: hapus identity; attempts boleh dianonimkan untuk kalibrasi.

---

## 18. Build order — Lody ikuti nomor ini

### Sprint 0 — mesin konten (DoD: 40 item published lolos gate)
Auth, schema, taxonomy seed, admin CRUD + JSONL, theme gelap, player preview.  
**40 item:** 20 UTBK + 20 SKD (minimal 6 TKP). Semua steps+traps. Tanpa ini sprint berikutnya dilarang mulai.

### Sprint 1 — diagnosis + laporan
Blueprint, player berwaktu, resume, indeks/SKD, 3 gap, target opsional.

### Sprint 2 — rencana + misi 12 soal
Priority formula §9, 4 tahap, home = misi, update skill state tiap answer.

### Sprint 3 — pembahasan + kuota
Tabs cara/jebakan, paywall flag, 4 error tag.

### Sprint 4 — varian A + tryout mini/full
Hanya item ber-template aman. Replan setelah tryout.

### Sprint 5 — tutor terikat item
Level 1–2 dari solution tersimpan + kuota.

### Sprint 6 — bayar
Flag Pro dulu. Midtrans belakangan kalau loop dipakai orang.

Jangan landing marketing sebelum Sprint 1 selesai.  
Jangan IRT. Jangan forum. Jangan SKB. Jangan native app. Jangan Python service.

---

## 19. Definition of done produk (bisa dijual early access)

- User baru: daftar → (skip) target → diagnosis → lihat 3 gap dalam 1 sesi.
- Besok: misi 12 soal muncul tanpa admin.
- Salah: ada langkah + jebakan.
- CPNS di bawah ambang: banner, rencana mengutamakan subtes itu.
- 0 klaim terlarang di UI.
- 40 item published lolos gate.
- Tutor tidak menjawab di luar item_id.
- Free vs Pro kuota jalan (pembayaran boleh manual dulu).

---

## 20. North star yang SENGAJA ditunda (ada di v2, jangan dikerjakan)

Adaptive diagnostic, IRT/Rasch/MIRT, error classifier AI, hint 5 tingkat, variant B–E auto, delayed retention spaced 1/3/7, predictive peluang diterima, SKB semua jabatan, leaderboard, live class, graph visualization, Python psychometrics service.

Boleh dibuka kembali jika: ≥ 200 attempt per item inti **atau** owner tulis addendum.

---

## 21. Prompt lempar ke Lody

```
Bangun ZanBimbel mengikuti PRD v3 Production Slice.
Abaikan godaan fitur v2 yang ada di bagian “ditunda”.
Mulai Sprint 0. Definition of done Sprint 0 = 40 item published + admin import JSONL + preview player.
Satu repo Next.js + Postgres. UI Indonesia dark mobile-first.
Dilarang: scraper, klaim soal resmi, label IRT, skor “UTBK kamu”, backend kedua.
Kalau ragu, tanya owner.
```

---

## 22. Prinsip owner

Tiga puluh soal yang kunci, langkah, skill, dan jebakannya benar mengalahkan sepuluh ribu soal AI.

ZanBimbel menang di **presisi intervensi**, bukan di gudang soal.
