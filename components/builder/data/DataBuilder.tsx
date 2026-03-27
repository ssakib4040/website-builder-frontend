"use client";

import { useState } from "react";
import { useEditorStore } from "@/lib/builder/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Plus,
  Database,
  Trash2,
  Table2,
  Columns3,
  ChevronRight,
  Zap,
} from "lucide-react";
import type { FieldType } from "@/lib/builder/types";

const fieldTypes: { value: FieldType; label: string }[] = [
  { value: "text", label: "Text" },
  { value: "number", label: "Number" },
  { value: "boolean", label: "Boolean" },
  { value: "email", label: "Email" },
  { value: "date", label: "Date" },
  { value: "select", label: "Select" },
];

export function DataBuilder() {
  const {
    collections,
    addCollection,
    removeCollection,
    renameCollection,
    addField,
    removeField,
    addRecord,
    removeRecord,
    updateRecord,
    generateCrudEndpoints,
  } = useEditorStore();
  const [activeCollectionId, setActiveCollectionId] = useState<string | null>(
    null,
  );
  const [newCollectionName, setNewCollectionName] = useState("");
  const [showAddField, setShowAddField] = useState(false);
  const [newFieldName, setNewFieldName] = useState("");
  const [newFieldType, setNewFieldType] = useState<FieldType>("text");
  const [newFieldRequired, setNewFieldRequired] = useState(false);
  const [activeView, setActiveView] = useState<"fields" | "records">("fields");

  const activeCollection = collections.find((c) => c.id === activeCollectionId);

  function handleAddCollection() {
    if (!newCollectionName.trim()) return;
    addCollection(newCollectionName.trim());
    setNewCollectionName("");
  }

  function handleAddField() {
    if (!activeCollectionId || !newFieldName.trim()) return;
    addField(activeCollectionId, {
      name: newFieldName.trim(),
      type: newFieldType,
      required: newFieldRequired,
    });
    setNewFieldName("");
    setNewFieldType("text");
    setNewFieldRequired(false);
    setShowAddField(false);
  }

  function handleAddRecord() {
    if (!activeCollection) return;
    const record: Record<string, string | number | boolean | null> = {};
    for (const field of activeCollection.fields) {
      record[field.id] =
        field.type === "boolean" ? false : field.type === "number" ? 0 : "";
    }
    addRecord(activeCollection.id, record);
  }

  return (
    <div className="h-full flex">
      {/* Collections list */}
      <div className="w-[220px] border-r border-border flex flex-col bg-background shrink-0">
        <div className="px-3 py-3 border-b border-border">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
            Collections
          </p>
          <div className="flex gap-1">
            <Input
              value={newCollectionName}
              onChange={(e) => setNewCollectionName(e.target.value)}
              placeholder="Collection name"
              className="h-7 text-xs flex-1"
              onKeyDown={(e) => e.key === "Enter" && handleAddCollection()}
            />
            <Button
              size="sm"
              className="h-7 w-7 p-0"
              onClick={handleAddCollection}
              disabled={!newCollectionName.trim()}
            >
              <Plus className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
        <ScrollArea className="flex-1">
          <div className="p-1.5 space-y-0.5">
            {collections.length === 0 ? (
              <div className="py-8 text-center">
                <Database className="w-5 h-5 mx-auto text-muted-foreground/40 mb-2" />
                <p className="text-xs text-muted-foreground/60">
                  No collections yet
                </p>
              </div>
            ) : (
              collections.map((col) => (
                <div
                  key={col.id}
                  className={`
                    group flex items-center gap-2 px-2.5 py-1.5 rounded-md cursor-pointer transition-colors
                    ${activeCollectionId === col.id ? "bg-accent text-foreground" : "text-foreground/70 hover:bg-accent/50"}
                  `}
                  onClick={() => setActiveCollectionId(col.id)}
                >
                  <Database className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                  <span className="text-xs truncate flex-1">{col.name}</span>
                  <span className="text-[10px] text-muted-foreground/50">
                    {col.fields.length}f
                  </span>
                  <button
                    className="opacity-0 group-hover:opacity-100 p-0.5 text-muted-foreground hover:text-destructive transition-all"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeCollection(col.id);
                      if (activeCollectionId === col.id)
                        setActiveCollectionId(null);
                    }}
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Collection detail */}
      <div className="flex-1 flex flex-col">
        {!activeCollection ? (
          <div className="flex-1 flex items-center justify-center text-center px-6">
            <div>
              <Table2 className="w-8 h-8 mx-auto text-muted-foreground/30 mb-3" />
              <p className="text-sm text-muted-foreground/60">
                Select a collection to manage its schema and data
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Collection header */}
            <div className="px-4 py-3 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-muted-foreground" />
                <input
                  className="text-sm font-medium bg-transparent outline-none border-b border-transparent hover:border-border focus:border-foreground/30 transition-colors"
                  value={activeCollection.name}
                  onChange={(e) =>
                    renameCollection(activeCollection.id, e.target.value)
                  }
                />
                <span className="text-[10px] text-muted-foreground bg-accent px-1.5 py-0.5 rounded">
                  {activeCollection.records.length} records
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs gap-1"
                  onClick={() => generateCrudEndpoints(activeCollection.id)}
                >
                  <Zap className="w-3 h-3" />
                  Generate APIs
                </Button>
              </div>
            </div>

            {/* Tabs: Fields / Records */}
            <div className="px-4 border-b border-border flex gap-4">
              <button
                onClick={() => setActiveView("fields")}
                className={`text-xs py-2 border-b-2 transition-colors ${activeView === "fields" ? "border-foreground text-foreground font-medium" : "border-transparent text-muted-foreground hover:text-foreground"}`}
              >
                <Columns3 className="w-3.5 h-3.5 inline mr-1" />
                Fields ({activeCollection.fields.length})
              </button>
              <button
                onClick={() => setActiveView("records")}
                className={`text-xs py-2 border-b-2 transition-colors ${activeView === "records" ? "border-foreground text-foreground font-medium" : "border-transparent text-muted-foreground hover:text-foreground"}`}
              >
                <Table2 className="w-3.5 h-3.5 inline mr-1" />
                Records ({activeCollection.records.length})
              </button>
            </div>

            <ScrollArea className="flex-1">
              {activeView === "fields" ? (
                <div className="p-4 space-y-2">
                  {activeCollection.fields.map((field) => (
                    <div
                      key={field.id}
                      className="flex items-center gap-2 p-2.5 rounded-lg border border-border bg-card"
                    >
                      <ChevronRight className="w-3 h-3 text-muted-foreground/40" />
                      <span className="text-xs font-medium flex-1">
                        {field.name}
                      </span>
                      <span className="text-[10px] text-muted-foreground bg-accent px-1.5 py-0.5 rounded">
                        {field.type}
                      </span>
                      {field.required && (
                        <span className="text-[10px] text-orange-500 bg-orange-50 dark:bg-orange-950/30 px-1.5 py-0.5 rounded">
                          required
                        </span>
                      )}
                      <button
                        className="p-0.5 text-muted-foreground hover:text-destructive transition-colors"
                        onClick={() =>
                          removeField(activeCollection.id, field.id)
                        }
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}

                  {showAddField ? (
                    <div className="p-3 rounded-lg border border-dashed border-border space-y-2 bg-accent/10">
                      <Input
                        value={newFieldName}
                        onChange={(e) => setNewFieldName(e.target.value)}
                        placeholder="Field name"
                        className="h-7 text-xs"
                        autoFocus
                      />
                      <Select
                        value={newFieldType}
                        onValueChange={(v) => setNewFieldType(v as FieldType)}
                      >
                        <SelectTrigger className="h-7 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {fieldTypes.map((ft) => (
                            <SelectItem
                              key={ft.value}
                              value={ft.value}
                              className="text-xs"
                            >
                              {ft.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div className="flex items-center gap-2">
                        <Switch
                          id="req"
                          checked={newFieldRequired}
                          onCheckedChange={setNewFieldRequired}
                        />
                        <Label htmlFor="req" className="text-xs">
                          Required
                        </Label>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          className="h-7 text-xs flex-1"
                          onClick={handleAddField}
                          disabled={!newFieldName.trim()}
                        >
                          Add Field
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 text-xs"
                          onClick={() => setShowAddField(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 text-xs gap-1 w-full"
                      onClick={() => setShowAddField(true)}
                    >
                      <Plus className="w-3 h-3" /> Add Field
                    </Button>
                  )}
                </div>
              ) : (
                <div className="p-4">
                  {activeCollection.fields.length === 0 ? (
                    <div className="py-8 text-center">
                      <p className="text-xs text-muted-foreground">
                        Add fields first to start managing records
                      </p>
                    </div>
                  ) : (
                    <>
                      {/* Table header */}
                      <div className="flex border-b border-border pb-1 mb-1 gap-2">
                        <span className="w-8 text-[10px] text-muted-foreground">
                          #
                        </span>
                        {activeCollection.fields.map((f) => (
                          <span
                            key={f.id}
                            className="flex-1 text-[10px] text-muted-foreground font-medium truncate"
                          >
                            {f.name}
                          </span>
                        ))}
                        <span className="w-8" />
                      </div>

                      {/* Records */}
                      {activeCollection.records.map((record, ri) => (
                        <div
                          key={ri}
                          className="flex items-center gap-2 py-1 border-b border-border/50 group"
                        >
                          <span className="w-8 text-[10px] text-muted-foreground">
                            {ri + 1}
                          </span>
                          {activeCollection.fields.map((f) => (
                            <div key={f.id} className="flex-1">
                              {f.type === "boolean" ? (
                                <Switch
                                  checked={!!record[f.id]}
                                  onCheckedChange={(v) =>
                                    updateRecord(activeCollection.id, ri, {
                                      ...record,
                                      [f.id]: v,
                                    })
                                  }
                                />
                              ) : (
                                <input
                                  className="w-full text-xs bg-transparent outline-none border-b border-transparent focus:border-border transition-colors"
                                  type={f.type === "number" ? "number" : "text"}
                                  value={String(record[f.id] ?? "")}
                                  onChange={(e) =>
                                    updateRecord(activeCollection.id, ri, {
                                      ...record,
                                      [f.id]:
                                        f.type === "number"
                                          ? Number(e.target.value)
                                          : e.target.value,
                                    })
                                  }
                                />
                              )}
                            </div>
                          ))}
                          <button
                            className="w-8 opacity-0 group-hover:opacity-100 p-0.5 text-muted-foreground hover:text-destructive transition-all"
                            onClick={() =>
                              removeRecord(activeCollection.id, ri)
                            }
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))}

                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 text-xs gap-1 mt-3 w-full"
                        onClick={handleAddRecord}
                      >
                        <Plus className="w-3 h-3" /> Add Record
                      </Button>
                    </>
                  )}
                </div>
              )}
            </ScrollArea>
          </>
        )}
      </div>
    </div>
  );
}
