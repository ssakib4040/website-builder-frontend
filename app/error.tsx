"use client";

import Link from "next/link";
import { Layers, RefreshCw } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-6 text-center gap-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center">
          <Layers className="w-4 h-4 text-background" />
        </div>
        <span className="text-sm font-semibold text-foreground">WebCraft</span>
      </div>

      <div className="space-y-2">
        <p className="text-8xl font-bold text-foreground/10 select-none">500</p>
        <h1 className="text-2xl font-bold text-foreground -mt-8 relative">
          Something went wrong
        </h1>
        <p className="text-sm text-muted-foreground max-w-sm mx-auto">
          An unexpected error occurred. Our team has been notified. You can try
          refreshing or head back home.
        </p>
        {error?.digest && (
          <p className="text-xs text-muted-foreground/60 mt-2 font-mono">
            Error ID: {error.digest}
          </p>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-3">
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <RefreshCw className="w-4 h-4" />
          Try again
        </button>
        <Link
          href="/"
          className="px-5 py-2.5 rounded-lg border border-border text-sm font-medium hover:bg-accent/60 transition-colors text-foreground"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
