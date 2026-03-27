"use client";

import { useEditorStore } from "@/lib/builder/store";
import { ComponentSidebar } from "./sidebar/ComponentSidebar";
import { Canvas } from "./canvas/Canvas";
import { PropertiesPanel } from "./properties/PropertiesPanel";
import { Toolbar } from "./toolbar/Toolbar";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useState } from "react";
import { getComponentDef } from "@/lib/builder/registry";
import * as Icons from "lucide-react";
import { LucideIcon } from "lucide-react";

export function Editor() {
  const {
    sidebarOpen,
    propertiesPanelOpen,
    addNode,
    moveNode,
    selectedNodeId,
    getActivePageNodes,
  } = useEditorStore();
  const pageTree = getActivePageNodes();
  const [activeType, setActiveType] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  function handleDragStart(event: DragStartEvent) {
    const type = event.active.data.current?.type;
    if (type) setActiveType(type);
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveType(null);
    const { active, over } = event;

    if (!over) return;

    const isFromSidebar = active.data.current?.fromSidebar;
    const overIndex = over.data.current?.index ?? pageTree.length;

    if (isFromSidebar) {
      const type = active.data.current?.type;
      if (type) addNode(type, overIndex);
    } else {
      const nodeId = active.id as string;
      moveNode(nodeId, overIndex);
    }
  }

  const activeDef = activeType ? getComponentDef(activeType) : null;
  const ActiveIcon = activeDef
    ? (Icons[activeDef.icon as keyof typeof Icons] as LucideIcon)
    : null;

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="h-screen flex flex-col bg-background overflow-hidden">
        <Toolbar />
        <div className="flex flex-1 overflow-hidden">
          {/* Component Sidebar */}
          <div
            className={`
              border-r border-border bg-background
              transition-all duration-300 ease-in-out overflow-hidden
              ${sidebarOpen ? "w-[260px] opacity-100" : "w-0 opacity-0"}
            `}
          >
            <ComponentSidebar />
          </div>

          {/* Canvas */}
          <div className="flex-1 overflow-hidden">
            <Canvas />
          </div>

          {/* Properties Panel */}
          <div
            className={`
              border-l border-border bg-background
              transition-all duration-300 ease-in-out overflow-hidden
              ${propertiesPanelOpen && selectedNodeId ? "w-[300px] opacity-100" : "w-0 opacity-0"}
            `}
          >
            <PropertiesPanel />
          </div>
        </div>
      </div>

      {/* Drag overlay */}
      <DragOverlay>
        {activeDef && ActiveIcon ? (
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-background border border-border shadow-lg text-sm font-medium">
            <ActiveIcon className="w-4 h-4 text-muted-foreground" />
            {activeDef.label}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
