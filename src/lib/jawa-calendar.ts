export interface JawaDateInfo {
  gregorianStr: string;
  hijriStr: string;
  dinoJawa: string;
  pasaran: string;
  weton: string;
  fullJawaStr: string;
}

const DINO_LIST = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
const PASARAN_LIST = ["Legi", "Pahing", "Pon", "Wage", "Kliwon"];

// Fixed reference epoch: 1 Januari 1900 Masehi = Senin Pahing
const EPOCH_DATE = new Date(1900, 0, 1);
const EPOCH_PASARAN_INDEX = 1; // Pahing

export function getJawaDate(date: Date = new Date()): JawaDateInfo {
  const dayIndex = date.getDay();
  const dinoJawa = DINO_LIST[dayIndex];

  // Calculate difference in days from epoch
  const timeDiff = date.getTime() - EPOCH_DATE.getTime();
  const diffDays = Math.floor(timeDiff / (1000 * 3600 * 24));

  const pasaranIndex = (EPOCH_PASARAN_INDEX + (diffDays % 5) + 5) % 5;
  const pasaran = PASARAN_LIST[pasaranIndex];
  const weton = `${dinoJawa} ${pasaran}`;

  // Simple Hijri calculation estimation
  const hijriYear = Math.floor((diffDays - 428) / 354.36) + 1318;
  const hijriMonths = ["Muharram", "Safar", "Rabiul Awal", "Rabiul Akhir", "Jumadil Awal", "Jumadil Akhir", "Rajab", "Sya'ban", "Ramadhan", "Syawal", "Zulqa'dah", "Zulhijjah"];
  const dayInYear = (diffDays - 428) % 354;
  const monthIdx = Math.min(11, Math.floor(dayInYear / 29.5));
  const hijriDay = Math.max(1, Math.floor(dayInYear % 29.5) + 1);

  const hijriStr = `${hijriDay} ${hijriMonths[monthIdx]} ${hijriYear} H`;

  const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" };
  const gregorianStr = date.toLocaleDateString("id-ID", options);

  const fullJawaStr = `${weton}, ${hijriStr} (${gregorianStr} M)`;

  return {
    gregorianStr,
    hijriStr,
    dinoJawa,
    pasaran,
    weton,
    fullJawaStr,
  };
}
