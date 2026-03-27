import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ArrowRight, Users, Target, Zap, Heart } from "lucide-react";
import Link from "next/link";

const team = [
  {
    name: "Sarah Chen",
    role: "Co-founder & CEO",
    avatar: "SC",
    bio: "Previously led product at Figma. Passionate about making professional tools accessible to everyone.",
  },
  {
    name: "Marcus Hill",
    role: "Co-founder & CTO",
    avatar: "MH",
    bio: "10 years building developer tooling at Vercel and Netlify. Loves compilers and fast UIs.",
  },
  {
    name: "Priya Nair",
    role: "Head of Design",
    avatar: "PN",
    bio: "Design systems veteran from Notion and Linear. Believes great design is invisible.",
  },
  {
    name: "James Wu",
    role: "Head of Growth",
    avatar: "JW",
    bio: "Scaled three B2B SaaS companies from 0 to 50k users. Obsessed with onboarding flows.",
  },
];

const values = [
  {
    icon: Users,
    title: "Built for everyone",
    body: "We believe powerful creative tools shouldn't require an engineering degree. WebCraft is designed so anyone — from small business owners to seasoned designers — can build something beautiful.",
  },
  {
    icon: Target,
    title: "Focused on outcomes",
    body: "We measure success by what you ship, not what you click. Every feature exists to help you publish faster, iterate smarter, and grow your online presence.",
  },
  {
    icon: Zap,
    title: "Performance first",
    body: "Every site built on WebCraft is optimized for speed by default. Fast load times, clean HTML output, and edge-deployed assets — so you never sacrifice quality for convenience.",
  },
  {
    icon: Heart,
    title: "Community driven",
    body: "Our roadmap is shaped by our users. We maintain an open changelog, host monthly AMAs, and genuinely read every piece of feedback we receive.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteNav />

      <main className="flex-1">
        {/* Hero */}
        <section className="max-w-4xl mx-auto px-6 py-20 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border text-xs text-muted-foreground bg-accent/30">
            Founded in 2023
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
            We&apos;re building the web without the walls
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            WebCraft exists because creating a professional website should take
            hours, not months. We&apos;re a small team obsessed with closing the
            gap between idea and launch.
          </p>
        </section>

        {/* Stats */}
        <section className="border-y border-border bg-card/40">
          <div className="max-w-4xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "24,000+", label: "Sites published" },
              { number: "150+", label: "Countries" },
              { number: "4.9★", label: "Average rating" },
              { number: "< 2s", label: "Avg. load time" },
            ].map(({ number, label }) => (
              <div key={label} className="text-center space-y-1">
                <p className="text-2xl font-bold text-foreground">{number}</p>
                <p className="text-sm text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Values */}
        <section className="max-w-4xl mx-auto px-6 py-20 space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-2xl font-bold text-foreground">
              What we stand for
            </h2>
            <p className="text-muted-foreground">
              The principles that guide every product decision we make.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-8">
            {values.map(({ icon: Icon, title, body }) => (
              <div key={title} className="space-y-3">
                <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center">
                  <Icon className="w-5 h-5 text-foreground" />
                </div>
                <h3 className="font-semibold text-foreground">{title}</h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="border-t border-border bg-card/30">
          <div className="max-w-4xl mx-auto px-6 py-20 space-y-12">
            <div className="text-center space-y-3">
              <h2 className="text-2xl font-bold text-foreground">
                Meet the team
              </h2>
              <p className="text-muted-foreground">
                Small team, big ambitions.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-8">
              {team.map(({ name, role, avatar, bio }) => (
                <div key={name} className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-sm font-semibold text-foreground shrink-0">
                    {avatar}
                  </div>
                  <div className="space-y-1">
                    <p className="font-semibold text-foreground text-sm">
                      {name}
                    </p>
                    <p className="text-xs text-muted-foreground">{role}</p>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      {bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-4xl mx-auto px-6 py-20 text-center space-y-6">
          <h2 className="text-2xl font-bold text-foreground">
            Ready to build something great?
          </h2>
          <p className="text-muted-foreground">
            Join 24,000+ creators already using WebCraft.
          </p>
          <Link
            href="/sign-up"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Start for free
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
