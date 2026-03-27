"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { SectionHeading } from "@/components/sections/section-heading";

export function AboutSection() {
  return (
    <section id="about" className="border-border/60 scroll-mt-24 border-b bg-white">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-16 md:grid-cols-2 md:items-start lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
          className="space-y-6"
        >
          <SectionHeading title="About the Challenge" description="" width="full" />

          <div className="max-w-3xl space-y-4 text-base leading-relaxed text-slate-700 sm:text-xl">
            <p>
              The NextGen Energy Innovators Challenge is a structured innovation program where
              participants solve pressing fuel and forecourt technology problems using data,
              software, and systems engineering.
            </p>
            <p>
              It is organized through a university-industry collaboration model that brings together
              academic leaders, sector practitioners, and technical mentors to ensure each theme
              reflects real operational needs.
            </p>
            <p>
              The purpose is to develop scalable, implementable solutions that improve monitoring,
              safety, efficiency, and customer experience across modern energy infrastructure.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut", delay: 0.08 }}
          viewport={{ once: true, amount: 0.25 }}
          className="mx-auto w-full max-w-md"
        >
          <figure className="border-primary-200/80 overflow-hidden rounded-lg border bg-white shadow-[0_10px_24px_rgba(15,23,42,0.1)]">
            <Image
              src="/images/flyer-2026.jpg"
              alt="Official NextGen Energy Innovators Challenge 2026 flyer"
              width={640}
              height={734}
              className="h-auto w-full"
            />
            {/* <figcaption className="border-primary-100 border-t px-4 py-3 text-sm text-slate-600">
              Official challenge flyer and theme announcement.
            </figcaption> */}
          </figure>
        </motion.div>
      </div>
    </section>
  );
}
