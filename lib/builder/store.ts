import { create } from "zustand";
import {
  BuilderNode,
  ViewportMode,
  ActiveTab,
  AppPage,
  Collection,
  CollectionField,
  ApiEndpoint,
  HttpMethod,
  Workflow,
  WorkflowAction,
  WorkflowCondition,
  TriggerType,
} from "./types";
import { getComponentDef } from "./registry";
import {
  removeNode,
  insertNodeAt,
  updateNodeProps,
  duplicateNode,
  moveNode,
} from "./tree-utils";
import { nanoid } from "nanoid";

const MAX_HISTORY = 50;
const genId = () => nanoid(10);

// ── Default pages ──────────────────────────────────────
function createDefaultPages(): AppPage[] {
  return [
    { id: genId(), name: "Home", route: "/", isSystem: false, nodes: [] },
    {
      id: genId(),
      name: "404 Not Found",
      route: "/404",
      isSystem: true,
      nodes: [],
    },
    {
      id: genId(),
      name: "500 Server Error",
      route: "/500",
      isSystem: true,
      nodes: [],
    },
  ];
}

const defaultPages = createDefaultPages();

// ── Store Interface ────────────────────────────────────
interface EditorStore {
  // Tab
  activeTab: ActiveTab | null;
  setActiveTab: (tab: ActiveTab | null) => void;

  // Pages
  pages: AppPage[];
  activePageId: string;
  setActivePage: (id: string) => void;
  addPage: (name: string, route: string) => void;
  removePage: (id: string) => void;
  renamePage: (id: string, name: string) => void;
  updatePageRoute: (id: string, route: string) => void;

  // Builder state (operates on active page)
  selectedNodeId: string | null;
  hoveredNodeId: string | null;
  viewportMode: ViewportMode;
  sidebarOpen: boolean;
  propertiesPanelOpen: boolean;
  history: BuilderNode[][];
  historyIndex: number;

  // Builder actions
  getActivePageNodes: () => BuilderNode[];
  addNode: (type: string, index?: number) => void;
  removeNode: (id: string) => void;
  selectNode: (id: string | null) => void;
  hoverNode: (id: string | null) => void;
  updateProps: (
    id: string,
    props: Record<string, string | number | boolean>,
  ) => void;
  duplicateNode: (id: string) => void;
  moveNode: (nodeId: string, newIndex: number) => void;
  setViewportMode: (mode: ViewportMode) => void;
  toggleSidebar: () => void;
  togglePropertiesPanel: () => void;
  undo: () => void;
  redo: () => void;
  clearCanvas: () => void;

  // Collections
  collections: Collection[];
  addCollection: (name: string) => void;
  removeCollection: (id: string) => void;
  renameCollection: (id: string, name: string) => void;
  addField: (collectionId: string, field: Omit<CollectionField, "id">) => void;
  removeField: (collectionId: string, fieldId: string) => void;
  updateField: (
    collectionId: string,
    fieldId: string,
    updates: Partial<CollectionField>,
  ) => void;
  addRecord: (
    collectionId: string,
    record: Record<string, string | number | boolean | null>,
  ) => void;
  removeRecord: (collectionId: string, index: number) => void;
  updateRecord: (
    collectionId: string,
    index: number,
    record: Record<string, string | number | boolean | null>,
  ) => void;

  // APIs
  endpoints: ApiEndpoint[];
  addEndpoint: (endpoint: Omit<ApiEndpoint, "id">) => void;
  removeEndpoint: (id: string) => void;
  updateEndpoint: (id: string, updates: Partial<ApiEndpoint>) => void;
  generateCrudEndpoints: (collectionId: string) => void;

  // Workflows
  workflows: Workflow[];
  addWorkflow: (name: string, trigger: TriggerType) => void;
  removeWorkflow: (id: string) => void;
  updateWorkflow: (id: string, updates: Partial<Workflow>) => void;
  addWorkflowAction: (
    workflowId: string,
    action: Omit<WorkflowAction, "id">,
  ) => void;
  removeWorkflowAction: (workflowId: string, actionId: string) => void;
  addWorkflowCondition: (
    workflowId: string,
    condition: WorkflowCondition,
  ) => void;
  removeWorkflowCondition: (workflowId: string, index: number) => void;
}

