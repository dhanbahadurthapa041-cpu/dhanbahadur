export interface DownloadItem {
  titleEn: string;
  titleNe: string;
  /** Path under /downloads, or null until the file is uploaded. */
  file: string | null;
  noteEn?: string;
  noteNe?: string;
}

// Father: to publish a book/font, drop the file into public/downloads/
// and set `file` to its name below. Leave `file: null` for "coming soon".
export const BOOKS: DownloadItem[] = [
  {
    titleEn: "Sample study guide (replace me)",
    titleNe: "नमुना अध्ययन सामग्री (यसलाई बदल्नुहोस्)",
    file: null,
    noteEn: "Upload a PDF to public/downloads and point file at it.",
    noteNe: "PDF public/downloads मा राखेर file मा नाम लेख्नुहोस्।",
  },
];

export const FONTS: DownloadItem[] = [
  {
    titleEn: "Sample Nepali font (replace me)",
    titleNe: "नमुना नेपाली फन्ट (यसलाई बदल्नुहोस्)",
    file: null,
    noteEn: "Upload a .ttf/.otf to public/downloads and point file at it.",
    noteNe: ".ttf/.otf public/downloads मा राखेर file मा नाम लेख्नुहोस्।",
  },
];
