export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

const defaultFaqs2026: FaqItem[] = [
  {
    id: "who-can-participate",
    question: "Who can participate in the challenge?",
    answer:
      "Participation is open to eligible student teams that meet the required team composition and submission criteria published for the 2026 edition.",
  },
  {
    id: "team-composition",
    question: "What is the required team composition?",
    answer:
      "Each team must include 2 female students or graduates, 1 male student or graduate, and 1 faculty mentor from KNUST.",
  },
  {
    id: "multiple-theme-submission",
    question: "Can one team submit to multiple themes?",
    answer:
      "Teams are encouraged to focus on a single theme for stronger depth and technical quality unless specific multi-theme guidance is published by the secretariat.",
  },
  {
    id: "submission-format",
    question: "What should be included in the submission?",
    answer:
      "Submissions should include problem framing, technical approach, implementation feasibility, and expected impact aligned with the selected thematic area.",
  },
  {
    id: "updates-and-announcements",
    question: "Where will official updates be published?",
    answer:
      "All announcements, schedule changes, and clarifications are published on the updates page to keep participants aligned with current requirements.",
  },
];

export const challengeFaqsByYear: Record<number, FaqItem[]> = {
  2026: defaultFaqs2026,
};

export function getChallengeFaqs(year: number) {
  return challengeFaqsByYear[year] ?? defaultFaqs2026;
}
