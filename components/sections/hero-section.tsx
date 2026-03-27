"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

import { CountdownTimer } from "@/components/sections/countdown-timer";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type HeroSectionProps = {
  videoSrc?: string;
};

const NAV_OFFSET = 88;

function scrollToSection(sectionId: string) {
  const target = document.getElementById(sectionId);

  if (!target) {
    return;
  }

  const top = target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;

  window.scrollTo({
    top,
    behavior: "smooth",
  });

  window.history.replaceState(null, "", `#${sectionId}`);
}

export function HeroSection({ videoSrc = "/videos/hero.mp4" }: HeroSectionProps) {
  return (
    <section id="hero" className="relative -mt-16 min-h-screen scroll-mt-24 overflow-hidden pt-16">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      <div
        className="absolute inset-0 bg-linear-to-b from-black/70 via-black/55 to-black/75"
        aria-hidden="true"
      />

      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-7xl items-center justify-center px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="max-w-4xl space-y-8"
        >
          {/* <h1 className="text-4xl leading-tight font-bold text-balance text-white sm:text-5xl lg:text-6xl">
            NextGen Energy Innovators Challenge 2026
          </h1> */}

          {/* <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg lg:text-xl">
            Innovating the Future of Energy Systems
          </p> */}

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="#register"
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-accent-yellow hover:bg-accent-yellow/90 h-10 px-5 font-semibold text-neutral-900",
              )}
            >
              Register Now
            </Link>
            <Link
              href="#themes"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "h-10 border-white/55 bg-transparent px-5 text-white hover:bg-white/10 hover:text-white",
              )}
            >
              Learn More
            </Link>
          </div>

          <div className="flex justify-center">
            <CountdownTimer />
          </div>
        </motion.div>

        <button
          type="button"
          onClick={() => scrollToSection("themes")}
          className="group focus-visible:ring-accent-yellow absolute bottom-8 left-1/2 inline-flex -translate-x-1/2 flex-col items-center gap-1 text-white/80 transition-colors hover:text-white focus-visible:ring-2 focus-visible:outline-none"
          aria-label="Scroll to themes section"
        >
          <span className="sr-only">Scroll to themes section</span>
          <span className="flex h-10 w-6 items-start justify-center rounded-full border border-white/45 p-1">
            <motion.span
              animate={{ y: [0, 10, 0], opacity: [1, 0.35, 1] }}
              transition={{ duration: 1.35, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              className="mt-0.5 h-2 w-2 rounded-full bg-white"
            />
          </span>
          <ChevronDown className="size-4" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
