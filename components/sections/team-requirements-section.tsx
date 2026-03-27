import { CircleCheckBig, GraduationCap, ShieldCheck, Users } from "lucide-react";

import { SectionHeading } from "@/components/sections/section-heading";
import { Card, CardContent } from "@/components/ui/card";

const teamRequirements = [
  {
    icon: Users,
    label: "2 Female Students/Graduates",
    highlight: true,
  },
  {
    icon: GraduationCap,
    label: "1 Male Student/Graduate",
    highlight: false,
  },
  {
    icon: ShieldCheck,
    label: "1 Faculty Mentor (KNUST)",
    highlight: false,
  },
];

export function TeamRequirementsSection() {
  return (
    <section
      id="requirements"
      className="border-primary-700/60 bg-primary-900 scroll-mt-24 border-b"
    >
      <div className="mx-auto w-full max-w-7xl px-6 py-16 lg:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <SectionHeading
            title="Team Composition Requirements"
            description="Each challenge team must satisfy the participant structure below before submission."
            align="center"
            width="full"
            tone="inverted"
          />

          <Card className="mt-8 border-white/25 bg-white/[0.06] py-0 text-left shadow-none">
            <CardContent className="p-6 sm:p-8">
              <ul className="space-y-4" aria-label="Team requirements list">
                {teamRequirements.map((requirement) => {
                  const Icon = requirement.icon;

                  return (
                    <li key={requirement.label} className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-md border border-white/30 bg-white/10 text-white">
                        <Icon className="size-4" aria-hidden="true" />
                      </span>
                      <div className="flex items-center gap-2">
                        <span
                          className={
                            requirement.highlight
                              ? "bg-accent-yellow rounded-md px-2 py-1 text-sm font-semibold text-neutral-900"
                              : "text-white/90"
                          }
                        >
                          {requirement.label}
                        </span>
                        {requirement.highlight ? (
                          <CircleCheckBig
                            className="text-accent-yellow size-4"
                            aria-hidden="true"
                          />
                        ) : null}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
