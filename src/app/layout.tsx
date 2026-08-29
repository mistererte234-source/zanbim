import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SplashScreen } from "@/components/layout/SplashScreen";
import { BottomTabBar } from "@/components/layout/BottomTabBar";
import { PrayerTimesBottomWidget } from "@/components/layout/PrayerTimesBottomWidget";
import { VisitorTracker } from "@/components/analytics/VisitorTracker";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#09090B",
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://zanbim.vercel.app"),
  title: "ZanBimbel v3 — Enterprise Adaptive Learning & Assessment AI",
  description: "Platform Asesmen Adaptif Multi-Sektor: UTBK SNBT 2026, CPNS SKD, Rekrutmen HRD & Tes IQ, Uji Kelayakan Calon Anggota Dewan RI, & Seleksi Dosen PTN/PTS.",
  keywords: [
    "ZanBimbel",
    "Bimbel AI",
    "UTBK SNBT 2026",
    "CPNS SKD 2026",
    "Tes IQ HRD",
    "Rekrutmen Karyawan",
    "Fit and Proper Test DPR RI",
    "Seleksi Dosen PTN PTS",
    "Adaptive Learning",
  ],
  authors: [{ name: "ZanDev", url: "https://zandev.id" }],
  openGraph: {
    title: "ZanBimbel v3 — Enterprise Adaptive Learning & Assessment AI",
    description: "Bukan bank soal biasa. AI yang mengukur gap kemampuan spesifik & memberikan drill terfokus untuk UTBK, CPNS, Rekrutmen HRD, Dewan RI, & Dosen.",
    url: "https://zanbim.vercel.app",
    siteName: "ZanBimbel v3",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZanBimbel v3 — Enterprise Adaptive Learning & Assessment AI",
    description: "Platform Uji Kompetensi & Asesmen Adaptif Multi-Sektor dengan AI Engine.",
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="dark">
      <body className="min-h-screen flex flex-col bg-[#09090B] text-zinc-100 antialiased selection:bg-indigo-500 selection:text-white">
        <SplashScreen />
        <VisitorTracker />
        <Navbar />
        <main className="flex-1 w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-4 sm:py-6 pb-6">
          {children}
        </main>
        <PrayerTimesBottomWidget />
        <Footer />
        <BottomTabBar />
      </body>
    </html>
  );
}
