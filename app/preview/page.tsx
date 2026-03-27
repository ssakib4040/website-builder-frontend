"use client";

import { useEditorStore } from "@/lib/builder/store";
import { NodeRenderer } from "@/components/builder/canvas/NodeRenderer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Monitor, Tablet, Smartphone } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";

type Viewport = "desktop" | "tablet" | "mobile";

export default function PreviewPage() {
  const { getActivePageNodes } = useEditorStore();
  const pageTree = getActivePageNodes();
  const [viewport, setViewport] = useState<Viewport>("desktop");

  const viewportClass = {
    desktop: "max-w-full",
    tablet: "max-w-[768px]",
    mobile: "max-w-[375px]",
  }[viewport];

  const viewportOptions: {
    mode: Viewport;
    icon: typeof Monitor;
    label: string;
  }[] = [
    { mode: "desktop", icon: Monitor, label: "Desktop" },
    { mode: "tablet", icon: Tablet, label: "Tablet" },
    { mode: "mobile", icon: Smartphone, label: "Mobile" },
  ];

  return (
    <TooltipProvider>
      <div className="h-screen flex flex-col bg-background">
        {/* Top bar */}
        <div className="h-12 border-b border-border px-4 flex items-center justify-between shrink-0">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 text-xs gap-1.5"
            asChild
          >
            <Link href="/builder">
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to editor
            </Link>
          </Button>

          <div className="flex items-center gap-0.5 bg-accent/50 rounded-lg p-0.5">
            {viewportOptions.map(({ mode, icon: Icon, label }) => (
              <button
                key={mode}
                onClick={() => setViewport(mode)}
                title={label}
                className={`
                  p-1.5 rounded-md transition-all duration-150
                  ${
                    viewport === mode
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }
                `}
              >
                <Icon className="w-4 h-4" />
              </button>
            ))}
          </div>

          <div className="w-[100px]" />
        </div>

        {/* Preview content */}
        <div className="flex-1 overflow-auto bg-accent/20">
          <div
            className={`mx-auto bg-background min-h-full transition-all duration-300 ${viewportClass} ${viewport !== "desktop" ? "border-x border-border shadow-sm" : ""}`}
          >
            {pageTree.length === 0 ? (
              <div className="h-[calc(100vh-3rem)] flex flex-col items-center justify-center text-center px-6">
                <p className="text-sm text-muted-foreground mb-1">
                  Nothing to preview
                </p>
                <p className="text-xs text-muted-foreground/60">
                  Add some components in the editor first.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4 h-8 text-xs"
                  asChild
                >
                  <Link href="/builder">Go to editor</Link>
                </Button>
              </div>
            ) : (
              <div className="p-6 space-y-1">
                {pageTree.map((node) => (
                  <div key={node.id} className="py-1 px-2">
                    <NodeRenderer node={node} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
