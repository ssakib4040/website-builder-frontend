"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileText,
  Database,
  Plug,
  Workflow,
  LayoutDashboard,
  Layers,
  ExternalLink,
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

export function DashboardNav() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/dashboard"
      ? pathname === "/dashboard"
      : pathname.startsWith(href);

  return (
    <div className="w-64 border-r border-border bg-background flex flex-col shrink-0">
      {/* ── Brand ── */}
      <div className="px-4 py-4 border-b border-border">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 rounded-lg bg-foreground flex items-center justify-center shrink-0">
            <Layers className="w-4 h-4 text-background" />
          </div>
          <div className="leading-none">
            <p className="text-sm font-semibold text-foreground tracking-tight">
              WebCraft
            </p>
            <p className="text-[10px] text-muted-foreground mt-0.5">
              No-code builder
            </p>
          </div>
        </Link>
      </div>

      {/* ── Navigation ── */}
      <nav className="flex-1 px-2 py-4 space-y-4 overflow-y-auto">
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
              />
            ))}
          </div>
        </div>
      </nav>

      {/* ── Footer ── */}
      <div className="px-3 py-3 border-t border-border space-y-1">
        <Link
          href="/builder"
          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all duration-150 group"
        >
          <ExternalLink className="w-4 h-4 shrink-0 text-muted-foreground group-hover:text-foreground transition-colors" />
          Open Builder
        </Link>
        <div className="flex items-center justify-between px-3 py-1.5">
          <span className="text-xs text-muted-foreground">Appearance</span>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
