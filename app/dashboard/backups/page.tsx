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
  ArchiveRestore,
  Plus,
  Download,
  RotateCcw,
  HardDrive,
  Clock,
  CheckCircle2,
  Loader2,
  FileArchive,
  Trash2,
} from "lucide-react";

type BackupStatus = "ready" | "creating" | "failed";
type BackupType = "automatic" | "manual";

interface Backup {
  id: string;
  label: string;
  createdAt: string;
  size: string;
  status: BackupStatus;
  type: BackupType;
  pages: number;
  assets: number;
  dataEntries: number;
}

const mockBackups: Backup[] = [
  {
    id: "b1",
    label: "Before pricing update",
    createdAt: "Today at 2:14 PM",
    size: "8.4 MB",
    status: "ready",
    type: "manual",
    pages: 12,
    assets: 48,
    dataEntries: 204,
  },
  {
    id: "b2",
    label: "Auto backup — Dec 14",
    createdAt: "Dec 14 at 3:00 AM",
    size: "8.1 MB",
    status: "ready",
    type: "automatic",
    pages: 12,
    assets: 47,
    dataEntries: 198,
  },
  {
    id: "b3",
    label: "Auto backup — Dec 13",
    createdAt: "Dec 13 at 3:00 AM",
    size: "7.9 MB",
    status: "ready",
    type: "automatic",
    pages: 11,
    assets: 47,
    dataEntries: 192,
  },
  {
    id: "b4",
    label: "Auto backup — Dec 12",
    createdAt: "Dec 12 at 3:00 AM",
    size: "7.8 MB",
    status: "ready",
    type: "automatic",
    pages: 11,
    assets: 46,
    dataEntries: 188,
  },
  {
    id: "b5",
    label: "Pre-launch backup",
    createdAt: "Dec 10 at 11:02 AM",
    size: "7.2 MB",
    status: "ready",
    type: "manual",
    pages: 10,
    assets: 42,
    dataEntries: 170,
  },
  {
    id: "b6",
    label: "Auto backup — Dec 10",
    createdAt: "Dec 10 at 3:00 AM",
    size: "7.2 MB",
    status: "ready",
    type: "automatic",
    pages: 10,
    assets: 42,
    dataEntries: 168,
  },
  {
    id: "b7",
    label: "Auto backup — Dec 9",
    createdAt: "Dec 9 at 3:00 AM",
    size: "6.8 MB",
    status: "ready",
    type: "automatic",
    pages: 9,
    assets: 40,
    dataEntries: 155,
  },
];

