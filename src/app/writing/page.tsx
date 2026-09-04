import SectionIndex from "@/components/SectionIndex";
import { getServerLang } from "@/lib/lang-server";

export default async function WritingIndex() {
  const lang = await getServerLang();
  return <SectionIndex section="writing" lang={lang} />;
}
