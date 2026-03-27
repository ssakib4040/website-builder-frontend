"use client";

import { useState } from "react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Search,
  CheckCircle2,
  Plus,
  ExternalLink,
  Settings,
  Zap,
} from "lucide-react";

type Category =
  | "All"
  | "Payments"
  | "Analytics"
  | "Email"
  | "Automation"
  | "CRM"
  | "Storage";

interface Integration {
  id: string;
  name: string;
  description: string;
  category: Category;
  logo: string;
  connected: boolean;
  popular?: boolean;
  docsUrl?: string;
}

const mockIntegrations: Integration[] = [
  {
    id: "stripe",
    name: "Stripe",
    description:
      "Accept payments, manage subscriptions, and handle invoicing directly from your site.",
    category: "Payments",
    logo: "S",
    connected: true,
    popular: true,
  },
  {
    id: "ga",
    name: "Google Analytics",
    description:
      "Track visitors, measure engagement, and get actionable insights about your audience.",
    category: "Analytics",
    logo: "G",
    connected: true,
    popular: true,
  },
  {
    id: "mailchimp",
    name: "Mailchimp",
    description:
      "Grow your email list and run automated marketing campaigns from form submissions.",
    category: "Email",
    logo: "M",
    connected: false,
    popular: true,
  },
  {
    id: "slack",
    name: "Slack",
    description:
      "Receive real-time notifications for form submissions, deployments, and team activity.",
    category: "Automation",
    logo: "SL",
    connected: true,
  },
  {
    id: "zapier",
    name: "Zapier",
    description:
      "Connect your site to 5,000+ apps and automate workflows without writing code.",
    category: "Automation",
    logo: "Z",
    connected: false,
    popular: true,
  },
  {
    id: "hubspot",
    name: "HubSpot",
    description:
      "Sync form submissions and contacts with your CRM pipeline automatically.",
    category: "CRM",
    logo: "H",
    connected: false,
  },
  {
    id: "airtable",
    name: "Airtable",
    description:
      "Send form data directly to your Airtable bases and keep records in sync.",
    category: "Automation",
    logo: "A",
    connected: false,
  },
  {
    id: "sendgrid",
    name: "SendGrid",
    description:
      "Send transactional and marketing emails at scale via a trusted email delivery platform.",
    category: "Email",
    logo: "SG",
    connected: false,
  },
  {
    id: "intercom",
    name: "Intercom",
    description:
      "Add live chat and user messaging to your site to boost conversions and support.",
    category: "CRM",
    logo: "I",
    connected: false,
  },
  {
    id: "typeform",
    name: "Typeform",
    description:
      "Embed interactive Typeform surveys and lead generation forms anywhere on your site.",
    category: "Automation",
    logo: "T",
    connected: false,
  },
  {
    id: "s3",
    name: "Amazon S3",
    description:
      "Store and serve large assets like videos and downloads from your own S3 bucket.",
    category: "Storage",
    logo: "S3",
    connected: false,
  },
  {
    id: "mixpanel",
    name: "Mixpanel",
    description:
      "Deep product analytics: funnels, retention, user paths, and custom event tracking.",
    category: "Analytics",
    logo: "MP",
    connected: false,
  },
];

const categoryColors: Record<Category, string> = {
  All: "",
  Payments:
    "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400",
  Analytics:
    "bg-blue-500/10 text-blue-600 border-blue-500/20 dark:text-blue-400",
  Email:
    "bg-violet-500/10 text-violet-600 border-violet-500/20 dark:text-violet-400",
  Automation:
    "bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-400",
  CRM: "bg-pink-500/10 text-pink-600 border-pink-500/20 dark:text-pink-400",
  Storage:
    "bg-orange-500/10 text-orange-600 border-orange-500/20 dark:text-orange-400",
};

const logoColors: Record<string, string> = {
  S: "bg-[#635BFF] text-white",
  G: "bg-[#EA4335] text-white",
  M: "bg-[#FFE01B] text-black",
  SL: "bg-[#4A154B] text-white",
  Z: "bg-[#FF4A00] text-white",
  H: "bg-[#FF7A59] text-white",
  A: "bg-[#FCB400] text-black",
  SG: "bg-[#1A82E2] text-white",
  I: "bg-[#1F8DED] text-white",
  T: "bg-[#262627] text-white",
  S3: "bg-[#FF9900] text-white",
  MP: "bg-[#7856FF] text-white",
};

