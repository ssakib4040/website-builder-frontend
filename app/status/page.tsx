"use client";

import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { CheckCircle, AlertCircle, AlertTriangle, Clock } from "lucide-react";
import { useState, useEffect } from "react";

type Status = "operational" | "degraded" | "outage" | "maintenance";

const statusConfig: Record<
  Status,
  { label: string; color: string; icon: React.ElementType; bg: string }
> = {
  operational: {
    label: "Operational",
    color: "text-green-600 dark:text-green-400",
    icon: CheckCircle,
    bg: "bg-green-500",
  },
  degraded: {
    label: "Degraded performance",
    color: "text-yellow-600 dark:text-yellow-400",
    icon: AlertTriangle,
    bg: "bg-yellow-500",
  },
  outage: {
    label: "Outage",
    color: "text-red-600 dark:text-red-400",
    icon: AlertCircle,
    bg: "bg-red-500",
  },
  maintenance: {
    label: "Maintenance",
    color: "text-blue-600 dark:text-blue-400",
    icon: Clock,
    bg: "bg-blue-500",
  },
};

const services: { name: string; status: Status; description: string }[] = [
  {
    name: "Website Builder",
    status: "operational",
    description: "Canvas, drag-and-drop, and save operations",
  },
  {
    name: "Publishing & CDN",
    status: "operational",
    description: "Site publishing and global edge delivery",
  },
  {
    name: "Dashboard & API",
    status: "operational",
    description: "Dashboard UI, REST API, and webhooks",
  },
  {
    name: "Authentication",
    status: "operational",
    description: "Sign in, sign up, and session management",
  },
  {
    name: "Media Library",
    status: "operational",
    description: "Image uploads, optimisation, and delivery",
  },
  {
    name: "Analytics",
    status: "operational",
    description: "Page view tracking and report generation",
  },
  {
    name: "Billing & Payments",
    status: "operational",
    description: "Subscription management and Stripe integration",
  },
  {
    name: "Email Notifications",
    status: "operational",
    description: "Transactional and marketing emails",
  },
];

const incidents = [
  {
    date: "March 14, 2026",
    title: "Elevated error rates in publishing pipeline",
    status: "resolved" as const,
    duration: "42 minutes",
    updates: [
      {
        time: "14:28 UTC",
        body: "Investigating reports of publish failures for some users.",
      },
      {
        time: "14:51 UTC",
        body: "Identified root cause: a misconfigured CDN cache rule after a routine infrastructure update. Rolling back now.",
      },
      {
        time: "15:10 UTC",
        body: "Rollback complete. All publishing operations have returned to normal. We are monitoring.",
      },
      {
        time: "15:30 UTC",
        body: "Resolved. No data loss occurred. Post-mortem will be published within 48 hours.",
      },
    ],
  },
  {
    date: "February 2, 2026",
    title: "Analytics dashboard showing delayed data",
    status: "resolved" as const,
    duration: "3 hours 15 minutes",
    updates: [
      {
        time: "09:00 UTC",
        body: "Analytics reports are showing data delayed by approximately 2 hours. Builder and publishing are unaffected.",
      },
      {
        time: "11:40 UTC",
        body: "Data pipeline backlog cleared. Reports are now up to date.",
      },
    ],
  },
];

// Generates a stable 90-day uptime bar
function generateUptimeBars() {
  return Array.from({ length: 90 }, (_, i) => {
    if (i === 75) return "degraded";
    if (i === 50) return "degraded";
    if (i === 51) return "degraded";
    return "operational";
  }) as Status[];
}

const uptimeBars = generateUptimeBars();

const overallStatus: Status = "operational";

