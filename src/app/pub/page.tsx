import SectionIndex from "@/components/SectionIndex";
import { getServerLang } from "@/lib/lang-server";

export default async function PubIndex() {
  const lang = await getServerLang();
  return <SectionIndex section="pub" lang={lang} />;
}
