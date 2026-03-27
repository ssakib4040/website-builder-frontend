"use client";

import Link from "next/link";
import { useState } from "react";
import { Layers, ArrowRight, Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-7 h-7 rounded-lg bg-foreground flex items-center justify-center">
            <Layers className="w-4 h-4 text-background" />
          </div>
          <span className="text-base font-semibold text-foreground tracking-tight">
            WebCraft
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-base text-muted-foreground">
          <Link
            href="/templates"
            className="hover:text-foreground transition-colors"
          >
            Templates
          </Link>
          <Link
            href="/features"
            className="hover:text-foreground transition-colors"
          >
            Features
          </Link>
          <Link
            href="/pricing"
            className="hover:text-foreground transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="/about"
            className="hover:text-foreground transition-colors"
          >
            About
          </Link>
          <Link
            href="/blog"
            className="hover:text-foreground transition-colors"
          >
            Blog
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/sign-in"
            className="h-8 px-4 text-sm font-medium rounded-lg border border-border hover:bg-accent/60 transition-colors text-foreground flex items-center"
          >
            Sign in
          </Link>
          <Link
            href="/sign-up"
            className="h-8 px-4 text-sm font-medium rounded-lg bg-foreground text-background hover:opacity-90 transition-opacity flex items-center gap-1.5"
          >
            Get started
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <button
          className="md:hidden p-2 rounded-lg hover:bg-accent/60 transition-colors"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background px-6 py-4 space-y-3">
          {[
            { href: "/templates", label: "Templates" },
            { href: "/features", label: "Features" },
            { href: "/pricing", label: "Pricing" },
            { href: "/about", label: "About" },
            { href: "/blog", label: "Blog" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="block text-sm text-muted-foreground hover:text-foreground"
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <Link
              href="/sign-in"
              className="text-sm font-medium text-center py-2 border border-border rounded-lg hover:bg-accent/60 transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/sign-up"
              className="text-sm font-medium text-center py-2 bg-foreground text-background rounded-lg hover:opacity-90 transition-opacity"
            >
              Get started free
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
