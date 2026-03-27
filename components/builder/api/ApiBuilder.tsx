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
import {
  Plus,
  Plug,
  Trash2,
  Play,
  Check,
  Loader2,
  AlertCircle,
} from "lucide-react";
import type { HttpMethod } from "@/lib/builder/types";

const methodColors: Record<HttpMethod, string> = {
  GET: "text-green-600 bg-green-50 dark:bg-green-950/30",
  POST: "text-blue-600 bg-blue-50 dark:bg-blue-950/30",
  PUT: "text-amber-600 bg-amber-50 dark:bg-amber-950/30",
  DELETE: "text-red-600 bg-red-50 dark:bg-red-950/30",
};

export function ApiBuilder() {
  const { endpoints, addEndpoint, removeEndpoint, updateEndpoint } =
    useEditorStore();
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState("");
  const [newMethod, setNewMethod] = useState<HttpMethod>("GET");
  const [newPath, setNewPath] = useState("/api/");
  const [newDesc, setNewDesc] = useState("");
  const [testingId, setTestingId] = useState<string | null>(null);
  const [testResult, setTestResult] = useState<
    Record<string, { status: "success" | "error"; message: string }>
  >({});

  function handleAdd() {
    if (!newName.trim() || !newPath.trim()) return;
    addEndpoint({
      name: newName.trim(),
      method: newMethod,
      path: newPath,
      collectionId: null,
      description: newDesc,
      enabled: true,
    });
    setNewName("");
    setNewPath("/api/");
    setNewDesc("");
    setShowAdd(false);
  }

  function handleTest(id: string) {
    setTestingId(id);
    setTestResult((prev) => ({ ...prev, [id]: undefined as never }));

    // Simulate API call
    setTimeout(
      () => {
        const success = Math.random() > 0.2;
        setTestResult((prev) => ({
          ...prev,
          [id]: success
            ? {
                status: "success",
                message: "200 OK — Response received in 142ms",
              }
            : {
                status: "error",
                message: "500 Internal Server Error — Simulated failure",
              },
        }));
        setTestingId(null);
      },
      800 + Math.random() * 700,
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-4 py-3 border-b border-border flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <Plug className="w-4 h-4 text-muted-foreground" />
          <p className="text-sm font-medium">API Endpoints</p>
          <span className="text-[10px] text-muted-foreground bg-accent px-1.5 py-0.5 rounded">
            {endpoints.length}
          </span>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="h-7 text-xs gap-1"
          onClick={() => setShowAdd(!showAdd)}
        >
          <Plus className="w-3 h-3" /> New Endpoint
        </Button>
      </div>

      {/* Add form */}
      {showAdd && (
        <div className="px-4 py-3 border-b border-border bg-accent/10 space-y-2">
          <div className="flex gap-2">
            <Select
              value={newMethod}
              onValueChange={(v) => setNewMethod(v as HttpMethod)}
            >
              <SelectTrigger className="h-7 text-xs w-[100px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(["GET", "POST", "PUT", "DELETE"] as HttpMethod[]).map((m) => (
                  <SelectItem key={m} value={m} className="text-xs">
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              value={newPath}
              onChange={(e) => setNewPath(e.target.value)}
              placeholder="/api/resource"
              className="h-7 text-xs font-mono flex-1"
            />
          </div>
          <Input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Endpoint name"
            className="h-7 text-xs"
          />
          <Input
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            placeholder="Description (optional)"
            className="h-7 text-xs"
          />
          <div className="flex gap-1">
            <Button
              size="sm"
              className="h-7 text-xs flex-1"
              onClick={handleAdd}
              disabled={!newName.trim() || !newPath.trim()}
            >
              Create
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 text-xs"
              onClick={() => setShowAdd(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-2">
          {endpoints.length === 0 ? (
            <div className="py-16 text-center">
              <Plug className="w-8 h-8 mx-auto text-muted-foreground/30 mb-3" />
              <p className="text-sm text-muted-foreground/60 mb-1">
                No API endpoints
              </p>
              <p className="text-xs text-muted-foreground/40">
                Create endpoints manually or generate CRUD from a collection.
              </p>
            </div>
          ) : (
            endpoints.map((ep) => (
              <div
                key={ep.id}
                className="p-3 rounded-lg border border-border bg-card space-y-2"
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${methodColors[ep.method]}`}
                  >
                    {ep.method}
                  </span>
                  <code className="text-xs font-mono text-foreground/70 flex-1 truncate">
                    {ep.path}
                  </code>
                  <Switch
                    checked={ep.enabled}
                    onCheckedChange={(v) =>
                      updateEndpoint(ep.id, { enabled: v })
                    }
                  />
                  <button
                    className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                    onClick={() => removeEndpoint(ep.id)}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium">{ep.name}</p>
                    {ep.description && (
                      <p className="text-[10px] text-muted-foreground">
                        {ep.description}
                      </p>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-6 text-[10px] gap-1"
                    onClick={() => handleTest(ep.id)}
                    disabled={testingId === ep.id || !ep.enabled}
                  >
                    {testingId === ep.id ? (
                      <>
                        <Loader2 className="w-3 h-3 animate-spin" /> Testing...
                      </>
                    ) : (
                      <>
                        <Play className="w-3 h-3" /> Test
                      </>
                    )}
                  </Button>
                </div>
                {testResult[ep.id] && (
                  <div
                    className={`text-[10px] px-2 py-1 rounded flex items-center gap-1 ${
                      testResult[ep.id].status === "success"
                        ? "bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-400"
                        : "bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400"
                    }`}
                  >
                    {testResult[ep.id].status === "success" ? (
                      <Check className="w-3 h-3" />
                    ) : (
                      <AlertCircle className="w-3 h-3" />
                    )}
                    {testResult[ep.id].message}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
