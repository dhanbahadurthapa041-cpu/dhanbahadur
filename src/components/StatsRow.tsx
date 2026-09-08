"use client";

import { useLang } from "@/lib/lang";
import CountUp from "./CountUp";

interface StatItem {
  num: number;
  suffix: string;
  fallbackText: string;
  label: string;
  desc: string;
  accessible: string;
  featured: boolean;
  pending?: boolean;
}

export default function StatsRow() {
  const { lang, t } = useLang();
  const isNe = lang === "ne";

  const stats: StatItem[] = [
    {
      num: 30,
      suffix: "+",
      fallbackText: isNe ? "३०+" : "30+",
      label: t.statYearsLabel,
      desc: t.statYearsDesc,
      accessible: isNe ? "३० भन्दा बढी वर्षको शैक्षिक अनुभव" : "Over 30 years in education and leadership",
      featured: false,
    },
    {
      num: 10000,
      suffix: "+",
      fallbackText: isNe ? "१०,०००+" : "10,000+",
      label: t.statStudentsLabel,
      desc: t.statStudentsDesc,
      accessible: isNe ? "१० हजार भन्दा बढी विद्यार्थीहरूलाई मार्गदर्शन" : "Over 10,000 students mentored",
      featured: true, // Exactly one featured hero metric (students guided) per Phase A2 spec
    },
    {
      num: 4,
      suffix: "",
      fallbackText: isNe ? "४" : "4",
      label: t.statPubsLabel,
      desc: t.statPubsDesc,
      accessible: isNe ? "४ वटा पाठ्यक्रम कृति तथा निर्देशिकाहरू" : "4 published curriculum volumes",
      featured: false,
    },
    {
      num: 100,
      suffix: "+",
      fallbackText: isNe ? "१००+" : "100+",
      label: t.statResourcesLabel,
      desc: t.statResourcesDesc,
      accessible: isNe ? "१०० भन्दा बढी पाठ तथा अध्ययन स्रोतहरू" : "Over 100 lesson notes and study guides",
      featured: false,
    },
  ];

  return (
    <div className="w-full">
      {/* Background-Gap-Trick card container */}
      <div className="w-full overflow-hidden rounded-2xl border border-border bg-surface-subtle shadow-[0_4px_20px_-8px_rgba(47,42,37,0.06)] dark:border-white/10 dark:bg-choc-elevated dark:shadow-none print:shadow-none print:border-gray-300">
        <div className="stats-grid grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-4 dark:bg-white/10 print:grid-cols-2 print:bg-gray-300">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`flex flex-col justify-between p-6 text-center sm:p-7 md:p-8 print:p-4 print:bg-white print:text-black print:break-inside-avoid ${
                stat.featured
                  ? "bg-parchment ring-1 ring-inset ring-brass/30 shadow-[inset_0_4px_0_0_rgba(201,178,124,0.7)] dark:bg-brass/[0.10] dark:ring-brass-dark/20 dark:shadow-[inset_0_4px_0_0_rgba(232,213,160,0.5)]"
                  : "bg-surface-subtle dark:bg-choc-elevated"
              }`}
            >
              {stat.pending ? (
                <div>
                  <span className={`badge-leak-guard inline-block rounded-full bg-brass/25 dark:bg-brass/20 px-2 py-0.5 text-[10px] font-semibold text-ink/70 dark:text-cream/70 mb-2 ${isNe ? "tracking-normal" : "uppercase tracking-[0.18em]"}`}>
                    {isNe ? `पुष्टि हुन बाँकी: ${stat.label}` : `TODO(father): confirm ${stat.label}`}
                  </span>
                  <p className={`font-display font-semibold text-4xl sm:text-5xl tabular-nums text-ink/30 dark:text-cream/25 print:text-black/40 ${isNe ? "tracking-normal" : "tracking-tight"}`}>
                    <span aria-hidden="true">––</span>
                    <span className="sr-only" role="status" aria-live="polite">
                      {isNe
                        ? `तथ्याङ्क पुष्टि हुन बाँकी: ${stat.label}`
                        : `Statistic pending confirmation: ${stat.label}`}
                    </span>
                  </p>
                  <h3 className="mt-2.5 font-display text-base font-medium text-ink dark:text-cream print:text-black">
                    {stat.label}
                  </h3>
                </div>
              ) : (
                <div>
                  {stat.featured && (
                    <p className={`mb-2 text-[11px] font-semibold text-pine/80 dark:text-mint/80 ${isNe ? "tracking-normal" : "uppercase tracking-[0.14em]"}`}>
                      {isNe ? "★ मुख्य तथ्याङ्क" : "★ Hero metric"}
                    </p>
                  )}
                  <p
                    className={`font-display ${
                      stat.featured ? "font-semibold" : "font-medium dark:font-normal"
                    } ${
                      isNe ? "tracking-normal" : "tracking-tight [font-variant-numeric:lining-nums_tabular-nums]"
                    } ${
                      stat.featured
                        ? "text-5xl sm:text-6xl text-pine dark:text-mint print:text-black"
                        : "text-3xl sm:text-4xl text-maroon dark:text-clay print:text-black"
                    }`}
                  >
                    <CountUp
                      end={stat.num}
                      suffix={stat.suffix}
                      fallbackText={stat.fallbackText}
                      accessibleLabel={stat.accessible}
                      isNepali={isNe}
                      duration={stat.num <= 100 ? 700 : stat.num <= 1000 ? 900 : 1100}
                      delayMs={(i % 4) * 90}
                    />
                  </p>
                  <h3 className="mt-2.5 font-display text-base font-medium text-ink dark:text-cream print:text-black">
                    {stat.label}
                  </h3>
                  {stat.featured && (
                    <span aria-hidden="true" className="mx-auto mt-3 block h-px w-10 bg-brass/60 dark:bg-brass-dark/40" />
                  )}
                </div>
              )}
              <p className={`mt-1.5 text-xs dark:text-cream/75 print:text-gray-600 ${isNe ? "leading-relaxed text-ink/70" : "leading-4 text-ink/70"}`}>
                {stat.pending
                  ? isNe
                    ? "अङ्क पुष्टि हुन बाँकी — अस्थायी, प्रकाशित होइन।"
                    : "Figure to be confirmed — placeholder, not yet published."
                  : stat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Proof-chain caption line under the row (Innocence Project / Sopact standard) */}
      <p className={`mt-3 text-center text-xs leading-relaxed text-ink/70 dark:text-cream/70 print:text-black/60 ${isNe ? "tracking-normal" : "tracking-wide"}`}>
        {t.statProofCaption}
      </p>
    </div>
  );
}
