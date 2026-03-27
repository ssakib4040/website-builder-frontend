import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import {
  ArrowRight,
  BookOpen,
  Code2,
  Layers,
  Puzzle,
  Settings,
  Zap,
} from "lucide-react";
import Link from "next/link";

const sections = [
  {
    icon: Zap,
    title: "Getting started",
    description:
      "Create your first site in under 10 minutes. From signing up to publishing.",
    links: [
      { label: "Quick start guide", href: "#" },
      { label: "Creating your first page", href: "#" },
      { label: "Publishing to a custom domain", href: "#" },
      { label: "Understanding the builder canvas", href: "#" },
    ],
  },
  {
    icon: Layers,
    title: "The builder",
    description:
      "Everything about the drag-and-drop canvas — blocks, layouts, and the component library.",
    links: [
      { label: "Adding and arranging blocks", href: "#" },
      { label: "Responsive layouts & breakpoints", href: "#" },
      { label: "Working with columns and grids", href: "#" },
      { label: "Using the component library", href: "#" },
    ],
  },
  {
    icon: Settings,
    title: "Design & theming",
    description:
      "Design tokens, typography, colors, and how to keep your brand consistent across pages.",
    links: [
      { label: "Setting up design tokens", href: "#" },
      { label: "Custom fonts", href: "#" },
      { label: "Dark mode support", href: "#" },
      { label: "Global styles", href: "#" },
    ],
  },
  {
    icon: Puzzle,
    title: "Integrations",
    description:
      "Connect WebCraft to your favourite tools — Stripe, Mailchimp, Google Analytics, and more.",
    links: [
      { label: "Stripe payments", href: "#" },
      { label: "Email marketing (Mailchimp / ConvertKit)", href: "#" },
      { label: "Google Analytics & Tag Manager", href: "#" },
      { label: "Zapier & webhook automations", href: "#" },
    ],
  },
  {
    icon: Code2,
    title: "Custom code",
    description:
      "Drop in HTML, CSS, or JavaScript anywhere you need behaviour beyond the builder.",
    links: [
      { label: "Custom HTML blocks", href: "#" },
      { label: "Injecting scripts", href: "#" },
      { label: "CSS overrides", href: "#" },
      { label: "Embedding third-party widgets", href: "#" },
    ],
  },
  {
    icon: BookOpen,
    title: "SEO & analytics",
    description:
      "Optimise for search engines, track performance, and measure what matters.",
    links: [
      { label: "Meta tags and page titles", href: "#" },
      { label: "Sitemaps and robots.txt", href: "#" },
      { label: "Open Graph & social sharing", href: "#" },
      { label: "Using the analytics dashboard", href: "#" },
    ],
  },
];

const popular = [
  { label: "How do I connect a custom domain?", href: "#" },
  { label: "How do I accept payments on my site?", href: "#" },
  { label: "Can I export my site's HTML/CSS?", href: "#" },
  { label: "How do I add a blog to my site?", href: "#" },
  { label: "What's the difference between pages and templates?", href: "#" },
  { label: "How do I add team members to my project?", href: "#" },
];

export default function DocsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteNav />

      <main className="flex-1">
        {/* Hero */}
        <section className="border-b border-border bg-card/30">
          <div className="max-w-5xl mx-auto px-6 py-16 space-y-5">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Documentation
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              Everything you need to build, customise, and publish with
              WebCraft.
            </p>

            {/* Search placeholder */}
            <div className="max-w-lg">
              <div className="relative flex items-center h-11 rounded-lg border border-border bg-background px-4 gap-3 cursor-pointer hover:border-foreground/30 transition-colors">
                <svg
                  className="w-4 h-4 text-muted-foreground shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <span className="text-sm text-muted-foreground">
                  Search docs…
                </span>
                <kbd className="ml-auto text-[10px] text-muted-foreground border border-border rounded px-1.5 py-0.5">
                  ⌘K
                </kbd>
              </div>
            </div>
          </div>
        </section>

        {/* Popular articles */}
        <section className="max-w-5xl mx-auto px-6 py-12 space-y-5">
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">
            Popular articles
          </h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {popular.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="flex items-center justify-between gap-3 px-4 py-3 rounded-lg border border-border hover:bg-accent/40 hover:border-foreground/20 transition-colors group"
              >
                <span className="text-sm text-foreground">{label}</span>
                <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            ))}
          </div>
        </section>

        {/* Sections grid */}
        <section className="border-t border-border bg-card/20">
          <div className="max-w-5xl mx-auto px-6 py-12 space-y-6">
            <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Browse by topic
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sections.map(({ icon: Icon, title, description, links }) => (
                <div
                  key={title}
                  className="rounded-xl border border-border bg-background p-5 space-y-4 hover:border-foreground/20 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-foreground" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">
                        {title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                        {description}
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-1.5 border-t border-border pt-3">
                    {links.map(({ label, href }) => (
                      <li key={label}>
                        <Link
                          href={href}
                          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors group"
                        >
                          <ArrowRight className="w-3 h-3 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Support CTA */}
        <section className="max-w-5xl mx-auto px-6 py-16 grid sm:grid-cols-2 gap-6">
          <div className="rounded-xl border border-border bg-card/40 p-6 space-y-3">
            <h3 className="font-semibold text-foreground">
              Can&apos;t find what you need?
            </h3>
            <p className="text-base text-muted-foreground leading-relaxed">
              Our support team is available Monday–Friday, 9am–5pm PST. We
              usually reply within a few hours.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:underline"
            >
              Contact support <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="rounded-xl border border-border bg-card/40 p-6 space-y-3">
            <h3 className="font-semibold text-foreground">Community forum</h3>
            <p className="text-base text-muted-foreground leading-relaxed">
              Ask questions, share projects, and get tips from 24,000+ WebCraft
              users.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:underline"
            >
              Visit community <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
