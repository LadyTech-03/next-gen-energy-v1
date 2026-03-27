import type { ComponentType } from "react";
import { BookOpen, Factory, Lightbulb } from "lucide-react";

import { SectionHeading } from "@/components/sections/section-heading";

type Pillar = {
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
};

const pillars: Pillar[] = [
  {
    title: "Academic Research",
    description:
      "Support research-driven submissions with structured content models and clear publishing flows.",
    icon: BookOpen,
  },
  {
    title: "Industry Collaboration",
    description:
      "Model stakeholders, sponsors, and mentors with reusable components and maintainable route architecture.",
    icon: Factory,
  },
  {
    title: "Energy Innovation",
    description:
      "Highlight mission-critical updates with accessible visuals and robust data handling patterns.",
    icon: Lightbulb,
  },
];

export function ChallengePillarsSection() {
  return (
    <section id="themes" className="bg-background scroll-mt-24">
      <div className="mx-auto w-full max-w-7xl px-6 py-16 lg:py-24">
        <SectionHeading
          title="Scalable section architecture"
          description="Each section is isolated, reusable, and ready to evolve into data-driven content modules."
          className="mb-10"
          width="compact"
        />

        <div className="grid gap-6 md:grid-cols-3">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;

            return (
              <article key={pillar.title} className="border-border bg-card rounded-lg border p-6">
                <div className="bg-primary-900 dark:bg-primary dark:text-primary-foreground mb-4 inline-flex h-9 w-9 items-center justify-center rounded-md text-white">
                  <Icon className="size-4" aria-hidden="true" />
                </div>
                <h2 className="mb-2 text-xl font-semibold tracking-tight">{pillar.title}</h2>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {pillar.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
