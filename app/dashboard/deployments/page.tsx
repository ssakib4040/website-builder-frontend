"use client";

import { useState } from "react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Rocket,
  RefreshCw,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  GitBranch,
  GitCommit,
  Clock,
  CheckCircle2,
  XCircle,
  Loader2,
  RotateCcw,
} from "lucide-react";

type DeployStatus = "live" | "building" | "failed" | "cancelled";

interface Deployment {
  id: string;
  status: DeployStatus;
  branch: string;
  commit: string;
  commitMessage: string;
  deployedBy: string;
  createdAt: string;
  duration: string;
  previewUrl: string;
  isProduction: boolean;
  buildLog: string[];
}

const mockDeployments: Deployment[] = [
  {
    id: "dpl_9xK2mN1",
    status: "live",
    branch: "main",
    commit: "a3f2c8d",
    commitMessage: "Add hero section animation and update navbar styles",
    deployedBy: "Sarah Chen",
    createdAt: "10 minutes ago",
    duration: "1m 42s",
    previewUrl: "https://mysite.webcraft.app",
    isProduction: true,
    buildLog: [
      "[00:00] Triggering deployment build...",
      "[00:02] Running npm install",
      "[00:18] Installed 342 packages",
      "[00:19] Running npm run build",
      "[00:41] Compiled successfully in 22.3s",
      "[01:10] Optimizing images (18 files)",
      "[01:30] Creating deployment bundle",
      "[01:42] Deployment live at https://mysite.webcraft.app",
    ],
  },
  {
    id: "dpl_7pL4bR8",
    status: "building",
    branch: "feat/pricing-page",
    commit: "b7e1f4a",
    commitMessage: "WIP: redesign pricing tiers layout",
    deployedBy: "Alex Park",
    createdAt: "2 minutes ago",
    duration: "—",
    previewUrl: "",
    isProduction: false,
    buildLog: [
      "[00:00] Triggering deployment build...",
      "[00:02] Running npm install",
      "[00:19] Installed 342 packages",
      "[00:21] Running npm run build...",
    ],
  },
  {
    id: "dpl_3qW9tY6",
    status: "failed",
    branch: "fix/mobile-nav",
    commit: "c4d8e2b",
    commitMessage: "Fix mobile navigation overflow on small screens",
    deployedBy: "Maya Torres",
    createdAt: "1 hour ago",
    duration: "0m 58s",
    previewUrl: "",
    isProduction: false,
    buildLog: [
      "[00:00] Triggering deployment build...",
      "[00:02] Running npm install",
      "[00:17] Installed 342 packages",
      "[00:18] Running npm run build",
      "[00:44] Error: Module not found: @/components/nav/MobileMenu",
      "[00:58] Build failed with exit code 1",
    ],
  },
  {
    id: "dpl_5mH2kP4",
    status: "live",
    branch: "main",
    commit: "d9a3c1f",
    commitMessage: "Update blog post layout and typography",
    deployedBy: "Sarah Chen",
    createdAt: "3 hours ago",
    duration: "1m 38s",
    previewUrl: "https://prev-d9a3c1f.mysite.webcraft.app",
    isProduction: false,
    buildLog: [
      "[00:00] Triggering deployment build...",
      "[01:38] Deployment live.",
    ],
  },
  {
    id: "dpl_2nV6wA3",
    status: "live",
    branch: "main",
    commit: "e5b7d8c",
    commitMessage: "Add integrations page and update footer links",
    deployedBy: "Alex Park",
    createdAt: "Yesterday at 4:15 PM",
    duration: "1m 55s",
    previewUrl: "https://prev-e5b7d8c.mysite.webcraft.app",
    isProduction: false,
    buildLog: [],
  },
  {
    id: "dpl_1jX8sQ2",
    status: "cancelled",
    branch: "feat/dark-mode",
    commit: "f2e4a9d",
    commitMessage: "Implement dark mode for dashboard components",
    deployedBy: "Maya Torres",
    createdAt: "2 days ago",
    duration: "Cancelled",
    previewUrl: "",
    isProduction: false,
    buildLog: [],
  },
];

const statusConfig: Record<
  DeployStatus,
  { label: string; color: string; icon: typeof CheckCircle2 }
> = {
  live: {
    label: "Live",
    color:
      "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400",
    icon: CheckCircle2,
  },
  building: {
    label: "Building",
    color: "bg-blue-500/10 text-blue-600 border-blue-500/20 dark:text-blue-400",
    icon: Loader2,
  },
  failed: {
    label: "Failed",
    color: "bg-red-500/10 text-red-600 border-red-500/20 dark:text-red-400",
    icon: XCircle,
  },
  cancelled: {
    label: "Cancelled",
    color: "bg-muted text-muted-foreground border-border",
    icon: XCircle,
  },
};

