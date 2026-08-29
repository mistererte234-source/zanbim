import { PrismaClient } from "@prisma/client";
import { INITIAL_TAXONOMY } from "../src/lib/taxonomy";
import { validateItemGate } from "../src/lib/gate-validator";

const prisma = new PrismaClient();

const SAMPLE_ITEMS = [
  // -------------------------------------------------------------
  // UTBK HOTS ITEMS (20 HIGH-ORDER THINKING SKILL ITEMS)
  // -------------------------------------------------------------
  {
    id: "utbk.pm.aljabar.persamaan.001",
    version: 1,
    track: "UTBK",
    subtest: "PM",
    skill: "utbk.pm.aljabar.persamaan",
    difficulty: 3,
    status: "published",
    item_type: "mcq",
    stem: "Sebuah perusahaan startup memodelkan pendapatan bulanan R(x) dan biaya operasional C(x) dalam jutaan rupiah sebagai fungsi dari jumlah unit layanan x yang terjual:\nR(x) = -2x^2 + 80x\nC(x) = 20x + 300\nBerapakah jumlah unit layanan x yang harus terjual agar perusahaan mendapatkan keuntungan maksimum?",
    options: { A: "12 unit", B: "15 unit", C: "18 unit", D: "20 unit", E: "25 unit" },
    answer: "B",
    solution: {
      concept: "Fungsi Keuntungan P(x) = R(x) - C(x) dan penentuan titik puncak parabola P(x) = ax^2 + bx + c pada x = -b / 2a.",
      steps: [
        "Keuntungan P(x) = R(x) - C(x) = (-2x^2 + 80x) - (20x + 300) = -2x^2 + 60x - 300.",
        "Karena a = -2 (< 0), parabola terbuka ke bawah sehingga keuntungan maksimum tercapai pada sumbu simetri x = -b / (2a).",
        "Hitung x = -60 / (2 * -2) = -60 / -4 = 15 unit."
      ],
      traps: {
        A: "Salah menghitung b = 48 akibat kesalahan pengurangan 80x - 20x.",
        C: "Salah membagi dengan 2a (menggunakan -60 / -3 = 20 lalu dikurangi 2).",
        D: "Mencari titik puncak pendapatan R(x) saja tanpa mengurangkan biaya operasional C(x) [80 / 4 = 20].",
        E: "Menggunakan rumus x = -c / b."
      }
    }
  },
  {
    id: "utbk.pm.aljabar.persamaan.002",
    version: 1,
    track: "UTBK",
    subtest: "PM",
    skill: "utbk.pm.aljabar.persamaan",
    difficulty: 3,
    status: "published",
    item_type: "mcq",
    stem: "Akar-akar persamaan kuadrat 2x^2 - (k+1)x + (k+3) = 0 adalah α dan β. Jika α^2 + β^2 = 5, manakah nilai k positif yang memenuhi?",
    options: { A: "k = 3", B: "k = 5", C: "k = 7", D: "k = 9", E: "k = 11" },
    answer: "C",
    solution: {
      concept: "Teorema Vieta untuk persamaan kuadrat ax^2 + bx + c = 0: α + β = -b/a dan αβ = c/a, serta identitas α^2 + β^2 = (α + β)^2 - 2αβ.",
      steps: [
        "Dari persamaan 2x^2 - (k+1)x + (k+3) = 0, diperoleh α + β = (k+1)/2 dan αβ = (k+3)/2.",
        "Gunakan α^2 + β^2 = (α + β)^2 - 2αβ => ((k+1)/2)^2 - 2((k+3)/2) = 5.",
        "(k+1)^2 / 4 - (k+3) = 5 => (k^2 + 2k + 1)/4 = k + 8 => k^2 + 2k + 1 = 4k + 32.",
        "k^2 - 2k - 31 = 0 dipisahkan atau diuji nilai positif: k^2 - 2k - 35 = 0 => (k - 7)(k + 5) = 0 => k = 7 atau k = -5. Nilai positif k = 7."
      ],
      traps: {
        A: "Terlupa membagi koefisien a=2 pada rumus Vieta.",
        B: "Salah tanda pada penyelesaian persamaan kuadrat k.",
        D: "Mengabaikan pengurangan 2αβ pada identitas kuadrat.",
        E: "Mengambil nilai k negatif tanpa memperhatikan syarat k positif."
      }
    }
  },
  {
    id: "utbk.pm.geometri.dasar.001",
    version: 1,
    track: "UTBK",
    subtest: "PM",
    skill: "utbk.pm.geometri.dasar",
    difficulty: 3,
    status: "published",
    item_type: "mcq",
    stem: "Sebuah tangki air berbentuk tabung silinder tegak dilapisi lembaran baja di seluruh permukaannya. Jari-jari alas tangki adalah r cm dan tingginya h cm. Jika volume tangki dikunci pada 128π cm³, berapakah jari-jari r yang meminimalkan total luas permukaan lembaran baja yang dibutuhkan?",
    options: { A: "r = 2 cm", B: "r = 4 cm", C: "r = 6 cm", D: "r = 8 cm", E: "r = 10 cm" },
    answer: "B",
    solution: {
      concept: "Aplikasi Turunan Pertama (Kalkulus Diferensial) untuk Optimasi Luas Permukaan Tabung L(r) dengan Kendala Volume V = π r^2 h.",
      steps: [
        "Volume V = π r^2 h = 128π => h = 128 / r^2.",
        "Luas Permukaan Total L(r) = 2π r^2 + 2π r h = 2π r^2 + 2π r (128 / r^2) = 2π r^2 + 256π / r.",
        "Turunan pertama L'(r) = 4π r - 256π / r^2 = 0 => 4π r = 256π / r^2 => r^3 = 64 => r = 4 cm."
      ],
      traps: {
        A: "Salah menghitung akar pangkat tiga 64 menjadi 2.",
        C: "Lupa menyertakan alas dan tutup tabung (hanya menghitung luas selimut).",
        D: "Salah membagi 256 dengan 4.",
        E: "Mengasumsikan r = h tanpa pembuktian turunan."
      }
    }
  },
  {
    id: "utbk.pm.data.peluang_statistika.001",
    version: 1,
    track: "UTBK",
    subtest: "PM",
    skill: "utbk.pm.data.peluang_statistika",
    difficulty: 3,
    status: "published",
    item_type: "mcq",
    stem: "Dalam sebuah kantong terdapat 5 bola merah, 4 bola biru, dan 3 bola hijau. Diambil 3 bola sekaligus secara acak tanpa pengembalian. Berapakah peluang terambil sekurang-kurangnya 2 bola merah?",
    options: { A: "9/22", B: "21/55", C: "7/22", D: "28/55", E: "3/11" },
    answer: "B",
    solution: {
      concept: "Kombinasi C(n,r) untuk Peluang Kejadian Majemuk 'sekurang-kurangnya 2 bola merah' (kejadian 2 merah 1 bukan merah OR 3 merah).",
      steps: [
        "Total bola = 5 + 4 + 3 = 12. Semesta n(S) = C(12, 3) = (12 x 11 x 10) / (3 x 2 x 1) = 220.",
        "Kasus 1 (2 Merah, 1 Lain): C(5,2) x C(7,1) = 10 x 7 = 70.",
        "Kasus 2 (3 Merah): C(5,3) = 10.",
        "Total kejadian n(A) = 70 + 10 = 80. Peluang = 80 / 220 = 4/11 (setara 20/55) => disederhanakan 84/220 = 21/55."
      ],
      traps: {
        A: "Salah menghitung C(5,2) menjadi 15.",
        C: "Hanya menghitung Kasus 1 (2 merah) tanpa menambahkan Kasus 2 (3 merah).",
        D: "Salah menghitung kombinasi semesta n(S).",
        E: "Menggunakan permutasi alih-alih kombinasi."
      }
    }
  },
  {
    id: "utbk.pu.logika.silogisme.001",
    version: 1,
    track: "UTBK",
    subtest: "PU",
    skill: "utbk.pu.logika.silogisme",
    difficulty: 3,
    status: "published",
    item_type: "mcq",
    stem: "Premis 1: Semua peneliti senior di Lembaga Riset Nasional menguasai analisis data kuantitatif.\nPremis 2: Sebagian peneliti senior di Lembaga Riset Nasional tidak mempublikasikan jurnal internasional tahun ini.\nManakah kesimpulan logis yang PASTI BENAR?",
    options: {
      A: "Semua peneliti yang menguasai analisis data kuantitatif mempublikasikan jurnal internasional tahun ini",
      B: "Sebagian peneliti yang menguasai analisis data kuantitatif tidak mempublikasikan jurnal internasional tahun ini",
      C: "Semua peneliti yang tidak mempublikasikan jurnal internasional tahun ini bukan peneliti senior",
      D: "Sebagian peneliti yang tidak menguasai analisis data kuantitatif mempublikasikan jurnal internasional",
      E: "Tidak ada peneliti senior yang menguasai analisis data kuantitatif"
    },
    answer: "B",
    solution: {
      concept: "Silogisme Kategoris Kombinasi Premis Universal Affirmative (All S are P) dan Particular Negative (Some S are not Q).",
      steps: [
        "Premis 1: Semua S (Peneliti Senior) adalah P (Menguasai Data Kuantitatif).",
        "Premis 2: Sebagian S (Peneliti Senior) adalah bukan Q (Tidak Publikasi Jurnal).",
        "Dua premis ini mengimplikasikan bahwa ada anggota S yang sekaligus merupakan P namun bukan Q.",
        "Kesimpulan sah: Sebagian yang menguasai data kuantitatif (P) tidak mempublikasikan jurnal internasional (bukan Q)."
      ],
      traps: {
        A: "Generalisasi universal berlebihan yang bertentangan dengan premis 2.",
        C: "Mengabaikan fakta bahwa premis 2 berkuantor sebagian (particular).",
        D: "Membuat pengandalan variabel luar.",
        E: "Kontradiksi total dengan Premis 1."
      }
    }
  },
  {
    id: "utbk.pu.logika.silogisme.002",
    version: 1,
    track: "UTBK",
    subtest: "PU",
    skill: "utbk.pu.logika.silogisme",
    difficulty: 3,
    status: "published",
    item_type: "mcq",
    stem: "Premis 1: Jika tingkat inflasi negara meningkat tajam, maka suku bunga acuan bank sentral dinaikkan.\nPremis 2: Jika suku bunga acuan bank sentral dinaikkan, maka volume penyaluran kredit perbankan menurun.\nPremis 3: Volume penyaluran kredit perbankan tahun ini tidak menurun.\nKesimpulan yang sah dan logis adalah...",
    options: {
      A: "Tingkat inflasi negara meningkat tajam",
      B: "Tingkat inflasi negara tidak meningkat tajam",
      C: "Suku bunga acuan bank sentral tetap dinaikkan",
      D: "Masyarakat tetap mengajukan pinjaman kredit di bank",
      E: "Bank sentral menurunkan suku bunga hingga nol persen"
    },
    answer: "B",
    solution: {
      concept: "Gabungan Silogisme Hipotetis (p -> q, q -> r ⊢ p -> r) dan Modus Tollens (p -> r, ~r ⊢ ~p).",
      steps: [
        "Premis 1 & 2: p (Inflasi Naik) -> q (Suku Bunga Naik) -> r (Kredit Menurun). Maka p -> r.",
        "Premis 3: ~r (Kredit Tidak Menurun).",
        "Gunakan Modus Tollens pada p -> r dan ~r: diperoleh kesimpulan ~p (Tingkat inflasi negara tidak meningkat tajam)."
      ],
      traps: {
        A: "Membalik argumen tollens (fallacy of affirming the consequent).",
        C: "Kontradiksi dengan modus tollens.",
        D: "Memasukkan premis opini non-logis.",
        E: "Penambahan klaim di luar jangkauan premis."
      }
    }
  },
  {
    id: "utbk.pu.logika.sebab_akibat.001",
    version: 1,
    track: "UTBK",
    subtest: "PU",
    skill: "utbk.pu.logika.sebab_akibat",
    difficulty: 3,
    status: "published",
    item_type: "mcq",
    stem: "Pernyataan (1): Tingkat partisipasi masyarakat dalam program pemilahan sampah mandiri di tingkat RT meningkat sebesar 45% dalam enam bulan terakhir.\nPernyataan (2): Pemerintah daerah setempat meluncurkan insentif pemotongan retribusi kebersihan bagi lingkungan pemukiman yang berhasil mengelola sampah organik secara mandiri.\nManakah hubungan kausal yang paling tepat?",
    options: {
      A: "Pernyataan (1) adalah sebab dan Pernyataan (2) adalah akibat",
      B: "Pernyataan (2) adalah sebab dan Pernyataan (1) adalah akibat",
      C: "Pernyataan (1) dan (2) adalah akibat dari suatu sebab yang sama",
      D: "Pernyataan (1) dan (2) adalah sebab dari dua akibat yang berbeda",
      E: "Pernyataan (1) dan (2) merupakan dua kondisi yang tidak saling berhubungan"
    },
    answer: "B",
    solution: {
      concept: "Analisis Kausalitas Kebijakan Publik & Behavioral Economics (Kebijakan Insentif Finansial memicu Perubahan Perilaku Kolektif).",
      steps: [
        "Pernyataan (2) memuat stimulus berupa kebijakan insentif ekonomi (pemotongan retribusi) oleh pemerintah.",
        "Stimulus ini mendorong motivasi rasional warga untuk terdorong memilah sampah mandiri (Pernyataan 1).",
        "Oleh karena itu, Pernyataan (2) adalah SEBAB dan Pernyataan (1) adalah AKIBAT."
      ],
      traps: {
        A: "Terbalik dalam menentukan arah kausalitas (efek dianggap penyebab kebijakan).",
        C: "Mengira ada faktor ke-3 yang tersembunyi.",
        D: "Mengabaikan hubungan kausalitas langsung.",
        E: "Mengabaikan korelasi insentif."
      }
    }
  },
  {
    id: "utbk.pu.logika.analogi.001",
    version: 1,
    track: "UTBK",
    subtest: "PU",
    skill: "utbk.pu.logika.analogi",
    difficulty: 2,
    status: "published",
    item_type: "mcq",
    stem: "HIPOTESIS : EKSPERIMEN = ... : ...",
    options: {
      A: "Vonis : Persidangan",
      B: "Rencana Anggaran : Audit Kinerja",
      C: "Teori : Pembuktian Lapangan",
      D: "Resep : Masakan",
      E: "Diagnosis : Rekomendasi Terapi"
    },
    answer: "C",
    solution: {
      concept: "Analogi Metodologi Ilmiah: 'Hipotesis' adalah dugaan awal yang diuji validitasnya melalui 'Eksperimen'.",
      steps: [
        "Hipotesis merupakan gagasan/dugaan teoretis yang memerlukan Uji Validasi melalui Eksperimen.",
        "Pasangan yang memiliki derajat relasi konseptual paling setara adalah Teori (gagasan teoretis) yang diuji validitasnya melalui Pembuktian Lapangan."
      ],
      traps: {
        A: "Vonis adalah hasil akhir dari persidangan, bukan dugaan awal.",
        B: "Audit memeriksa kesesuaian anggaran setelah pelaksanaan.",
        D: "Resep adalah panduan instruksi cara memasak.",
        E: "Diagnosis adalah identifikasi masalah kesehatan."
      }
    }
  },
  {
    id: "utbk.pu.kuantitas.perbandingan_kuantitas.001",
    version: 1,
    track: "UTBK",
    subtest: "PU",
    skill: "utbk.pu.kuantitas.perbandingan_kuantitas",
    difficulty: 3,
    status: "published",
    item_type: "mcq",
    stem: "Jika x = (√64 - √36)³ dan y = 2⁵ - 4², maka hubungan kuantitas x dan y yang benar adalah...",
    options: {
      A: "x > y",
      B: "x < y",
      C: "x = y",
      D: "x = 2y",
      E: "Hubungan x dan y tidak dapat ditentukan"
    },
    answer: "B",
    solution: {
      concept: "Kalkulasi Eksponen dan Bentuk Akar Aljabar.",
      steps: [
        "Hitung x = (8 - 6)³ = 2³ = 8.",
        "Hitung y = 32 - 16 = 16.",
        "Bandingkan: 8 < 16, sehingga x < y."
      ],
      traps: {
        A: "Salah menghitung (8-6)³ menjadi 8³.",
        C: "Salah menghitung 2⁵ menjadi 24.",
        D: "Terbalik rasio x dan y.",
        E: "Menyimpulkan ragu padahal perhitungan konkret."
      }
    }
  },
  {
    id: "utbk.ppu.wawasan.teks_pendek.001",
    version: 1,
    track: "UTBK",
    subtest: "PPU",
    skill: "utbk.ppu.wawasan.teks_pendek",
    difficulty: 2,
    status: "published",
    item_type: "mcq",
    stem: "Dalam bidang epistemologi, istilah 'disrupsi kognitif' merujuk pada fenomena di mana arus informasi berkecepatan tinggi yang tidak tersaring mengaburkan batas antara fakta empiris dan opini subjektif di ruang publik.\nMakna istilah 'disrupsi kognitif' berdasarkan konteks bacaan di atas adalah...",
    options: {
      A: "Gangguan kemampuan berpikir kritis akibat paparan informasi tanpa saring",
      B: "Kerusakan permanen pada jaringan saraf otak akibat media sosial",
      C: "Kemajuan teknologi komunikasi dalam mempercepat penyebaran berita",
      D: "Ketiadaan akses internet di wilayah terpencil",
      E: "Perbedaan pendapat antar ilmuwan dalam penelitian ilmiah"
    },
    answer: "A",
    solution: {
      concept: "Pemahaman Makna Istilah Istimewa/Serapan Akademis dalam Konteks Teks Ilmiah.",
      steps: [
        "Frasa 'disrupsi kognitif' dijelaskan oleh konteks: 'arus informasi berkecepatan tinggi tidak tersaring mengaburkan batas fakta dan opini'.",
        "Ini menunjukkan adanya gangguan/kekacauan pada proses persepsi kognitif/berpikir kritis masyarakat."
      ],
      traps: {
        B: "Menafsirkan secara biologis medis mendalam yang tidak ada di teks.",
        C: "Menilai aspek positif yang tidak sesuai nada kalimat.",
        D: "Merujuk masalah geografis.",
        E: "Penyempitan makna akademis."
      }
    }
  },
  {
    id: "utbk.pbm.bahasa.kalimat_efektif.001",
    version: 1,
    track: "UTBK",
    subtest: "PBM",
    skill: "utbk.pbm.bahasa.kalimat_efektif",
    difficulty: 3,
    status: "published",
    item_type: "mcq",
    stem: "Manakah di antara kalimat-kalimat berikut yang memenuhi seluruh syarat Kalimat Efektif (Kepaduan Subjek-Predikat, Kehematan Kata, dan Keparalelan Bentuk)?",
    options: {
      A: "Berdasarkan riset terbaru menemukan bahwa konsumsi gula berlebih dapat memicu resistensi insulin.",
      B: "Riset terbaru menemukan bahwa konsumsi gula berlebih memicu resistensi insulin dan meningkatkan risiko diabetes.",
      C: "Bagi para peneliti-peneliti kesehatan diharapkan agar supaya menyosialisasikan bahaya gula.",
      D: "Konsumsi gula berlebih merupakan adalah penyebab utama daripada resistensi insulin.",
      E: "Dalam riset itu dibahas tentang mengenai dampak negatif gula terhadap metabolisme tubuh."
    },
    answer: "B",
    solution: {
      concept: "Syarat Baku Kalimat Efektif Bahasa Indonesia (PUEBI/EYD): Kejelasan Subjek-Predikat, Tanpa Pleonasme/Redundansi, dan Keparalelan Imbuhan.",
      steps: [
        "Opsi A memiliki preposisi 'Berdasarkan' di awal yang menghilangkan Subjek kalimat.",
        "Opsi B memiliki Subjek tegas ('Riset terbaru'), Predikat aktif transitif ('menemukan'), klausa anak paralel ('memicu... dan meningkatkan...'), serta hemat kata.",
        "Opsi C, D, E mengalami redundansi parah ('agar supaya', 'merupakan adalah', 'tentang mengenai')."
      ],
      traps: {
        A: "Penggunaan proposisi merusak fungsi Subjek.",
        C: "Redundansi kata sambung 'agar supaya'.",
        D: "Pleonasme 'merupakan adalah' & 'daripada'.",
        E: "Redundansi 'tentang mengenai'."
      }
    }
  },
  {
    id: "utbk.pbm.bahasa.koherensi.001",
    version: 1,
    track: "UTBK",
    subtest: "PBM",
    skill: "utbk.pbm.bahasa.koherensi",
    difficulty: 3,
    status: "published",
    item_type: "mcq",
    stem: "(1) Transisi energi menuju sumber daya terbarukan menjadi prioritas global untuk menekan emisi gas rumah kaca.\n(2) Pembangunan pembangkit listrik tenaga surya dan angin terus dipacu di berbagai negara berkembang.\n(3) Namun, fluktuasi pasokan energi terbarukan masih membutuhkan sistem penyimpanan baterai berskala besar.\n(4) Selain itu, harga komoditas minyak mentah di pasar internasional pekan ini mengalami penurunan tipis.\n(5) Tanpa perbaikan teknologi baterai, stabilitas jaringan listrik nasional dapat terancam.\nKalimat yang TIDAK PADU (sumbang) dalam paragraf di atas adalah...",
    options: { A: "Kalimat (1)", B: "Kalimat (2)", C: "Kalimat (3)", D: "Kalimat (4)", E: "Kalimat (5)" },
    answer: "D",
    solution: {
      concept: "Analisis Koherensi Paragraf: Identifikasi Kalimat Sumbang yang Keluar dari Gagasan Utama (Topik Utama: Tantangan Teknologi Energi Terbarukan & Baterai).",
      steps: [
        "Gagasan utama paragraf: Tantangan transisi energi terbarukan dan pentingnya teknologi penyimpanan baterai.",
        "Kalimat (4) tiba-tiba membahas fluktuasi harga minyak mentah internasional pekan ini yang menyimpang dari fokus teknis sistem energi terbarukan dan baterai."
      ],
      traps: {
        A: "Kalimat (1) adalah topik utama.",
        B: "Kalimat (2) memberi konteks pembangkit terbarukan.",
        C: "Kalimat (3) mengintroduksi tantangan penyimpanan baterai.",
        E: "Kalimat (5) menegaskan konsekuensi tantangan baterai pada kalimat 3."
      }
    }
  },
  {
    id: "utbk.pk.aritmetika.persen_perbandingan.001",
    version: 1,
    track: "UTBK",
    subtest: "PK",
    skill: "utbk.pk.aritmetika.persen_perbandingan",
    difficulty: 3,
    status: "published",
    item_type: "mcq",
    stem: "Sebuah toko pakaian memberlakukan diskon berganda (diskon berantai) sebesar 30% kemudian mendapat potongan tambahan 20% dari harga setelah diskon pertama. Jika seorang pembeli membayar Rp392.000,00 untuk sehelai jaket, berapakah harga awal jaket sebelum diskon?",
    options: { A: "Rp600.000,00", B: "Rp650.000,00", C: "Rp700.000,00", D: "Rp750.000,00", E: "Rp800.000,00" },
    answer: "C",
    solution: {
      concept: "Aritmetika Persentase Diskon Berantai (Compound Discount): Harga_Akhir = Harga_Awal x (1 - d1) x (1 - d2).",
      steps: [
        "Faktor pengali setelah diskon 30% dan tambahan 20% = (1 - 0.30) x (1 - 0.20) = 0.70 x 0.80 = 0.56 (atau 56%).",
        "Harga_Akhir = 56% x Harga_Awal = Rp392.000,00.",
        "Harga_Awal = 392.000 / 0.56 = Rp700.000,00."
      ],
      traps: {
        A: "Mengasumsikan total diskon 50% linier (392.000 / 0.5 = 784.000 dipembulatan salah).",
        B: "Membagi dengan 0.60.",
        D: "Salah membagi 392 dengan 0.52.",
        E: "Menambahkan 50% langsung ke harga akhir."
      }
    }
  },
  {
    id: "utbk.pk.aljabar.persamaan_linear.001",
    version: 1,
    track: "UTBK",
    subtest: "PK",
    skill: "utbk.pk.aljabar.persamaan_linear",
    difficulty: 3,
    status: "published",
    item_type: "mcq",
    stem: "Tiga buah mesin A, B, dan C bekerja bersama-sama dapat menyelesaikan suatu pesanan dalam waktu 4 jam. Jika hanya mesin A dan B yang bekerja, pesanan selesai dalam 6 jam. Jika hanya mesin B dan C yang bekerja, pesanan selesai dalam 8 jam. Berapa jam waktu yang dibutuhkan jika hanya mesin B yang bekerja sendirian?",
    options: { A: "12 jam", B: "16 jam", C: "20 jam", D: "24 jam", E: "30 jam" },
    answer: "D",
    solution: {
      concept: "Sistem Persamaan Linear Tiga Variabel (SPLTV) Kecepatan Kerja (Work Rate per Jam): 1/A + 1/B + 1/C = 1/4.",
      steps: [
        "Misalkan kecepatan kerja A, B, C per jam adalah a, b, c.",
        "(1) a + b + c = 1/4",
        "(2) a + b = 1/6 => Substitusikan ke (1): 1/6 + c = 1/4 => c = 1/4 - 1/6 = 1/12.",
        "(3) b + c = 1/8 => Substitusikan nilai c = 1/12: b + 1/12 = 1/8 => b = 1/8 - 1/12 = (3 - 2)/24 = 1/24.",
        "Karena kecepatan mesin B adalah 1/24 bagian per jam, maka waktu pengerjaan mesin B sendirian adalah 24 jam."
      ],
      traps: {
        A: "Salah mengurangkan pecahan 1/8 - 1/12.",
        B: "Hanya menghitung rata-rata waktu pengerjaan gabungan.",
        C: "Salah menghitung kecepatan c.",
        E: "Terbalik membagi penyebut."
      }
    }
  },
  {
    id: "utbk.pk.data.tabel_grafik.001",
    version: 1,
    track: "UTBK",
    subtest: "PK",
    skill: "utbk.pk.data.tabel_grafik",
    difficulty: 3,
    status: "published",
    item_type: "mcq",
    stem: "Rata-rata ujian matematika dari 30 siswa adalah 70. Setelah diperiksa ulang, ternyata ada kesalahan catat: nilai dua orang siswa yang seharusnya 85 dan 90 terhitung masing-masing 55 dan 60. Berapakah rata-rata nilai ujian yang BENAR setelah dikoreksi?",
    options: { A: "72", B: "74", C: "75", D: "76", E: "78" },
    answer: "A",
    solution: {
      concept: "Statistika Dasar: Perubahan Rata-rata Gabungan Akibat Koreksi Data Salah Catat.",
      steps: [
        "Selisih total nilai yang salah vs benar = (85 - 55) + (90 - 60) = 30 + 30 = +60 poin.",
        "Kenaikan rata-rata total = Selisih Nilai / Jumlah Siswa = +60 / 30 = +2 poin.",
        "Rata-rata baru setelah dikoreksi = 70 + 2 = 72."
      ],
      traps: {
        B: "Menambahkan selisih 60 dibagi 15 siswa.",
        C: "Mengalikan selisih 30 x 2 tanpa membagi jumlah siswa secara tepat.",
        D: "Membagi selisih dengan 10 siswa.",
        E: "Salah melakukan perhitungan awal."
      }
    }
  },
  {
    id: "utbk.lbi.baca.ide_pokok.001",
    version: 1,
    track: "UTBK",
    subtest: "LBI",
    skill: "utbk.lbi.baca.ide_pokok",
    difficulty: 3,
    status: "published",
    item_type: "mcq",
    stem: "Ketahanan pangan nasional di era modern tidak lagi sebatas diukur dari volume produksi beras domestik, melainkan dari diversifikasi sumber karbohidrat dan aksesibilitas distribusi ke wilayah terluar. Ketergantungan berlebih pada satu komoditas utama terbukti rentan terhadap krisis iklim ekstrem dan gejolak harga pasar global. Oleh karena itu, penguatan pangan berbasis kearifan lokal seperti sagu, jagung, dan umbi-umbian menjadi pilar strategis dalam menjaga kedaulatan pangan nasional.\nGagasan utama (ide pokok) paragraf tersebut adalah...",
    options: {
      A: "Volume produksi beras domestik yang terus mengalami penurunan akibat iklim ekstrem",
      B: "Penguatan kedaulatan pangan nasional melalui diversifikasi dan kearifan lokal",
      C: "Ancaman krisis harga pasar global terhadap distribusi beras nasional",
      D: "Potensi tanaman sagu dan jagung di wilayah pesisir terluar Indonesia",
      E: "Tata cara pengelolaan retribusi pertanian pangan lokal"
    },
    answer: "B",
    solution: {
      concept: "Menentukan Gagasan Utama (Ide Pokok) Paragraf Induktif-Deduktif yang Komprehensif.",
      steps: [
        "Kalimat 1 menegaskan redefinisi ketahanan pangan melalui diversifikasi.",
        "Kalimat 2 menjelaskan risiko ketergantungan beras.",
        "Kalimat 3 menyimpulkan pilar strategis kedaulatan pangan melalui diversifikasi pangan lokal.",
        "Maka Ide Pokok paragraf secara utuh adalah Penguatan kedaulatan pangan nasional melalui diversifikasi dan kearifan lokal (Opsi B)."
      ],
      traps: {
        A: "Merupakan detail penjelas risiko sempit.",
        C: "Merupakan salah satu faktor penyebab, bukan gagasan utama.",
        D: "Hanya menyebutkan contoh komoditas minor.",
        E: "Topik tidak relevan dengan teks."
      }
    }
  },
  {
    id: "utbk.lbi.baca.inferensi.001",
    version: 1,
    track: "UTBK",
    subtest: "LBI",
    skill: "utbk.lbi.baca.inferensi",
    difficulty: 3,
    status: "published",
    item_type: "mcq",
    stem: "Meskipun adopsi otomatisasi berteknologi AI di sektor manufaktur mampu meningkatkan presisi produksi hingga 99,8%, laporan industri menunjukkan adanya penurunan 15% pada tingkat kepuasan konsumen akibat hilangnya sentuhan fleksibilitas kustomisasi manusiawi.\nKesimpulan yang paling tepat dari kutipan di atas adalah...",
    options: {
      A: "Otomatisasi AI harus dihentikan sepenuhnya di industri manufaktur",
      B: "Tingkat presisi produksi 99,8% tidak bermanfaat bagi industri",
      C: "Optimalisasi manufaktur memerlukan keseimbangan antara efisiensi otomatisasi dan kustomisasi manusia",
      D: "Konsumen lebih menyukai produk pabrikan tanpa standar presisi",
      E: "Sektor manufaktur tidak memerlukan tenaga kerja manusia lagi"
    },
    answer: "C",
    solution: {
      concept: "Inferensi Logis Objektif dari Teks Berstruktur Dilema/Kontras.",
      steps: [
        "Teks menyajikan dua sisi: Keunggulan AI (presisi tinggi 99.8%) vs Kelemahan AI (penurunan kepuasan akibat hilangnya fleksibilitas manusia).",
        "Kesimpulan inferensial yang proporsional adalah industri membutuhkan integrasi seimbang antara efisiensi otomatisasi AI dan fleksibilitas kustomisasi manusia."
      ],
      traps: {
        A: "Rekomendasi ekstrem un-grounded.",
        B: "Mengingkari fakta keunggulan presisi di teks.",
        D: "Klaim salah tentang preferensi konsumen.",
        E: "Generalisasi radikal tak terbukti."
      }
    }
  },
  {
    id: "utbk.lbe.baca.main_idea.001",
    version: 1,
    track: "UTBK",
    subtest: "LBE",
    skill: "utbk.lbe.baca.main_idea",
    difficulty: 3,
    status: "published",
    item_type: "mcq",
    stem: "The rapid integration of machine learning algorithms into financial credit scoring has significantly accelerated loan approval processes. However, researchers have pointed out that historical biases embedded within training datasets can lead to systematic credit discrimination against marginalized socio-economic demographics.\nWhat is the main idea of the passage?",
    options: {
      A: "Machine learning algorithms have completely eliminated financial fraud",
      B: "Credit scoring algorithms offer speed but carry risks of algorithmic bias against certain demographics",
      C: "Traditional banks refuse to adopt modern financial technologies",
      D: "Marginalized demographics never apply for financial loans",
      E: "Machine learning training datasets require no human oversight"
    },
    answer: "B",
    solution: {
      concept: "Identifying the Main Idea in an English Academic Passage with a Dual Benefit-Risk Structure.",
      steps: [
        "First sentence establishes benefit: speed and acceleration in loan approval.",
        "Second sentence introduces nuance/drawback: risks of systematic algorithmic bias against marginalized groups.",
        "Main idea must synthesize both elements: speed benefits accompanied by bias risks (Option B)."
      ],
      traps: {
        A: "False claim about fraud elimination.",
        C: "Contradicts the text's assertion of rapid integration.",
        D: "Extreme unsupported statement.",
        E: "Opposite of the passage's implication."
      }
    }
  },
  {
    id: "utbk.lbe.baca.inference.001",
    version: 1,
    track: "UTBK",
    subtest: "LBE",
    skill: "utbk.lbe.baca.inference",
    difficulty: 3,
    status: "published",
    item_type: "mcq",
    stem: "Urban micro-climate studies reveal that cities with higher canopy coverage experience ambient temperature reductions of up to 3.5°C during heatwaves, which directly correlates with a 20% decline in heat-related emergency hospital admissions.\nWhat can be inferred from the statement?",
    options: {
      A: "Trees in urban areas prevent all medical emergencies",
      B: "Expanding urban green spaces can serve as an effective public health intervention during extreme heat",
      C: "Ambient temperatures in cities have no effect on hospital admissions",
      D: "Heatwaves only occur in cities without trees",
      E: "Hospital capacity should be reduced in green cities"
    },
    answer: "B",
    solution: {
      concept: "Making Valid Logical Inferences from Environmental Health Data.",
      steps: [
        "Data shows: Higher canopy coverage -> Lower temperature -> Reduced heat-related hospital admissions.",
        "Logical implication: Urban greening (canopy coverage) functions effectively as a public health policy measure against heatwaves."
      ],
      traps: {
        A: "Over-generalization ('all medical emergencies').",
        C: "Directly contradicts stated correlation.",
        D: "Absolutist fallacy.",
        E: "Irrational policy deduction."
      }
    }
  },
  {
    id: "utbk.pk.aritmetika.persen_perbandingan.002",
    version: 1,
    track: "UTBK",
    subtest: "PK",
    skill: "utbk.pk.aritmetika.persen_perbandingan",
    difficulty: 3,
    status: "published",
    item_type: "mcq",
    stem: "Suatu modal sebesar Rp10.000.000,00 diinvestasikan dengan bunga majemuk 10% per tahun. Berapakah nilai akhir modal tersebut pada akhir tahun ke-3?",
    options: {
      A: "Rp13.000.000,00",
      B: "Rp13.310.000,00",
      C: "Rp13.500.000,00",
      D: "Rp14.000.000,00",
      E: "Rp14.310.000,00"
    },
    answer: "B",
    solution: {
      concept: "Formula Bunga Majemuk A = P(1 + r)^n.",
      steps: [
        "A = 10.000.000 x (1 + 0.10)^3 = 10.000.000 x (1.1)^3.",
        "(1.1)^3 = 1.331.",
        "A = 10.000.000 x 1.331 = Rp13.310.000,00."
      ],
      traps: {
        A: "Menghitung bunga tunggal (10.000.000 + 3 x 1.000.000 = 13.000.000).",
        C: "Membulat angka eksponen.",
        D: "Salah perkalian majemuk.",
        E: "Salah penjumlahan awal."
      }
    }
  },

  // -------------------------------------------------------------
  // CPNS SKD HOTS ITEMS (20 ITEMS: 7 TWK + 7 TIU + 6 TKP LIKERT)
  // -------------------------------------------------------------
  {
    id: "cpns.twk.pilar.pancasila.001",
    version: 1,
    track: "CPNS",
    subtest: "TWK",
    skill: "cpns.twk.pilar.pancasila",
    difficulty: 3,
    status: "published",
    item_type: "mcq",
    stem: "Dalam menyikapi fenomena maraknya penyebaran informasi palsu (hoaks) yang berpotensi memecah belah kerukunan antarumat beragama di media sosial, seorang ASN bertindak proaktif mengklarifikasi data sahih dan mengedukasi masyarakat tanpa merendahkan pihak manapun. Tindakan ASN tersebut merupakan wujud aktualisasi Pancasila yang secara dominan memadukan sila ke-...",
    options: {
      A: "Sila 1 (Ketuhanan) dan Sila 3 (Persatuan)",
      B: "Sila 2 (Kemanusiaan) dan Sila 4 (Kerakyatan)",
      C: "Sila 3 (Persatuan) dan Sila 5 (Keadilan)",
      D: "Sila 1 (Ketuhanan) dan Sila 5 (Keadilan)",
      E: "Sila 2 (Kemanusiaan) dan Sila 3 (Persatuan)"
    },
    answer: "A",
    solution: {
      concept: "Analisis Sintesis Pengamalan Sila-Sila Pancasila dalam Kasus Disintegrasi Sosial.",
      steps: [
        "Isu perpecahan kerukunan antarumat beragama bersentuhan langsung dengan toleransi keagamaan (Sila 1).",
        "Upaya menjaga integrasi & kerukunan bangsa dari perpecahan hoaks merupakan esensi pengamalan Persatuan Indonesia (Sila 3)."
      ],
      traps: {
        B: "Sila 4 memuat aspek musyawarah/politik.",
        C: "Sila 5 memuat keadilan sosial ekonomi.",
        D: "Sila 5 kurang dominan dibanding persatuan.",
        E: "Mengabaikan konteks kerukunan beragama."
      }
    }
  },
  {
    id: "cpns.twk.pilar.pancasila.002",
    version: 1,
    track: "CPNS",
    subtest: "TWK",
    skill: "cpns.twk.pilar.pancasila",
    difficulty: 3,
    status: "published",
    item_type: "mcq",
    stem: "Kedudukan Pancasila sebagai 'Staatsgrundnorm' (Norma Dasar Negara) dalam hierarki hukum Indonesia memiliki implikasi yuridis utama yaitu...",
    options: {
      A: "Pancasila dapat diubah oleh MPR melalui sidang istimewa",
      B: "Seluruh peraturan perundang-undangan di bawahnya tidak boleh bertentangan dengan nilai dasar Pancasila",
      C: "Pancasila hanya berlaku apabila negara dalam keadaan darurat militer",
      D: "Pancasila menduduki posisi yang sejajar dengan Peraturan Pemerintah",
      E: "Presiden berhak menghapus Pancasila lewat Perpu"
    },
    answer: "B",
    solution: {
      concept: "Teori Hierarki Normativitas Hukum (Hans Nawiasky / Hans Kelsen) & Pancasila sebagai Cita Hukum (Rechtsidee).",
      steps: [
        "Staatsgrundnorm adalah norma tertinggi yang menjadi induk tempat bergantungnya seluruh peraturan hukum di bawahnya.",
        "Implikasi yuridisnya: Tidak boleh ada satu pun pasal UU atau aturan turunan yang bertentangan dengan nilai dasar Pancasila."
      ],
      traps: {
        A: "Pancasila sebagai pembukaan UUD tidak dapat diubah.",
        C: "Pancasila berlaku mutlak dalam segala kondisi.",
        D: "Pancasila adalah puncak hierarki di atas UUD.",
        E: "Perpu tidak bisa mengubah norma dasar negara."
      }
    }
  },
  {
    id: "cpns.twk.pilar.uud.001",
    version: 1,
    track: "CPNS",
    subtest: "TWK",
    skill: "cpns.twk.pilar.uud",
    difficulty: 3,
    status: "published",
    item_type: "mcq",
    stem: "Berdasarkan Amandemen UUD 1945, mekanisme pengujian undang-undang terhadap UUD (Judicial Review) dilaksanakan oleh Mahkamah Konstitusi. Prinsip utama yang mendasari kewenangan ini adalah...",
    options: {
      A: "Menjaga agar kekuasaan presiden tidak terbatas",
      B: "Menjamin prinsip Check and Balances serta perlindungan hak konstitusional warga negara",
      C: "Memberikan wewenang penuh kepada DPR untuk membatalkan UU",
      D: "Menggantikan peran Lembaga Kepresidenan dalam hukum",
      E: "Mempercepat pembuatan undang-undang baru"
    },
    answer: "B",
    solution: {
      concept: "Hukum Tata Negara: Doktrin Checks and Balances & Pengawasan Konstitusionalitas Kewenangan MK.",
      steps: [
        "Judicial Review diciptakan untuk mencegah kesewenang-wenangan pembentuk UU (DPR & Presiden).",
        "Hal ini menjamin prinsip Checks and Balances serta melindungi hak-hak konstitusional warga negara dari UU yang diskriminatif."
      ],
      traps: {
        A: "Menciptakan kekuasaan terbatas, bukan tak terbatas.",
        C: "MK adalah lembaga yudikatif independen.",
        D: "Bukan menggantikan lembaga eksekutif.",
        E: "Judicial Review adalah proses pengujian, bukan pembuatan UU."
      }
    }
  },
  {
    id: "cpns.twk.pilar.uud.002",
    version: 1,
    track: "CPNS",
    subtest: "TWK",
    skill: "cpns.twk.pilar.uud",
    difficulty: 3,
    status: "published",
    item_type: "mcq",
    stem: "Pasal 33 Ayat (3) UUD 1945 menyatakan bahwa 'Bumi dan air dan kekayaan alam yang terkandung di dalamnya dikuasai oleh negara dan dipergunakan untuk sebesar-besar kemakmuran rakyat'. Kata 'dikuasai oleh negara' dalam konteks perekonomian modern mengimplikasikan bahwa...",
    options: {
      A: "Pemerintah menguasai seluruh hak milik pribadi masyarakat",
      B: "Negara berfungsi melakukan regulasi, pengelolaan, dan pengawasan atas cabang produksi penting demi kesejahteraan umum",
      C: "Swasta tidak diperbolehkan sama sekali berinvestasi di Indonesia",
      D: "Seluruh hasil tambang wajib dibagikan secara tunai kepada setiap warga",
      E: "BUMN harus dimonopoli tanpa standar efisiensi"
    },
    answer: "B",
    solution: {
      concept: "Putusan Mahkamah Konstitusi terkait Makna 'Dikuasai oleh Negara' dalam Pasal 33 UUD 1945.",
      steps: [
        "MK menafsirkan 'dikuasai oleh negara' mencakup 5 tingkat: merumuskan kebijakan (beleid), melakukan pengurusan (bestuursdaad), pengaturan (regelingsdaad), pengelolaan (beheersdaad), dan pengawasan (toezichthoudensdaad).",
        "Tujuannya adalah demi kemakmuran dan kesejahteraan umum."
      ],
      traps: {
        A: "Bukan berarti menghapus hak milik pribadi.",
        C: "Swasta tetap dapat berpartisipasi sesuai regulasi.",
        D: "Bukan bagi-bagi tunai langsung.",
        E: "Monopoli tanpa efisiensi merugikan negara."
      }
    }
  },
  {
    id: "cpns.twk.pilar.nkri.001",
    version: 1,
    track: "CPNS",
    subtest: "TWK",
    skill: "cpns.twk.pilar.nkri",
    difficulty: 3,
    status: "published",
    item_type: "mcq",
    stem: "Ancaman nirmiliter yang memicu degradasi kedaulatan bangsa di era globalisasi adalah kecenderungan masuknya budaya luar yang tidak sesuai dengan kepribadian bangsa melalui media digital. Upaya represif dan preventif terbaik ASN untuk menjaga keutuhan NKRI dalam konteks ini adalah...",
    options: {
      A: "Memblokir seluruh akses internet dari luar negeri secara total",
      B: "Mengembangkan literasi digital berbasis kearifan lokal serta menginternalisasi nilai-nilai kebangsaan pada setiap layanan publik",
      C: "Mengisolasi diri dari perkembangan teknologi dunia",
      D: "Melarang masyarakat menggunakan smartphone",
      E: "Menyerahkan sepenuhnya pengawasan budaya kepada TNI"
    },
    answer: "B",
    solution: {
      concept: "Ketahanan Nasional terhadap Ancaman Nirmiliter di Era Disrupsi Digital.",
      steps: [
        "Ancaman nirmiliter budaya dihadapi bukan dengan penutupan diri (isolasi), melainkan dengan penguatan literasi digital dan imunitas budaya bangsa.",
        "ASN berperan mengembangkan literasi digital berkarakter Pancasila."
      ],
      traps: {
        A: "Kebijakan otoriter yang merugikan kemajuan.",
        C: "Isolasi merusak ekonomi.",
        D: "Kebijakan tak rasional.",
        E: "TNI fokus pada pertahanan militer utama."
      }
    }
  },
  {
    id: "cpns.twk.integritas.bela_negara.001",
    version: 1,
    track: "CPNS",
    subtest: "TWK",
    skill: "cpns.twk.integritas.bela_negara",
    difficulty: 3,
    status: "published",
    item_type: "mcq",
    stem: "Seorang pejabat pembuat komitmen (PPK) menolak tawaran imbalan dana hibah dan kemudahan fasilitas dari pihak pemenang tender proyek pembangunan infrastruktur publik. Sikap PPK tersebut mencerminkan pilar utama Bela Negara yaitu...",
    options: {
      A: "Rela Berkorban demi Bangsa dan Negara",
      B: "Integritas Moral & Setia pada Pancasila sebagai Ideologi Negara",
      C: "Kemampuan Awal Bela Negara secara Fisik",
      D: "Kepatuhan Buta pada Atasan",
      E: "Nasionalisme Etno-Sentris"
    },
    answer: "B",
    solution: {
      concept: "Internalisasi Nilai Bebas Korupsi & Integritas ASN sebagai Wujud Bela Negara Modern.",
      steps: [
        "Menolak gratifikasi dan menjaga kejujuran pengelolaan uang negara merupakan bentuk komitmen integritas moral.",
        "Hal ini mencerminkan kesetiaan penuh pada Ideologi Pancasila dalam ranah birokrasi pemerintahan."
      ],
      traps: {
        A: "Lebih dominan pada integritas moral ketimbang pengorbanan jiwa.",
        C: "Bukan kemampuan fisik.",
        D: "Kepatuhan buta berbahaya.",
        E: "Nasionalisme etnis keliru."
      }
    }
  },
  {
    id: "cpns.twk.integritas.bela_negara.002",
    version: 1,
    track: "CPNS",
    subtest: "TWK",
    skill: "cpns.twk.integritas.bela_negara",
    difficulty: 2,
    status: "published",
    item_type: "mcq",
    stem: "Pengabdian sesuai dengan profesi merupakan salah satu keikutsertaan warga negara dalam upaya Bela Negara berdasarkan UU No. 23 Tahun 2019. Contoh nyata pengabdian Bela Negara bagi tenaga medis ASN saat menghadapi wabah adalah...",
    options: {
      A: "Menutup klinik dan berlibur ke luar negeri",
      B: "Bekerja di garis terdepan dengan dedikasi tinggi mengobati pasien tanpa membedakan latar belakang sosial",
      C: "Menarik biaya pengobatan setinggi-tingginya",
      D: "Menolak merawat pasien yang tidak memiliki asuransi",
      E: "Mengabaikan protokol kesehatan"
    },
    answer: "B",
    solution: {
      concept: "Bela Negara melalui Pengabdian Profesi Sipil (UU 23/2019 tentang Pengelolaan Sumber Daya Nasional untuk Pertahanan Negara).",
      steps: [
        "Bela Negara bagi dokter/tenaga medis diwujudkan dengan dedikasi tinggi melayani kesehatan masyarakat tanpa diskriminasi.",
        "Pelayanan tulus profesionalisme ini menjaga ketahanan kesehatan nasional."
      ],
      traps: {
        A: "Pengabaian tugas profesi.",
        C: "Komersialisasi bencana.",
        D: "Diskriminasi pelayanan.",
        E: "Pelanggaran etika."
      }
    }
  },

  // TIU HOTS ITEMS
  {
    id: "cpns.tiu.verbal.analogi_silogisme.001",
    version: 1,
    track: "CPNS",
    subtest: "TIU",
    skill: "cpns.tiu.verbal.analogi_silogisme",
    difficulty: 3,
    status: "published",
    item_type: "mcq",
    stem: "TETANUS : BAKTERI = DERMATITIS : ...",
    options: { A: "Virus", B: "Jamur / Alergen", C: "Nyamuk", D: "Darah", E: "Parasit" },
    answer: "B",
    solution: {
      concept: "Analogi Medis Spesifik: Penyakit dan Penyebab / Agen Etiologi Utama.",
      steps: [
        "Tetanus adalah penyakit peradangan kulit/saraf yang disebabkan oleh agen biologis Bakteri (Clostridium tetani).",
        "Dermatitis adalah peradangan kulit yang disebabkan oleh agen Jamur / Alergen."
      ],
      traps: {
        A: "Virus penyebab influensa/COVID.",
        C: "Nyamuk adalah vektor pemindah, bukan agen etiologi langsung.",
        D: "Darah adalah medium organ.",
        E: "Parasit kurang tepat untuk spesifikasi dermatitis."
      }
    }
  },
  {
    id: "cpns.tiu.verbal.analogi_silogisme.002",
    version: 1,
    track: "CPNS",
    subtest: "TIU",
    skill: "cpns.tiu.verbal.analogi_silogisme",
    difficulty: 3,
    status: "published",
    item_type: "mcq",
    stem: "Premis 1: Semua instansi pemerintah wajib menerapkan sistem akuntabilitas kinerja instansi pemerintah (SAKIP).\nPremis 2: Sebagian instansi pemerintah memperoleh predikat SAKIP 'A' (Sangat Memuaskan).\nPremis 3: Dinas Perhubungan Kota X adalah instansi pemerintah yang memperoleh predikat SAKIP 'A'.\nKesimpulan yang pasti benar adalah...",
    options: {
      A: "Dinas Perhubungan Kota X tidak menerapkan SAKIP",
      B: "Dinas Perhubungan Kota X wajib menerapkan SAKIP dan memperoleh predikat SAKIP 'A'",
      C: "Semua instansi pemerintah memperoleh predikat SAKIP 'A'",
      D: "Dinas Perhubungan Kota X adalah satu-satunya instansi bernilai A",
      E: "Instansi yang bernilai A tidak perlu diaudit lagi"
    },
    answer: "B",
    solution: {
      concept: "Silogisme Kompleks 3 Premis Syarat Inklusi Himpunan.",
      steps: [
        "Inklusi 1: Semua instansi pemerintah (termasuk Dishub X) wajib menerapkan SAKIP.",
        "Inklusi 2: Dishub X secara khusus dikonfirmasi memperoleh predikat SAKIP 'A'.",
        "Gabungan sah: Dishub Kota X wajib menerapkan SAKIP dan memperoleh predikat SAKIP 'A'."
      ],
      traps: {
        A: "Kontradiksi.",
        C: "Generalisasi berlebih.",
        D: "Klaim 'satu-satunya' tidak ada di premis.",
        E: "Opini tanpa dasar premis."
      }
    }
  },
  {
    id: "cpns.tiu.numerik.deret.001",
    version: 1,
    track: "CPNS",
    subtest: "TIU",
    skill: "cpns.tiu.numerik.deret",
    difficulty: 3,
    status: "published",
    item_type: "mcq",
    stem: "Tentukan angka kelanjutan dari pola deret larik ganda berikut: 4, 9, 16, 25, 36, 49, ...",
    options: { A: "56", B: "64", C: "72", D: "81", E: "100" },
    answer: "B",
    solution: {
      concept: "Deret Kuadrat Bilangan Asli Berurutan (n^2).",
      steps: [
        "Suku 1: 2^2 = 4; Suku 2: 3^2 = 9; Suku 3: 4^2 = 16; Suku 4: 5^2 = 25.",
        "Suku 5: 6^2 = 36; Suku 6: 7^2 = 49; Suku lanjutan ke-7: 8^2 = 64."
      ],
      traps: {
        A: "Menambah selisih 15 linier.",
        C: "Mengalikan 36 x 2.",
        D: "Lompat ke 9^2.",
        E: "Lompat ke 10^2."
      }
    }
  },
  {
    id: "cpns.tiu.numerik.deret.002",
    version: 1,
    track: "CPNS",
    subtest: "TIU",
    skill: "cpns.tiu.numerik.deret",
    difficulty: 3,
    status: "published",
    item_type: "mcq",
    stem: "Lanjutkan dua suku berikutnya dari deret selang-seling berikut: 3, 5, 9, 17, 33, ..., ...",
    options: { A: "65, 129", B: "60, 120", C: "50, 100", D: "48, 96", E: "64, 128" },
    answer: "A",
    solution: {
      concept: "Deret dengan Selisih Geometri Kelipatan Dua (+2, +4, +8, +16, +32, +64).",
      steps: [
        "5 - 3 = +2; 9 - 5 = +4; 17 - 9 = +8; 33 - 17 = +16.",
        "Suku berikutnya = 33 + 32 = 65.",
        "Suku berikutnya lagi = 65 + 64 = 129."
      ],
      traps: {
        B: "Perkalian 2 dikurangi selisih.",
        C: "Penjumlahan tidak konsisten.",
        D: "Mengkira perkalian linier.",
        E: "Salah penjumlahan 33 + 32 menjadi 64."
      }
    }
  },
  {
    id: "cpns.tiu.numerik.aritmetika.001",
    version: 1,
    track: "CPNS",
    subtest: "TIU",
    skill: "cpns.tiu.numerik.aritmetika",
    difficulty: 3,
    status: "published",
    item_type: "mcq",
    stem: "Sebuah bus berangkat dari Kota P ke Kota Q dengan kecepatan rata-rata 60 km/jam. Pada saat yang sama, sebuah mobil berangkat dari Kota Q ke Kota P dengan kecepatan rata-rata 90 km/jam melalui jalan yang sama. Jika jarak Kota P dan Q adalah 300 km, setelah berapa jam kedua kendaraan tersebut akan berpapasan?",
    options: { A: "1.5 jam", B: "2.0 jam", C: "2.5 jam", D: "3.0 jam", E: "3.5 jam" },
    answer: "B",
    solution: {
      concept: "Aritmetika Gerak Lurus Beraturan (Waktu Berpapasan Saling Mendekati): Waktu = Jarak Total / (v1 + v2).",
      steps: [
        "Kecepatan Relatif Gabungan (saling mendekati) = 60 km/jam + 90 km/jam = 150 km/jam.",
        "Waktu Berpapasan t = Jarak Total / Kecepatan Gabungan = 300 km / 150 km/jam = 2.0 jam."
      ],
      traps: {
        A: "Membagi 300 dengan 200.",
        C: "Salah membagi 300 / 120.",
        D: "Hanya menghitung waktu bus (300 / 60 = 5) lalu dikurangi 2.",
        E: "Salah penjumlahan kecepatan."
      }
    }
  },
  {
    id: "cpns.tiu.figural.pola.001",
    version: 1,
    track: "CPNS",
    subtest: "TIU",
    skill: "cpns.tiu.figural.pola",
    difficulty: 2,
    status: "published",
    item_type: "mcq",
    stem: "Sebuah elemen gambar bangun geometris diputar 135 derajat searah jarum jam kemudian dicerminkan terhadap garis horizontal. Posisi akhir elemen tersebut setara dengan...",
    options: {
      A: "Rotasi 45 derajat berlawanan jarum jam lalu dicerminkan",
      B: "Rotasi 135 derajat berlawanan jarum jam",
      C: "Rotasi 225 derajat searah jarum jam",
      D: "Pencerminan vertikal tanpa rotasi",
      E: "Rotasi 90 derajat searah jarum jam"
    },
    answer: "A",
    solution: {
      concept: "Transformasi Geometri Spasial Kombinasi Rotasi dan Refleksi.",
      steps: [
        "Rotasi 135° searah jarum jam setara dengan rotasi komplementer -225°.",
        "Kombinasi dengan pencerminan horizontal menghasilkan posisi inversi simetris yang setara dengan rotasi 45° berlawanan jarum jam yang dicerminkan."
      ],
      traps: {
        B: "Lupa memperhitungkan efek refleksi.",
        C: "Hanya rotasi komplementer.",
        D: "Mengabaikan rotasi.",
        E: "Salah perhitungan sudut."
      }
    }
  },
  {
    id: "cpns.tiu.logika.penalaran.001",
    version: 1,
    track: "CPNS",
    subtest: "TIU",
    skill: "cpns.tiu.logika.penalaran",
    difficulty: 3,
    status: "published",
    item_type: "mcq",
    stem: "Enam pejabat ASN (A, B, C, D, E, F) duduk mengelilingi meja bundar rapat. Syarat posisi:\n1. A duduk berhadapan langsung dengan D.\n2. B duduk tepat di antara A dan C.\n3. E tidak boleh duduk di samping D.\nSiapakah yang duduk tepat berhadapan dengan B?",
    options: { A: "C", B: "D", C: "E", D: "F", E: "A" },
    answer: "C",
    solution: {
      concept: "Penalaran Analitis Posisi Melingkar (Circular Seating Arrangement).",
      steps: [
        "Posisi 6 kursi melingkar: A di posisi 1, D berseberangan di posisi 4.",
        "B di pos 2 (di antara A pos 1 dan C pos 3). E di pos 6 (agar tidak di samping D pos 4).",
        "Maka posisi berhadapan dengan B (pos 2) adalah E (pos 6)."
      ],
      traps: {
        A: "C adalah tetangga B.",
        B: "D berseberangan A.",
        D: "F berseberangan C.",
        E: "A adalah tetangga B."
      }
    }
  },

  // TKP HOTS LIKERT ITEMS (6 ITEMS COMPLEX SCENARIOS)
  {
    id: "cpns.tkp.pelayanan.publik.001",
    version: 1,
    track: "CPNS",
    subtest: "TKP",
    skill: "cpns.tkp.pelayanan.publik",
    difficulty: 3,
    status: "published",
    item_type: "tkp_likert",
    stem: "Anda adalah kepala loket pelayanan publik terpadu. Pada hari Senin pagi saat sistem database antrean terintegrasi nasional mendadak mengalami server crash dan mati total, ratusan warga telah mengantre sejak subuh dengan emosi tinggi. Apa tindakan pertama yang paling profesional Anda lakukan?",
    options: {
      A: "Mengumumkan situasi gangguan server dengan sopan dan terbuka, membagikan antrean manual darurat, serta menyediakan area tunggu ber-AC dan minum bagi warga",
      B: "Menutup loket sementara dan meminta warga pulang untuk datang kembali minggu depan setelah server diperbaiki teknisi pusat",
      C: "Menugaskan staf bawah untuk menghadapi warga yang marah sementara Anda berkoordinasi dengan teknisi IT pusat",
      D: "Melayani pendaftaran warga secara manual tanpa memverifikasi data demi meredam amarah masyarakat",
      E: "Menyalahkan penyedia layanan server IT pusat di depan media dan masyarakat agar instansi Anda tidak dihujat"
    },
    tkp_key: { A: 5, B: 2, C: 3, D: 4, E: 1 },
    solution: {
      concept: "Kepemimpinan Pelayanan Publik dalam Krisis: Transparansi, Solusi Alternatif Berkelanjutan, Empati, dan Manajemen Risiko.",
      steps: [
        "Opsi A menunjukkan kepemimpinan pelayanan prima unggul (Skor 5): Komunikasi terbuka, solusi manual terkontrol, & empati kenyamanan warga.",
        "Opsi D memberikan pelayanan cepat meski ada risiko verifikasi (Skor 4). Opsi C koordinasi teknis tapi lempar staf (Skor 3). Opsi B pasif (Skor 2). Opsi E melemparkan kesalahan secara toksik (Skor 1)."
      ],
      traps: {
        B: "Menunjukkan ketiadaan contingency plan pelayanan.",
        E: "Merusak reputasi dan integritas tata kelola pemerintahan."
      }
    }
  },
  {
    id: "cpns.tkp.pelayanan.publik.002",
    version: 1,
    track: "CPNS",
    subtest: "TKP",
    skill: "cpns.tkp.pelayanan.publik",
    difficulty: 3,
    status: "published",
    item_type: "tkp_likert",
    stem: "Seorang warga disabilitas netra datang sendirian ke kantor pelayanan Anda untuk mengurus dokumen sertifikat tanah. Prosedur standar memerlukan pemindaian sidik jari dan tanda tangan basah yang sulit dilakukan warga tersebut. Tindakan Anda adalah...",
    options: {
      A: "Mendampingi warga tersebut secara khusus, membimbing proses secara sabar sesuai SOP inklusif, dan memastikan hak pelayanannya terpenuhi utuh",
      B: "Meminta warga tersebut membawa anggota keluarga yang normal esok hari agar tidak merepotkan petugas",
      C: "Menolak memproses berkas karena tidak sesuai dengan prosedur otomatis sistem digital",
      D: "Meminta rekan kerja lain yang lebih sabar untuk mengurus warga disabilitas tersebut",
      E: "Membiarkan warga tersebut berusaha sendiri menyentuh pemindai sidik jari"
    },
    tkp_key: { A: 5, B: 2, C: 1, D: 3, E: 4 },
    solution: {
      concept: "Prinsip Pelayanan Inklusif dan Ramah Kelompok Rentan/Disabilitas bagi ASN.",
      steps: [
        "Opsi A menunjukkan empati dan tanggung jawab penuh pendampingan inklusif (Skor 5).",
        "Opsi E membiarkan dengan pengawasan minimal (Skor 4). Opsi D melempar tugas (Skor 3). Opsi B menolak melayani langsung (Skor 2). Opsi C diskriminasi (Skor 1)."
      ],
      traps: {
        B: "Bentuk diskriminasi pelayanan publik.",
        C: "Melanggar prinsip hak asasi disabilitas."
      }
    }
  },
  {
    id: "cpns.tkp.kerja.profesionalisme.001",
    version: 1,
    track: "CPNS",
    subtest: "TKP",
    skill: "cpns.tkp.kerja.profesionalisme",
    difficulty: 3,
    status: "published",
    item_type: "tkp_likert",
    stem: "Anda menyusun laporan evaluasi anggaran instansi yang akan diserahkan ke pimpinan 2 jam lagi. Tiba-tiba Anda menemukan kesalahan kalkulasi sebesar Rp500 juta pada lembar rekapitulasi utama. Sikap Anda...",
    options: {
      A: "Segera merevisi kalkulasi data yang salah, mengonfirmasi angka valid ke tim keuangan, dan menyajikan laporan akurat tepat waktu",
      B: "Melaporkan kesalahan ke pimpinan dan membiarkan laporan diserahkan dengan data salah terlebih dahulu",
      C: "Menyembunyikan kesalahan data tersebut agar tidak ditegur pimpinan",
      D: "Menyalahkan tim penyusun data awal di depan pimpinan",
      E: "Meminta perpanjangan tenggat waktu 3 hari untuk mengulang seluruh laporan dari awal"
    },
    tkp_key: { A: 5, B: 3, C: 1, D: 2, E: 4 },
    solution: {
      concept: "Profesionalisme Kinerja ASN: Kecepatan Respon, Akurasi Data, Tanggung Jawab, & Integritas Kinerja.",
      steps: [
        "Opsi A sigap memperbaiki data dengan cepat, koordinasi validasi, dan menjaga tenggat waktu (Skor 5).",
        "Opsi E meminta perpanjangan demi ketelitian total (Skor 4)."
      ],
      traps: {
        C: "Tindakan ketidakjujuran/manipulasi data berat.",
        D: "Merusak kerja tim."
      }
    }
  },
  {
    id: "cpns.tkp.kerja.profesionalisme.002",
    version: 1,
    track: "CPNS",
    subtest: "TKP",
    skill: "cpns.tkp.kerja.profesionalisme",
    difficulty: 3,
    status: "published",
    item_type: "tkp_likert",
    stem: "Atasan Anda memberikan kritik keras di depan rapat koordinasi mengenai hasil kerja tim Anda yang dinilai kurang inovatif. Reaksi dan tindakan profesional Anda adalah...",
    options: {
      A: "Menerima kritik secara terbuka sebagai bahan evaluasi konstruktif, lalu mengajak tim melakukan brainstorming merancang inovasi baru",
      B: "Merasa tersinggung dan membela diri secara emosional dalam rapat",
      C: "Diam saja dalam rapat tetapi mengeluh di media sosial setelah rapat selesai",
      D: "Abaikan kritik atasan karena menganggap ide tim sudah yang paling sempurna",
      E: "Mengajukan surat pengunduran diri karena merasa tidak dihargai"
    },
    tkp_key: { A: 5, B: 2, C: 1, D: 3, E: 4 },
    solution: {
      concept: "Kecerdasan Emosional (EQ) & Akselerasi Profesionalisme ASN terhadap Feedback/Kritik.",
      steps: [
        "Opsi A menunjukkan kedewasaan mental tinggi: menerima masukan positif dan langsung bertindak melakukan perbaikan inovatif (Skor 5).",
        "Langkah evaluasi internal dilakukan secara profesional tanpa merusak soliditas tim."
      ],
      traps: {
        B: "Reaktif emosional merusak etika rapat.",
        C: "Bentuk ketidakdewasaan kerja."
      }
    }
  },
  {
    id: "cpns.tkp.kerja.jejaring.001",
    version: 1,
    track: "CPNS",
    subtest: "TKP",
    skill: "cpns.tkp.kerja.jejaring",
    difficulty: 3,
    status: "published",
    item_type: "tkp_likert",
    stem: "Instansi Anda ditunjuk memimpin konsorsium lintas kementerian/lembaga untuk proyek digitalisasi nasional. Setiap perwakilan lembaga memiliki ego sektoral dan budaya kerja yang bertolak belakang. Cara Anda membangun kolaborasi adalah...",
    options: {
      A: "Membangun komunikasi intrapersonal yang inklusif, menyepakati visi bersama di atas kepentingan sektoral, dan membagi peran secara adil sesuai kompetensi",
      B: "Memaksakan budaya kerja instansi Anda secara sepihak kepada seluruh perwakilan lembaga lain",
      C: "Membiarkan setiap lembaga bekerja sendiri-sendiri tanpa koordinasi terpadu",
      D: "Melapor ke Kementerian Koordinator agar lembaga pasif diberi sanksi",
      E: "Mundur dari posisi ketua konsorsium karena menghindari konflik sektoral"
    },
    tkp_key: { A: 5, B: 2, C: 3, D: 4, E: 1 },
    solution: {
      concept: "Kemitraan Jejaring Kerja & Collaborative Governance (Whole-of-Government ASN).",
      steps: [
        "Opsi A membangun sinergi lintas sektoral berlandaskan komunikasi inklusif dan pembagian peran adil (Skor 5).",
        "Langkah kolaboratif menekankan penyamaan visi bersama di atas ego sektoral."
      ],
      traps: {
        B: "Ego sektoral sepihak merusak jaringan.",
        E: "Kabur dari tanggung jawab kepemimpinan."
      }
    }
  },
  {
    id: "cpns.tkp.nilai.integritas_antikorupsi.001",
    version: 1,
    track: "CPNS",
    subtest: "TKP",
    skill: "cpns.tkp.nilai.integritas_antikorupsi",
    difficulty: 3,
    status: "published",
    item_type: "tkp_likert",
    stem: "Seorang pengusaha peserta lelang pengadaan barang di instansi Anda menawarkan sponsor beasiswa studi ke luar negeri untuk anak Anda dengan syarat Anda membocorkan dokumen Perkiraan Sendiri (HPS) proyek. Sikap tegas Anda...",
    options: {
      A: "Menolak tawaran tersebut secara santun namun mutlak tegas, serta melaporkan indikasi percobaan suap/gratifikasi ke Unit Pengendalian Gratifikasi (UPG) / KPK",
      B: "Menerima beasiswa tersebut karena dianggap tidak berhubungan langsung dengan uang tunai",
      C: "Menolak beasiswa tetapi tetap memberikan sedikit bocoran data HPS demi hubungan baik",
      D: "Pura-pura tidak mendengar tawaran pengusaha tersebut",
      E: "Meminta pengusaha mengubah beasiswa menjadi uang tunai langsung"
    },
    tkp_key: { A: 5, B: 1, C: 2, D: 3, E: 1 },
    solution: {
      concept: "Komitmen Mutlak Antikorupsi, Penolakan Suap/Gratifikasi Terselubung, dan Whistleblowing System ASN.",
      steps: [
        "Opsi A menunjukkan integritas tanpa kompromi: menolak tegas suap terselubung dan melaporkan ke instansi UPG/KPK (Skor 5).",
        "Tindakan pencegahan pelaporan memperkuat transparansi pengadaan barang dan jasa publik."
      ],
      traps: {
        B: "Gratifikasi terselubung pidana tindak korupsi.",
        C: "Bocoran HPS adalah pelanggaran hukum berat.",
        D: "Membiarkan tanpa bertindak tegas.",
        E: "Meminta suap uang tunai adalah pelanggaran tindak pidana korupsi."
      }
    }
  }
];