export default function BackupsPage() {
  const [backups, setBackups] = useState<Backup[]>(mockBackups);
  const [creating, setCreating] = useState(false);
  const [restoreTarget, setRestoreTarget] = useState<Backup | null>(null);
  const [restoring, setRestoring] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Backup | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleCreate = () => {
    setCreating(true);
    const tempId = `b_${Date.now()}`;
    const newBackup: Backup = {
      id: tempId,
      label: "Manual backup",
      createdAt: "Just now",
      size: "—",
      status: "creating",
      type: "manual",
      pages: 12,
      assets: 48,
      dataEntries: 204,
    };
    setBackups((prev) => [newBackup, ...prev]);

    setTimeout(() => {
      setBackups((prev) =>
        prev.map((b) =>
          b.id === tempId
            ? { ...b, status: "ready", size: "8.4 MB", label: "Manual backup" }
            : b,
        ),
      );
      setCreating(false);
    }, 2500);
  };

  const handleRestore = () => {
    if (!restoreTarget) return;
    setRestoring(true);
    setTimeout(() => {
      setRestoring(false);
      setRestoreTarget(null);
      setSuccessMsg(`Restored to "${restoreTarget.label}" successfully.`);
      setTimeout(() => setSuccessMsg(null), 4000);
    }, 2000);
  };

  const handleDelete = (backup: Backup) => {
    setBackups((prev) => prev.filter((b) => b.id !== backup.id));
    setDeleteTarget(null);
  };

  const latestBackup = backups.find((b) => b.status === "ready");

  return (
    <DashboardShell>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="border-b border-border px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-foreground">Backups</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Snapshots of your site — pages, assets, and data
            </p>
          </div>
          <Button size="sm" onClick={handleCreate} disabled={creating}>
            {creating ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Plus className="w-4 h-4 mr-2" />
            )}
            {creating ? "Creating…" : "Create Backup"}
          </Button>
        </div>

        <div className="flex-1 overflow-auto p-6 space-y-5">
          {/* Success message */}
          {successMsg && (
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-4 py-3 flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <p className="text-sm text-emerald-700 dark:text-emerald-400">
                {successMsg}
              </p>
            </div>
          )}

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4">
            {[
              {
                label: "Total Backups",
                value: String(
                  backups.filter((b) => b.status === "ready").length,
                ),
                icon: FileArchive,
              },
              {
                label: "Latest Backup",
                value: latestBackup?.createdAt ?? "—",
                icon: Clock,
              },
              { label: "Storage Used", value: "58.8 MB", icon: HardDrive },
            ].map(({ label, value, icon: Icon }) => (
              <div
                key={label}
                className="border border-border rounded-xl p-4 bg-card"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
                    {label}
                  </span>
                </div>
                <div className="text-base font-semibold text-foreground">
                  {value}
                </div>
              </div>
            ))}
          </div>

          {/* Backup list */}
          <div className="border border-border rounded-xl overflow-hidden bg-card">
            {backups.map((backup, idx) => (
              <div
                key={backup.id}
                className={`flex items-center gap-4 px-5 py-4 ${idx < backups.length - 1 ? "border-b border-border" : ""} hover:bg-muted/20 transition-colors`}
              >
                {/* Icon */}
                <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center shrink-0">
                  {backup.status === "creating" ? (
                    <Loader2 className="w-4 h-4 text-muted-foreground animate-spin" />
                  ) : (
                    <ArchiveRestore className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground truncate">
                      {backup.label}
                    </span>
                    <Badge
                      variant="outline"
                      className={`text-[10px] shrink-0 ${
                        backup.type === "manual"
                          ? "bg-purple-500/10 text-purple-600 border-purple-500/20 dark:text-purple-400"
                          : "bg-muted text-muted-foreground border-border"
                      }`}
                    >
                      {backup.type}
                    </Badge>
                    {backup.status === "creating" && (
                      <Badge
                        variant="outline"
                        className="text-[10px] bg-blue-500/10 text-blue-600 border-blue-500/20 dark:text-blue-400"
                      >
                        Creating…
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {backup.createdAt}
                    </span>
                    <span className="flex items-center gap-1">
                      <HardDrive className="w-3 h-3" /> {backup.size}
                    </span>
                    {backup.status === "ready" && (
                      <span className="hidden sm:flex items-center gap-3">
                        <span>{backup.pages} pages</span>
                        <span>·</span>
                        <span>{backup.assets} assets</span>
                        <span>·</span>
                        <span>{backup.dataEntries} data entries</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                {backup.status === "ready" && (
                  <div className="flex items-center gap-2 shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs h-8"
                      onClick={() => setRestoreTarget(backup)}
                    >
                      <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
                      Restore
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs h-8">
                      <Download className="w-3.5 h-3.5 mr-1.5" />
                      Download
                    </Button>
                    {backup.type === "manual" && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => setDeleteTarget(backup)}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Auto-backup notice */}
          <p className="text-xs text-muted-foreground text-center">
            Automatic backups are created daily at 3:00 AM UTC and retained for
            30 days. Manual backups are kept until deleted.
          </p>
        </div>
      </div>

      {/* Restore confirmation */}
      <Dialog
        open={!!restoreTarget}
        onOpenChange={() => !restoring && setRestoreTarget(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Restore from Backup?</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Your current site will be replaced with the snapshot from{" "}
              <strong className="text-foreground">
                {restoreTarget?.createdAt}
              </strong>
              . This will overwrite all pages, assets, and data collections.
            </p>
            <div className="bg-muted/40 border border-border rounded-lg p-3 text-sm space-y-1">
              <div className="font-medium text-foreground">
                {restoreTarget?.label}
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>{restoreTarget?.pages} pages</span>
                <span>{restoreTarget?.assets} assets</span>
                <span>{restoreTarget?.dataEntries} data entries</span>
                <span>{restoreTarget?.size}</span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setRestoreTarget(null)}
              disabled={restoring}
            >
              Cancel
            </Button>
            <Button onClick={handleRestore} disabled={restoring}>
              {restoring ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Restoring…
                </>
              ) : (
                <>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Restore Site
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete confirmation */}
      <Dialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Backup?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            The backup{" "}
            <strong className="text-foreground">
              &quot;{deleteTarget?.label}&quot;
            </strong>{" "}
            will be permanently deleted and cannot be recovered.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteTarget(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => deleteTarget && handleDelete(deleteTarget)}
            >
              Delete Backup
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardShell>
  );
}
