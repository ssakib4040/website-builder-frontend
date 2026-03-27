"use client";

import { BuilderNode } from "@/lib/builder/types";
import { Button } from "@/components/ui/button";

interface Props {
  node: BuilderNode;
}

export function NodeRenderer({ node }: Props) {
  const p = node.props;

  switch (node.type) {
    case "heading": {
      const level = (p.level as string) || "h2";
      const sizeClass =
        {
          h1: "text-4xl font-bold",
          h2: "text-3xl font-semibold",
          h3: "text-2xl font-semibold",
          h4: "text-xl font-medium",
        }[level] ?? "text-3xl font-semibold";

      const HeadingTag = level as "h1" | "h2" | "h3" | "h4";

      return (
        <HeadingTag
          className={`${sizeClass} tracking-tight text-foreground`}
          style={{ textAlign: p.align as "left" | "center" | "right" }}
        >
          {(p.text as string) || "Untitled"}
        </HeadingTag>
      );
    }

    case "paragraph":
      return (
        <p
          className="text-base text-foreground/80 leading-relaxed"
          style={{ textAlign: p.align as "left" | "center" | "right" }}
        >
          {(p.text as string) || "Start writing here..."}
        </p>
      );

    case "quote":
      return (
        <blockquote className="border-l-3 border-foreground/20 pl-4 py-1">
          <p className="text-base italic text-foreground/70 leading-relaxed">
            {(p.text as string) || "A meaningful quote..."}
          </p>
          {p.author && (
            <cite className="text-sm text-muted-foreground mt-1 block not-italic">
              — {p.author as string}
            </cite>
          )}
        </blockquote>
      );

    case "divider":
      return <hr className="border-t border-border my-2" />;

    case "image":
      return (
        <div className={`${p.rounded ? "rounded-lg overflow-hidden" : ""}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={p.src as string}
            alt={p.alt as string}
            className="w-full h-auto object-cover"
          />
        </div>
      );

    case "button": {
      const align = p.align as string;
      return (
        <div
          className={`flex ${align === "center" ? "justify-center" : align === "right" ? "justify-end" : "justify-start"}`}
        >
          <Button
            variant={p.variant as "default" | "secondary" | "outline" | "ghost"}
          >
            {(p.text as string) || "Button"}
          </Button>
        </div>
      );
    }

    case "spacer": {
      const heightMap: Record<string, string> = {
        sm: "16px",
        md: "32px",
        lg: "64px",
        xl: "96px",
      };
      return (
        <div
          className="w-full flex items-center justify-center group"
          style={{ height: heightMap[p.height as string] ?? "32px" }}
        >
          <div className="w-full border-t border-dashed border-border/50" />
        </div>
      );
    }

    case "section": {
      const paddingMap: Record<string, string> = {
        none: "0",
        sm: "1rem",
        md: "2rem",
        lg: "3rem",
      };
      return (
        <div
          className="w-full rounded-lg border border-dashed border-border/40 min-h-[80px] flex items-center justify-center"
          style={{
            padding: paddingMap[p.padding as string] ?? "2rem",
            backgroundColor: p.background as string,
          }}
        >
          <span className="text-xs text-muted-foreground">Section</span>
        </div>
      );
    }

    case "columns": {
      const cols = parseInt(p.count as string) || 2;
      const gapMap: Record<string, string> = {
        sm: "0.5rem",
        md: "1rem",
        lg: "1.5rem",
      };
      return (
        <div
          className="w-full grid min-h-[60px]"
          style={{
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gap: gapMap[p.gap as string] ?? "1rem",
          }}
        >
          {Array.from({ length: cols }).map((_, i) => (
            <div
              key={i}
              className="border border-dashed border-border/40 rounded-lg flex items-center justify-center py-6"
            >
              <span className="text-xs text-muted-foreground">
                Column {i + 1}
              </span>
            </div>
          ))}
        </div>
      );
    }

    case "hero":
      return (
        <div className="text-center py-12 px-6 space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            {(p.title as string) || "Build something amazing"}
          </h1>
          <p className="text-lg text-foreground/60 max-w-lg mx-auto leading-relaxed">
            {(p.subtitle as string) ||
              "Create beautiful websites without writing code."}
          </p>
          <div className="pt-2">
            <Button size="lg">
              {(p.buttonText as string) || "Get Started"}
            </Button>
          </div>
        </div>
      );

    case "card":
      return (
        <div className="border border-border rounded-lg overflow-hidden bg-card">
          {p.image && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={p.image as string}
              alt={(p.title as string) || "Card"}
              className="w-full h-40 object-cover"
            />
          )}
          <div className="p-4 space-y-1.5">
            <h3 className="font-semibold text-foreground">
              {(p.title as string) || "Card Title"}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {(p.description as string) || "A short description."}
            </p>
          </div>
        </div>
      );

    default:
      return (
        <div className="p-3 border border-dashed border-border rounded-lg text-sm text-muted-foreground">
          Unknown: {node.type}
        </div>
      );
  }
}
