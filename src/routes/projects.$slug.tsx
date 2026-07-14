import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  Calendar,
  MapPin,
  Home,
  Ruler,
  Sparkles,
  CheckCircle2,
  Compass,
} from "lucide-react";
import {
  FloatingHeader,
  MenuOverlay,
  Footer,
  useScrolled,
} from "@/components/site/chrome";
import { PROJECTS, getProject, type Project } from "@/lib/projects";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Project not found — Deol Build" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { project } = loaderData;
    const title = `${project.title} — Deol Build`;
    const description = `${project.type} in ${project.suburb}, ${project.location}. Delivered ${project.year} by Deol Build. ${project.tagline}`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
      ],
    };
  },
  notFoundComponent: NotFound,
  component: ProjectDetail,
});

function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <FloatingHeader scrolled onMenu={() => {}} variant="solid" />
      <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-6 text-center">
        <p className="eyebrow mb-6">404</p>
        <h1 className="font-display text-4xl md:text-6xl">
          That project isn't in our catalogue.
        </h1>
        <Link
          to="/projects"
          className="mt-10 inline-flex items-center gap-3 rounded-full border border-ink px-6 py-3 text-xs uppercase tracking-[0.24em] hover:bg-ink hover:text-background"
        >
          <ArrowLeft strokeWidth={1} className="h-4 w-4" />
          Back to all projects
        </Link>
      </div>
    </div>
  );
}

function ProjectDetail() {
  const { project } = Route.useLoaderData();
  const scrolled = useScrolled(60);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const related = PROJECTS.filter(
    (p) => p.slug !== project.slug && (p.type === project.type || p.location === project.location),
  ).slice(0, 3);

  return (
    <div className="bg-background text-foreground">
      <FloatingHeader
        scrolled={scrolled}
        onMenu={() => setMenuOpen(true)}
        variant="over-hero"
      />
      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />

      <Hero project={project} />
      <MetaBar project={project} />
      <Narrative project={project} />
      <Gallery project={project} />
      <KeyPoints project={project} />
      <Special project={project} />
      <LocationBlock project={project} />
      <Related items={related} />
      <ClosingCta />

      <Footer />
    </div>
  );
}

/* --------------------------------- Hero --------------------------------- */

function Hero({ project }: { project: Project }) {
  return (
    <section className="relative h-[92vh] min-h-[640px] w-full overflow-hidden bg-ink text-background">
      <img
        src={project.img}
        alt={project.title}
        className="absolute inset-0 h-full w-full object-cover opacity-90"
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 35%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0.75) 100%)",
        }}
      />

      <div className="relative mx-auto flex h-full max-w-[1400px] flex-col justify-between px-6 pb-16 pt-32 md:px-10 md:pb-24 md:pt-40">
        <Link
          to="/projects"
          className="animate-reveal group inline-flex w-fit items-center gap-2 text-xs uppercase tracking-[0.24em] text-background/85 hover:text-background"
        >
          <ArrowLeft strokeWidth={1} className="h-4 w-4 transition group-hover:-translate-x-1" />
          All projects
        </Link>

        <div className="max-w-4xl">
          <div className="animate-reveal mb-6 flex flex-wrap items-center gap-3 text-[0.68rem] uppercase tracking-[0.24em] text-background/85">
            <span className="rounded-full border border-background/40 px-3 py-1">{project.type}</span>
            <span className="flex items-center gap-1.5">
              <MapPin strokeWidth={1} className="h-3.5 w-3.5" />
              {project.suburb} · {project.location}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar strokeWidth={1} className="h-3.5 w-3.5" />
              <span className="num-tabular">{project.year}</span>
            </span>
          </div>
          <h1
            className="animate-reveal font-display text-[3rem] leading-[1.02] tracking-tight text-background md:text-[6rem]"
            style={{ animationDelay: "80ms" }}
          >
            {project.title}
          </h1>
          <p
            className="animate-reveal mt-6 max-w-xl text-base text-background/80 md:text-lg"
            style={{ animationDelay: "160ms" }}
          >
            {project.tagline}
          </p>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Meta bar ------------------------------ */

