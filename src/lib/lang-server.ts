import { cookies } from "next/headers";
import type { Lang } from "./i18n";

/** Language for server components (client stores choice in localStorage `dbt-lang`,
 *  mirrored to a `dbt-lang` cookie by the language toggle; English default). */
export async function getServerLang(): Promise<Lang> {
  const jar = await cookies();
  return jar.get("dbt-lang")?.value === "ne" ? "ne" : "en";
}
