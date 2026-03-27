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
  Globe,
  Plus,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Shield,
  Star,
  Trash2,
  RefreshCw,
  ExternalLink,
} from "lucide-react";

type DomainStatus = "active" | "pending" | "error";
type SSLStatus = "valid" | "expiring" | "missing";

interface Domain {
  id: string;
  domain: string;
  status: DomainStatus;
  ssl: SSLStatus;
  sslExpiry?: string;
  isPrimary: boolean;
  addedAt: string;
  type: "apex" | "subdomain" | "redirect";
}

interface DnsRecord {
  type: string;
  name: string;
  value: string;
  ttl: string;
}

const mockDomains: Domain[] = [
  {
    id: "1",
    domain: "mysite.com",
    status: "active",
    ssl: "valid",
    sslExpiry: "Nov 14, 2025",
    isPrimary: true,
    addedAt: "3 months ago",
    type: "apex",
  },
  {
    id: "2",
    domain: "www.mysite.com",
    status: "active",
    ssl: "valid",
    sslExpiry: "Nov 14, 2025",
    isPrimary: false,
    addedAt: "3 months ago",
    type: "subdomain",
  },
  {
    id: "3",
    domain: "blog.mysite.com",
    status: "active",
    ssl: "expiring",
    sslExpiry: "Jan 2, 2025",
    isPrimary: false,
    addedAt: "1 month ago",
    type: "subdomain",
  },
  {
    id: "4",
    domain: "mysite.app",
    status: "pending",
    ssl: "missing",
    isPrimary: false,
    addedAt: "2 days ago",
    type: "apex",
  },
];

const mockDnsRecords: DnsRecord[] = [
  { type: "A", name: "@", value: "76.76.21.21", ttl: "3600" },
  { type: "A", name: "www", value: "76.76.21.21", ttl: "3600" },
  { type: "CNAME", name: "blog", value: "cname.webcraft.app", ttl: "3600" },
  {
    type: "TXT",
    name: "@",
    value: "webcraft-verification=abc123def456",
    ttl: "300",
  },
  { type: "MX", name: "@", value: "mx1.forwardemail.net", ttl: "3600" },
];

const statusConfig: Record<
  DomainStatus,
  { label: string; color: string; icon: typeof CheckCircle2 }
> = {
  active: {
    label: "Active",
    color: "text-emerald-600 dark:text-emerald-400",
    icon: CheckCircle2,
  },
  pending: {
    label: "Pending DNS",
    color: "text-amber-600 dark:text-amber-400",
    icon: AlertTriangle,
  },
  error: {
    label: "Error",
    color: "text-red-600 dark:text-red-400",
    icon: XCircle,
  },
};

const sslConfig: Record<SSLStatus, { label: string; color: string }> = {
  valid: {
    label: "SSL Valid",
    color:
      "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400",
  },
  expiring: {
    label: "Expiring Soon",
    color:
      "bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-400",
  },
  missing: { label: "No SSL", color: "bg-muted text-muted-foreground" },
};

