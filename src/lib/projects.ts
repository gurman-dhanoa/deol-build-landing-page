import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";
import craftHands from "@/assets/craft-hands.jpg";
import philosophy from "@/assets/philosophy.jpg";

export type ProjectType =
  | "House"
  | "Duplex"
  | "Townhouse"
  | "Apartment"
  | "Renovation"
  | "Knockdown Rebuild";

export type ProjectLocation =
  | "North Canberra"
  | "South Canberra"
  | "Inner South"
  | "Gungahlin"
  | "Belconnen"
  | "Woden Valley"
  | "Tuggeranong"
  | "Molonglo Valley";

export type ProjectSpec = { label: string; value: string };

export type Project = {
  id: string;
  slug: string;
  title: string;
  suburb: string;
  location: ProjectLocation;
  type: ProjectType;
  year: number;
  img: string;
  gallery: string[];
  tagline: string;
  narrative: string[];
  specs: ProjectSpec[];
  keyPoints: string[];
  special: { title: string; body: string }[];
  duration: string;
  client: string;
  architect?: string;
};

const baseGallery = [project1, project2, project3, project4, craftHands, philosophy];

function make(
  p: Omit<Project, "slug" | "gallery" | "tagline" | "narrative" | "specs" | "keyPoints" | "special" | "duration" | "client" | "architect"> &
    Partial<Pick<Project, "gallery" | "tagline" | "narrative" | "specs" | "keyPoints" | "special" | "duration" | "client" | "architect">>,
): Project {
  return {
    slug: p.id,
    gallery: p.gallery ?? baseGallery,
    tagline: p.tagline ?? "A quiet, considered home built for the next thirty years.",
    narrative: p.narrative ?? [
      "The brief was simple and honest — a home that could hold a growing family without ever feeling loud. Every joint, every finish and every service was chosen so that the house would age slowly and gracefully.",
      "We spent the first four weeks on site walking the block at different hours, watching how the winter sun cut across the north face and where the summer westerlies would need to be softened. That patience shaped every decision that came after.",
    ],
    specs: p.specs ?? [
      { label: "Site area", value: "612 m²" },
      { label: "Internal", value: "284 m²" },
      { label: "Bedrooms", value: "4" },
      { label: "Bathrooms", value: "3" },
      { label: "Garage", value: "Double" },
      { label: "Star rating", value: "7.4" },
    ],
    keyPoints: p.keyPoints ?? [
      "Passive solar orientation with 2.4 m northern eaves",
      "R6.0 ceiling and R2.7 wall insulation across the envelope",
      "Double-glazed thermally broken aluminium joinery",
      "Hydronic in-slab heating with a heat-pump loop",
      "7 kW rooftop solar with 10 kWh battery storage",
      "Rainwater harvesting to a 5,000 L underground tank",
    ],
    special: p.special ?? [
      {
        title: "A single-piece stone island",
        body: "The kitchen island is a 3.6 m book-matched Elba stone slab, hand-mitred on site over three days.",
      },
      {
        title: "Silent services",
        body: "All plumbing is lagged and clipped inside acoustic battens — you never hear a pipe.",
      },
      {
        title: "Ten-year structural guarantee",
        body: "Every load-bearing element was independently engineered and signed off, and is warranted for a decade.",
      },
    ],
    duration: p.duration ?? "11 months",
    client: p.client ?? "Private family",
    architect: p.architect,
    ...p,
  };
}

export const PROJECTS: Project[] = [
  make({ id: "p01", title: "Braddon Courtyard House", suburb: "Braddon", location: "North Canberra", type: "House", year: 2025, img: project1, architect: "Studio Cavill" }),
  make({ id: "p02", title: "Yarralumla Duplex", suburb: "Yarralumla", location: "Inner South", type: "Duplex", year: 2024, img: project2,
    specs: [
      { label: "Site area", value: "780 m²" },
      { label: "Internal (per dwelling)", value: "212 m²" },
      { label: "Bedrooms", value: "3 + 3" },
      { label: "Bathrooms", value: "2 + 2" },
      { label: "Garage", value: "Double, each" },
      { label: "Star rating", value: "7.1" },
    ],
    keyPoints: [
      "Two mirrored dwellings sharing a single acoustic party wall",
      "Independent services — no shared meters, no shared plumbing",
      "Individual courtyards for each residence for full privacy",
      "Cross-flow ventilation designed for Canberra summers",
      "Matched brick tones sourced from a single kiln run",
    ],
  }),
  make({ id: "p03", title: "Gungahlin Family Rebuild", suburb: "Amaroo", location: "Gungahlin", type: "Knockdown Rebuild", year: 2024, img: project3 }),
  make({ id: "p04", title: "Deakin Heritage Renovation", suburb: "Deakin", location: "South Canberra", type: "Renovation", year: 2024, img: project4,
    tagline: "A 1950s red brick, quietly brought into the next fifty years.",
    special: [
      { title: "Retained original brickwork", body: "We salvaged and re-laid 4,200 bricks from the demolished rear wing back into the new extension." },
      { title: "Original oak floors, refinished", body: "The 1954 tallowwood floors were sanded back by hand — not replaced — and finished with hardwax oil." },
      { title: "Heritage-matched joinery", body: "New window frames were profiled to match the original casements, then double-glazed internally." },
    ],
  }),
  make({ id: "p05", title: "Coombs Terrace Townhouses", suburb: "Coombs", location: "Molonglo Valley", type: "Townhouse", year: 2023, img: project2 }),
  make({ id: "p06", title: "Kingston Foreshore Apartment", suburb: "Kingston", location: "Inner South", type: "Apartment", year: 2023, img: project1 }),
  make({ id: "p07", title: "Weston Ridge House", suburb: "Weston", location: "Woden Valley", type: "House", year: 2023, img: project3 }),
  make({ id: "p08", title: "Belconnen Corner Duplex", suburb: "Cook", location: "Belconnen", type: "Duplex", year: 2022, img: project4 }),
  make({ id: "p09", title: "Wanniassa Family Home", suburb: "Wanniassa", location: "Tuggeranong", type: "House", year: 2022, img: project1 }),
  make({ id: "p10", title: "Ainslie Cottage Extension", suburb: "Ainslie", location: "North Canberra", type: "Renovation", year: 2022, img: project2 }),
  make({ id: "p11", title: "Forde Street Townhomes", suburb: "Forde", location: "Gungahlin", type: "Townhouse", year: 2021, img: project3 }),
  make({ id: "p12", title: "Red Hill Escarpment House", suburb: "Red Hill", location: "South Canberra", type: "House", year: 2021, img: project4 }),
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
