export type PropType =
  | "text"
  | "number"
  | "select"
  | "color"
  | "boolean"
  | "textarea";

export interface PropDefinition {
  key: string;
  label: string;
  type: PropType;
  defaultValue: string | number | boolean;
  options?: { label: string; value: string }[]; // for select type
  placeholder?: string;
}

export interface ComponentDefinition {
  type: string;
  label: string;
  icon: string; // lucide icon name
  category: "layout" | "typography" | "media" | "interactive" | "blocks";
  description: string;
  props: PropDefinition[];
}

export interface BuilderNode {
  id: string;
  type: string;
  props: Record<string, string | number | boolean>;
  children: BuilderNode[];
}

export type ViewportMode = "desktop" | "tablet" | "mobile";

// ── Pages ──────────────────────────────────────────────
export interface AppPage {
  id: string;
  name: string;
  route: string;
  isSystem: boolean; // 404, 500 etc
  nodes: BuilderNode[];
}

// ── Data / Collections ─────────────────────────────────
export type FieldType =
  | "text"
  | "number"
  | "boolean"
  | "email"
  | "date"
  | "select"
  | "relation";

export interface CollectionField {
  id: string;
  name: string;
  type: FieldType;
  required: boolean;
  options?: string[]; // for select type
}

export interface Collection {
  id: string;
  name: string;
  icon: string;
  fields: CollectionField[];
  records: Record<string, string | number | boolean | null>[];
}

// ── APIs ───────────────────────────────────────────────
export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export interface ApiEndpoint {
  id: string;
  name: string;
  method: HttpMethod;
  path: string;
  collectionId: string | null; // linked collection
  description: string;
  enabled: boolean;
}

// ── Workflows / Logic ──────────────────────────────────
export type TriggerType =
  | "form_submit"
  | "button_click"
  | "page_load"
  | "api_call"
  | "schedule";
export type ActionType =
  | "create_record"
  | "update_record"
  | "delete_record"
  | "call_api"
  | "navigate"
  | "show_alert"
  | "set_variable";

export interface WorkflowAction {
  id: string;
  type: ActionType;
  label: string;
  config: Record<string, string>;
}

export interface WorkflowCondition {
  field: string;
  operator:
    | "equals"
    | "not_equals"
    | "contains"
    | "greater_than"
    | "less_than"
    | "is_empty";
  value: string;
}

export interface Workflow {
  id: string;
  name: string;
  trigger: TriggerType;
  triggerConfig: Record<string, string>;
  conditions: WorkflowCondition[];
  actions: WorkflowAction[];
  enabled: boolean;
}

// ── Editor State ───────────────────────────────────────
export type ActiveTab = "pages" | "data" | "api" | "logic";

export interface EditorState {
  // Active section
  activeTab: ActiveTab;

  // Pages
  pages: AppPage[];
  activePageId: string;

  // Builder (current page)
  selectedNodeId: string | null;
  hoveredNodeId: string | null;
  viewportMode: ViewportMode;
  history: BuilderNode[][];
  historyIndex: number;
  sidebarOpen: boolean;
  propertiesPanelOpen: boolean;

  // Data
  collections: Collection[];

  // APIs
  endpoints: ApiEndpoint[];

  // Workflows
  workflows: Workflow[];
}
