"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
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
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

const mainItems = [
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
}: {
  href: string;
  icon: typeof LayoutDashboard;
  label: string;
  isActive: boolean;
}) {
  return (
    <Link
      href={href}
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

function NavContents({
  isActive,
  onNavigate,
}: {
  isActive: (href: string) => boolean;
  onNavigate?: () => void;
}) {
  return (
    <>
      {/* ── Brand ── */}
      <div className="px-4 py-4 border-b border-border shrink-0">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 rounded-lg bg-foreground flex items-center justify-center shrink-0">
            <Layers className="w-4 h-4 text-background" />
          </div>
          <div className="leading-none">
            <p className="text-sm font-semibold text-foreground tracking-tight">WebCraft</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">No-code builder</p>
          </div>
        </Link>
      </div>

      {/* ── Navigation ── */}
      <nav className="flex-1 px-2 py-4 space-y-4 overflow-y-auto" onClick={onNavigate}>
        <div>
          <SectionLabel label="General" />
          <div className="space-y-0.5">
            {mainItems.map(({ href, icon, label }) => (
              <NavItem key={href} href={href} icon={icon} label={label} isActive={isActive(href)} />
            ))}
          </div>
        </div>
        <div>
          <SectionLabel label="Build" />
          <div className="space-y-0.5">
            {buildItems.map(({ href, icon, label }) => (
              <NavItem key={href} href={href} icon={icon} label={label} isActive={isActive(href)} />
            ))}
          </div>
        </div>
        <div>
          <SectionLabel label="Deploy" />
          <div className="space-y-0.5">
            {deployItems.map(({ href, icon, label }) => (
              <NavItem key={href} href={href} icon={icon} label={label} isActive={isActive(href)} />
            ))}
          </div>
        </div>
        <div>
          <SectionLabel label="Users" />
          <div className="space-y-0.5">
            {usersItems.map(({ href, icon, label }) => (
              <NavItem key={href} href={href} icon={icon} label={label} isActive={isActive(href)} />
            ))}
          </div>
        </div>
        <div>
          <SectionLabel label="Project" />
          <div className="space-y-0.5">
            {projectItems.map(({ href, icon, label }) => (
              <NavItem key={href} href={href} icon={icon} label={label} isActive={isActive(href)} />
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
  const [open, setOpen] = useState(false);

  // Close drawer on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const isActive = (href: string) =>
    href === "/dashboard"
      ? pathname === "/dashboard"
      : pathname.startsWith(href);

  return (
    <>
      {/* ── Desktop sidebar ── */}
      <div className="hidden lg:flex w-64 border-r border-border bg-background flex-col shrink-0">
        <NavContents isActive={isActive} />
      </div>

      {/* ── Mobile top bar ── */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 h-12 border-b border-border bg-background flex items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-6 h-6 rounded-md bg-foreground flex items-center justify-center shrink-0">
            <Layers className="w-3.5 h-3.5 text-background" />
          </div>
          <span className="text-sm font-semibold text-foreground tracking-tight">WebCraft</span>
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
          <NavContents isActive={isActive} onNavigate={() => setOpen(false)} />
        </div>
      </div>
    </>
  );
}
