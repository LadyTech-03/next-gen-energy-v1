export type ThemeIconKey = "route" | "wrench" | "gauge" | "database" | "brain" | "smartphone";

export type ThemeItem = {
  id: string;
  title: string;
  description: string;
  icon: ThemeIconKey;
};

const defaultThemes2026: ThemeItem[] = [
  {
    id: "smart-fuel-transit-monitoring",
    title: "Smart Fuel Transit Monitoring",
    description:
      "Build systems that provide real-time fleet visibility, route intelligence, and safety alerts for fuel movement.",
    icon: "route",
  },
  {
    id: "smart-retrofitting-manual-fuel-pumps",
    title: "Smart Retrofitting of Discarded Manual Fuel Pumps",
    description:
      "Re-engineer legacy manual pumps with sensors and control logic to extend usability and improve measurement quality.",
    icon: "wrench",
  },
  {
    id: "fuel-forecourt-management-monitoring",
    title: "Fuel Forecourt Management and Monitoring",
    description:
      "Design integrated tools for forecourt operations, performance dashboards, and preventive operational oversight.",
    icon: "gauge",
  },
  {
    id: "intelligent-underground-tank-monitoring",
    title: "Intelligent Underground Tank Monitoring",
    description:
      "Enable continuous tank health tracking with leak detection, predictive maintenance, and automated reporting.",
    icon: "database",
  },
  {
    id: "ai-driven-forecourt-traffic-analytics",
    title: "AI-Driven Forecourt & Traffic Analytics",
    description:
      "Apply AI to understand customer and vehicle flow patterns for better safety, throughput, and decision-making.",
    icon: "brain",
  },
  {
    id: "consumer-interfacing-digital-platforms",
    title: "Consumer Interfacing Digital Platforms",
    description:
      "Create user-facing products that improve access to fuel services, transactions, and service communication.",
    icon: "smartphone",
  },
];

export const challengeThemesByYear: Record<number, ThemeItem[]> = {
  2026: defaultThemes2026,
};

export function getChallengeThemes(year: number) {
  return challengeThemesByYear[year] ?? defaultThemes2026;
}
