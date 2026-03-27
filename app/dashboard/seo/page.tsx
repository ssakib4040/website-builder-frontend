"use client";

import { useState } from "react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Search,
  ExternalLink,
  ArrowRight,
  Trash2,
  Check,
  Info,
  FileText,
  Map,
} from "lucide-react";

interface PageSeo {
  id: string;
  path: string;
  title: string;
  description: string;
  indexing: "index" | "noindex";
}

interface Redirect {
  id: string;
  from: string;
  to: string;
  type: "301" | "302";
}

const mockPages: PageSeo[] = [
  {
    id: "1",
    path: "/",
    title: "WebCraft — Build your website, no code needed",
    description:
      "Create beautiful, fast websites with our no-code drag-and-drop builder.",
    indexing: "index",
  },
  {
    id: "2",
    path: "/pricing",
    title: "Pricing — WebCraft",
    description:
      "Simple, transparent pricing for everyone. Start free, scale as you grow.",
    indexing: "index",
  },
  {
    id: "3",
    path: "/blog",
    title: "Blog — WebCraft",
    description: "Tips, guides, and updates from the WebCraft team.",
    indexing: "index",
  },
  {
    id: "4",
    path: "/privacy",
    title: "Privacy Policy — WebCraft",
    description: "Our privacy policy and data handling practices.",
    indexing: "noindex",
  },
  {
    id: "5",
    path: "/contact",
    title: "Contact Us — WebCraft",
    description: "Get in touch with the WebCraft team for support or sales.",
    indexing: "index",
  },
];

const mockRedirects: Redirect[] = [
  { id: "1", from: "/home", to: "/", type: "301" },
  { id: "2", from: "/blog/old-post", to: "/blog/new-post", type: "301" },
  { id: "3", from: "/signup", to: "/auth/register", type: "302" },
];

