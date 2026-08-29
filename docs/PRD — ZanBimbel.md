# PRD — ZanBimbel
## Adaptive AI Learning Platform untuk UTBK/SNBT & CPNS/SKD

**Version:** 2.0 — Architecture & Product Revision  
**Tanggal:** 28 Agustus 2026  
**Owner:** ZanDev  
**Status:** Draft untuk review Grok / product architecture review  
**Implementor:** Lody  
**Bahasa UI:** Indonesia  
**Platform:** Web mobile-first  
**Default stack:** Next.js + TypeScript + Tailwind + PostgreSQL  
**Backend:** Next.js API / Python service bila diperlukan untuk psychometrics, content generation, scoring, dan analytics

---

# 0. PRODUCT THESIS

ZanBimbel bukan aplikasi bank soal.

ZanBimbel adalah **adaptive learning system** yang:

1. mengukur kemampuan awal pengguna,
2. memetakan kemampuan ke level skill,
3. mengidentifikasi jenis kesalahan,
4. menghitung gap terhadap target,
5. menentukan prioritas belajar,
6. memberikan latihan yang dipilih berdasarkan learner model,
7. memberikan pembahasan bertingkat,
8. memberikan soal isomorf untuk menguji transfer pemahaman,
9. memperbarui learner model berdasarkan respons terbaru,
10. dan mengulang siklus sampai pengguna mencapai mastery/target yang ditentukan.

### Core proposition

> **ZanBimbel tidak sekadar memberi soal. ZanBimbel mencari tahu kenapa pengguna belum mencapai target, lalu memilih intervensi belajar berikutnya berdasarkan bukti performa pengguna.**

---

# 1. PROBLEM

## 1.1 Masalah pengguna

Calon peserta UTBK/SNBT maupun CPNS/SKD menghadapi beberapa masalah:

### A. Tidak mengetahui posisi kemampuan

Pengguna mengetahui jumlah benar, tetapi tidak mengetahui:

- skill apa yang lemah,
- seberapa serius kelemahannya,
- apakah kesalahan disebabkan konsep atau eksekusi,
- skill mana yang paling penting untuk target,
- dan apa yang harus dipelajari berikutnya.

### B. Belajar secara random

Sebagian besar bank soal membuat pengguna:

> soal → jawab → benar/salah → lanjut.

Tidak ada learning path yang benar-benar personal.

### C. Pembahasan tidak cukup pedagogis

Kunci jawaban saja tidak membuat pengguna menguasai pola soal.

ZanBimbel harus menjelaskan:

- konsep,
- langkah,
- alasan,
- jebakan,
- strategi,
- dan pola yang dapat ditransfer ke soal lain.

### D. Kesalahan tidak dimanfaatkan

Jika pengguna salah soal A, sistem seharusnya tidak hanya menunjukkan jawaban.

Sistem harus bertanya:

> **Mengapa pengguna salah?**

Kemudian memilih remedial yang sesuai.

### E. Tryout tidak otomatis menghasilkan learning intervention

Tryout seharusnya bukan endpoint.

Hasil tryout harus menjadi input bagi learner model.

---

# 2. PRODUCT DIFFERENTIATION

ZanBimbel BUKAN:

- bank soal terbesar,
- scraper soal kompetitor,
- chatbot edukasi bebas,
- kumpulan PDF,
- platform live class,
- komunitas,
- ranking nasional palsu,
- atau produk yang menjual klaim “soal asli”.

ZanBimbel menjual:

### 1. Diagnosis
### 2. Adaptive learning plan
### 3. High-quality explanation
### 4. Error diagnosis
### 5. Mastery practice
### 6. Personalized progression
### 7. Target-oriented simulation

---

# 3. CORE PRODUCT LOOP

```text
REGISTER
   ↓
SELECT TRACK
   ↓
SET TARGET
   ↓
DIAGNOSTIC
   ↓
LEARNER PROFILE
   ↓
GAP ANALYSIS
   ↓
PRIORITY SKILLS
   ↓
LEARNING PLAN
   ↓
DAILY MISSION
   ↓
PRACTICE
   ↓
ERROR DIAGNOSIS
   ↓
HINT / EXPLANATION
   ↓
ISOMORPHIC VARIANT
   ↓
RETEST
   ↓
UPDATE LEARNER MODEL
   ↓
REPLAN
   ↓
TRYOUT
   ↓
UPDATE TARGET PROBABILITY
   ↓
REPEAT
```

