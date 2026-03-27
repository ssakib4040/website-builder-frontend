import { ComponentDefinition } from "./types";

export const componentRegistry: ComponentDefinition[] = [
  // Layout
  {
    type: "section",
    label: "Section",
    icon: "LayoutTemplate",
    category: "layout",
    description: "A full-width section container",
    props: [
      {
        key: "padding",
        label: "Padding",
        type: "select",
        defaultValue: "md",
        options: [
          { label: "None", value: "none" },
          { label: "Small", value: "sm" },
          { label: "Medium", value: "md" },
          { label: "Large", value: "lg" },
        ],
      },
      {
        key: "background",
        label: "Background",
        type: "color",
        defaultValue: "#ffffff",
      },
    ],
  },
  {
    type: "columns",
    label: "Columns",
    icon: "Columns3",
    category: "layout",
    description: "Side-by-side column layout",
    props: [
      {
        key: "count",
        label: "Columns",
        type: "select",
        defaultValue: "2",
        options: [
          { label: "2", value: "2" },
          { label: "3", value: "3" },
          { label: "4", value: "4" },
        ],
      },
      {
        key: "gap",
        label: "Gap",
        type: "select",
        defaultValue: "md",
        options: [
          { label: "Small", value: "sm" },
          { label: "Medium", value: "md" },
          { label: "Large", value: "lg" },
        ],
      },
    ],
  },
  {
    type: "spacer",
    label: "Spacer",
    icon: "MoveVertical",
    category: "layout",
    description: "Vertical space between elements",
    props: [
      {
        key: "height",
        label: "Height",
        type: "select",
        defaultValue: "md",
        options: [
          { label: "Small (16px)", value: "sm" },
          { label: "Medium (32px)", value: "md" },
          { label: "Large (64px)", value: "lg" },
          { label: "XL (96px)", value: "xl" },
        ],
      },
    ],
  },
  // Typography
  {
    type: "heading",
    label: "Heading",
    icon: "Heading",
    category: "typography",
    description: "A heading element (H1-H6)",
    props: [
      { key: "text", label: "Text", type: "text", defaultValue: "Untitled" },
      {
        key: "level",
        label: "Level",
        type: "select",
        defaultValue: "h2",
        options: [
          { label: "H1", value: "h1" },
          { label: "H2", value: "h2" },
          { label: "H3", value: "h3" },
          { label: "H4", value: "h4" },
        ],
      },
      {
        key: "align",
        label: "Align",
        type: "select",
        defaultValue: "left",
        options: [
          { label: "Left", value: "left" },
          { label: "Center", value: "center" },
          { label: "Right", value: "right" },
        ],
      },
    ],
  },
  {
    type: "paragraph",
    label: "Text",
    icon: "Type",
    category: "typography",
    description: "A paragraph of text",
    props: [
      {
        key: "text",
        label: "Text",
        type: "textarea",
        defaultValue: "Start writing here...",
      },
      {
        key: "align",
        label: "Align",
        type: "select",
        defaultValue: "left",
        options: [
          { label: "Left", value: "left" },
          { label: "Center", value: "center" },
          { label: "Right", value: "right" },
        ],
      },
    ],
  },
  {
    type: "quote",
    label: "Quote",
    icon: "Quote",
    category: "typography",
    description: "A blockquote element",
    props: [
      {
        key: "text",
        label: "Text",
        type: "textarea",
        defaultValue: "A meaningful quote...",
      },
      { key: "author", label: "Author", type: "text", defaultValue: "" },
    ],
  },
  {
    type: "divider",
    label: "Divider",
    icon: "Minus",
    category: "typography",
    description: "A horizontal line divider",
    props: [],
  },
  // Media
  {
    type: "image",
    label: "Image",
    icon: "Image",
    category: "media",
    description: "An image element",
    props: [
      {
        key: "src",
        label: "Image URL",
        type: "text",
        defaultValue: "https://placehold.co/800x400/f4f4f5/a1a1aa?text=Image",
      },
      {
        key: "alt",
        label: "Alt text",
        type: "text",
        defaultValue: "Image description",
      },
      { key: "rounded", label: "Rounded", type: "boolean", defaultValue: true },
    ],
  },
  // Interactive
  {
    type: "button",
    label: "Button",
    icon: "MousePointerClick",
    category: "interactive",
    description: "A clickable button",
    props: [
      { key: "text", label: "Label", type: "text", defaultValue: "Click me" },
      {
        key: "variant",
        label: "Variant",
        type: "select",
        defaultValue: "default",
        options: [
          { label: "Default", value: "default" },
          { label: "Secondary", value: "secondary" },
          { label: "Outline", value: "outline" },
          { label: "Ghost", value: "ghost" },
        ],
      },
      {
        key: "align",
        label: "Align",
        type: "select",
        defaultValue: "left",
        options: [
          { label: "Left", value: "left" },
          { label: "Center", value: "center" },
          { label: "Right", value: "right" },
        ],
      },
    ],
  },
  // Blocks
  {
    type: "hero",
    label: "Hero",
    icon: "Sparkles",
    category: "blocks",
    description: "A hero section with heading and CTA",
    props: [
      {
        key: "title",
        label: "Title",
        type: "text",
        defaultValue: "Build something amazing",
      },
      {
        key: "subtitle",
        label: "Subtitle",
        type: "textarea",
        defaultValue: "Create beautiful websites without writing code.",
      },
      {
        key: "buttonText",
        label: "Button Text",
        type: "text",
        defaultValue: "Get Started",
      },
    ],
  },
  {
    type: "card",
    label: "Card",
    icon: "RectangleHorizontal",
    category: "blocks",
    description: "A content card",
    props: [
      {
        key: "title",
        label: "Title",
        type: "text",
        defaultValue: "Card Title",
      },
      {
        key: "description",
        label: "Description",
        type: "textarea",
        defaultValue: "A short description of this item.",
      },
      {
        key: "image",
        label: "Image URL",
        type: "text",
        defaultValue: "https://placehold.co/400x200/f4f4f5/a1a1aa?text=Card",
      },
    ],
  },
];

export function getComponentDef(type: string): ComponentDefinition | undefined {
  return componentRegistry.find((c) => c.type === type);
}

export const categoryLabels: Record<string, string> = {
  layout: "Layout",
  typography: "Typography",
  media: "Media",
  interactive: "Interactive",
  blocks: "Blocks",
};