const categories: Category[] = [
  "All",
  "Payments",
  "Analytics",
  "Email",
  "Automation",
  "CRM",
  "Storage",
];

export default function IntegrationsPage() {
  const [integrations, setIntegrations] =
    useState<Integration[]>(mockIntegrations);
  const [category, setCategory] = useState<Category>("All");
  const [search, setSearch] = useState("");
  const [configuring, setConfiguring] = useState<Integration | null>(null);

  const filtered = integrations.filter((i) => {
    const matchCat = category === "All" || i.category === category;
    const matchSearch =
      i.name.toLowerCase().includes(search.toLowerCase()) ||
      i.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const connectedCount = integrations.filter((i) => i.connected).length;

  const handleToggle = (id: string) => {
    setIntegrations((prev) =>
      prev.map((i) => (i.id === id ? { ...i, connected: !i.connected } : i)),
    );
  };

  return (
    <DashboardShell>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="border-b border-border px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-foreground">
              Integrations
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {connectedCount} of {integrations.length} integrations connected
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search integrations…"
                className="pl-9 h-9 w-56 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Category filter */}
        <div className="border-b border-border px-6 flex items-center gap-1 overflow-x-auto">
          {categories.map((cat) => {
            const count =
              cat === "All"
                ? integrations.length
                : integrations.filter((i) => i.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  category === cat
                    ? "border-foreground text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}{" "}
                <span className="text-xs ml-0.5 opacity-60">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div className="flex-1 overflow-auto p-6">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <Zap className="w-10 h-10 text-muted-foreground/40 mb-3" />
              <p className="text-sm font-medium text-muted-foreground">
                No integrations found
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((integration) => (
                <div
                  key={integration.id}
                  className={`border rounded-xl p-5 bg-card transition-all ${integration.connected ? "border-foreground/30" : "border-border hover:border-foreground/20"}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 ${logoColors[integration.logo] ?? "bg-muted text-foreground"}`}
                      >
                        {integration.logo}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-foreground">
                            {integration.name}
                          </span>
                          {integration.popular && (
                            <Badge
                              variant="outline"
                              className="text-[10px] px-1.5"
                            >
                              Popular
                            </Badge>
                          )}
                        </div>
                        <Badge
                          variant="outline"
                          className={`text-[10px] mt-0.5 ${categoryColors[integration.category]}`}
                        >
                          {integration.category}
                        </Badge>
                      </div>
                    </div>
                    {integration.connected && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    )}
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                    {integration.description}
                  </p>

                  <div className="flex items-center gap-2">
                    {integration.connected ? (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 text-xs h-8"
                          onClick={() => setConfiguring(integration)}
                        >
                          <Settings className="w-3.5 h-3.5 mr-1.5" />
                          Configure
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs h-8 text-destructive hover:text-destructive"
                          onClick={() => handleToggle(integration.id)}
                        >
                          Disconnect
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          size="sm"
                          className="flex-1 text-xs h-8"
                          onClick={() => handleToggle(integration.id)}
                        >
                          <Plus className="w-3.5 h-3.5 mr-1.5" />
                          Connect
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Configure modal */}
      <Dialog open={!!configuring} onOpenChange={() => setConfiguring(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Configure {configuring?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {configuring?.id === "stripe" && (
              <>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    Publishable Key
                  </label>
                  <Input
                    defaultValue="pk_live_51N••••••••••••••••••••••••"
                    type="password"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    Secret Key
                  </label>
                  <Input
                    defaultValue="sk_live_51N••••••••••••••••••••••••"
                    type="password"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    Webhook Secret
                  </label>
                  <Input
                    defaultValue="whsec_••••••••••••••••••••••••"
                    type="password"
                  />
                </div>
              </>
            )}
            {configuring?.id === "ga" && (
              <>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    Measurement ID
                  </label>
                  <Input defaultValue="G-XXXXXXXXXX" />
                </div>
              </>
            )}
            {configuring?.id === "slack" && (
              <>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    Webhook URL
                  </label>
                  <Input defaultValue="https://hooks.slack.com/services/T00••••/B00••••/••••" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    Channel
                  </label>
                  <Input defaultValue="#deployments" />
                </div>
              </>
            )}
            {!["stripe", "ga", "slack"].includes(configuring?.id ?? "") && (
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">
                  API Key
                </label>
                <Input
                  defaultValue="••••••••••••••••••••••••"
                  type="password"
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfiguring(null)}>
              Cancel
            </Button>
            <Button onClick={() => setConfiguring(null)}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardShell>
  );
}
