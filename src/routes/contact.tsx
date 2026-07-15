import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import {
  ArrowUpRight,
  Mail,
  Phone,
  MapPin,
  Clock,
  Instagram,
  Facebook,
  Linkedin,
  Check,
} from "lucide-react";
import {
  FloatingHeader,
  MenuOverlay,
  Footer,
  useScrolled,
} from "@/components/site/chrome";
import contactHero from "@/assets/contact-hero.jpg";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Deol Build" },
      {
        name: "description",
        content:
          "Start a conversation with Deol Build. Custom homes, duplexes and renovations across Canberra. Studio visits by appointment.",
      },
      { property: "og:title", content: "Contact — Deol Build" },
      {
        property: "og:description",
        content:
          "Start a conversation with Deol Build. Custom homes across Canberra.",
      },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  email: z.string().trim().email("Enter a valid email").max(200),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  suburb: z.string().trim().max(80).optional().or(z.literal("")),
  type: z.string().min(1, "Choose a project type"),
  budget: z.string().min(1, "Choose a budget band"),
  timeline: z.string().min(1, "Choose a timeline"),
  message: z.string().trim().min(10, "Tell us a little more").max(1200),
});

const PROJECT_TYPES = [
  "Custom home",
  "Duplex",
  "Townhouse",
  "Knockdown rebuild",
  "Renovation / extension",
  "Not sure yet",
];
const BUDGETS = ["< $500k", "$500k – $900k", "$900k – $1.5M", "$1.5M – $3M", "$3M +"];
const TIMELINES = ["ASAP", "3–6 months", "6–12 months", "12+ months", "Just exploring"];

