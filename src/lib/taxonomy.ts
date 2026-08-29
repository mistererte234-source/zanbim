import { TaxonomySkill } from "./types";

export const INITIAL_TAXONOMY: TaxonomySkill[] = [
  // UTBK Skills
  { code: "utbk.pu.logika.silogisme", track: "UTBK", subtest: "PU", domain: "logika", label: "Silogisme & Penalaran Logis", version: 1 },
  { code: "utbk.pu.logika.sebab_akibat", track: "UTBK", subtest: "PU", domain: "logika", label: "Hubungan Sebab Akibat", version: 1 },
  { code: "utbk.pu.logika.analogi", track: "UTBK", subtest: "PU", domain: "logika", label: "Analogi Kata & Kausalitas", version: 1 },
  { code: "utbk.pu.kuantitas.perbandingan_kuantitas", track: "UTBK", subtest: "PU", domain: "kuantitas", label: "Perbandingan Kuantitatif", version: 1 },
  { code: "utbk.ppu.wawasan.teks_pendek", track: "UTBK", subtest: "PPU", domain: "wawasan", label: "Pemahaman Teks Pendek", version: 1 },
  { code: "utbk.pbm.bahasa.kalimat_efektif", track: "UTBK", subtest: "PBM", domain: "bahasa", label: "Kalimat Efektif & PUEBI", version: 1 },
  { code: "utbk.pbm.bahasa.koherensi", track: "UTBK", subtest: "PBM", domain: "bahasa", label: "Koherensi & Paragraf", version: 1 },
  { code: "utbk.pk.aritmetika.persen_perbandingan", track: "UTBK", subtest: "PK", domain: "aritmetika", label: "Persentase & Rasio", version: 1 },
  { code: "utbk.pk.aljabar.persamaan_linear", track: "UTBK", subtest: "PK", domain: "aljabar", label: "Persamaan Linear & Sistem", version: 1 },
  { code: "utbk.pk.data.tabel_grafik", track: "UTBK", subtest: "PK", domain: "data", label: "Analisis Tabel & Grafik", version: 1 },
  { code: "utbk.lbi.baca.ide_pokok", track: "UTBK", subtest: "LBI", domain: "baca", label: "Ide Pokok Teks Indonesia", version: 1 },
  { code: "utbk.lbi.baca.inferensi", track: "UTBK", subtest: "LBI", domain: "baca", label: "Inferensi & Kesimpulan Teks", version: 1 },
  { code: "utbk.lbe.baca.main_idea", track: "UTBK", subtest: "LBE", domain: "baca", label: "Main Idea English Text", version: 1 },
  { code: "utbk.lbe.baca.inference", track: "UTBK", subtest: "LBE", domain: "baca", label: "English Text Inference", version: 1 },
  { code: "utbk.pm.aljabar.persamaan", track: "UTBK", subtest: "PM", domain: "aljabar", label: "Persamaan Matematika & Fungsi", version: 1 },
  { code: "utbk.pm.geometri.dasar", track: "UTBK", subtest: "PM", domain: "geometri", label: "Geometri Dasar & Ruang", version: 1 },
  { code: "utbk.pm.data.peluang_statistika", track: "UTBK", subtest: "PM", domain: "data", label: "Peluang & Statistika", version: 1 },

  // CPNS Skills
  { code: "cpns.twk.pilar.pancasila", track: "CPNS", subtest: "TWK", domain: "pilar", label: "Pancasila & Nilai Kebangsaan", version: 1 },
  { code: "cpns.twk.pilar.uud", track: "CPNS", subtest: "TWK", domain: "pilar", label: "UUD 1945 & Tata Negara", version: 1 },
  { code: "cpns.twk.pilar.nkri", track: "CPNS", subtest: "TWK", domain: "pilar", label: "NKRI & Sejarah Perjuangan", version: 1 },
  { code: "cpns.twk.integritas.bela_negara", track: "CPNS", subtest: "TWK", domain: "integritas", label: "Bela Negara & Nasionalisme", version: 1 },
  { code: "cpns.tiu.verbal.analogi_silogisme", track: "CPNS", subtest: "TIU", domain: "verbal", label: "Analogi & Silogisme Verbal", version: 1 },
  { code: "cpns.tiu.numerik.deret", track: "CPNS", subtest: "TIU", domain: "numerik", label: "Deret Angka & Pola Bilangan", version: 1 },
  { code: "cpns.tiu.numerik.aritmetika", track: "CPNS", subtest: "TIU", domain: "numerik", label: "Aritmetika Sosial & Hitungan", version: 1 },
  { code: "cpns.tiu.figural.pola", track: "CPNS", subtest: "TIU", domain: "figural", label: "Penalaran Figural & Gambar", version: 1 },
  { code: "cpns.tiu.logika.penalaran", track: "CPNS", subtest: "TIU", domain: "logika", label: "Penalaran Analitis & Posisi", version: 1 },
  { code: "cpns.tkp.pelayanan.publik", track: "CPNS", subtest: "TKP", domain: "pelayanan", label: "Pelayanan Publik & Orientasi User", version: 1 },
  { code: "cpns.tkp.kerja.profesionalisme", track: "CPNS", subtest: "TKP", domain: "kerja", label: "Profesionalisme & Etika Kerja", version: 1 },
  { code: "cpns.tkp.kerja.jejaring", track: "CPNS", subtest: "TKP", domain: "kerja", label: "Jejaring Kerja & Kolaborasi", version: 1 },
  { code: "cpns.tkp.nilai.integritas_antikorupsi", track: "CPNS", subtest: "TKP", domain: "nilai", label: "Integritas & Anti Korupsi", version: 1 },
];

export const VALID_SKILL_CODES = new Set(INITIAL_TAXONOMY.map(s => s.code));
