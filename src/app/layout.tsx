import type { Metadata } from "next";
import { Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";
import { LangProvider, ThemeProvider } from "@/lib/lang";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const nepali = Noto_Sans_Devanagari({ subsets: ["devanagari", "latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://dbthapa.vercel.app"),
  title: "Dhan Bahadur Thapa | धन बहादुर थापा",
  description: "Study materials, writings, books and fonts. / अध्ययन सामग्री, लेख, पुस्तक र फन्टहरू।",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('dbt-theme');var d=s==='dark'||(!s&&window.matchMedia('(prefers-color-scheme: dark)').matches);if(d){document.documentElement.classList.add('dark');}else{document.documentElement.classList.remove('dark');}}catch(e){}})();`,
          }}
        />
      </head>
      <body className={`${nepali.className} bg-white text-zinc-900 antialiased dark:bg-zinc-950 dark:text-zinc-100`}>
        <LangProvider>
          <ThemeProvider>
            <Header />
            <main className="mx-auto max-w-3xl px-4 py-8">{children}</main>
            <Footer />
          </ThemeProvider>
        </LangProvider>
      </body>
    </html>
  );
}
