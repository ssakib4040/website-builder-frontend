import Link from "next/link";
import { Layers } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-5 gap-8">
        <div className="col-span-2 md:col-span-1 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-foreground flex items-center justify-center">
              <Layers className="w-3.5 h-3.5 text-background" />
            </div>
            <span className="text-sm font-semibold text-foreground">
              WebCraft
            </span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Build beautiful websites visually. No code required.
          </p>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-semibold text-foreground uppercase tracking-wider">
            Product
          </p>
          <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
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
              href="/enterprise"
              className="hover:text-foreground transition-colors"
            >
              Enterprise
            </Link>
            <Link
              href="/changelog"
              className="hover:text-foreground transition-colors"
            >
              Changelog
            </Link>
          </nav>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-semibold text-foreground uppercase tracking-wider">
            Resources
          </p>
          <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
            <Link
              href="/docs"
              className="hover:text-foreground transition-colors"
            >
              Documentation
            </Link>
            <Link
              href="/blog"
              className="hover:text-foreground transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/status"
              className="hover:text-foreground transition-colors"
            >
              Status
            </Link>
            <Link
              href="/security"
              className="hover:text-foreground transition-colors"
            >
              Security
            </Link>
          </nav>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-semibold text-foreground uppercase tracking-wider">
            Company
          </p>
          <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
            <Link
              href="/about"
              className="hover:text-foreground transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="hover:text-foreground transition-colors"
            >
              Contact
            </Link>
          </nav>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-semibold text-foreground uppercase tracking-wider">
            Legal
          </p>
          <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
            <Link
              href="/privacy"
              className="hover:text-foreground transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-foreground transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/cookies"
              className="hover:text-foreground transition-colors"
            >
              Cookie Policy
            </Link>
          </nav>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} WebCraft. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <Link
              href="/privacy"
              className="hover:text-foreground transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="hover:text-foreground transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/cookies"
              className="hover:text-foreground transition-colors"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
