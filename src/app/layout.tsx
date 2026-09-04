import type { Metadata } from "next";
import { Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/lib/lang";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const nepali = Noto_Sans_Devanagari({ subsets: ["devanagari", "latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Dhan Bahadur Thapa | धन बहादुर थापा",
  description: "Study materials, writings, books and fonts.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ne">
      <body className={`${nepali.className} bg-white text-zinc-900 antialiased dark:bg-zinc-950 dark:text-zinc-100`}>
        <LangProvider>
          <Header />
          <main className="mx-auto max-w-3xl px-4 py-8">{children}</main>
          <Footer />
        </LangProvider>
      </body>
    </html>
  );
}
