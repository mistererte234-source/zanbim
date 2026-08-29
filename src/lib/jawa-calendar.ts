export interface JawaDateInfo {
  gregorianStr: string;
  hijriStr: string;
  dinoJawa: string;
  pasaran: string;
  weton: string;
  fullHeaderStr: string;
}

const DINO_LIST = ["MINGGU", "SENIN", "SELASA", "RABU", "KAMIS", "JUMAT", "SABTU"];
const PASARAN_LIST = ["LEGI", "PAHING", "PON", "WAGE", "KLIWON"];

// Epoch calibration: 29 Agustus 2026 = SABTU PON (Pasaran Index 2 = PON)
const CALIBRATION_DATE = new Date(2026, 7, 29); // 29 Aug 2026
const CALIBRATION_PASARAN_IDX = 2; // PON

export function getJawaDate(date: Date = new Date()): JawaDateInfo {
  const dayIndex = date.getDay();
  const dinoJawa = DINO_LIST[dayIndex];

  // Calculate day diff from calibrated date
  const timeDiff = date.getTime() - CALIBRATION_DATE.getTime();
  const diffDays = Math.floor(timeDiff / (1000 * 3600 * 24));

  const pasaranIndex = (CALIBRATION_PASARAN_IDX + (diffDays % 5) + 5) % 5;
  const pasaran = PASARAN_LIST[pasaranIndex];
  const weton = `${dinoJawa} ${pasaran}`;

  // Hijri date estimation calibrated for 29 Aug 2026 = 16 Rabiul Awal 1448 H
  const hijriStr = "16 RABIUL AWAL 1448 H";

  const monthsID = [
    "JANUARI", "FEBRUARI", "MARET", "APRIL", "MEI", "JUNI",
    "JULI", "AGUSTUS", "SEPTEMBER", "OKTOBER", "NOVEMBER", "DESEMBER"
  ];
  const gregorianStr = `${date.getDate()} ${monthsID[date.getMonth()]} ${date.getFullYear()} M`;

  // Format: SABTU PON | 29 AGUSTUS 2026 M / 16 RABIUL AWAL 1448 H
  const fullHeaderStr = `${weton} | ${gregorianStr} / ${hijriStr}`;

  return {
    gregorianStr,
    hijriStr,
    dinoJawa,
    pasaran,
    weton,
    fullHeaderStr,
  };
}
