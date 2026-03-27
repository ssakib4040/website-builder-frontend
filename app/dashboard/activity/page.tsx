"use client";

import { useState } from "react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FileText,
  Rocket,
  Globe,
  Users,
  Settings,
  Database,
  Image,
  Plug,
  Search,
  Activity,
} from "lucide-react";

type ActionCategory =
  | "All"
  | "Deployment"
  | "Content"
  | "Settings"
  | "Team"
  | "Domain"
  | "Data"
  | "Media"
  | "API";

interface ActivityEvent {
  id: string;
  category: ActionCategory;
  action: string;
  detail: string;
  user: string;
  userInitials: string;
  userColor: string;
  timestamp: string;
  timestampFull: string;
}

const mockEvents: ActivityEvent[] = [
  {
    id: "1",
    category: "Deployment",
    action: "Deployed to production",
    detail: "main @ a3f2c8d · 1m 42s",
    user: "Sarah Chen",
    userInitials: "SC",
    userColor: "bg-violet-500",
    timestamp: "10 min ago",
    timestampFull: "Dec 15, 2024 at 3:24 PM",
  },
  {
    id: "2",
    category: "Content",
    action: "Published page",
    detail: "/pricing redesign — new layout with pricing tiers",
    user: "Sarah Chen",
    userInitials: "SC",
    userColor: "bg-violet-500",
    timestamp: "42 min ago",
    timestampFull: "Dec 15, 2024 at 2:52 PM",
  },
  {
    id: "3",
    category: "Team",
    action: "Invited team member",
    detail: "james@newstartup.io · Editor role",
    user: "Alex Park",
    userInitials: "AP",
    userColor: "bg-blue-500",
    timestamp: "2 hours ago",
    timestampFull: "Dec 15, 2024 at 1:30 PM",
  },
  {
    id: "4",
    category: "Data",
    action: "Updated collection schema",
    detail: "Products — added price_eur field",
    user: "Maya Torres",
    userInitials: "MT",
    userColor: "bg-emerald-500",
    timestamp: "3 hours ago",
    timestampFull: "Dec 15, 2024 at 12:18 PM",
  },
  {
    id: "5",
    category: "Media",
    action: "Uploaded 6 files",
    detail: "hero-banner.png, team-photo.jpg +4 more",
    user: "Sarah Chen",
    userInitials: "SC",
    userColor: "bg-violet-500",
    timestamp: "5 hours ago",
    timestampFull: "Dec 15, 2024 at 10:05 AM",
  },
  {
    id: "6",
    category: "Settings",
    action: "Updated site name",
    detail: '"My Site" → "WebCraft Demo"',
    user: "Alex Park",
    userInitials: "AP",
    userColor: "bg-blue-500",
    timestamp: "Yesterday",
    timestampFull: "Dec 14, 2024 at 4:32 PM",
  },
  {
    id: "7",
    category: "Deployment",
    action: "Deployment failed",
    detail: "feat/mobile-nav @ c4d8e2b · Module not found error",
    user: "Maya Torres",
    userInitials: "MT",
    userColor: "bg-emerald-500",
    timestamp: "Yesterday",
    timestampFull: "Dec 14, 2024 at 3:14 PM",
  },
  {
    id: "8",
    category: "Domain",
    action: "Added custom domain",
    detail: "mysite.app — Pending DNS verification",
    user: "Alex Park",
    userInitials: "AP",
    userColor: "bg-blue-500",
    timestamp: "2 days ago",
    timestampFull: "Dec 13, 2024 at 11:20 AM",
  },
  {
    id: "9",
    category: "API",
    action: "Created API endpoint",
    detail: "POST /api/contact-form-webhook",
    user: "Sarah Chen",
    userInitials: "SC",
    userColor: "bg-violet-500",
    timestamp: "2 days ago",
    timestampFull: "Dec 13, 2024 at 10:05 AM",
  },
  {
    id: "10",
    category: "Settings",
    action: "Updated environment variable",
    detail: "STRIPE_SECRET_KEY · Production",
    user: "Sarah Chen",
    userInitials: "SC",
    userColor: "bg-violet-500",
    timestamp: "3 days ago",
    timestampFull: "Dec 12, 2024 at 2:44 PM",
  },
  {
    id: "11",
    category: "Team",
    action: "Changed member role",
    detail: "David Kim · Viewer → Editor",
    user: "Alex Park",
    userInitials: "AP",
    userColor: "bg-blue-500",
    timestamp: "4 days ago",
    timestampFull: "Dec 11, 2024 at 9:32 AM",
  },
  {
    id: "12",
    category: "Content",
    action: "Deleted page",
    detail: "/old-landing — removed from sitemap",
    user: "Maya Torres",
    userInitials: "MT",
    userColor: "bg-emerald-500",
    timestamp: "5 days ago",
    timestampFull: "Dec 10, 2024 at 3:18 PM",
  },
  {
    id: "13",
    category: "Deployment",
    action: "Deployed to production",
    detail: "main @ e5b7d8c · 1m 55s",
    user: "Alex Park",
    userInitials: "AP",
    userColor: "bg-blue-500",
    timestamp: "5 days ago",
    timestampFull: "Dec 10, 2024 at 4:15 PM",
  },
  {
    id: "14",
    category: "Data",
    action: "Imported data",
    detail: "Blog Posts — 24 entries from CSV",
    user: "Sarah Chen",
    userInitials: "SC",
    userColor: "bg-violet-500",
    timestamp: "1 week ago",
    timestampFull: "Dec 8, 2024 at 11:02 AM",
  },
  {
    id: "15",
    category: "Media",
    action: "Deleted file",
    detail: "old-hero.jpg (1.4 MB)",
    user: "Alex Park",
    userInitials: "AP",
    userColor: "bg-blue-500",
    timestamp: "1 week ago",
    timestampFull: "Dec 7, 2024 at 2:30 PM",
  },
];

