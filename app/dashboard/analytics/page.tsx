"use client";

import { useState } from "react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import {
  Users,
  Eye,
  MousePointerClick,
  Clock,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
} from "lucide-react";

type DateRange = "7d" | "30d" | "90d";

interface MetricCard {
  label: string;
  value: string;
  change: number;
  icon: typeof Users;
}

interface TopPage {
  path: string;
  views: number;
  visitors: number;
  bounce: string;
}

interface TrafficSource {
  source: string;
  sessions: number;
  pct: number;
}

const dataByRange: Record<
  DateRange,
  {
    metrics: MetricCard[];
    topPages: TopPage[];
    sources: TrafficSource[];
    chartData: number[];
  }
> = {
  "7d": {
    metrics: [
      { label: "Page Views", value: "14,820", change: 12.4, icon: Eye },
      { label: "Unique Visitors", value: "4,103", change: 8.7, icon: Users },
      {
        label: "Bounce Rate",
        value: "42.3%",
        change: -3.1,
        icon: MousePointerClick,
      },
      { label: "Avg. Session", value: "2m 18s", change: 5.2, icon: Clock },
    ],
    topPages: [
      { path: "/", views: 3420, visitors: 2181, bounce: "38%" },
      { path: "/pricing", views: 2108, visitors: 1540, bounce: "51%" },
      {
        path: "/blog/getting-started",
        views: 1876,
        visitors: 1334,
        bounce: "29%",
      },
      { path: "/features", views: 1654, visitors: 1220, bounce: "44%" },
      { path: "/docs", views: 982, visitors: 801, bounce: "23%" },
    ],
    sources: [
      { source: "Organic Search", sessions: 5810, pct: 39 },
      { source: "Direct", sessions: 3820, pct: 26 },
      { source: "Referral", sessions: 2650, pct: 18 },
      { source: "Social", sessions: 1620, pct: 11 },
      { source: "Email", sessions: 920, pct: 6 },
    ],
    chartData: [820, 1240, 1100, 1560, 2200, 1980, 1920],
  },
  "30d": {
    metrics: [
      { label: "Page Views", value: "58,402", change: 22.1, icon: Eye },
      { label: "Unique Visitors", value: "17,812", change: 18.3, icon: Users },
      {
        label: "Bounce Rate",
        value: "40.8%",
        change: -5.4,
        icon: MousePointerClick,
      },
      { label: "Avg. Session", value: "2m 34s", change: 9.7, icon: Clock },
    ],
    topPages: [
      { path: "/", views: 14200, visitors: 9840, bounce: "36%" },
      { path: "/pricing", views: 8900, visitors: 6210, bounce: "49%" },
      {
        path: "/blog/getting-started",
        views: 7600,
        visitors: 5320,
        bounce: "27%",
      },
      { path: "/features", views: 6800, visitors: 4900, bounce: "42%" },
      { path: "/docs", views: 4200, visitors: 3100, bounce: "21%" },
    ],
    sources: [
      { source: "Organic Search", sessions: 22700, pct: 39 },
      { source: "Direct", sessions: 15200, pct: 26 },
      { source: "Referral", sessions: 10500, pct: 18 },
      { source: "Social", sessions: 6400, pct: 11 },
      { source: "Email", sessions: 3612, pct: 6 },
    ],
    chartData: [
      1400, 1800, 1600, 2400, 2100, 1900, 2800, 3100, 2600, 2900, 3400, 2800,
      3200, 3000, 2700, 3500, 3800, 3200, 2900, 3400, 4100, 3800, 3600, 4200,
      3900, 4400, 4000, 3800, 4600, 4200,
    ],
  },
  "90d": {
    metrics: [
      { label: "Page Views", value: "184,201", change: 41.5, icon: Eye },
      { label: "Unique Visitors", value: "52,400", change: 35.8, icon: Users },
      {
        label: "Bounce Rate",
        value: "39.2%",
        change: -8.9,
        icon: MousePointerClick,
      },
      { label: "Avg. Session", value: "2m 51s", change: 14.3, icon: Clock },
    ],
    topPages: [
      { path: "/", views: 43800, visitors: 29400, bounce: "34%" },
      { path: "/pricing", views: 26900, visitors: 18200, bounce: "46%" },
      {
        path: "/blog/getting-started",
        views: 22100,
        visitors: 15400,
        bounce: "25%",
      },
      { path: "/features", views: 19800, visitors: 14100, bounce: "40%" },
      { path: "/docs", views: 12200, visitors: 9100, bounce: "19%" },
    ],
    sources: [
      { source: "Organic Search", sessions: 71900, pct: 39 },
      { source: "Direct", sessions: 47900, pct: 26 },
      { source: "Referral", sessions: 33100, pct: 18 },
      { source: "Social", sessions: 20300, pct: 11 },
      { source: "Email", sessions: 11200, pct: 6 },
    ],
    chartData: [
      3000, 3400, 2800, 4200, 3800, 3600, 4800, 5200, 4900, 5400, 6100, 5800,
      5200, 6400, 6800, 6200, 5900, 7100, 7400, 6900, 6500, 7800, 8200, 7600,
      7200, 8600, 9100, 8400, 8000, 9400,
    ],
  },
};

