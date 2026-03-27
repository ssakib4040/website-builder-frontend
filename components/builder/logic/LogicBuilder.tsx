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
  Trash2,
  Workflow as WorkflowIcon,
  Zap,
  ChevronRight,
  Play,
  MousePointerClick,
  FileText,
  Globe,
  Clock,
  PlusCircle,
  Pencil,
  Trash,
  Send,
  Navigation,
  AlertTriangle,
  Variable,
} from "lucide-react";
import type { TriggerType, ActionType } from "@/lib/builder/types";

const triggerOptions: {
  value: TriggerType;
  label: string;
  icon: typeof Zap;
}[] = [
  { value: "form_submit", icon: FileText, label: "Form Submit" },
  { value: "button_click", icon: MousePointerClick, label: "Button Click" },
  { value: "page_load", icon: Globe, label: "Page Load" },
  { value: "api_call", icon: Send, label: "API Call" },
  { value: "schedule", icon: Clock, label: "Schedule" },
];

const actionOptions: { value: ActionType; label: string; icon: typeof Zap }[] =
  [
    { value: "create_record", icon: PlusCircle, label: "Create Record" },
    { value: "update_record", icon: Pencil, label: "Update Record" },
    { value: "delete_record", icon: Trash, label: "Delete Record" },
    { value: "call_api", icon: Send, label: "Call API" },
    { value: "navigate", icon: Navigation, label: "Navigate" },
    { value: "show_alert", icon: AlertTriangle, label: "Show Alert" },
    { value: "set_variable", icon: Variable, label: "Set Variable" },
  ];

