"use client";

import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { useEditorStore } from "@/lib/builder/store";
import { FileText, Database, Plug, Workflow } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const { pages, collections, endpoints, workflows } = useEditorStore();

  const stats = [
    {
      label: "Pages",
      value: pages.length,
      icon: FileText,
      href: "/dashboard/pages",
    },
    {
      label: "Collections",
      value: collections.length,
      icon: Database,
      href: "/dashboard/data",
    },
    {
      label: "API Endpoints",
      value: endpoints.length,
      icon: Plug,
      href: "/dashboard/api",
    },
    {
      label: "Workflows",
      value: workflows.length,
      icon: Workflow,
      href: "/dashboard/logic",
    },
  ];

  return (
    <DashboardShell>
      <div className="px-6 py-5 border-b border-border">
        <h1 className="text-lg font-semibold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Manage your website pages, data, APIs, and logic.
        </p>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="p-6 max-w-4xl">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {stats.map(({ label, value, icon: Icon, href }) => (
              <Link
                key={label}
                href={href}
                className="group p-4 rounded-xl border border-border bg-card hover:bg-accent/40 transition-colors duration-150"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                  <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                    {label}
                  </span>
                </div>
                <p className="text-2xl font-bold text-foreground">{value}</p>
              </Link>
            ))}
          </div>

          {/* Quick actions */}
          <div className="mt-8">
            <h2 className="text-sm font-medium text-foreground mb-3">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <Link
                href="/dashboard/pages"
                className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-accent/40 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                  <FileText className="w-4 h-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Create a new page
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Add and design pages with the visual builder
                  </p>
                </div>
              </Link>
              <Link
                href="/dashboard/data"
                className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-accent/40 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                  <Database className="w-4 h-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Define a collection
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Create data models and manage records
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
