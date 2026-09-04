import { headers } from "next/headers";
import type { Lang } from "./i18n";

/** Language for server components (client stores choice in localStorage `dbt-lang`,
 *  mirrored to a cookie by the language toggle, falling back to the cookie
 *  when present, otherwise English default). */
export async function getServerLang(): Promise<Lang> {
  const h = await headers();
  const cookie = h.get("cookie") ?? "";
  return cookie.includes("dbt-lang=ne") ? "ne" : "en";
}