Tidak boleh ada fitur utama yang memutus loop ini.

---

# 4. TWO TRACKS, ONE LEARNING ENGINE

ZanBimbel memiliki dua domain:

## Track A — UTBK/SNBT

Target:

- PTN
- program studi
- kombinasi pilihan

Learning engine:

- skill mastery
- difficulty
- speed
- error taxonomy
- target relevance
- historical benchmark bila tersedia

## Track B — CPNS/SKD

Target:

- instansi
- formasi
- jenis kebutuhan
- tahun seleksi

Learning engine:

- TWK
- TIU
- TKP
- threshold constraint
- total score
- target buffer

### Prinsip

UI dan learner engine sebisa mungkin shared.

Namun:

**Scoring rules, target rules, dan eligibility rules harus track-specific.**

Tidak boleh menggunakan satu rumus scoring untuk UTBK dan CPNS.

---

# 5. TARGET MODEL

Target tidak boleh hanya berupa angka.

## UTBK target object

```json
{
  "track": "UTBK",
  "ptn_id": "...",
  "program_id": "...",
  "choice_priority": 1,
  "benchmark": {
    "type": "historical_estimate",
    "year": 2026,
    "lower": null,
    "competitive": null,
    "high_confidence": null,
    "source": [],
    "sample_size": null
  }
}
```

### IMPORTANT

ZanBimbel TIDAK boleh menyebut benchmark sebagai:

- passing score resmi,
- cutoff resmi,
- skor minimum pasti,
- atau jaminan diterima.

UI harus menggunakan terminology seperti:

> **Benchmark kompetitif (estimasi)**

dan selalu menyediakan:

- tahun,
- sumber,
- metode,
- sample size bila tersedia,
- confidence/quality label.

Jika data tidak memadai:

> **Benchmark belum tersedia**

bukan mengarang angka.

---

# 6. LEARNER MODEL

Learner model adalah inti intellectual property ZanBimbel.

Jangan hanya menyimpan:

```text
accuracy
```

Minimal setiap skill memiliki:

```json
{
  "skill": "pm.aljabar",
  "mastery": 0.62,
  "confidence": 0.74,
  "accuracy_recent": 0.70,
  "accuracy_all_time": 0.61,
  "speed_index": 0.81,
  "difficulty_ceiling": 2,
  "retention": 0.58,
  "recent_trend": 0.09,
  "attempt_count": 23,
  "last_practiced_at": "...",
  "error_distribution": {
    "concept": 0.30,
    "process": 0.20,
    "reading": 0.10,
    "careless": 0.25,
    "time_pressure": 0.15
  }
}
```

---

# 7. LEARNER MODEL PRINCIPLES

## Accuracy ≠ Mastery

Satu kali benar tidak cukup untuk menyatakan mastery.

Mastery harus dipengaruhi oleh:

- jumlah evidence,
- difficulty,
- consistency,
- recency,
- response time,
- error type,
- performance pada variant,
- performance setelah delay.

## Confidence

Jika evidence sedikit, sistem harus menurunkan confidence.

Contoh:

```text
accuracy = 100%
n = 2
```

tidak boleh dianggap:

> mastery = 100%.

---

# 8. SKILL TAXONOMY

Setiap soal wajib memiliki:

```text
track
subtest
domain
skill
subskill
```

Contoh:

```text
UTBK
└── PM
    └── Algebra
        └── Linear Equation
```

atau:

```text
CPNS
└── TIU
    └── Numerik
        └── Perbandingan
```

Skill taxonomy harus versioned.

Jangan mengubah definisi skill secara destruktif setelah data pengguna terkumpul.

---

# 9. ERROR TAXONOMY

Setiap attempt dapat memiliki satu atau lebih error tags.

## Concept

```text
concept_missing
concept_wrong
misconception
```

## Process

```text
wrong_method
incomplete_method
calculation_error
```

## Reading

```text
missed_information
misinterpretation
inference_error
```

## Execution

```text
careless
time_pressure
option_confusion
```

## Strategy

```text
poor_question_selection
overthinking
inefficient_solution
```

## Uncertainty

```text
guess
low_confidence_correct
```

### Source of error tag

Error tag dapat berasal dari:

1. explicit user self-report,
2. deterministic rules,
3. response behavior,
4. AI classification,
5. reviewer correction.

