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
  Settings,
  Globe,
  Palette,
  Lock,
  CreditCard,
  Trash2,
  AlertTriangle,
  Check,
  Loader2,
  RefreshCw,
  ShieldCheck,
  Bell,
  Code2,
  Eye,
  EyeOff,
} from "lucide-react";

const tabs = [
  { id: "general", label: "General", icon: Settings },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Lock },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "developer", label: "Developer", icon: Code2 },
  { id: "danger", label: "Danger Zone", icon: AlertTriangle },
] as const;

type TabId = (typeof tabs)[number]["id"];

const PLANS = [
  {
    id: "hobby",
    label: "Hobby",
    price: "$0/mo",
    features: ["1 project", "1 GB storage", "Community support"],
  },
  {
    id: "pro",
    label: "Pro",
    price: "$19/mo",
    features: [
      "10 projects",
      "50 GB storage",
      "Priority support",
      "Custom domains",
    ],
  },
  {
    id: "team",
    label: "Team",
    price: "$49/mo",
    features: [
      "Unlimited projects",
      "200 GB storage",
      "Team seats",
      "SSO",
      "99.9% SLA",
    ],
  },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabId>("general");

  // General
  const [siteName, setSiteName] = useState("My WebCraft Site");
  const [siteSlug, setSiteSlug] = useState("my-webcraft-site");
  const [timezone, setTimezone] = useState("UTC");
  const [generalSaving, setGeneralSaving] = useState(false);
  const [generalSaved, setGeneralSaved] = useState(false);

  // Appearance
  const [accentColor, setAccentColor] = useState("#6366f1");
  const [font, setFont] = useState("inter");
  const [borderRadius, setBorderRadius] = useState("md");

  // Notifications
  const [notifs, setNotifs] = useState({
    deployments: true,
    formSubmissions: true,
    teamInvites: true,
    billing: true,
    securityAlerts: true,
    weeklyDigest: false,
  });

  // Security
  const [showToken, setShowToken] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwSaving, setPwSaving] = useState(false);
  const [pwSaved, setPwSaved] = useState(false);
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);

  // Developer
  const [webhookUrl, setWebhookUrl] = useState("");
  const [apiToken] = useState(
    "sk_live_WebCraft_••••••••••••••••••••••••••••••••",
  );
  const [regenerating, setRegenerating] = useState(false);
  const [regenerated, setRegenerating2] = useState(false);

  // Danger
  const [deleteConfirm, setDeleteConfirm] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Current plan
  const [currentPlan] = useState("pro");

  const handleSaveGeneral = () => {
    setGeneralSaving(true);
    setTimeout(() => {
      setGeneralSaving(false);
      setGeneralSaved(true);
      setTimeout(() => setGeneralSaved(false), 2500);
    }, 1000);
  };

  const handleSavePassword = () => {
    if (!currentPassword || !newPassword || newPassword !== confirmPassword)
      return;
    setPwSaving(true);
    setTimeout(() => {
      setPwSaving(false);
      setPwSaved(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => setPwSaved(false), 2500);
    }, 1000);
  };

  const handleRegenerateToken = () => {
    setRegenerating(true);
    setTimeout(() => {
      setRegenerating(false);
      setRegenerating2(true);
      setTimeout(() => setRegenerating2(false), 2500);
    }, 1200);
  };

  const handleDeleteSite = () => {
    setDeleting(true);
    setTimeout(() => {
      setDeleting(false);
      setShowDeleteDialog(false);
      setDeleteConfirm("");
    }, 1500);
  };

  return (
    <DashboardShell>
      <div className="flex-1 flex flex-col min-h-0">
        {/* Header */}
        <div className="px-8 pt-8 pb-6 border-b border-border shrink-0">
          <h1 className="text-xl font-semibold text-foreground tracking-tight">
            Settings
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Manage your site configuration and account preferences.
          </p>
        </div>

        <div className="flex flex-1 min-h-0">
          {/* Sidebar tabs */}
          <aside className="w-52 border-r border-border shrink-0 py-4 px-2 space-y-0.5">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-150 ${
                  activeTab === id
                    ? "bg-accent text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                } ${id === "danger" ? "text-destructive hover:text-destructive mt-4" : ""}`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {label}
              </button>
            ))}
          </aside>

          {/* Panel */}
          <div className="flex-1 overflow-y-auto px-8 py-6 space-y-8">
            {/* ── General ── */}
            {activeTab === "general" && (
              <div className="max-w-xl space-y-6">
                <div>
                  <h2 className="text-base font-semibold text-foreground mb-4">
                    General
                  </h2>
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-foreground">
                        Site Name
                      </label>
                      <Input
                        value={siteName}
                        onChange={(e) => setSiteName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-foreground">
                        Site Slug
                      </label>
                      <div className="flex items-center gap-0">
                        <span className="px-3 py-2 text-sm text-muted-foreground border border-border border-r-0 rounded-l-md bg-muted/40">
                          webcraft.io/
                        </span>
                        <Input
                          className="rounded-l-none"
                          value={siteSlug}
                          onChange={(e) =>
                            setSiteSlug(
                              e.target.value.toLowerCase().replace(/\s+/g, "-"),
                            )
                          }
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-foreground">
                        Timezone
                      </label>
                      <select
                        value={timezone}
                        onChange={(e) => setTimezone(e.target.value)}
                        className="w-full px-3 py-2 text-sm rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      >
                        <option value="UTC">UTC</option>
                        <option value="America/New_York">
                          Eastern Time (ET)
                        </option>
                        <option value="America/Los_Angeles">
                          Pacific Time (PT)
                        </option>
                        <option value="Europe/London">London (GMT)</option>
                        <option value="Europe/Berlin">Berlin (CET)</option>
                        <option value="Asia/Tokyo">Tokyo (JST)</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-2 pt-2">
                      <Button
                        onClick={handleSaveGeneral}
                        disabled={generalSaving || generalSaved}
                        size="sm"
                      >
                        {generalSaving ? (
                          <Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" />
                        ) : generalSaved ? (
                          <Check className="w-3.5 h-3.5 mr-2 text-emerald-500" />
                        ) : null}
                        {generalSaved ? "Saved" : "Save Changes"}
                      </Button>
                    </div>
                  </div>
                </div>

                <hr className="border-border" />

                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3">
                    Site URL
                  </h3>
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/40 border border-border text-sm">
                    <Globe className="w-4 h-4 text-muted-foreground shrink-0" />
                    <span className="text-foreground font-mono">
                      https://webcraft.io/{siteSlug}
                    </span>
                    <Badge variant="secondary" className="ml-auto text-xs">
                      Live
                    </Badge>
                  </div>
                </div>
              </div>
            )}

            {/* ── Appearance ── */}
            {activeTab === "appearance" && (
              <div className="max-w-xl space-y-6">
                <h2 className="text-base font-semibold text-foreground">
                  Appearance
                </h2>
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">
                      Accent Color
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={accentColor}
                        onChange={(e) => setAccentColor(e.target.value)}
                        className="w-10 h-10 rounded-md border border-border cursor-pointer bg-transparent p-0.5"
                      />
                      <Input
                        value={accentColor}
                        onChange={(e) => setAccentColor(e.target.value)}
                        className="font-mono w-32"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">
                      Body Font
                    </label>
                    <select
                      value={font}
                      onChange={(e) => setFont(e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="inter">Inter</option>
                      <option value="geist">Geist</option>
                      <option value="manrope">Manrope</option>
                      <option value="system">System Default</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">
                      Border Radius
                    </label>
                    <div className="flex gap-2">
                      {(["none", "sm", "md", "lg", "full"] as const).map(
                        (r) => (
                          <button
                            key={r}
                            onClick={() => setBorderRadius(r)}
                            className={`px-3 py-1.5 text-xs rounded border transition-all ${
                              borderRadius === r
                                ? "border-foreground bg-foreground text-background"
                                : "border-border text-muted-foreground hover:border-foreground/40"
                            }`}
                          >
                            {r}
                          </button>
                        ),
                      )}
                    </div>
                  </div>
                  <div className="pt-2">
                    <Button size="sm">Save Appearance</Button>
                  </div>
                </div>
              </div>
            )}

            {/* ── Notifications ── */}
            {activeTab === "notifications" && (
              <div className="max-w-xl space-y-6">
                <h2 className="text-base font-semibold text-foreground">
                  Notifications
                </h2>
                <div className="divide-y divide-border rounded-lg border border-border overflow-hidden">
                  {(Object.keys(notifs) as (keyof typeof notifs)[]).map(
                    (key) => {
                      const labels: Record<
                        keyof typeof notifs,
                        { title: string; desc: string }
                      > = {
                        deployments: {
                          title: "Deployments",
                          desc: "Get notified when a deployment succeeds or fails.",
                        },
                        formSubmissions: {
                          title: "Form Submissions",
                          desc: "New form submission notifications.",
                        },
                        teamInvites: {
                          title: "Team Invites",
                          desc: "When someone accepts or declines an invite.",
                        },
                        billing: {
                          title: "Billing",
                          desc: "Receipts, renewals, and payment failures.",
                        },
                        securityAlerts: {
                          title: "Security Alerts",
                          desc: "Unusual login activity or security events.",
                        },
                        weeklyDigest: {
                          title: "Weekly Digest",
                          desc: "A weekly summary of your site's activity.",
                        },
                      };
                      return (
                        <div
                          key={key}
                          className="flex items-center justify-between px-4 py-3.5 bg-background"
                        >
                          <div>
                            <p className="text-sm font-medium text-foreground">
                              {labels[key].title}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {labels[key].desc}
                            </p>
                          </div>
                          <button
                            onClick={() =>
                              setNotifs((prev) => ({
                                ...prev,
                                [key]: !prev[key],
                              }))
                            }
                            className={`relative w-10 h-5 rounded-full transition-colors ${notifs[key] ? "bg-foreground" : "bg-muted"}`}
                          >
                            <span
                              className={`absolute top-0.5 w-4 h-4 rounded-full bg-background shadow transition-transform ${notifs[key] ? "translate-x-5" : "translate-x-0.5"}`}
                            />
                          </button>
                        </div>
                      );
                    },
                  )}
                </div>
              </div>
            )}

            {/* ── Security ── */}
            {activeTab === "security" && (
              <div className="max-w-xl space-y-8">
                <div className="space-y-4">
                  <h2 className="text-base font-semibold text-foreground">
                    Change Password
                  </h2>
                  <div className="space-y-3">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-foreground">
                        Current Password
                      </label>
                      <Input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-foreground">
                        New Password
                      </label>
                      <Input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-foreground">
                        Confirm New Password
                      </label>
                      <Input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      {confirmPassword && newPassword !== confirmPassword && (
                        <p className="text-xs text-destructive mt-1">
                          Passwords do not match.
                        </p>
                      )}
                    </div>
                    <div className="pt-1">
                      <Button
                        size="sm"
                        disabled={
                          pwSaving ||
                          pwSaved ||
                          !currentPassword ||
                          !newPassword ||
                          newPassword !== confirmPassword
                        }
                        onClick={handleSavePassword}
                      >
                        {pwSaving ? (
                          <Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" />
                        ) : pwSaved ? (
                          <Check className="w-3.5 h-3.5 mr-2 text-emerald-500" />
                        ) : null}
                        {pwSaved ? "Password Updated" : "Update Password"}
                      </Button>
                    </div>
                  </div>
                </div>

                <hr className="border-border" />

                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-semibold text-foreground mb-1">
                        Two-Factor Authentication
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account.
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {twoFAEnabled && (
                        <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 text-xs">
                          Enabled
                        </Badge>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setTwoFAEnabled((p) => !p)}
                      >
                        <ShieldCheck className="w-3.5 h-3.5 mr-2" />
                        {twoFAEnabled ? "Disable 2FA" : "Enable 2FA"}
                      </Button>
                    </div>
                  </div>
                </div>

                <hr className="border-border" />

                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3">
                    Active Sessions
                  </h3>
                  <div className="space-y-2">
                    {[
                      {
                        device: "Chrome on macOS",
                        location: "San Francisco, CA",
                        time: "Active now",
                        current: true,
                      },
                      {
                        device: "Safari on iPhone",
                        location: "San Francisco, CA",
                        time: "2 hours ago",
                        current: false,
                      },
                      {
                        device: "Firefox on Windows",
                        location: "New York, NY",
                        time: "Yesterday",
                        current: false,
                      },
                    ].map((s, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between px-4 py-3 rounded-lg border border-border bg-background"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-medium text-foreground">
                              {s.device}
                            </p>
                            {s.current && (
                              <Badge variant="secondary" className="text-xs">
                                Current
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {s.location} · {s.time}
                          </p>
                        </div>
                        {!s.current && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive text-xs"
                          >
                            Revoke
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── Billing ── */}
            {activeTab === "billing" && (
              <div className="max-w-2xl space-y-8">
                <div>
                  <h2 className="text-base font-semibold text-foreground mb-4">
                    Current Plan
                  </h2>
                  <div className="grid grid-cols-3 gap-3">
                    {PLANS.map((plan) => (
                      <div
                        key={plan.id}
                        className={`relative p-4 rounded-xl border transition-all ${
                          currentPlan === plan.id
                            ? "border-foreground bg-foreground/5"
                            : "border-border hover:border-foreground/30"
                        }`}
                      >
                        {currentPlan === plan.id && (
                          <Badge className="absolute top-3 right-3 text-xs bg-foreground text-background border-0">
                            Current
                          </Badge>
                        )}
                        <p className="text-sm font-semibold text-foreground">
                          {plan.label}
                        </p>
                        <p className="text-xl font-bold text-foreground mt-1">
                          {plan.price}
                        </p>
                        <ul className="mt-3 space-y-1">
                          {plan.features.map((f) => (
                            <li
                              key={f}
                              className="flex items-center gap-1.5 text-xs text-muted-foreground"
                            >
                              <Check className="w-3 h-3 text-emerald-500 shrink-0" />
                              {f}
                            </li>
                          ))}
                        </ul>
                        {currentPlan !== plan.id && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="mt-4 w-full text-xs"
                          >
                            {PLANS.findIndex((p) => p.id === plan.id) >
                            PLANS.findIndex((p) => p.id === currentPlan)
                              ? "Upgrade"
                              : "Downgrade"}
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <hr className="border-border" />

                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3">
                    Payment Method
                  </h3>
                  <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-background">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-7 rounded bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                        <CreditCard className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          Visa ending in 4242
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Expires 12/26
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Update
                    </Button>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3">
                    Billing History
                  </h3>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left pb-2 text-xs font-medium text-muted-foreground">
                          Date
                        </th>
                        <th className="text-left pb-2 text-xs font-medium text-muted-foreground">
                          Description
                        </th>
                        <th className="text-left pb-2 text-xs font-medium text-muted-foreground">
                          Amount
                        </th>
                        <th className="text-left pb-2 text-xs font-medium text-muted-foreground">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {[
                        {
                          date: "Dec 1, 2024",
                          desc: "Pro Plan — Monthly",
                          amount: "$19.00",
                          status: "Paid",
                        },
                        {
                          date: "Nov 1, 2024",
                          desc: "Pro Plan — Monthly",
                          amount: "$19.00",
                          status: "Paid",
                        },
                        {
                          date: "Oct 1, 2024",
                          desc: "Pro Plan — Monthly",
                          amount: "$19.00",
                          status: "Paid",
                        },
                      ].map((inv, i) => (
                        <tr key={i}>
                          <td className="py-3 text-muted-foreground">
                            {inv.date}
                          </td>
                          <td className="py-3 text-foreground">{inv.desc}</td>
                          <td className="py-3 text-foreground font-medium">
                            {inv.amount}
                          </td>
                          <td className="py-3">
                            <Badge
                              variant="secondary"
                              className="text-xs bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                            >
                              {inv.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ── Developer ── */}
            {activeTab === "developer" && (
              <div className="max-w-xl space-y-8">
                <div>
                  <h2 className="text-base font-semibold text-foreground mb-4">
                    API Token
                  </h2>
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Use this token to authenticate API requests. Keep it
                      secret.
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-md border border-border bg-muted/40 font-mono text-sm text-foreground overflow-hidden">
                        <span className="truncate">
                          {showToken
                            ? "sk_live_WebCraft_aBcDeFgHiJkLmNoPqRsTuVwXyZ01234567"
                            : apiToken}
                        </span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowToken((p) => !p)}
                      >
                        {showToken ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleRegenerateToken}
                        disabled={regenerating}
                      >
                        {regenerating ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <RefreshCw className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                    {regenerated && (
                      <p className="text-xs text-emerald-500">
                        Token regenerated. Update your integrations.
                      </p>
                    )}
                  </div>
                </div>

                <hr className="border-border" />

                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3">
                    Webhook URL
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    WebCraft will POST events to this URL on key actions.
                  </p>
                  <div className="flex gap-2">
                    <Input
                      value={webhookUrl}
                      onChange={(e) => setWebhookUrl(e.target.value)}
                      placeholder="https://your-app.com/webhook"
                    />
                    <Button variant="outline" size="sm">
                      Save
                    </Button>
                  </div>
                </div>

                <hr className="border-border" />

                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3">
                    API Documentation
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      {
                        title: "REST API Reference",
                        desc: "Full CRUD API docs for sites, pages, and data.",
                      },
                      {
                        title: "Webhooks Guide",
                        desc: "Events, payloads, and verification details.",
                      },
                      {
                        title: "SDK — JavaScript",
                        desc: "Official JS/TS SDK with TypeScript types.",
                      },
                      {
                        title: "CLI Reference",
                        desc: "Deploy and manage sites from the terminal.",
                      },
                    ].map((doc) => (
                      <button
                        key={doc.title}
                        className="text-left p-4 rounded-lg border border-border hover:border-foreground/30 bg-background transition-all"
                      >
                        <p className="text-sm font-medium text-foreground">
                          {doc.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {doc.desc}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── Danger Zone ── */}
            {activeTab === "danger" && (
              <div className="max-w-xl space-y-6">
                <h2 className="text-base font-semibold text-foreground">
                  Danger Zone
                </h2>
                <div className="rounded-xl border border-destructive/30 overflow-hidden">
                  <div className="px-5 py-4 flex items-start justify-between gap-6">
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        Transfer Ownership
                      </p>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        Transfer this site to another account. This cannot be
                        undone.
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="shrink-0">
                      Transfer
                    </Button>
                  </div>
                  <div className="border-t border-destructive/20 px-5 py-4 flex items-start justify-between gap-6">
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        Export Site Data
                      </p>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        Download all your site data, pages, and assets as a ZIP.
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="shrink-0">
                      Export
                    </Button>
                  </div>
                  <div className="border-t border-destructive/20 px-5 py-4 flex items-start justify-between gap-6">
                    <div>
                      <p className="text-sm font-semibold text-destructive font-semibold">
                        Delete Site
                      </p>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        Permanently delete this site and all its data. This
                        action cannot be reversed.
                      </p>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="shrink-0"
                      onClick={() => setShowDeleteDialog(true)}
                    >
                      <Trash2 className="w-3.5 h-3.5 mr-2" />
                      Delete Site
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-destructive">Delete Site</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            This will permanently delete{" "}
            <strong className="text-foreground">{siteName}</strong> and all
            associated data including pages, media, forms, backups, and
            configurations.
          </p>
          <div className="space-y-1.5 mt-2">
            <label className="text-sm font-medium text-foreground">
              Type{" "}
              <span className="font-mono text-destructive">{siteSlug}</span> to
              confirm.
            </label>
            <Input
              value={deleteConfirm}
              onChange={(e) => setDeleteConfirm(e.target.value)}
              placeholder={siteSlug}
            />
          </div>
          <DialogFooter className="mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowDeleteDialog(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              size="sm"
              disabled={deleteConfirm !== siteSlug || deleting}
              onClick={handleDeleteSite}
            >
              {deleting && (
                <Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" />
              )}
              Delete Permanently
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardShell>
  );
}
