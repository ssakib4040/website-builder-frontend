"use client";

import { useEditorStore } from "@/lib/builder/store";
import { FileText, Database, Plug, Workflow } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { ActiveTab } from "@/lib/builder/types";

const tabs: { id: ActiveTab; icon: typeof FileText; label: string }[] = [
  { id: "pages", icon: FileText, label: "Pages" },
  { id: "data", icon: Database, label: "Data" },
  { id: "api", icon: Plug, label: "APIs" },
  { id: "logic", icon: Workflow, label: "Logic" },
];

export function AppNav() {
  const { activeTab, setActiveTab } = useEditorStore();

  return (
    <div className="w-12 border-r border-border bg-background flex flex-col items-center py-2 gap-1 shrink-0">
      {tabs.map(({ id, icon: Icon, label }) => (
        <Tooltip key={id}>
          <TooltipTrigger asChild>
            <button
              onClick={() => setActiveTab(id)}
              className={`
                w-9 h-9 rounded-lg flex items-center justify-center
                transition-all duration-150
                ${
                  activeTab === id
                    ? "bg-accent text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                }
              `}
            >
              <Icon className="w-4.5 h-4.5" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="right" className="text-xs">
            {label}
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}
