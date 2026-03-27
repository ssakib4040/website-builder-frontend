"use client";

import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ArrowRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";

type Category =
  | "All"
  | "Business"
  | "Portfolio"
  | "Blog"
  | "Landing"
  | "E-commerce"
  | "Agency";

const categories: Category[] = [
  "All",
  "Business",
  "Portfolio",
  "Blog",
  "Landing",
  "E-commerce",
  "Agency",
];

const templates = [
  {
    id: "minimal-saas",
    name: "Minimal SaaS",
    category: "Landing",
    description:
      "Clean, conversion-focused landing page for software products. Hero, features, pricing, and CTA sections.",
    tags: ["Popular", "Free"],
    accent: "from-blue-500/20 to-indigo-500/10",
  },
  {
    id: "agency-studio",
    name: "Agency Studio",
    category: "Agency",
    description:
      "Bold, full-screen agency template with case study grid, team section, and contact form.",
    tags: ["Pro"],
    accent: "from-purple-500/20 to-pink-500/10",
  },
  {
    id: "personal-portfolio",
    name: "Personal Portfolio",
    category: "Portfolio",
    description:
      "Minimal portfolio for designers and developers. Project grid, skills, and contact.",
    tags: ["Free"],
    accent: "from-emerald-500/20 to-teal-500/10",
  },
  {
    id: "blog-editorial",
    name: "Editorial Blog",
    category: "Blog",
    description:
      "Typography-first blog layout with featured posts, categories sidebar, and newsletter signup.",
    tags: ["Free"],
    accent: "from-orange-500/20 to-amber-500/10",
  },
  {
    id: "ecommerce-shop",
    name: "Modern Shop",
    category: "E-commerce",
    description:
      "Product grid, cart, and checkout-ready e-commerce template with filter sidebar.",
    tags: ["Pro", "New"],
    accent: "from-rose-500/20 to-pink-500/10",
  },
  {
    id: "startup-launch",
    name: "Startup Launch",
    category: "Landing",
    description:
      "Waitlist page with email capture, social proof, and countdown timer. Ship your MVP fast.",
    tags: ["Free", "New"],
    accent: "from-cyan-500/20 to-blue-500/10",
  },
  {
    id: "consultancy",
    name: "Consultancy",
    category: "Business",
    description:
      "Professional services template with services grid, testimonials, and booking form.",
    tags: ["Pro"],
    accent: "from-slate-500/20 to-gray-500/10",
  },
  {
    id: "restaurant",
    name: "Restaurant",
    category: "Business",
    description:
      "Menu showcase, reservation form, and photo gallery for food & hospitality brands.",
    tags: ["Free"],
    accent: "from-yellow-500/20 to-orange-500/10",
  },
  {
    id: "photographer",
    name: "Photographer",
    category: "Portfolio",
    description:
      "Full-bleed image-first portfolio with lightbox gallery and client inquiry form.",
    tags: ["Pro"],
    accent: "from-neutral-500/20 to-stone-500/10",
  },
  {
    id: "nonprofit",
    name: "Non-Profit",
    category: "Business",
    description:
      "Mission-driven layout with impact stats, team section, and donation call to action.",
    tags: ["Free"],
    accent: "from-green-500/20 to-emerald-500/10",
  },
  {
    id: "product-changelog",
    name: "Product Site",
    category: "Landing",
    description:
      "Developer-tool landing page with docs preview, feature flags table, and pricing.",
    tags: ["Pro"],
    accent: "from-violet-500/20 to-purple-500/10",
  },
  {
    id: "wedding",
    name: "Wedding",
    category: "Portfolio",
    description:
      "Elegant invite-style site with RSVP form, venue map, and photo album.",
    tags: ["Free"],
    accent: "from-pink-500/20 to-rose-500/10",
  },
];

const tagColors: Record<string, string> = {
  Free: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  Pro: "bg-foreground/10 text-foreground",
  Popular: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  New: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
};

export default function TemplatesPage() {
  const [active, setActive] = useState<Category>("All");
  const [query, setQuery] = useState("");

  const filtered = templates.filter((t) => {
    const matchCat = active === "All" || t.category === active;
    const matchQ =
      query === "" ||
      t.name.toLowerCase().includes(query.toLowerCase()) ||
      t.description.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQ;
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteNav />

      <main className="flex-1">
        {/* Hero */}
        <section className="max-w-5xl mx-auto px-6 py-20 text-center space-y-5">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Start from a template
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Professionally designed starting points for every use case. Pick
            one, customise it in the builder, and publish — in minutes.
          </p>

          {/* Search */}
          <div className="relative max-w-sm mx-auto mt-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <Input
              placeholder="Search templates…"
              className="pl-9"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </section>

        {/* Category filter */}
        <section className="border-t border-border sticky top-14 z-40 bg-background/95 backdrop-blur-sm">
          <div className="max-w-5xl mx-auto px-6 py-3 flex items-center gap-2 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  active === cat
                    ? "bg-foreground text-background"
                    : "border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Grid */}
        <section className="max-w-5xl mx-auto px-6 py-12">
          {filtered.length === 0 ? (
            <div className="text-center py-24 space-y-2">
              <p className="text-sm font-medium text-foreground">
                No templates found
              </p>
              <p className="text-xs text-muted-foreground">
                Try a different search or category.
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((t) => (
                <div
                  key={t.id}
                  className="group rounded-xl border border-border bg-card/40 overflow-hidden hover:border-foreground/20 transition-colors flex flex-col"
                >
                  {/* Preview area */}
                  <div
                    className={`h-44 bg-gradient-to-br ${t.accent} flex items-end p-3`}
                  >
                    <div className="flex gap-1.5">
                      {t.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`px-2 py-0.5 rounded-full text-xs font-medium ${tagColors[tag]}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4 flex flex-col gap-3 flex-1">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-foreground">
                          {t.name}
                        </h3>
                        <span className="text-xs text-muted-foreground">
                          {t.category}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {t.description}
                      </p>
                    </div>

                    <div className="mt-auto flex items-center gap-2 pt-2">
                      <Link
                        href={`/builder?template=${t.id}`}
                        className="flex-1 flex items-center justify-center gap-1.5 h-8 rounded-lg bg-foreground text-background text-xs font-medium hover:opacity-90 transition-opacity"
                      >
                        Use template
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      <Link
                        href={`/preview?template=${t.id}`}
                        className="h-8 px-3 rounded-lg border border-border text-xs font-medium hover:bg-accent/60 transition-colors text-foreground flex items-center"
                      >
                        Preview
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* CTA banner */}
        <section className="border-t border-border bg-card/30">
          <div className="max-w-4xl mx-auto px-6 py-16 text-center space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              Don&apos;t see what you need?
            </h2>
            <p className="text-muted-foreground text-base">
              Start with a blank canvas and build exactly what you have in mind.
            </p>
            <Link
              href="/builder"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-sm font-medium hover:bg-accent/60 transition-colors text-foreground"
            >
              Start from scratch
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
