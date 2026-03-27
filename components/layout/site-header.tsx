import Link from "next/link";
import { ArrowUpRight, Zap } from "lucide-react";

const navItems = [
  { href: "#about", label: "About" },
  { href: "#themes", label: "Themes" },
  { href: "#requirements", label: "Requirements" },
  { href: "#updates", label: "Updates" },
];

export function SiteHeader() {
  return (
    <header className="border-border/80 bg-card border-b">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold tracking-tight"
        >
          <Zap className="text-accent-yellow size-4" aria-hidden="true" />
          NextGen Energy Innovators
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="#register"
          className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-9 items-center gap-1.5 rounded-md px-3 text-sm font-medium transition-colors"
        >
          Register
          <ArrowUpRight className="size-3.5" aria-hidden="true" />
        </Link>
      </div>
    </header>
  );
}
