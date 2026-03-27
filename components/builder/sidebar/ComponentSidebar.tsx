"use client";

import { useState } from "react";
import { componentRegistry, categoryLabels } from "@/lib/builder/registry";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DraggableSidebarItem } from "./DraggableSidebarItem";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";

export function ComponentSidebar() {
  const [query, setQuery] = useState("");

  const filtered = query.trim()
    ? componentRegistry.filter(
        (c) =>
          c.label.toLowerCase().includes(query.toLowerCase()) ||
          c.description.toLowerCase().includes(query.toLowerCase()),
      )
    : componentRegistry;

  const categories = [...new Set(filtered.map((c) => c.category))];

  return (
    <div className="h-full flex flex-col w-[260px]">
      {/* Search */}
      <div className="px-3 pt-3 pb-2">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/60" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search components..."
            className="h-8 pl-8 pr-8 text-xs bg-accent/40 border-transparent focus:border-border focus:bg-background placeholder:text-muted-foreground/50 transition-all"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground/50 hover:text-muted-foreground transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="px-3 pb-3 space-y-4">
          {categories.length === 0 ? (
            <div className="py-10 text-center">
              <p className="text-xs text-muted-foreground">
                No components match &ldquo;{query}&rdquo;
              </p>
            </div>
          ) : (
            categories.map((cat) => {
              const items = filtered.filter((c) => c.category === cat);
              return (
                <div key={cat}>
                  <p className="text-[11px] font-medium text-muted-foreground/70 uppercase tracking-wider px-1 mb-1.5">
                    {categoryLabels[cat] ?? cat}
                  </p>
                  <div className="grid grid-cols-2 gap-1">
                    {items.map((comp) => (
                      <DraggableSidebarItem key={comp.type} component={comp} />
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