export function LogicBuilder() {
  const {
    workflows,
    addWorkflow,
    removeWorkflow,
    updateWorkflow,
    addWorkflowAction,
    removeWorkflowAction,
  } = useEditorStore();
  const [activeWorkflowId, setActiveWorkflowId] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState("");
  const [newTrigger, setNewTrigger] = useState<TriggerType>("button_click");
  const [addingAction, setAddingAction] = useState(false);
  const [newActionType, setNewActionType] = useState<ActionType>("show_alert");
  const [testRunning, setTestRunning] = useState(false);
  const [testOutput, setTestOutput] = useState<string | null>(null);

  const activeWorkflow = workflows.find((w) => w.id === activeWorkflowId);

  function handleAdd() {
    if (!newName.trim()) return;
    addWorkflow(newName.trim(), newTrigger);
    setNewName("");
    setShowAdd(false);
  }

  function handleAddAction() {
    if (!activeWorkflowId) return;
    const actionDef = actionOptions.find((a) => a.value === newActionType);
    addWorkflowAction(activeWorkflowId, {
      type: newActionType,
      label: actionDef?.label ?? newActionType,
      config: {},
    });
    setAddingAction(false);
  }

  function handleTestRun() {
    if (!activeWorkflow) return;
    setTestRunning(true);
    setTestOutput(null);

    // Simulate workflow execution
    const steps = activeWorkflow.actions.map((a) => a.label);
    let output = `▶ Running "${activeWorkflow.name}"\n`;
    output += `  Trigger: ${triggerOptions.find((t) => t.value === activeWorkflow.trigger)?.label}\n`;

    setTimeout(
      () => {
        if (steps.length === 0) {
          output += "  ⚠ No actions defined\n";
        } else {
          steps.forEach((s, i) => {
            output += `  ${i + 1}. ${s} — ✓ Done\n`;
          });
        }
        output += `✓ Workflow completed`;
        setTestOutput(output);
        setTestRunning(false);
      },
      600 + steps.length * 300,
    );
  }

  return (
    <div className="h-full flex">
      {/* Workflow list */}
      <div className="w-[220px] border-r border-border flex flex-col bg-background shrink-0">
        <div className="px-3 py-3 border-b border-border flex items-center justify-between">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Workflows
          </p>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={() => setShowAdd(!showAdd)}
          >
            <Plus className="w-3.5 h-3.5" />
          </Button>
        </div>

        {showAdd && (
          <div className="px-3 py-2 border-b border-border space-y-2 bg-accent/10">
            <Input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Workflow name"
              className="h-7 text-xs"
              autoFocus
            />
            <Select
              value={newTrigger}
              onValueChange={(v) => setNewTrigger(v as TriggerType)}
            >
              <SelectTrigger className="h-7 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {triggerOptions.map((t) => (
                  <SelectItem key={t.value} value={t.value} className="text-xs">
                    {t.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              size="sm"
              className="h-7 text-xs w-full"
              onClick={handleAdd}
              disabled={!newName.trim()}
            >
              Create
            </Button>
          </div>
        )}

        <ScrollArea className="flex-1">
          <div className="p-1.5 space-y-0.5">
            {workflows.length === 0 ? (
              <div className="py-8 text-center">
                <WorkflowIcon className="w-5 h-5 mx-auto text-muted-foreground/40 mb-2" />
                <p className="text-xs text-muted-foreground/60">
                  No workflows yet
                </p>
              </div>
            ) : (
              workflows.map((wf) => (
                <div
                  key={wf.id}
                  className={`
                    group flex items-center gap-2 px-2.5 py-1.5 rounded-md cursor-pointer transition-colors
                    ${activeWorkflowId === wf.id ? "bg-accent text-foreground" : "text-foreground/70 hover:bg-accent/50"}
                  `}
                  onClick={() => setActiveWorkflowId(wf.id)}
                >
                  <Zap
                    className={`w-3.5 h-3.5 shrink-0 ${wf.enabled ? "text-amber-500" : "text-muted-foreground/40"}`}
                  />
                  <span className="text-xs truncate flex-1">{wf.name}</span>
                  <span className="text-[10px] text-muted-foreground/50">
                    {wf.actions.length}
                  </span>
                  <button
                    className="opacity-0 group-hover:opacity-100 p-0.5 text-muted-foreground hover:text-destructive transition-all"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeWorkflow(wf.id);
                      if (activeWorkflowId === wf.id) setActiveWorkflowId(null);
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

      {/* Workflow detail */}
      <div className="flex-1 flex flex-col">
        {!activeWorkflow ? (
          <div className="flex-1 flex items-center justify-center text-center px-6">
            <div>
              <WorkflowIcon className="w-8 h-8 mx-auto text-muted-foreground/30 mb-3" />
              <p className="text-sm text-muted-foreground/60">
                Select a workflow to edit its trigger, conditions, and actions
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="px-4 py-3 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" />
                <input
                  className="text-sm font-medium bg-transparent outline-none border-b border-transparent hover:border-border focus:border-foreground/30"
                  value={activeWorkflow.name}
                  onChange={(e) =>
                    updateWorkflow(activeWorkflow.id, { name: e.target.value })
                  }
                />
                <Switch
                  checked={activeWorkflow.enabled}
                  onCheckedChange={(v) =>
                    updateWorkflow(activeWorkflow.id, { enabled: v })
                  }
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                className="h-7 text-xs gap-1"
                onClick={handleTestRun}
                disabled={testRunning}
              >
                <Play className="w-3 h-3" />{" "}
                {testRunning ? "Running..." : "Test Run"}
              </Button>
            </div>

            <ScrollArea className="flex-1">
              <div className="p-4 space-y-4">
                {/* Trigger */}
                <div>
                  <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-2">
                    Trigger
                  </p>
                  <div className="p-3 rounded-lg border border-border bg-card">
                    <Select
                      value={activeWorkflow.trigger}
                      onValueChange={(v) =>
                        updateWorkflow(activeWorkflow.id, {
                          trigger: v as TriggerType,
                        })
                      }
                    >
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {triggerOptions.map((t) => {
                          const TIcon = t.icon;
                          return (
                            <SelectItem
                              key={t.value}
                              value={t.value}
                              className="text-xs"
                            >
                              <div className="flex items-center gap-1.5">
                                <TIcon className="w-3 h-3" /> {t.label}
                              </div>
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Actions */}
                <div>
                  <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-2">
                    Actions ({activeWorkflow.actions.length})
                  </p>
                  <div className="space-y-1.5">
                    {activeWorkflow.actions.map((action, i) => {
                      const aDef = actionOptions.find(
                        (a) => a.value === action.type,
                      );
                      const AIcon = aDef?.icon ?? Zap;
                      return (
                        <div
                          key={action.id}
                          className="flex items-center gap-2 p-2.5 rounded-lg border border-border bg-card group"
                        >
                          <span className="text-[10px] text-muted-foreground w-4 text-right">
                            {i + 1}
                          </span>
                          <ChevronRight className="w-3 h-3 text-muted-foreground/40" />
                          <AIcon className="w-3.5 h-3.5 text-muted-foreground" />
                          <span className="text-xs flex-1">{action.label}</span>
                          <span className="text-[10px] text-muted-foreground bg-accent px-1.5 py-0.5 rounded">
                            {action.type}
                          </span>
                          <button
                            className="opacity-0 group-hover:opacity-100 p-0.5 text-muted-foreground hover:text-destructive transition-all"
                            onClick={() =>
                              removeWorkflowAction(activeWorkflow.id, action.id)
                            }
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      );
                    })}

                    {addingAction ? (
                      <div className="p-3 rounded-lg border border-dashed border-border bg-accent/10 space-y-2">
                        <Select
                          value={newActionType}
                          onValueChange={(v) =>
                            setNewActionType(v as ActionType)
                          }
                        >
                          <SelectTrigger className="h-7 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {actionOptions.map((a) => (
                              <SelectItem
                                key={a.value}
                                value={a.value}
                                className="text-xs"
                              >
                                {a.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            className="h-7 text-xs flex-1"
                            onClick={handleAddAction}
                          >
                            Add
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 text-xs"
                            onClick={() => setAddingAction(false)}
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
                        onClick={() => setAddingAction(true)}
                      >
                        <Plus className="w-3 h-3" /> Add Action
                      </Button>
                    )}
                  </div>
                </div>

                {/* Test output */}
                {testOutput && (
                  <div>
                    <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-2">
                      Output
                    </p>
                    <pre className="p-3 rounded-lg bg-foreground/[0.03] border border-border text-[11px] font-mono text-foreground/80 whitespace-pre-wrap leading-relaxed">
                      {testOutput}
                    </pre>
                  </div>
                )}
              </div>
            </ScrollArea>
          </>
        )}
      </div>
    </div>
  );
}
