"use client";

import { useState } from "react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { useSitesStore, type Site, type SiteStatus } from "@/lib/sites-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Plus,
  Globe,
  Rocket,
  FileText,
  Database,
  ExternalLink,
  Trash2,
  Settings,
  Search,
  Loader2,
  Layers,
  CheckCircle2,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const statusConfig: Record<
  SiteStatus,
  { label: string; color: string; icon: typeof CheckCircle2 }
> = {
  live: {
    label: "Live",
    color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    icon: CheckCircle2,
  },
  draft: {
    label: "Draft",
    color: "bg-muted text-muted-foreground border-border",
    icon: FileText,
  },
  building: {
    label: "Building",
    color: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    icon: Loader2,
  },
};

const planColor: Record<Site["plan"], string> = {
  hobby: "bg-muted text-muted-foreground border-border",
  pro: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  team: "bg-violet-500/10 text-violet-500 border-violet-500/20",
};

export default function SitesPage() {
  const router = useRouter();
  const { sites, currentSiteId, setCurrentSite, addSite, removeSite } =
    useSitesStore();

  const [search, setSearch] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [newName, setNewName] = useState("");
  const [creating, setCreating] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Site | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [filterStatus, setFilterStatus] = useState<SiteStatus | "all">("all");

  const filtered = sites.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.subdomain.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || s.status === filterStatus;
    return matchSearch && matchStatus;
  });

  function handleCreate() {
    if (!newName.trim()) return;
    setCreating(true);
    setTimeout(() => {
      const site = addSite(newName.trim());
      setCurrentSite(site.id);
      setCreating(false);
      setShowNew(false);
      setNewName("");
      router.push("/dashboard");
    }, 800);
  }

  function handleOpen(site: Site) {
    setCurrentSite(site.id);
    router.push("/dashboard");
  }

  function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    setTimeout(() => {
      removeSite(deleteTarget.id);
      setDeleting(false);
      setDeleteTarget(null);
    }, 700);
  }

  return (
    <DashboardShell>
      {/* Header */}
      <div className="px-6 py-5 border-b border-border flex items-center justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-lg font-semibold text-foreground">All Sites</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {sites.length} site{sites.length !== 1 ? "s" : ""} · manage all
            your WebCraft projects in one place.
          </p>
        </div>
        <Button
          size="sm"
          className="h-8 text-xs gap-1.5 shrink-0"
          onClick={() => setShowNew(true)}
        >
          <Plus className="w-3.5 h-3.5" />
          New Site
        </Button>
      </div>

      {/* Filters */}
      <div className="px-6 py-3 border-b border-border flex items-center gap-3 flex-wrap shrink-0">
        <div className="relative flex-1 min-w-48 max-w-xs">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search sites…"
            className="pl-8 h-8 text-sm"
          />
        </div>
        <div className="flex items-center gap-1">
          {(["all", "live", "draft", "building"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                filterStatus === s
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/60"
              }`}
            >
              {s === "all"
                ? "All"
                : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Sites grid */}
      <div className="flex-1 overflow-auto p-6">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-4">
              <Layers className="w-5 h-5 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium text-foreground mb-1">
              No sites found
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              {search ? "Try a different search term." : "Create your first site to get started."}
            </p>
            <Button size="sm" onClick={() => setShowNew(true)}>
              <Plus className="w-3.5 h-3.5 mr-1.5" />
              New Site
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((site) => {
              const { label, color, icon: StatusIcon } = statusConfig[site.status];
              const isCurrent = site.id === currentSiteId;
              return (
                <div
                  key={site.id}
                  className={`group relative rounded-xl border bg-card overflow-hidden transition-all duration-150 hover:shadow-sm ${
                    isCurrent ? "border-foreground/30" : "border-border"
                  }`}
                >
                  {/* Preview gradient */}
                  <div
                    className={`h-28 bg-linear-to-br ${site.gradient} relative flex items-center justify-center`}
                  >
                    <Layers className="w-8 h-8 text-white/30" />
                    {isCurrent && (
                      <span className="absolute top-2.5 left-2.5 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-black/30 text-white backdrop-blur-sm">
                        Current
                      </span>
                    )}
                    <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5">
                      <Badge
                        variant="outline"
                        className={`text-[10px] font-semibold border ${color} backdrop-blur-sm bg-background/80`}
                      >
                        <StatusIcon
                          className={`w-2.5 h-2.5 mr-1 ${site.status === "building" ? "animate-spin" : ""}`}
                        />
                        {label}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={`text-[10px] font-semibold border ${planColor[site.plan]} backdrop-blur-sm bg-background/80`}
                      >
                        {site.plan}
                      </Badge>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="px-4 py-3">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="text-sm font-semibold text-foreground leading-tight">
                        {site.name}
                      </p>
                      <button
                        onClick={() => setDeleteTarget(site)}
                        className="p-1 rounded text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors opacity-0 group-hover:opacity-100 shrink-0 mt-0.5"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-1 mb-2">
                      {site.customDomain ? (
                        <>
                          <Globe className="w-3 h-3 text-muted-foreground shrink-0" />
                          <span className="text-xs text-foreground font-mono">
                            {site.customDomain}
                          </span>
                        </>
                      ) : (
                        <>
                          <Globe className="w-3 h-3 text-muted-foreground shrink-0" />
                          <span className="text-xs text-muted-foreground font-mono truncate">
                            {site.subdomain}
                          </span>
                        </>
                      )}
                    </div>

                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <FileText className="w-3 h-3" />
                        {site.pageCount} pages
                      </span>
                      <span className="flex items-center gap-1">
                        <Database className="w-3 h-3" />
                        {site.collectionCount} collections
                      </span>
                      <span className="flex items-center gap-1 ml-auto">
                        <Clock className="w-3 h-3" />
                        {site.lastDeployedAt}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1.5">
                      <Button
                        size="sm"
                        className="flex-1 h-7 text-xs"
                        onClick={() => handleOpen(site)}
                      >
                        Open Dashboard
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 text-xs gap-1"
                        asChild
                      >
                        <Link href="/builder" onClick={() => setCurrentSite(site.id)}>
                          <ExternalLink className="w-3 h-3" />
                          Builder
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0 text-muted-foreground"
                        asChild
                      >
                        <Link href="/dashboard/settings" onClick={() => setCurrentSite(site.id)}>
                          <Settings className="w-3.5 h-3.5" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Add new site card */}
            <button
              onClick={() => setShowNew(true)}
              className="rounded-xl border-2 border-dashed border-border h-full min-h-56 flex flex-col items-center justify-center gap-3 text-muted-foreground hover:text-foreground hover:border-foreground/30 hover:bg-accent/30 transition-all duration-150"
            >
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                <Plus className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium">New Site</span>
            </button>
          </div>
        )}
      </div>

      {/* New Site Dialog */}
      <Dialog open={showNew} onOpenChange={setShowNew}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Site</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">
                Site Name
              </label>
              <Input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="My Awesome Site"
                onKeyDown={(e) => e.key === "Enter" && handleCreate()}
                autoFocus
              />
              {newName.trim() && (
                <p className="text-xs text-muted-foreground">
                  URL:{" "}
                  <span className="font-mono text-foreground">
                    {newName
                      .trim()
                      .toLowerCase()
                      .replace(/\s+/g, "-")}
                    .webcraft.app
                  </span>
                </p>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              You can add a custom domain, configure settings, and invite
              collaborators after creation.
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowNew(false)}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              disabled={!newName.trim() || creating}
              onClick={handleCreate}
            >
              {creating && <Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" />}
              {creating ? "Creating…" : "Create Site"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={!!deleteTarget}
        onOpenChange={(o) => !o && setDeleteTarget(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-destructive">Delete Site</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete{" "}
            <strong className="text-foreground">{deleteTarget?.name}</strong>?
            This will remove all pages, data, and deployments. This cannot be
            undone.
          </p>
          <DialogFooter className="mt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDeleteTarget(null)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              size="sm"
              disabled={deleting}
              onClick={handleDelete}
            >
              {deleting && (
                <Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" />
              )}
              Delete Site
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Deploy shortcut card that appears at bottom of non-live sites */}
      {sites.some((s) => s.status !== "live" && s.id === currentSiteId) && (
        <div className="px-6 pb-4 shrink-0">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-amber-500/20 bg-amber-500/5">
            <Rocket className="w-4 h-4 text-amber-500 shrink-0" />
            <p className="text-sm text-foreground flex-1">
              Your current site is not live yet.
            </p>
            <Button size="sm" className="h-7 text-xs">
              Publish Now
            </Button>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
