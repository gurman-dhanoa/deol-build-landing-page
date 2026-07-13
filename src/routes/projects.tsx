import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, MapPin, Calendar } from "lucide-react";
import {
  FloatingHeader,
  MenuOverlay,
  Footer,
  useScrolled,
} from "@/components/site/chrome";

import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Deol Build" },
      {
        name: "description",
        content:
          "A catalogue of 500+ homes delivered across Canberra — custom houses, duplexes, townhouses and renovations from Deol Build (formerly Punjab Homes).",
      },
      { property: "og:title", content: "Projects — Deol Build" },
      {
        property: "og:description",
        content:
          "Filter by home type and Canberra district. See our finished houses, duplexes, townhouses and renovations.",
      },
    ],
  }),
  component: ProjectsPage,
});

type ProjectType =
  | "House"
  | "Duplex"
  | "Townhouse"
  | "Apartment"
  | "Renovation"
  | "Knockdown Rebuild";

type ProjectLocation =
  | "North Canberra"
  | "South Canberra"
  | "Inner South"
  | "Gungahlin"
  | "Belconnen"
  | "Woden Valley"
  | "Tuggeranong"
  | "Molonglo Valley";

type Project = {
  id: string;
  title: string;
  suburb: string;
  location: ProjectLocation;
  type: ProjectType;
  year: number;
  img: string;
};

const PROJECTS: Project[] = [
  { id: "p01", title: "Braddon Courtyard House", suburb: "Braddon", location: "North Canberra", type: "House", year: 2025, img: project1 },
  { id: "p02", title: "Yarralumla Duplex", suburb: "Yarralumla", location: "Inner South", type: "Duplex", year: 2024, img: project2 },
  { id: "p03", title: "Gungahlin Family Rebuild", suburb: "Amaroo", location: "Gungahlin", type: "Knockdown Rebuild", year: 2024, img: project3 },
  { id: "p04", title: "Deakin Heritage Renovation", suburb: "Deakin", location: "South Canberra", type: "Renovation", year: 2024, img: project4 },
  { id: "p05", title: "Coombs Terrace Townhouses", suburb: "Coombs", location: "Molonglo Valley", type: "Townhouse", year: 2023, img: project2 },
  { id: "p06", title: "Kingston Foreshore Apartment", suburb: "Kingston", location: "Inner South", type: "Apartment", year: 2023, img: project1 },
  { id: "p07", title: "Weston Ridge House", suburb: "Weston", location: "Woden Valley", type: "House", year: 2023, img: project3 },
  { id: "p08", title: "Belconnen Corner Duplex", suburb: "Cook", location: "Belconnen", type: "Duplex", year: 2022, img: project4 },
  { id: "p09", title: "Wanniassa Family Home", suburb: "Wanniassa", location: "Tuggeranong", type: "House", year: 2022, img: project1 },
  { id: "p10", title: "Ainslie Cottage Extension", suburb: "Ainslie", location: "North Canberra", type: "Renovation", year: 2022, img: project2 },
  { id: "p11", title: "Forde Street Townhomes", suburb: "Forde", location: "Gungahlin", type: "Townhouse", year: 2021, img: project3 },
  { id: "p12", title: "Red Hill Escarpment House", suburb: "Red Hill", location: "South Canberra", type: "House", year: 2021, img: project4 },
];

const TYPES = ["All", "House", "Duplex", "Townhouse", "Apartment", "Renovation", "Knockdown Rebuild"] as const;
const LOCATIONS = [
  "All",
  "North Canberra",
  "South Canberra",
  "Inner South",
  "Gungahlin",
  "Belconnen",
  "Woden Valley",
  "Tuggeranong",
  "Molonglo Valley",
] as const;

