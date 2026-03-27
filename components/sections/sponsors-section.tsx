import Image from "next/image";

import { SectionHeading } from "@/components/sections/section-heading";
import { type SponsorItem, getChallengeSponsors } from "@/data/sponsors";

type SponsorsSectionProps = {
  year?: number;
  items?: SponsorItem[];
};

export function SponsorsSection({ year = 2026, items }: SponsorsSectionProps) {
  const sponsors = items ?? getChallengeSponsors(year);

  if (sponsors.length === 0) {
    return null;
  }

  const [fallbackSponsor] = sponsors;
  const primarySponsor = sponsors.find((sponsor) => sponsor.isPrimary) ?? fallbackSponsor;

  if (!primarySponsor) {
    return null;
  }

  const supportingSponsors = sponsors.filter((sponsor) => sponsor.id !== primarySponsor.id);

  return (
    <section
      id="sponsors"
      className="border-border/60 scroll-mt-24 border-b bg-linear-to-b from-blue-50/80 via-white to-slate-50"
    >
      <div className="mx-auto w-full max-w-7xl px-6 py-16 lg:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <SectionHeading title="Sponsors & Partners" align="center" width="full" />
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.5fr_1fr] lg:gap-6">
          <article className="relative overflow-hidden rounded-2xl border border-blue-200/70 bg-white p-6 shadow-[0_18px_45px_rgba(30,64,175,0.12)] sm:p-8">
            <div
              className="pointer-events-none absolute -top-16 -left-16 h-52 w-52 rounded-full bg-green-300/25 blur-3xl"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -right-20 -bottom-20 h-56 w-56 rounded-full bg-green-300/25 blur-3xl"
              aria-hidden="true"
            />

            <div className="relative flex min-h-40 items-center sm:min-h-48">
              <Image
                src={primarySponsor.logo}
                alt={`${primarySponsor.name} logo`}
                fill
                sizes="(max-width: 1024px) 100vw, 52vw"
                className="object-contain object-left drop-shadow-[0_10px_20px_rgba(15,23,42,0.15)]"
                priority
              />
            </div>
            <span className="sr-only">{primarySponsor.name}</span>
          </article>

          <div className="rounded-2xl border border-slate-200/80 bg-white/85 p-4 shadow-[0_10px_25px_rgba(15,23,42,0.07)] sm:p-5">
            <ul className="grid grid-cols-2 gap-3 sm:gap-4">
              {supportingSponsors.map((sponsor) => (
                <li
                  key={sponsor.id}
                  className="group bg-white p-3 transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-[0_14px_24px_rgba(30,64,175,0.14)]"
                >
                  <div className="relative h-16 w-full sm:h-20">
                    <Image
                      src={sponsor.logo}
                      alt={`${sponsor.name} logo`}
                      fill
                      sizes="(max-width: 640px) 45vw, (max-width: 1024px) 22vw, 15vw"
                      className="object-contain saturate-[1.05] transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </div>
                  <span className="sr-only">{sponsor.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
