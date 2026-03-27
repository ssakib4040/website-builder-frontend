"use client";

import Link from "next/link";
import { Layers, RefreshCw, Home } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-background overflow-hidden px-6">
      {/* Radial glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="w-150 h-150 rounded-full bg-foreground/3 dark:bg-foreground/7 blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-lg mx-auto gap-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-foreground flex items-center justify-center shadow-sm group-hover:opacity-80 transition-opacity">
            <Layers className="w-5 h-5 text-background" />
          </div>
          <span className="font-semibold text-foreground text-lg">
            WebCraft
          </span>
        </Link>

        {/* 500 number + heading */}
        <div className="space-y-4">
          <p className="text-[9rem] leading-none font-black tracking-tighter text-foreground/6 dark:text-foreground/15 select-none">
            500
          </p>
          <div className="-mt-6 space-y-3">
            <h1 className="text-3xl font-bold text-foreground tracking-tight">
              Something went wrong
            </h1>
            <p className="text-muted-foreground leading-relaxed max-w-sm mx-auto">
              An unexpected error occurred. Our team has been notified. Try
              refreshing the page or head back home.
            </p>
            {error?.digest && (
              <p className="text-xs text-muted-foreground/50 font-mono pt-1">
                Error ID: {error.digest}
              </p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <button
            onClick={reset}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-foreground text-background font-medium hover:opacity-90 transition-opacity shadow-sm"
          >
            <RefreshCw className="w-4 h-4" />
            Try again
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg border border-border text-foreground font-medium hover:bg-accent/60 transition-colors"
          >
            <Home className="w-4 h-4" />
            Back to home
          </Link>
        </div>

        {/* Quick links */}
        <div className="border-t border-border/60 pt-6 w-full">
          <p className="text-sm text-muted-foreground mb-4">Popular pages</p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {[
              { label: "Features", href: "/features" },
              { label: "Pricing", href: "/pricing" },
              { label: "Templates", href: "/templates" },
              { label: "Docs", href: "/docs" },
              { label: "Blog", href: "/blog" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
