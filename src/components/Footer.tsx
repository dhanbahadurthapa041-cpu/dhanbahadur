"use client";

import Link from "next/link";
import { useLang } from "@/lib/lang";
import { SCHOOL_URL, FACEBOOK_URL, LOOMA_URL, OFFICE_PHONE_HREF } from "@/lib/site";

export default function Footer() {
  const { t, lang } = useLang();
  const showFacebook = FACEBOOK_URL.startsWith("http");

  return (
    <footer className="mt-0 border-t-0 bg-choc text-cream transition-colors motion-reduce:transition-none">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Identity */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2">
              <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-brass" />
              <h2 className={`brand-mark font-display text-xl font-semibold text-cream ${lang === "en" ? "tracking-tight" : "tracking-normal"}`}>
                {t.siteOwner}
              </h2>
            </div>
            <p className="footer-tagline mt-2.5 text-xs uppercase tracking-[0.16em] text-brass">
              {t.tagline}
            </p>
            <p className="mt-3.5 max-w-sm text-sm leading-relaxed text-cream/70">
              {t.heroSubtitle}
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-[0.15em] text-brass">
              {t.navMenu}
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-cream/80">
              <li>
                <Link href="/" className="inline-flex min-h-[44px] items-center transition motion-reduce:transition-none hover:text-mint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint">
                  {t.navHome}
                </Link>
              </li>
              <li>
                <Link href="/pub" className="inline-flex min-h-[44px] items-center transition motion-reduce:transition-none hover:text-mint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint">
                  {t.navPub}
                </Link>
              </li>
              <li>
                <Link href="/writing" className="inline-flex min-h-[44px] items-center transition motion-reduce:transition-none hover:text-mint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint">
                  {t.navWriting}
                </Link>
              </li>
              <li>
                <Link href="/grammar" className="inline-flex min-h-[44px] items-center transition motion-reduce:transition-none hover:text-mint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint">
                  {t.navGrammar}
                </Link>
              </li>
              <li>
                <Link href="/class-10" className="inline-flex min-h-[44px] items-center transition motion-reduce:transition-none hover:text-mint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint">
                  {t.navClass10}
                </Link>
              </li>
              <li>
                <Link href="/class-12" className="inline-flex min-h-[44px] items-center transition motion-reduce:transition-none hover:text-mint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint">
                  {t.navClass12}
                </Link>
              </li>
              <li>
                <Link href="/about" className="inline-flex min-h-[44px] items-center transition motion-reduce:transition-none hover:text-mint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint">
                  {t.navAbout}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Institutional Links */}
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-[0.15em] text-brass">
              {t.schoolLeadershipTitle}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-cream/80">
              <li>
                <a
                  href={SCHOOL_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-[44px] items-center gap-1.5 transition motion-reduce:transition-none hover:text-mint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint"
                >
                  <span>{t.navSchool}</span>
                  <span aria-hidden="true" className="text-xs text-brass">↗</span>
                </a>
              </li>
              <li>
                <a
                  href={LOOMA_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-[44px] items-center gap-1.5 transition motion-reduce:transition-none hover:text-mint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint"
                >
                  <span>{t.navLooma}</span>
                  <span aria-hidden="true" className="text-xs text-brass">↗</span>
                </a>
              </li>
              {showFacebook && (
                <li>
                  <a
                    href={FACEBOOK_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-[44px] items-center gap-1.5 transition motion-reduce:transition-none hover:text-mint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint"
                  >
                    <span>{t.navFacebook}</span>
                    <span aria-hidden="true" className="text-xs text-brass">↗</span>
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Column 4: Contact & Office */}
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-[0.15em] text-brass">
              {t.contactTitle}
            </h3>
            <div className="mt-4 space-y-3 text-sm text-cream/80">
              <p className="leading-snug text-cream/70">
                {t.tagline}
              </p>
              <div>
                <a
                  href={OFFICE_PHONE_HREF}
                  className="inline-flex min-h-[44px] items-center gap-2 text-cream/90 transition motion-reduce:transition-none hover:text-mint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint"
                  aria-label={t.callOfficeLabel}
                >
                  <svg
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 text-brass"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.75}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                    />
                  </svg>
                  <span>{t.officePhoneDisplay}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-cream/10 pt-6 flex flex-col gap-3 text-xs text-cream/60 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-4">
            <p>© {new Date().getFullYear()} {t.siteOwner}. All rights reserved.</p>
            <span aria-hidden="true" className="text-cream/30">•</span>
            <Link
              href="/sitemap.xml"
              className="text-cream/70 underline underline-offset-2 transition motion-reduce:transition-none hover:text-mint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint"
            >
              {t.sitemapLink}
            </Link>
          </div>
          <p className="max-w-md">{t.footerNote}</p>
        </div>
      </div>
    </footer>
  );
}
