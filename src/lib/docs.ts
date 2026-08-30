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
  { slug: "accordion", title: "Accordion", description: "Exclusive details. No JS." },
  { slug: "alert", title: "Alert", description: "A hairline status. Tone is color." },
  { slug: "avatar", title: "Avatar", description: "A face. Initials if the image fails." },
  { slug: "badge", title: "Badge", description: "A small mark for status." },
  { slug: "breadcrumb", title: "Breadcrumb", description: "A native nav trail." },
  { slug: "button", title: "Button", description: "A native button. Raised key. Press stamps it in." },
  { slug: "card", title: "Card", description: "A hairline group. Children go in." },
  { slug: "checkbox", title: "Checkbox", description: "A native checkbox in Field chrome." },
  { slug: "dialog", title: "Dialog", description: "A native modal. showModal, not a portal." },
  { slug: "field", title: "Field", description: "A text field with a label that stays." },
  { slug: "kbd", title: "Kbd", description: "A tiny raised key." },
  { slug: "label", title: "Label", description: "A native label for composing outside Field." },
  { slug: "link", title: "Link", description: "An a. Dotted underline. Reads --link." },
  { slug: "menu", title: "Menu", description: "A popover of ghost keys. Arrows move." },
  { slug: "navbar", title: "Navbar", description: "A paper rail. The current item is seated." },
  { slug: "popover", title: "Popover", description: "A native popover. Top layer, light dismiss." },
  { slug: "progress", title: "Progress", description: "Native progress and meter." },
  { slug: "radio", title: "Radio", description: "A native radio. Group sets the name." },
  { slug: "select", title: "Select", description: "A native select in the Field well." },
  { slug: "separator", title: "Separator", description: "A line between things." },
  { slug: "sidebar", title: "Sidebar", description: "A paper rail. The current item is seated." },
  { slug: "skeleton", title: "Skeleton", description: "A pulsing well. Holds still if you reduce motion." },
  { slug: "spinner", title: "Spinner", description: "The pending glyph, extracted." },
  { slug: "switch", title: "Switch", description: "A checkbox that reads as a switch." },
  { slug: "table", title: "Table", description: "A semantic table. Type on paper. Hairline rows." },
  { slug: "tabs", title: "Tabs", description: "A tablist. The current tab is seated." },
  { slug: "text", title: "Text", description: "Typed copy that reads the tone tokens." },
  { slug: "toast", title: "Toast", description: "A live region. Not a modal." },
  { slug: "tooltip", title: "Tooltip", description: "A hint on hover or focus." },
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
