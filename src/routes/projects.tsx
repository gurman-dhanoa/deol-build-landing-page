import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, MapPin, Calendar, ChevronDown, X, SlidersHorizontal } from "lucide-react";
import {
  FloatingHeader,
  MenuOverlay,
  Footer,
  useScrolled,
} from "@/components/site/chrome";
import { PROJECTS, type Project } from "@/lib/projects";

import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";
import craftHands from "@/assets/craft-hands.jpg";

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
const YEARS = ["All", "2025", "2024", "2023", "2022", "2021"] as const;

function ProjectsPage() {
  const scrolled = useScrolled(20);
  const [menuOpen, setMenuOpen] = useState(false);
  const [type, setType] = useState<(typeof TYPES)[number]>("All");
  const [loc, setLoc] = useState<(typeof LOCATIONS)[number]>("All");
  const [year, setYear] = useState<(typeof YEARS)[number]>("All");

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
          (loc === "All" || p.location === loc) &&
          (year === "All" || String(p.year) === year),
      ).sort((a, b) => b.year - a.year),
    [type, loc, year],
  );

  const activeCount =
    (type !== "All" ? 1 : 0) + (loc !== "All" ? 1 : 0) + (year !== "All" ? 1 : 0);

  const clearAll = () => {
    setType("All");
    setLoc("All");
    setYear("All");
  };

  return (
    <div className="bg-background text-foreground">
      <FloatingHeader
        scrolled={scrolled}
        onMenu={() => setMenuOpen(true)}
        variant="solid"
      />
      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />

      <ProjectsHero />

      {/* Filters */}
      <section className="sticky top-[68px] z-30 border-y border-line bg-background/85 backdrop-blur-xl">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="flex flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between md:py-5">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-background">
                <SlidersHorizontal strokeWidth={1} className="h-4 w-4" />
              </span>
              <div className="flex flex-col">
                <span className="eyebrow">Filter</span>
                <span className="num-tabular text-xs text-ink-mute">
                  {filtered.length} of {PROJECTS.length} projects
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 md:gap-3">
              <FilterDropdown label="Type" value={type} options={TYPES} onChange={(v) => setType(v as (typeof TYPES)[number])} />
              <FilterDropdown label="Location" value={loc} options={LOCATIONS} onChange={(v) => setLoc(v as (typeof LOCATIONS)[number])} />
              <FilterDropdown label="Year" value={year} options={YEARS} onChange={(v) => setYear(v as (typeof YEARS)[number])} />
              {activeCount > 0 && (
                <button
                  onClick={clearAll}
                  className="group flex items-center gap-1.5 rounded-full border border-transparent px-3 py-2 text-[0.7rem] uppercase tracking-[0.22em] text-ink-mute transition hover:text-accent"
                >
                  Clear
                  <X strokeWidth={1.25} className="h-3.5 w-3.5 transition group-hover:rotate-90" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="bg-background">
        <div className="mx-auto max-w-[1400px] px-6 py-20 md:px-10 md:py-28">
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
              {filtered.map((p, i) => (
                <ProjectCard key={p.id} p={p} index={i} />
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

/* --------------------------------- Hero --------------------------------- */

function ProjectsHero() {
  return (
    <section className="relative overflow-hidden bg-surface-2 pt-28 md:pt-32">
      {/* Ambient blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-20 h-[520px] w-[520px] rounded-full opacity-60 blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.92 0.05 60 / 0.9), transparent 65%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-0 h-[420px] w-[420px] rounded-full opacity-70 blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.88 0.06 40 / 0.8), transparent 65%)" }}
      />

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid gap-12 py-16 md:grid-cols-12 md:items-center md:gap-8 md:py-24">
          {/* Left copy */}
          <div className="md:col-span-6 lg:col-span-5">
            <p className="eyebrow animate-reveal mb-6 flex items-center gap-3">
              <span className="inline-block h-px w-10 bg-ink/40" />
              Portfolio · 2010 — 2026
            </p>
            <h1 className="animate-reveal font-display text-[3.4rem] leading-[0.95] tracking-tight md:text-[5.6rem]" style={{ animationDelay: "80ms" }}>
              Five hundred
              <br />
              <span className="italic text-ink-soft">Canberra</span>
              <br />
              homes.
            </h1>
            <p className="animate-reveal mt-8 max-w-md text-base leading-relaxed text-ink-soft md:text-lg" style={{ animationDelay: "160ms" }}>
              A quiet catalogue of fifteen years — courtyard houses, family
              rebuilds, terrace townhomes and heritage renovations.
            </p>

            <div className="animate-reveal mt-10 flex items-center gap-8 md:gap-12" style={{ animationDelay: "240ms" }}>
              <Stat value={<Counter to={500} suffix="+" />} label="Homes delivered" />
              <span className="h-10 w-px bg-line" />
              <Stat value={<Counter to={15} />} label="Years building" />
              <span className="hidden h-10 w-px bg-line md:block" />
              <Stat value={<Counter to={9} />} label="Districts covered" className="hidden md:flex" />
            </div>
          </div>

          {/* Right image collage */}
          <div className="md:col-span-6 lg:col-span-7">
            <Collage />
          </div>
        </div>

        {/* Marquee */}
        <div className="border-t border-line/60 py-5">
          <div className="flex gap-10 overflow-hidden">
            <div className="flex shrink-0 animate-[marquee_38s_linear_infinite] gap-10 whitespace-nowrap">
              {[
                "Braddon", "Yarralumla", "Gungahlin", "Deakin", "Kingston",
                "Weston", "Cook", "Wanniassa", "Ainslie", "Forde", "Red Hill",
                "Coombs", "Molonglo", "Belconnen", "Amaroo",
              ]
                .concat([
                  "Braddon", "Yarralumla", "Gungahlin", "Deakin", "Kingston",
                  "Weston", "Cook", "Wanniassa", "Ainslie", "Forde", "Red Hill",
                  "Coombs", "Molonglo", "Belconnen", "Amaroo",
                ])
                .map((s, i) => (
                  <span key={i} className="flex items-center gap-10 text-sm uppercase tracking-[0.28em] text-ink-mute">
                    {s}
                    <span className="h-1 w-1 rounded-full bg-accent/70" />
                  </span>
                ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes float-a {
          0%, 100% { transform: translateY(0) rotate(-2deg); }
          50% { transform: translateY(-14px) rotate(-2deg); }
        }
        @keyframes float-b {
          0%, 100% { transform: translateY(0) rotate(1.5deg); }
          50% { transform: translateY(-10px) rotate(1.5deg); }
        }
        @keyframes float-c {
          0%, 100% { transform: translateY(0) rotate(-1deg); }
          50% { transform: translateY(-18px) rotate(-1deg); }
        }
      `}</style>
    </section>
  );
}

function Stat({
  value,
  label,
  className = "",
}: {
  value: React.ReactNode;
  label: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-col ${className}`}>
      <span className="font-display num-tabular text-3xl leading-none text-ink md:text-4xl">{value}</span>
      <span className="mt-2 text-[0.68rem] uppercase tracking-[0.22em] text-ink-mute">{label}</span>
    </div>
  );
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const start = performance.now();
    const dur = 1400;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to]);
  return (
    <>
      {n}
      {suffix}
    </>
  );
}

function Collage() {
  return (
    <div className="relative mx-auto aspect-[5/4] w-full max-w-[640px]">
      {/* Back frame */}
      <div
        className="absolute inset-0 rounded-md border border-line/70"
        style={{ transform: "rotate(-3deg) translate(-4%, 4%)" }}
      />
      {/* Card A — large */}
      <figure
        className="absolute left-[6%] top-[8%] h-[72%] w-[58%] overflow-hidden rounded-md shadow-[0_30px_60px_-30px_rgba(0,0,0,0.35)]"
        style={{ animation: "float-a 9s ease-in-out infinite" }}
      >
        <img src={project1} alt="Braddon Courtyard House" className="h-full w-full object-cover" />
        <figcaption className="absolute bottom-3 left-3 rounded-full bg-background/85 px-3 py-1 text-[0.62rem] uppercase tracking-[0.22em] text-ink backdrop-blur">
          Braddon · 2025
        </figcaption>
      </figure>
      {/* Card B — right top */}
      <figure
        className="absolute right-[2%] top-[2%] h-[46%] w-[42%] overflow-hidden rounded-md shadow-[0_24px_50px_-24px_rgba(0,0,0,0.4)]"
        style={{ animation: "float-b 11s ease-in-out infinite" }}
      >
        <img src={craftHands} alt="Craft detail" className="h-full w-full object-cover" />
      </figure>
      {/* Card C — right bottom */}
      <figure
        className="absolute right-[6%] bottom-[4%] h-[46%] w-[46%] overflow-hidden rounded-md shadow-[0_24px_50px_-24px_rgba(0,0,0,0.4)]"
        style={{ animation: "float-c 10s ease-in-out infinite" }}
      >
        <img src={project3} alt="Gungahlin Family Rebuild" className="h-full w-full object-cover" />
        <figcaption className="absolute bottom-3 right-3 rounded-full bg-ink/85 px-3 py-1 text-[0.62rem] uppercase tracking-[0.22em] text-background backdrop-blur">
          Gungahlin · 2024
        </figcaption>
      </figure>

      {/* Tag pill */}
      <div className="absolute -bottom-4 left-4 flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-[0.65rem] uppercase tracking-[0.24em] text-background shadow-lg">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
        Now building · 12 sites
      </div>
    </div>
  );
}

/* ------------------------------ Filter UI ------------------------------ */

function FilterDropdown({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const active = value !== "All";

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className={`group flex items-center gap-2.5 rounded-full border px-4 py-2 text-xs transition ${
          active
            ? "border-ink bg-ink text-background"
            : "border-line bg-background text-ink hover:border-ink/50"
        }`}
      >
        <span className="text-[0.65rem] uppercase tracking-[0.22em] opacity-70">{label}</span>
        <span className="max-w-[140px] truncate font-medium">{value}</span>
        <ChevronDown
          strokeWidth={1.25}
          className={`h-3.5 w-3.5 transition ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="animate-scale-in absolute right-0 z-40 mt-2 min-w-[220px] origin-top-right overflow-hidden rounded-xl border border-line bg-background shadow-[0_20px_60px_-20px_rgba(0,0,0,0.25)]">
          <ul className="max-h-[300px] overflow-y-auto p-1.5">
            {options.map((opt) => {
              const sel = opt === value;
              return (
                <li key={opt}>
                  <button
                    onClick={() => {
                      onChange(opt);
                      setOpen(false);
                    }}
                    className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition ${
                      sel
                        ? "bg-ink text-background"
                        : "text-ink-soft hover:bg-surface-2 hover:text-ink"
                    }`}
                  >
                    <span>{opt}</span>
                    {sel && <span className="h-1.5 w-1.5 rounded-full bg-accent" />}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

/* ------------------------------- Card ---------------------------------- */

function ProjectCard({ p, index }: { p: Project; index: number }) {
  return (
    <figure
      className="group animate-reveal"
      style={{ animationDelay: `${Math.min(index, 6) * 60}ms` }}
    >
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