export default function DomainsPage() {
  const [domains, setDomains] = useState<Domain[]>(mockDomains);
  const [addOpen, setAddOpen] = useState(false);
  const [newDomain, setNewDomain] = useState("");
  const [adding, setAdding] = useState(false);
  const [dnsOpen, setDnsOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleAdd = () => {
    if (!newDomain.trim()) return;
    setAdding(true);
    setTimeout(() => {
      const d: Domain = {
        id: String(Date.now()),
        domain: newDomain.trim(),
        status: "pending",
        ssl: "missing",
        isPrimary: false,
        addedAt: "Just now",
        type: "apex",
      };
      setDomains((prev) => [...prev, d]);
      setNewDomain("");
      setAdding(false);
      setAddOpen(false);
    }, 1200);
  };

  const handleSetPrimary = (id: string) => {
    setDomains((prev) =>
      prev.map((d) => ({
        ...d,
        isPrimary: d.id === id && d.status === "active",
      })),
    );
  };

  const handleDelete = (id: string) => {
    setDomains((prev) => prev.filter((d) => d.id !== id));
    setDeletingId(null);
  };

  const handleRefresh = (id: string) => {
    setDomains((prev) =>
      prev.map((d) =>
        d.id === id
          ? { ...d, status: "active", ssl: "valid", sslExpiry: "Dec 14, 2025" }
          : d,
      ),
    );
  };

  return (
    <DashboardShell>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="border-b border-border px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-foreground">Domains</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Manage custom domains and SSL certificates
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDnsOpen(true)}
            >
              View DNS Records
            </Button>
            <Button size="sm" onClick={() => setAddOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Domain
            </Button>
          </div>
        </div>

        {/* Domain list */}
        <div className="flex-1 overflow-auto p-6 space-y-3">
          {domains.map((domain) => {
            const {
              label: statusLabel,
              color: statusColor,
              icon: StatusIcon,
            } = statusConfig[domain.status];
            const { label: sslLabel, color: sslColor } = sslConfig[domain.ssl];

            return (
              <div
                key={domain.id}
                className="border border-border rounded-xl p-4 bg-card hover:border-foreground/20 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center shrink-0">
                      <Globe className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono font-medium text-foreground text-sm">
                          {domain.domain}
                        </span>
                        {domain.isPrimary && (
                          <Badge className="text-xs bg-foreground text-background">
                            <Star className="w-2.5 h-2.5 mr-1" />
                            Primary
                          </Badge>
                        )}
                        <Badge
                          variant="outline"
                          className={`text-xs capitalize`}
                        >
                          {domain.type}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                        <span
                          className={`flex items-center gap-1 text-xs ${statusColor}`}
                        >
                          <StatusIcon className="w-3 h-3" />
                          {statusLabel}
                        </span>
                        <Badge
                          variant="outline"
                          className={`text-xs ${sslColor}`}
                        >
                          <Shield className="w-2.5 h-2.5 mr-1" />
                          {sslLabel}
                          {domain.sslExpiry && ` · ${domain.sslExpiry}`}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          Added {domain.addedAt}
                        </span>
                      </div>

                      {domain.status === "pending" && (
                        <div className="mt-3 bg-amber-500/10 border border-amber-500/20 rounded-lg px-3 py-2 text-xs text-amber-700 dark:text-amber-400">
                          <p className="font-medium mb-1">
                            Pending DNS verification
                          </p>
                          <p>
                            Add an A record pointing{" "}
                            <code className="font-mono bg-amber-500/10 px-1 rounded">
                              @
                            </code>{" "}
                            to{" "}
                            <code className="font-mono bg-amber-500/10 px-1 rounded">
                              76.76.21.21
                            </code>{" "}
                            at your DNS provider.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {domain.status === "active" && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        asChild
                      >
                        <a
                          href={`https://${domain.domain}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </Button>
                    )}
                    {domain.status === "pending" && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleRefresh(domain.id)}
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                      </Button>
                    )}
                    {!domain.isPrimary && domain.status === "active" && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs h-8"
                        onClick={() => handleSetPrimary(domain.id)}
                      >
                        Set Primary
                      </Button>
                    )}
                    {!domain.isPrimary && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => setDeletingId(domain.id)}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add domain dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Custom Domain</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">
                Domain name
              </label>
              <Input
                placeholder="yourdomain.com"
                value={newDomain}
                onChange={(e) => setNewDomain(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAdd()}
              />
              <p className="text-xs text-muted-foreground mt-2">
                Enter your apex domain or subdomain. You&apos;ll need to update
                your DNS records after adding.
              </p>
            </div>
            <div className="bg-muted/40 rounded-lg p-3 text-xs border border-border space-y-2">
              <p className="font-medium text-foreground">
                Required DNS records:
              </p>
              <div className="font-mono space-y-1 text-muted-foreground">
                <div className="grid grid-cols-4 gap-2">
                  <span className="text-foreground font-semibold">Type</span>
                  <span className="text-foreground font-semibold">Name</span>
                  <span className="col-span-2 text-foreground font-semibold">
                    Value
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  <span>A</span>
                  <span>@</span>
                  <span className="col-span-2">76.76.21.21</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  <span>CNAME</span>
                  <span>www</span>
                  <span className="col-span-2">cname.webcraft.app</span>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAdd} disabled={adding || !newDomain.trim()}>
              {adding ? "Adding…" : "Add Domain"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* DNS records dialog */}
      <Dialog open={dnsOpen} onOpenChange={setDnsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>DNS Records</DialogTitle>
          </DialogHeader>
          <div className="border border-border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/30 border-b border-border">
                  {["Type", "Name", "Value", "TTL"].map((h) => (
                    <th
                      key={h}
                      className="text-left px-4 py-2.5 font-medium text-muted-foreground text-xs uppercase tracking-wide"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {mockDnsRecords.map((rec, i) => (
                  <tr
                    key={i}
                    className="border-b border-border last:border-0 hover:bg-muted/20"
                  >
                    <td className="px-4 py-3">
                      <Badge variant="outline" className="font-mono text-xs">
                        {rec.type}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 font-mono text-foreground">
                      {rec.name}
                    </td>
                    <td className="px-4 py-3 font-mono text-muted-foreground truncate max-w-50">
                      {rec.value}
                    </td>
                    <td className="px-4 py-3 font-mono text-muted-foreground">
                      {rec.ttl}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete confirmation */}
      <Dialog open={!!deletingId} onOpenChange={() => setDeletingId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove Domain?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            This will permanently remove{" "}
            <code className="font-mono text-foreground bg-muted px-1 rounded">
              {domains.find((d) => d.id === deletingId)?.domain}
            </code>{" "}
            from your project. The domain won&apos;t automatically redirect
            anywhere.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeletingId(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => deletingId && handleDelete(deletingId)}
            >
              Remove Domain
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardShell>
  );
}
