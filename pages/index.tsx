"use client";

import { useEffect, useState } from "react";

/* ------------------ Utils ------------------ */
type ClassValue = string | false | null | undefined;
const cn = (...c: ClassValue[]) => c.filter(Boolean).join(" ");

// Design tokens
const TITLE_GRADIENT =
  "bg-gradient-to-r from-black via-blue-600 to-sky-400 bg-clip-text text-transparent bg-[length:110%_100%] bg-left";
const WORDMARK_GRADIENT =
  "bg-gradient-to-r from-black via-blue-600 to-sky-400 bg-clip-text text-transparent";
const CARD_BASE =
  "group relative rounded-2xl bg-white p-8 transition hover:shadow-md";
const CARD_TOPLINE =
  "absolute inset-x-0 top-0 h-[4px] bg-gradient-to-r from-black to-blue-600 opacity-0 group-hover:opacity-100 transition";
const SECTION_Y = "py-20";

/* ------------------ Data ------------------ */

const HERO_SLIDES = [
  { src: "/slide-1.webp", alt: "Proliquid dashboard preview" },
  { src: "/slide-2.webp", alt: "Proliquid reports preview" },
  { src: "/slide-3.webp", alt: "Proliquid admin preview" },
];

type Service = {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
};

type Pillar = {
  title: string;
  description: string;
};

type Bullet = {
  title: string;
  description: string;
};

type ServeItem = {
  title: string;
  description: string;
};

const PILLARS: Pillar[] = [
  {
    title: "Financial Administration",
    description:
      "Operational rigor, controls, period close and institutional-grade reporting.",
  },
  {
    title: "Investor Portal",
    description:
      "Secure, frictionless access to positions, documents and reporting.",
  },
  {
    title: "Automation & Auditability",
    description:
      "Supervised automation, full traceability and actionable evidence.",
  },
];

const SERVICES: Service[] = [
  {
    title: "Accounting & Financial Reporting",
    description:
      "Bookkeeping, period-end reporting and structured financial statements aligned with institutional standards.",
    imageSrc: "/accounting.webp",
    imageAlt: "Accounting & financial reporting illustration",
  },
  {
    title: "Investment Tracking",
    description:
      "Monitoring of investments, capital movements and operational oversight of holding structures and SPVs.",
    imageSrc: "/tracking.webp",
    imageAlt: "Investment tracking illustration",
  },
  {
    title: "Investor Portal",
    description:
      "Secure access to positions, documents and simplified NAV visibility through a dedicated interface.",
    imageSrc: "/portal.webp",
    imageAlt: "Investor portal illustration",
  },
  {
    title: "Data & Automation (IA)",
    description:
      "AI-assisted extraction, controls and operational insights — always supervised and fully auditable.",
    imageSrc: "/automation.webp",
    imageAlt: "Data and automation illustration",
  },
];

const APPROACH: Bullet[] = [
  {
    title: "Process-driven",
    description:
      "Workflows designed for repeatability, control, and predictable delivery across structures.",
  },
  {
    title: "AI-assisted",
    description:
      "Extraction, controls and insights as assistive layers — never a replacement for judgment or compliance.",
  },
  {
    title: "Audit trail & traceability",
    description:
      "Every action logged and reviewable by design. Blockchain is considered only as a future proof registry (not a dependency).",
  },
];

const WHO_WE_SERVE: ServeItem[] = [
  {
    title: "SPVs",
    description:
      "Purpose-built reporting, administration and document control for single-asset or deal vehicles.",
  },
  {
    title: "Investment Holding Companies",
    description:
      "Operational oversight across portfolios with structured reporting and governance-ready documentation.",
  },
  {
    title: "Early-stage Funds",
    description:
      "Lean operations with institutional discipline: processes, reporting cadence and investor communications.",
  },
  {
    title: "Family Offices",
    description:
      "Clarity on positions, reporting and auditability — built for long-term stewardship.",
  },
];

/* ------------------ Small UI helpers ------------------ */
function Separator() {
  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
    </div>
  );
}

