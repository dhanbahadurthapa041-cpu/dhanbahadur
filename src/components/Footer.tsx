"use client";

import Link from "next/link";
import { useLang } from "@/lib/lang";
import { SCHOOL_URL, FACEBOOK_URL, LOOMA_URL } from "@/lib/site";

export default function Footer() {
  const { t } = useLang();
  const showFacebook = FACEBOOK_URL.startsWith("http");

  return (
    <footer className="mt-0 border-t border-brass/25 bg-choc text-cream transition-colors">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Identity */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-brass" />
              <h2 className="font-display text-xl font-semibold tracking-tight text-cream">
                {t.siteOwner}
              </h2>
            </div>
            <p className="mt-2.5 text-xs uppercase tracking-[0.16em] text-brass">
              {t.tagline}
            </p>
            <p className="mt-3.5 max-w-md text-sm leading-relaxed text-cream/70">
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
                <Link href="/pub" className="transition hover:text-mint">
                  {t.navPub}
                </Link>
              </li>
              <li>
                <Link href="/writing" className="transition hover:text-mint">
                  {t.navWriting}
                </Link>
              </li>
              <li>
                <Link href="/grammar" className="transition hover:text-mint">
                  {t.navGrammar}
                </Link>
              </li>
              <li>
                <Link href="/class-10" className="transition hover:text-mint">
                  {t.navClass10}
                </Link>
              </li>
              <li>
                <Link href="/class-12" className="transition hover:text-mint">
                  {t.navClass12}
                </Link>
              </li>
              <li>
                <Link href="/about" className="transition hover:text-mint">
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
                  className="inline-flex items-center gap-1.5 transition hover:text-mint"
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
                  className="inline-flex items-center gap-1.5 transition hover:text-mint"
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
                    className="inline-flex items-center gap-1.5 transition hover:text-mint"
                  >
                    <span>{t.navFacebook}</span>
                    <span aria-hidden="true" className="text-xs text-brass">↗</span>
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-cream/10 pt-6 flex flex-col gap-3 text-xs text-cream/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {t.siteOwner}. All rights reserved.</p>
          <p className="max-w-md">{t.footerNote}</p>
        </div>
      </div>
    </footer>
  );
}
