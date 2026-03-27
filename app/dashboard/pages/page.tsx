"use client";

import { useState } from "react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { useEditorStore } from "@/lib/builder/store";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Plus,
  FileText,
  AlertTriangle,
  ServerCrash,
  Mail,
  Scale,
  Globe,
  KeyRound,
  BookOpen,
  Trash2,
  Pencil,
  ExternalLink,
  X,
  WifiOff,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import { PageCategory } from "@/lib/builder/types";

const categoryMeta: Record<PageCategory, { label: string; color: string }> = {
  marketing: { label: "Marketing", color: "bg-blue-500/15 text-blue-500" },
  blog: { label: "Blog", color: "bg-amber-500/15 text-amber-500" },
  auth: { label: "Auth", color: "bg-violet-500/15 text-violet-500" },
  legal: { label: "Legal", color: "bg-slate-500/15 text-slate-400" },
  email: { label: "Email", color: "bg-emerald-500/15 text-emerald-500" },
  error: { label: "Error", color: "bg-red-500/15 text-red-400" },
  other: { label: "Other", color: "bg-accent text-muted-foreground" },
};

function pageIcon(route: string, category: PageCategory) {
  if (route === "/404" || route === "/500") return AlertTriangle;
  if (route === "/503") return Wrench;
  if (route === "/offline") return WifiOff;
  if (route.startsWith("/500")) return ServerCrash;
  if (category === "email") return Mail;
  if (category === "legal") return Scale;
  if (category === "auth") return KeyRound;
  if (category === "blog") return BookOpen;
  if (route === "/") return Globe;
  return FileText;
}