AI-generated error tag tidak boleh dianggap ground truth secara otomatis.

---

# 10. DIAGNOSTIC ENGINE

Tujuan diagnostic:

**bukan memberikan skor sebanyak mungkin.**

Tujuannya adalah memperoleh evidence yang cukup untuk membentuk initial learner model.

Diagnostic harus mengukur:

- coverage,
- accuracy,
- difficulty,
- speed,
- error pattern.

---

# 11. DIAGNOSTIC TEST DESIGN

Diagnostic harus:

- singkat,
- representative,
- skill-balanced,
- difficulty-balanced,
- tidak menggunakan seluruh bank,
- memiliki timer,
- tidak menunjukkan kunci selama tes.

Item diagnosis harus memiliki flag:

```text
diagnostic_only = true
```

dan memiliki cooldown agar tidak langsung digunakan sebagai drill.

---

# 12. ADAPTIVE DIAGNOSTIC — FUTURE

MVP:

- fixed blueprint.

Future:

- adaptive item selection.

Jika learner terlihat sangat kuat pada suatu skill, diagnostic dapat mengurangi item mudah dan memberikan item yang lebih informative.

Jika learner terlihat lemah, sistem tetap harus memperoleh evidence yang cukup sebelum menyimpulkan mastery rendah.

Adaptive testing harus dibedakan dari adaptive learning:

- assessment mencari estimasi kemampuan,
- learning mencari intervensi yang meningkatkan kemampuan.

---

# 13. INITIAL ABILITY ESTIMATION

MVP tidak boleh mengklaim:

> “ini skor resmi UTBK”.

MVP menggunakan:

### Internal Ability Index

Contoh:

```json
{
  "index": 618,
  "scale": "internal",
  "confidence": "medium"
}
```

UI:

> **Indeks kemampuan ZanBimbel: 618**

bukan:

> **Skor UTBK Anda: 618**

---

# 14. PSYCHOMETRIC ROADMAP

## Phase 1 — Rule-based

Gunakan:

- weighted accuracy,
- difficulty,
- response time,
- confidence.

## Phase 2 — Empirical calibration

Kumpulkan:

- response data,
- item difficulty,
- item discrimination,
- distractor behavior,
- time distribution.

## Phase 3 — IRT / learner model

Jika jumlah dan kualitas data memadai, pertimbangkan:

- Rasch / 1PL,
- 2PL,
- multidimensional IRT,
- atau model lain yang sesuai.

## Phase 4 — Adaptive item selection

Gunakan learner ability + item information untuk memilih item berikutnya.

### Constraint

Jangan mengimplementasikan “IRT” hanya sebagai label marketing.

IRT memerlukan calibrated item bank dan data yang memadai.

---

# 15. GAP ENGINE

Gap bukan hanya:

```text
target_score - current_score
```

Gap harus dihitung pada beberapa level:

```text
Overall
↓
Subtest
↓
Domain
↓
Skill
↓
Error type
```

Contoh:

```text
PM
 └── Algebra
      └── Linear equation
           mastery 0.41
           target relevance HIGH
           confidence 0.82
           gap HIGH
```

---

# 16. PRIORITY SCORE

Prioritas skill harus mempertimbangkan:

```text
mastery gap
×
target relevance
×
confidence
×
expected improvement
×
urgency
```

Bukan hanya:

```text
1 - accuracy
```

Contoh conceptual formula:

```text
priority =
gap
× target_weight
× confidence_factor
× opportunity_factor
× urgency_factor
```

Formula final dapat berubah setelah data nyata tersedia.

Jangan mengunci formula sebagai scientific truth pada MVP.

---

# 17. LEARNING PLAN

Learning plan terdiri dari stages.

## Stage 0 — Stabilize

Tujuan:

- mengamankan foundational skills,
- mengurangi careless error,
- menghilangkan misconception besar.

## Stage 1 — Close Critical Gaps

Target:

- 2–4 skill dengan priority tertinggi.

## Stage 2 — Raise Ceiling

Target:

- difficulty lebih tinggi,
- multi-step reasoning,
- transfer.

## Stage 3 — Simulation

Target:

- exam condition,
- timing,
- stamina,
- strategy.

## Stage 4 — Buffer

Target:

- memperbesar margin terhadap target.

Stage dapat berbeda menurut track.

---

# 18. EXIT CRITERIA

Jangan hanya:

```text
accuracy >= 80%
```

