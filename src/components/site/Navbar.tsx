import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Sparkles, Menu, X, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/#features", label: "Features" },
  { href: "/#templates", label: "Templates" },
  { href: "/#process", label: "How it works" },
  { href: "/#faq", label: "FAQ" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4">
        <nav
          className={`flex items-center justify-between rounded-2xl px-4 md:px-6 py-3 transition-all ${
            scrolled ? "glass shadow-card" : ""
          }`}
        >
          <Link to="/" className="flex items-center gap-2 font-display font-bold text-lg">
            <span className="grid place-items-center h-9 w-9 rounded-xl gradient-primary text-primary-foreground shadow-soft">
              <Sparkles className="h-5 w-5" />
            </span>
            ResumAI
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setDark((v) => !v)}
              className="h-9 w-9 grid place-items-center rounded-xl hover:bg-muted transition-colors"
              aria-label="Toggle theme"
            >
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <Link to="/analyze" className="hidden sm:block">
              <Button variant="hero" size="sm">Try Analyzer</Button>
            </Link>
            <button
              className="md:hidden h-9 w-9 grid place-items-center rounded-xl hover:bg-muted"
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {open && (
          <div className="md:hidden mt-2 glass rounded-2xl p-4 flex flex-col gap-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
            <Link to="/analyze" onClick={() => setOpen(false)}>
              <Button variant="hero" size="sm" className="w-full">Try Analyzer</Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
