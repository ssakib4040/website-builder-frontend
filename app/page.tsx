"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  Blocks,
  MousePointerClick,
  Layers,
  Database,
  Plug,
  Workflow,
  Globe,
  Rocket,
  CheckCircle2,
  ChevronDown,
  Menu,
  X,
  Eye,
  ShieldCheck,
  Code2,
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

// ── Nav ──────────────────────────────────────────────────────────────────────
function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-7 h-7 rounded-lg bg-foreground flex items-center justify-center">
            <Layers className="w-4 h-4 text-background" />
          </div>
          <span className="text-sm font-semibold text-foreground tracking-tight">
            WebCraft
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
          <a
            href="#features"
            className="hover:text-foreground transition-colors"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="hover:text-foreground transition-colors"
          >
            How it works
          </a>
          <a
            href="#pricing"
            className="hover:text-foreground transition-colors"
          >
            Pricing
          </a>
          <Link
            href="/dashboard/pages"
            className="hover:text-foreground transition-colors"
          >
            Pages
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/sign-in"
            className="h-8 px-4 text-xs font-medium rounded-lg border border-border hover:bg-accent/60 transition-colors text-foreground flex items-center"
          >
            Sign in
          </Link>
          <Link
            href="/dashboard"
            className="h-8 px-4 text-xs font-medium rounded-lg bg-foreground text-background hover:opacity-90 transition-opacity flex items-center gap-1.5"
          >
            Get started free
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-accent/60 transition-colors"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border bg-background px-6 py-4 space-y-3">
          {[
            { href: "#features", label: "Features" },
            { href: "#how-it-works", label: "How it works" },
            { href: "#pricing", label: "Pricing" },
            { href: "/dashboard/pages", label: "Pages" },
          ].map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="block text-sm text-muted-foreground hover:text-foreground"
              onClick={() => setOpen(false)}
            >
              {label}
            </a>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <Link
              href="/sign-in"
              className="text-sm font-medium text-center py-2 border border-border rounded-lg hover:bg-accent/60 transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/dashboard"
              className="text-sm font-medium text-center py-2 bg-foreground text-background rounded-lg hover:opacity-90 transition-opacity"
            >
              Get started free
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

// ── Data ──────────────────────────────────────────────────────────────────────
const features = [
  {
    icon: MousePointerClick,
    title: "Drag-and-drop builder",
    desc: "Place any component exactly where you want it. Resize, reorder, and nest blocks with fluid interactions — no fighting with a grid.",
    href: "/builder",
    linkLabel: "Open builder",
  },
  {
    icon: Database,
    title: "Built-in data collections",
    desc: "Define your schema, add records, and bind live data to any element. Blog posts, product catalogs, user lists — all managed in one place.",
    href: "/dashboard/data",
    linkLabel: "Manage data",
  },
  {
    icon: Plug,
    title: "REST API endpoints",
    desc: "Auto-generate CRUD endpoints from your collections or define custom ones. Every endpoint is documented and ready to test instantly.",
    href: "/dashboard/api",
    linkLabel: "View APIs",
  },
  {
    icon: Workflow,
    title: "Automation workflows",
    desc: "Trigger actions on form submits, button clicks, or a schedule. Send emails, update records, navigate pages — all without code.",
    href: "/dashboard/logic",
    linkLabel: "Build workflows",
  },
  {
    icon: Globe,
    title: "Instant publishing",
    desc: "Hit publish and your site is live on a global CDN in seconds. Custom domains, automatic SSL, and smart redirects included on every plan.",
    href: "/dashboard",
    linkLabel: "Publish now",
  },
  {
    icon: Eye,
    title: "Live preview",
    desc: "Preview your site at any viewport — desktop, tablet, or mobile — in real time, without leaving the editor.",
    href: "/preview",
    linkLabel: "See preview",
  },
];

const steps = [
  {
    number: "01",
    title: "Add pages",
    desc: "Start from a blank canvas or choose from Marketing, Blog, Auth, Legal, Email, and Error page templates.",
    href: "/dashboard/pages",
  },
  {
    number: "02",
    title: "Design visually",
    desc: "Drop in headings, images, cards, heroes, buttons, and columns. Customize every prop from the side panel.",
    href: "/builder",
  },
  {
    number: "03",
    title: "Connect data",
    desc: "Create collections, define fields, add records, and wire them to your components — no SQL needed.",
    href: "/dashboard/data",
  },
  {
    number: "04",
    title: "Ship it",
    desc: "One click publishes your site to a global CDN. Share the link, set a custom domain, and you're live.",
    href: "/dashboard",
  },
];

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    desc: "Perfect for experiments and personal projects.",
    features: [
      "Up to 3 pages",
      "All core components",
      "WebCraft subdomain",
      "Community support",
    ],
    cta: "Start for free",
    href: "/dashboard",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$12",
    period: "per month",
    desc: "Everything you need to build a real product.",
    features: [
      "Unlimited pages",
      "Custom domain + SSL",
      "Data collections",
      "API endpoints + workflows",
      "Priority support",
    ],
    cta: "Start Pro trial",
    href: "/dashboard",
    highlighted: true,
  },
  {
    name: "Team",
    price: "$39",
    period: "per month",
    desc: "For teams shipping fast together.",
    features: [
      "Everything in Pro",
      "5 team members",
      "Role-based access",
      "Shared component library",
      "Dedicated support",
    ],
    cta: "Try Team free",
    href: "/dashboard",
    highlighted: false,
  },
];