/* ------------------ Page ------------------ */
export default function ProLiquidHome() {
  const [scrolled, setScrolled] = useState(false);

  // Hero slider
  const [heroSlideIdx, setHeroSlideIdx] = useState(0);
  const [heroPaused, setHeroPaused] = useState(false);


  // Services carousel
  const [activeServiceIdx, setActiveServiceIdx] = useState(0);
  const [servicesPaused, setServicesPaused] = useState(false);

  // Who we serve: auto-hover
  const [activeServeIdx, setActiveServeIdx] = useState(0);
  const [servePaused, setServePaused] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Hero slider: auto-rotate (pause on hover)
  useEffect(() => {
    if (heroPaused) return;
    const id: ReturnType<typeof setInterval> = setInterval(() => {
      setHeroSlideIdx((i) => (i + 1) % HERO_SLIDES.length);
    }, 4500);
    return () => clearInterval(id);
  }, [heroPaused]);

  // Auto-rotate selected service every 5 seconds (pause on hover)
  useEffect(() => {
    if (servicesPaused) return;
    const id: ReturnType<typeof setInterval> = setInterval(() => {
      setActiveServiceIdx((i) => (i + 1) % SERVICES.length);
    }, 5000);
    return () => clearInterval(id);
  }, [servicesPaused]);

  // Who we serve: cycle hover state (pause only when hovering a card)
  useEffect(() => {
    if (servePaused) return;
    const id: ReturnType<typeof setInterval> = setInterval(() => {
      setActiveServeIdx((i) => (i + 1) % WHO_WE_SERVE.length);
    }, 5200);
    return () => clearInterval(id);
  }, [servePaused]);

  return (
    <main className="bg-slate-50 text-slate-900 leading-relaxed">
      {/* HEADER */}
      <header
        className={cn(
          "fixed top-0 w-full z-50 transition-all",
          scrolled
            ? "bg-white/90 backdrop-blur border-b border-slate-200"
            : "bg-transparent"
        )}
      >
        <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#" className="flex items-center no-underline">
            <span
              className={cn(
                "text-3xl font-semibold tracking-[-0.03em]",
                WORDMARK_GRADIENT
              )}
            >
              proliquid
            </span>
          </a>

          <div className="hidden md:flex gap-8 text-medium font-semibold">
            <a
              href="#services"
              className="text-slate-700 hover:text-slate-500 no-underline"
            >
              Services
            </a>
            <a
              href="#approach"
              className="text-slate-700 hover:text-slate-500 no-underline"
            >
              Technology & Approach
            </a>
            <a
              href="#serve"
              className="text-slate-700 hover:text-slate-500 no-underline"
            >
              Who we serve
            </a>
            <a
              href="#research"
              className="text-slate-700 hover:text-slate-500 no-underline"
            >
              Research
            </a>
          </div>

          <a
            href="#contact"
            className="bg-slate-900 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-slate-800 no-underline transition"
          >
            Request access
          </a>
        </nav>
      </header>

      {/* HERO */}
      <section className="min-h-[85vh] flex items-center pt-28 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-slate-500">
              Investment administration & reporting
            </p>

            <h1
              className={cn(
                "mt-3 text-5xl md:text-6xl font-semibold leading-[1.12] pb-2 tracking-tight",
                TITLE_GRADIENT
              )}
            >
              redesigned for transparency
            </h1>

            <p className="mt-7 text-lg text-slate-600 max-w-xl leading-relaxed">
              Pro Liquid delivers fiduciary-grade administration, reporting and
              investor access for SPVs, holding structures and private investment
              vehicles — built for clarity, control and auditability.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              {PILLARS.map((p) => (
                <span
                  key={p.title}
                  className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700"
                >
                  {p.title}
                </span>
              ))}
            </div>

            <div className="mt-10 flex gap-4">
              <a
                href="#services"
                className="bg-slate-900 text-white px-8 py-3 rounded-full font-medium hover:bg-slate-800 transition"
              >
                Explore services
              </a>
              <a
                href="#contact"
                className="border border-slate-300 px-8 py-3 rounded-full font-medium hover:border-slate-400 transition"
              >
                Request access
              </a>
            </div>
          </div>

          <div
            className="hidden md:block"
            onMouseEnter={() => setHeroPaused(true)}
            onMouseLeave={() => setHeroPaused(false)}
          >
            <div className="relative w-full h-[420px] rounded-3xl overflow-hidden bg-transparent">
              {/* Slides */}
              {HERO_SLIDES.map((s, idx) => {
                const active = idx === heroSlideIdx;
                return (
                  <img
                    key={s.src}
                    src={s.src}
                    alt={s.alt}
                    className={cn(
                      "absolute inset-0 h-full w-full object-contain p-8 transition duration-700",
                      active ? "opacity-100 scale-[1.02]" : "opacity-0 scale-100"
                    )}
                    draggable={false}
                  />
                );
              })}

              {/* Soft gradient wash (no labels) */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-slate-50/60" />
            </div>
          </div>
        </div>
      </section>

      {/* 3 PILLARS */}
      <section className={cn("max-w-7xl mx-auto px-6", SECTION_Y)}>
        <div className="mb-10 text-center">
          <h2 className={cn("text-2xl md:text-3xl font-semibold", TITLE_GRADIENT)}>
            Our 3 pillars
          </h2>
          <p className="mt-2 text-slate-600 text-sm max-w-2xl mx-auto">
            The minimum viable stack for reliable investment operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {PILLARS.map((p) => (
            <div
              key={p.title}
              // Inverted behavior: default looks like hover, hover looks like default
              className={cn(
                "group relative rounded-2xl bg-white p-6 transition",
                "shadow-md ring-1 ring-slate-200",
                "hover:shadow-none"
              )}
            >
              {/* Topline visible by default, hides on hover */}
              <div className="absolute inset-x-0 top-0 h-[4px] bg-gradient-to-r from-blue-700 to-sky-400 opacity-100 transition group-hover:opacity-0" />
              <p className="font-bold">{p.title}</p>
              <p className="mt-2 text-sm text-slate-600">{p.description}</p>
            </div>
          ))}
        </div>
      </section>

      <Separator />

      {/* SERVICES */}
      <section id="services" className={cn("bg-slate-50 px-6", SECTION_Y)}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className={cn("text-3xl md:text-4xl font-semibold mb-4", TITLE_GRADIENT)}>
              Services
            </h2>
            <p className="text-slate-600 text-sm max-w-2xl mx-auto mb-14">
              A comprehensive suite of fiduciary-grade services designed to support investment structures throughout their lifecycle.
            </p>
          </div>

          <div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch"
            onMouseEnter={() => setServicesPaused(true)}
            onMouseLeave={() => setServicesPaused(false)}
          >
            {/* Left: list */}
            <div className="flex flex-col gap-4">
              {SERVICES.map((s, idx) => {
                const active = idx === activeServiceIdx;
                return (
                  <button
                    key={s.title}
                    type="button"
                    onClick={() => setActiveServiceIdx(idx)}
                    // If a global CSS rule is overriding button backgrounds, inline style wins in most setups.
                    style={
                      active
                        ? { background: "linear-gradient(90deg, #172554 0%, #1e40af 45%, #0ea5e9 100%)" }
                        : undefined
                    }
                    className={cn(
                      // Left list: NO outlines (no border, no ring). Only subtle hover shadow.
                      "group relative appearance-none border-0 rounded-t-none rounded-b-3xl p-6 text-left transition focus:outline-none",
                      // default state
                      !active && "bg-white hover:bg-slate-50 hover:shadow-sm",
                      // active state (blue gradient + white text)
                      active &&
                        "bg-gradient-to-r from-blue-950 via-blue-800 to-sky-500 text-white shadow-md"
                    )}
                  >
                    {/* Top gradient line (kept subtle; hidden when active to avoid clutter) */}
                    <div
                      className={cn(
                        "absolute inset-x-0 top-0 h-[4px] bg-gradient-to-r from-blue-700 to-sky-400 transition",
                        active ? "opacity-0" : "opacity-0 group-hover:opacity-100"
                      )}
                    />

                    <div className="flex items-center justify-between gap-6">
                      <p className={cn("font-bold", active ? "text-white" : "text-slate-900")}>
                        {s.title}
                      </p>
                      <span
                        className={cn(
                          "text-sm transition",
                          active
                            ? "text-white/100"
                            : "text-slate-400 group-hover:text-slate-600"
                        )}
                      >
                        →
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right: detail */}
            <div
              className={cn(
                "group relative rounded-t-none rounded-b-3xl bg-white p-8 transition",
                // Right detail: stronger shadow so the card reads clearly
                "shadow-lg ring-1 ring-slate-200",
                // Slightly reduce on hover (still visible)
                "hover:shadow-md"
              )}
              aria-live="polite"
            >
             
              {/* Service image */}
              <div className="mt-4 flex justify-center">
                <div className="h-60 w-80 rounded-2xl overflow-hidden bg-transparent flex items-center justify-center">
                  <img
                    src={SERVICES[activeServiceIdx]?.imageSrc}
                    alt={SERVICES[activeServiceIdx]?.imageAlt}
                    className="h-full w-full object-contain"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="mt-6 text-center">
                <h3 className="text-2xl font-semibold text-slate-900">
                  {SERVICES[activeServiceIdx]?.title}
                </h3>
                <p className="mt-4 text-slate-600 leading-relaxed">
                  {SERVICES[activeServiceIdx]?.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      {/* TECHNOLOGY & APPROACH */}
      <section id="approach" className={cn("bg-white px-6", SECTION_Y)}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className={cn("text-3xl md:text-4xl font-semibold", TITLE_GRADIENT)}>
              Technology & Approach
            </h2>
            <p className="mt-3 text-slate-600 text-sm max-w-2xl mx-auto">
              Pragmatic automation, strong controls, and traceability — designed
              for compliance first.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {APPROACH.map((a) => (
              <div key={a.title} className={cn(CARD_BASE, "p-6 text-center") }>
                <div className={CARD_TOPLINE} />
                <p className="font-bold">{a.title}</p>
                <p className="mt-2 text-sm text-slate-600">{a.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Separator />

      {/* WHO WE SERVE */}
      <section
        id="serve"
        className={cn("bg-slate-50 px-6", SECTION_Y)}
      >
        <div className="max-w-7xl mx-auto text-center">
          <h2 className={cn("text-3xl md:text-4xl font-semibold mb-4", TITLE_GRADIENT)}>
            Who we serve
          </h2>
          <p className="text-slate-600 text-sm max-w-2xl mx-auto mb-14">
            Built for structures that need discipline, transparency and fast execution.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {WHO_WE_SERVE.map((w, idx) => {
              const active = idx === activeServeIdx;
              return (
                <div
                  key={w.title}
                  onMouseEnter={() => {
                    setActiveServeIdx(idx);
                    setServePaused(true);
                  }}
                  onMouseLeave={() => setServePaused(false)}
                  className={cn(CARD_BASE, "p-6 text-center", active ? "shadow-md" : "")}
                >
                  <div
                    className={cn(
                      "absolute inset-x-0 top-0 h-[4px] bg-gradient-to-r from-blue-700 to-sky-400 transition",
                      active ? "opacity-100" : "opacity-0",
                      "group-hover:opacity-100"
                    )}
                  />
                  <h3 className="font-bold">{w.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    {w.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Separator />

      {/* ABOUT US */}
      <section id="about" className={cn("bg-white px-6", SECTION_Y)}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: text */}
          <div className="text-center lg:text-left">
            <h2 className={cn("text-3xl md:text-4xl font-semibold mb-6", TITLE_GRADIENT)}>
              About us
            </h2>

            <p className="text-slate-600 text-lg leading-relaxed">
              Pro Liquid is built for one thing: clean, reliable investment operations.
              We combine fiduciary-grade execution with modern tooling to deliver administration,
              reporting, and investor access that stays consistent as complexity grows.
            </p>

            <p className="mt-10 font-mono text-xs uppercase tracking-[0.22em] text-slate-500">
              BUILT FOR CLARITY. DESIGNED FOR CONTROL.
            </p>

            <p className="mt-4 text-slate-600 text-lg leading-relaxed">
              Our approach is pragmatic: strong processes first, supervised automation second.
              Everything is traceable, reviewable, and designed to support auditors, governance,
              and long-term stewardship — not shortcuts.
            </p>

            <p className="mt-4 text-slate-600 text-lg leading-relaxed">
              We operate at the intersection of finance and engineering, so what we ship is deployable,
              measurable, and scalable in real workflows.
            </p>
          </div>

          {/* Right: illustrative image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-xl rounded-3xl overflow-hidden bg-transparent">
              <img
                src="/about2.png"
                alt="Pro Liquid — operational finance illustration"
                className="w-full rounded-full object-contain p-6"
                loading="lazy"
                draggable={false}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-slate-50/60" />
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 px-6 bg-slate-900 text-white">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6">Request access</h2>
          <p className="text-slate-300 mb-10">
            Tell us what you operate (SPV, holding, fund, family office) and what
            you need (reporting cadence, portal access, automation).
          </p>

          <form className="space-y-4">
            <input
              placeholder="Name"
              className="w-full px-4 py-3 rounded bg-slate-800 border border-slate-700"
            />
            <input
              placeholder="Email"
              className="w-full px-4 py-3 rounded bg-slate-800 border border-slate-700"
            />
            <textarea
              placeholder="Message"
              rows={4}
              className="w-full px-4 py-3 rounded bg-slate-800 border border-slate-700"
            />
            <button
              type="submit"
              className="w-full bg-white text-slate-900 py-3 rounded font-medium hover:opacity-90"
            >
              Submit request
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black text-slate-400 text-center py-6 text-xs">
        © {new Date().getFullYear()} Pro Liquid — All rights reserved
      </footer>
    </main>
  );
}
