import { create } from "zustand";
import {
  BuilderNode,
  ViewportMode,
  ActiveTab,
  AppPage,
  PageCategory,
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
function n(
  type: string,
  props: Record<string, string | number | boolean>,
  children: BuilderNode[] = [],
): BuilderNode {
  return { id: genId(), type, props, children };
}

function page(
  name: string,
  route: string,
  category: PageCategory,
  isSystem: boolean,
  nodes: BuilderNode[],
): AppPage {
  return { id: genId(), name, route, category, isSystem, nodes };
}

function createDefaultPages(): AppPage[] {
  return [
    // ── Marketing ─────────────────────────────────────
    page("Home", "/", "marketing", false, [
      n("hero", {
        title: "Build websites without writing a single line of code.",
        subtitle:
          "WebCraft gives you a powerful drag-and-drop editor, real data collections, and instant publishing — all in one place.",
        buttonText: "Start Building for Free",
      }),
      n("spacer", { height: "md" }),
      n("heading", {
        text: "Everything you need to ship fast",
        level: "h2",
        align: "center",
      }),
      n("paragraph", {
        text: "From landing pages to full web apps — WebCraft handles the design, data, and deployment so you can focus on your idea.",
        align: "center",
      }),
      n("spacer", { height: "md" }),
      n("columns", { count: "3", gap: "md" }),
      n("spacer", { height: "lg" }),
      n("divider", {}),
      n("spacer", { height: "md" }),
      n("heading", {
        text: "Trusted by makers and teams worldwide",
        level: "h2",
        align: "center",
      }),
      n("paragraph", {
        text: "Join thousands of creators who launch faster with WebCraft.",
        align: "center",
      }),
      n("spacer", { height: "md" }),
    ]),

    page("About", "/about", "marketing", false, [
      n("heading", { text: "About WebCraft", level: "h1", align: "left" }),
      n("paragraph", {
        text: "WebCraft was built by a small team tired of the gap between design tools and real deployment. We believe everyone deserves the ability to publish a professional website without needing a developer on speed-dial.",
        align: "left",
      }),
      n("spacer", { height: "md" }),
      n("image", {
        src: "https://placehold.co/1200x400/f4f4f5/a1a1aa?text=Our+Team",
        alt: "The WebCraft team",
        rounded: true,
      }),
      n("spacer", { height: "md" }),
      n("heading", { text: "Our mission", level: "h2", align: "left" }),
      n("paragraph", {
        text: "To make professional web publishing accessible to every creator, founder, and small team — regardless of their technical background.",
        align: "left",
      }),
      n("spacer", { height: "md" }),
      n("heading", { text: "Values we build by", level: "h2", align: "left" }),
      n("columns", { count: "3", gap: "md" }),
    ]),

    page("Pricing", "/pricing", "marketing", false, [
      n("heading", {
        text: "Simple, honest pricing",
        level: "h1",
        align: "center",
      }),
      n("paragraph", {
        text: "No hidden fees. No per-seat surprises. Pick the plan that fits where you are today.",
        align: "center",
      }),
      n("spacer", { height: "md" }),
      n("columns", { count: "3", gap: "md" }),
      n("spacer", { height: "md" }),
      n("divider", {}),
      n("spacer", { height: "md" }),
      n("heading", {
        text: "Frequently asked questions",
        level: "h2",
        align: "left",
      }),
      n("spacer", { height: "sm" }),
      n("heading", {
        text: "Can I cancel anytime?",
        level: "h4",
        align: "left",
      }),
      n("paragraph", {
        text: "Yes. Cancel from your account settings — no questions asked, no penalties.",
        align: "left",
      }),
      n("heading", {
        text: "Is there a free trial?",
        level: "h4",
        align: "left",
      }),
      n("paragraph", {
        text: "All plans start with a 14-day free trial. No credit card required.",
        align: "left",
      }),
      n("heading", {
        text: "What happens to my site if I downgrade?",
        level: "h4",
        align: "left",
      }),
      n("paragraph", {
        text: "Your site stays live. Features above your new plan limit are locked, not deleted.",
        align: "left",
      }),
    ]),

    page("Features", "/features", "marketing", false, [
      n("hero", {
        title: "One platform. Every tool you need.",
        subtitle:
          "Visual builder, data collections, API endpoints, automation workflows — all wired together.",
        buttonText: "See it in action",
      }),
      n("spacer", { height: "md" }),
      n("heading", { text: "Visual Page Builder", level: "h2", align: "left" }),
      n("paragraph", {
        text: "Drag any component onto the canvas. Resize, rearrange, and configure without touching code. What you see is exactly what your visitors get.",
        align: "left",
      }),
      n("image", {
        src: "https://placehold.co/1200x500/f4f4f5/a1a1aa?text=Builder+Preview",
        alt: "Builder preview",
        rounded: true,
      }),
      n("spacer", { height: "md" }),
      n("heading", {
        text: "Built-in Data Collections",
        level: "h2",
        align: "left",
      }),
      n("paragraph", {
        text: "Define your schema, add records, and bind live data to any element on your page — no backend code required.",
        align: "left",
      }),
      n("spacer", { height: "md" }),
      n("heading", { text: "Instant Publishing", level: "h2", align: "left" }),
      n("paragraph", {
        text: "Hit Publish and your site is live on a global CDN in seconds. Custom domains, SSL, and redirects included.",
        align: "left",
      }),
    ]),

    page("Contact", "/contact", "marketing", false, [
      n("heading", { text: "Get in touch", level: "h1", align: "left" }),
      n("paragraph", {
        text: "Have a question, a partnership idea, or just want to say hi? We read every message and reply within one business day.",
        align: "left",
      }),
      n("spacer", { height: "md" }),
      n("columns", { count: "2", gap: "lg" }),
      n("spacer", { height: "md" }),
      n("divider", {}),
      n("spacer", { height: "md" }),
      n("heading", { text: "Find us", level: "h3", align: "left" }),
      n("paragraph", {
        text: "📍  Remote-first · Headquarters in London, UK\n📧  hello@webcraft.app\n🐦  @webcraft",
        align: "left",
      }),
    ]),

    page("Blog", "/blog", "blog", false, [
      n("heading", { text: "The WebCraft Blog", level: "h1", align: "left" }),
      n("paragraph", {
        text: "Product updates, design tips, maker interviews, and everything in between.",
        align: "left",
      }),
      n("spacer", { height: "md" }),
      n("columns", { count: "3", gap: "md" }),
      n("spacer", { height: "md" }),
      n("heading", { text: "Latest posts", level: "h2", align: "left" }),
      n("spacer", { height: "sm" }),
      n("card", {
        title: "Introducing WebCraft 2.0",
        description:
          "A complete overhaul of the builder with new components, faster performance, and a redesigned UI.",
        image: "https://placehold.co/800x400/f4f4f5/a1a1aa?text=Post+Cover",
      }),
      n("spacer", { height: "sm" }),
      n("card", {
        title: "How to build a landing page in under 10 minutes",
        description:
          "A step-by-step walkthrough of creating a conversion-ready landing page using only built-in blocks.",
        image: "https://placehold.co/800x400/f4f4f5/a1a1aa?text=Tutorial",
      }),
    ]),

    page("Blog Post", "/blog/:slug", "blog", false, [
      n("heading", {
        text: "Introducing WebCraft 2.0",
        level: "h1",
        align: "left",
      }),
      n("paragraph", {
        text: "Published March 27, 2026 · 5 min read",
        align: "left",
      }),
      n("spacer", { height: "sm" }),
      n("image", {
        src: "https://placehold.co/1200x500/f4f4f5/a1a1aa?text=Article+Cover",
        alt: "Article cover",
        rounded: true,
      }),
      n("spacer", { height: "md" }),
      n("paragraph", {
        text: "Today we're excited to announce WebCraft 2.0 — the biggest update since we launched. This release brings a completely rebuilt canvas engine, 40+ new components, real-time collaboration, and a brand new pricing model that starts at free.",
        align: "left",
      }),
      n("heading", { text: "What's new", level: "h2", align: "left" }),
      n("paragraph", {
        text: "The canvas is now 3× faster. We rewrote the drag-and-drop engine from scratch to handle complex page layouts without frame drops. You'll notice the difference the moment you open the builder.",
        align: "left",
      }),
      n("quote", {
        text: "WebCraft 2.0 is the tool I wish existed when I started building on the web.",
        author: "Sara K., indie founder",
      }),
      n("spacer", { height: "md" }),
      n("paragraph", {
        text: "We're shipping more every week. Follow us on X or subscribe to the newsletter to stay in the loop.",
        align: "left",
      }),
      n("button", {
        text: "Subscribe to updates",
        variant: "default",
        align: "left",
      }),
    ]),

    // ── Auth ──────────────────────────────────────────
    page("Sign In", "/sign-in", "auth", false, [
      n("heading", { text: "Welcome back", level: "h1", align: "center" }),
      n("paragraph", {
        text: "Sign in to your WebCraft account.",
        align: "center",
      }),
      n("spacer", { height: "md" }),
      n("card", {
        title: "Sign in",
        description: "Enter your email and password to continue.",
        image: "",
      }),
      n("spacer", { height: "sm" }),
      n("paragraph", {
        text: "Don't have an account? Sign up →",
        align: "center",
      }),
    ]),

    page("Sign Up", "/sign-up", "auth", false, [
      n("heading", {
        text: "Create your account",
        level: "h1",
        align: "center",
      }),
      n("paragraph", {
        text: "Start building for free — no credit card required.",
        align: "center",
      }),
      n("spacer", { height: "md" }),
      n("card", {
        title: "Get started",
        description: "Fill in your details to create a free WebCraft account.",
        image: "",
      }),
      n("spacer", { height: "sm" }),
      n("paragraph", {
        text: "Already have an account? Sign in →",
        align: "center",
      }),
    ]),

    page("Forgot Password", "/forgot-password", "auth", false, [
      n("heading", {
        text: "Forgot your password?",
        level: "h1",
        align: "center",
      }),
      n("paragraph", {
        text: "Enter the email address linked to your account and we'll send you a reset link.",
        align: "center",
      }),
      n("spacer", { height: "md" }),
      n("card", {
        title: "Reset password",
        description: "We'll email you a secure link.",
        image: "",
      }),
      n("spacer", { height: "sm" }),
      n("paragraph", { text: "Remembered it? Sign in →", align: "center" }),
    ]),

    page("Reset Password", "/reset-password", "auth", false, [
      n("heading", {
        text: "Set a new password",
        level: "h1",
        align: "center",
      }),
      n("paragraph", {
        text: "Choose a strong password you haven't used before.",
        align: "center",
      }),
      n("spacer", { height: "md" }),
      n("card", {
        title: "New password",
        description: "Must be at least 8 characters.",
        image: "",
      }),
    ]),

    page("Verify Email", "/verify-email", "auth", false, [
      n("heading", { text: "Check your inbox", level: "h1", align: "center" }),
      n("paragraph", {
        text: "We've sent a verification link to the email address you provided. Click the link to activate your account.",
        align: "center",
      }),
      n("spacer", { height: "md" }),
      n("paragraph", {
        text: "Didn't receive it? Check your spam folder or resend the email.",
        align: "center",
      }),
      n("button", {
        text: "Resend verification email",
        variant: "outline",
        align: "center",
      }),
    ]),

    // ── Legal ─────────────────────────────────────────
    page("Privacy Policy", "/privacy", "legal", false, [
      n("heading", { text: "Privacy Policy", level: "h1", align: "left" }),
      n("paragraph", { text: "Last updated: March 27, 2026", align: "left" }),
      n("spacer", { height: "sm" }),
      n("paragraph", {
        text: 'WebCraft Inc. ("WebCraft", "we", "us", "our") takes your privacy seriously. This policy explains what data we collect, how we use it, and the choices you have.',
        align: "left",
      }),
      n("heading", {
        text: "1. Information we collect",
        level: "h2",
        align: "left",
      }),
      n("paragraph", {
        text: "Account information (name, email, password hash), usage data (pages visited, features used, session duration), and technical data (IP address, browser, device type).",
        align: "left",
      }),
      n("heading", {
        text: "2. How we use your data",
        level: "h2",
        align: "left",
      }),
      n("paragraph", {
        text: "To provide and improve our service, send transactional emails, and (with your consent) send product updates and newsletters.",
        align: "left",
      }),
      n("heading", { text: "3. Data retention", level: "h2", align: "left" }),
      n("paragraph", {
        text: "We retain your data for as long as your account is active. You may delete your account at any time, which permanently removes your data within 30 days.",
        align: "left",
      }),
      n("heading", { text: "4. Contact", level: "h2", align: "left" }),
      n("paragraph", {
        text: "Questions? Email privacy@webcraft.app.",
        align: "left",
      }),
    ]),

    page("Terms of Service", "/terms", "legal", false, [
      n("heading", { text: "Terms of Service", level: "h1", align: "left" }),
      n("paragraph", { text: "Last updated: March 27, 2026", align: "left" }),
      n("spacer", { height: "sm" }),
      n("paragraph", {
        text: "By creating an account or using WebCraft, you agree to these terms. Please read them carefully.",
        align: "left",
      }),
      n("heading", { text: "1. Acceptable use", level: "h2", align: "left" }),
      n("paragraph", {
        text: "You may not use WebCraft to host illegal content, infringe intellectual property, send spam, or attempt to reverse-engineer the platform.",
        align: "left",
      }),
      n("heading", {
        text: "2. Service availability",
        level: "h2",
        align: "left",
      }),
      n("paragraph", {
        text: "We aim for 99.9% uptime but do not guarantee uninterrupted access. Scheduled maintenance is announced at least 24 hours in advance.",
        align: "left",
      }),
      n("heading", {
        text: "3. Limitation of liability",
        level: "h2",
        align: "left",
      }),
      n("paragraph", {
        text: "WebCraft's total liability to you shall not exceed the amount you paid in the 12 months prior to the claim.",
        align: "left",
      }),
      n("heading", { text: "4. Governing law", level: "h2", align: "left" }),
      n("paragraph", {
        text: "These terms are governed by the laws of England and Wales.",
        align: "left",
      }),
    ]),

    page("Cookie Policy", "/cookies", "legal", false, [
      n("heading", { text: "Cookie Policy", level: "h1", align: "left" }),
      n("paragraph", { text: "Last updated: March 27, 2026", align: "left" }),
      n("spacer", { height: "sm" }),
      n("paragraph", {
        text: "This policy explains how WebCraft uses cookies and similar technologies when you visit our website.",
        align: "left",
      }),
      n("heading", { text: "What are cookies?", level: "h2", align: "left" }),
      n("paragraph", {
        text: "Cookies are small text files stored on your device. They help us keep you signed in, remember your preferences, and understand how you use our product.",
        align: "left",
      }),
      n("heading", { text: "Cookies we use", level: "h2", align: "left" }),
      n("paragraph", {
        text: "Essential cookies (required for login and security), analytics cookies (anonymous usage stats to improve the product), and preference cookies (theme, language).",
        align: "left",
      }),
      n("heading", { text: "Managing cookies", level: "h2", align: "left" }),
      n("paragraph", {
        text: "You can control cookies through your browser settings. Disabling essential cookies will prevent you from signing in.",
        align: "left",
      }),
    ]),

    // ── Email templates ───────────────────────────────
    page("Email: Welcome", "/email/welcome", "email", false, [
      n("heading", {
        text: "Welcome to WebCraft 👋",
        level: "h1",
        align: "center",
      }),
      n("paragraph", {
        text: "Your account is ready. Let's build something.",
        align: "center",
      }),
      n("spacer", { height: "md" }),
      n("image", {
        src: "https://placehold.co/600x200/f4f4f5/a1a1aa?text=Header+Image",
        alt: "Welcome banner",
        rounded: true,
      }),
      n("spacer", { height: "md" }),
      n("paragraph", {
        text: "Hey there,\n\nThanks for joining WebCraft. You're now on the free plan — create up to 3 pages, publish instantly, and upgrade whenever you're ready.",
        align: "left",
      }),
      n("button", {
        text: "Open your dashboard",
        variant: "default",
        align: "center",
      }),
      n("spacer", { height: "md" }),
      n("paragraph", {
        text: "Questions? Just reply to this email — we read every one.\n\n— The WebCraft team",
        align: "left",
      }),
    ]),

    page("Email: Password Reset", "/email/password-reset", "email", false, [
      n("heading", {
        text: "Reset your password",
        level: "h1",
        align: "center",
      }),
      n("spacer", { height: "sm" }),
      n("paragraph", {
        text: "We received a request to reset the password for your WebCraft account. Click the button below to choose a new one.",
        align: "center",
      }),
      n("spacer", { height: "md" }),
      n("button", {
        text: "Reset my password",
        variant: "default",
        align: "center",
      }),
      n("spacer", { height: "md" }),
      n("paragraph", {
        text: "This link expires in 1 hour. If you didn't request a reset, you can safely ignore this email — your account is unchanged.",
        align: "left",
      }),
    ]),

    page("Email: Verify Account", "/email/verify", "email", false, [
      n("heading", {
        text: "Confirm your email address",
        level: "h1",
        align: "center",
      }),
      n("spacer", { height: "sm" }),
      n("paragraph", {
        text: "Click the button below to verify your email and activate your WebCraft account.",
        align: "center",
      }),
      n("spacer", { height: "md" }),
      n("button", {
        text: "Verify my email",
        variant: "default",
        align: "center",
      }),
      n("spacer", { height: "md" }),
      n("paragraph", {
        text: "If you didn't create a WebCraft account, no action is needed — this email was sent by mistake.",
        align: "left",
      }),
    ]),

    page("Email: Plan Upgrade", "/email/plan-upgrade", "email", false, [
      n("heading", {
        text: "You're on the Pro plan 🚀",
        level: "h1",
        align: "center",
      }),
      n("spacer", { height: "sm" }),
      n("paragraph", {
        text: "Your upgrade is confirmed. You now have unlimited pages, custom domains, priority support, and access to all Pro components.",
        align: "center",
      }),
      n("spacer", { height: "md" }),
      n("button", {
        text: "Go to your dashboard",
        variant: "default",
        align: "center",
      }),
      n("spacer", { height: "md" }),
      n("paragraph", {
        text: "Your first invoice has been sent to the email on your account. Manage your subscription any time from Settings → Billing.",
        align: "left",
      }),
    ]),

    page("Email: Payment Failed", "/email/payment-failed", "email", false, [
      n("heading", {
        text: "We couldn't process your payment",
        level: "h1",
        align: "center",
      }),
      n("spacer", { height: "sm" }),
      n("paragraph", {
        text: "Your most recent payment for WebCraft Pro was declined. To keep your Pro features active, please update your payment method.",
        align: "center",
      }),
      n("spacer", { height: "md" }),
      n("button", {
        text: "Update payment method",
        variant: "default",
        align: "center",
      }),
      n("spacer", { height: "md" }),
      n("paragraph", {
        text: "If you continue to have trouble, contact us at billing@webcraft.app and we'll sort it out.",
        align: "left",
      }),
    ]),

    // ── Error pages ───────────────────────────────────
    page("404 Not Found", "/404", "error", true, [
      n("heading", { text: "404", level: "h1", align: "center" }),
      n("heading", { text: "Page not found", level: "h2", align: "center" }),
      n("paragraph", {
        text: "The page you're looking for doesn't exist or has been moved. Double-check the URL, or head back to the homepage.",
        align: "center",
      }),
      n("spacer", { height: "sm" }),
      n("button", {
        text: "Back to home",
        variant: "default",
        align: "center",
      }),
    ]),

    page("500 Server Error", "/500", "error", true, [
      n("heading", { text: "500", level: "h1", align: "center" }),
      n("heading", {
        text: "Something went wrong",
        level: "h2",
        align: "center",
      }),
      n("paragraph", {
        text: "An unexpected error occurred on our end. Our team has been notified. Please try again in a few minutes.",
        align: "center",
      }),
      n("spacer", { height: "sm" }),
      n("button", { text: "Try again", variant: "outline", align: "center" }),
      n("button", { text: "Back to home", variant: "ghost", align: "center" }),
    ]),

    page("503 Maintenance", "/503", "error", true, [
      n("heading", { text: "Be right back", level: "h1", align: "center" }),
      n("heading", {
        text: "We're down for scheduled maintenance",
        level: "h3",
        align: "center",
      }),
      n("paragraph", {
        text: "We're making improvements to WebCraft and expect to be back online within the hour. Thanks for your patience.",
        align: "center",
      }),
      n("spacer", { height: "sm" }),
      n("paragraph", {
        text: "Follow @webcraft for live updates.",
        align: "center",
      }),
    ]),

    page("Offline", "/offline", "error", true, [
      n("heading", { text: "You're offline", level: "h1", align: "center" }),
      n("paragraph", {
        text: "It looks like you've lost your internet connection. Check your network settings and try again.",
        align: "center",
      }),
      n("spacer", { height: "sm" }),
      n("button", { text: "Try again", variant: "default", align: "center" }),
    ]),
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
        category: "other",
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