const testimonials = [
  {
    quote:
      "We replaced three tools with WebCraft. Our landing page went live in an afternoon.",
    name: "Sara K.",
    role: "Indie founder",
  },
  {
    quote: "The data collections feature alone saved us weeks of backend work.",
    name: "Arjun M.",
    role: "Product lead, early-stage startup",
  },
  {
    quote:
      "Finally a builder that doesn't treat me like a child but also doesn't demand I learn React.",
    name: "Lena B.",
    role: "Designer",
  },
];

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div className="flex flex-col min-h-full">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="relative max-w-6xl mx-auto px-6 py-28 text-center">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.05] mb-6">
            Build beautiful websites
            <br />
            <span className="text-muted-foreground">without writing code.</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10">
            WebCraft gives you a drag-and-drop editor, real data collections,
            auto-generated APIs, automation workflows, and one-click publishing
            — all in a single tool.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 h-11 px-7 rounded-lg bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Start building for free
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/preview"
              className="inline-flex items-center gap-2 h-11 px-7 rounded-lg border border-border bg-card text-foreground text-sm font-medium hover:bg-accent/60 transition-colors"
            >
              <Eye className="w-4 h-4 text-muted-foreground" />
              See live preview
            </Link>
          </div>

          <p className="mt-5 text-xs text-muted-foreground">
            No credit card required · Free plan forever · Cancel any time
          </p>
        </div>
      </section>

      {/* ── Social proof bar ── */}
      <section className="border-b border-border bg-card">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs text-muted-foreground">
          {[
            "Trusted by 12,000+ creators",
            "4.9 / 5 on Product Hunt",
            "99.9% uptime SLA",
            "GDPR compliant",
            "SOC 2 Type II",
          ].map((item) => (
            <span key={item} className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-3">
              One platform. Every tool you need.
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-base">
              Stop stitching together five different tools. WebCraft handles the
              whole stack from design to deployment.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map(({ icon: Icon, title, desc, href, linkLabel }) => (
              <div
                key={title}
                className="group p-6 rounded-xl border border-border bg-card hover:border-foreground/20 transition-colors duration-200 flex flex-col gap-4"
              >
                <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center shrink-0">
                  <Icon className="w-4.5 h-4.5 text-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-foreground mb-1.5">
                    {title}
                  </h3>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {desc}
                  </p>
                </div>
                <Link
                  href={href}
                  className="text-xs font-medium text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
                >
                  {linkLabel}
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section id="how-it-works" className="border-b border-border bg-card">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-3">
              From idea to live site in four steps
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto text-base">
              No long setup. No DevOps. Just build and ship.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map(({ number, title, desc, href }, i) => (
              <Link
                key={number}
                href={href}
                className="group relative p-6 rounded-xl border border-border bg-background hover:border-foreground/20 hover:bg-accent/30 transition-colors duration-200"
              >
                <span className="text-4xl font-bold text-muted-foreground/20 select-none">
                  {number}
                </span>
                <h3 className="text-sm font-semibold text-foreground mt-2 mb-1.5">
                  {title}
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {desc}
                </p>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 -translate-y-1/2 z-10">
                    <ArrowRight className="w-4 h-4 text-muted-foreground/40" />
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground text-center mb-12">
            What people are saying
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {testimonials.map(({ quote, name, role }) => (
              <div
                key={name}
                className="p-6 rounded-xl border border-border bg-card flex flex-col gap-4"
              >
                <p className="text-base text-foreground leading-relaxed flex-1">
                  &ldquo;{quote}&rdquo;
                </p>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {name}
                  </p>
                  <p className="text-xs text-muted-foreground">{role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="border-b border-border bg-card">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-3">
              Simple, honest pricing
            </h2>
            <p className="text-muted-foreground text-base">
              Start free. Upgrade when you need more. No hidden fees.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {plans.map(
              ({
                name,
                price,
                period,
                desc,
                features: planFeatures,
                cta,
                href,
                highlighted,
              }) => (
                <div
                  key={name}
                  className={`relative p-6 rounded-xl border flex flex-col gap-5 transition-colors duration-200 ${
                    highlighted
                      ? "border-foreground bg-foreground text-background"
                      : "border-border bg-background hover:border-foreground/30"
                  }`}
                >
                  {highlighted && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-amber-400 text-[10px] font-bold uppercase text-black tracking-widest">
                      Most popular
                    </div>
                  )}
                  <div>
                    <p
                      className={`text-xs font-semibold uppercase tracking-widest mb-1 ${highlighted ? "text-background/60" : "text-muted-foreground"}`}
                    >
                      {name}
                    </p>
                    <div className="flex items-end gap-1.5">
                      <span
                        className={`text-3xl font-bold ${highlighted ? "text-background" : "text-foreground"}`}
                      >
                        {price}
                      </span>
                      <span
                        className={`text-sm mb-1 ${highlighted ? "text-background/60" : "text-muted-foreground"}`}
                      >
                        /{period}
                      </span>
                    </div>
                    <p
                      className={`text-xs mt-1 ${highlighted ? "text-background/70" : "text-muted-foreground"}`}
                    >
                      {desc}
                    </p>
                  </div>

                  <ul className="space-y-2 flex-1">
                    {planFeatures.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-base">
                        <CheckCircle2
                          className={`w-3.5 h-3.5 shrink-0 ${highlighted ? "text-background/80" : "text-emerald-500"}`}
                        />
                        <span
                          className={
                            highlighted
                              ? "text-background/90"
                              : "text-foreground"
                          }
                        >
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={href}
                    className={`flex items-center justify-center gap-1.5 h-9 rounded-lg text-sm font-medium transition-colors ${
                      highlighted
                        ? "bg-background text-foreground hover:bg-background/90"
                        : "bg-foreground text-background hover:opacity-90"
                    }`}
                  >
                    {cta}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ),
            )}
          </div>

          <p className="text-center text-xs text-muted-foreground mt-6">
            All paid plans include a 14-day free trial. No credit card required.
            ·{" "}
            <Link
              href="/dashboard/pages"
              className="underline hover:text-foreground transition-colors"
            >
              See all features
            </Link>
          </p>
        </div>
      </section>

      {/* ── CTA banner ── */}
      <section className="border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <div className="w-12 h-12 rounded-2xl bg-foreground flex items-center justify-center mx-auto mb-5">
            <Rocket className="w-6 h-6 text-background" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-3">
            Ready to start building?
          </h2>
          <p className="text-muted-foreground text-base max-w-lg mx-auto mb-8">
            Your first site is free. No credit card, no setup, no DevOps. Just
            open the editor and start building.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 h-11 px-7 rounded-lg bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Go to dashboard
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/builder"
              className="inline-flex items-center gap-2 h-11 px-7 rounded-lg border border-border bg-card text-foreground text-sm font-medium hover:bg-accent/60 transition-colors"
            >
              <Blocks className="w-4 h-4 text-muted-foreground" />
              Open builder
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-card border-t border-border">
        <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-2 sm:grid-cols-4 gap-8">
          <div className="col-span-2 sm:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-md bg-foreground flex items-center justify-center">
                <Layers className="w-3.5 h-3.5 text-background" />
              </div>
              <span className="text-sm font-semibold text-foreground">
                WebCraft
              </span>
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed">
              The no-code website builder that gives you real control — design,
              data, APIs, and deployment in one place.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
              Product
            </p>
            <ul className="space-y-2">
              {[
                { label: "Dashboard", href: "/dashboard" },
                { label: "Page Builder", href: "/builder" },
                { label: "Pages", href: "/dashboard/pages" },
                { label: "Data", href: "/dashboard/data" },
                { label: "APIs", href: "/dashboard/api" },
                { label: "Logic", href: "/dashboard/logic" },
                { label: "Preview", href: "/preview" },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
              Company
            </p>
            <ul className="space-y-2">
              {[
                { label: "About", href: "/about" },
                { label: "Blog", href: "/blog" },
                { label: "Pricing", href: "/#pricing" },
                { label: "Careers", href: "/dashboard" },
                { label: "Contact", href: "/contact" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
              Legal
            </p>
            <ul className="space-y-2">
              {[
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms of Service", href: "/terms" },
                { label: "Cookie Policy", href: "/cookies" },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                Appearance
              </p>
              <ThemeToggle />
            </div>
          </div>
        </div>

        <div className="border-t border-border">
          <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
            <span>© 2026 WebCraft Inc. All rights reserved.</span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              GDPR compliant · SOC 2 Type II
            </span>
            <span className="flex items-center gap-1">
              Built with
              <Code2 className="w-3.5 h-3.5" />
              WebCraft
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
