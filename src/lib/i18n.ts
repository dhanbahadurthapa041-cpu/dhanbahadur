export type Lang = "en" | "ne";

export const STRINGS = {
  en: {
    navHome: "Home",
    navAbout: "About",
    navBlog: "Blog",
    navDownloads: "Books & Fonts",
    tagline: "Principal, Shree Bhawani Secondary School",
    heroTitle: "Dhan Bahadur Thapa",
    heroSubtitle:
      "Study materials, writings, and useful resources for students, teachers, and parents.",
    readBlog: "Read the blog",
    getResources: "Get books & fonts",
    latestPosts: "Latest posts",
    viewAll: "View all",
    aboutTitle: "About me",
    blogTitle: "Blog",
    downloadsTitle: "Books & Fonts",
    booksSection: "Books & study materials",
    fontsSection: "Fonts",
    download: "Download",
    comingSoon: "Coming soon",
    backHome: "← Home",
    backBlog: "← All posts",
    footerNote: "Personal website. For official school notices, visit the school website.",
  },
  ne: {
    navHome: "गृहपृष्ठ",
    navAbout: "बारेमा",
    navBlog: "ब्लग",
    navDownloads: "पुस्तक र फन्ट",
    tagline: "प्रधानाध्यापक, श्री भवानी माध्यमिक विद्यालय",
    heroTitle: "धन बहादुर थापा",
    heroSubtitle:
      "विद्यार्थी, शिक्षक र अभिभावकका लागि अध्ययन सामग्री, लेखहरू र उपयोगी स्रोतहरू।",
    readBlog: "ब्लग पढ्नुहोस्",
    getResources: "पुस्तक र फन्ट लिनुहोस्",
    latestPosts: "नयाँ लेखहरू",
    viewAll: "सबै हेर्नुहोस्",
    aboutTitle: "मेरो बारेमा",
    blogTitle: "ब्लग",
    downloadsTitle: "पुस्तक र फन्ट",
    booksSection: "पुस्तक र अध्ययन सामग्री",
    fontsSection: "फन्टहरू",
    download: "डाउनलोड",
    comingSoon: "छिट्टै आउँदैछ",
    backHome: "← गृहपृष्ठ",
    backBlog: "← सबै लेख",
    footerNote: "व्यक्तिगत वेबसाइट। आधिकारिक विद्यालय सूचनाका लागि विद्यालयको वेबसाइट हेर्नुहोस्।",
  },
} as const;

export type Strings = (typeof STRINGS)[Lang];
