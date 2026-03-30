"use client";

import Link from "next/link";
import { Check, LoaderCircle } from "lucide-react";

import { SectionHeading } from "@/components/sections/section-heading";
import { type TimelinePhase } from "@/data/timeline";
import { cn } from "@/lib/utils";

type TimelineScrollSectionProps = {
  year: number;
  phases: TimelinePhase[];
};

function getTimelineWindow(phases: TimelinePhase[]) {
  const firstPhase = phases[0];
  const lastPhase = phases[phases.length - 1];

  const startDate = firstPhase?.dateRange.split("-")[0]?.trim() ?? "";
  const endDateParts = lastPhase?.dateRange.split("-") ?? [];
  const endDate = endDateParts[endDateParts.length - 1]?.trim() ?? "";

  return startDate && endDate ? `${startDate} - ${endDate}` : "";
}

function getGuideProgressPercent(phases: TimelinePhase[]) {
  if (phases.length <= 1) {
    return phases.length === 1 ? 100 : 0;
  }

  const currentIndex = phases.findIndex((phase) => phase.status === "current");

  if (currentIndex >= 0) {
    return (currentIndex / (phases.length - 1)) * 100;
  }

  const completedCount = phases.filter((phase) => phase.status === "completed").length;

  if (completedCount === 0) {
    return 0;
  }

  if (completedCount >= phases.length) {
    return 100;
  }

  return ((completedCount - 1) / (phases.length - 1)) * 100;
}

export function TimelineScrollSection({ year, phases }: TimelineScrollSectionProps) {
  if (phases.length === 0) {
    return null;
  }

  const timelineWindow = getTimelineWindow(phases);
  const progressPercent = getGuideProgressPercent(phases);

  return (
    <main className="bg-primary-900 min-h-screen text-white">
      <section className="border-primary-700/60 from-primary-900 via-primary-700 to-primary-900 border-b bg-linear-to-b">
        <div className="mx-auto w-full max-w-7xl px-6 py-14 lg:py-20">
          <nav aria-label="Breadcrumb" className="mb-5 text-sm text-white/70">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="transition-colors hover:text-white">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-white">Timeline</li>
            </ol>
          </nav>

          <SectionHeading title={`Challenge Timeline ${year}`} width="full" tone="inverted" />
          <p className="mt-3 text-sm text-white/80 sm:text-base">{timelineWindow}</p>
        </div>
      </section>

      <section className="from-primary-900 via-primary-800 to-primary-900 bg-linear-to-b">
        <div className="mx-auto w-full sm:max-w-[90%] px-6 py-12 lg:py-18">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <aside className="lg:sticky lg:top-24 lg:col-span-4 lg:self-start">
              <div className="rounded-xl bg-white/4 p-4 sm:p-5">
                <p className="text-xs font-semibold tracking-[0.16em] text-white/70 uppercase">
                  Timeline Guide
                </p>

                <div className="relative mt-5 pl-5">
                  <span className="absolute top-0 left-1 h-full w-px bg-white/20" aria-hidden="true" />
                  <span
                    className="bg-accent-yellow absolute top-0 left-1 w-px transition-all duration-300"
                    style={{ height: `${progressPercent}%` }}
                    aria-hidden="true"
                  />

                  <ol className="space-y-3">
                    {phases.map((phase) => {
                      const isCompleted = phase.status === "completed";
                      const isCurrent = phase.status === "current";

                      return (
                        <li key={phase.id}>
                          <a
                            href={`#phase-${phase.id}`}
                            className={cn(
                              "group relative block rounded-md px-2 py-2 transition-colors focus-visible:outline-none",
                              isCurrent
                                ? "bg-white/10"
                                : isCompleted
                                  ? "bg-emerald-500/10 hover:bg-emerald-500/12"
                                  : "hover:bg-white/8",
                            )}
                            aria-current={isCurrent ? "step" : undefined}
                          >
                            <span
                              className={cn(
                                "absolute top-3.5 -left-6 inline-flex size-4 items-center justify-center rounded-full border",
                                isCompleted
                                  ? "border-emerald-300 bg-emerald-500 text-white"
                                  : isCurrent
                                    ? "border-accent-yellow bg-primary-700 text-accent-yellow"
                                    : "border-white/30 bg-primary-300",
                              )}
                              aria-hidden="true"
                            >
                              {isCompleted ? (
                                <Check className="size-2.5" aria-hidden="true" />
                              ) : isCurrent ? (
                                <LoaderCircle className="size-2.5 animate-spin" aria-hidden="true" />
                              ) : null}
                            </span>
                            <p className="text-xs font-semibold tracking-wide text-white/70 uppercase">
                              {phase.label}
                            </p>
                            <p
                              className={cn(
                                "mt-1 text-sm leading-snug transition-colors",
                                isCurrent
                                  ? "text-white"
                                  : isCompleted
                                    ? "text-white/90"
                                    : "text-white/75 group-hover:text-white/95",
                              )}
                            >
                              {phase.title}
                            </p>
                          </a>
                        </li>
                      );
                    })}
                  </ol>
                </div>
              </div>
            </aside>

            <div className="space-y-8 lg:col-span-8">
              {phases.map((phase) => (
                <section
                  id={`phase-${phase.id}`}
                  key={phase.id}
                  className="scroll-mt-28 rounded-sm border border-white/20 bg-white/4 p-5 sm:p-6"
                >
                  <header className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold tracking-[0.16em] text-white/70 uppercase">
                        {phase.label}
                      </p>
                      <h2 className="mt-1 text-xl leading-snug font-semibold tracking-tight text-white sm:text-2xl">
                        {phase.title}
                      </h2>
                    </div>

                    <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide text-white/90">
                      {phase.dateRange}
                    </span>
                  </header>

                  <ol className="relative mt-6 space-y-4 before:absolute before:top-2 before:bottom-2 before:left-1.5 before:w-px before:bg-white/20 md:space-y-6 md:before:left-1/2">
                    {phase.milestones.map((milestone, milestoneIndex) => (
                      <li
                        key={milestone.id}
                        className={cn(
                          "relative pl-7 md:pl-0 md:flex",
                          milestoneIndex % 2 === 0 ? "md:justify-start" : "md:justify-end",
                        )}
                      >
                        <span
                          className="bg-accent-yellow absolute top-6 left-[0.35rem] inline-flex size-2.5 rounded-full border border-white/30 md:left-1/2 md:-translate-x-1/2"
                          aria-hidden="true"
                        />

                        <article className="w-full rounded-sm border border-white/20 bg-primary-900/65 p-4 shadow-[0_10px_24px_rgba(8,20,49,0.32)] md:w-[calc(50%-1.5rem)] sm:p-5">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <p className="text-xs font-semibold tracking-wide text-white/80 uppercase">
                              {milestone.date}
                            </p>
                            <span className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-white/80 uppercase">
                              {milestone.track}
                            </span>
                          </div>

                          <h3 className="mt-2 text-base leading-snug font-semibold text-white sm:text-lg">
                            {milestone.activity}
                          </h3>

                          <div className="mt-3 border-t border-white/15 pt-3">
                            <p className="text-[11px] font-semibold tracking-wide text-white/60 uppercase">
                              Stakeholders
                            </p>
                            <p className="mt-1 text-sm leading-relaxed text-white/85">
                              {milestone.stakeholders}
                            </p>
                          </div>
                        </article>
                      </li>
                    ))}
                  </ol>
                </section>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
