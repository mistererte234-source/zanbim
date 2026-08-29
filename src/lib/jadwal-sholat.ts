export interface JadwalSholatInfo {
  subuh: string;
  terbit: string;
  dzuhur: string;
  ashar: string;
  maghrib: string;
  isya: string;
  nextPrayerName: string;
  nextPrayerTime: string;
  remainingTimeStr: string;
}

export function getJadwalSholat(date: Date = new Date()): JadwalSholatInfo {
  // Default accurate prayer times for Jakarta/WIB
  const jadwal = {
    subuh: "04:38",
    terbit: "05:52",
    dzuhur: "11:57",
    ashar: "15:16",
    maghrib: "17:56",
    isya: "19:06",
  };

  const nowMinutes = date.getHours() * 60 + date.getMinutes();

  const parseMinutes = (timeStr: string) => {
    const [h, m] = timeStr.split(":").map(Number);
    return h * 60 + m;
  };

  const prayers = [
    { name: "Subuh", timeStr: jadwal.subuh, mins: parseMinutes(jadwal.subuh) },
    { name: "Terbit", timeStr: jadwal.terbit, mins: parseMinutes(jadwal.terbit) },
    { name: "Dzuhur", timeStr: jadwal.dzuhur, mins: parseMinutes(jadwal.dzuhur) },
    { name: "Ashar", timeStr: jadwal.ashar, mins: parseMinutes(jadwal.ashar) },
    { name: "Maghrib", timeStr: jadwal.maghrib, mins: parseMinutes(jadwal.maghrib) },
    { name: "Isya", timeStr: jadwal.isya, mins: parseMinutes(jadwal.isya) },
  ];

  let next = prayers.find((p) => p.mins > nowMinutes);
  if (!next) {
    next = { name: "Subuh (Besok)", timeStr: jadwal.subuh, mins: parseMinutes(jadwal.subuh) + 24 * 60 };
  }

  const diffMins = next.mins - nowMinutes;
  const hRem = Math.floor(diffMins / 60);
  const mRem = diffMins % 60;
  const remainingTimeStr = hRem > 0 ? `${hRem}j ${mRem}m` : `${mRem} mnt`;

  return {
    ...jadwal,
    nextPrayerName: next.name,
    nextPrayerTime: next.timeStr,
    remainingTimeStr,
  };
}
