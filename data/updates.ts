export type UpdatePost = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
  content: string;
};

const defaultUpdates2026: UpdatePost[] = [
  {
    slug: "registration-window-opened",
    title: "Registration Window Opened for Team Submissions",
    date: "2026-03-25",
    excerpt:
      "Student teams can now submit their registration details and project focus areas for the first review stage.",
    image: "/images/shepower_knust-020.jpg",
    content: `## Registration is now live

Team registration for the **NextGen Energy Innovators Challenge 2026** is officially open.

### What to prepare before submission

- Team member details matching the required composition
- Selected thematic area and draft problem framing
- Faculty mentor confirmation details

### Next step

After registration closes, shortlisted teams will receive orientation details and technical briefing schedules.`,
  },
  {
    slug: "mentor-orientation-schedule",
    title: "Mentor Orientation Schedule Released",
    date: "2026-03-20",
    excerpt:
      "Technical mentors and faculty advisors have received the onboarding schedule for team support and review milestones.",
    image: "/images/shepower_knust-015.jpg",
    content: `## Mentor orientation schedule published

The secretariat has published mentor orientation sessions for academic and industry facilitators.

### Focus of orientation

- Review process and milestone checkpoints
- Evaluation guidance and technical feedback standards
- Team engagement practices and escalation channels

Mentors should confirm attendance for the first briefing slot to ensure synchronized support for participating teams.`,
  },
  {
    slug: "challenge-launch-theme-publication",
    title: "Challenge Launch and Theme Publication",
    date: "2026-03-13",
    excerpt:
      "The 2026 edition has officially launched with six problem themes focused on practical fuel and forecourt innovation.",
    image: "/images/shepower_knust-142.jpg",
    content: `## Official launch announcement

The **NextGen Energy Innovators Challenge 2026** has launched with six thematic tracks covering transit monitoring, forecourt intelligence, and consumer digital platforms.

### Strategic objective

The program links research capability with practical industry challenges to produce solutions that are:

- Deployable in real operating environments
- Technically rigorous and data-driven
- Scalable across future challenge cycles

Participants are encouraged to review theme scope carefully before finalizing registration.`,
  },
];

export const challengeUpdatesByYear: Record<number, UpdatePost[]> = {
  2026: defaultUpdates2026,
};

function sortByNewest(posts: UpdatePost[]) {
  return [...posts].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

export function getChallengeUpdates(year: number) {
  return sortByNewest(challengeUpdatesByYear[year] ?? defaultUpdates2026);
}

export function getLatestChallengeUpdates(year: number, limit = 3) {
  return getChallengeUpdates(year).slice(0, limit);
}

export function getChallengeUpdateBySlug(slug: string, year: number) {
  return getChallengeUpdates(year).find((update) => update.slug === slug);
}