const categoryConfig: Record<
  Exclude<ActionCategory, "All">,
  { icon: typeof Activity; color: string; badgeClass: string }
> = {
  Deployment: {
    icon: Rocket,
    color: "text-blue-500",
    badgeClass:
      "bg-blue-500/10 text-blue-600 border-blue-500/20 dark:text-blue-400",
  },
  Content: {
    icon: FileText,
    color: "text-violet-500",
    badgeClass:
      "bg-violet-500/10 text-violet-600 border-violet-500/20 dark:text-violet-400",
  },
  Settings: {
    icon: Settings,
    color: "text-amber-500",
    badgeClass:
      "bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-400",
  },
  Team: {
    icon: Users,
    color: "text-emerald-500",
    badgeClass:
      "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400",
  },
  Domain: {
    icon: Globe,
    color: "text-cyan-500",
    badgeClass:
      "bg-cyan-500/10 text-cyan-600 border-cyan-500/20 dark:text-cyan-400",
  },
  Data: {
    icon: Database,
    color: "text-orange-500",
    badgeClass:
      "bg-orange-500/10 text-orange-600 border-orange-500/20 dark:text-orange-400",
  },
  Media: {
    icon: Image,
    color: "text-pink-500",
    badgeClass:
      "bg-pink-500/10 text-pink-600 border-pink-500/20 dark:text-pink-400",
  },
  API: {
    icon: Plug,
    color: "text-indigo-500",
    badgeClass:
      "bg-indigo-500/10 text-indigo-600 border-indigo-500/20 dark:text-indigo-400",
  },
};

const uniqueUsers = Array.from(new Set(mockEvents.map((e) => e.user)));