function ContactPage() {
  const scrolled = useScrolled();
  const [menuOpen, setMenuOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        errs[issue.path.join(".")] = issue.message;
      }
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus("sending");
    // Simulate submission — wire to server function when backend is added.
    setTimeout(() => setStatus("sent"), 900);
  };

  return (
    <div className="min-h-screen bg-background">
      <FloatingHeader
        scrolled={scrolled}
        onMenu={() => setMenuOpen(true)}
        variant="solid"
      />
      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* HERO */}
      <section className="relative overflow-hidden bg-surface-1 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-14 px-6 md:grid-cols-12 md:gap-10 md:px-10">
          <div className="md:col-span-7">
            <p className="eyebrow mb-6">
              <span className="num-tabular">01</span> — Say hello
            </p>
            <h1 className="font-display text-5xl leading-[1.02] tracking-tight text-ink md:text-[6.5rem]">
              Let's build
              <br />
              <span className="italic text-accent">something honest.</span>
            </h1>
            <p className="mt-8 max-w-lg text-lg font-light leading-relaxed text-ink-soft md:text-xl">
              Every Deol Build home starts with a long, unhurried
              conversation. Tell us where you're headed — a block, a sketch,
              a hunch — and we'll take it from there.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="#enquire"
                className="group inline-flex items-center gap-3 rounded-full bg-ink px-6 py-3 text-sm text-background transition hover:bg-accent"
              >
                Start an enquiry
                <ArrowUpRight strokeWidth={1.25} className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href="tel:+61261000000"
                className="inline-flex items-center gap-3 rounded-full border border-ink/20 px-6 py-3 text-sm text-ink transition hover:border-ink"
              >
                <Phone strokeWidth={1.25} className="h-4 w-4" />
                +61 2 6100 0000
              </a>
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
              <img
                src={contactHero}
                alt="Morning light in a Deol Build home under construction"
                className="h-full w-full object-cover animate-drift"
                width={1600}
                height={1200}
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent p-6 md:p-8">
                <p className="text-xs uppercase tracking-[0.28em] text-background/70">
                  Studio hours
                </p>
                <p className="mt-2 font-display text-2xl text-background">
                  Mon – Fri · 8:30 – 17:30
                </p>
                <p className="mt-1 text-sm text-background/70">
                  Saturday site visits by appointment
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT METHODS */}
      <section className="bg-surface-2">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-px overflow-hidden border-y border-line bg-line md:grid-cols-4">
          {[
            {
              icon: Mail,
              eyebrow: "Email",
              value: "hello@deolbuild.com.au",
              href: "mailto:hello@deolbuild.com.au",
              note: "We reply within one working day.",
            },
            {
              icon: Phone,
              eyebrow: "Phone",
              value: "+61 2 6100 0000",
              href: "tel:+61261000000",
              note: "Mon – Fri · 8:30 – 17:30 AEST",
            },
            {
              icon: MapPin,
              eyebrow: "Studio",
              value: "41 Foundry Lane, Canberra",
              href: "https://maps.google.com/?q=Canberra+ACT+2600",
              note: "Visits by appointment.",
            },
            {
              icon: Clock,
              eyebrow: "Response",
              value: "Under 24 hours",
              href: "#enquire",
              note: "First call: a 30-minute chat.",
            },
          ].map((c) => (
            <a
              key={c.eyebrow}
              href={c.href}
              className="group relative flex flex-col justify-between bg-surface-1 p-8 transition hover:bg-background md:p-10"
            >
              <c.icon strokeWidth={1} className="h-6 w-6 text-accent" />
              <div className="mt-10">
                <p className="eyebrow mb-3">{c.eyebrow}</p>
                <p className="font-display text-xl leading-snug text-ink md:text-2xl">
                  {c.value}
                </p>
                <p className="mt-3 text-sm font-light text-ink-mute">{c.note}</p>
              </div>
              <ArrowUpRight
                strokeWidth={1}
                className="absolute right-6 top-6 h-4 w-4 text-ink-mute transition group-hover:text-accent md:right-8 md:top-8"
              />
            </a>
          ))}
        </div>
      </section>

      {/* ENQUIRY FORM */}
      <section id="enquire" className="bg-background py-24 md:py-32">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-16 px-6 md:grid-cols-12 md:gap-20 md:px-10">
          <aside className="md:col-span-4">
            <p className="eyebrow mb-6">
              <span className="num-tabular">02</span> — The enquiry
            </p>
            <h2 className="font-display text-4xl leading-tight text-ink md:text-5xl">
              A few honest questions.
            </h2>
            <p className="mt-6 text-base font-light leading-relaxed text-ink-soft">
              We keep this short. Enough to know if we're the right builder
              for you — and to prepare properly for our first call.
            </p>

            <ul className="mt-10 flex flex-col gap-4 text-sm">
              {[
                "A 30-minute discovery call",
                "A visit to a current build site",
                "Transparent, fixed-scope proposal",
              ].map((step, i) => (
                <li key={step} className="flex items-start gap-4">
                  <span className="num-tabular mt-0.5 w-6 text-xs text-ink-mute">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-ink">{step}</span>
                </li>
              ))}
            </ul>

            <div className="hairline my-10" />
            <p className="text-xs text-ink-mute">
              Prefer to talk? Call{" "}
              <a href="tel:+61261000000" className="text-ink underline underline-offset-4">
                +61 2 6100 0000
              </a>
              .
            </p>
          </aside>

          <div className="md:col-span-8">
            {status === "sent" ? (
              <div className="flex min-h-[500px] flex-col items-start justify-center rounded-sm border border-line bg-surface-1 p-10 md:p-16">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/10">
                  <Check strokeWidth={1.25} className="h-6 w-6 text-accent" />
                </div>
                <h3 className="mt-8 font-display text-3xl text-ink md:text-4xl">
                  Thank you. We've got it.
                </h3>
                <p className="mt-4 max-w-md text-ink-soft">
                  A member of our client team will be in touch within one
                  working day to set up your discovery call.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="flex flex-col gap-10" noValidate>
                <Field label="Your name" name="name" error={errors.name} placeholder="Jaskaran Deol" />
                <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
                  <Field label="Email" name="email" type="email" error={errors.email} placeholder="you@email.com" />
                  <Field label="Phone (optional)" name="phone" error={errors.phone} placeholder="+61 4 …" />
                </div>
                <Field label="Suburb or block (optional)" name="suburb" error={errors.suburb} placeholder="e.g. Denman Prospect" />

                <SelectField label="Project type" name="type" options={PROJECT_TYPES} error={errors.type} />
                <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
                  <SelectField label="Budget band" name="budget" options={BUDGETS} error={errors.budget} />
                  <SelectField label="Timeline" name="timeline" options={TIMELINES} error={errors.timeline} />
                </div>

                <TextareaField
                  label="Tell us about the project"
                  name="message"
                  error={errors.message}
                  placeholder="A few sentences about the block, the brief, and what matters most to you."
                />

                <div className="flex flex-col-reverse items-start gap-6 pt-4 md:flex-row md:items-center md:justify-between">
                  <p className="max-w-md text-xs text-ink-mute">
                    By sending you agree to our privacy notice. We only use
                    your details to reply to this enquiry.
                  </p>
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="group inline-flex items-center gap-3 rounded-full bg-ink px-8 py-4 text-sm text-background transition hover:bg-accent disabled:opacity-60"
                  >
                    {status === "sending" ? "Sending…" : "Send enquiry"}
                    <ArrowUpRight strokeWidth={1.25} className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* STUDIO / MAP */}
      <section className="bg-surface-3">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-0 md:grid-cols-2">
          <div className="flex flex-col justify-center px-6 py-20 md:px-16 md:py-28">
            <p className="eyebrow mb-6">
              <span className="num-tabular">03</span> — Visit the studio
            </p>
            <h2 className="font-display text-4xl leading-tight text-ink md:text-5xl">
              Come see how
              <br />
              <span className="italic text-accent">a home is drawn.</span>
            </h2>
            <p className="mt-6 max-w-md text-ink-soft">
              Materials, drawings, and a slow coffee. Our studio in Kingston
              is where every project begins — and where our clients keep
              coming back through the build.
            </p>

            <dl className="mt-10 grid grid-cols-2 gap-6 text-sm">
              <div>
                <dt className="eyebrow mb-2">Address</dt>
                <dd className="text-ink">41 Foundry Lane<br />Canberra ACT 2600</dd>
              </div>
              <div>
                <dt className="eyebrow mb-2">Open</dt>
                <dd className="text-ink">Mon – Fri<br />8:30 – 17:30</dd>
              </div>
              <div>
                <dt className="eyebrow mb-2">Licence</dt>
                <dd className="text-ink">ACT · NSW<br />Builders Licence</dd>
              </div>
              <div>
                <dt className="eyebrow mb-2">Follow</dt>
                <dd className="flex gap-4 pt-1 text-ink">
                  <a href="#" aria-label="Instagram" className="hover:text-accent">
                    <Instagram strokeWidth={1} className="h-5 w-5" />
                  </a>
                  <a href="#" aria-label="Facebook" className="hover:text-accent">
                    <Facebook strokeWidth={1} className="h-5 w-5" />
                  </a>
                  <a href="#" aria-label="LinkedIn" className="hover:text-accent">
                    <Linkedin strokeWidth={1} className="h-5 w-5" />
                  </a>
                </dd>
              </div>
            </dl>
          </div>
          <div className="relative min-h-[420px] md:min-h-[600px]">
            <iframe
              title="Deol Build studio location"
              src="https://www.google.com/maps?q=Canberra+ACT+2600&output=embed"
              className="absolute inset-0 h-full w-full grayscale-[0.4] contrast-[0.95]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* ————— Field primitives ————— */

function Field({
  label,
  name,
  type = "text",
  placeholder,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  error?: string;
}) {
  return (
    <label className="group flex flex-col gap-3">
      <span className="eyebrow flex items-center justify-between">
        <span>{label}</span>
        {error && <span className="text-[0.65rem] normal-case tracking-normal text-destructive">{error}</span>}
      </span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className="border-0 border-b border-line bg-transparent pb-3 font-display text-2xl text-ink placeholder:text-ink-mute/50 focus:border-ink focus:outline-none md:text-3xl"
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  options,
  error,
}: {
  label: string;
  name: string;
  options: readonly string[];
  error?: string;
}) {
  return (
    <fieldset className="flex flex-col gap-4">
      <legend className="eyebrow flex w-full items-center justify-between">
        <span>{label}</span>
        {error && <span className="text-[0.65rem] normal-case tracking-normal text-destructive">{error}</span>}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <label
            key={opt}
            className="cursor-pointer rounded-full border border-line px-4 py-2 text-sm text-ink-soft transition hover:border-ink has-[:checked]:border-ink has-[:checked]:bg-ink has-[:checked]:text-background"
          >
            <input type="radio" name={name} value={opt} className="sr-only" />
            {opt}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function TextareaField({
  label,
  name,
  placeholder,
  error,
}: {
  label: string;
  name: string;
  placeholder?: string;
  error?: string;
}) {
  return (
    <label className="flex flex-col gap-3">
      <span className="eyebrow flex items-center justify-between">
        <span>{label}</span>
        {error && <span className="text-[0.65rem] normal-case tracking-normal text-destructive">{error}</span>}
      </span>
      <textarea
        name={name}
        placeholder={placeholder}
        rows={5}
        className="resize-none border-0 border-b border-line bg-transparent pb-3 font-sans text-lg font-light leading-relaxed text-ink placeholder:text-ink-mute/50 focus:border-ink focus:outline-none"
      />
    </label>
  );
}
