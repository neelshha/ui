export const SITE = "https://ui.neelshha.com";

export const headerNav = [
  { href: "/docs", label: "Docs" },
  { href: "/components", label: "Components" },
] as const;

export const startNav = [
  { href: "/docs", label: "Introduction" },
  { href: "/docs/installation", label: "Installation" },
  { href: "/docs/theming", label: "Theming" },
  { href: "/docs/cli", label: "CLI" },
] as const;

export const components = [
  { slug: "accordion", title: "Accordion", description: "Separate silver keys. Exclusive details. No JS." },
  { slug: "alert", title: "Alert", description: "A silver key. Tone is the title ink." },
  { slug: "avatar", title: "Avatar", description: "A silver face. Initials if the image fails." },
  { slug: "badge", title: "Badge", description: "A tiny silver key. Accent is sky." },
  { slug: "breadcrumb", title: "Breadcrumb", description: "A native nav trail." },
  { slug: "button", title: "Button", description: "A native button. Sky key. Press drops it 2px." },
  { slug: "card", title: "Card", description: "A silver key. Children go in." },
  { slug: "checkbox", title: "Checkbox", description: "A native checkbox in Field chrome." },
  { slug: "dialog", title: "Dialog", description: "A silver key modal. showModal, not a portal." },
  { slug: "field", title: "Field", description: "A text field with a label that stays." },
  { slug: "kbd", title: "Kbd", description: "A tiny silver key." },
  { slug: "label", title: "Label", description: "A native label for composing outside Field." },
  { slug: "link", title: "Link", description: "An a. Dotted underline. Reads --link." },
  { slug: "menu", title: "Menu", description: "A silver key of ghost rows. Anchored to the trigger." },
  { slug: "navbar", title: "Navbar", description: "A paper rail. Links are ghost; the current one holds the wash." },
  { slug: "popover", title: "Popover", description: "A silver key. Top layer, light dismiss." },
  { slug: "progress", title: "Progress", description: "A well. Sky fills it flush." },
  { slug: "radio", title: "Radio", description: "A native radio. Group sets the name." },
  { slug: "select", title: "Select", description: "A native select in the Field well." },
  { slug: "separator", title: "Separator", description: "A line between things." },
  { slug: "sidebar", title: "Sidebar", description: "A paper rail. The current item holds the hover wash." },
  { slug: "skeleton", title: "Skeleton", description: "A pulsing well. Holds still if you reduce motion." },
  { slug: "spinner", title: "Spinner", description: "Three ticks. The pending mark." },
  { slug: "switch", title: "Switch", description: "A checkbox that reads as a switch." },
  { slug: "table", title: "Table", description: "A semantic table on a silver key. Hairline rows and column rules." },
  { slug: "tabs", title: "Tabs", description: "A tablist. Outline keys; the current one is solid." },
  { slug: "text", title: "Text", description: "Typed copy that reads the tone tokens." },
  { slug: "toast", title: "Toast", description: "A silver key. A live region, not a modal." },
  { slug: "tooltip", title: "Tooltip", description: "A silver key on hover or focus." },
] as const;

export function componentHref(slug: string) {
  return `/docs/components/${slug}`;
}

export const componentNav = components.map((item) => ({
  href: componentHref(item.slug),
  label: item.title,
}));

export const pagerNav = [
  ...startNav,
  { href: "/components", label: "Components" },
  ...componentNav,
];
