import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  Ear,
  PenTool,
  Calculator,
  Hammer,
  ShieldCheck,
  KeyRound,
  Plus,
  Minus,
} from "lucide-react";
import {
  FloatingHeader,
  MenuOverlay,
  Footer,
  useScrolled,
} from "@/components/site/chrome";
import { PROJECTS } from "@/lib/projects";
import heroImg from "@/assets/service-custom-hero.jpg";
import interiorImg from "@/assets/service-custom-interior.jpg";
import detailImg from "@/assets/service-custom-detail.jpg";

export const Route = createFileRoute("/services/custom-homes")({
  head: () => ({
    meta: [
      { title: "Custom Homes in Canberra — Deol Build" },
      {
        name: "description",
        content:
          "One-off custom homes designed and delivered end-to-end in Canberra. Fixed-price contracts, weekly site reporting and a 15-year build record.",
      },
      { property: "og:title", content: "Custom Homes in Canberra — Deol Build" },
      {
        property: "og:description",
        content:
          "Bespoke Canberra homes built end-to-end — honest budgets, weekly reporting, obsessive quality.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CustomHomesPage,
});

const STAGES = [
  { icon: Ear, t: "Listen", d: "Site, brief, budget band — before a line is drawn." },
  { icon: PenTool, t: "Design", d: "Architect or ours, resolved for buildability." },
  { icon: Calculator, t: "Price", d: "Line-by-line fixed price. No provisional fog." },
  { icon: Hammer, t: "Build", d: "One supervisor, one crew, weekly photo reports." },
  { icon: ShieldCheck, t: "Verify", d: "Independent inspections at six hold points." },
  { icon: KeyRound, t: "Handover", d: "Zero-defect walkthrough, then 6 and 12 month care." },
];

const INCLUSIONS = [
  "Fixed-price building contract",
  "Dedicated site supervisor",
  "Weekly photo + cost report",
  "Structural engineering coordination",
  "Energy rating to 7 star minimum",
  "Custom joinery documentation",
  "Independent frame + waterproofing checks",
  "12-month defect care period",
];

const FAQS = [
  {
    q: "What does a custom home cost in Canberra?",
    a: "Most of our custom homes land between $900k and $3M depending on size, site slope and finish level. We give you a realistic band in the first conversation — not after you've paid for drawings.",
  },
  {
    q: "Can you work with my own architect?",
    a: "Yes. Roughly half our homes come to us with an architect already engaged. We join early to price and pressure-test buildability before documentation is locked.",
  },
  {
    q: "How long does a build take?",
    a: "Typically 10 to 16 months on site for a single residence, plus 3 to 6 months of design and approvals beforehand.",
  },
  {
    q: "How do you handle variations?",
    a: "Nothing proceeds without a written, priced variation you approve. Our average variation spend across the last 40 homes was under 3% of contract value.",
  },
];

function CustomHomesPage() {
  const scrolled = useScrolled();
  const [menuOpen, setMenuOpen] = useState(false);
  const [open, setOpen] = useState<number | null>(0);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const related = PROJECTS.slice(0, 3);

  return (
    <div className="bg-background text-foreground">
      <FloatingHeader scrolled={scrolled} onMenu={() => setMenuOpen(true)} variant="over-hero" />
      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* Hero */}
      <section className="relative min-h-[88vh] w-full overflow-hidden">
        <img
          src={heroImg}
          alt="Custom home built by Deol Build at dusk in Canberra"
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
            <span className="text-white">Custom Homes</span>
          </nav>
          <p className="eyebrow mb-6 text-white/60">Service 01</p>
          <h1 className="max-w-4xl font-display text-5xl leading-[1.02] text-white md:text-8xl">
            Custom homes,<br />built once — properly.
          </h1>
          <p className="mt-8 max-w-md text-base font-light leading-relaxed text-white/75">
            One-off residences designed and delivered end-to-end across Canberra.
          </p>
        </div>
      </section>

      {/* Meta strip */}
      <section className="bg-surface-1">
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-px bg-line md:grid-cols-4">
          {[
            ["Typical range", "$900k – $3M"],
            ["On site", "10 – 16 months"],
            ["Contract", "Fixed price"],
            ["Delivered", "500+ homes"],
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
                A house you'll still love in the twentieth year.
              </h2>
            </div>
            <div className="md:col-span-6 md:col-start-7">
              <p className="text-lg font-light leading-relaxed text-ink-soft">
                We build a small number of custom homes each year so every site
                keeps one supervisor and one trusted crew from slab to handover.
              </p>
              <p className="mt-6 text-base font-light leading-relaxed text-ink-mute">
                Budget is set honestly at the start and defended weekly. What you
                see in the contract is what you pay — and what you feel underfoot
                fifteen years later is the reason people keep sending us their
                friends.
              </p>
            </div>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-6 md:mt-32 md:grid-cols-12">
            <div className="md:col-span-7">
              <img
                src={interiorImg}
                alt="Open living space with oak floors in a Deol Build custom home"
                loading="lazy"
                width={1200}
                height={1500}
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            <div className="md:col-span-5 md:mt-32">
              <img
                src={detailImg}
                alt="Custom joinery and stone benchtop detail"
                loading="lazy"
                width={1400}
                height={900}
                className="aspect-[5/4] w-full object-cover"
              />
              <p className="mt-6 max-w-xs text-sm font-light text-ink-mute">
                Joinery documented to millimetre, made locally, installed by the
                people who drew it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stages */}
      <section className="bg-surface-2">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-40">
          <p className="eyebrow mb-6">How it runs</p>
          <h2 className="mb-16 max-w-2xl font-display text-4xl leading-tight md:mb-24 md:text-6xl">
            Six stages. No surprises.
          </h2>
          <div className="grid grid-cols-2 gap-px bg-line md:grid-cols-6">
            {STAGES.map((s, i) => (
              <div key={s.t} className="bg-surface-2 px-6 py-10 md:px-6 md:py-12">
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
                Standard,<br />not upgrade.
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
              <p className="eyebrow mb-6">Recent custom homes</p>
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
              Tell us about your site.
            </h2>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-4 rounded-full border border-background/30 px-8 py-4 text-xs uppercase tracking-[0.24em] transition hover:bg-background hover:text-ink"
            >
              Start a conversation
              <ArrowRight strokeWidth={1} className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