function ProjectsPage() {
  const scrolled = useScrolled(20);
  const [menuOpen, setMenuOpen] = useState(false);
  const [type, setType] = useState<(typeof TYPES)[number]>("All");
  const [loc, setLoc] = useState<(typeof LOCATIONS)[number]>("All");

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const filtered = useMemo(
    () =>
      PROJECTS.filter(
        (p) =>
          (type === "All" || p.type === type) &&
          (loc === "All" || p.location === loc),
      ).sort((a, b) => b.year - a.year),
    [type, loc],
  );

  return (
    <div className="bg-background text-foreground">
      <FloatingHeader
        scrolled={scrolled}
        onMenu={() => setMenuOpen(true)}
        variant="solid"
      />
      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* Intro */}
      <section className="bg-surface-1 pt-32 md:pt-40">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="grid gap-10 py-16 md:grid-cols-12 md:items-end md:py-24">
            <div className="md:col-span-8">
              <p className="eyebrow mb-6">Projects · 2010 — 2026</p>
              <h1 className="font-display text-5xl leading-[1.02] md:text-7xl">
                500 homes.<br />
                <span className="text-ink-mute">One city.</span>
              </h1>
            </div>
            <p className="max-w-md text-base leading-relaxed text-ink-soft md:col-span-4 md:text-lg">
              Fifteen years of building across Canberra — from Braddon
              courtyard houses to Tuggeranong family homes. Filter by home
              type or district to explore the catalogue.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-[68px] z-30 border-y border-line bg-surface-2/95 backdrop-blur">
        <div className="mx-auto max-w-[1400px] space-y-4 px-6 py-5 md:space-y-3 md:px-10">
          <FilterRow
            label="Type"
            options={TYPES}
            value={type}
            onChange={(v) => setType(v as (typeof TYPES)[number])}
          />
          <FilterRow
            label="Location"
            options={LOCATIONS}
            value={loc}
            onChange={(v) => setLoc(v as (typeof LOCATIONS)[number])}
          />
        </div>
      </section>

      {/* Grid */}
      <section className="bg-background">
        <div className="mx-auto max-w-[1400px] px-6 py-20 md:px-10 md:py-28">
          <div className="mb-10 flex items-baseline justify-between border-b border-line pb-4 md:mb-14">
            <p className="eyebrow">
              {filtered.length} {filtered.length === 1 ? "project" : "projects"}
            </p>
            {(type !== "All" || loc !== "All") && (
              <button
                onClick={() => {
                  setType("All");
                  setLoc("All");
                }}
                className="text-xs uppercase tracking-[0.24em] text-ink-mute hover:text-accent"
              >
                Clear filters
              </button>
            )}
          </div>

          {filtered.length === 0 ? (
            <div className="flex min-h-[40vh] items-center justify-center">
              <p className="max-w-sm text-center text-ink-soft">
                No projects match this combination yet. Try widening your
                filters — or{" "}
                <a href="/#contact" className="text-accent underline underline-offset-4">
                  ask us about a new build
                </a>
                .
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 md:gap-y-20 lg:grid-cols-3">
              {filtered.map((p) => (
                <ProjectCard key={p.id} p={p} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-surface-3">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
          <div className="grid gap-10 md:grid-cols-12 md:items-end">
            <h2 className="font-display text-4xl leading-tight md:col-span-8 md:text-6xl">
              Your project could be next in this catalogue.
            </h2>
            <a
              href="/#contact"
              className="group inline-flex w-fit items-center gap-3 rounded-full border border-ink px-6 py-3 text-xs uppercase tracking-[0.24em] transition hover:bg-ink hover:text-background md:col-span-4 md:justify-self-end"
            >
              Start an enquiry
              <ArrowUpRight
                strokeWidth={1}
                className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function FilterRow({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
      <span className="w-20 shrink-0 text-[0.7rem] uppercase tracking-[0.24em] text-ink-mute">
        {label}
      </span>
      <div className="-mx-1 flex flex-wrap gap-2 md:mx-0">
        {options.map((opt) => {
          const active = opt === value;
          return (
            <button
              key={opt}
              onClick={() => onChange(opt)}
              className={`rounded-full border px-4 py-1.5 text-xs tracking-wide transition ${
                active
                  ? "border-ink bg-ink text-background"
                  : "border-line bg-background text-ink-soft hover:border-ink/40 hover:text-ink"
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ProjectCard({ p }: { p: Project }) {
  return (
    <figure className="group">
      <div className="relative overflow-hidden rounded-sm bg-surface-2">
        <div className="aspect-[4/5] w-full">
          <img
            src={p.img}
            alt={p.title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-[1200ms] group-hover:scale-[1.04]"
          />
        </div>
        <span className="absolute left-4 top-4 rounded-full bg-background/85 px-3 py-1 text-[0.65rem] uppercase tracking-[0.22em] text-ink backdrop-blur">
          {p.type}
        </span>
        <span className="num-tabular absolute right-4 top-4 rounded-full bg-ink/85 px-3 py-1 text-[0.7rem] text-background backdrop-blur">
          {p.year}
        </span>
      </div>
      <figcaption className="mt-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-xl leading-tight md:text-2xl">
            {p.title}
          </h3>
          <p className="mt-2 flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] text-ink-mute">
            <MapPin strokeWidth={1} className="h-3.5 w-3.5" />
            {p.suburb} · {p.location}
          </p>
        </div>
        <span className="mt-1 flex items-center gap-1 text-xs text-ink-mute">
          <Calendar strokeWidth={1} className="h-3.5 w-3.5" />
          <span className="num-tabular">{p.year}</span>
        </span>
      </figcaption>
    </figure>
  );
}
