"use client";

import { useEditorStore } from "@/lib/builder/store";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CanvasNode } from "./CanvasNode";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus } from "lucide-react";

export function Canvas() {
  const { getActivePageNodes, viewportMode, selectNode } = useEditorStore();
  const pageTree = getActivePageNodes();

  const { setNodeRef, isOver } = useDroppable({
    id: "canvas-drop-zone",
    data: { index: pageTree.length },
  });

  const viewportClass = {
    desktop: "max-w-full",
    tablet: "max-w-[768px]",
    mobile: "max-w-[375px]",
  }[viewportMode];

  return (
    <div
      className="h-full bg-accent/30 overflow-hidden flex justify-center"
      onClick={() => selectNode(null)}
    >
      <ScrollArea className="h-full w-full">
        <div className={`mx-auto transition-all duration-300 ease-in-out ${viewportClass}`}>
          <div
            ref={setNodeRef}
            className={`
              min-h-[calc(100vh-3.5rem)] p-6
              transition-colors duration-200
              ${isOver ? "bg-primary/[0.03]" : ""}
            `}
          >
            {pageTree.length === 0 ? (
              <EmptyCanvas />
            ) : (
              <SortableContext items={pageTree.map((n) => n.id)} strategy={verticalListSortingStrategy}>
                <div className="space-y-0">
                  {pageTree.map((node, index) => (
                    <CanvasNode key={node.id} node={node} index={index} />
                  ))}
                </div>
              </SortableContext>
            )}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}

function EmptyCanvas() {
  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col items-center justify-center text-center">
      <div className="w-12 h-12 rounded-xl bg-accent/60 flex items-center justify-center mb-4">
        <Plus className="w-5 h-5 text-muted-foreground" />
      </div>
      <p className="text-sm font-medium text-foreground/70 mb-1">
        Start building your page
      </p>
      <p className="text-xs text-muted-foreground max-w-[240px] leading-relaxed">
        Drag components from the sidebar and drop them here. Click any block to edit its properties.
      </p>
    </div>
  );
}
