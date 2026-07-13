import { createFileRoute } from "@tanstack/react-router";
import {
  Plus,
  ArrowUpRight,
  ArrowRight,
  Minus,
  Mail,
  Phone,
  MapPin,
  Ear,
  PenTool,
  Calculator,
  Hammer,
  ShieldCheck,
  KeyRound,
} from "lucide-react";
import {
  FloatingHeader,
  MenuOverlay,
  Footer,
  useScrolled,
} from "@/components/site/chrome";
import { useState } from "react";


import heroPoster from "@/assets/hero-poster.jpg";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";
import craftHands from "@/assets/craft-hands.jpg";
import philosophyImg from "@/assets/philosophy.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { property: "og:image", content: "https://images.deolbuild.com.au/og.jpg" },
    ],
  }),
  component: Landing,
});

function Landing() {
  const scrolled = useScrolled(80);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);


  return (
    <div id="top" className="bg-background text-foreground">
      <FloatingHeader
        scrolled={scrolled}
        onMenu={() => setMenuOpen(true)}
      />
      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />

      <Hero />
      <Stats />
      <Philosophy />
      <Process />
      <Services />
      <Projects />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
}




/* ---------------- Hero ---------------- */

function Hero() {
  return (
    <section className="relative h-[100svh] w-full overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover animate-drift"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={heroPoster}
      >
        <source
          src="https://videos.pexels.com/video-files/7578540/7578540-hd_1920_1080_25fps.mp4"
          type="video/mp4"
        />
        <source
          src="https://videos.pexels.com/video-files/4488669/4488669-hd_1920_1080_25fps.mp4"
          type="video/mp4"
        />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/60" />

      <div className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-between px-6 pb-16 pt-28 md:px-10 md:pb-20 md:pt-40">
        <div className="animate-reveal flex items-baseline gap-3 text-white">
          <span className="font-display text-3xl tracking-tight md:text-4xl">
            Deol
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          <span className="text-xs uppercase tracking-[0.32em] text-white/80">
            Build
          </span>
        </div>

        <div className="animate-reveal flex items-end justify-between gap-8">
          <h1 className="font-display text-[clamp(2.5rem,7vw,6rem)] leading-[1.02] tracking-tight text-white">
            Built honest.<br />
            <em className="not-italic text-white/70">Built to last.</em>
          </h1>

          <a
            href="#projects"
            aria-label="View our work"
            className="group hidden shrink-0 items-center gap-3 text-xs uppercase tracking-[0.24em] text-white md:inline-flex"
          >
            <span>Our work</span>
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/50 transition group-hover:bg-white group-hover:text-ink">
              <ArrowRight strokeWidth={1} className="h-4 w-4" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Stats ---------------- */

function Stats() {
  const items = [
    { n: "15", u: "Years", d: "of continuous craft" },
    { n: "500+", u: "Homes", d: "delivered across Australia" },
    { n: "98%", u: "On-time", d: "handover, every quarter" },
    { n: "12", u: "Trades", d: "under one roof" },
  ];
  return (
    <section className="bg-surface-1">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
        <div className="grid grid-cols-2 gap-x-6 gap-y-16 md:grid-cols-4 md:gap-x-12">
          {items.map((it) => (
            <div key={it.u} className="flex flex-col gap-3">
              <div className="hairline w-10" />
              <div className="font-display text-5xl leading-none text-ink num-tabular md:text-7xl">
                {it.n}
              </div>
              <div className="mt-2 text-sm uppercase tracking-[0.22em] text-ink-soft">
                {it.u}
              </div>
              <div className="text-sm font-light text-ink-mute">{it.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Philosophy ---------------- */

function Philosophy() {
  const horizon = [
    { y: "2010", t: "Founded as Punjab Homes — one crew, one ute, one promise." },
    { y: "2018", t: "250 homes in. A reputation built on referrals, not billboards." },
    { y: "2025", t: "Rebuilt as Deol Build — same hands, sharper standard." },
    { y: "2030", t: "A thousand honest homes across Australia. Zero shortcuts taken." },
  ];
  return (
    <section id="philosophy" className="bg-background">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-40">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-20">
          {/* Left: vision */}
          <div className="md:col-span-7">
            <p className="eyebrow mb-8">Our Philosophy</p>
            <h2 className="font-display text-4xl leading-[1.05] md:text-[5.25rem] md:leading-[0.98]">
              We are not<br />
              chasing the<br />
              <em className="not-italic text-accent">next project.</em>
            </h2>
            <div className="hairline mt-12 w-16 md:mt-16" />
            <p className="mt-10 max-w-xl font-display text-2xl leading-snug text-ink-soft md:text-3xl">
              We are building a company our grandchildren will still be proud to
              put their name on — one honest home at a time.
            </p>
            <p className="mt-8 max-w-xl text-base font-light leading-relaxed text-ink-mute md:text-lg">
              Fifteen years taught us that a home outlasts a trend, a budget,
              and a builder's memory. So we build for the decade after handover,
              not the day of it.
            </p>
          </div>

          {/* Right: image + horizon */}
          <div className="md:col-span-5">
            <div className="overflow-hidden rounded-sm">
              <img
                src={philosophyImg}
                alt="A Deol Build home, twenty years on"
                loading="lazy"
                className="h-[360px] w-full object-cover md:h-[440px]"
              />
            </div>
            <p className="eyebrow mt-10 mb-6">The Long View</p>
            <ol className="flex flex-col">
              {horizon.map((h, i) => (
                <li
                  key={h.y}
                  className={`grid grid-cols-[auto_1fr] items-baseline gap-6 py-5 ${
                    i !== horizon.length - 1 ? "border-b border-line" : ""
                  }`}
                >
                  <span className="num-tabular font-display text-xl text-ink md:text-2xl">
                    {h.y}
                  </span>
                  <span className="text-sm font-light leading-relaxed text-ink-soft md:text-base">
                    {h.t}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Process ---------------- */

function Process() {
  const steps = [
    { n: "01", Icon: Ear, t: "Listen", d: "Site walk, brief and budget alignment before a single line is drawn.", chk: "Written brief signed off" },
    { n: "02", Icon: PenTool, t: "Design", d: "Architect-led design with orientation, materials and detailing resolved.", chk: "Fixed drawing set" },
    { n: "03", Icon: Calculator, t: "Price", d: "Line-item transparent pricing. No allowances that quietly balloon later.", chk: "Locked fixed-price contract" },
    { n: "04", Icon: Hammer, t: "Build", d: "One dedicated site supervisor. Trades we have used for a decade.", chk: "Weekly progress report" },
    { n: "05", Icon: ShieldCheck, t: "Inspect", d: "Independent inspections at frame, lock-up, waterproofing and finish.", chk: "4 third-party sign-offs" },
    { n: "06", Icon: KeyRound, t: "Handover", d: "Keys, warranties, a walk-through and a builder on call for 10 years.", chk: "10-year structural warranty" },
  ];
  return (
    <section id="process" className="bg-surface-2">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-40">
        <div className="mb-16 grid gap-10 md:mb-24 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <p className="eyebrow mb-6">The Process</p>
            <h2 className="font-display text-4xl leading-[1.05] md:text-6xl">
              Six stages.<br />
              <span className="text-ink-mute">One standard.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-ink-soft md:col-span-4 md:text-base">
            Every home moves through the same six checkpoints — the same way, in the same order, for the last fifteen years.
          </p>
        </div>

        <div className="grid gap-16 md:grid-cols-12 md:gap-20">
          {/* Sticky visual column */}
          <div className="md:col-span-5">
            <div className="md:sticky md:top-28">
              <div className="relative overflow-hidden rounded-sm">
                <img
                  src={craftHands}
                  alt="Craftsman laying timber flooring"
                  loading="lazy"
                  className="h-[420px] w-full object-cover md:h-[640px]"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/60 to-transparent p-6 md:p-8">
                  <p className="eyebrow mb-2 text-background/80">Quality, in practice</p>
                  <p className="font-display text-xl leading-snug text-background md:text-2xl">
                    Nothing gets covered up until it has been signed off.
                  </p>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-line pt-6 text-xs uppercase tracking-[0.22em] text-ink-mute">
                <span>Stage 01 → 06</span>
                <span className="num-tabular">10–14 mo avg</span>
              </div>
            </div>
          </div>

          {/* Timeline column */}
          <ol className="relative md:col-span-7">
            <span
              aria-hidden
              className="pointer-events-none absolute left-[11px] top-2 bottom-2 w-px bg-line md:left-[14px]"
            />
            {steps.map(({ n, Icon, t, d, chk }, i) => (
              <li key={n} className="group relative pl-12 md:pl-20">
                <span className="absolute left-0 top-1 flex h-6 w-6 items-center justify-center rounded-full border border-line bg-background md:h-8 md:w-8">
                  <Icon strokeWidth={1} className="h-3.5 w-3.5 text-ink md:h-4 md:w-4" />
                </span>
                <div
                  className={`flex flex-col gap-4 pb-12 md:pb-16 ${
                    i !== steps.length - 1 ? "border-b border-line/70" : ""
                  }`}
                >
                  <div className="flex items-baseline gap-6">
                    <span className="num-tabular text-xs text-ink-mute">{n}</span>
                    <h3 className="font-display text-3xl leading-none md:text-5xl">
                      {t}
                    </h3>
                  </div>
                  <p className="max-w-lg text-base leading-relaxed text-ink-soft md:text-lg">
                    {d}
                  </p>
                  <div className="flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-accent">
                    <ShieldCheck strokeWidth={1} className="h-4 w-4" />
                    <span>{chk}</span>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}


/* ---------------- Services ---------------- */

function Services() {
  const services = [
    { n: "01", t: "Custom Homes", d: "One-off residences designed and delivered end-to-end." },
    { n: "02", t: "Knockdown Rebuild", d: "Replace what no longer serves — keep the postcode you love." },
    { n: "03", t: "Major Renovations", d: "Structural extensions, second storeys, whole-home reworks." },
    { n: "04", t: "Luxury Multi-Res", d: "Duplexes and small-scale developments with private-home finish." },
  ];
  return (
    <section id="services" className="bg-surface-3">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-40">
        <div className="mb-16 flex items-end justify-between gap-8 md:mb-24">
          <div>
            <p className="eyebrow mb-6">Services</p>
            <h2 className="font-display text-4xl leading-tight md:text-6xl">
              What we build.
            </h2>
          </div>
          <a
            href="#contact"
            className="hidden items-center gap-3 text-sm uppercase tracking-[0.24em] text-ink hover:text-accent md:inline-flex"
          >
            Enquire
            <ArrowUpRight strokeWidth={1} className="h-5 w-5" />
          </a>
        </div>

        <div className="grid grid-cols-1 gap-px overflow-hidden bg-line md:grid-cols-2">
          {services.map((s) => (
            <div
              key={s.n}
              className="group relative flex min-h-[280px] flex-col justify-between bg-surface-3 p-10 transition hover:bg-surface-1 md:p-14"
            >
              <span className="num-tabular text-xs text-ink-mute">{s.n}</span>
              <div>
                <h3 className="font-display text-3xl md:text-4xl">{s.t}</h3>
                <p className="mt-4 max-w-sm text-sm font-light text-ink-soft">
                  {s.d}
                </p>
                <div className="mt-8 flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-ink-mute transition group-hover:text-accent">
                  <span>Learn more</span>
                  <ArrowRight strokeWidth={1} className="h-4 w-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Projects ---------------- */

function Projects() {
  const items = [
    { img: project1, t: "Byron Ridge House", loc: "Byron Bay, NSW", y: "2024", ratio: "aspect-[4/5]" },
    { img: project2, t: "Fitzroy Kitchen", loc: "Melbourne, VIC", y: "2024", ratio: "aspect-[5/4]" },
    { img: project3, t: "Spiral Residence", loc: "Adelaide Hills, SA", y: "2023", ratio: "aspect-[4/5]" },
    { img: project4, t: "Bushland Pavilion", loc: "Perth, WA", y: "2023", ratio: "aspect-[16/10]" },
  ];
  return (
    <section id="projects" className="bg-background">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-40">
        <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-12 md:mb-24">
          <div className="md:col-span-8">
            <p className="eyebrow mb-6">Featured Projects</p>
            <h2 className="font-display text-4xl leading-tight md:text-6xl">
              A quiet catalogue<br />of finished homes.
            </h2>
          </div>
          <div className="flex items-end md:col-span-4 md:justify-end">
            <a
              href="#contact"
              className="inline-flex items-center gap-3 text-sm uppercase tracking-[0.24em] text-ink hover:text-accent"
            >
              All projects
              <ArrowUpRight strokeWidth={1} className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-20 md:grid-cols-12">
          {items.map((p, i) => (
            <figure
              key={p.t}
              className={`${
                i === 0
                  ? "md:col-span-6"
                  : i === 1
                  ? "md:col-span-5 md:col-start-8 md:mt-32"
                  : i === 2
                  ? "md:col-span-5"
                  : "md:col-span-7 md:col-start-6"
              }`}
            >
              <div className={`overflow-hidden rounded-sm ${p.ratio}`}>
                <img
                  src={p.img}
                  alt={p.t}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-[1200ms] hover:scale-[1.03]"
                />
              </div>
              <figcaption className="mt-6 flex items-baseline justify-between gap-4">
                <div>
                  <h3 className="font-display text-2xl">{p.t}</h3>
                  <p className="mt-1 text-sm text-ink-mute">{p.loc}</p>
                </div>
                <span className="num-tabular text-xs text-ink-mute">{p.y}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Testimonials ---------------- */

function Testimonials() {
  const items = [
    {
      q: "They quoted a number and held it. In fifteen years of building, we have never known that.",
      n: "Andrea & Marc",
      p: "Custom Home, Brighton VIC",
    },
    {
      q: "Every Friday, photos. Every Wednesday, a call. We always knew where our home was.",
      n: "The Nguyen Family",
      p: "Knockdown Rebuild, Parramatta NSW",
    },
    {
      q: "The finish is quiet but it is everywhere. The kind of quality you feel a year later.",
      n: "Priya S.",
      p: "Major Renovation, Adelaide SA",
    },
  ];
  return (
    <section id="testimonials" className="bg-surface-2">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-40">
        <p className="eyebrow mb-6">In their words</p>
        <h2 className="mb-20 max-w-3xl font-display text-4xl leading-tight md:text-6xl">
          Fifteen years of clients.<br />
          <em className="not-italic text-ink-mute">One recurring word — trust.</em>
        </h2>

        <div className="grid grid-cols-1 gap-px overflow-hidden bg-line md:grid-cols-3">
          {items.map((t, i) => (
            <blockquote
              key={i}
              className="flex flex-col justify-between gap-10 bg-surface-2 p-10 md:p-12"
            >
              <p className="font-display text-2xl leading-snug text-ink md:text-3xl">
                “{t.q}”
              </p>
              <footer>
                <div className="hairline mb-4 w-8" />
                <div className="text-sm text-ink">{t.n}</div>
                <div className="text-xs text-ink-mute">{t.p}</div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */

function FAQItem({
  q,
  a,
  index,
}: {
  q: string;
  a: string;
  index: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <li className="border-t border-line">
      <button
        onClick={() => setOpen(!open)}
        className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-6 py-7 text-left md:gap-10"
      >
        <span className="num-tabular text-xs text-ink-mute">{index}</span>
        <span className="font-display text-xl md:text-2xl">{q}</span>
        {open ? (
          <Minus strokeWidth={1} className="h-5 w-5 text-ink-mute" />
        ) : (
          <Plus strokeWidth={1} className="h-5 w-5 text-ink-mute" />
        )}
      </button>
      <div
        className={`grid transition-all duration-500 ease-out ${
          open ? "grid-rows-[1fr] opacity-100 pb-8" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="max-w-2xl pl-16 pr-8 text-sm font-light leading-relaxed text-ink-soft md:pl-20">
            {a}
          </p>
        </div>
      </div>
    </li>
  );
}

function FAQ() {
  const qs = [
    { q: "Where do you build?", a: "Across metro and regional Australia, with active sites in VIC, NSW, SA, and WA. We travel for the right project." },
    { q: "How is Deol Build different from Punjab Homes?", a: "Same family, same builders, same standard — sharper name. Deol Build is our rebrand after fifteen years and five hundred homes. Every warranty and relationship carries over." },
    { q: "Do you work to a fixed price?", a: "Yes. Every contract is fixed after design lock. We publish a line-item breakdown so you can see exactly what you are paying for." },
    { q: "What is a typical build timeline?", a: "Custom homes usually run 10–14 months from site handover. Renovations vary from 4 to 9 months. We publish a Gantt chart at contract signing." },
    { q: "Can you work with our architect?", a: "Absolutely. Roughly half our projects come through architect referrals. We are comfortable joining an existing design team or leading the design ourselves." },
  ];
  return (
    <section id="faq" className="bg-background">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-40">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="eyebrow mb-6">Questions</p>
            <h2 className="font-display text-4xl leading-tight md:text-5xl">
              Answered before<br />you have to ask.
            </h2>
          </div>
          <ul className="md:col-span-8">
            {qs.map((it, i) => (
              <FAQItem
                key={it.q}
                q={it.q}
                a={it.a}
                index={String(i + 1).padStart(2, "0")}
              />
            ))}
            <li className="border-t border-line" />
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Contact ---------------- */

function Contact() {
  return (
    <section id="contact" className="bg-surface-4">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-40">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-5">
            <p className="eyebrow mb-6">Enquire</p>
            <h2 className="font-display text-4xl leading-tight md:text-6xl">
              Tell us about<br />your build.
            </h2>
            <p className="mt-8 max-w-md text-base font-light text-ink-soft">
              A short note is enough. We reply within one business day, and every
              first conversation is with a builder — not a salesperson.
            </p>

            <div className="mt-16 flex flex-col gap-6 text-sm">
              <div className="flex items-center gap-4">
                <Mail strokeWidth={1} className="h-5 w-5 text-ink-mute" />
                <span className="text-ink">hello@deolbuild.com.au</span>
              </div>
              <div className="flex items-center gap-4">
                <Phone strokeWidth={1} className="h-5 w-5 text-ink-mute" />
                <span className="text-ink">+61 3 9000 0000</span>
              </div>
              <div className="flex items-center gap-4">
                <MapPin strokeWidth={1} className="h-5 w-5 text-ink-mute" />
                <span className="text-ink">41 Foundry Lane, Melbourne VIC</span>
              </div>
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thank you — we'll be in touch within one business day.");
            }}
            className="flex flex-col gap-8 md:col-span-6 md:col-start-7"
          >
            <Field label="Name" name="name" placeholder="Your full name" />
            <Field label="Email" name="email" type="email" placeholder="you@domain.com" />
            <Field label="Phone" name="phone" type="tel" placeholder="+61" />
            <Field label="Location" name="loc" placeholder="Suburb, state" />
            <div className="flex flex-col gap-3">
              <label className="eyebrow">Project</label>
              <select
                name="project"
                className="border-0 border-b border-line bg-transparent py-3 font-sans text-base text-ink outline-none focus:border-accent"
              >
                <option>Custom home</option>
                <option>Knockdown rebuild</option>
                <option>Major renovation</option>
                <option>Luxury multi-res</option>
              </select>
            </div>
            <div className="flex flex-col gap-3">
              <label className="eyebrow">Tell us more</label>
              <textarea
                name="msg"
                rows={4}
                placeholder="A few lines about your project, timing, and budget"
                className="resize-none border-0 border-b border-line bg-transparent py-3 font-sans text-base text-ink outline-none placeholder:text-ink-mute focus:border-accent"
              />
            </div>
            <button
              type="submit"
              className="group mt-6 inline-flex items-center justify-between gap-3 self-start rounded-full bg-ink px-8 py-4 text-xs uppercase tracking-[0.24em] text-background transition hover:bg-accent"
            >
              <span>Send enquiry</span>
              <ArrowRight
                strokeWidth={1}
                className="h-4 w-4 transition group-hover:translate-x-1"
              />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-3">
      <label htmlFor={name} className="eyebrow">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="border-0 border-b border-line bg-transparent py-3 font-sans text-base text-ink outline-none placeholder:text-ink-mute focus:border-accent"
      />
    </div>
  );
}