Mastery evidence minimal mempertimbangkan:

- mastery estimate,
- confidence,
- sample size,
- recent accuracy,
- difficulty,
- speed,
- variant performance,
- repeated misconception.

Contoh:

```text
mastery >= 0.80
confidence >= 0.75
n >= minimum_evidence
recent_accuracy >= threshold
variant_success >= threshold
```

Threshold merupakan konfigurasi yang dapat berubah setelah validasi data.

---

# 19. DAILY MISSION ENGINE

Setiap hari pengguna mendapatkan satu mission.

Contoh:

```text
MISSION #18

Duration:
35 minutes

Focus:
PM — Algebra

Goal:
Master linear equation

Tasks:
1. Review 2 weak concepts
2. 8 guided questions
3. 5 standard questions
4. 3 isomorphic variants
5. 2 challenge questions
```

Mission tidak boleh sekadar:

> “20 soal random.”

---

# 20. ITEM SELECTION ENGINE

Setiap item diberi score untuk dipilih berdasarkan:

```text
skill relevance
mastery gap
difficulty match
target relevance
recency
exposure
error relevance
variant relation
learning value
```

Hard constraints:

- jangan terlalu sering mengulang item,
- jangan memberi item diagnosis yang masih under cooldown,
- jangan memberi item yang sudah mastered secara berlebihan,
- jangan memberi terlalu banyak item difficulty tinggi saat foundation belum cukup.

---

# 21. CONTENT MODEL

Setiap item wajib memiliki:

```json
{
  "id": "...",
  "version": 1,
  "track": "UTBK",
  "subtest": "PM",
  "domain": "algebra",
  "skill": "pm.algebra.linear_equation",
  "difficulty": 2,
  "status": "published",

  "stem": "...",
  "stimulus": null,

  "options": {
    "A": "...",
    "B": "...",
    "C": "...",
    "D": "...",
    "E": "..."
  },

  "answer": "C",

  "solution": {
    "steps": [],
    "concept": "...",
    "final_answer": "...",
    "common_traps": {}
  },

  "error_tags": [],

  "variant": {
    "parent_id": null,
    "type": null
  },

  "metadata": {
    "source_type": "original",
    "author": "...",
    "review_status": "approved"
  }
}
```

---

# 22. CONTENT QUALITY GATE

Tidak ada item langsung:

```text
AI generated → published
```

Pipeline:

```text
DRAFT
 ↓
AI GENERATION
 ↓
SCHEMA VALIDATION
 ↓
ANSWER VALIDATION
 ↓
SOLUTION VALIDATION
 ↓
DISTRACTOR CHECK
 ↓
AMBIGUITY CHECK
 ↓
DIFFICULTY REVIEW
 ↓
SKILL REVIEW
 ↓
HUMAN REVIEW
 ↓
PUBLISHED
```

---

# 23. CONTENT VERSIONING

Published item harus immutable terhadap attempt historis.

Jika item diperbaiki:

```text
item v1
↓
item v2
```

Attempt lama tetap menunjuk ke v1.

Attempt baru menggunakan v2.

---

# 24. ISOMORPHIC VARIANT ENGINE

Jika user salah:

```text
Original
   ↓
Error classification
   ↓
Variant generation
   ↓
Validation
   ↓
Variant A
   ↓
Variant B
   ↓
Retest
```

Variant harus mempertahankan:

- skill,
- underlying reasoning pattern,
- cognitive demand.

Yang boleh berubah:

- angka,
- nama,
- konteks,
- stimulus,
- surface form.

---

# 25. VARIANT TYPES

Minimal:

### Type A — Surface mutation

Angka/nama berubah.

### Type B — Context mutation

Cerita/konteks berubah.

### Type C — Structural mutation

Struktur soal berubah tetapi skill sama.

### Type D — Reverse problem

Arah pertanyaan dibalik.

### Type E — Distractor mutation

Distractor dibuat berdasarkan misconception.

---

# 26. MASTERy CONFIRMATION

Benar satu variant tidak otomatis mastery.

Contoh:

```text
Original: wrong
Variant A: correct
Variant B: correct
Variant C: correct
Delayed item: correct
```

Evidence tersebut jauh lebih kuat.

---

# 27. DELAYED RETENTION

Untuk skill tertentu, sistem dapat memberikan retest setelah:

```text
1 day
3 days
7 days
```

Tujuannya menguji apakah kemampuan bertahan setelah practice effect berkurang.

