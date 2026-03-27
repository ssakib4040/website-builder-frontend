import Link from "next/link";
import { ArrowRight, Blocks, MousePointerClick, Layers } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center max-w-2xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent text-xs text-muted-foreground mb-6">
          <Blocks className="w-3 h-3" />
          Visual Website Builder
        </div>

        {/* Hero */}
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground leading-[1.1] mb-4">
          Build pages
          <br />
          <span className="text-muted-foreground">visually.</span>
        </h1>

        <p className="text-base text-muted-foreground max-w-md leading-relaxed mb-8">
          Drag-and-drop components onto a canvas, customize everything, and ship
          beautiful pages — no code required.
        </p>

        {/* CTA */}
        <Link
          href="/builder"
          className="inline-flex items-center gap-2 h-11 px-6 rounded-lg bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Open Builder
          <ArrowRight className="w-4 h-4" />
        </Link>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-16 w-full">
          <FeatureCard
            icon={<MousePointerClick className="w-5 h-5" />}
            title="Drag & Drop"
            desc="Intuitive block-based editor with smooth interactions."
          />
          <FeatureCard
            icon={<Layers className="w-5 h-5" />}
            title="Component Library"
            desc="Pre-built blocks for headings, images, cards, heroes, and more."
          />
          <FeatureCard
            icon={<Blocks className="w-5 h-5" />}
            title="Live Preview"
            desc="See your page come together in real-time as you build."
          />
        </div>
      </main>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2 p-5 rounded-xl border border-border bg-card hover:bg-accent/40 transition-colors duration-200">
      <div className="text-muted-foreground">{icon}</div>
      <h3 className="text-sm font-medium text-foreground">{title}</h3>
      <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  );
}
