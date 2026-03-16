"use client"
import { useLocale } from "next-intl";
import { usePathname } from "@/i18n/routing";
import { Globe, Check, ChevronDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी" },
  { code: "fr", label: "Français" },
] as const;

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    window.location.href = `/${newLocale}${pathname}`;
  };

  const current = LANGUAGES.find(l => l.code === locale) ?? LANGUAGES[0];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-2 px-3 py-2 rounded-md border border-border bg-background text-sm text-foreground hover:bg-muted transition-colors">
          <Globe size={15} className="text-muted-foreground" />
          <span>{current.label}</span>
          <ChevronDown size={13} className="text-muted-foreground shrink-0" />
        </button>
      </PopoverTrigger>

      <PopoverContent className="w-40 p-1" align="start">
        {LANGUAGES.map(lang => (
          <button
            key={lang.code}
            onClick={() => switchLocale(lang.code)}
            className={[
              "w-full flex items-center justify-between px-4 py-2.5 text-sm rounded-md transition-colors",
              "hover:bg-accent/10 hover:text-accent",
              locale === lang.code
                ? "bg-accent/10 text-accent font-semibold"
                : "text-foreground",
            ].join(" ")}
          >
            <span>{lang.label}</span>
            {locale === lang.code && <Check size={14} />}
          </button>
        ))}
      </PopoverContent>
    </Popover>
  );
}