Feature dapat dimulai setelah data usage cukup.

---

# 28. AI TUTOR

AI tutor bukan chatbot bebas.

Tutor selalu menerima:

```text
user_id
session_id
item_id
skill_id
attempt_state
current_hint_level
```

---

# 29. HINT LADDER

Tutor menggunakan progressive assistance.

### Level 0
No hint.

### Level 1
Concept recall.

### Level 2
Direction.

### Level 3
First-step guidance.

### Level 4
Guided solution.

### Level 5
Full explanation.

Tutor harus menghindari langsung memberikan jawaban apabila user belum meminta explanation mode dan kebijakan produk mengharuskan user mencoba terlebih dahulu.

---

# 30. TUTOR CONSTRAINTS

Tutor tidak boleh:

- mengaku item resmi,
- mengarang sumber,
- membocorkan diagnostic answer,
- membocorkan active tryout,
- keluar dari konteks item,
- membuat klaim kemampuan pengguna yang tidak didukung evidence.

Tutor boleh:

- menjelaskan konsep yang diperlukan item,
- memberikan hint,
- mengidentifikasi kesalahan,
- memberikan analogi,
- menghasilkan variant,
- menjelaskan mengapa distractor salah.

---

# 31. TRYOUT ENGINE

Tryout berbeda dari drill.

Drill:

> learning-oriented.

Tryout:

> measurement-oriented.

Selama tryout:

- feedback ditunda,
- kunci tidak ditampilkan,
- tutor disabled,
- timer aktif,
- scoring mengikuti track rules.

Setelah tryout:

```text
score
↓
subtest
↓
skill
↓
error pattern
↓
learner model update
↓
new plan
```

---

# 32. CPNS / SKD RULE ENGINE

CPNS harus memiliki ruleset versioning.

Contoh:

```text
ruleset:
  year: 2026
  track: CPNS
  test: SKD
```

Rules tidak boleh hard-coded ke UI.

Data:

```text
threshold
scoring
subtest
maximum score
eligibility
```

harus configurable.

Jika regulasi berubah, buat ruleset baru.

---

# 33. CPNS FAILURE PRIORITY

Jika sebuah subtest memiliki constraint wajib:

```text
below_threshold = true
```

maka skill dalam subtest tersebut memperoleh priority tinggi meskipun overall score terlihat bagus.

UI harus sangat jelas:

> ⚠️ **TIU Anda belum melewati ambang.**

Bukan hanya menampilkan total score.

---

# 34. SCORE PRESENTATION

Semua score harus memiliki type.

Contoh:

```text
official
estimated
internal
benchmark
simulation
```

UI tidak boleh mencampurkan semuanya.

Contoh:

### Internal Ability Index

> 618

### Competitive Benchmark

> 700–730

### Gap

> -82 sampai -112

Dengan disclaimer:

> Benchmark adalah estimasi berdasarkan data yang tersedia dan bukan passing score resmi.

---

# 35. USER EXPERIENCE

## Screen 1
Landing

CTA:

> Mulai Diagnosis

Bukan:

> Lihat 10.000 soal.

## Screen 2
Track selection

- UTBK/SNBT
- CPNS/SKD

## Screen 3
Target

Search:

- PTN
- prodi
- instansi
- formasi

## Screen 4
Diagnostic briefing

Menjelaskan:

- durasi,
- tujuan,
- aturan.

## Screen 5
Diagnostic player

## Screen 6
Diagnostic report

Menampilkan:

- overall ability,
- subtest,
- skill,
- top gaps,
- confidence,
- target gap.

## Screen 7
Learning plan

## Screen 8
Daily mission

## Screen 9
Question player

## Screen 10
Explanation

Tabs:

```text
Cara
Kenapa
Jebakan
Coba Lagi
```

## Screen 11
Variant

## Screen 12
Tutor

## Screen 13
Tryout

## Screen 14
Progress

---

# 36. PROGRESS DASHBOARD

Dashboard tidak boleh hanya:

```text
120 / 500 questions
```

Yang ditampilkan:

### Ability

```text
618 → 651
```

### Mastery

```text
42% → 57%
```

### Critical gaps

```text
3 → 1
```

### Error rate

```text
Concept: ↓
Careless: ↓
Time pressure: →
```

### Target distance

```text
Current
     ↓
Benchmark
     ↓
High-confidence target
```

---

# 37. DATABASE

