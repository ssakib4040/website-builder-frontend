import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import {
  Layers,
  Zap,
  Globe,
  Smartphone,
  Code2,
  BarChart3,
  Lock,
  Palette,
  Search,
  Cloud,
  Plug,
  Repeat,
} from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: Layers,
    title: "Visual drag-and-drop builder",
    body: "Place any element exactly where you want it. Resize, reorder, and nest components with an intuitive canvas that works the way your brain does. No proprietary layout system to learn.",
  },
  {
    icon: Zap,
    title: "Instant preview & publish",
    body: "See changes in real time as you make them. When you're ready, publish to a global CDN with one click. Average deployment time is under 4 seconds.",
  },
  {
    icon: Globe,
    title: "Custom domains & SSL",
    body: "Connect your own domain in minutes. Free SSL certificates are provisioned automatically and renew without any action from you.",
  },
  {
    icon: Smartphone,
    title: "Responsive by default",
    body: "Every layout you build is automatically responsive. Switch between desktop, tablet, and mobile views at any time and adjust breakpoint overrides per element.",
  },
  {
    icon: Code2,
    title: "Custom code escape hatch",
    body: "Need something outside what the builder offers? Drop in custom HTML, CSS, or JavaScript at the page, section, or element level. Your code runs alongside ours cleanly.",
  },
  {
    icon: Palette,
    title: "Design tokens & themes",
    body: "Define your brand colors, typography, and spacing as tokens. Apply your theme in one click and update everything across all pages simultaneously.",
  },
  {
    icon: Search,
    title: "SEO tooling built in",
    body: "Edit meta titles, descriptions, OG images, canonical URLs, and structured data from a simple side panel. We generate clean semantic HTML that search engines love.",
  },
  {
    icon: BarChart3,
    title: "Analytics & performance",
    body: "Track page views, unique visitors, traffic sources, and conversion events. Core Web Vitals are measured for every published page automatically.",
  },
  {
    icon: Lock,
    title: "Password-protected pages",
    body: "Need a private section for clients or team members? Protect any page or folder with a password — no plugin or third-party service needed.",
  },
  {
    icon: Cloud,
    title: "Media library",
    body: "Upload images, videos, and documents to your personal media library. Images are automatically optimized, converted to WebP, and served from the CDN edge.",
  },
  {
    icon: Plug,
    title: "Third-party integrations",
    body: "Connect to Stripe, Mailchimp, HubSpot, Google Analytics, Zapier, and dozens more directly from the dashboard. No code required.",
  },
  {
    icon: Repeat,
    title: "Version history",
    body: "Every save creates a snapshot. Browse your page's full history and restore any prior version with one click. We keep 90 days of history on all plans.",
  },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteNav />

      <main className="flex-1">
        {/* Hero */}
        <section className="max-w-4xl mx-auto px-6 py-20 text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
            Everything you need to build the web
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            WebCraft packs an entire web development workflow into a single,
            focused interface. Here&apos;s what you get from day one.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/sign-up"
              className="px-5 py-2.5 rounded-lg bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Start building free
            </Link>
            <Link
              href="/pricing"
              className="px-5 py-2.5 rounded-lg border border-border text-sm font-medium hover:bg-accent/60 transition-colors text-foreground"
            >
              View pricing
            </Link>
          </div>
        </section>

        {/* Feature grid */}
        <section className="border-t border-border bg-card/30">
          <div className="max-w-5xl mx-auto px-6 py-20">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map(({ icon: Icon, title, body }) => (
                <div
                  key={title}
                  className="space-y-3 p-6 rounded-xl border border-border bg-background hover:border-foreground/20 transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center">
                    <Icon className="w-5 h-5 text-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground text-sm">
                    {title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-4xl mx-auto px-6 py-20 text-center space-y-4">
          <h2 className="text-2xl font-bold text-foreground">
            Start with all features free
          </h2>
          <p className="text-muted-foreground text-sm">
            No credit card. No time limit on the free plan.
          </p>
          <Link
            href="/sign-up"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Create your free account
          </Link>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
