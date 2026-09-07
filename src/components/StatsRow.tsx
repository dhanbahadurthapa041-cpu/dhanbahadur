"use client";

import { useLang } from "@/lib/lang";
import CountUp from "./CountUp";

export default function StatsRow() {
  const { lang, t } = useLang();
  const isNe = lang === "ne";

  const stats = [
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
      featured: true,
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
    <div className="w-full rounded-2xl border border-[#E5DCCB] bg-[#fffdf8] shadow-[0_4px_20px_-8px_rgba(47,42,37,0.06)] dark:border-white/10 dark:bg-choc-elevated dark:shadow-none">
      <div className="grid grid-cols-1 divide-y divide-[#E5DCCB] sm:grid-cols-2 sm:divide-y-0 sm:divide-x lg:grid-cols-4 dark:divide-white/10">
        {stats.map((stat, i) => (
          <div
            key={i}
            className={`flex flex-col justify-between p-6 text-center sm:p-7 md:p-8 ${
              stat.featured ? "bg-brass/5 dark:bg-brass/[0.03]" : ""
            }`}
          >
            <div>
              <p
                className={`font-display font-semibold tracking-tight ${
                  stat.featured
                    ? "text-4xl sm:text-5xl text-pine dark:text-mint"
                    : "text-3xl sm:text-4xl text-maroon dark:text-clay"
                }`}
              >
                <CountUp
                  end={stat.num}
                  suffix={stat.suffix}
                  fallbackText={stat.fallbackText}
                  accessibleLabel={stat.accessible}
                  isNepali={isNe}
                />
              </p>
              <h3 className="mt-2.5 font-display text-base font-medium text-ink dark:text-cream">
                {stat.label}
              </h3>
            </div>
            <p className="mt-1.5 text-xs text-ink/60 dark:text-cream/60">
              {stat.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