Core tables:

```text
users
profiles

tracks
targets
target_benchmarks

skills
skill_versions

items
item_versions
item_variants

diagnostic_blueprints
diagnostic_sessions

sessions
session_items
attempts

error_tags
attempt_error_tags

learner_skill_states
learner_snapshots

learning_plans
plan_stages
daily_missions
mission_items

tryouts
tryout_sessions

ai_threads
ai_messages
ai_usage

content_reviews
content_review_events

rulesets
ruleset_versions
```

---

# 38. EVENT LOGGING

Setiap meaningful event harus dapat dianalisis.

Contoh:

```text
diagnostic_started
diagnostic_completed

item_opened
answer_submitted
hint_requested
explanation_opened

variant_started
variant_completed

mission_started
mission_completed

tryout_started
tryout_completed

target_changed
plan_generated
plan_replanned

tutor_message_sent
```

---

# 39. ANALYTICS

Product analytics minimal:

### Activation

- registration → target
- target → diagnostic
- diagnostic completion

### Learning

- mission completion
- mastery improvement
- error reduction
- retention

### Engagement

- sessions/week
- questions/session
- return rate

### Business

- free → pro conversion
- tutor usage
- paywall conversion
- churn

---

# 40. CONTENT ANALYTICS

Setiap item memiliki performance statistics:

```text
attempt_count
correct_rate
median_time
option_distribution
skip_rate
hint_rate
variant_success_rate
```

Jika item menunjukkan:

```text
correct_rate abnormal
```

atau:

```text
two options frequently selected
```

item masuk QA review.

---

# 41. ITEM DIAGNOSTICS

Sistem harus dapat mendeteksi:

### Potentially broken item

- multiple plausible answers,
- unusually low discrimination,
- abnormal time,
- unexpected option distribution,
- explanation mismatch.

Item dapat otomatis:

```text
published
→ flagged
→ review
```

---

# 42. ADMIN CMS

Admin harus dapat:

- create item,
- edit draft,
- preview,
- validate,
- approve,
- publish,
- unpublish,
- version,
- import JSONL,
- export JSONL,
- generate variants,
- review AI output,
- inspect item analytics.

Admin TIDAK boleh mengubah historical attempt.

---

# 43. IMPORT FORMAT

JSONL support.

Validation:

```text
schema valid
skill valid
answer valid
steps >= required
options valid
track valid
difficulty valid
```

Jika gagal:

```text
line number
field
error
```

Harus ditampilkan.

---

# 44. MONETIZATION

## Free

- diagnostic terbatas,
- daily drill terbatas,
- basic explanation,
- limited tutor,
- mini tryout.

## Pro

- adaptive plan,
- unlimited planned drill,
- full explanation,
- variant engine,
- deeper analytics,
- full tryout,
- tutor quota lebih besar.

## Intensif

Future:

- exam countdown,
- intensive adaptive schedule,
- specific target package,
- advanced simulation.

Harga tidak dikunci dalam PRD.

---

# 45. PAYWALL PRINCIPLE

Jangan paywall:

> “access to knowledge”.

Paywall:

> “depth of personalization”.

Free user harus memperoleh value.

Paid user memperoleh:

```text
more adaptation
+
more feedback
+
more analysis
+
more practice
+
more personalization
```

---

# 46. SAFETY & CONTENT INTEGRITY

ZanBimbel tidak boleh:

- mengklaim soal resmi tanpa sumber,
- menggunakan copyrighted question bank tanpa rights,
- mengklaim score guarantee,
- membuat benchmark tanpa provenance,
- mengarang historical data,
- menyatakan probability diterima tanpa model/data yang mendukung.

Semua generated content harus memiliki provenance.

---

# 47. AI CONTENT GENERATION

AI hanya bertugas sebagai:

```text
generator
assistant
classifier
validator
```

bukan final authority.

Human/content QA tetap menjadi final gate untuk production-critical content.

---

# 48. DATA PRIVACY

Minimal:

- user authentication,
- encrypted secrets,
- role-based admin access,
- audit log,
- deletion flow,
- minimal personal data collection,
- separation between identity data and learning analytics bila memungkinkan.

AI provider tidak boleh menerima data yang tidak diperlukan untuk task.

---

# 49. MVP SCOPE

## MUST HAVE

### Foundation

- auth
- tracks
- target
- PostgreSQL
- item schema
- skill taxonomy

### Assessment

