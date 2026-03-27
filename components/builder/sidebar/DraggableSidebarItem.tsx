"use client";

import { useDraggable } from "@dnd-kit/core";
import { ComponentDefinition } from "@/lib/builder/types";
import * as Icons from "lucide-react";
import { LucideIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Props {
  component: ComponentDefinition;
}

export function DraggableSidebarItem({ component }: Props) {
  const Icon = Icons[component.icon as keyof typeof Icons] as LucideIcon;

  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `sidebar-${component.type}`,
    data: { type: component.type, fromSidebar: true },
  });

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          ref={setNodeRef}
          {...listeners}
          {...attributes}
          className={`
            flex flex-col items-center justify-center gap-1.5
            p-2.5 rounded-lg border border-transparent
            text-muted-foreground
            hover:bg-accent hover:text-foreground hover:border-border/50
            transition-all duration-150 ease-out
            cursor-grab active:cursor-grabbing
            ${isDragging ? "opacity-30 scale-95" : ""}
          `}
        >
          {Icon && <Icon className="w-5 h-5" />}
          <span className="text-[10px] font-medium leading-none truncate w-full text-center">
            {component.label}
          </span>
        </button>
      </TooltipTrigger>
      <TooltipContent side="right" className="text-xs max-w-[180px]">
        {component.description}
      </TooltipContent>
    </Tooltip>
  );
}
