import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "nl"],
  defaultLocale: "en",
  localePrefix: "as-needed", // English at /, Dutch at /nl
});
