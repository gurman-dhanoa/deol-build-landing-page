import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  ClipboardCheck,
  FileSearch,
  Truck,
  Hammer,
  ShieldCheck,
  KeyRound,
  Plus,
  Minus,
  MapPin,
  Trees,
  Wallet,
  Recycle,
} from "lucide-react";
import {
  FloatingHeader,
  MenuOverlay,
  Footer,
  useScrolled,
} from "@/components/site/chrome";
import { PROJECTS } from "@/lib/projects";
import heroImg from "@/assets/service-kdr-hero.jpg";
import demoImg from "@/assets/service-kdr-demo.jpg";
import frameImg from "@/assets/service-kdr-frame.jpg";

export const Route = createFileRoute("/services/knockdown-rebuild")({
  head: () => ({
    meta: [
      { title: "Knockdown Rebuild in Canberra — Deol Build" },
      {
        name: "description",
        content:
          "Knockdown rebuild specialists in Canberra. Site feasibility, demolition, approvals and a fixed-price new home — keep the street you love.",
      },
      {
        property: "og:title",
        content: "Knockdown Rebuild in Canberra — Deol Build",
      },
      {
        property: "og:description",
        content:
          "Replace a tired house with a home built for the next thirty years — same block, same postcode, one accountable builder.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: KnockdownRebuildPage,
});

const WHY = [
  {
    icon: MapPin,
    t: "Keep the postcode",
    d: "Same school run, same neighbours, same walk to the shops.",
  },
  {
    icon: Wallet,
    t: "No second stamp duty",
    d: "You already own the land — the budget goes into the house.",
  },
  {
    icon: Trees,
    t: "Keep the garden",
    d: "Mature trees and landscaping protected through demolition.",
  },
  {
    icon: Recycle,
    t: "Less waste",
    d: "Over 80% of demolition material diverted from landfill.",
  },
];

const STAGES = [
  {
    icon: FileSearch,
    t: "Feasibility",
    d: "Block, zoning, setbacks and slope assessed before you commit a dollar.",
  },
  {
    icon: ClipboardCheck,
    t: "Design & approval",
    d: "DA or exempt pathway mapped, drawings resolved for your block.",
  },
  {
    icon: Truck,
    t: "Demolition",
    d: "Asbestos audit, service disconnections, fenced and sorted removal.",
  },
  {
    icon: Hammer,
    t: "Build",
    d: "One supervisor, one crew, weekly photo and cost reporting.",
  },
  {
    icon: ShieldCheck,
    t: "Verify",
    d: "Independent inspections at six hold points before lining.",
  },
  {
    icon: KeyRound,
    t: "Move back in",
    d: "Zero-defect handover, then 6 and 12 month care visits.",
  },
];

const INCLUSIONS = [
  "Free site feasibility assessment",
  "Asbestos audit and licensed removal",
  "Service disconnection coordination",
  "Demolition and site clearance",
  "Tree protection to council standard",
  "DA / building approval management",
  "Fixed-price building contract",
  "12-month defect care period",
];

const FAQS = [
  {
    q: "Is a knockdown rebuild cheaper than buying again?",
    a: "Usually, yes. You avoid stamp duty, agent fees and moving costs on a new purchase — in Canberra that is often $60k to $110k that goes into the house instead.",
  },
  {
    q: "How much does demolition cost?",
    a: "A typical single-storey Canberra home is $22k to $38k including asbestos removal, service disconnections and site clearance. We price it as a line item, not a provisional sum.",
  },
  {
    q: "Where do we live during the build?",
    a: "Most clients rent nearby for 11 to 15 months. We lock the program before demolition so your lease dates line up with handover, not guesswork.",
  },
  {
    q: "Can we keep the trees and the pool?",
    a: "Often. Mature trees, established landscaping and pools can be protected and worked around — we set exclusion zones at feasibility stage and hold the demolition crew to them.",
  },
];

function KnockdownRebuildPage() {
  const scrolled = useScrolled();
  const [menuOpen, setMenuOpen] = useState(false);
  const [open, setOpen] = useState<number | null>(0);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const related = PROJECTS.slice(3, 6);

  return (
    <div className="bg-background text-foreground">
      <FloatingHeader scrolled={scrolled} onMenu={() => setMenuOpen(true)} variant="over-hero" />
      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* Hero */}
      <section className="relative min-h-[88vh] w-full overflow-hidden">
        <img
          src={heroImg}
          alt="New Deol Build home at dusk between existing houses on a Canberra street"
          width={1600}
          height={1008}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/25 to-ink/40" />
        <div className="relative mx-auto flex min-h-[88vh] max-w-[1400px] flex-col justify-end px-6 pb-16 pt-32 md:px-10 md:pb-24">
          <nav className="mb-10 flex items-center gap-3 text-xs uppercase tracking-[0.24em] text-white/60">
            <Link to="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <span className="text-white/90">Services</span>
            <span>/</span>
            <span className="text-white">Knockdown Rebuild</span>
          </nav>
          <p className="eyebrow mb-6 text-white/60">Service 02</p>
          <h1 className="max-w-4xl font-display text-5xl leading-[1.02] text-white md:text-8xl">
            Same street.<br />New house.
          </h1>
          <p className="mt-8 max-w-md text-base font-light leading-relaxed text-white/75">
            Replace what no longer serves — and keep everything you love about
            where you already live.
          </p>
        </div>
      </section>

      {/* Meta strip */}
      <section className="bg-surface-1">
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-px bg-line md:grid-cols-4">
          {[
            ["Typical range", "$750k – $2.4M"],
            ["Demolition to slab", "6 – 9 weeks"],
            ["On site", "11 – 15 months"],
            ["Rebuilds delivered", "180+"],
          ].map(([k, v]) => (
            <div key={k} className="bg-surface-1 px-6 py-10 md:px-10 md:py-14">
              <p className="eyebrow mb-3">{k}</p>
              <p className="font-display text-2xl md:text-3xl">{v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Narrative */}
      <section className="bg-background">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-40">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-20">
            <div className="md:col-span-5">
              <p className="eyebrow mb-6">The approach</p>
              <h2 className="font-display text-4xl leading-tight md:text-5xl">
                The land was never the problem.
              </h2>
            </div>
            <div className="md:col-span-6 md:col-start-7">
              <p className="text-lg font-light leading-relaxed text-ink-soft">
                Most families who call us love their block and have outgrown the
                house sitting on it. A rebuild keeps the address and spends the
                budget where it actually changes daily life.
              </p>
              <p className="mt-6 text-base font-light leading-relaxed text-ink-mute">
                We start with feasibility, not a sales meeting — slope, sewer,
                setbacks, solar access and tree protection all tested before a
                single drawing is paid for. If the block doesn't stack up, we
                tell you that first.
              </p>
            </div>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-6 md:mt-32 md:grid-cols-12">
            <div className="md:col-span-7">
              <img
                src={demoImg}
                alt="Controlled demolition of an old house on a Canberra block"
                loading="lazy"
                width={1200}
                height={1504}
                className="aspect-[4/5] w-full object-cover"
              />
              <p className="mt-6 max-w-xs text-sm font-light text-ink-mute">
                Fenced, audited, sorted. Demolition is a construction stage — not
                a wrecking job.
              </p>
            </div>
            <div className="md:col-span-5 md:mt-32">
              <img
                src={frameImg}
                alt="New slab and timber frame rising on the cleared block"
                loading="lazy"
                width={1408}
                height={912}
                className="aspect-[5/4] w-full object-cover"
              />
              <p className="mt-6 max-w-xs text-sm font-light text-ink-mute">
                Slab down within nine weeks of the old house coming away.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why rebuild */}
      <section className="bg-surface-2">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-40">
          <p className="eyebrow mb-6">Why rebuild</p>
          <h2 className="mb-16 max-w-2xl font-display text-4xl leading-tight md:mb-24 md:text-6xl">
            Move without moving.
          </h2>
          <div className="grid grid-cols-1 gap-px bg-line md:grid-cols-4">
            {WHY.map((w) => (
              <div key={w.t} className="bg-surface-2 px-6 py-12 md:px-8 md:py-16">
                <w.icon strokeWidth={0.75} className="h-9 w-9 text-accent" />
                <h3 className="mt-10 font-display text-2xl">{w.t}</h3>
                <p className="mt-4 text-sm font-light leading-relaxed text-ink-soft">
                  {w.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stages */}
      <section className="bg-background">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-40">
          <p className="eyebrow mb-6">How it runs</p>
          <h2 className="mb-16 max-w-2xl font-display text-4xl leading-tight md:mb-24 md:text-6xl">
            Old house out. New house in.
          </h2>
          <div className="grid grid-cols-2 gap-px bg-line md:grid-cols-6">
            {STAGES.map((s, i) => (
              <div key={s.t} className="bg-background px-6 py-10 md:px-6 md:py-12">
                <s.icon strokeWidth={0.75} className="h-8 w-8 text-accent" />
                <p className="num-tabular mt-8 text-xs text-ink-mute">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 font-display text-xl">{s.t}</h3>
                <p className="mt-3 text-xs font-light leading-relaxed text-ink-soft">
                  {s.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inclusions */}
      <section className="bg-surface-3">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-40">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="eyebrow mb-6">Always included</p>
              <h2 className="font-display text-4xl leading-tight md:text-5xl">
                Demolition<br />to doorknob.
              </h2>
            </div>
            <ul className="grid grid-cols-1 gap-px self-start bg-line md:col-span-8 md:grid-cols-2">
              {INCLUSIONS.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-4 bg-surface-3 px-6 py-6 text-sm font-light text-ink-soft"
                >
                  <Plus strokeWidth={0.75} className="h-4 w-4 shrink-0 text-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Related projects */}
      <section className="bg-background">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-40">
          <div className="mb-16 flex items-end justify-between gap-8">
            <div>
              <p className="eyebrow mb-6">Recent rebuilds</p>
              <h2 className="font-display text-4xl leading-tight md:text-5xl">
                Built this way.
              </h2>
            </div>
            <Link
              to="/projects"
              className="hidden items-center gap-3 text-sm uppercase tracking-[0.24em] text-ink hover:text-accent md:inline-flex"
            >
              All projects
              <ArrowUpRight strokeWidth={1} className="h-5 w-5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {related.map((p) => (
              <Link
                key={p.slug}
                to="/projects/$slug"
                params={{ slug: p.slug }}
                className="group block"
              >
                <div className="overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.title}
                    loading="lazy"
                    className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="mt-5 flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-2xl">{p.title}</h3>
                  <span className="num-tabular text-xs text-ink-mute">{p.year}</span>
                </div>
                <p className="mt-1 text-sm font-light text-ink-mute">
                  {p.location} · {p.type}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-surface-1">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-40">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="eyebrow mb-6">Questions</p>
              <h2 className="font-display text-4xl leading-tight md:text-5xl">
                Asked often.
              </h2>
            </div>
            <div className="md:col-span-8">
              {FAQS.map((f, i) => (
                <div key={f.q} className="border-b border-line">
                  <button
                    onClick={() => setOpen(open === i ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-7 text-left"
                  >
                    <span className="font-display text-xl md:text-2xl">{f.q}</span>
                    {open === i ? (
                      <Minus strokeWidth={0.75} className="h-5 w-5 shrink-0 text-accent" />
                    ) : (
                      <Plus strokeWidth={0.75} className="h-5 w-5 shrink-0 text-ink-mute" />
                    )}
                  </button>
                  <div
                    className={`grid transition-all duration-500 ${
                      open === i ? "grid-rows-[1fr] pb-7" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-2xl text-sm font-light leading-relaxed text-ink-soft">
                        {f.a}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink text-background">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
          <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
            <h2 className="max-w-2xl font-display text-4xl leading-tight text-background md:text-6xl">
              Find out what your block can hold.
            </h2>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-4 rounded-full border border-background/30 px-8 py-4 text-xs uppercase tracking-[0.24em] transition hover:bg-background hover:text-ink"
            >
              Request a feasibility
              <ArrowRight strokeWidth={1} className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