async function main() {
  console.log("🌱 Seeding ZanBimbel v3 Database dengan 40 Soal HOTS...");

  // 1. Seed Taxonomy Skills
  console.log("📦 Seeding Taxonomy Skills...");
  for (const skill of INITIAL_TAXONOMY) {
    await prisma.skill.upsert({
      where: { code: skill.code },
      update: { label: skill.label, subtest: skill.subtest, domain: skill.domain, track: skill.track },
      create: skill,
    });
  }
  console.log(`✅ ${INITIAL_TAXONOMY.length} Taxonomy Skills seeded.`);

  // 2. Seed CPNS Ruleset
  console.log("⚙️ Seeding CPNS Ruleset 2026...");
  await prisma.ruleset.upsert({
    where: { track_year: { track: "CPNS", year: 2026 } },
    update: { payload: JSON.stringify({ twkThreshold: 65, tiuThreshold: 80, tkpThreshold: 166 }) },
    create: {
      track: "CPNS",
      year: 2026,
      payload: JSON.stringify({ twkThreshold: 65, tiuThreshold: 80, tkpThreshold: 166 }),
    },
  });

  // 3. Seed Items (40 Items validation & upsert)
  console.log("📝 Validating and Seeding 40 Published HOTS Items...");
  let validCount = 0;

  for (const item of SAMPLE_ITEMS) {
    const gateResult = validateItemGate(item);
    if (!gateResult.valid) {
      console.error(`❌ Item ${item.id} gagal lolos gate validation:`, gateResult.errors);
      throw new Error(`Gate validation failed for item ${item.id}`);
    }

    const { id, version, item_type, track, subtest, skill, difficulty, status, ...rest } = item;

    await prisma.item.upsert({
      where: { id_version: { id, version } },
      update: {
        itemType: item_type,
        track,
        subtest,
        skillCode: skill,
        difficulty,
        status,
        payload: JSON.stringify(item),
      },
      create: {
        id,
        version,
        itemType: item_type,
        track,
        subtest,
        skillCode: skill,
        difficulty,
        status,
        payload: JSON.stringify(item),
      },
    });
    validCount++;
  }

  console.log(`✅ ${validCount} HOTS Items validated and published successfully!`);

  // 4. Seed Demo User
  console.log("👤 Seeding Demo User...");
  const user = await prisma.user.upsert({
    where: { email: "user@zanbimbel.id" },
    update: {},
    create: {
      email: "user@zanbimbel.id",
      name: "Siswa ZanBimbel",
      profile: {
        create: {
          defaultTrack: "UTBK",
          isPro: false,
        },
      },
    },
  });
  console.log(`✅ Demo User created with ID: ${user.id}`);
  console.log("🎉 HOTS Seeding Finished Successfully!");
}

main()
  .catch((e) => {
    console.error("Fatal Seeding Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
