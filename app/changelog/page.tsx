import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";

const entries = [
  {
    version: "2.4.0",
    date: "March 20, 2026",
    type: "release" as const,
    title: "Version history, bulk operations & 12 new templates",
    items: [
      {
        kind: "new",
        text: "Full 90-day version history for every published page — restore any snapshot with one click.",
      },
      {
        kind: "new",
        text: "Bulk operations in the media library: select, delete, rename, or move multiple files at once.",
      },
      {
        kind: "new",
        text: "12 new starter templates across Business, Portfolio, and E-commerce categories.",
      },
      {
        kind: "new",
        text: "Custom 404 page editor — design your own not-found page in the builder.",
      },
      {
        kind: "improved",
        text: "Image optimisation pipeline now uses AVIF for browsers that support it, falling back to WebP.",
      },
      {
        kind: "improved",
        text: "The builder canvas now snaps to a configurable grid (8px / 16px / off).",
      },
      {
        kind: "fixed",
        text: "Fixed an issue where undo/redo would lose text cursor position inside rich text blocks.",
      },
      {
        kind: "fixed",
        text: "Fixed mobile preview sometimes rendering at incorrect viewport width on retina screens.",
      },
    ],
  },
  {
    version: "2.3.2",
    date: "February 28, 2026",
    type: "patch" as const,
    title: "Bug fixes and performance improvements",
    items: [
      {
        kind: "improved",
        text: "Reduced initial bundle size by 18% — first meaningful paint is now ~200ms faster.",
      },
      {
        kind: "fixed",
        text: "Fixed a rare crash when dragging a component onto an empty column after deleting a sibling.",
      },
      {
        kind: "fixed",
        text: "Fixed theme token changes not applying instantly in the builder preview.",
      },
      {
        kind: "fixed",
        text: "Analytics dashboard no longer shows NaN% for new sites with zero prior-period data.",
      },
    ],
  },
  {
    version: "2.3.0",
    date: "February 10, 2026",
    type: "release" as const,
    title: "Integrations hub, Stripe connect & logic automations",
    items: [
      {
        kind: "new",
        text: "Integrations hub: connect Stripe, Mailchimp, HubSpot, Zapier, and Google Analytics from one dashboard panel.",
      },
      {
        kind: "new",
        text: "Stripe Connect lets you embed a checkout directly into your page. No backend code required.",
      },
      {
        kind: "new",
        text: "Logic automations (beta): trigger actions like sending an email or updating a Airtable row when a form is submitted.",
      },
      {
        kind: "new",
        text: "Password-protected pages — add a password gate to any page or subfolder.",
      },
      {
        kind: "improved",
        text: "Richer form builder: added date picker, file upload, and rating field types.",
      },
      {
        kind: "fixed",
        text: "Fixed Zapier webhook not firing when the form had more than 12 fields.",
      },
    ],
  },
  {
    version: "2.2.0",
    date: "January 15, 2026",
    type: "release" as const,
    title: "Team collaboration & role-based access",
    items: [
      {
        kind: "new",
        text: "Team plan now supports up to 5 seats with role-based permissions (Owner, Editor, Viewer).",
      },
      {
        kind: "new",
        text: "Guest sharing links: share a read-only preview URL with clients — no account needed.",
      },
      {
        kind: "new",
        text: "Comments on pages: leave contextual notes for teammates directly on the canvas.",
      },
      {
        kind: "improved",
        text: "Dashboard redesigned with a cleaner sidebar, deployment status card, and Getting Started checklist.",
      },
    ],
  },
  {
    version: "2.1.0",
    date: "December 5, 2025",
    type: "release" as const,
    title: "Design tokens, global theme editor & dark mode",
    items: [
      {
        kind: "new",
        text: "Global theme editor: define your color palette, typography, and spacing as design tokens that apply site-wide.",
      },
      {
        kind: "new",
        text: "Dark mode support — toggle between light and dark in the builder and on published sites.",
      },
      {
        kind: "new",
        text: "Variable fonts support: fine-tune weight, width, and optical size for supported typefaces.",
      },
      {
        kind: "improved",
        text: "Significantly improved Lighthouse scores across published sites — median Performance is now 94.",
      },
    ],
  },
  {
    version: "2.0.0",
    date: "November 1, 2025",
    type: "release" as const,
    title: "WebCraft 2.0 — rebuilt from the ground up",
    items: [
      {
        kind: "new",
        text: "Entirely new builder engine — faster canvas, smoother drag-and-drop, no more layout jank.",
      },
      {
        kind: "new",
        text: "Component library with 60+ pre-built blocks across layout, typography, media, and form categories.",
      },
      {
        kind: "new",
        text: "Multi-page project support — manage all your pages from a single project dashboard.",
      },
      {
        kind: "new",
        text: "One-click publish to our global CDN with automatic SSL provisioning.",
      },
    ],
  },
];

const kindStyles: Record<string, string> = {
  new: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  improved:
    "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  fixed:
    "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
};

const typeStyles: Record<string, string> = {
  release: "bg-foreground text-background",
  patch: "bg-accent text-foreground border border-border",
};

export default function ChangelogPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteNav />

      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-6 py-16 space-y-4">
          <header className="space-y-3 mb-12">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Changelog
            </h1>
            <p className="text-muted-foreground">
              Every improvement, fix, and new feature — in one place. Updated
              with every release.
            </p>
          </header>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border hidden sm:block" />

            <div className="space-y-12">
              {entries.map((entry) => (
                <div key={entry.version} className="sm:pl-8 relative">
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full border-2 border-border bg-background hidden sm:block" />

                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${typeStyles[entry.type]}`}
                      >
                        v{entry.version}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {entry.date}
                      </span>
                    </div>

                    <h2 className="text-lg font-semibold text-foreground">
                      {entry.title}
                    </h2>

                    <ul className="space-y-2.5">
                      {entry.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <span
                            className={`mt-0.5 shrink-0 px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide ${kindStyles[item.kind]}`}
                          >
                            {item.kind}
                          </span>
                          <span className="text-sm text-muted-foreground leading-relaxed">
                            {item.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
