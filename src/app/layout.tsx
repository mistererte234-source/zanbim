import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "ZanBimbel v3 — Adaptive Bimbel AI UTBK & CPNS",
  description: "Bukan bank soal. Bukan tryout random. ZanBimbel mengukur posisi kamu vs target, mencari tahu kenapa masih jauh, lalu kasih latihan + cara penyelesaian sampai kemampuan itu ketutup.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="dark">
      <body className="min-h-screen flex flex-col bg-[#09090B] text-zinc-100 antialiased">
        <Navbar />
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
