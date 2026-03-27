"use client";

import { useState } from "react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { useEditorStore } from "@/lib/builder/store";
import { useSitesStore, PLAN_LIMITS } from "@/lib/sites-store";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Database,
  Plug,
  Workflow,
  CheckCircle2,
  Circle,
  ExternalLink,
  Eye,
  Rocket,
  Plus,
  Pencil,
  Globe,
  ChevronRight,
  Layers,
  Clock,
  ArrowRight,
  Cpu,
  MemoryStick,
  Wifi,
  HardDrive,
  MousePointerClick,
  TrendingUp,
  Zap,
} from "lucide-react";
import Link from "next/link";

type DeployStatus = "draft" | "deploying" | "live";

export default function DashboardPage() {
  const { pages, collections, endpoints, workflows } = useEditorStore();
  const { sites, currentSiteId } = useSitesStore();
  const currentSite = sites.find((s) => s.id === currentSiteId) ?? sites[0];
  const [deployStatus, setDeployStatus] = useState<DeployStatus>(
    currentSite?.status === "live" ? "live" : "draft",
  );

  const userPages = pages.filter((p) => !p.isSystem);

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

  const checklist = [
    {
      label: "Create your first page",
      done: userPages.length > 0,
      href: "/dashboard/pages",
    },
    {
      label: "Set up a data collection",
      done: collections.length > 0,
      href: "/dashboard/data",
    },
    {
      label: "Define an API endpoint",
      done: endpoints.length > 0,
      href: "/dashboard/api",
    },
    {
      label: "Build a workflow",
      done: workflows.length > 0,
      href: "/dashboard/logic",
    },
    {
      label: "Publish your site",
      done: deployStatus === "live",
      href: undefined,
    },
  ];
  const checklistDone = checklist.filter((c) => c.done).length;
  const checklistPct = Math.round((checklistDone / checklist.length) * 100);

  function handleDeploy() {
    if (deployStatus === "live") return;
    setDeployStatus("deploying");
    setTimeout(() => setDeployStatus("live"), 2200);
  }

  const quickActions = [
    {
      label: "New Page",
      description: "Add a page to your site",
      icon: FileText,
      href: "/dashboard/pages",
    },
    {
      label: "New Collection",
      description: "Create a data model",
      icon: Database,
      href: "/dashboard/data",
    },
    {
      label: "New API Endpoint",
      description: "Define a REST endpoint",
      icon: Plug,
      href: "/dashboard/api",
    },
    {
      label: "New Workflow",
      description: "Automate an action",
      icon: Workflow,
      href: "/dashboard/logic",
    },
    {
      label: "Open Visual Builder",
      description: "Drag-and-drop editor",
      icon: Layers,
      href: "/builder",
    },
    {
      label: "Preview Site",
      description: "See the live preview",
      icon: Eye,
      href: "/preview",
    },
  ];

  return (
    <DashboardShell>
      {/* ── Header ── */}
      <div className="px-6 py-4 border-b border-border flex items-center justify-between gap-4 shrink-0">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold text-foreground">Dashboard</h1>
            <span
              className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full uppercase tracking-wide ${
                deployStatus === "live"
                  ? "bg-emerald-500/15 text-emerald-500"
                  : "bg-accent text-muted-foreground"
              }`}
            >
              {deployStatus === "live"
                ? "Live"
                : deployStatus === "deploying"
                  ? "Deploying…"
                  : "Draft"}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-0.5">
            {currentSite?.name ?? "Untitled Site"} ·{" "}
            <span className="font-mono text-xs">
              {currentSite?.customDomain ?? currentSite?.subdomain ?? ""}
            </span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-xs gap-1.5"
            asChild
          >
            <Link href="/preview">
              <Eye className="w-3.5 h-3.5" />
              Preview
            </Link>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-xs gap-1.5"
            asChild
          >
            <Link href="/builder">
              <ExternalLink className="w-3.5 h-3.5" />
              Open Builder
            </Link>
          </Button>
          <Button
            size="sm"
            className="h-8 text-xs gap-1.5"
            onClick={handleDeploy}
            disabled={deployStatus === "deploying" || deployStatus === "live"}
          >
            <Rocket className="w-3.5 h-3.5" />
            {deployStatus === "live"
              ? "Published"
              : deployStatus === "deploying"
                ? "Publishing…"
                : "Publish"}
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="p-6 space-y-6">
          {/* ── Stats ── */}
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

          {/* ── Two-column body ── */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            {/* LEFT col */}
            <div className="lg:col-span-3 space-y-4">
              {/* Getting Started */}
              <div className="rounded-xl border border-border bg-card overflow-hidden">
                <div className="px-5 py-4 border-b border-border flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-semibold text-foreground">
                      Getting Started
                    </h2>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {checklistDone} of {checklist.length} steps complete
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-foreground">
                    {checklistPct}%
                  </span>
                </div>
                <div className="h-1 bg-accent">
                  <div
                    className="h-full bg-foreground transition-all duration-500"
                    style={{ width: `${checklistPct}%` }}
                  />
                </div>
                <ul className="divide-y divide-border">
                  {checklist.map(({ label, done, href }) => {
                    const row = (
                      <li
                        key={label}
                        className={`flex items-center gap-3 px-5 py-3 text-sm transition-colors ${
                          !done && href
                            ? "hover:bg-accent/30 cursor-pointer"
                            : ""
                        }`}
                      >
                        {done ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        ) : (
                          <Circle className="w-4 h-4 text-muted-foreground shrink-0" />
                        )}
                        <span
                          className={
                            done
                              ? "line-through text-muted-foreground"
                              : "text-foreground"
                          }
                        >
                          {label}
                        </span>
                        {!done && href && (
                          <ChevronRight className="w-3.5 h-3.5 text-muted-foreground ml-auto" />
                        )}
                      </li>
                    );
                    return href && !done ? (
                      <Link key={label} href={href} className="block">
                        {row}
                      </Link>
                    ) : (
                      row
                    );
                  })}
                </ul>
              </div>

              {/* Recent Pages */}
              <div className="rounded-xl border border-border bg-card overflow-hidden">
                <div className="px-5 py-4 border-b border-border flex items-center justify-between">
                  <h2 className="text-sm font-semibold text-foreground">
                    Pages
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 text-xs gap-1 text-muted-foreground"
                    asChild
                  >
                    <Link href="/dashboard/pages">
                      <Plus className="w-3.5 h-3.5" />
                      New page
                    </Link>
                  </Button>
                </div>
                {pages.length === 0 ? (
                  <div className="px-5 py-8 text-center text-sm text-muted-foreground">
                    No pages yet.{" "}
                    <Link
                      href="/dashboard/pages"
                      className="underline text-foreground"
                    >
                      Create one
                    </Link>
                  </div>
                ) : (
                  <ul className="divide-y divide-border">
                    {pages.map((page) => (
                      <li
                        key={page.id}
                        className="flex items-center gap-3 px-5 py-3 group hover:bg-accent/30 transition-colors"
                      >
                        {page.isSystem ? (
                          <Clock className="w-4 h-4 text-muted-foreground shrink-0" />
                        ) : (
                          <FileText className="w-4 h-4 text-muted-foreground shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">
                            {page.name}
                          </p>
                          <p className="text-xs text-muted-foreground font-mono">
                            {page.route}
                          </p>
                        </div>
                        {page.isSystem && (
                          <span className="text-[10px] bg-accent text-muted-foreground px-1.5 py-0.5 rounded shrink-0">
                            System
                          </span>
                        )}
                        <Link
                          href={`/builder?page=${page.id}`}
                          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-all shrink-0"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                          Edit
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="px-5 py-3 border-t border-border">
                  <Link
                    href="/dashboard/pages"
                    className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
                  >
                    View all pages
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>

            {/* RIGHT col */}
            <div className="lg:col-span-2 space-y-4">
              {/* Quick Actions */}
              <div className="rounded-xl border border-border bg-card overflow-hidden">
                <div className="px-5 py-4 border-b border-border">
                  <h2 className="text-sm font-semibold text-foreground">
                    Quick Actions
                  </h2>
                </div>
                <ul className="divide-y divide-border">
                  {quickActions.map(
                    ({ label, description, icon: Icon, href }) => (
                      <li key={label}>
                        <Link
                          href={href}
                          className="flex items-center gap-3 px-5 py-3 hover:bg-accent/30 transition-colors group"
                        >
                          <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center shrink-0">
                            <Icon className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground">
                              {label}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {description}
                            </p>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all shrink-0" />
                        </Link>
                      </li>
                    ),
                  )}
                </ul>
              </div>

              {/* Publish */}
              <div className="rounded-xl border border-border bg-card overflow-hidden">
                <div className="px-5 py-4 border-b border-border">
                  <h2 className="text-sm font-semibold text-foreground">
                    Deployment
                  </h2>
                </div>
                <div className="px-5 py-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-muted-foreground shrink-0" />
                    <span className="text-sm font-mono text-foreground flex-1 truncate">
                      {currentSite?.customDomain ??
                        currentSite?.subdomain ??
                        ""}
                    </span>
                    <span
                      className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full uppercase tracking-wide ${
                        deployStatus === "live"
                          ? "bg-emerald-500/15 text-emerald-500"
                          : "bg-accent text-muted-foreground"
                      }`}
                    >
                      {deployStatus === "live"
                        ? "Live"
                        : deployStatus === "deploying"
                          ? "Deploying"
                          : "Draft"}
                    </span>
                  </div>
                  {deployStatus === "live" && (
                    <p className="text-xs text-muted-foreground">
                      Last deployed just now
                    </p>
                  )}
                  <Button
                    size="sm"
                    className="w-full h-8 text-xs gap-1.5"
                    onClick={handleDeploy}
                    disabled={
                      deployStatus === "deploying" || deployStatus === "live"
                    }
                    variant={deployStatus === "live" ? "outline" : "default"}
                  >
                    <Rocket className="w-3.5 h-3.5" />
                    {deployStatus === "live"
                      ? "Published"
                      : deployStatus === "deploying"
                        ? "Publishing…"
                        : "Publish to Web"}
                  </Button>
                </div>
              </div>

              {/* Resource Usage */}
              <div className="rounded-xl border border-border bg-card overflow-hidden">
                <div className="px-5 py-4 border-b border-border flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-semibold text-foreground">
                      Resource Usage
                    </h2>
                    <p className="text-xs text-muted-foreground mt-0.5 capitalize">
                      {currentSite?.plan ?? "hobby"} plan
                    </p>
                  </div>
                  {currentSite && currentSite.plan !== "team" && (
                    <Link
                      href={`/dashboard/settings?tab=billing&site=${currentSiteId}`}
                      className="text-xs font-medium text-foreground bg-accent hover:bg-accent/80 px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1"
                    >
                      <Zap className="w-3 h-3" />
                      Upgrade
                    </Link>
                  )}
                </div>
                <div className="px-5 py-4 space-y-4">
                  {(() => {
                    const plan = currentSite?.plan ?? "hobby";
                    const limits = PLAN_LIMITS[plan];
                    const cpu = currentSite?.cpuUsage ?? 0;
                    const ram = currentSite?.ramUsedMB ?? 0;
                    const bw = currentSite?.bandwidthUsedGB ?? 0;
                    const storage = currentSite?.storageUsedGB ?? 0;
                    const reqs = currentSite?.requestsThisMonth ?? 0;

                    function barColor(pct: number) {
                      if (pct >= 90) return "bg-red-500";
                      if (pct >= 70) return "bg-orange-500";
                      return "bg-foreground";
                    }
                    function fmtRam(mb: number) {
                      return mb >= 1024
                        ? `${(mb / 1024).toFixed(1)} GB`
                        : `${mb} MB`;
                    }
                    function fmtReqs(n: number) {
                      return n >= 1_000_000
                        ? `${(n / 1_000_000).toFixed(1)}M`
                        : n >= 1000
                          ? `${(n / 1000).toFixed(0)}k`
                          : String(n);
                    }

                    const rows = [
                      {
                        icon: Cpu,
                        label: "CPU",
                        pct: cpu,
                        used: `${cpu}%`,
                        total: `${limits.cpuVCores} vCPU`,
                      },
                      {
                        icon: MemoryStick,
                        label: "RAM",
                        pct: Math.round((ram / limits.ramMB) * 100),
                        used: fmtRam(ram),
                        total: fmtRam(limits.ramMB),
                      },
                      {
                        icon: Wifi,
                        label: "Bandwidth",
                        pct: Math.round((bw / limits.bandwidthGB) * 100),
                        used: `${bw} GB`,
                        total: `${limits.bandwidthGB} GB`,
                      },
                      {
                        icon: HardDrive,
                        label: "Storage",
                        pct: Math.round((storage / limits.storageGB) * 100),
                        used: `${storage} GB`,
                        total: `${limits.storageGB} GB`,
                      },
                    ];

                    const reqPct = Math.round(
                      (reqs / limits.requestsPerMonth) * 100,
                    );

                    return (
                      <>
                        {rows.map(({ icon: Icon, label, pct, used, total }) => (
                          <div key={label}>
                            <div className="flex items-center justify-between mb-1.5">
                              <div className="flex items-center gap-1.5">
                                <Icon className="w-3.5 h-3.5 text-muted-foreground" />
                                <span className="text-xs font-medium text-foreground">
                                  {label}
                                </span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <span
                                  className={`text-xs font-semibold ${
                                    pct >= 90
                                      ? "text-red-500"
                                      : pct >= 70
                                        ? "text-orange-500"
                                        : "text-foreground"
                                  }`}
                                >
                                  {used}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  / {total}
                                </span>
                              </div>
                            </div>
                            <div className="h-1.5 rounded-full bg-accent overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all duration-500 ${barColor(pct)}`}
                                style={{ width: `${Math.min(pct, 100)}%` }}
                              />
                            </div>
                          </div>
                        ))}

                        {/* Requests */}
                        <div className="pt-1 border-t border-border flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <MousePointerClick className="w-3.5 h-3.5 text-muted-foreground" />
                            <span className="text-xs font-medium text-foreground">
                              Requests
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span
                              className={`text-xs font-semibold ${
                                reqPct >= 90
                                  ? "text-red-500"
                                  : reqPct >= 70
                                    ? "text-orange-500"
                                    : "text-foreground"
                              }`}
                            >
                              {fmtReqs(reqs)}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              / {fmtReqs(limits.requestsPerMonth)} mo
                            </span>
                          </div>
                        </div>

                        {/* Upgrade nudge */}
                        {(cpu >= 70 ||
                          Math.round((ram / limits.ramMB) * 100) >= 70) && (
                          <div className="rounded-lg bg-orange-500/10 border border-orange-500/20 px-3 py-2.5 flex items-start gap-2">
                            <TrendingUp className="w-3.5 h-3.5 text-orange-500 mt-0.5 shrink-0" />
                            <div>
                              <p className="text-xs font-medium text-orange-500">
                                High resource usage detected
                              </p>
                              <p className="text-xs text-muted-foreground mt-0.5">
                                Upgrade your plan for more CPU and RAM headroom.
                              </p>
                            </div>
                          </div>
                        )}
                      </>
                    );
                  })()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
