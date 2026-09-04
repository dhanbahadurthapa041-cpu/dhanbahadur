"use client";

import Link from "next/link";
import { useLang } from "@/lib/lang";

export default function About() {
  const { lang, t } = useLang();
  return (
    <article>
      <Link href="/" className="text-sm text-emerald-700 dark:text-emerald-300">{t.backHome}</Link>
      <h1 className="mt-2 text-3xl font-bold">{t.aboutTitle}</h1>
      {lang === "ne" ? (
        <div className="prose mt-4 space-y-4 dark:prose-invert">
          <p>
            नमस्ते! म धन बहादुर थापा — श्री भवानी माध्यमिक विद्यालयको प्रधानाध्यापक।
            (यो परिचय बुबाले आफ्नै शब्दमा भर्न बाँकी छ।)
          </p>
          <p>यहाँ मेरा लेखहरू, अध्ययन सामग्रीहरू, पुस्तक र फन्टहरू भेटिनेछन्।</p>
        </div>
      ) : (
        <div className="prose mt-4 space-y-4 dark:prose-invert">
          <p>
            Hello! I am Dhan Bahadur Thapa — Head Teacher of Shree Bhawani Secondary School.
            (Father to fill in his own bio here.)
          </p>
          <p>Here you will find my writings, study materials, books and fonts.</p>
        </div>
      )}
    </article>
  );
}
