import type { Metadata } from "next";
import { Fraunces, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";
import { LangProvider, ThemeProvider } from "@/lib/lang";
import { getServerLang } from "@/lib/lang-server";
import { SITE_URL } from "@/lib/seo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GrainOverlay from "@/components/GrainOverlay";

const nepali = Noto_Sans_Devanagari({
  subsets: ["devanagari", "latin"],
  display: "swap",
  variable: "--font-noto",
});

// Display serif for headings — latin only to keep it light; Nepali glyphs
// fall back to Noto Sans Devanagari.
const display = Fraunces({ subsets: ["latin"], display: "swap", variable: "--font-fraunces" });

const SITE_TITLE = "Dhan Bahadur Thapa | धन बहादुर थापा";
const SITE_DESC =
  "Study materials, writings, books and fonts. / अध्ययन सामग्री, लेख, पुस्तक र फन्टहरू।";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESC,
  alternates: { canonical: "/" },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESC,
    url: "/",
    siteName: "Dhan Bahadur Thapa",
    type: "website",
    images: [{ url: "/images/profile.jpg" }],
  },
  twitter: {
    card: "summary",
    title: SITE_TITLE,
    description: SITE_DESC,
    images: ["/images/profile.jpg"],
  },
};

const WEBSITE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_TITLE,
  description: SITE_DESC,
  url: SITE_URL,
};

// Async so <html lang> follows the `dbt-lang` cookie (ne/en) per request.
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const lang = await getServerLang();
  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{document.documentElement.classList.add('js');var s=localStorage.getItem('dbt-theme');var d=s==='dark'||(!s&&window.matchMedia('(prefers-color-scheme: dark)').matches);if(d){document.documentElement.classList.add('dark');}else{document.documentElement.classList.remove('dark');}}catch(e){}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_JSON_LD) }}
        />
      </head>
      <body className={`${nepali.variable} ${display.variable} bg-paper font-sans text-ink antialiased min-h-screen flex flex-col dark:bg-choc dark:text-cream`}>
        <GrainOverlay />
        <LangProvider initialLang={lang}>
          <ThemeProvider>
            <Header />
            <main className="w-full flex-1">{children}</main>
            <Footer />
          </ThemeProvider>
        </LangProvider>
      </body>
    </html>
  );
}
