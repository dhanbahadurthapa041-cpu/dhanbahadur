export type PubCategory = "textbooks" | "syllabus" | "guides" | "grid";

export const PUB_CATEGORIES: PubCategory[] = ["textbooks", "syllabus", "guides", "grid"];

export interface PubItem {
  titleEn: string;
  titleNe: string;
  /** Path under /downloads, or null until the file is uploaded. */
  file: string | null;
  category: PubCategory;
  noteEn?: string;
  noteNe?: string;
}

// Owner: to publish a file, drop it into public/downloads/
// and set `file` to its name below. Leave `file: null` for "coming soon".
export const PUB_ITEMS: PubItem[] = [
  {
    titleEn: "Class 10 Social Studies textbook (coming soon)",
    titleNe: "कक्षा १० सामाजिक पाठ्यपुस्तक (छिट्टै आउँदैछ)",
    file: null,
    category: "textbooks",
    noteEn: "Upload the PDF to public/downloads and point file at it.",
    noteNe: "PDF public/downloads मा राखेर file मा नाम लेख्नुहोस्।",
  },
  {
    titleEn: "Class 10 Social Studies syllabus (coming soon)",
    titleNe: "कक्षा १० सामाजिक पाठ्यक्रम (छिट्टै आउँदैछ)",
    file: null,
    category: "syllabus",
    noteEn: "Upload the PDF to public/downloads and point file at it.",
    noteNe: "PDF public/downloads मा राखेर file मा नाम लेख्नुहोस्।",
  },
  {
    titleEn: "Teacher's guide for Social Studies (coming soon)",
    titleNe: "सामाजिक शिक्षक निर्देशिका (छिट्टै आउँदैछ)",
    file: null,
    category: "guides",
    noteEn: "Upload the PDF to public/downloads and point file at it.",
    noteNe: "PDF public/downloads मा राखेर file मा नाम लेख्नुहोस्।",
  },
  {
    titleEn: "Specification grid / blueprint (coming soon)",
    titleNe: "विशिष्टता तालिका / ग्रिड (छिट्टै आउँदैछ)",
    file: null,
    category: "grid",
    noteEn: "Upload the PDF to public/downloads and point file at it.",
    noteNe: "PDF public/downloads मा राखेर file मा नाम लेख्नुहोस्।",
  },
];
