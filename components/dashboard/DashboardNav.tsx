"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useRef, startTransition } from "react";
import {
  FileText,
  Database,
  Plug,
  Workflow,
  LayoutDashboard,
  Layers,
  Image,
  Rocket,
  Globe,
  BarChart2,
  SearchCheck,
  Inbox,
  Users,
  Puzzle,
  KeyRound,
  ArchiveRestore,
  Activity,
  Settings,
  Menu,
  X,
  ChevronsUpDown,
  Check,
  Plus,
  LayoutGrid,
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useSitesStore } from "@/lib/sites-store";

const mainItems = [
  { href: "/dashboard/sites", icon: LayoutGrid, label: "All Sites" },
  { href: "/dashboard", icon: LayoutDashboard, label: "Overview" },
];

const buildItems = [
  { href: "/dashboard/pages", icon: FileText, label: "Pages" },
  { href: "/dashboard/data", icon: Database, label: "Data" },
  { href: "/dashboard/api", icon: Plug, label: "APIs" },
  { href: "/dashboard/logic", icon: Workflow, label: "Logic" },
  { href: "/dashboard/media", icon: Image, label: "Media" },
];

const deployItems = [
  { href: "/dashboard/deployments", icon: Rocket, label: "Deployments" },
  { href: "/dashboard/domains", icon: Globe, label: "Domains" },
  { href: "/dashboard/analytics", icon: BarChart2, label: "Analytics" },
  { href: "/dashboard/seo", icon: SearchCheck, label: "SEO" },
];

const usersItems = [
  { href: "/dashboard/forms", icon: Inbox, label: "Forms" },
  { href: "/dashboard/team", icon: Users, label: "Team" },
];

const projectItems = [
  { href: "/dashboard/integrations", icon: Puzzle, label: "Integrations" },
  { href: "/dashboard/env", icon: KeyRound, label: "Env Variables" },
  { href: "/dashboard/backups", icon: ArchiveRestore, label: "Backups" },
  { href: "/dashboard/activity", icon: Activity, label: "Activity" },
  { href: "/dashboard/settings", icon: Settings, label: "Settings" },
];

function NavItem({
  href,
  icon: Icon,
  label,
  isActive,
  siteId,
}: {
  href: string;
  icon: typeof LayoutDashboard;
  label: string;
  isActive: boolean;
  siteId?: string;
}) {
  const fullHref =
    siteId && href !== "/dashboard/sites" ? `${href}?site=${siteId}` : href;
  return (
    <Link
      href={fullHref}
      className={`
        relative flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm
        transition-all duration-150 group
        ${
          isActive
            ? "bg-accent text-foreground font-medium"
            : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
        }
      `}
    >
      {isActive && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-foreground rounded-full" />
      )}
      <Icon
        className={`w-4 h-4 shrink-0 ${isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"} transition-colors`}
      />
      {label}
    </Link>
  );
}

function SectionLabel({ label }: { label: string }) {
  return (
    <p className="px-3 mb-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60 select-none">
      {label}
    </p>
  );
}