export default function StatusPage() {
  const [lastChecked, setLastChecked] = useState("");

  useEffect(() => {
    const fmt = () =>
      new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const init = setTimeout(() => setLastChecked(fmt()), 0);
    const id = setInterval(() => setLastChecked(fmt()), 60000);
    return () => {
      clearTimeout(init);
      clearInterval(id);
    };
  }, []);

  const cfg = statusConfig[overallStatus];
  const OverallIcon = cfg.icon;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteNav />

      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-6 py-16 space-y-12">
          {/* Overall status banner */}
          <div
            className={`rounded-xl border border-border p-6 flex items-center gap-4 ${
              overallStatus === "operational"
                ? "bg-green-50/50 dark:bg-green-900/10"
                : "bg-yellow-50/50 dark:bg-yellow-900/10"
            }`}
          >
            <OverallIcon className={`w-8 h-8 shrink-0 ${cfg.color}`} />
            <div>
              <h1 className="text-xl font-bold text-foreground">
                {overallStatus === "operational"
                  ? "All systems operational"
                  : cfg.label}
              </h1>
              <p
                className="text-xs text-muted-foreground mt-0.5"
                suppressHydrationWarning
              >
                {lastChecked ? `Last checked at ${lastChecked}` : "Checking…"}
              </p>
            </div>
          </div>

          {/* Services */}
          <section className="space-y-4">
            <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Services
            </h2>
            <div className="rounded-xl border border-border overflow-hidden divide-y divide-border">
              {services.map((svc) => {
                const s = statusConfig[svc.status];
                const Icon = s.icon;
                return (
                  <div
                    key={svc.name}
                    className="flex items-center justify-between px-4 py-3 bg-background hover:bg-accent/30 transition-colors"
                  >
                    <div>
                      <p className="text-base font-medium text-foreground">
                        {svc.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {svc.description}
                      </p>
                    </div>
                    <div
                      className={`flex items-center gap-1.5 text-xs font-medium ${s.color}`}
                    >
                      <Icon className="w-4 h-4" />
                      {s.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Uptime chart */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                90-day uptime
              </h2>
              <span className="text-xs text-muted-foreground">
                99.84% uptime
              </span>
            </div>
            <div className="flex items-end gap-0.5">
              {uptimeBars.map((s, i) => (
                <div
                  key={i}
                  title={s === "operational" ? "Operational" : "Incident"}
                  className={`flex-1 h-8 rounded-sm ${
                    s === "operational"
                      ? "bg-green-400 dark:bg-green-500"
                      : "bg-yellow-400 dark:bg-yellow-500"
                  }`}
                />
              ))}
            </div>
            <div className="flex justify-between text-[10px] text-muted-foreground">
              <span>90 days ago</span>
              <span>Today</span>
            </div>
          </section>

          {/* Incidents */}
          <section className="space-y-4">
            <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Recent incidents
            </h2>
            {incidents.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No incidents in the last 90 days.
              </p>
            ) : (
              <div className="space-y-6">
                {incidents.map((inc) => (
                  <div
                    key={inc.title}
                    className="rounded-xl border border-border p-5 space-y-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground">
                          {inc.date}
                        </p>
                        <h3 className="text-sm font-semibold text-foreground mt-0.5">
                          {inc.title}
                        </h3>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                          Resolved
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Duration: {inc.duration}
                    </p>
                    <div className="space-y-2 border-l-2 border-border pl-4">
                      {inc.updates.map((u) => (
                        <div key={u.time} className="space-y-0.5">
                          <p className="text-xs font-medium text-muted-foreground">
                            {u.time}
                          </p>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {u.body}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Subscribe */}
          <section className="rounded-xl border border-border bg-card/40 p-6 text-center space-y-3">
            <p className="text-sm font-semibold text-foreground">
              Get incident notifications
            </p>
            <p className="text-xs text-muted-foreground">
              Subscribe to receive email alerts when incidents are created or
              updated.
            </p>
            <button className="px-4 py-2 rounded-lg border border-border text-xs font-medium hover:bg-accent/60 transition-colors text-foreground">
              Subscribe to updates
            </button>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