const deviceData = [
  { device: "Desktop", pct: 62, icon: Monitor },
  { device: "Mobile", pct: 31, icon: Smartphone },
  { device: "Tablet", pct: 7, icon: Tablet },
];

export default function AnalyticsPage() {
  const [range, setRange] = useState<DateRange>("30d");
  const data = dataByRange[range];
  const maxChart = Math.max(...data.chartData);

  return (
    <DashboardShell>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="border-b border-border px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-foreground">Analytics</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Traffic, engagement, and visitor insights
            </p>
          </div>
          {/* Date range selector */}
          <div className="flex items-center gap-1 border border-border rounded-lg p-0.5">
            {(["7d", "30d", "90d"] as DateRange[]).map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                  range === r
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {r === "7d" ? "7 days" : r === "30d" ? "30 days" : "90 days"}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-auto p-6 space-y-6">
          {/* Metric cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {data.metrics.map((m) => {
              const Icon = m.icon;
              const positive = m.change >= 0;
              return (
                <div
                  key={m.label}
                  className="border border-border rounded-xl p-4 bg-card"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      {m.label}
                    </span>
                    <Icon className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="text-2xl font-bold text-foreground tabular-nums">
                    {m.value}
                  </div>
                  <div
                    className={`flex items-center gap-1 mt-1.5 text-xs font-medium ${positive ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}
                  >
                    {positive ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingDown className="w-3 h-3" />
                    )}
                    {positive ? "+" : ""}
                    {m.change}% vs prior period
                  </div>
                </div>
              );
            })}
          </div>

          {/* Chart */}
          <div className="border border-border rounded-xl p-5 bg-card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-foreground">
                Page Views
              </h2>
              <span className="text-xs text-muted-foreground">
                Last{" "}
                {range === "7d"
                  ? "7 days"
                  : range === "30d"
                    ? "30 days"
                    : "90 days"}
              </span>
            </div>
            <div className="flex items-end gap-1 h-36">
              {data.chartData.map((v, i) => (
                <div
                  key={i}
                  className="flex-1 bg-foreground/80 hover:bg-foreground rounded-sm transition-all cursor-default group relative"
                  style={{ height: `${(v / maxChart) * 100}%`, minWidth: 0 }}
                  title={v.toLocaleString()}
                >
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-foreground text-background text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                    {v.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom two columns */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Top pages */}
            <div className="lg:col-span-2 border border-border rounded-xl bg-card overflow-hidden">
              <div className="px-5 py-3.5 border-b border-border">
                <h2 className="text-sm font-semibold text-foreground">
                  Top Pages
                </h2>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left px-5 py-2.5 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      Path
                    </th>
                    <th className="text-right px-5 py-2.5 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      Views
                    </th>
                    <th className="text-right px-5 py-2.5 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      Visitors
                    </th>
                    <th className="text-right px-5 py-2.5 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      Bounce
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.topPages.map((page) => (
                    <tr
                      key={page.path}
                      className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
                    >
                      <td className="px-5 py-3 font-mono text-foreground text-sm">
                        <div className="flex items-center gap-1.5">
                          <Globe className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                          {page.path}
                        </div>
                      </td>
                      <td className="px-5 py-3 text-right tabular-nums text-foreground">
                        {page.views.toLocaleString()}
                      </td>
                      <td className="px-5 py-3 text-right tabular-nums text-muted-foreground">
                        {page.visitors.toLocaleString()}
                      </td>
                      <td className="px-5 py-3 text-right tabular-nums text-muted-foreground">
                        {page.bounce}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Right column */}
            <div className="space-y-4">
              {/* Traffic sources */}
              <div className="border border-border rounded-xl bg-card overflow-hidden">
                <div className="px-5 py-3.5 border-b border-border">
                  <h2 className="text-sm font-semibold text-foreground">
                    Traffic Sources
                  </h2>
                </div>
                <div className="p-5 space-y-3">
                  {data.sources.map((s) => (
                    <div key={s.source}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-foreground font-medium">
                          {s.source}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground tabular-nums">
                            {s.sessions.toLocaleString()}
                          </span>
                          <span className="text-xs font-semibold text-foreground w-8 text-right">
                            {s.pct}%
                          </span>
                        </div>
                      </div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-foreground rounded-full"
                          style={{ width: `${s.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Devices */}
              <div className="border border-border rounded-xl bg-card overflow-hidden">
                <div className="px-5 py-3.5 border-b border-border">
                  <h2 className="text-sm font-semibold text-foreground">
                    Devices
                  </h2>
                </div>
                <div className="p-5 space-y-3">
                  {deviceData.map(({ device, pct, icon: DevIcon }) => (
                    <div key={device} className="flex items-center gap-3">
                      <DevIcon className="w-4 h-4 text-muted-foreground shrink-0" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-foreground">
                            {device}
                          </span>
                          <span className="text-xs font-semibold text-foreground">
                            {pct}%
                          </span>
                        </div>
                        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-foreground/70 rounded-full"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="border border-dashed border-border rounded-xl p-5 flex items-center justify-between bg-muted/20">
            <div>
              <p className="text-sm font-medium text-foreground">
                Connect Google Analytics
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Import richer analytics data including goals, funnels, and
                eCommerce tracking
              </p>
            </div>
            <a
              href="/dashboard/settings"
              className="flex items-center gap-1.5 text-sm font-medium text-foreground hover:underline"
            >
              Configure <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
