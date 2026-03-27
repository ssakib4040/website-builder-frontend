"use client";

import { useState } from "react";
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
  X,
} from "lucide-react";

export function PagesPanel() {
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

  function handleAdd() {
    if (!newName.trim()) return;
    const route = newRoute.startsWith("/") ? newRoute : `/${newRoute}`;
    addPage(newName.trim(), route);
    setNewName("");
    setNewRoute("/");
    setShowAdd(false);
  }

  return (
    <div className="h-full flex flex-col w-55 border-r border-border bg-background">
      <div className="px-3 py-3 border-b border-border flex items-center justify-between">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Pages
        </p>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
          onClick={() => setShowAdd(!showAdd)}
        >
          {showAdd ? (
            <X className="w-3.5 h-3.5" />
          ) : (
            <Plus className="w-3.5 h-3.5" />
          )}
        </Button>
      </div>

      {showAdd && (
        <div className="px-3 py-2 border-b border-border space-y-2 bg-accent/20">
          <Input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Page name"
            className="h-7 text-xs"
            autoFocus
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          />
          <Input
            value={newRoute}
            onChange={(e) => setNewRoute(e.target.value)}
            placeholder="/route"
            className="h-7 text-xs font-mono"
          />
          <Button
            size="sm"
            className="h-7 text-xs w-full"
            onClick={handleAdd}
            disabled={!newName.trim()}
          >
            Add Page
          </Button>
        </div>
      )}

      <ScrollArea className="flex-1">
        <div className="p-1.5 space-y-0.5">
          {pages.map((page) => {
            const isActive = page.id === activePageId;
            const icon =
              page.route === "/404"
                ? AlertTriangle
                : page.route === "/500"
                  ? ServerCrash
                  : FileText;
            const Icon = icon;

            return (
              <div
                key={page.id}
                className={`
                  group flex items-center gap-2 px-2.5 py-1.5 rounded-md cursor-pointer
                  transition-colors duration-100
                  ${isActive ? "bg-accent text-foreground" : "text-foreground/70 hover:bg-accent/50 hover:text-foreground"}
                `}
                onClick={() => setActivePage(page.id)}
              >
                <Icon className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                {editingId === page.id ? (
                  <input
                    className="flex-1 bg-transparent text-xs outline-none border-b border-foreground/30"
                    value={page.name}
                    onChange={(e) => renamePage(page.id, e.target.value)}
                    onBlur={() => setEditingId(null)}
                    onKeyDown={(e) => e.key === "Enter" && setEditingId(null)}
                    autoFocus
                    onClick={(e) => e.stopPropagation()}
                  />
                ) : (
                  <span
                    className="text-xs truncate flex-1"
                    onDoubleClick={(e) => {
                      e.stopPropagation();
                      if (!page.isSystem) setEditingId(page.id);
                    }}
                  >
                    {page.name}
                  </span>
                )}
                <span className="text-[10px] text-muted-foreground/60 font-mono hidden group-hover:block">
                  {page.route}
                </span>
                {!page.isSystem && (
                  <button
                    className="opacity-0 group-hover:opacity-100 p-0.5 text-muted-foreground hover:text-destructive transition-all"
                    onClick={(e) => {
                      e.stopPropagation();
                      removePage(page.id);
                    }}
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
