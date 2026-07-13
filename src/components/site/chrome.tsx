import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Linkedin } from "lucide-react";

export const NAV = [
  { label: "Home", href: "/" },
  { label: "Philosophy", href: "/#philosophy" },
  { label: "Process", href: "/#process" },
  { label: "Services", href: "/#services" },
  { label: "Projects", href: "/projects" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
];

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`flex items-baseline gap-2 ${className}`}>
      <span className="font-display text-xl tracking-tight">Deol</span>
      <span className="h-1 w-1 rounded-full bg-accent" />
      <span className="font-sans text-[0.7rem] uppercase tracking-[0.28em] text-ink-soft">
        Build
      </span>
    </Link>
  );
}

export function useScrolled(threshold = 40) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

export function FloatingHeader({
  scrolled,
  onMenu,
  variant = "over-hero",
}: {
  scrolled: boolean;
  onMenu: () => void;
  /** "over-hero" hides the logo until scroll (dark video behind). "solid" shows it always over a light bg. */
  variant?: "over-hero" | "solid";
}) {
  const isSolid = variant === "solid" || scrolled;
  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div
        className={`transition-all duration-500 ${
          isSolid
            ? "bg-background/85 backdrop-blur-md border-b border-line"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 md:px-10">
          <div
            className={`transition-all duration-500 ${
              variant === "over-hero" && !scrolled
                ? "opacity-0 -translate-y-2 pointer-events-none"
                : "opacity-100 translate-y-0"
            }`}
          >
            <Wordmark />
          </div>
          <button
            onClick={onMenu}
            aria-label="Open menu"
            className={`group flex items-center gap-3 rounded-full border px-4 py-2 text-xs uppercase tracking-[0.24em] transition-all duration-500 ${
              isSolid
                ? "border-ink/20 text-ink hover:bg-ink hover:text-background"
                : "border-white/50 text-white hover:bg-white hover:text-ink"
            }`}
          >
            <span>Menu</span>
            <span className="flex flex-col gap-[3px]">
              <span className="block h-px w-4 bg-current" />
              <span className="block h-px w-4 bg-current" />
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}

export function MenuOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-500 ${
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="absolute inset-0 bg-background" onClick={onClose} />
      <div
        className={`relative h-full w-full overflow-y-auto transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="mx-auto flex min-h-full max-w-[1400px] flex-col px-6 md:px-10">
          <div className="sticky top-0 z-10 flex items-center justify-between bg-background/95 py-5 backdrop-blur">
            <Wordmark />
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="rounded-full border border-ink/20 px-4 py-2 text-xs uppercase tracking-[0.24em] transition hover:bg-ink hover:text-background"
            >
              Close
            </button>
          </div>

          <div className="mt-4 grid flex-1 grid-cols-1 gap-12 pb-16 md:mt-6 md:grid-cols-[1fr_1fr] md:gap-16 md:pb-24">
            <nav className="flex flex-col md:justify-center">
              <p className="eyebrow mb-6">Navigate</p>
              <ul className="flex flex-col">
                {NAV.map((item, i) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      onClick={onClose}
                      className="group flex items-baseline gap-5 py-1.5 md:gap-6 md:py-2"
                    >
                      <span className="w-8 num-tabular text-[0.7rem] text-ink-mute md:w-10 md:text-xs">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-[2rem] leading-tight text-ink transition-all group-hover:translate-x-2 group-hover:text-accent md:text-6xl md:leading-none">
                        {item.label}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex flex-col justify-end gap-6 md:gap-8">
              <div className="hairline" />
              <div className="grid grid-cols-2 gap-6 text-sm md:gap-8">
                <div>
                  <p className="eyebrow mb-3">Studio</p>
                  <p className="text-ink-soft">
                    41 Foundry Lane<br />
                    Canberra ACT 2600<br />
                    Australia
                  </p>
                </div>
                <div>
                  <p className="eyebrow mb-3">Enquire</p>
                  <p className="text-ink-soft">
                    hello@deolbuild.com.au<br />
                    +61 2 6100 0000
                  </p>
                </div>
              </div>
              <div className="hairline" />
              <p className="text-xs text-ink-mute">
                Formerly Punjab Homes — 15 years of craft, 500+ homes delivered.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-ink text-background">
      <div className="mx-auto max-w-[1400px] px-6 py-20 md:px-10 md:py-24">
        <div className="grid grid-cols-2 gap-12 md:grid-cols-12">
          <div className="col-span-2 md:col-span-5">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-3xl text-background">Deol</span>
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <span className="text-xs uppercase tracking-[0.32em] text-background/70">
                Build
              </span>
            </div>
            <p className="mt-6 max-w-sm text-sm font-light text-background/70">
              Formerly Punjab Homes. Australian home builders since 2010.
              Client-first, budget honest, quality obsessed.
            </p>
          </div>

          <div className="md:col-span-2">
            <p className="eyebrow mb-6 text-background/50">Explore</p>
            <ul className="flex flex-col gap-3 text-sm">
              {NAV.slice(0, 5).map((n) => (
                <li key={n.label}>
                  <a href={n.href} className="text-background/80 hover:text-accent">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="eyebrow mb-6 text-background/50">Studio</p>
            <p className="text-sm font-light leading-relaxed text-background/70">
              41 Foundry Lane<br />
              Canberra ACT 2600
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="eyebrow mb-6 text-background/50">Follow</p>
            <div className="flex gap-4">
              <a href="#" aria-label="Instagram" className="text-background/70 hover:text-accent">
                <Instagram strokeWidth={1} className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Facebook" className="text-background/70 hover:text-accent">
                <Facebook strokeWidth={1} className="h-5 w-5" />
              </a>
              <a href="#" aria-label="LinkedIn" className="text-background/70 hover:text-accent">
                <Linkedin strokeWidth={1} className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-background/10 pt-8 text-xs text-background/50 md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} Deol Build Pty Ltd. All rights reserved.</span>
          <span>Builders Licence · ACT / NSW</span>
        </div>
      </div>
    </footer>
  );
}
