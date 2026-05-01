import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/60 py-10">
      <div className="mx-auto max-w-7xl px-4 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex items-center gap-3">
          <span className="grid place-items-center h-9 w-9 rounded-xl gradient-primary text-primary-foreground">
            <Sparkles className="h-4 w-4" />
          </span>
          <p className="text-sm text-muted-foreground">
            © 2026 TSFF Holdings Limited. All rights reserved.
          </p>
        </div>
        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">Terms</a>
          <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
          <a href="#" className="hover:text-foreground transition-colors">Cookies</a>
          <a href="#" className="hover:text-foreground transition-colors">Contact</a>
        </nav>
      </div>
    </footer>
  );
}
