"use client"
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { useState, useRef, useEffect } from "react";

const LANGUAGES = [
  { code: "en", key: "en" },
  { code: "hi", key: "hi" },
  { code: "fr", key: "fr" },
] as const;

export function LanguageSwitcher() {
  const t = useTranslations("language");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // const switchLocale = (newLocale: string) => {
  //   router.push(pathname, { locale: newLocale });
  //   setOpen(false);
  // };
  const switchLocale = (newLocale: string) => {

    window.location.href = `/${newLocale}${pathname}`;
    setOpen(false);
  };
  const current = LANGUAGES.find(l => l.code === locale) ?? LANGUAGES[0];

  return (
    <div className="relative" ref={ref}>
      {/* Trigger */}
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 px-3 py-2 rounded-md border border-border bg-background text-sm text-foreground hover:bg-muted transition-colors"
        aria-label={t("label")}
      >
        {/* <span>{current.flag}</span> */}
        <span>{t(current.key)}</span>
        <svg
          className={`w-3 h-3 text-muted-foreground shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-1.5 w-40 bg-card border border-border rounded-lg shadow-xl z-[999] overflow-hidden py-1">
          {LANGUAGES.map(lang => (
            <button
              key={lang.code}
              onClick={() => switchLocale(lang.code)}
              className={[
                "w-full flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors",
                "hover:bg-accent/10 hover:text-accent",
                locale === lang.code
                  ? "bg-accent/10 text-accent font-semibold"
                  : "text-foreground",
              ].join(" ")}
            >
              {/* <span>{lang.flag}</span> */}
              <span>{t(lang.key)}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
