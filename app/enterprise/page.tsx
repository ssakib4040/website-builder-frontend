import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import {
  ArrowRight,
  Building2,
  Check,
  Users,
  Shield,
  Zap,
  Globe,
  Headphones,
} from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: Users,
    title: "Unlimited seats",
    body: "Add your entire organisation. Every team member gets their own access with configurable roles and permissions.",
  },
  {
    icon: Shield,
    title: "SSO & SAML",
    body: "Single sign-on via SAML 2.0. Integrate with Okta, Azure AD, Google Workspace, and any compliant identity provider.",
  },
  {
    icon: Building2,
    title: "White-label & custom branding",
    body: "Remove all WebCraft branding from published sites, dashboards, and email notifications. Use your own domain for the editor.",
  },
  {
    icon: Zap,
    title: "Priority infrastructure",
    body: "Dedicated build queues and CDN allocation. No noisy neighbours — your publish times stay fast regardless of platform load.",
  },
  {
    icon: Globe,
    title: "Custom CDN regions",
    body: "Choose which regions your CDN edge nodes are active in. GDPR-compliant data residency in EU or US.",
  },
  {
    icon: Headphones,
    title: "Dedicated support",
    body: "A named technical account manager, access to our private Slack channel, and a guaranteed 4-hour SLA for P1 issues.",
  },
];

const trustedBy = [
  "Acme Corp",
  "Meridian Studio",
  "Foundry Labs",
  "Atlas Agency",
  "Crestwood Group",
  "NovaTech",
];

const faqs = [
  {
    q: "How is Enterprise different from the Team plan?",
    a: "Enterprise adds unlimited seats, SSO/SAML, a dedicated SLA, custom CDN regions, white-label options, priority infrastructure, and a named account manager. It's designed for organisations that need security, compliance, and scale beyond what a fixed-seat plan provides.",
  },
  {
    q: "Is there a minimum contract length?",
    a: "Enterprise agreements are typically annual. We can discuss quarterly arrangements for certain contract sizes. Contact us and we'll work something out.",
  },
  {
    q: "Can you help migrate our existing sites?",
    a: "Yes. Enterprise onboarding includes a migration audit and, for complex cases, hands-on migration assistance from our solutions team.",
  },
  {
    q: "What compliance certifications does WebCraft hold?",
    a: "We are SOC 2 Type II certified and GDPR compliant. Our security page has full details. We can provide documentation under NDA.",
  },
  {
    q: "Do you offer volume pricing for agencies managing many client sites?",
    a: "Yes — agency pricing is a separate track with per-client workspace billing. Ask about it when you get in touch.",
  },
];

export default function EnterprisePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteNav />

      <main className="flex-1">
        {/* Hero */}
        <section className="max-w-5xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border text-xs text-muted-foreground bg-accent/30">
              <Building2 className="w-3 h-3" />
              Enterprise
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
              WebCraft for large teams
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Unlimited seats, enterprise security, dedicated infrastructure,
              and a team that&apos;s with you from day one. Built for
              organisations that can&apos;t afford downtime.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Talk to sales
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/security"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg border border-border text-sm font-medium hover:bg-accent/60 transition-colors text-foreground"
              >
                View security details
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card/50 p-8 space-y-5">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              What&apos;s included
            </p>
            {[
              "Everything in Team plan",
              "Unlimited team seats",
              "SSO / SAML 2.0",
              "White-label & custom branding",
              "Priority build infrastructure",
              "Custom CDN data residency",
              "Dedicated account manager",
              "4-hour SLA for P1 issues",
              "Private Slack support channel",
              "Migration assistance",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-foreground flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-background" />
                </div>
                <span className="text-sm text-foreground">{item}</span>
              </div>
            ))}
            <div className="pt-2 border-t border-border">
              <p className="text-xs text-muted-foreground">
                Custom pricing based on seats and usage. Annual agreements
                available.
              </p>
            </div>
          </div>
        </section>

        {/* Trusted by */}
        <section className="border-y border-border bg-card/30">
          <div className="max-w-5xl mx-auto px-6 py-10">
            <p className="text-xs text-muted-foreground text-center mb-6 uppercase tracking-wider">
              Trusted by leading teams
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8">
              {trustedBy.map((name) => (
                <span
                  key={name}
                  className="text-sm font-semibold text-muted-foreground/60"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="max-w-5xl mx-auto px-6 py-20 space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-2xl font-bold text-foreground">
              Built for the demands of enterprise
            </h2>
            <p className="text-muted-foreground text-sm max-w-xl mx-auto">
              Security, compliance, and scalability — without sacrificing the
              ease of use your team expects.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map(({ icon: Icon, title, body }) => (
              <div key={title} className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                  <Icon className="w-5 h-5 text-foreground" />
                </div>
                <h3 className="font-semibold text-foreground">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-border bg-card/30">
          <div className="max-w-3xl mx-auto px-6 py-20 space-y-10">
            <h2 className="text-2xl font-bold text-foreground text-center">
              Enterprise FAQ
            </h2>
            <div className="space-y-6">
              {faqs.map(({ q, a }) => (
                <div
                  key={q}
                  className="space-y-2 pb-6 border-b border-border last:border-0 last:pb-0"
                >
                  <h3 className="text-sm font-semibold text-foreground">{q}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-4xl mx-auto px-6 py-20 text-center space-y-5">
          <h2 className="text-2xl font-bold text-foreground">Ready to talk?</h2>
          <p className="text-muted-foreground text-sm">
            Our sales team will get back to you within one business day.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Contact sales
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
