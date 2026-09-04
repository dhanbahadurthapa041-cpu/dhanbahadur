import SectionIndex from "@/components/SectionIndex";
import { getServerLang } from "@/lib/lang-server";

export default async function Class12Index() {
  const lang = await getServerLang();
  return <SectionIndex section="class-12" lang={lang} />;
}