// ── Helpers ────────────────────────────────────────────
function pushHistory(
  history: BuilderNode[][],
  historyIndex: number,
  tree: BuilderNode[],
) {
  const newHistory = history.slice(0, historyIndex + 1);
  newHistory.push(structuredClone(tree));
  if (newHistory.length > MAX_HISTORY) newHistory.shift();
  return { history: newHistory, historyIndex: newHistory.length - 1 };
}

function createDefaultNode(type: string): BuilderNode | null {
  const def = getComponentDef(type);
  if (!def) return null;
  const props: Record<string, string | number | boolean> = {};
  for (const p of def.props) {
    props[p.key] = p.defaultValue;
  }
  return { id: genId(), type, props, children: [] };
}

function updatePageNodes(
  pages: AppPage[],
  pageId: string,
  nodes: BuilderNode[],
): AppPage[] {
  return pages.map((p) => (p.id === pageId ? { ...p, nodes } : p));
}

// ── Store ──────────────────────────────────────────────
export const useEditorStore = create<EditorStore>((set, get) => ({
  // Tab
  activeTab: null,
  setActiveTab: (tab) => set({ activeTab: tab }),

  // Pages
  pages: defaultPages,
  activePageId: defaultPages[0].id,
  setActivePage: (id) =>
    set((state) => {
      const page = state.pages.find((p) => p.id === id);
      if (!page) return state;
      return {
        activePageId: id,
        selectedNodeId: null,
        history: [structuredClone(page.nodes)],
        historyIndex: 0,
      };
    }),
  addPage: (name, route) =>
    set((state) => {
      const page: AppPage = {
        id: genId(),
        name,
        route,
        isSystem: false,
        nodes: [],
      };
      return {
        pages: [...state.pages, page],
        activePageId: page.id,
        selectedNodeId: null,
        history: [[]],
        historyIndex: 0,
      };
    }),
  removePage: (id) =>
    set((state) => {
      const page = state.pages.find((p) => p.id === id);
      if (!page || page.isSystem) return state;
      const remaining = state.pages.filter((p) => p.id !== id);
      const newActiveId =
        state.activePageId === id
          ? (remaining[0]?.id ?? "")
          : state.activePageId;
      return { pages: remaining, activePageId: newActiveId };
    }),
  renamePage: (id, name) =>
    set((state) => ({
      pages: state.pages.map((p) => (p.id === id ? { ...p, name } : p)),
    })),
  updatePageRoute: (id, route) =>
    set((state) => ({
      pages: state.pages.map((p) =>
        p.id === id && !p.isSystem ? { ...p, route } : p,
      ),
    })),

  // Builder
  selectedNodeId: null,
  hoveredNodeId: null,
  viewportMode: "desktop",
  sidebarOpen: true,
  propertiesPanelOpen: true,
  history: [[]],
  historyIndex: 0,

  getActivePageNodes: () => {
    const state = get();
    return state.pages.find((p) => p.id === state.activePageId)?.nodes ?? [];
  },

  addNode: (type, index) =>
    set((state) => {
      const node = createDefaultNode(type);
      if (!node) return state;
      const currentNodes =
        state.pages.find((p) => p.id === state.activePageId)?.nodes ?? [];
      const targetIndex = index ?? currentNodes.length;
      const newNodes = insertNodeAt(currentNodes, node, targetIndex);
      return {
        pages: updatePageNodes(state.pages, state.activePageId, newNodes),
        selectedNodeId: node.id,
        ...pushHistory(state.history, state.historyIndex, newNodes),
      };
    }),

  removeNode: (id) =>
    set((state) => {
      const currentNodes =
        state.pages.find((p) => p.id === state.activePageId)?.nodes ?? [];
      const newNodes = removeNode(currentNodes, id);
      return {
        pages: updatePageNodes(state.pages, state.activePageId, newNodes),
        selectedNodeId:
          state.selectedNodeId === id ? null : state.selectedNodeId,
        ...pushHistory(state.history, state.historyIndex, newNodes),
      };
    }),

  selectNode: (id) => set({ selectedNodeId: id }),
  hoverNode: (id) => set({ hoveredNodeId: id }),

  updateProps: (id, props) =>
    set((state) => {
      const currentNodes =
        state.pages.find((p) => p.id === state.activePageId)?.nodes ?? [];
      const newNodes = updateNodeProps(currentNodes, id, props);
      return {
        pages: updatePageNodes(state.pages, state.activePageId, newNodes),
        ...pushHistory(state.history, state.historyIndex, newNodes),
      };
    }),

  duplicateNode: (id) =>
    set((state) => {
      const currentNodes =
        state.pages.find((p) => p.id === state.activePageId)?.nodes ?? [];
      const newNodes = duplicateNode(currentNodes, id, genId);
      return {
        pages: updatePageNodes(state.pages, state.activePageId, newNodes),
        ...pushHistory(state.history, state.historyIndex, newNodes),
      };
    }),

  moveNode: (nodeId, newIndex) =>
    set((state) => {
      const currentNodes =
        state.pages.find((p) => p.id === state.activePageId)?.nodes ?? [];
      const newNodes = moveNode(currentNodes, nodeId, newIndex);
      return {
        pages: updatePageNodes(state.pages, state.activePageId, newNodes),
        ...pushHistory(state.history, state.historyIndex, newNodes),
      };
    }),

  setViewportMode: (mode) => set({ viewportMode: mode }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  togglePropertiesPanel: () =>
    set((state) => ({ propertiesPanelOpen: !state.propertiesPanelOpen })),

  undo: () =>
    set((state) => {
      if (state.historyIndex <= 0) return state;
      const newIndex = state.historyIndex - 1;
      const nodes = structuredClone(state.history[newIndex]);
      return {
        pages: updatePageNodes(state.pages, state.activePageId, nodes),
        historyIndex: newIndex,
        selectedNodeId: null,
      };
    }),

  redo: () =>
    set((state) => {
      if (state.historyIndex >= state.history.length - 1) return state;
      const newIndex = state.historyIndex + 1;
      const nodes = structuredClone(state.history[newIndex]);
      return {
        pages: updatePageNodes(state.pages, state.activePageId, nodes),
        historyIndex: newIndex,
        selectedNodeId: null,
      };
    }),

  clearCanvas: () =>
    set((state) => {
      const newNodes: BuilderNode[] = [];
      return {
        pages: updatePageNodes(state.pages, state.activePageId, newNodes),
        selectedNodeId: null,
        ...pushHistory(state.history, state.historyIndex, newNodes),
      };
    }),

  // ── Collections ────────────────────────────────────
  collections: [],

  addCollection: (name) =>
    set((state) => ({
      collections: [
        ...state.collections,
        { id: genId(), name, icon: "Database", fields: [], records: [] },
      ],
    })),

  removeCollection: (id) =>
    set((state) => ({
      collections: state.collections.filter((c) => c.id !== id),
      endpoints: state.endpoints.filter((e) => e.collectionId !== id),
    })),

  renameCollection: (id, name) =>
    set((state) => ({
      collections: state.collections.map((c) =>
        c.id === id ? { ...c, name } : c,
      ),
    })),

  addField: (collectionId, field) =>
    set((state) => ({
      collections: state.collections.map((c) =>
        c.id === collectionId
          ? { ...c, fields: [...c.fields, { ...field, id: genId() }] }
          : c,
      ),
    })),

  removeField: (collectionId, fieldId) =>
    set((state) => ({
      collections: state.collections.map((c) =>
        c.id === collectionId
          ? { ...c, fields: c.fields.filter((f) => f.id !== fieldId) }
          : c,
      ),
    })),

  updateField: (collectionId, fieldId, updates) =>
    set((state) => ({
      collections: state.collections.map((c) =>
        c.id === collectionId
          ? {
              ...c,
              fields: c.fields.map((f) =>
                f.id === fieldId ? { ...f, ...updates } : f,
              ),
            }
          : c,
      ),
    })),

  addRecord: (collectionId, record) =>
    set((state) => ({
      collections: state.collections.map((c) =>
        c.id === collectionId ? { ...c, records: [...c.records, record] } : c,
      ),
    })),

  removeRecord: (collectionId, index) =>
    set((state) => ({
      collections: state.collections.map((c) =>
        c.id === collectionId
          ? { ...c, records: c.records.filter((_, i) => i !== index) }
          : c,
      ),
    })),

  updateRecord: (collectionId, index, record) =>
    set((state) => ({
      collections: state.collections.map((c) =>
        c.id === collectionId
          ? {
              ...c,
              records: c.records.map((r, i) => (i === index ? record : r)),
            }
          : c,
      ),
    })),

  // ── APIs ───────────────────────────────────────────
  endpoints: [],

  addEndpoint: (endpoint) =>
    set((state) => ({
      endpoints: [...state.endpoints, { ...endpoint, id: genId() }],
    })),

  removeEndpoint: (id) =>
    set((state) => ({
      endpoints: state.endpoints.filter((e) => e.id !== id),
    })),

  updateEndpoint: (id, updates) =>
    set((state) => ({
      endpoints: state.endpoints.map((e) =>
        e.id === id ? { ...e, ...updates } : e,
      ),
    })),

  generateCrudEndpoints: (collectionId) =>
    set((state) => {
      const col = state.collections.find((c) => c.id === collectionId);
      if (!col) return state;
      const basePath = `/api/${col.name.toLowerCase().replace(/\s+/g, "-")}`;
      const methods: {
        method: HttpMethod;
        suffix: string;
        name: string;
        desc: string;
      }[] = [
        {
          method: "GET",
          suffix: "",
          name: `List ${col.name}`,
          desc: `Get all ${col.name} records`,
        },
        {
          method: "GET",
          suffix: "/:id",
          name: `Get ${col.name}`,
          desc: `Get a single ${col.name} by ID`,
        },
        {
          method: "POST",
          suffix: "",
          name: `Create ${col.name}`,
          desc: `Create a new ${col.name} record`,
        },
        {
          method: "PUT",
          suffix: "/:id",
          name: `Update ${col.name}`,
          desc: `Update a ${col.name} by ID`,
        },
        {
          method: "DELETE",
          suffix: "/:id",
          name: `Delete ${col.name}`,
          desc: `Delete a ${col.name} by ID`,
        },
      ];
      const newEndpoints: ApiEndpoint[] = methods.map((m) => ({
        id: genId(),
        name: m.name,
        method: m.method,
        path: basePath + m.suffix,
        collectionId,
        description: m.desc,
        enabled: true,
      }));
      return { endpoints: [...state.endpoints, ...newEndpoints] };
    }),

  // ── Workflows ──────────────────────────────────────
  workflows: [],

  addWorkflow: (name, trigger) =>
    set((state) => ({
      workflows: [
        ...state.workflows,
        {
          id: genId(),
          name,
          trigger,
          triggerConfig: {},
          conditions: [],
          actions: [],
          enabled: true,
        },
      ],
    })),

  removeWorkflow: (id) =>
    set((state) => ({
      workflows: state.workflows.filter((w) => w.id !== id),
    })),

  updateWorkflow: (id, updates) =>
    set((state) => ({
      workflows: state.workflows.map((w) =>
        w.id === id ? { ...w, ...updates } : w,
      ),
    })),

  addWorkflowAction: (workflowId, action) =>
    set((state) => ({
      workflows: state.workflows.map((w) =>
        w.id === workflowId
          ? { ...w, actions: [...w.actions, { ...action, id: genId() }] }
          : w,
      ),
    })),

  removeWorkflowAction: (workflowId, actionId) =>
    set((state) => ({
      workflows: state.workflows.map((w) =>
        w.id === workflowId
          ? { ...w, actions: w.actions.filter((a) => a.id !== actionId) }
          : w,
      ),
    })),

  addWorkflowCondition: (workflowId, condition) =>
    set((state) => ({
      workflows: state.workflows.map((w) =>
        w.id === workflowId
          ? { ...w, conditions: [...w.conditions, condition] }
          : w,
      ),
    })),

  removeWorkflowCondition: (workflowId, index) =>
    set((state) => ({
      workflows: state.workflows.map((w) =>
        w.id === workflowId
          ? { ...w, conditions: w.conditions.filter((_, i) => i !== index) }
          : w,
      ),
    })),
}));