export default function PagesPage() {
  const {
    pages,
    activePageId,
    setActivePage,
    addPage,
    removePage,
    renamePage,
  } = useEditorStore();
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState("");
  const [newRoute, setNewRoute] = useState("/");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [filter, setFilter] = useState<PageCategory | "all">("all");

  function handleAdd() {
    if (!newName.trim()) return;
    const route = newRoute.startsWith("/") ? newRoute : `/${newRoute}`;
    addPage(newName.trim(), route);
    setNewName("");
    setNewRoute("/");
    setShowAdd(false);
  }

  const categories: (PageCategory | "all")[] = [
    "all",
    "marketing",
    "blog",
    "auth",
    "legal",
    "email",
    "error",
    "other",
  ];

  const filteredPages =
    filter === "all" ? pages : pages.filter((p) => p.category === filter);

  // Group by category for display
  type Group = { category: PageCategory; pages: typeof pages };
  const groups: Group[] = [];
  if (filter === "all") {
    const order: PageCategory[] = [
      "marketing",
      "blog",
      "auth",
      "legal",
      "email",
      "error",
      "other",
    ];
    for (const cat of order) {
      const pg = pages.filter((p) => p.category === cat);
      if (pg.length > 0) groups.push({ category: cat, pages: pg });
    }
  } else {
    groups.push({ category: filter as PageCategory, pages: filteredPages });
  }

  return (
    <DashboardShell>
      {/* Header */}
      <div className="px-6 py-4 border-b border-border flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-lg font-semibold text-foreground">Pages</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {pages.length} pages across {categories.length - 1} categories ·
            click &ldquo;Edit&rdquo; to open the visual builder
          </p>
        </div>
        <Button
          size="sm"
          className="h-8 text-xs gap-1.5"
          onClick={() => setShowAdd(!showAdd)}
        >
          {showAdd ? (
            <X className="w-3.5 h-3.5" />
          ) : (
            <Plus className="w-3.5 h-3.5" />
          )}
          {showAdd ? "Cancel" : "New Page"}
        </Button>
      </div>

      {/* Add form */}
      {showAdd && (
        <div className="px-6 py-4 border-b border-border">
          <div className="flex gap-2 max-w-lg">
            <Input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Page name"
              className="h-8 text-sm"
              autoFocus
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            />
            <Input
              value={newRoute}
              onChange={(e) => setNewRoute(e.target.value)}
              placeholder="/route"
              className="h-8 text-sm font-mono w-44"
            />
            <Button
              size="sm"
              className="h-8 text-xs px-4"
              onClick={handleAdd}
              disabled={!newName.trim()}
            >
              Add
            </Button>
          </div>
        </div>
      )}

      {/* Category filter tabs */}
      <div className="px-6 py-2.5 border-b border-border flex items-center gap-1.5 overflow-x-auto shrink-0">
        {categories.map((cat) => {
          const label = cat === "all" ? "All" : categoryMeta[cat].label;
          const count =
            cat === "all"
              ? pages.length
              : pages.filter((p) => p.category === cat).length;
          const isActive = filter === cat;
          return (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
                isActive
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/60"
              }`}
            >
              {label}
              <span
                className={`text-[10px] px-1 rounded-sm ${
                  isActive ? "bg-background/20" : "bg-accent"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Pages list */}
      <ScrollArea className="flex-1">
        <div className="p-6 space-y-6">
          {groups.map(({ category, pages: groupPages }) => (
            <div key={category}>
              {filter === "all" && (
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full ${categoryMeta[category].color}`}
                  >
                    {categoryMeta[category].label}
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    {groupPages.length} pages
                  </span>
                </div>
              )}
              <div className="space-y-1">
                {groupPages.map((page) => {
                  const isActive = page.id === activePageId;
                  const IconComp = pageIcon(page.route, page.category);
                  return (
                    <div
                      key={page.id}
                      className={`group flex items-center gap-3 px-4 py-2.5 rounded-lg border transition-colors duration-100 ${
                        isActive
                          ? "border-foreground/20 bg-accent/50"
                          : "border-border hover:bg-accent/30"
                      }`}
                    >
                      <IconComp className="w-4 h-4 text-muted-foreground shrink-0" />

                      <div className="flex-1 min-w-0">
                        {editingId === page.id ? (
                          <input
                            className="bg-transparent text-sm font-medium outline-none border-b border-foreground/30 w-full"
                            value={page.name}
                            onChange={(e) =>
                              renamePage(page.id, e.target.value)
                            }
                            onBlur={() => setEditingId(null)}
                            onKeyDown={(e) =>
                              e.key === "Enter" && setEditingId(null)
                            }
                            autoFocus
                          />
                        ) : (
                          <p className="text-sm font-medium text-foreground truncate">
                            {page.name}
                          </p>
                        )}
                        <p className="text-xs text-muted-foreground font-mono">
                          {page.route}
                        </p>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        {page.isSystem && (
                          <span className="text-[10px] text-muted-foreground bg-accent px-1.5 py-0.5 rounded mr-1">
                            System
                          </span>
                        )}
                        {filter === "all" && (
                          <span
                            className={`text-[10px] font-medium px-1.5 py-0.5 rounded mr-1 ${categoryMeta[page.category].color}`}
                          >
                            {categoryMeta[page.category].label}
                          </span>
                        )}

                        {!page.isSystem && (
                          <button
                            className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors opacity-0 group-hover:opacity-100"
                            onClick={() => setEditingId(page.id)}
                            title="Rename"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                        )}

                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 text-xs gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          asChild
                          onClick={() => setActivePage(page.id)}
                        >
                          <Link href={`/builder?page=${page.id}`}>
                            <ExternalLink className="w-3 h-3" />
                            Edit
                          </Link>
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 text-xs gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          asChild
                        >
                          <Link href={page.route} target="_blank">
                            <Globe className="w-3 h-3" />
                            Visit
                          </Link>
                        </Button>

                        {!page.isSystem && (
                          <button
                            className="p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors opacity-0 group-hover:opacity-100"
                            onClick={() => removePage(page.id)}
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </DashboardShell>
  );
}
