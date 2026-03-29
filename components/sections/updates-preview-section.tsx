import Image from "next/image";
import Link from "next/link";

import { SectionHeading } from "@/components/sections/section-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getLatestChallengeUpdates } from "@/data/updates";

import { trackEvent } from '@/lib/analytics'

type UpdatesPreviewSectionProps = {
  year?: number;
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
}

export function UpdatesPreviewSection({ year = 2026 }: UpdatesPreviewSectionProps) {
  const updates = getLatestChallengeUpdates(year, 3);

  return (
    <section id="updates" className="border-border/60 scroll-mt-24 border-b bg-white">
      <div className="mx-auto w-full max-w-7xl px-6 py-16 lg:py-24">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            title="Latest Updates"
            description=""
            width="compact"
          />

          <Link
            href="/updates"
            className="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-primary inline-flex h-9 items-center rounded-md px-4 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none"
            onClick={() => { trackEvent('view_all_updates_click', { button: 'View All Updates'}) }}
          >
            View All Updates
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {updates.map((update) => (
            <Card key={update.slug} className="border-border/70 overflow-hidden py-0 shadow-none">
              <div className="relative h-48 w-full">
                <Image
                  src={update.image}
                  alt={update.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                />
              </div>

              <CardHeader className="pb-2">
                <p className="text-primary-700 text-xs font-medium tracking-wide uppercase">
                  {formatDate(update.date)}
                </p>
                <CardTitle className="text-primary-900 text-lg leading-snug font-semibold tracking-tight">
                  {update.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="pb-5">
                <p className="mb-4 text-sm leading-relaxed text-slate-700">{update.excerpt}</p>
                <Link
                  href={`/updates/${update.slug}`}
                  className="text-primary-700 hover:text-primary-500 focus-visible:ring-primary-500 text-sm font-semibold focus-visible:ring-2 focus-visible:outline-none"
                  onClick={() => { trackEvent('read_update_click', { button: update.title}) }}
                >
                  Read More
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
