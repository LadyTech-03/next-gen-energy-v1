export type SponsorItem = {
  id: string;
  name: string;
  logo: string;
  width: number;
  height: number;
  isPrimary?: boolean;
};

const defaultSponsors2026: SponsorItem[] = [
  {
    id: "vivo-energy",
    name: "Vivo Energy",
    logo: "/images/vivo.png",
    width: 360,
    height: 158,
    isPrimary: true,
  },
  {
    id: "knust",
    name: "KNUST",
    logo: "/images/knust.svg",
    width: 320,
    height: 154,
  },
  {
    id: "next-gen-energy",
    name: "Vivo Energy",
    logo: "/images/logo.svg",
    width: 320,
    height: 140,
  },
  {
    id: "innovation-centre-knust",
    name: "Innovation Centre, KNUST",
    logo: "/images/innovation-centre-knust.svg",
    width: 320,
    height: 154,
  },
  {
    id: "college-of-engineering",
    name: "College of Engineering",
    logo: "/images/college-of-engineering.svg",
    width: 320,
    height: 154,
  },
];

export const challengeSponsorsByYear: Record<number, SponsorItem[]> = {
  2026: defaultSponsors2026,
};

export function getChallengeSponsors(year: number) {
  return challengeSponsorsByYear[year] ?? defaultSponsors2026;
}