export default function DeploymentsPage() {
  const [deployments, setDeployments] = useState<Deployment[]>(mockDeployments);
  const [expandedLog, setExpandedLog] = useState<string | null>(null);
  const [deploying, setDeploying] = useState(false);
  const [rollbackTarget, setRollbackTarget] = useState<Deployment | null>(null);

  const handleDeploy = () => {
    setDeploying(true);
    const newDeploy: Deployment = {
      id: `dpl_${Math.random().toString(36).slice(2, 9)}`,
      status: "building",
      branch: "main",
      commit: Math.random().toString(16).slice(2, 9),
      commitMessage: "Triggered manual deployment",
      deployedBy: "You",
      createdAt: "Just now",
      duration: "—",
      previewUrl: "",
      isProduction: false,
      buildLog: [
        "[00:00] Triggering deployment build...",
        "[00:02] Running npm install...",
      ],
    };
    setDeployments((prev) => [newDeploy, ...prev]);

    setTimeout(() => {
      setDeployments((prev) =>
        prev.map((d) =>
          d.id === newDeploy.id
            ? {
                ...d,
                status: "live",
                duration: "1m 44s",
                previewUrl: `https://prev-${d.commit}.mysite.webcraft.app`,
                buildLog: [...newDeploy.buildLog, "[01:44] Deployment live."],
              }
            : d,
        ),
      );
      setDeploying(false);
    }, 3000);
  };

  const handleRollback = (dep: Deployment) => {
    setRollbackTarget(null);
    const rolled: Deployment = {
      ...dep,
      id: `dpl_${Math.random().toString(36).slice(2, 9)}`,
      commitMessage: `Rollback to ${dep.commit}: ${dep.commitMessage}`,
      createdAt: "Just now",
      status: "live",
      duration: "0m 12s",
      isProduction: true,
    };
    setDeployments((prev) => [rolled, ...prev]);
  };

  return (
    <DashboardShell>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="border-b border-border px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-foreground">
              Deployments
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Build history, previews, and rollbacks
            </p>
          </div>
          <Button onClick={handleDeploy} disabled={deploying} size="sm">
            {deploying ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Rocket className="w-4 h-4 mr-2" />
            )}
            {deploying ? "Deploying…" : "Deploy Now"}
          </Button>
        </div>

        {/* Deployment list */}
        <div className="flex-1 overflow-auto">
          <div className="divide-y divide-border">
            {deployments.map((dep) => {
              const {
                label,
                color,
                icon: StatusIcon,
              } = statusConfig[dep.status];
              const isExpanded = expandedLog === dep.id;
              return (
                <div
                  key={dep.id}
                  className="px-6 py-4 hover:bg-muted/20 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    {/* Status indicator */}
                    <div className="mt-0.5">
                      <StatusIcon
                        className={`w-5 h-5 ${
                          dep.status === "live"
                            ? "text-emerald-500"
                            : dep.status === "building"
                              ? "text-blue-500 animate-spin"
                              : dep.status === "failed"
                                ? "text-red-500"
                                : "text-muted-foreground"
                        }`}
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge
                          variant="outline"
                          className={`text-xs font-medium ${color}`}
                        >
                          {label}
                        </Badge>
                        {dep.isProduction && (
                          <Badge className="text-xs bg-foreground text-background">
                            Production
                          </Badge>
                        )}
                        <span className="text-xs text-muted-foreground font-mono">
                          {dep.id}
                        </span>
                      </div>

                      <p className="text-sm font-medium text-foreground mt-1.5 truncate">
                        {dep.commitMessage}
                      </p>

                      <div className="flex items-center gap-4 mt-2 flex-wrap">
                        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <GitBranch className="w-3 h-3" /> {dep.branch}
                        </span>
                        <span className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
                          <GitCommit className="w-3 h-3" /> {dep.commit}
                        </span>
                        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" /> {dep.duration}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {dep.createdAt} by {dep.deployedBy}
                        </span>
                      </div>

                      {/* Build log */}
                      {dep.buildLog.length > 0 && (
                        <button
                          className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                          onClick={() =>
                            setExpandedLog(isExpanded ? null : dep.id)
                          }
                        >
                          {isExpanded ? (
                            <ChevronUp className="w-3 h-3" />
                          ) : (
                            <ChevronDown className="w-3 h-3" />
                          )}
                          {isExpanded ? "Hide" : "Show"} build log
                        </button>
                      )}

                      {isExpanded && (
                        <div className="mt-2 bg-zinc-950 dark:bg-zinc-900 rounded-lg p-4 font-mono text-xs text-zinc-300 space-y-1 max-h-48 overflow-auto border border-zinc-800">
                          {dep.buildLog.map((line, i) => (
                            <div
                              key={i}
                              className={
                                line.includes("Error") ||
                                line.includes("failed")
                                  ? "text-red-400"
                                  : line.includes("live") ||
                                      line.includes("success")
                                    ? "text-emerald-400"
                                    : "text-zinc-300"
                              }
                            >
                              {line}
                            </div>
                          ))}
                          {dep.status === "building" && (
                            <div className="flex items-center gap-1.5 text-blue-400">
                              <Loader2 className="w-3 h-3 animate-spin" />{" "}
                              Building…
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 shrink-0">
                      {dep.previewUrl && (
                        <Button variant="outline" size="sm" asChild>
                          <a
                            href={dep.previewUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                            Visit
                          </a>
                        </Button>
                      )}
                      {dep.status === "live" && !dep.isProduction && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setRollbackTarget(dep)}
                        >
                          <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
                          Rollback
                        </Button>
                      )}
                      {dep.status === "failed" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleDeploy}
                          disabled={deploying}
                        >
                          <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
                          Retry
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Rollback confirmation */}
      <Dialog
        open={!!rollbackTarget}
        onOpenChange={() => setRollbackTarget(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rollback to this deployment?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            This will create a new production deployment at commit{" "}
            <code className="font-mono text-foreground bg-muted px-1 rounded">
              {rollbackTarget?.commit}
            </code>
            . The current live deployment will be replaced.
          </p>
          <div className="bg-muted/40 rounded-lg p-3 text-sm border border-border">
            <div className="font-medium text-foreground truncate">
              {rollbackTarget?.commitMessage}
            </div>
            <div className="text-muted-foreground text-xs mt-1">
              {rollbackTarget?.createdAt} · {rollbackTarget?.branch}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRollbackTarget(null)}>
              Cancel
            </Button>
            <Button
              onClick={() => rollbackTarget && handleRollback(rollbackTarget)}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Confirm Rollback
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardShell>
  );
}
