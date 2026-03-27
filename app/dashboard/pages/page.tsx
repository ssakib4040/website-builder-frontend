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
  Trash2,
  Pencil,
  ExternalLink,
  X,
} from "lucide-react";
import Link from "next/link";

export default function PagesPage() {
  const { pages, activePageId, setActivePage, addPage, removePage, renamePage } =
    useEditorStore();
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState("");
  const [newRoute, setNewRoute] = useState("/");
  const [editingId, setEditingId] = useState<string | null>(null);

  function handleAdd() {
    if (!newName.trim()) return;
    const route = newRoute.startsWith("/") ? newRoute : `/${newRoute}`;
    addPage(newName.trim(), route);
    setNewName("");
    setNewRoute("/");
    setShowAdd(false);
  }

  return (
    <DashboardShell>
      {/* Header */}
      <div className="px-6 py-5 border-b border-border flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-foreground">Pages</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Create and manage your website pages. Click &ldquo;Edit&rdquo; to
            open the visual builder.
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
        <div className="px-6 py-4 border-b border-border bg-accent/10">
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
              className="h-8 text-sm font-mono w-40"
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

      {/* Pages list */}
      <ScrollArea className="flex-1">
        <div className="p-6">
          <div className="space-y-1.5 max-w-2xl">
            {pages.map((page) => {
              const isActive = page.id === activePageId;
              const IconComp =
                page.route === "/404"
                  ? AlertTriangle
                  : page.route === "/500"
                    ? ServerCrash
                    : FileText;

              return (
                <div
                  key={page.id}
                  className={`
                    group flex items-center gap-3 px-4 py-3 rounded-lg border transition-colors duration-100
                    ${isActive ? "border-foreground/20 bg-accent/50" : "border-border hover:bg-accent/30"}
                  `}
                >
                  <IconComp className="w-4 h-4 text-muted-foreground shrink-0" />

                  <div className="flex-1 min-w-0">
                    {editingId === page.id ? (
                      <input
                        className="bg-transparent text-sm font-medium outline-none border-b border-foreground/30 w-full"
                        value={page.name}
                        onChange={(e) => renamePage(page.id, e.target.value)}
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

                    {/* Edit page name */}
                    {!page.isSystem && (
                      <button
                        className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors opacity-0 group-hover:opacity-100"
                        onClick={() => setEditingId(page.id)}
                        title="Rename"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                    )}

                    {/* Open in builder */}
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 text-xs gap-1"
                      asChild
                      onClick={() => setActivePage(page.id)}
                    >
                      <Link href={`/builder?page=${page.id}`}>
                        <ExternalLink className="w-3 h-3" />
                        Edit
                      </Link>
                    </Button>

                    {/* Delete */}
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
      </ScrollArea>
    </DashboardShell>
  );
}
