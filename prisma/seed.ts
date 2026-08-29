import { PrismaClient } from "@prisma/client";
import { INITIAL_TAXONOMY } from "../src/lib/taxonomy";
import { validateItemGate } from "../src/lib/gate-validator";

const prisma = new PrismaClient();

const SAMPLE_ITEMS = [
  // -------------------------------------------------------------
  // UTBK HOTS ITEMS
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

  // -------------------------------------------------------------
  // CPNS HOTS ITEMS
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

  // -------------------------------------------------------------
  // REKRUTMEN HRD ITEMS
  // -------------------------------------------------------------
  {
    id: "rekrutmen.iq.spasial.matriks_raven.001",
    version: 1,
    track: "REKRUTMEN",
    subtest: "IQ_SPASIAL",
    skill: "rekrutmen.iq.spasial.matriks_raven",
    difficulty: 3,
    status: "published",
    item_type: "mcq",
    stem: "Sebuah pola matriks gambar 3x3 memiliki aturan rotasi: Setiap kolom bergeser 90 derajat searah jarum jam dari kiri ke kanan, dan jumlah garis diagonal bertambah 1 setiap baris dari atas ke bawah. Jika baris 3 kolom 2 memiliki 3 garis diagonal dengan sudut 180 derajat, posisi baris 3 kolom 3 yang tepat adalah...",
    options: {
      A: "3 garis diagonal berotasi sudut 270 derajat",
      B: "4 garis diagonal berotasi sudut 90 derajat",
      C: "3 garis diagonal berotasi sudut 0 derajat",
      D: "2 garis diagonal berotasi sudut 180 derajat",
      E: "4 garis diagonal berotasi sudut 270 derajat"
    },
    answer: "A",
    solution: {
      concept: "Penalaran Matriks Spasial Raven Kombinasi Transformasi Sudut dan Inkremen Elemen.",
      steps: [
        "Aturan Kolom: Rotasi +90° searah jarum jam dari Kolom 2 (180°) menuju Kolom 3 -> 180° + 90° = 270°.",
        "Aturan Baris: Jumlah garis diagonal konstan pada baris yang sama -> Baris 3 tetap 3 garis diagonal.",
        "Maka kombinasi yang tepat adalah 3 garis diagonal berotasi sudut 270 derajat."
      ],
      traps: {
        B: "Menambah garis diagonal secara keliru.",
        C: "Mengabaikan aturan rotasi sudut.",
        D: "Mengurangi jumlah garis diagonal.",
        E: "Salah menghitung penambahan garis."
      }
    }
  },

  // -------------------------------------------------------------
  // DEWAN RI ITEMS
  // -------------------------------------------------------------
  {
    id: "dewan.komisi.spesifik.wawasan_regulasi.001",
    version: 1,
    track: "DEWAN_RI",
    subtest: "KOMISI_SPESIFIK",
    skill: "dewan.komisi.spesifik.wawasan_regulasi",
    difficulty: 3,
    status: "published",
    item_type: "mcq",
    stem: "[KOMISI I: Pertahanan, Luar Negeri, & Kominfo]\nDalam pembahasan Rancangan Undang-Undang Keamanan Siber dan Ketahanan Siber Nasional, anggota Komisi I DPR RI menemukan pasal yang berpotensi membatasi kebebasan berpendapat masyarakat di ruang digital. Wujud pelaksanaan fungsi legislasi DPR yang berintegritas adalah...",
    options: {
      A: "Melakukan Uji Publik (Public Hearing) dengan menghadirkan pakar hukum siber dan LSM, serta merevisi pasal agar berimbang antara keamanan nasional dan HAM",
      B: "Menerima seluruh draf pasal dari pemerintah tanpa perubahan demi mempercepat pengesahan RUU",
      C: "Menolak seluruh RUU Keamanan Siber sehingga Indonesia tidak memiliki payung hukum pertahanan siber",
      D: "Menjual draf RUU ke investor swasta asing sebelum disahkan",
      E: "Membiarkan pasal bermasalah disahkan lalu meminta masyarakat menggugat ke MK"
    },
    answer: "A",
    solution: {
      concept: "Fungsi Legislasi DPR RI: Uji Publik Berkonstitusi & Keseimbangan Keamanan Nasional vs Hak Asasi Manusia.",
      steps: [
        "Anggota DPR berintegritas memanfaatkan fungsi legislasi lewat uji publik partisipatif (Public Hearing).",
        "Menyerap masukan pakar dan merevisi pasal agar menjamin keamanan siber tanpa mengorbankan HAM (Opsi A)."
      ],
      traps: {
        B: "Pengabaian fungsi pengawasan legislatif.",
        C: "Tindakan destruktif membiarkan kekosongan hukum.",
        D: "Tindak pidana korupsi/bocoran rahasia negara.",
        E: "Melempar tanggung jawab pembentukan UU."
      }
    }
  },

  // -------------------------------------------------------------
  // DOSEN PTN/PTS HOTS ITEMS (PEDAGOGIK, RESEARCH, TRI DHARMA)
  // -------------------------------------------------------------
  {
    id: "dosen.tridharma.penelitian.metodologi.001",
    version: 1,
    track: "DOSEN",
    subtest: "PENELITIAN",
    skill: "dosen.tridharma.penelitian.metodologi",
    difficulty: 3,
    status: "published",
    item_type: "mcq",
    stem: "Seorang dosen sedang menyusun artikel ilmiah untuk disubmit ke jurnal internasional bereputasi terindeks Scopus Q1. Dalam melakukan tinjauan pustaka (literature review), dosen tersebut mengutip ide utama dari 3 naskah lain tetapi mengubah susunan kata tanpa mencantumkan sitasi ilmiah yang tepat. Tindakan tersebut dalam etika akademis masuk dalam kategori...",
    options: {
      A: "Plagiarisme Paraphrasing tanpa Sitasi (Academic Dishonesty)",
      B: "Praktik ilmiah yang sah karena kata-kata sudah diubah",
      C: "Auto-Plagiarisme yang diperbolehkan dalam penelitian empiris",
      D: "Inovasi metodologi penelitian kuantitatif",
      E: "Fabrikasi data penelitian"
    },
    answer: "A",
    solution: {
      concept: "Etika Akademis Dosen & Integritas Publikasi Ilmiah (Standar Bebas Plagiarisme Permendikbudristek).",
      steps: [
        "Mengutip ide orang lain meskipun kata-katanya diubah (paraphrase) tanpa menyebutkan sumber rujukan/sitasi tetap merupakan bentuk Plagiarisme.",
        "Pelanggaran ini merusak integritas integritas akademik dosen (Academic Dishonesty)."
      ],
      traps: {
        B: "Mengkira perubahan kata menghilangkan kewajiban sitasi.",
        C: "Auto-plagiarisme adalah mengutip karya sendiri.",
        D: "Bukan inovasi metodologi.",
        E: "Fabrikasi data adalah membuat data palsu."
      }
    }
  },
  {
    id: "dosen.tridharma.pendidikan.pedagogik.001",
    version: 1,
    track: "DOSEN",
    subtest: "PEDAGOGIK",
    skill: "dosen.tridharma.pendidikan.pedagogik",
    difficulty: 3,
    status: "published",
    item_type: "mcq",
    stem: "Dalam merancang Rencana Pembelajaran Semester (RPS) berbasis Outcome-Based Education (OBE), seorang dosen menetapkan Capaian Pembelajaran Lulusan (CPL) agar mahasiswa mampu memecahkan masalah sistemik industri melalui analisis kritis. Metode asesmen pembelajaran yang paling selaras dengan prinsip constructive alignment adalah...",
    options: {
      A: "Asesmen Portofolio Berbasis Proyek Riset Studi Kasus Nyata (Case-Based Project Assessment)",
      B: "Ujian Pilihan Ganda Singkat 10 Soal Tanpa Pembahasan",
      C: "Tugas Merangkum Buku Teks 50 Halaman Secara Manual",
      D: "Absensi Kehadiran Kuliah 100%",
      E: "Ujian Lisan Hafalan Definisi Istilah"
    },
    answer: "A",
    solution: {
      concept: "Konstruktivisme & Outcome-Based Education (OBE) dalam Kurikulum Perguruan Tinggi Modern.",
      steps: [
        "Metode OBE menuntut alignment antara CPL (kemampuan pemecahan masalah kritis) dan metode asesmen.",
        "Case-Based Project Assessment mengukur kemampuan mahasiswa dalam memecahkan masalah nyata industri secara autentik."
      ],
      traps: {
        B: "Pilihan ganda singkat tidak mengukur pemecahan masalah kompleks.",
        C: "Merangkum buku hanya tingkat kognitif rendah.",
        D: "Absensi bukan alat ukur capaian kognitif.",
        E: "Hafalan tidak setara dengan pemecahan masalah kritis."
      }
    }
  }
];

async function main() {
  console.log("🌱 Seeding ZanBimbel v3 Database (UTBK, CPNS, REKRUTMEN, DEWAN RI, DOSEN)...");

  console.log("📦 Seeding Taxonomy Skills...");
  for (const skill of INITIAL_TAXONOMY) {
    await prisma.skill.upsert({
      where: { code: skill.code },
      update: { label: skill.label, subtest: skill.subtest, domain: skill.domain, track: skill.track },
      create: skill,
    });
  }
  console.log(`✅ ${INITIAL_TAXONOMY.length} Taxonomy Skills seeded.`);

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

  console.log("📝 Validating and Seeding Published Items...");
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

  console.log(`✅ ${validCount} Items validated and published successfully!`);
}

main()
  .catch((e) => {
    console.error("Fatal Seeding Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
