"use client";

import { useState } from "react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
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
  Eye,
  EyeOff,
  Copy,
  Trash2,
  Check,
  KeyRound,
  AlertTriangle,
  Pencil,
} from "lucide-react";

type Environment = "Production" | "Preview" | "Development";

interface EnvVar {
  id: string;
  key: string;
  value: string;
  environments: Environment[];
  isSecret: boolean;
  updatedAt: string;
}

const mockVars: EnvVar[] = [
  {
    id: "1",
    key: "NEXT_PUBLIC_SITE_URL",
    value: "https://mysite.com",
    environments: ["Production", "Preview", "Development"],
    isSecret: false,
    updatedAt: "2 days ago",
  },
  {
    id: "2",
    key: "STRIPE_SECRET_KEY",
    value:
      "sk_live_51NxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxK",
    environments: ["Production"],
    isSecret: true,
    updatedAt: "1 week ago",
  },
  {
    id: "3",
    key: "STRIPE_PUBLISHABLE_KEY",
    value:
      "pk_live_51Nxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    environments: ["Production", "Preview"],
    isSecret: false,
    updatedAt: "1 week ago",
  },
  {
    id: "4",
    key: "DATABASE_URL",
    value: "postgresql://user:password@host:5432/mydb",
    environments: ["Production", "Preview", "Development"],
    isSecret: true,
    updatedAt: "2 weeks ago",
  },
  {
    id: "5",
    key: "NEXT_PUBLIC_GA_ID",
    value: "G-XXXXXXXXXX",
    environments: ["Production"],
    isSecret: false,
    updatedAt: "3 weeks ago",
  },
  {
    id: "6",
    key: "SENDGRID_API_KEY",
    value:
      "SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    environments: ["Production", "Preview"],
    isSecret: true,
    updatedAt: "1 month ago",
  },
  {
    id: "7",
    key: "JWT_SECRET",
    value: "super_secret_jwt_key_please_change_in_production_32_chars_min",
    environments: ["Production", "Preview", "Development"],
    isSecret: true,
    updatedAt: "1 month ago",
  },
];

const envColors: Record<Environment, string> = {
  Production:
    "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400",
  Preview: "bg-blue-500/10 text-blue-600 border-blue-500/20 dark:text-blue-400",
  Development:
    "bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-400",
};

const allEnvs: Environment[] = ["Production", "Preview", "Development"];

