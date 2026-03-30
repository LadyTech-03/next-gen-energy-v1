
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { SectionHeading } from "@/components/sections/section-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getChallengeUpdates } from "@/data/updates";
// import { trackEvent } from "@/lib/analytics";

export const metadata: Metadata = {
  title: "Updates",
  description:
    "Latest announcements, milestones, and communication updates for the NextGen Energy Innovators Challenge.",
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export default function UpdatesPage() {
  const updates = getChallengeUpdates(2026);

  return (
    <main className="bg-background min-h-screen">
      <section className="border-primary-700/60 from-primary-900 via-primary-700 to-primary-900 border-b bg-linear-to-b">
        <div className="mx-auto w-full max-w-7xl px-6 py-14 lg:py-18">
          <nav aria-label="Breadcrumb" className="text-muted-foreground mb-5 text-sm">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="hover:text-foreground">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-foreground">Updates</li>
            </ol>
          </nav>

          <SectionHeading
            title="Challenge Updates"
            description=""
            width="compact"
          />
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-10 lg:py-14">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {updates.map((update) => (
            <Card key={update.slug} className="border-border/70 overflow-hidden py-0">
              <div className="relative h-56 w-full">
                <Image
                  src={update.image}
                  alt={update.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <CardHeader className="pb-2">
                <p className="text-primary-700 text-xs font-medium tracking-wide uppercase">
                  {formatDate(update.date)}
                </p>
                <CardTitle className="text-primary-900 text-xl leading-snug font-semibold">
                  {update.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-6">
                <p className="mb-4 text-sm leading-relaxed text-slate-700">{update.excerpt}</p>
                <Link
                  href={`/updates/${update.slug}`}
                  className="text-primary-700 hover:text-primary-500 focus-visible:ring-primary-500 text-sm font-semibold focus-visible:ring-2 focus-visible:outline-none"
                  // onClick={() => { trackEvent('read_more_up_click', { button: update.title}) }}
                >
                  Read More
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
