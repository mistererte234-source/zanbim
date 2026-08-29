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

  // REKRUTMEN HRD Skills
  { code: "rekrutmen.iq.spasial.matriks_raven", track: "REKRUTMEN", subtest: "IQ_SPASIAL", domain: "spasial", label: "Penalaran Spasial & Matriks Gambar", version: 1 },
  { code: "rekrutmen.iq.logika.penalaran_kritis", track: "REKRUTMEN", subtest: "IQ_LOGIKA", domain: "logika", label: "Penalaran Kritis & Problem Solving", version: 1 },
  { code: "rekrutmen.iq.numerik.analisis_data", track: "REKRUTMEN", subtest: "IQ_NUMERIK", domain: "numerik", label: "Logika Numerik & Finansial", version: 1 },
  { code: "rekrutmen.iq.verbal.analogi_wawasan", track: "REKRUTMEN", subtest: "IQ_VERBAL", domain: "verbal", label: "Penalaran Verbal & Komunikasi Bisnis", version: 1 },
  { code: "rekrutmen.psikotes.kerja.problem_solving", track: "REKRUTMEN", subtest: "PSIKOTES", domain: "perilaku", label: "Psikotes Kepemimpinan & Etika Kerja", version: 1 },

  // DEWAN RI Skills
  { code: "dewan.legislatif.fungsi.pengawasan", track: "DEWAN_RI", subtest: "LEGISLASI", domain: "fungsi", label: "Fungsi Pengawasan & Kelembagaan", version: 1 },
  { code: "dewan.legislatif.fungsi.penganggaran_apbn", track: "DEWAN_RI", subtest: "BUDGETING", domain: "fungsi", label: "Fungsi Penganggaran APBN & Daerah", version: 1 },
  { code: "dewan.legislatif.fungsi.pembentukan_uu", track: "DEWAN_RI", subtest: "LEGISLASI", domain: "fungsi", label: "Pembentukan Undang-Undang (Prolegnas)", version: 1 },
  { code: "dewan.komisi.spesifik.wawasan_regulasi", track: "DEWAN_RI", subtest: "KOMISI_SPESIFIK", domain: "komisi", label: "Wawasan Kebijakan & Regulasi Komisi", version: 1 },
  { code: "dewan.etika.integritas.anti_korupsi", track: "DEWAN_RI", subtest: "ETIKA_INTEGRITAS", domain: "etika", label: "Etika Publik & Bebas Konflik Kepentingan", version: 1 },

  // DOSEN Skills (Seleksi Dosen PTN / PTS & NIDN)
  { code: "dosen.tridharma.pendidikan.pedagogik", track: "DOSEN", subtest: "PEDAGOGIK", domain: "pendidikan", label: "Kompetensi Pedagogik & Pembelajaran", version: 1 },
  { code: "dosen.tridharma.penelitian.metodologi", track: "DOSEN", subtest: "PENELITIAN", domain: "penelitian", label: "Metodologi Penelitian & Jurnal Scopus/Sinta", version: 1 },
  { code: "dosen.tridharma.pengabdian.masyarakat", track: "DOSEN", subtest: "PENGABDIAN", domain: "pengabdian", label: "Pengabdian Kepada Masyarakat (PkM)", version: 1 },
  { code: "dosen.etika.akademis.integritas", track: "DOSEN", subtest: "ETIKA_AKADEMIS", domain: "etika", label: "Etika Akademis & Bebas Plagiarisme", version: 1 },
  { code: "dosen.potensi.akademik.analisis_kritis", track: "DOSEN", subtest: "TPA_DOSEN", domain: "potensi", label: "Tes Potensi Akademik (TPA) Dosen", version: 1 },
];

export const VALID_SKILL_CODES = new Set(INITIAL_TAXONOMY.map(s => s.code));
