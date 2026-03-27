"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileText,
  Database,
  Plug,
  Workflow,
  Settings,
  LayoutDashboard,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ThemeToggle } from "@/components/ThemeToggle";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Overview" },
  { href: "/dashboard/pages", icon: FileText, label: "Pages" },
  { href: "/dashboard/data", icon: Database, label: "Data" },
  { href: "/dashboard/api", icon: Plug, label: "APIs" },
  { href: "/dashboard/logic", icon: Workflow, label: "Logic" },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <div className="w-14 border-r border-border bg-background flex flex-col items-center py-3 gap-1 shrink-0">
      {/* Logo / Home */}
      <Link
        href="/"
        className="w-9 h-9 rounded-lg flex items-center justify-center text-foreground mb-3 hover:bg-accent/50 transition-colors"
      >
        <Settings className="w-4.5 h-4.5" />
      </Link>

      <div className="w-6 border-t border-border mb-2" />

      {navItems.map(({ href, icon: Icon, label }) => {
        const isActive =
          href === "/dashboard"
            ? pathname === "/dashboard"
            : pathname.startsWith(href);

        return (
          <Tooltip key={href}>
            <TooltipTrigger asChild>
              <Link
                href={href}
                className={`
                  w-9 h-9 rounded-lg flex items-center justify-center
                  transition-all duration-150
                  ${
                    isActive
                      ? "bg-accent text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  }
                `}
              >
                <Icon className="w-4.5 h-4.5" />
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" className="text-xs">
              {label}
            </TooltipContent>
          </Tooltip>
        );
      })}

      <div className="mt-auto mb-1">
        <ThemeToggle />
      </div>
    </div>
  );
}