function MetaBar({ project }: { project: Project }) {
  const items = [
    { icon: Home, label: "Type", value: project.type },
    { icon: MapPin, label: "Location", value: `${project.suburb}, ${project.location}` },
    { icon: Calendar, label: "Delivered", value: String(project.year) },
    { icon: Compass, label: "Build time", value: project.duration },
  ];
  return (
    <section className="border-b border-line bg-surface-2">
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 divide-y divide-line md:grid-cols-4 md:divide-y-0 md:divide-x">
        {items.map((it) => (
          <div key={it.label} className="flex items-start gap-4 px-6 py-8 md:px-10 md:py-10">
            <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line bg-background">
              <it.icon strokeWidth={1} className="h-4 w-4 text-ink" />
            </span>
            <div className="flex flex-col">
              <span className="eyebrow">{it.label}</span>
              <span className="mt-1 font-display text-lg leading-tight text-ink md:text-xl">
                {it.value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------- Narrative ------------------------------ */

function Narrative({ project }: { project: Project }) {
  return (
    <section className="bg-background">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-6 py-24 md:grid-cols-12 md:gap-16 md:px-10 md:py-32">
        <div className="md:col-span-4">
          <p className="eyebrow flex items-center gap-3">
            <span className="inline-block h-px w-8 bg-ink/40" />
            The Brief
          </p>
          <h2 className="mt-6 font-display text-4xl leading-[1.05] md:text-5xl">
            How this home came to be.
          </h2>
        </div>
        <div className="md:col-span-7 md:col-start-6">
          <div className="space-y-6 text-lg leading-relaxed text-ink-soft md:text-xl">
            {project.narrative.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
          <div className="mt-10 grid grid-cols-2 gap-6 border-t border-line pt-8 md:grid-cols-3">
            {project.specs.map((s) => (
              <div key={s.label}>
                <p className="text-[0.65rem] uppercase tracking-[0.22em] text-ink-mute">
                  {s.label}
                </p>
                <p className="num-tabular mt-2 font-display text-2xl text-ink">
                  {s.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Gallery ------------------------------- */

function Gallery({ project }: { project: Project }) {
  const [a, b, c, d, e, f] = project.gallery;
  return (
    <section className="bg-surface-3">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
        <div className="mb-12 flex items-end justify-between gap-6 md:mb-16">
          <div>
            <p className="eyebrow">Photographs</p>
            <h2 className="mt-4 font-display text-3xl md:text-5xl">On site.</h2>
          </div>
          <p className="hidden max-w-xs text-sm text-ink-mute md:block">
            Shot over three visits — dawn, midday and dusk — so the material
            palette reads the way the family will actually live in it.
          </p>
        </div>

        <div className="grid grid-cols-12 gap-4 md:gap-6">
          <figure className="col-span-12 overflow-hidden rounded-sm md:col-span-8">
            <img src={a} alt="" className="aspect-[16/10] w-full object-cover" />
          </figure>
          <figure className="col-span-6 overflow-hidden rounded-sm md:col-span-4">
            <img src={b} alt="" className="aspect-[4/5] w-full object-cover" />
          </figure>
          <figure className="col-span-6 overflow-hidden rounded-sm md:col-span-4">
            <img src={c} alt="" className="aspect-[4/5] w-full object-cover" />
          </figure>
          <figure className="col-span-12 overflow-hidden rounded-sm md:col-span-8">
            <img src={d} alt="" className="aspect-[16/10] w-full object-cover" />
          </figure>
          {e && (
            <figure className="col-span-6 overflow-hidden rounded-sm md:col-span-6">
              <img src={e} alt="" className="aspect-[4/3] w-full object-cover" />
            </figure>
          )}
          {f && (
            <figure className="col-span-6 overflow-hidden rounded-sm md:col-span-6">
              <img src={f} alt="" className="aspect-[4/3] w-full object-cover" />
            </figure>
          )}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- Key points ----------------------------- */

function KeyPoints({ project }: { project: Project }) {
  return (
    <section className="bg-background">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-6 py-24 md:grid-cols-12 md:gap-16 md:px-10 md:py-32">
        <div className="md:col-span-4">
          <p className="eyebrow flex items-center gap-3">
            <Ruler strokeWidth={1} className="h-4 w-4" />
            What's inside
          </p>
          <h2 className="mt-6 font-display text-4xl leading-[1.05] md:text-5xl">
            The specification, in plain English.
          </h2>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-ink-soft">
            Every line here is something we insisted on — not something added to
            fatten a quote.
          </p>
        </div>
        <ul className="grid gap-x-10 gap-y-5 md:col-span-7 md:col-start-6 md:grid-cols-1">
          {project.keyPoints.map((k, i) => (
            <li key={i} className="flex items-start gap-4 border-b border-line pb-5 last:border-b-0">
              <span className="num-tabular mt-1 w-8 text-xs text-ink-mute">
                {String(i + 1).padStart(2, "0")}
              </span>
              <CheckCircle2 strokeWidth={1} className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <span className="text-base leading-relaxed text-ink md:text-lg">{k}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* -------------------------------- Special ------------------------------- */

function Special({ project }: { project: Project }) {
  return (
    <section className="bg-surface-4">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
        <div className="mb-14 grid gap-8 md:grid-cols-12 md:items-end md:gap-10">
          <div className="md:col-span-7">
            <p className="eyebrow flex items-center gap-3">
              <Sparkles strokeWidth={1} className="h-4 w-4" />
              Signature moments
            </p>
            <h2 className="mt-6 font-display text-4xl leading-[1.02] md:text-6xl">
              The things worth
              <br />
              <span className="italic text-ink-soft">pointing out.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-ink-soft md:col-span-4 md:col-start-9">
            Small decisions that only reveal themselves once you're living in
            the house. These are ours for this project.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 md:gap-8">
          {project.special.map((s, i) => (
            <article
              key={i}
              className="group relative flex flex-col justify-between overflow-hidden rounded-sm border border-line bg-background p-8 transition hover:border-ink md:p-10"
            >
              <span className="num-tabular text-[0.7rem] uppercase tracking-[0.24em] text-ink-mute">
                No. {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-8 font-display text-2xl leading-tight text-ink md:text-3xl">
                {s.title}
              </h3>
              <p className="mt-6 text-sm leading-relaxed text-ink-soft md:text-base">
                {s.body}
              </p>
              <span
                aria-hidden
                className="absolute bottom-0 left-0 h-px w-0 bg-accent transition-all duration-700 group-hover:w-full"
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- Location ------------------------------- */

function LocationBlock({ project }: { project: Project }) {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    `${project.suburb} ${project.location} Canberra Australia`,
  )}&output=embed`;
  return (
    <section className="bg-background">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-6 py-24 md:grid-cols-12 md:gap-12 md:px-10 md:py-32">
        <div className="md:col-span-5">
          <p className="eyebrow">Where it stands</p>
          <h2 className="mt-6 font-display text-4xl leading-[1.05] md:text-5xl">
            {project.suburb},
            <br />
            <span className="italic text-ink-soft">{project.location}.</span>
          </h2>
          <dl className="mt-10 space-y-5 border-t border-line pt-8">
            <div className="flex items-baseline justify-between gap-6">
              <dt className="eyebrow">Client</dt>
              <dd className="text-right text-sm text-ink">{project.client}</dd>
            </div>
            {project.architect && (
              <div className="flex items-baseline justify-between gap-6 border-t border-line pt-5">
                <dt className="eyebrow">Architect</dt>
                <dd className="text-right text-sm text-ink">{project.architect}</dd>
              </div>
            )}
            <div className="flex items-baseline justify-between gap-6 border-t border-line pt-5">
              <dt className="eyebrow">Build time</dt>
              <dd className="text-right text-sm text-ink">{project.duration}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-6 border-t border-line pt-5">
              <dt className="eyebrow">Delivered</dt>
              <dd className="num-tabular text-right text-sm text-ink">{project.year}</dd>
            </div>
          </dl>
        </div>
        <div className="md:col-span-7">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm border border-line bg-surface-2">
            <iframe
              title={`Map of ${project.suburb}`}
              src={mapSrc}
              loading="lazy"
              className="absolute inset-0 h-full w-full grayscale contrast-[0.95]"
              style={{ border: 0 }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Related ------------------------------- */

function Related({ items }: { items: Project[] }) {
  if (items.length === 0) return null;
  return (
    <section className="bg-surface-2">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
        <div className="mb-12 flex items-end justify-between gap-6">
          <h2 className="font-display text-3xl md:text-5xl">Nearby & similar</h2>
          <Link
            to="/projects"
            className="hidden items-center gap-2 text-xs uppercase tracking-[0.24em] text-ink-mute hover:text-accent md:inline-flex"
          >
            All projects
            <ArrowUpRight strokeWidth={1} className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
          {items.map((p) => (
            <Link
              key={p.slug}
              to="/projects/$slug"
              params={{ slug: p.slug }}
              className="group block"
            >
              <div className="relative overflow-hidden rounded-sm">
                <img
                  src={p.img}
                  alt={p.title}
                  className="aspect-[4/5] w-full object-cover transition duration-[1200ms] group-hover:scale-[1.04]"
                />
                <span className="num-tabular absolute right-3 top-3 rounded-full bg-ink/85 px-2.5 py-0.5 text-[0.65rem] text-background backdrop-blur">
                  {p.year}
                </span>
              </div>
              <h3 className="mt-4 font-display text-lg transition group-hover:text-accent md:text-xl">
                {p.title}
              </h3>
              <p className="mt-1 text-[0.7rem] uppercase tracking-[0.22em] text-ink-mute">
                {p.type} · {p.suburb}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- CTA ---------------------------------- */

function ClosingCta() {
  return (
    <section className="bg-ink text-background">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-6 py-24 md:grid-cols-12 md:items-end md:px-10 md:py-32">
        <h2 className="font-display text-4xl leading-tight text-background md:col-span-8 md:text-6xl">
          Want a home like this on your block?
        </h2>
        <Link
          to="/"
          hash="contact"
          className="group inline-flex w-fit items-center gap-3 rounded-full border border-background/60 px-6 py-3 text-xs uppercase tracking-[0.24em] text-background transition hover:bg-background hover:text-ink md:col-span-4 md:justify-self-end"
        >
          Start an enquiry
          <ArrowUpRight
            strokeWidth={1}
            className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </Link>
      </div>
    </section>
  );
}