export default function SeoPage() {
  const [defaultTitle, setDefaultTitle] = useState(
    "WebCraft — Build your website, no code needed",
  );
  const [defaultDesc, setDefaultDesc] = useState(
    "Create beautiful, fast websites with our no-code drag-and-drop builder. No technical knowledge required.",
  );
  const [robots, setRobots] = useState(
    "User-agent: *\nAllow: /\nDisallow: /dashboard/\nDisallow: /api/\nSitemap: https://mysite.com/sitemap.xml",
  );
  const [pages, setPages] = useState<PageSeo[]>(mockPages);
  const [redirects, setRedirects] = useState<Redirect[]>(mockRedirects);
  const [pageSearch, setPageSearch] = useState("");
  const [saved, setSaved] = useState(false);

  const [newFrom, setNewFrom] = useState("");
  const [newTo, setNewTo] = useState("");
  const [newType, setNewType] = useState<"301" | "302">("301");

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleToggleIndex = (id: string) => {
    setPages((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, indexing: p.indexing === "index" ? "noindex" : "index" }
          : p,
      ),
    );
  };

  const handleAddRedirect = () => {
    if (!newFrom.trim() || !newTo.trim()) return;
    setRedirects((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        from: newFrom.trim(),
        to: newTo.trim(),
        type: newType,
      },
    ]);
    setNewFrom("");
    setNewTo("");
  };

  const handleDeleteRedirect = (id: string) => {
    setRedirects((prev) => prev.filter((r) => r.id !== id));
  };

  const filteredPages = pages.filter(
    (p) =>
      p.path.toLowerCase().includes(pageSearch.toLowerCase()) ||
      p.title.toLowerCase().includes(pageSearch.toLowerCase()),
  );

  return (
    <DashboardShell>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="border-b border-border px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-foreground">SEO</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Meta tags, sitemap, robots.txt, and redirect rules
            </p>
          </div>
          <Button size="sm" onClick={handleSave} disabled={saved}>
            {saved ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Saved
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>

        <div className="flex-1 overflow-auto p-6 space-y-6">
          {/* Default meta */}
          <section className="border border-border rounded-xl bg-card overflow-hidden">
            <div className="px-5 py-3.5 border-b border-border flex items-center gap-2">
              <FileText className="w-4 h-4 text-muted-foreground" />
              <h2 className="text-sm font-semibold text-foreground">
                Default Meta
              </h2>
              <span className="text-xs text-muted-foreground ml-auto">
                Applied when no page-level override exists
              </span>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5 block">
                  Default Title
                </label>
                <Input
                  value={defaultTitle}
                  onChange={(e) => setDefaultTitle(e.target.value)}
                  placeholder="My Site — Tagline"
                  maxLength={60}
                />
                <div className="flex items-center justify-between mt-1">
                  <p className="text-xs text-muted-foreground">
                    Recommended: 50–60 characters
                  </p>
                  <span
                    className={`text-xs ${defaultTitle.length > 60 ? "text-red-500" : "text-muted-foreground"}`}
                  >
                    {defaultTitle.length}/60
                  </span>
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5 block">
                  Default Description
                </label>
                <Textarea
                  value={defaultDesc}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setDefaultDesc(e.target.value)
                  }
                  placeholder="Describe your site in 150–160 characters"
                  rows={3}
                  maxLength={160}
                  className="resize-none text-sm"
                />
                <div className="flex items-center justify-between mt-1">
                  <p className="text-xs text-muted-foreground">
                    Recommended: 150–160 characters
                  </p>
                  <span
                    className={`text-xs ${defaultDesc.length > 160 ? "text-red-500" : "text-muted-foreground"}`}
                  >
                    {defaultDesc.length}/160
                  </span>
                </div>
              </div>

              {/* SERP preview */}
              <div className="border border-border rounded-lg p-4 bg-muted/20">
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2 font-medium">
                  Search Preview
                </p>
                <div className="text-xs text-emerald-700 dark:text-emerald-400 font-mono mb-0.5">
                  mysite.com
                </div>
                <div className="text-base font-medium text-blue-700 dark:text-blue-400 leading-tight hover:underline cursor-pointer truncate">
                  {defaultTitle || "Page Title"}
                </div>
                <div className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  {defaultDesc || "Meta description will appear here…"}
                </div>
              </div>
            </div>
          </section>

          {/* Open Graph */}
          <section className="border border-border rounded-xl bg-card overflow-hidden">
            <div className="px-5 py-3.5 border-b border-border flex items-center gap-2">
              <Info className="w-4 h-4 text-muted-foreground" />
              <h2 className="text-sm font-semibold text-foreground">
                Open Graph / Social Sharing
              </h2>
            </div>
            <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5 block">
                  OG Title
                </label>
                <Input
                  defaultValue={defaultTitle}
                  placeholder="Social share title"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5 block">
                  OG Image URL
                </label>
                <div className="flex gap-2">
                  <Input
                    defaultValue="https://mysite.com/og-image.png"
                    placeholder="https://…"
                    className="flex-1"
                  />
                  <Button variant="outline" size="sm" className="shrink-0">
                    Browse
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Recommended: 1200×630 px image
                </p>
              </div>
            </div>
          </section>

          {/* Sitemap & Robots */}
          <section className="border border-border rounded-xl bg-card overflow-hidden">
            <div className="px-5 py-3.5 border-b border-border flex items-center gap-2">
              <Map className="w-4 h-4 text-muted-foreground" />
              <h2 className="text-sm font-semibold text-foreground">
                Sitemap & robots.txt
              </h2>
            </div>
            <div className="p-5 space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    XML Sitemap
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Auto-generated and updated on each deployment
                  </p>
                </div>
                <a
                  href="/sitemap.xml"
                  className="flex items-center gap-1.5 text-xs font-medium text-foreground hover:underline"
                >
                  View sitemap <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5 block">
                  robots.txt
                </label>
                <Textarea
                  value={robots}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setRobots(e.target.value)
                  }
                  rows={6}
                  className="font-mono text-xs resize-none"
                />
              </div>
            </div>
          </section>

          {/* Per-page SEO */}
          <section className="border border-border rounded-xl bg-card overflow-hidden">
            <div className="px-5 py-3.5 border-b border-border flex items-center gap-2">
              <FileText className="w-4 h-4 text-muted-foreground" />
              <h2 className="text-sm font-semibold text-foreground">
                Per-page SEO
              </h2>
              <div className="ml-auto relative w-56">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <Input
                  value={pageSearch}
                  onChange={(e) => setPageSearch(e.target.value)}
                  placeholder="Search pages…"
                  className="pl-8 h-7 text-xs"
                />
              </div>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/20">
                  {["Path", "Title", "Indexing"].map((h) => (
                    <th
                      key={h}
                      className="text-left px-5 py-2.5 text-xs font-medium text-muted-foreground uppercase tracking-wide"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredPages.map((page) => (
                  <tr
                    key={page.id}
                    className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
                  >
                    <td className="px-5 py-3 font-mono text-xs text-foreground">
                      {page.path}
                    </td>
                    <td className="px-5 py-3 max-w-75">
                      <div className="text-sm text-foreground truncate">
                        {page.title}
                      </div>
                      <div className="text-xs text-muted-foreground truncate">
                        {page.description}
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <button onClick={() => handleToggleIndex(page.id)}>
                        <Badge
                          variant="outline"
                          className={`text-xs cursor-pointer transition-colors ${
                            page.indexing === "index"
                              ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {page.indexing}
                        </Badge>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* Redirects */}
          <section className="border border-border rounded-xl bg-card overflow-hidden">
            <div className="px-5 py-3.5 border-b border-border flex items-center gap-2">
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
              <h2 className="text-sm font-semibold text-foreground">
                Redirect Rules
              </h2>
            </div>
            <div className="p-5 space-y-3">
              {/* Add new */}
              <div className="flex gap-2 items-center">
                <Input
                  value={newFrom}
                  onChange={(e) => setNewFrom(e.target.value)}
                  placeholder="/old-path"
                  className="h-8 text-sm font-mono flex-1"
                />
                <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0" />
                <Input
                  value={newTo}
                  onChange={(e) => setNewTo(e.target.value)}
                  placeholder="/new-path"
                  className="h-8 text-sm font-mono flex-1"
                />
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value as "301" | "302")}
                  className="h-8 text-sm border border-border rounded-md px-2 bg-background text-foreground"
                >
                  <option value="301">301</option>
                  <option value="302">302</option>
                </select>
                <Button
                  size="sm"
                  onClick={handleAddRedirect}
                  className="h-8 shrink-0"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              {/* Existing redirects */}
              <div className="divide-y divide-border border border-border rounded-lg overflow-hidden">
                {redirects.map((r) => (
                  <div
                    key={r.id}
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-muted/20 transition-colors"
                  >
                    <code className="text-xs font-mono text-foreground flex-1">
                      {r.from}
                    </code>
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                    <code className="text-xs font-mono text-foreground flex-1">
                      {r.to}
                    </code>
                    <Badge
                      variant="outline"
                      className="text-xs font-mono shrink-0"
                    >
                      {r.type}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-destructive hover:text-destructive shrink-0"
                      onClick={() => handleDeleteRedirect(r.id)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </DashboardShell>
  );
}
