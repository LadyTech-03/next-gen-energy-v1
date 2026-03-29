import {
  BrainCircuit,
  Database,
  Gauge,
  Route,
  Smartphone,
  Wrench,
  type LucideIcon,
} from "lucide-react";

import { SectionHeading } from "@/components/sections/section-heading";
import { type ThemeItem, getChallengeThemes } from "@/data/themes";
import { cn } from "@/lib/utils";

import { trackEvent } from '@/lib/analytics';

type ThemesSectionProps = {
  year?: number;
  items?: ThemeItem[];
};

const themeIcons: Record<ThemeItem["icon"], LucideIcon> = {
  route: Route,
  wrench: Wrench,
  gauge: Gauge,
  database: Database,
  brain: BrainCircuit,
  smartphone: Smartphone,
};

function formatThemeNumber(index: number) {
  return String(index + 1).padStart(2, "0");
}

export function ThemesSection({ year = 2026, items }: ThemesSectionProps) {
  const themes = items ?? getChallengeThemes(year);

  return (
    <section
      id="themes"
      className="border-primary-700/60 from-primary-900 via-primary-700 to-primary-900 scroll-mt-24 border-b bg-linear-to-b"
    >
      <div className="mx-auto w-full max-w-7xl px-6 py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:sticky lg:top-24 lg:col-span-4 lg:self-start">
            <SectionHeading
              title={`Challenge Themes ${year}`}
              description=""
              width="full"
              tone="inverted"
            />
            <ol className="mt-8 space-y-2 border-l border-white/25 pl-4 text-sm text-white/70">
              {themes.map((theme, index) => (
                <li key={theme.id}>
                  <a
                    href={`#theme-${theme.id}`}
                    className="transition-colors hover:text-white focus-visible:text-white focus-visible:outline-none"
                    onClick={() => { trackEvent('theme_navigation', { Link: theme.title}) }}
                  >
                    {formatThemeNumber(index)}. {theme.title}
                  </a>
                </li>
              ))}
            </ol>
          </div>

          <div className="lg:col-span-8">
            <div className="overflow-hidden rounded-xl border border-white/20">
              {themes.map((theme, index) => {
                const Icon = themeIcons[theme.icon];

                return (
                  <article
                    key={theme.id}
                    id={`theme-${theme.id}`}
                    className={cn(
                      "group grid gap-4 px-4 py-6 transition-all duration-200 hover:bg-white/10 md:grid-cols-[64px_1fr_auto] md:items-start md:px-6",
                      index !== themes.length - 1 && "border-b border-white/20",
                      index % 2 === 0 ? "bg-white/[0.03]" : "bg-transparent",
                    )}
                  >
                    <p className="text-2xl font-semibold tracking-tight text-white/45 md:pt-1">
                      {formatThemeNumber(index)}
                    </p>

                    <div className="space-y-3">
                      <div className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/25 bg-white/10 text-white">
                        <Icon className="size-4" aria-hidden="true" />
                      </div>
                      <h3 className="text-xl leading-snug font-semibold tracking-tight text-white">
                        {theme.title}
                      </h3>
                      <p className="max-w-3xl text-sm leading-relaxed text-white/80 sm:text-base">
                        {theme.description}
                      </p>
                    </div>

                    {/* <div className="hidden md:flex md:items-start md:pt-1">
                      <ArrowUpRight
                        className="size-5 text-white/45 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white"
                        aria-hidden="true"
                      />
                    </div> */}
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
