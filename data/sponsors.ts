export type SponsorItem = {
  id: string;
  name: string;
  logo: string;
  width: number;
  height: number;
  isPrimary?: boolean;
  website: string;
};

const defaultSponsors2026: SponsorItem[] = [
  {
    id: "vivo-energy",
    name: "Vivo Energy",
    logo: "/images/vivo.png",
    width: 360,
    height: 158,
    isPrimary: true,
    website: "https://www.vivoenergy.com",
  },
  {
    id: "knust",
    name: "KNUST",
    logo: "/images/knust.svg",
    width: 320,
    height: 154,
    website: "https://www.knust.edu.gh",
  },
  {
    id: "next-gen-energy",
    name: "Vivo Energy",
    logo: "/images/logo.svg",
    width: 320,
    height: 140,
    website: "https://www.nextgenenergychallenge.com",
  },
  {
    id: "innovation-centre-knust",
    name: "Innovation Centre, KNUST",
    logo: "/images/hub.svg",
    width: 320,
    height: 154,
    website: "https://coeic.knust.edu.gh",
  },
  {
    id: "flowscope",
    name: "FlowScope",
    logo: "/images/flowscope.svg",
    width: 320,
    height: 154,
    website: "https://www.flowscoperesearch.com/",
  },
  {
    id: "department-of-petroleum-engineering-knust",
    name: "Department of Petroleum Engineering, KNUST",
    logo: "/images/dep.svg",
    width: 320,
    height: 154,
    website: "https://petrol.knust.edu.gh",
  },
];

export const challengeSponsorsByYear: Record<number, SponsorItem[]> = {
  2026: defaultSponsors2026,
};

export function getChallengeSponsors(year: number) {
  return challengeSponsorsByYear[year] ?? defaultSponsors2026;
}
