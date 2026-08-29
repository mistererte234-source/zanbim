import { PrismaClient } from "@prisma/client";
import { INITIAL_TAXONOMY } from "../src/lib/taxonomy";
import { validateItemGate } from "../src/lib/gate-validator";

const prisma = new PrismaClient();

const SAMPLE_ITEMS = [
  // -------------------------------------------------------------
  // UTBK HOTS ITEMS (20 ITEMS)
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

  // -------------------------------------------------------------
  // CPNS HOTS ITEMS (20 ITEMS)
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
  // REKRUTMEN HRD HOTS ITEMS (IQ & PSIKOTES STANDAR CORPORATE TOP)
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
      concept: "Penalaran Matriks Spasial Raven (Raven's Advanced Progressive Matrices) Kombinasi Transformasi Sudut dan Inkremen Elemen.",
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
  {
    id: "rekrutmen.iq.logika.penalaran_kritis.001",
    version: 1,
    track: "REKRUTMEN",
    subtest: "IQ_LOGIKA",
    skill: "rekrutmen.iq.logika.penalaran_kritis",
    difficulty: 3,
    status: "published",
    item_type: "mcq",
    stem: "Direktur Keuangan menyatakan: 'Jika efisiensi alokasi modal kerja tercapai, maka laba operasional bersih kuartal ini akan tumbuh minimal 18%'. Faktanya, laba operasional bersih kuartal ini hanya tumbuh 12%. Manakah deduksi manajemen yang PASTI BENAR?",
    options: {
      A: "Efisiensi alokasi modal kerja tidak tercapai secara optimal",
      B: "Efisiensi alokasi modal kerja tetap tercapai sempurna",
      C: "Perusahaan pasti mengalami kerugian bersih",
      D: "Tim pemasaran tidak bekerja dengan baik",
      E: "Direktur Keuangan memotong gaji seluruh karyawan"
    },
    answer: "A",
    solution: {
      concept: "Logika Deduktif Manajemen (Modus Tollens: p -> q, ~q ⊢ ~p).",
      steps: [
        "Premis: p (Efisiensi Modal) -> q (Laba Tumbuh >= 18%).",
        "Fakta: ~q (Laba hanya 12%, artinya tidak mencapai 18%).",
        "Modus Tollens: ~p (Efisiensi alokasi modal kerja tidak tercapai)."
      ],
      traps: {
        B: "Mengabaikan hukum deduksi logika modus tollens.",
        C: "Laba 12% masih bernilai positif (bukan rugi).",
        D: "Pengandalan variabel luar tanpa bukti premis.",
        E: "Asumsi ekstrem tak berdasar."
      }
    }
  },
  {
    id: "rekrutmen.psikotes.kerja.problem_solving.001",
    version: 1,
    track: "REKRUTMEN",
    subtest: "PSIKOTES",
    skill: "rekrutmen.psikotes.kerja.problem_solving",
    difficulty: 3,
    status: "published",
    item_type: "tkp_likert",
    stem: "Anda memimpin tim pengembang software di perusahaan teknologi skala besar. Saat peluncuran produk tinggal 3 hari, ditemukan bug kritis pada modul pembayaran yang dapat mengancam integritas data transaksi jutaan pengguna. Pihak manajemen menuntut peluncuran tidak boleh ditunda. Tindakan Anda adalah...",
    options: {
      A: "Menjelaskan risiko keamanan data secara obyektif ke manajemen, mengusulkan penundaan peluncuran 48 jam khusus untuk penambalan bug, dan memimpin tim perbaikan darurat",
      B: "Meluncurkan produk sesuai jadwal dan menyembunyikan masalah bug dari publik agar reputasi perusahaan aman",
      C: "Menyerahkan seluruh keputusan penundaan atau peluncuran kepada staf junior pengemban modul",
      D: "Mengabaikan instruksi manajemen dan mematikan server secara sepihak tanpa koordinasi",
      E: "Menyalahkan vendor luar penyedia modul pembayaran di depan publik"
    },
    tkp_key: { A: 5, B: 2, C: 3, D: 2, E: 1 },
    solution: {
      concept: "Manajemen Kepemimpinan Risiko & Etika Keamanan Siber Produk Teknologi (Corporate Problem Solving).",
      steps: [
        "Opsi A menunjukkan kepemimpinan berintegritas tinggi (Skor 5): Menjelaskan risiko objektif, mengusulkan penundaan terkontrol 48 jam, & memimpin penanganan darurat.",
        "Keamanan data transaksi pengguna merupakan prioritas utama reputasi jangka panjang."
      ],
      traps: {
        B: "Bentuk kebohongan publik & risiko kebocoran data massif.",
        E: "Melempar tanggung jawab."
      }
    }
  },

  // -------------------------------------------------------------
  // DEWAN RI HOTS ITEMS (KELAYAKAN CALON ANGGOTA DPR RI KOMISI I - XI)
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
  {
    id: "dewan.legislatif.fungsi.penganggaran_apbn.001",
    version: 1,
    track: "DEWAN_RI",
    subtest: "BUDGETING",
    skill: "dewan.legislatif.fungsi.penganggaran_apbn",
    difficulty: 3,
    status: "published",
    item_type: "mcq",
    stem: "[KOMISI XI: Keuangan, Perbankan, & Bappenas]\nPada rapat pembahasan RAPBN bersama Menteri Keuangan dan Bank Indonesia, Komisi XI menemukan pengajuan alokasi anggaran subsidi energi yang melonjak 40% namun tidak disertai target sasaran penerima yang jelas. Tindakan paling tepat anggota Komisi XI adalah...",
    options: {
      A: "Menolak pengesahan alokasi subsidi tersebut sebelum kementerian menyerahkan Data Terpadu Kesejahteraan Sosial (DTKS) yang tervalidasi presisi",
      B: "Langsung menyetujui anggaran tanpa verifikasi agar rapat cepat selesai",
      C: "Meminta jatah alokasi dana subsidi untuk dibagikan khusus di daerah pemilihannya saja",
      D: "Memotong anggaran subsidi menjadi nol persen secara sepihak",
      E: "Mengalihkan seluruh dana subsidi energi ke anggaran perjalanan dinas DPR"
    },
    answer: "A",
    solution: {
      concept: "Fungsi Budgeting (Penganggaran APBN) DPR RI: Asesmen Efektivitas, Akuntabilitas, & Ketepatan Sasaran Belanja Negara.",
      steps: [
        "Fungsi penganggaran DPR menuntut transparansi dan akuntabilitas belanja publik.",
        "Menunda persetujuan sampai data sasaran (DTKS) terverifikasi merupakan wujud pengawasan anggaran yang bertanggung jawab."
      ],
      traps: {
        B: "Abai pada kebocoran anggaran negara.",
        C: "Konflik kepentingan politik transaksional.",
        D: "Keputusan ekstrem tidak rasional.",
        E: "Penyalahgunaan wewenang berat."
      }
    }
  },
  {
    id: "dewan.etika.integritas.anti_korupsi.001",
    version: 1,
    track: "DEWAN_RI",
    subtest: "ETIKA_INTEGRITAS",
    skill: "dewan.etika.integritas.anti_korupsi",
    difficulty: 3,
    status: "published",
    item_type: "tkp_likert",
    stem: "[KOMISI III: Hukum, HAM, & Keamanan]\nAnda adalah anggota Komisi III DPR RI. Seorang direktur BUMN yang sedang menjalani pemeriksaan kasus dugaan tindak pidana korupsi oleh mitra kerja Anda (KPK/Kejaksaan) menawarkan kompensasi kepemilikan saham perusahaan keluarga Anda asal Anda bersedia mengintervensi proses penyidikan. Sikap Anda...",
    options: {
      A: "Menolak tawaran intervensi secara mutlak tegas, menjaga independensi lembaga penegak hukum, dan melaporkan indikasi tindak pidana penyuapan ke KPK",
      B: "Menerima saham tersebut secara rahasia dan berpura-pura menanyakan perkembangan kasus di rapat dengar pendapat",
      C: "Menolak saham tetapi menyarankan direktur tersebut menyuap penyidik KPK secara langsung",
      D: "Pura-pura tidak tahu dan membiarkan intervensi terjadi",
      E: "Meminta saham ditambah dua kali lipat sebelum menyetujui bantuan"
    },
    tkp_key: { A: 5, B: 1, C: 2, D: 3, E: 1 },
    solution: {
      concept: "Kode Etik Anggota DPR RI & Komitmen Mutlak Independensi Penegakan Hukum (Anti-Korupsi).",
      steps: [
        "Opsi A mencerminkan ketaatan mutlak pada Kode Etik DPR: Menolak tegas intervensi kasus hukum, menjaga independensi KPK/Kejaksaan, & melaporkan suap (Skor 5)."
      ],
      traps: {
        B: "Tindak pidana korupsi & pelanggaran berat sumpah jabatan.",
        E: "Pemerasan dan kejahatan jabatan."
      }
    }
  }
];

async function main() {
  console.log("🌱 Seeding ZanBimbel v3 Database (UTBK, CPNS, REKRUTMEN, DEWAN RI)...");

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