export default function EnvPage() {
  const [vars, setVars] = useState<EnvVar[]>(mockVars);
  const [envFilter, setEnvFilter] = useState<Environment | "All">("All");
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const [copied, setCopied] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<EnvVar | null>(null);

  // Form state for add/edit
  const [formKey, setFormKey] = useState("");
  const [formValue, setFormValue] = useState("");
  const [formEnvs, setFormEnvs] = useState<Environment[]>([
    "Production",
    "Preview",
    "Development",
  ]);
  const [formSecret, setFormSecret] = useState(true);

  const filtered = vars.filter(
    (v) => envFilter === "All" || v.environments.includes(envFilter),
  );

  const toggleReveal = (id: string) => {
    setRevealed((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleCopy = (id: string, value: string) => {
    navigator.clipboard.writeText(value).catch(() => {});
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleDelete = (id: string) => {
    setVars((prev) => prev.filter((v) => v.id !== id));
    setDeleteTarget(null);
  };

  const openAdd = () => {
    setFormKey("");
    setFormValue("");
    setFormEnvs(["Production", "Preview", "Development"]);
    setFormSecret(true);
    setAddOpen(true);
  };

  const openEdit = (v: EnvVar) => {
    setFormKey(v.key);
    setFormValue(v.value);
    setFormEnvs(v.environments);
    setFormSecret(v.isSecret);
    setEditTarget(v);
  };

  const handleSave = () => {
    if (!formKey.trim()) return;
    if (editTarget) {
      setVars((prev) =>
        prev.map((v) =>
          v.id === editTarget.id
            ? {
                ...v,
                key: formKey.trim(),
                value: formValue,
                environments: formEnvs,
                isSecret: formSecret,
                updatedAt: "Just now",
              }
            : v,
        ),
      );
      setEditTarget(null);
    } else {
      const newVar: EnvVar = {
        id: String(Date.now()),
        key: formKey.trim(),
        value: formValue,
        environments: formEnvs,
        isSecret: formSecret,
        updatedAt: "Just now",
      };
      setVars((prev) => [newVar, ...prev]);
      setAddOpen(false);
    }
  };

  const toggleFormEnv = (env: Environment) => {
    setFormEnvs((prev) =>
      prev.includes(env) ? prev.filter((e) => e !== env) : [...prev, env],
    );
  };

  const maskValue = (v: string) => "•".repeat(Math.min(v.length, 24));

  return (
    <DashboardShell>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="border-b border-border px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-foreground">
              Environment Variables
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Manage secrets and config across environments
            </p>
          </div>
          <Button size="sm" onClick={openAdd}>
            <Plus className="w-4 h-4 mr-2" />
            Add Variable
          </Button>
        </div>

        {/* Environment filter */}
        <div className="border-b border-border px-6 flex items-center gap-1">
          {(["All", ...allEnvs] as const).map((env) => (
            <button
              key={env}
              onClick={() => setEnvFilter(env)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                envFilter === env
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {env}
            </button>
          ))}
        </div>

        {/* Warning */}
        <div className="mx-6 mt-4 bg-amber-500/10 border border-amber-500/20 rounded-lg px-4 py-3 flex items-start gap-3">
          <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-700 dark:text-amber-400">
            <span className="font-medium">Security notice:</span> Never expose
            secret environment variables in client-side code. Always prefix
            public variables with{" "}
            <code className="font-mono bg-amber-500/10 px-0.5 rounded">
              NEXT_PUBLIC_
            </code>
            .
          </p>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto p-6 pt-4">
          <div className="border border-border rounded-xl overflow-hidden bg-card">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-48 text-center">
                <KeyRound className="w-8 h-8 text-muted-foreground/40 mb-3" />
                <p className="text-sm font-medium text-muted-foreground">
                  No variables for this environment
                </p>
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/20">
                    <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      Key
                    </th>
                    <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      Value
                    </th>
                    <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      Environments
                    </th>
                    <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      Updated
                    </th>
                    <th className="px-5 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((v) => {
                    const isRevealed = revealed.has(v.id);
                    return (
                      <tr
                        key={v.id}
                        className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors group"
                      >
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-2">
                            <code className="text-xs font-mono font-medium text-foreground">
                              {v.key}
                            </code>
                            {v.isSecret && (
                              <Badge
                                variant="outline"
                                className="text-[10px] px-1.5 py-0"
                              >
                                Secret
                              </Badge>
                            )}
                          </div>
                        </td>
                        <td className="px-5 py-3.5 max-w-70">
                          <div className="flex items-center gap-2">
                            <code className="text-xs font-mono text-muted-foreground truncate">
                              {v.isSecret && !isRevealed
                                ? maskValue(v.value)
                                : v.value}
                            </code>
                            <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                              {v.isSecret && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={() => toggleReveal(v.id)}
                                >
                                  {isRevealed ? (
                                    <EyeOff className="w-3 h-3" />
                                  ) : (
                                    <Eye className="w-3 h-3" />
                                  )}
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => handleCopy(v.id, v.value)}
                              >
                                {copied === v.id ? (
                                  <Check className="w-3 h-3 text-emerald-500" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                              </Button>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-1 flex-wrap">
                            {v.environments.map((env) => (
                              <Badge
                                key={env}
                                variant="outline"
                                className={`text-[10px] px-1.5 ${envColors[env]}`}
                              >
                                {env}
                              </Badge>
                            ))}
                          </div>
                        </td>
                        <td className="px-5 py-3.5 text-xs text-muted-foreground">
                          {v.updatedAt}
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-1 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => openEdit(v)}
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-destructive hover:text-destructive"
                              onClick={() => setDeleteTarget(v.id)}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* Add/Edit dialog */}
      <Dialog
        open={addOpen || !!editTarget}
        onOpenChange={() => {
          setAddOpen(false);
          setEditTarget(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editTarget ? "Edit Variable" : "Add Environment Variable"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">
                Key
              </label>
              <Input
                value={formKey}
                onChange={(e) =>
                  setFormKey(
                    e.target.value.toUpperCase().replace(/[^A-Z0-9_]/g, ""),
                  )
                }
                placeholder="VARIABLE_NAME"
                className="font-mono text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">
                Value
              </label>
              <div className="relative">
                <Input
                  value={formValue}
                  onChange={(e) => setFormValue(e.target.value)}
                  placeholder="value"
                  type={formSecret ? "password" : "text"}
                  className="font-mono text-sm pr-10"
                />
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={() => setFormSecret(!formSecret)}
                >
                  {formSecret ? (
                    <Eye className="w-4 h-4" />
                  ) : (
                    <EyeOff className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Environments
              </label>
              <div className="flex items-center gap-2">
                {allEnvs.map((env) => (
                  <button
                    key={env}
                    onClick={() => toggleFormEnv(env)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                      formEnvs.includes(env)
                        ? `${envColors[env]} border-current`
                        : "border-border text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {env}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setAddOpen(false);
                setEditTarget(null);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={!formKey.trim() || formEnvs.length === 0}
            >
              {editTarget ? "Save Changes" : "Add Variable"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete confirmation */}
      <Dialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Variable?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            <code className="font-mono text-foreground bg-muted px-1 rounded">
              {vars.find((v) => v.id === deleteTarget)?.key}
            </code>{" "}
            will be permanently removed from all environments. This may break
            your deployments.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteTarget(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => deleteTarget && handleDelete(deleteTarget)}
            >
              Delete Variable
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardShell>
  );
}