- diagnostic
- timer
- scoring
- report

### Learning

- learner profile
- gap engine
- learning plan
- daily mission
- drill

### Content

- explanation
- traps
- variant
- admin QA

### AI

- contextual tutor
- hint ladder

### Measurement

- ability snapshots
- skill mastery
- error tags

---

# 50. MVP SHOULD NOT HAVE

- native app,
- live class,
- human mentor marketplace,
- forum,
- social feed,
- national leaderboard,
- massive scraper,
- full IRT production,
- complex SKB ecosystem,
- gamification-heavy system,
- unnecessary AI agents.

---

# 51. BUILD ORDER

## Sprint 0 — Foundation

Build:

- database,
- authentication,
- item schema,
- skill taxonomy,
- admin item CRUD,
- 30–50 manually validated items.

Target:

> content engine works.

---

## Sprint 1 — Diagnostic

Build:

- blueprint,
- diagnostic player,
- timer,
- attempt engine,
- initial ability calculation,
- diagnostic report.

Target:

> user → target → diagnostic → meaningful report.

---

## Sprint 2 — Learner Model

Build:

- skill state,
- confidence,
- error taxonomy,
- snapshots,
- gap engine.

Target:

> system knows WHAT the user is weak at and WHY.

---

## Sprint 3 — Adaptive Plan

Build:

- priority engine,
- stage generator,
- exit criteria,
- daily mission.

Target:

> system knows WHAT user should do next.

---

## Sprint 4 — Drill + Explanation

Build:

- practice player,
- solution,
- traps,
- hint ladder,
- review wrong.

Target:

> user can learn from mistakes.

---

## Sprint 5 — Variant Engine

Build:

- isomorphic variant,
- validation,
- retest,
- mastery update.

Target:

> system verifies whether learning actually occurred.

---

## Sprint 6 — Tutor

Build:

- contextual AI,
- item binding,
- quota,
- hint ladder,
- guardrails.

Target:

> AI helps without becoming generic chatbot.

---

## Sprint 7 — Tryout

Build:

- timed tryout,
- scoring,
- report,
- learner update,
- replan.

Target:

> assessment feeds learning.

---

## Sprint 8 — Monetization

Build:

- plan limits,
- quota,
- Pro flag,
- payment integration later.

---

# 52. MVP SUCCESS CRITERIA

MVP dianggap berhasil jika:

### Activation

User baru dapat:

```text
register
→ target
→ diagnostic
→ report
```

dalam satu session.

### Learning

User menerima:

```text
top gaps
→ plan
→ daily mission
```

tanpa admin intervention.

### Content

100% published items:

- valid schema,
- valid answer,
- explanation,
- steps,
- traps,
- skill mapping.

### Adaptation

Setelah attempt baru:

> learner model berubah.

Setelah learner model berubah:

> mission berikutnya dapat berubah.

### Variant

Jika user salah:

> system dapat memberikan variant yang relevan.

### Tutor

Tutor:

> tidak keluar dari item context.

---

# 53. QUALITY GATES

Sebelum production:

### Gate 1
Content accuracy

### Gate 2
Scoring validity

### Gate 3
Learner model sanity check

### Gate 4
Adaptive recommendation quality

### Gate 5
AI tutor safety

### Gate 6
Performance

### Gate 7
Mobile UX

---

# 54. EXPERIMENTATION ROADMAP

Setelah MVP memiliki cukup usage data, lakukan eksperimen:

### Experiment A

Random practice vs adaptive practice.

### Experiment B

Explanation biasa vs explanation + traps.

### Experiment C

Variant setelah salah vs tanpa variant.

### Experiment D

Fixed daily quota vs adaptive quota.

### Experiment E

Hint ladder vs full solution.

Primary metric:

> learning gain

bukan hanya:

> engagement.

---

# 55. LONG-TERM LEARNING ENGINE

Roadmap jangka panjang:

```text
RULE-BASED
    ↓
EMPIRICAL LEARNER MODEL
    ↓
CALIBRATED ITEM PARAMETERS
    ↓
IRT / COGNITIVE DIAGNOSTIC MODEL
    ↓
ADAPTIVE ITEM SELECTION
    ↓
PREDICTIVE LEARNING MODEL
    ↓
PERSONALIZED LEARNING POLICY
```

Jangan melompat langsung ke AI/ML kompleks sebelum data foundation tersedia.

---

