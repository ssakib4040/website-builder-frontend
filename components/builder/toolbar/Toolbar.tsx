"use client";

import { useEditorStore } from "@/lib/builder/store";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Undo2,
  Redo2,
  Monitor,
  Tablet,
  Smartphone,
  PanelLeft,
  PanelRight,
  Trash2,
  Eye,
} from "lucide-react";
import Link from "next/link";
import type { ViewportMode } from "@/lib/builder/types";

export function Toolbar() {
  const {
    undo,
    redo,
    history,
    historyIndex,
    viewportMode,
    setViewportMode,
    toggleSidebar,
    togglePropertiesPanel,
    clearCanvas,
    sidebarOpen,
    propertiesPanelOpen,
    selectedNodeId,
    getActivePageNodes,
    pages,
    activePageId,
  } = useEditorStore();
  const pageTree = getActivePageNodes();
  const activePage = pages.find((p) => p.id === activePageId);

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  const viewportOptions: {
    mode: ViewportMode;
    icon: typeof Monitor;
    label: string;
  }[] = [
    { mode: "desktop", icon: Monitor, label: "Desktop" },
    { mode: "tablet", icon: Tablet, label: "Tablet" },
    { mode: "mobile", icon: Smartphone, label: "Mobile" },
  ];

  return (
    <div className="h-14 border-b border-border bg-background px-3 flex items-center justify-between shrink-0">
      {/* Left group */}
      <div className="flex items-center gap-1">
        <Link
          href="/"
          className="text-sm font-semibold text-foreground mr-3 hover:opacity-70 transition-opacity"
        >
          Builder
        </Link>

        {activePage && (
          <span className="text-xs text-muted-foreground bg-accent px-2 py-0.5 rounded-md">
            {activePage.name}
          </span>
        )}

        <Separator orientation="vertical" className="h-5 mx-1" />

        <ToolbarButton
          icon={PanelLeft}
          label={sidebarOpen ? "Hide sidebar" : "Show sidebar"}
          onClick={toggleSidebar}
          active={sidebarOpen}
        />

        <ToolbarButton
          icon={PanelRight}
          label={propertiesPanelOpen ? "Hide properties" : "Show properties"}
          onClick={togglePropertiesPanel}
          active={propertiesPanelOpen && !!selectedNodeId}
        />
      </div>

      {/* Center group — viewport */}
      <div className="flex items-center gap-0.5 bg-accent/50 rounded-lg p-0.5">
        {viewportOptions.map(({ mode, icon: Icon, label }) => (
          <Tooltip key={mode}>
            <TooltipTrigger asChild>
              <button
                onClick={() => setViewportMode(mode)}
                className={`
                  p-1.5 rounded-md transition-all duration-150
                  ${
                    viewportMode === mode
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }
                `}
              >
                <Icon className="w-4 h-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent className="text-xs">{label}</TooltipContent>
          </Tooltip>
        ))}
      </div>

      {/* Right group */}
      <div className="flex items-center gap-1">
        <ToolbarButton
          icon={Undo2}
          label="Undo"
          onClick={undo}
          disabled={!canUndo}
        />
        <ToolbarButton
          icon={Redo2}
          label="Redo"
          onClick={redo}
          disabled={!canRedo}
        />

        <Separator orientation="vertical" className="h-5 mx-1" />

        <ToolbarButton
          icon={Trash2}
          label="Clear canvas"
          onClick={clearCanvas}
          disabled={pageTree.length === 0}
          destructive
        />

        <Separator orientation="vertical" className="h-5 mx-1" />

        <Button
          size="sm"
          variant="default"
          className="h-8 text-xs gap-1.5"
          asChild
        >
          <Link href="/preview">
            <Eye className="w-3.5 h-3.5" />
            Preview
          </Link>
        </Button>
      </div>
    </div>
  );
}

function ToolbarButton({
  icon: Icon,
  label,
  onClick,
  disabled,
  active,
  destructive,
}: {
  icon: typeof Undo2;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  active?: boolean;
  destructive?: boolean;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={onClick}
          disabled={disabled}
          className={`
            p-1.5 rounded-md transition-colors duration-150
            disabled:opacity-30 disabled:cursor-not-allowed
            ${active ? "bg-accent text-foreground" : ""}
            ${
              destructive
                ? "text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                : "text-muted-foreground hover:text-foreground hover:bg-accent"
            }
          `}
        >
          <Icon className="w-4 h-4" />
        </button>
      </TooltipTrigger>
      <TooltipContent className="text-xs">{label}</TooltipContent>
    </Tooltip>
  );
}
