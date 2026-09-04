import SectionIndex from "@/components/SectionIndex";
import { getServerLang } from "@/lib/lang-server";

export default async function GrammarIndex() {
  const lang = await getServerLang();
  return <SectionIndex section="grammar" lang={lang} />;
}
