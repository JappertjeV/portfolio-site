"use client";

import { usePathname, Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navigation() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "/#about", label: t("about") },
    { href: "/#projects", label: t("projects") },
    { href: "/#skills", label: t("skills") },
    { href: "/#contact", label: t("contact") },
    { href: "/projects", label: t("github") },
    { href: "/blog", label: t("blog") },
  ] as const;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/60"
          : "bg-transparent"
      )}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-semibold text-lg text-zinc-100 hover:text-indigo-400 transition-colors"
        >
          JV<span className="text-indigo-500">.</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  pathname === href
                    ? "text-indigo-400 bg-indigo-500/10"
                    : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60"
                )}
              >
                {label}
              </Link>
            </li>
          ))}

          {/* Language switcher */}
          <li className="ml-2 flex items-center gap-1 border-l border-zinc-700 pl-3">
            <Link
              href={pathname}
              locale="en"
              className={cn(
                "px-2 py-1 rounded text-xs font-mono font-semibold transition-colors",
                locale === "en"
                  ? "text-indigo-400 bg-indigo-500/10"
                  : "text-zinc-500 hover:text-zinc-300"
              )}
            >
              EN
            </Link>
            <span className="text-zinc-700 text-xs">/</span>
            <Link
              href={pathname}
              locale="nl"
              className={cn(
                "px-2 py-1 rounded text-xs font-mono font-semibold transition-colors",
                locale === "nl"
                  ? "text-indigo-400 bg-indigo-500/10"
                  : "text-zinc-500 hover:text-zinc-300"
              )}
            >
              NL
            </Link>
          </li>
        </ul>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-md text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800">
          <ul className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-1">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-sm font-medium text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
            {/* Mobile language switcher */}
            <li className="flex items-center gap-2 px-3 py-2 mt-1 border-t border-zinc-800 pt-3">
              <span className="text-zinc-600 text-xs font-mono">LANG</span>
              <Link
                href={pathname}
                locale="en"
                onClick={() => setMenuOpen(false)}
                className={cn(
                  "px-2 py-1 rounded text-xs font-mono font-semibold transition-colors",
                  locale === "en"
                    ? "text-indigo-400 bg-indigo-500/10"
                    : "text-zinc-500 hover:text-zinc-300"
                )}
              >
                EN
              </Link>
              <Link
                href={pathname}
                locale="nl"
                onClick={() => setMenuOpen(false)}
                className={cn(
                  "px-2 py-1 rounded text-xs font-mono font-semibold transition-colors",
                  locale === "nl"
                    ? "text-indigo-400 bg-indigo-500/10"
                    : "text-zinc-500 hover:text-zinc-300"
                )}
              >
                NL
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
