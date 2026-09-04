import SectionIndex from "@/components/SectionIndex";
import { getServerLang } from "@/lib/lang-server";

export default async function Class10Index() {
  const lang = await getServerLang();
  return <SectionIndex section="class-10" lang={lang} />;
}
