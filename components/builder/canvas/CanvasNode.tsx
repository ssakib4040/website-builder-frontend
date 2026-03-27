"use client";

import { BuilderNode } from "@/lib/builder/types";
import { useEditorStore } from "@/lib/builder/store";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2, Copy } from "lucide-react";
import { NodeRenderer } from "./NodeRenderer";
import { useDroppable } from "@dnd-kit/core";

interface Props {
  node: BuilderNode;
  index: number;
}

export function CanvasNode({ node, index }: Props) {
  const {
    selectedNodeId,
    hoveredNodeId,
    selectNode,
    hoverNode,
    removeNode,
    duplicateNode,
  } = useEditorStore();

  const isSelected = selectedNodeId === node.id;
  const isHovered = hoveredNodeId === node.id;

  const {
    attributes,
    listeners,
    setNodeRef: setSortableRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: node.id, data: { index } });

  // Drop zone above this node for insertion
  const { setNodeRef: setDropRef, isOver } = useDroppable({
    id: `drop-${node.id}`,
    data: { index },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <>
      {/* Drop indicator line */}
      <div
        ref={setDropRef}
        className={`
          h-1 -my-0.5 mx-2 rounded-full transition-all duration-200
          ${isOver ? "bg-primary/40 h-1" : "bg-transparent"}
        `}
      />

      <div
        ref={setSortableRef}
        style={style}
        className={`
          group relative rounded-lg transition-all duration-150 ease-out
          ${isDragging ? "opacity-30 scale-[0.98]" : ""}
          ${isSelected ? "ring-2 ring-primary/30 bg-primary/[0.02]" : ""}
          ${isHovered && !isSelected ? "bg-accent/40" : ""}
        `}
        onClick={(e) => {
          e.stopPropagation();
          selectNode(node.id);
        }}
        onMouseEnter={() => hoverNode(node.id)}
        onMouseLeave={() => hoverNode(null)}
      >
        {/* Notion-style action bar — appears on hover */}
        <div
          className={`
            absolute -left-9 top-1/2 -translate-y-1/2
            flex flex-col gap-0.5
            transition-opacity duration-150
            ${isHovered || isSelected ? "opacity-100" : "opacity-0"}
          `}
        >
          <button
            {...attributes}
            {...listeners}
            className="p-1 rounded hover:bg-accent text-muted-foreground hover:text-foreground cursor-grab active:cursor-grabbing transition-colors"
            title="Drag to reorder"
          >
            <GripVertical className="w-4 h-4" />
          </button>
        </div>

        {/* Floating toolbar on selection */}
        {isSelected && (
          <div
            className="
              absolute -top-9 right-0 flex items-center gap-0.5
              bg-background border border-border rounded-lg shadow-sm p-0.5
              animate-in fade-in slide-in-from-bottom-1 duration-150
            "
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                duplicateNode(node.id);
              }}
              className="p-1.5 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
              title="Duplicate"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeNode(node.id);
              }}
              className="p-1.5 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
              title="Delete"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* The actual rendered component */}
        <div className="py-1 px-2">
          <NodeRenderer node={node} />
        </div>
      </div>
    </>
  );
}
