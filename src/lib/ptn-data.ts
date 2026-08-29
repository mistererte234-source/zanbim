export interface MajorData {
  name: string;
  category: "Saintek" | "Soshum";
  passingScore: number; // Target score threshold (200 - 800 scale)
  competitiveness: "Sangat Ketat" | "Ketat" | "Sedang";
}

export interface UniversityData {
  id: string;
  name: string;
  shortName: string;
  location: string;
  majors: MajorData[];
}

export const TOP_10_PTN: UniversityData[] = [
  {
    id: "ui",
    name: "Universitas Indonesia (UI)",
    shortName: "UI",
    location: "Depok, Jawa Barat",
    majors: [
      { name: "Pendidikan Dokter", category: "Saintek", passingScore: 745, competitiveness: "Sangat Ketat" },
      { name: "Ilmu Komputer", category: "Saintek", passingScore: 735, competitiveness: "Sangat Ketat" },
      { name: "Sistem Informasi", category: "Saintek", passingScore: 710, competitiveness: "Ketat" },
      { name: "Teknik Industri", category: "Saintek", passingScore: 695, competitiveness: "Ketat" },
      { name: "Farmasi", category: "Saintek", passingScore: 685, competitiveness: "Ketat" },
      { name: "Ilmu Hukum", category: "Soshum", passingScore: 700, competitiveness: "Sangat Ketat" },
      { name: "Manajemen", category: "Soshum", passingScore: 710, competitiveness: "Sangat Ketat" },
      { name: "Akuntansi", category: "Soshum", passingScore: 705, competitiveness: "Sangat Ketat" },
      { name: "Ilmu Komunikasi", category: "Soshum", passingScore: 690, competitiveness: "Ketat" },
      { name: "Psikologi", category: "Soshum", passingScore: 695, competitiveness: "Ketat" },
      { name: "Hubungan Internasional", category: "Soshum", passingScore: 715, competitiveness: "Sangat Ketat" },
    ],
  },
  {
    id: "itb",
    name: "Institut Teknologi Bandung (ITB)",
    shortName: "ITB",
    location: "Bandung, Jawa Barat",
    majors: [
      { name: "STEI - Rekayasa (Informatika / Elektro)", category: "Saintek", passingScore: 750, competitiveness: "Sangat Ketat" },
      { name: "FTI - Rekayasa Industri", category: "Saintek", passingScore: 720, competitiveness: "Sangat Ketat" },
      { name: "FTTM - Teknik Perminyakan & Tambang", category: "Saintek", passingScore: 715, competitiveness: "Sangat Ketat" },
      { name: "FTMD - Teknik Mesin & Dirgantara", category: "Saintek", passingScore: 710, competitiveness: "Ketat" },
      { name: "FMIPA - Matematika & Aktuaria", category: "Saintek", passingScore: 695, competitiveness: "Ketat" },
      { name: "SBM - Sekolah Bisnis & Manajemen", category: "Soshum", passingScore: 720, competitiveness: "Sangat Ketat" },
      { name: "FSRD - Seni Rupa & Desain", category: "Soshum", passingScore: 665, competitiveness: "Sedang" },
    ],
  },
  {
    id: "ugm",
    name: "Universitas Gadjah Mada (UGM)",
    shortName: "UGM",
    location: "Yogyakarta, D.I. Yogyakarta",
    majors: [
      { name: "Kedokteran", category: "Saintek", passingScore: 740, competitiveness: "Sangat Ketat" },
      { name: "Teknologi Informasi", category: "Saintek", passingScore: 725, competitiveness: "Sangat Ketat" },
      { name: "Ilmu Komputer", category: "Saintek", passingScore: 720, competitiveness: "Sangat Ketat" },
      { name: "Teknik Sipil", category: "Saintek", passingScore: 675, competitiveness: "Ketat" },
      { name: "Farmasi", category: "Saintek", passingScore: 675, competitiveness: "Ketat" },
      { name: "Manajemen", category: "Soshum", passingScore: 700, competitiveness: "Sangat Ketat" },
      { name: "Akuntansi", category: "Soshum", passingScore: 695, competitiveness: "Sangat Ketat" },
      { name: "Ilmu Hukum", category: "Soshum", passingScore: 690, competitiveness: "Ketat" },
      { name: "Psikologi", category: "Soshum", passingScore: 685, competitiveness: "Ketat" },
      { name: "Hubungan Internasional", category: "Soshum", passingScore: 705, competitiveness: "Sangat Ketat" },
      { name: "Ilmu Komunikasi", category: "Soshum", passingScore: 680, competitiveness: "Ketat" },
    ],
  },
  {
    id: "its",
    name: "Institut Teknologi Sepuluh Nopember (ITS)",
    shortName: "ITS",
    location: "Surabaya, Jawa Timur",
    majors: [
      { name: "Teknik Informatika", category: "Saintek", passingScore: 725, competitiveness: "Sangat Ketat" },
      { name: "Sistem Informasi", category: "Saintek", passingScore: 690, competitiveness: "Ketat" },
      { name: "Sains Data", category: "Saintek", passingScore: 685, competitiveness: "Ketat" },
      { name: "Teknik Elektro", category: "Saintek", passingScore: 670, competitiveness: "Ketat" },
      { name: "Teknik Mesin", category: "Saintek", passingScore: 665, competitiveness: "Sedang" },
      { name: "Teknik Sipil", category: "Saintek", passingScore: 665, competitiveness: "Sedang" },
      { name: "Statistika Bisnis", category: "Soshum", passingScore: 655, competitiveness: "Sedang" },
    ],
  },
  {
    id: "unair",
    name: "Universitas Airlangga (UNAIR)",
    shortName: "UNAIR",
    location: "Surabaya, Jawa Timur",
    majors: [
      { name: "Kedokteran", category: "Saintek", passingScore: 735, competitiveness: "Sangat Ketat" },
      { name: "Kedokteran Gigi", category: "Saintek", passingScore: 690, competitiveness: "Ketat" },
      { name: "Farmasi", category: "Saintek", passingScore: 675, competitiveness: "Ketat" },
      { name: "Sistem Informasi & Sains Data", category: "Saintek", passingScore: 670, competitiveness: "Ketat" },
      { name: "Manajemen", category: "Soshum", passingScore: 680, competitiveness: "Ketat" },
      { name: "Akuntansi", category: "Soshum", passingScore: 675, competitiveness: "Ketat" },
      { name: "Ilmu Hukum", category: "Soshum", passingScore: 670, competitiveness: "Ketat" },
      { name: "Psikologi", category: "Soshum", passingScore: 675, competitiveness: "Ketat" },
      { name: "Hubungan Internasional", category: "Soshum", passingScore: 680, competitiveness: "Ketat" },
    ],
  },
  {
    id: "unpad",
    name: "Universitas Padjadjaran (UNPAD)",
    shortName: "UNPAD",
    location: "Sumedang / Bandung, Jawa Barat",
    majors: [
      { name: "Pendidikan Dokter", category: "Saintek", passingScore: 728, competitiveness: "Sangat Ketat" },
      { name: "Teknik Informatika", category: "Saintek", passingScore: 695, competitiveness: "Ketat" },
      { name: "Farmasi", category: "Saintek", passingScore: 670, competitiveness: "Ketat" },
      { name: "Psikologi", category: "Soshum", passingScore: 685, competitiveness: "Ketat" },
      { name: "Ilmu Komunikasi", category: "Soshum", passingScore: 685, competitiveness: "Ketat" },
      { name: "Manajemen", category: "Soshum", passingScore: 680, competitiveness: "Ketat" },
      { name: "Ilmu Hukum", category: "Soshum", passingScore: 675, competitiveness: "Ketat" },
      { name: "Hubungan Internasional", category: "Soshum", passingScore: 680, competitiveness: "Ketat" },
    ],
  },
  {
    id: "undip",
    name: "Universitas Diponegoro (UNDIP)",
    shortName: "UNDIP",
    location: "Semarang, Jawa Tengah",
    majors: [
      { name: "Kedokteran", category: "Saintek", passingScore: 720, competitiveness: "Sangat Ketat" },
      { name: "Informatika", category: "Saintek", passingScore: 685, competitiveness: "Ketat" },
      { name: "Teknik Sipil", category: "Saintek", passingScore: 660, competitiveness: "Sedang" },
      { name: "Farmasi", category: "Saintek", passingScore: 665, competitiveness: "Ketat" },
      { name: "Psikologi", category: "Soshum", passingScore: 675, competitiveness: "Ketat" },
      { name: "Ilmu Hukum", category: "Soshum", passingScore: 675, competitiveness: "Ketat" },
      { name: "Manajemen", category: "Soshum", passingScore: 670, competitiveness: "Ketat" },
      { name: "Ilmu Komunikasi", category: "Soshum", passingScore: 665, competitiveness: "Sedang" },
    ],
  },
  {
    id: "ipb",
    name: "IPB University (IPB)",
    shortName: "IPB",
    location: "Bogor, Jawa Barat",
    majors: [
      { name: "Ilmu Komputer", category: "Saintek", passingScore: 700, competitiveness: "Sangat Ketat" },
      { name: "Statistika & Sains Data", category: "Saintek", passingScore: 690, competitiveness: "Ketat" },
      { name: "Aktuaria", category: "Saintek", passingScore: 685, competitiveness: "Ketat" },
      { name: "Kedokteran", category: "Saintek", passingScore: 715, competitiveness: "Sangat Ketat" },
      { name: "Kedokteran Hewan", category: "Saintek", passingScore: 660, competitiveness: "Sedang" },
      { name: "Teknologi Pangan", category: "Saintek", passingScore: 665, competitiveness: "Sedang" },
      { name: "Manajemen Bisnis", category: "Soshum", passingScore: 675, competitiveness: "Ketat" },
      { name: "Agribisnis", category: "Soshum", passingScore: 645, competitiveness: "Sedang" },
    ],
  },
  {
    id: "ub",
    name: "Universitas Brawijaya (UB)",
    shortName: "UB",
    location: "Malang, Jawa Timur",
    majors: [
      { name: "Kedokteran", category: "Saintek", passingScore: 725, competitiveness: "Sangat Ketat" },
      { name: "Teknik Informatika", category: "Saintek", passingScore: 680, competitiveness: "Ketat" },
      { name: "Sistem Informasi", category: "Saintek", passingScore: 665, competitiveness: "Sedang" },
      { name: "Farmasi", category: "Saintek", passingScore: 660, competitiveness: "Sedang" },
      { name: "Ilmu Hukum", category: "Soshum", passingScore: 665, competitiveness: "Sedang" },
      { name: "Manajemen", category: "Soshum", passingScore: 665, competitiveness: "Sedang" },
      { name: "Psikologi", category: "Soshum", passingScore: 660, competitiveness: "Sedang" },
      { name: "Ilmu Komunikasi", category: "Soshum", passingScore: 660, competitiveness: "Sedang" },
      { name: "Hubungan Internasional", category: "Soshum", passingScore: 665, competitiveness: "Sedang" },
    ],
  },
  {
    id: "uns",
    name: "Universitas Sebelas Maret (UNS)",
    shortName: "UNS",
    location: "Surakarta, Jawa Tengah",
    majors: [
      { name: "Kedokteran", category: "Saintek", passingScore: 718, competitiveness: "Sangat Ketat" },
      { name: "Informatika", category: "Saintek", passingScore: 670, competitiveness: "Ketat" },
      { name: "Farmasi", category: "Saintek", passingScore: 655, competitiveness: "Sedang" },
      { name: "Psikologi", category: "Soshum", passingScore: 655, competitiveness: "Sedang" },
      { name: "Ilmu Hukum", category: "Soshum", passingScore: 660, competitiveness: "Sedang" },
      { name: "Manajemen", category: "Soshum", passingScore: 655, competitiveness: "Sedang" },
      { name: "Ilmu Komunikasi", category: "Soshum", passingScore: 650, competitiveness: "Sedang" },
    ],
  },
];
