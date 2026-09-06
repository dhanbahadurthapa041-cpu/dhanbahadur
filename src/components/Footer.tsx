"use client";

import { useLang } from "@/lib/lang";
import { SCHOOL_URL, FACEBOOK_URL, LOOMA_URL } from "@/lib/site";

export default function Footer() {
  const { t } = useLang();
  const showFacebook = FACEBOOK_URL.startsWith("http");
  return (
    <footer className="mt-16 border-t border-ink/15 dark:border-cream/15">
      <div className="mx-auto max-w-4xl px-4 py-6 text-center text-xs text-ink/60 dark:text-cream/60">
        <p>© {new Date().getFullYear()} {t.siteOwner}</p>
        <p className="mt-1">
          <a href={SCHOOL_URL} target="_blank" rel="noreferrer" className="underline decoration-brass/70 underline-offset-2 hover:text-pine dark:hover:text-mint">
            {t.navSchool}
          </a>
          {showFacebook && (
            <>
              {" · "}
              <a href={FACEBOOK_URL} target="_blank" rel="noreferrer" className="underline decoration-brass/70 underline-offset-2 hover:text-pine dark:hover:text-mint">
                {t.navFacebook}
              </a>
            </>
          )}
          {" · "}
          <a href={LOOMA_URL} target="_blank" rel="noreferrer" className="underline decoration-brass/70 underline-offset-2 hover:text-pine dark:hover:text-mint">
            {t.navLooma}
          </a>
        </p>
        <p className="mt-1">{t.footerNote}</p>
      </div>
    </footer>
  );
}
