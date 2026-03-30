import type { Metadata } from "next";

import { TimelineScrollSection } from "@/components/sections/timeline-scroll-section";
import { getChallengeTimeline } from "@/data/timeline";

export const metadata: Metadata = {
  title: "Timeline",
  description:
    "Official 2026 challenge timeline covering registration, workshops, development milestones, and final awards.",
};

export default function TimelinePage() {
  const year = 2026;
  const phases = getChallengeTimeline(year);

  return <TimelineScrollSection year={year} phases={phases} />;
}
