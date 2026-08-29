export interface JadwalSholatDetail {
  city: string;
  nextPrayerName: string;
  nextPrayerTime: string;
  countdownStr: string; // HH:MM:SS format
}

export function getJadwalSholatLive(date: Date = new Date(), city: string = "Surabaya"): JadwalSholatDetail {
  // Accurate prayer schedule for Surabaya (WIB)
  const times: Record<string, { subuh: string; dzuhur: string; ashar: string; maghrib: string; isya: string }> = {
    Surabaya: {
      subuh: "04:22",
      dzuhur: "11:38",
      ashar: "14:58",
      maghrib: "17:34",
      isya: "18:44",
    },
    Jakarta: {
      subuh: "04:38",
      dzuhur: "11:57",
      ashar: "15:16",
      maghrib: "17:56",
      isya: "19:06",
    },
  };

  const schedule = times[city] || times["Surabaya"];

  const parseToSeconds = (timeStr: string) => {
    const [h, m] = timeStr.split(":").map(Number);
    return h * 3600 + m * 60;
  };

  const nowSeconds = date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds();

  const prayers = [
    { name: "Subuh", time: schedule.subuh, secs: parseToSeconds(schedule.subuh) },
    { name: "Dzuhur", time: schedule.dzuhur, secs: parseToSeconds(schedule.dzuhur) },
    { name: "Ashar", time: schedule.ashar, secs: parseToSeconds(schedule.ashar) },
    { name: "Maghrib", time: schedule.maghrib, secs: parseToSeconds(schedule.maghrib) },
    { name: "Isya", time: schedule.isya, secs: parseToSeconds(schedule.isya) },
  ];

  let next = prayers.find((p) => p.secs > nowSeconds);
  let diffSecs = 0;

  if (next) {
    diffSecs = next.secs - nowSeconds;
  } else {
    // Tomorrow Subuh
    next = { name: "Subuh", time: schedule.subuh, secs: parseToSeconds(schedule.subuh) + 24 * 3600 };
    diffSecs = next.secs - nowSeconds;
  }

  const hours = Math.floor(diffSecs / 3600);
  const minutes = Math.floor((diffSecs % 3600) / 60);
  const seconds = diffSecs % 60;

  const pad = (n: number) => n.toString().padStart(2, "0");
  const countdownStr = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;

  return {
    city,
    nextPrayerName: next.name,
    nextPrayerTime: next.time,
    countdownStr,
  };
}