export default function ActivityPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<ActionCategory>("All");
  const [userFilter, setUserFilter] = useState<string>("All");

  const filtered = mockEvents.filter((e) => {
    const matchCat = category === "All" || e.category === category;
    const matchUser = userFilter === "All" || e.user === userFilter;
    const matchSearch =
      e.action.toLowerCase().includes(search.toLowerCase()) ||
      e.detail.toLowerCase().includes(search.toLowerCase()) ||
      e.user.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchUser && matchSearch;
  });

  // Group by date token (timestamp starts with "Today", "Yesterday", or "X days ago")
  const groups: Array<{ label: string; events: ActivityEvent[] }> = [];
  let currentLabel = "";
  for (const event of filtered) {
    const groupLabel =
      event.timestamp.includes("min") || event.timestamp.includes("hour")
        ? "Today"
        : event.timestamp === "Yesterday"
          ? "Yesterday"
          : event.timestamp;
    if (groupLabel !== currentLabel) {
      currentLabel = groupLabel;
      groups.push({ label: currentLabel, events: [event] });
    } else {
      groups[groups.length - 1].events.push(event);
    }
  }

  return (
    <DashboardShell>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="border-b border-border px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-foreground">Activity</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Audit log of all actions across your project
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="border-b border-border px-6 py-3 flex items-center gap-3 flex-wrap">
          <div className="relative w-56">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search activity…"
              className="pl-9 h-8 text-sm"
            />
          </div>

          <Select
            value={category}
            onValueChange={(v) => setCategory(v as ActionCategory)}
          >
            <SelectTrigger className="h-8 w-36 text-sm">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All categories</SelectItem>
              {(
                Object.keys(categoryConfig) as Exclude<ActionCategory, "All">[]
              ).map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={userFilter} onValueChange={setUserFilter}>
            <SelectTrigger className="h-8 w-36 text-sm">
              <SelectValue placeholder="User" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All users</SelectItem>
              {uniqueUsers.map((u) => (
                <SelectItem key={u} value={u}>
                  {u}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {(search || category !== "All" || userFilter !== "All") && (
            <button
              className="text-xs text-muted-foreground hover:text-foreground transition-colors ml-auto"
              onClick={() => {
                setSearch("");
                setCategory("All");
                setUserFilter("All");
              }}
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Timeline */}
        <div className="flex-1 overflow-auto p-6">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <Activity className="w-10 h-10 text-muted-foreground/40 mb-3" />
              <p className="text-sm font-medium text-muted-foreground">
                No activity found
              </p>
              <p className="text-xs text-muted-foreground/60 mt-1">
                Try adjusting your search or filters
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {groups.map((group) => (
                <div key={group.label}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                      {group.label}
                    </span>
                    <div className="flex-1 h-px bg-border" />
                  </div>
                  <div className="relative pl-5">
                    {/* Vertical line */}
                    <div className="absolute left-1.5 top-2 bottom-2 w-px bg-border" />

                    <div className="space-y-1">
                      {group.events.map((event) => {
                        const cfg =
                          categoryConfig[
                            event.category as Exclude<ActionCategory, "All">
                          ];
                        const Icon = cfg?.icon ?? Activity;
                        return (
                          <div
                            key={event.id}
                            className="flex items-start gap-4 py-3 hover:bg-muted/20 rounded-lg px-3 -mx-3 transition-colors group"
                          >
                            {/* Timeline dot */}
                            <div
                              className={`absolute left-0 mt-1 w-3 h-3 rounded-full border-2 border-background ${
                                event.category === "Deployment" &&
                                event.action.includes("failed")
                                  ? "bg-red-500"
                                  : event.category === "Deployment"
                                    ? "bg-blue-500"
                                    : "bg-muted-foreground/50"
                              }`}
                            />

                            {/* Category icon */}
                            <Icon
                              className={`w-4 h-4 mt-0.5 shrink-0 ${cfg?.color ?? "text-muted-foreground"}`}
                            />

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-sm font-medium text-foreground">
                                  {event.action}
                                </span>
                                <Badge
                                  variant="outline"
                                  className={`text-[10px] px-1.5 ${cfg?.badgeClass ?? ""}`}
                                >
                                  {event.category}
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground mt-0.5">
                                {event.detail}
                              </p>
                            </div>

                            {/* User + time */}
                            <div className="flex items-center gap-2 shrink-0 text-right">
                              <div className="hidden sm:block text-right">
                                <div className="flex items-center justify-end gap-1.5">
                                  <div
                                    className={`w-5 h-5 rounded-full ${event.userColor} flex items-center justify-center text-white text-[9px] font-bold`}
                                  >
                                    {event.userInitials}
                                  </div>
                                  <span className="text-xs text-muted-foreground">
                                    {event.user}
                                  </span>
                                </div>
                                <div className="text-[10px] text-muted-foreground/60 mt-0.5 group-hover:opacity-100">
                                  {event.timestampFull.split(" at ")[1]}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardShell>
  );
}
