import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["en", "hi", "fr"],
  defaultLocale: "en",
});

export const { useRouter, usePathname, redirect, Link } = createNavigation(routing);