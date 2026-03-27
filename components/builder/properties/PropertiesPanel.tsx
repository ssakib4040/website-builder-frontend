"use client";

import { useEditorStore } from "@/lib/builder/store";
import { getComponentDef } from "@/lib/builder/registry";
import { findNode } from "@/lib/builder/tree-utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PropField } from "./PropField";
import * as Icons from "lucide-react";
import { LucideIcon } from "lucide-react";

export function PropertiesPanel() {
  const { selectedNodeId, getActivePageNodes, updateProps } = useEditorStore();
  const pageTree = getActivePageNodes();

  if (!selectedNodeId) return null;

  const node = findNode(pageTree, selectedNodeId);
  if (!node) return null;

  const def = getComponentDef(node.type);
  if (!def) return null;

  const Icon = Icons[def.icon as keyof typeof Icons] as LucideIcon;

  return (
    <div className="h-full flex flex-col w-[300px]">
      {/* Header */}
      <div className="px-4 py-3 border-b border-border flex items-center gap-2">
        {Icon && <Icon className="w-4 h-4 text-muted-foreground" />}
        <p className="text-sm font-medium text-foreground">{def.label}</p>
        <span className="text-[10px] text-muted-foreground bg-accent px-1.5 py-0.5 rounded-md ml-auto">
          {node.type}
        </span>
      </div>

      {/* Properties */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {def.props.length === 0 ? (
            <p className="text-xs text-muted-foreground text-center py-8">
              No editable properties
            </p>
          ) : (
            def.props.map((propDef) => (
              <PropField
                key={propDef.key}
                definition={propDef}
                value={node.props[propDef.key] ?? propDef.defaultValue}
                onChange={(val) => updateProps(node.id, { [propDef.key]: val })}
              />
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