function SiteSwitcher({ onNavigate }: { onNavigate?: () => void }) {
  const { sites, currentSiteId, setCurrentSite } = useSitesStore();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const current = sites.find((s) => s.id === currentSiteId) ?? sites[0];

  // Close on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg border border-border hover:bg-accent/60 transition-colors text-left"
      >
        <div
          className={`w-6 h-6 rounded-md shrink-0 bg-linear-to-br ${current?.gradient ?? "from-neutral-500 to-stone-600"} flex items-center justify-center`}
        >
          <Layers className="w-3 h-3 text-white/70" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-foreground truncate leading-tight">
            {current?.name ?? "Select site"}
          </p>
          <p className="text-[10px] text-muted-foreground truncate leading-tight mt-0.5">
            {current?.subdomain ?? ""}
          </p>
        </div>
        <ChevronsUpDown className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 mt-1.5 bg-background border border-border rounded-xl shadow-lg z-50 overflow-hidden">
          <div className="p-1.5 space-y-0.5 max-h-56 overflow-y-auto">
            {sites.map((site) => (
              <button
                key={site.id}
                onClick={() => {
                  setCurrentSite(site.id);
                  setOpen(false);
                  onNavigate?.();
                  router.push(
                    pathname !== "/dashboard/sites"
                      ? `${pathname}?site=${site.id}`
                      : `/dashboard?site=${site.id}`,
                  );
                }}
                className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition-colors ${
                  site.id === currentSiteId ? "bg-accent" : "hover:bg-accent/60"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded shrink-0 bg-linear-to-br ${site.gradient}`}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-foreground truncate">
                    {site.name}
                  </p>
                  <p className="text-[10px] text-muted-foreground truncate">
                    {site.status}
                  </p>
                </div>
                {site.id === currentSiteId && (
                  <Check className="w-3 h-3 text-foreground shrink-0" />
                )}
              </button>
            ))}
          </div>
          <div className="border-t border-border p-1.5 space-y-0.5">
            <Link
              href="/dashboard/sites"
              onClick={() => {
                setOpen(false);
                onNavigate?.();
              }}
              className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-colors"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              All Sites
            </Link>
            <Link
              href="/dashboard/sites"
              onClick={() => {
                setOpen(false);
                onNavigate?.();
              }}
              className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              New Site
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

function NavContents({
  isActive,
  siteId,
  onNavigate,
}: {
  isActive: (href: string) => boolean;
  siteId: string;
  onNavigate?: () => void;
}) {
  return (
    <>
      {/* ── Brand + Site Switcher ── */}
      <div className="px-3 pt-3 pb-3 border-b border-border shrink-0 space-y-2.5">
        <Link href="/" className="flex items-center gap-2 px-1">
          <div className="w-6 h-6 rounded-md bg-foreground flex items-center justify-center shrink-0">
            <Layers className="w-3.5 h-3.5 text-background" />
          </div>
          <span className="text-sm font-semibold text-foreground tracking-tight">
            WebCraft
          </span>
        </Link>
        <SiteSwitcher onNavigate={onNavigate} />
      </div>

      {/* ── Navigation ── */}
      <nav
        className="flex-1 px-2 py-4 space-y-4 overflow-y-auto"
        onClick={onNavigate}
      >
        <div>
          <SectionLabel label="General" />
          <div className="space-y-0.5">
            {mainItems.map(({ href, icon, label }) => (
              <NavItem
                key={href}
                href={href}
                icon={icon}
                label={label}
                isActive={isActive(href)}
                siteId={siteId}
              />
            ))}
          </div>
        </div>
        <div>
          <SectionLabel label="Build" />
          <div className="space-y-0.5">
            {buildItems.map(({ href, icon, label }) => (
              <NavItem
                key={href}
                href={href}
                icon={icon}
                label={label}
                isActive={isActive(href)}
                siteId={siteId}
              />
            ))}
          </div>
        </div>
        <div>
          <SectionLabel label="Deploy" />
          <div className="space-y-0.5">
            {deployItems.map(({ href, icon, label }) => (
              <NavItem
                key={href}
                href={href}
                icon={icon}
                label={label}
                isActive={isActive(href)}
                siteId={siteId}
              />
            ))}
          </div>
        </div>
        <div>
          <SectionLabel label="Users" />
          <div className="space-y-0.5">
            {usersItems.map(({ href, icon, label }) => (
              <NavItem
                key={href}
                href={href}
                icon={icon}
                label={label}
                isActive={isActive(href)}
                siteId={siteId}
              />
            ))}
          </div>
        </div>
        <div>
          <SectionLabel label="Project" />
          <div className="space-y-0.5">
            {projectItems.map(({ href, icon, label }) => (
              <NavItem
                key={href}
                href={href}
                icon={icon}
                label={label}
                isActive={isActive(href)}
                siteId={siteId}
              />
            ))}
          </div>
        </div>
      </nav>

      {/* ── Footer ── */}
      <div className="px-3 py-3 border-t border-border space-y-1 shrink-0">
        <Link
          href="/builder"
          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all duration-150 group"
        >
          <Rocket className="w-4 h-4 shrink-0 text-muted-foreground group-hover:text-foreground transition-colors" />
          Open Builder
        </Link>
        <div className="flex items-center justify-between px-3 py-1.5">
          <span className="text-xs text-muted-foreground">Appearance</span>
          <ThemeToggle />
        </div>
      </div>
    </>
  );
}

export function DashboardNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const { sites, currentSiteId, setCurrentSite } = useSitesStore();
  const currentSite = sites.find((s) => s.id === currentSiteId) ?? sites[0];

  // Sync ?site= URL param → store on navigation
  useEffect(() => {
    const siteId = searchParams.get("site");
    if (siteId && siteId !== currentSiteId) {
      const exists = sites.find((s) => s.id === siteId);
      if (exists) startTransition(() => setCurrentSite(siteId));
    }
  }, [searchParams, currentSiteId, sites, setCurrentSite]);

  // Close drawer on route change
  useEffect(() => {
    startTransition(() => setOpen(false));
  }, [pathname]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/dashboard" || href === "/dashboard/sites"
      ? pathname === href
      : pathname.startsWith(href);

  return (
    <>
      {/* ── Desktop sidebar ── */}
      <div className="hidden lg:flex w-64 border-r border-border bg-background flex-col shrink-0">
        <NavContents isActive={isActive} siteId={currentSiteId} />
      </div>

      {/* ── Mobile top bar ── */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 h-12 border-b border-border bg-background flex items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-6 h-6 rounded-md bg-foreground flex items-center justify-center shrink-0">
            <Layers className="w-3.5 h-3.5 text-background" />
          </div>
          <div className="min-w-0">
            <span className="text-sm font-semibold text-foreground tracking-tight">
              WebCraft
            </span>
            {currentSite && (
              <span className="text-xs text-muted-foreground ml-1.5 hidden sm:inline">
                / {currentSite.name}
              </span>
            )}
          </div>
        </Link>
        <button
          onClick={() => setOpen(true)}
          className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* ── Mobile drawer backdrop ── */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ── Mobile drawer ── */}
      <div
        className={`lg:hidden fixed top-0 left-0 z-50 h-full w-72 bg-background border-r border-border flex flex-col shadow-xl transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-end px-4 py-3 border-b border-border">
          <button
            onClick={() => setOpen(false)}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex flex-col flex-1 overflow-hidden">
          <NavContents
            isActive={isActive}
            siteId={currentSiteId}
            onNavigate={() => setOpen(false)}
          />
        </div>
      </div>
    </>
  );
}
