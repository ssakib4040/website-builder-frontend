"use client";

import { PropDefinition } from "@/lib/builder/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

interface Props {
  definition: PropDefinition;
  value: string | number | boolean;
  onChange: (value: string | number | boolean) => void;
}

export function PropField({ definition, value, onChange }: Props) {
  const { key, label, type, options, placeholder } = definition;

  return (
    <div className="space-y-1.5">
      <Label
        htmlFor={key}
        className="text-xs text-muted-foreground font-medium"
      >
        {label}
      </Label>

      {type === "text" && (
        <Input
          id={key}
          value={value as string}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="h-8 text-sm bg-accent/30 border-border/60 focus:bg-background transition-colors"
        />
      )}

      {type === "textarea" && (
        <textarea
          id={key}
          value={value as string}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
          className="w-full rounded-md border border-border/60 bg-accent/30 px-3 py-2 text-sm focus:bg-background focus:outline-none focus:ring-2 focus:ring-ring/30 transition-colors resize-none"
        />
      )}

      {type === "number" && (
        <Input
          id={key}
          type="number"
          value={value as number}
          onChange={(e) => onChange(Number(e.target.value))}
          className="h-8 text-sm bg-accent/30 border-border/60 focus:bg-background transition-colors"
        />
      )}

      {type === "select" && options && (
        <Select value={value as string} onValueChange={onChange}>
          <SelectTrigger className="h-8 text-sm bg-accent/30 border-border/60">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {options.map((opt) => (
              <SelectItem key={opt.value} value={opt.value} className="text-sm">
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {type === "color" && (
        <div className="flex items-center gap-2">
          <input
            type="color"
            id={key}
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
            className="w-8 h-8 rounded-md border border-border/60 cursor-pointer bg-transparent p-0.5"
          />
          <Input
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
            className="h-8 text-sm bg-accent/30 border-border/60 flex-1 font-mono"
          />
        </div>
      )}

      {type === "boolean" && (
        <div className="flex items-center gap-2">
          <Switch
            id={key}
            checked={value as boolean}
            onCheckedChange={onChange}
          />
          <span className="text-xs text-muted-foreground">
            {value ? "On" : "Off"}
          </span>
        </div>
      )}
    </div>
  );
}