# 56. CORE PRODUCT MOAT

Moat ZanBimbel bukan:

- model AI,
- frontend,
- jumlah soal.

Moat:

### 1. Skill graph

Memetakan kompetensi.

### 2. Item graph

Menghubungkan:

```text
skill
↕
item
↕
error
↕
variant
```

### 3. Learner model

Memahami kemampuan individual.

### 4. Response dataset

Mengetahui bagaimana pengguna Indonesia menjawab item.

### 5. Learning outcomes

Mengetahui intervensi mana yang benar-benar meningkatkan kemampuan.

### 6. Content quality

Item + explanation + variant yang tervalidasi.

---

# 57. FUNDAMENTAL DESIGN PRINCIPLE

ZanBimbel harus selalu menjawab empat pertanyaan:

### 1. Where am I?

**Assessment**

### 2. Why am I weak?

**Error diagnosis**

### 3. What should I do next?

**Adaptive planning**

### 4. Did I actually improve?

**Mastery + retest**

Jika sebuah feature tidak membantu salah satu dari empat pertanyaan ini, feature tersebut bukan prioritas MVP.

---

# 58. FINAL PRODUCT LOOP

```text
             ┌───────────────┐
             │    TARGET     │
             └───────┬───────┘
                     ↓
             ┌───────────────┐
             │  DIAGNOSTIC   │
             └───────┬───────┘
                     ↓
             ┌───────────────┐
             │ LEARNER MODEL │
             └───────┬───────┘
                     ↓
             ┌───────────────┐
             │   GAP ENGINE  │
             └───────┬───────┘
                     ↓
             ┌───────────────┐
             │  PLAN ENGINE  │
             └───────┬───────┘
                     ↓
             ┌───────────────┐
             │ DAILY MISSION │
             └───────┬───────┘
                     ↓
             ┌───────────────┐
             │    PRACTICE   │
             └───────┬───────┘
                     ↓
             ┌───────────────┐
             │ ERROR ENGINE  │
             └───────┬───────┘
                     ↓
             ┌───────────────┐
             │ HINT / SOLVE  │
             └───────┬───────┘
                     ↓
             ┌───────────────┐
             │    VARIANT    │
             └───────┬───────┘
                     ↓
             ┌───────────────┐
             │    RETEST     │
             └───────┬───────┘
                     ↓
             ┌───────────────┐
             │ UPDATE MODEL  │
             └───────┬───────┘
                     │
                     └──────────────→ REPLAN
```

**Inilah core architecture ZanBimbel.**

Bukan:

> question → answer → next question.

Tetapi:

> **measure → diagnose → intervene → verify → update → adapt.**

---

# 59. INSTRUCTION TO IMPLEMENTOR

Implementor harus:

1. mengikuti product loop,
2. tidak mengubah core learning architecture tanpa approval owner,
3. tidak mengarang benchmark,
4. tidak mengklaim score resmi,
5. tidak membuat content generator tanpa QA gate,
6. tidak membuat AI tutor menjadi generic chatbot,
7. tidak menganggap accuracy sebagai mastery,
8. tidak memulai dari marketing UI sebelum learning loop bekerja.

Jika ada ambiguity:

> **tanyakan owner daripada mengarang requirement.**

---

# 60. INSTRUCTION TO GROK — PRODUCT REVIEW

Review PRD ini secara adversarial.

Jangan hanya mengatakan “bagus”.

Cari:

1. logical inconsistency,
2. missing requirements,
3. psychometric errors,
4. pedagogical weaknesses,
5. scoring risks,
6. data-model problems,
7. adaptive-learning flaws,
8. AI hallucination risks,
9. content QA weaknesses,
10. monetization weaknesses,
11. UX friction,
12. scalability problems,
13. measurement validity problems,
14. claims that cannot be supported by available data.

Untuk setiap kritik:

```text
PROBLEM
WHY IT MATTERS
SEVERITY
RECOMMENDATION
MVP / LATER
```

Prioritaskan **correctness over feature count**.

Jangan menambah fitur hanya agar PRD terlihat lebih kompleks.

---

# 61. OWNER PRINCIPLE

> **30 soal berkualitas tinggi dengan pembahasan benar, skill mapping benar, error diagnosis benar, dan variant benar lebih berharga daripada 10.000 soal AI yang tidak tervalidasi.**

ZanBimbel harus menang melalui:

**precision of personalization**, bukan quantity of content.