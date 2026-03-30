export type TimelinePhaseStatus = "completed" | "current" | "upcoming";

export type TimelineMilestone = {
  id: string;
  date: string;
  activity: string;
  track: string;
  stakeholders: string;
};

export type TimelinePhase = {
  id: string;
  label: string;
  title: string;
  dateRange: string;
  status: TimelinePhaseStatus;
  description: string;
  milestones: TimelineMilestone[];
};

const defaultTimeline2026: TimelinePhase[] = [
  {
    id: "registration",
    label: "Registration",
    title: "Challenge Registration Window",
    dateRange: "15 Mar - 29 Mar 2026",
    status: "completed",
    description: "Open call for team applications and participant onboarding.",
    milestones: [
      {
        id: "challenge-registration-period",
        date: "15 Mar - 29 Mar 2026",
        activity: "Challenge Registration Period",
        track: "Registration",
        stakeholders: "Participants, Coordination Team",
      },
    ],
  },
  {
    id: "phase-1",
    label: "Phase 1",
    title: "Planning, Official Kick-Off and Launch",
    dateRange: "29 Mar - 30 Apr 2026",
    status: "current",
    description: "Screening, team matching, concept scoping, and launch preparation.",
    milestones: [
      {
        id: "registration-deadline",
        date: "29 Mar 2026",
        activity: "Registration Deadline",
        track: "Registration",
        stakeholders: "Participants",
      },
      {
        id: "pre-screening-applications",
        date: "30 Mar - 31 Mar 2026",
        activity: "Pre-Screening of Applications",
        track: "Screening",
        stakeholders: "Technical Review Panel",
      },
      {
        id: "mentor-team-introduction",
        date: "2 Apr 2026",
        activity: "Mentor-Team Introduction Meetings",
        track: "Onboarding",
        stakeholders: "Mentors, Teams",
      },
      {
        id: "budget-concept-submission",
        date: "3 Apr - 15 Apr 2026",
        activity: "Submission and Presentation of Selected Team Budgets and Concepts",
        track: "Onboarding",
        stakeholders: "Teams, Mentors, Coordination Team",
      },
      {
        id: "promotional-materials-preparation",
        date: "10 Apr - 15 Apr 2026",
        activity: "Preparation of Promotional Materials",
        track: "Planning",
        stakeholders: "Coordination Team",
      },
      {
        id: "venue-material-setup",
        date: "15 Apr - 30 Apr 2026",
        activity: "Venue Setup and Materials Purchases",
        track: "Planning",
        stakeholders: "Trainers, Mentors, Teams",
      },
    ],
  },
  {
    id: "phase-2",
    label: "Phase 2",
    title: "Planning and Capacity Building Workshops",
    dateRange: "11 May - 28 May 2026",
    status: "upcoming",
    description: "Structured workshops and formal review checkpoints with industry engagement.",
    milestones: [
      {
        id: "business-technical-workshops",
        date: "11 May - 22 May 2026",
        activity: "Business and Technical Capacity Building Workshops",
        track: "Training",
        stakeholders: "Trainers, Mentors, Teams",
      },
      {
        id: "monthly-review-1",
        date: "25 May 2026",
        activity: "Monthly Review Meeting 1",
        track: "Review",
        stakeholders: "Mentors, Coordination Team",
      },
      {
        id: "vivo-experts-session-1",
        date: "28 May 2026",
        activity: "Meeting with Vivo Energy Experts (Session 1)",
        track: "Industry Engagement",
        stakeholders: "Vivo Experts, Teams, Mentors",
      },
    ],
  },
  {
    id: "phase-3",
    label: "Phase 3",
    title: "Innovation Challenge Development",
    dateRange: "1 Jun - 30 Jul 2026",
    status: "upcoming",
    description: "Prototype development, formal evaluations, and final awards presentation.",
    milestones: [
      {
        id: "prototype-development-1",
        date: "1 Jun - 30 Jun 2026",
        activity: "Prototype Development Phase I",
        track: "Development",
        stakeholders: "Teams, Mentors",
      },
      {
        id: "monthly-review-2",
        date: "2 Jul 2026",
        activity: "Monthly Review Meeting 2",
        track: "Review",
        stakeholders: "Vivo Experts, Teams",
      },
      {
        id: "prototype-development-2",
        date: "3 Jul - 25 Jul 2026",
        activity: "Prototype Development Phase II",
        track: "Development",
        stakeholders: "Teams, Mentors, Coordination Team",
      },
      {
        id: "final-evaluation",
        date: "26 Jul - 27 Jul 2026",
        activity: "Final Evaluation and Selection of Winners",
        track: "Evaluation",
        stakeholders: "Judges, Industry Experts",
      },
      {
        id: "awards-demo-day",
        date: "30 Jul 2026",
        activity: "Awards Ceremony and Demo Day with Vivo Energy",
        track: "Closing Event",
        stakeholders: "Vivo Energy, Teams, Stakeholders",
      },
    ],
  },
];

export const challengeTimelineByYear: Record<number, TimelinePhase[]> = {
  2026: defaultTimeline2026,
};

export function getChallengeTimeline(year: number) {
  return challengeTimelineByYear[year] ?? defaultTimeline2026;
}
