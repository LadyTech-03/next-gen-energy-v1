import { AboutSection } from "@/components/sections/about-section";
import { FaqSection } from "@/components/sections/faq-section";
import { HeroSection } from "@/components/sections/hero-section";
import { SponsorsSection } from "@/components/sections/sponsors-section";
import { TeamRequirementsSection } from "@/components/sections/team-requirements-section";
import { ThemesSection } from "@/components/sections/themes-section";
import { UpdatesPreviewSection } from "@/components/sections/updates-preview-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ThemesSection year={2026} />
      <TeamRequirementsSection />
      <SponsorsSection year={2026} />
      <UpdatesPreviewSection year={2026} />
      <FaqSection year={2026} />
      {/* <section id="register" className="bg-primary-900 scroll-mt-24">
        <div className="mx-auto w-full max-w-7xl px-6 py-16 text-white lg:py-20">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Register</h2>
          <p className="mt-3 max-w-2xl text-white/80">
            Registration is now open for teams, mentors, and sponsors participating in the 2026
            challenge cycle.
          </p>
          <a
            href="#hero"
            className="bg-accent-yellow hover:bg-accent-yellow/90 focus-visible:ring-accent-yellow focus-visible:ring-offset-primary-900 mt-6 inline-flex h-10 items-center rounded-md px-5 text-sm font-semibold text-neutral-900 transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            Register Now
          </a>
        </div>
      </section> */}
    </>
  );
}
