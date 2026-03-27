import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Check, X, ArrowRight } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "",
    description: "Perfect for personal projects and exploration.",
    cta: "Start for free",
    href: "/sign-up",
    highlight: false,
    features: [
      { label: "3 published sites", included: true },
      { label: "WebCraft subdomain", included: true },
      { label: "Drag-and-drop builder", included: true },
      { label: "Basic templates", included: true },
      { label: "1 GB media storage", included: true },
      { label: "Custom domain", included: false },
      { label: "Remove WebCraft badge", included: false },
      { label: "Analytics", included: false },
      { label: "Password-protected pages", included: false },
      { label: "Priority support", included: false },
    ],
  },
  {
    name: "Pro",
    price: "$12",
    period: "/month",
    description: "For freelancers and growing businesses.",
    cta: "Start Pro trial",
    href: "/sign-up",
    highlight: true,
    features: [
      { label: "Unlimited published sites", included: true },
      { label: "Custom domain included", included: true },
      { label: "Drag-and-drop builder", included: true },
      { label: "All templates", included: true },
      { label: "50 GB media storage", included: true },
      { label: "Custom domain", included: true },
      { label: "Remove WebCraft badge", included: true },
      { label: "Analytics dashboard", included: true },
      { label: "Password-protected pages", included: true },
      { label: "Priority email support", included: true },
    ],
  },
  {
    name: "Team",
    price: "$39",
    period: "/month",
    description: "For agencies, studios, and product teams.",
    cta: "Start Team trial",
    href: "/sign-up",
    highlight: false,
    features: [
      { label: "Everything in Pro", included: true },
      { label: "Up to 5 team seats", included: true },
      { label: "Role-based permissions", included: true },
      { label: "Guest sharing links", included: true },
      { label: "500 GB media storage", included: true },
      { label: "White-label mode", included: true },
      { label: "Remove WebCraft badge", included: true },
      { label: "Advanced analytics", included: true },
      { label: "CMS content API", included: true },
      { label: "Dedicated Slack support", included: true },
    ],
  },
];

const faqs = [
  {
    q: "Can I try Pro for free?",
    a: "Yes — every paid plan comes with a 14-day free trial, no credit card required until the trial ends.",
  },
  {
    q: "What happens if I exceed storage?",
    a: "We'll notify you when you're at 90% capacity. You can upgrade your plan or delete unused media at any time.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Absolutely. Cancel from your account settings with one click. Your sites stay live until the end of your billing period.",
  },
  {
    q: "Do you offer annual billing?",
    a: "Yes — pay annually and save 20% on the Pro and Team plans. Switch anytime from your billing settings.",
  },
  {
    q: "Is there a discount for students or nonprofits?",
    a: "Yes — email us at pricing@webcraft.io with proof of status and we'll apply a 50% discount.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit/debit cards, PayPal, and wire transfers for Team and above.",
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteNav />

      <main className="flex-1">
        {/* Hero */}
        <section className="max-w-4xl mx-auto px-6 py-20 text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Simple, honest pricing
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Start free. Upgrade when you need to. No hidden fees, no per-seat
            surprises.
          </p>
        </section>

        {/* Plans */}
        <section className="max-w-5xl mx-auto px-6 pb-20">
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-xl border p-6 flex flex-col gap-6 ${
                  plan.highlight
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-card/40"
                }`}
              >
                <div className="space-y-1">
                  <p
                    className={`text-xs font-semibold uppercase tracking-wider ${plan.highlight ? "text-background/70" : "text-muted-foreground"}`}
                  >
                    {plan.name}
                  </p>
                  <div className="flex items-baseline gap-0.5">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span
                      className={`text-sm ${plan.highlight ? "text-background/70" : "text-muted-foreground"}`}
                    >
                      {plan.period}
                    </span>
                  </div>
                  <p
                    className={`text-sm ${plan.highlight ? "text-background/80" : "text-muted-foreground"}`}
                  >
                    {plan.description}
                  </p>
                </div>

                <Link
                  href={plan.href}
                  className={`flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-sm font-medium transition-opacity hover:opacity-90 ${
                    plan.highlight
                      ? "bg-background text-foreground"
                      : "bg-foreground text-background"
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <ul className="space-y-2.5 flex-1">
                  {plan.features.map(({ label, included }) => (
                    <li key={label} className="flex items-center gap-2 text-sm">
                      {included ? (
                        <Check
                          className={`w-4 h-4 shrink-0 ${plan.highlight ? "text-background" : "text-foreground"}`}
                        />
                      ) : (
                        <X
                          className={`w-4 h-4 shrink-0 ${plan.highlight ? "text-background/40" : "text-muted-foreground/50"}`}
                        />
                      )}
                      <span
                        className={
                          included
                            ? ""
                            : plan.highlight
                              ? "text-background/50"
                              : "text-muted-foreground/60"
                        }
                      >
                        {label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-border bg-card/30">
          <div className="max-w-3xl mx-auto px-6 py-20 space-y-12">
            <h2 className="text-2xl font-bold text-foreground text-center">
              Frequently asked questions
            </h2>
            <div className="space-y-6">
              {faqs.map(({ q, a }) => (
                <div key={q} className="space-y-2">
                  <h3 className="font-semibold text-foreground text-sm">{q}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-4xl mx-auto px-6 py-20 text-center space-y-4">
          <h2 className="text-2xl font-bold text-foreground">
            Still have questions?
          </h2>
          <p className="text-muted-foreground text-sm">
            Our team usually replies within a few hours.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-sm font-medium hover:bg-accent/60 transition-colors text-foreground"
          >
            Contact us
          </Link>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
