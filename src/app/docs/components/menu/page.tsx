import type { Metadata } from "next";
import { Menu, MenuItem, MenuTrigger } from "@neelshha/ui";
import { ApiTable } from "@/components/ApiTable";
import { Code, Install } from "@/components/Code";
import { Example } from "@/components/Example";

export const metadata: Metadata = {
  title: "Menu",
  description: "A silver key of ghost rows. Arrows move.",
};

const rows = [
  {
    name: "Menu id",
    type: "string",
    notes: "Required. Matches MenuTrigger menu. Native popover=auto.",
  },
  {
    name: "MenuTrigger menu",
    type: "string",
    notes: "Sets popoverTarget. Outline key by default. aria-expanded tracks the popover.",
  },
  {
    name: "MenuItem",
    type: "button",
    notes: "Wash on focus. role=menuitem. tabIndex=-1. Arrows move. Click hides the popover.",
  },
  {
    name: "MenuItem disabled",
    type: "boolean",
    def: "false",
    notes: "Native disabled. Arrows skip it.",
  },
] as const;

export default function MenuPage() {
  return (
    <article className="doc">
      <header className="docLead">
        <h1>Menu</h1>
        <p>
          A silver key of ghost rows, same type as the trigger. Opening
          washes the first item. Arrow keys move. Tab or a click hides it.
          This file is a client component.
        </p>
      </header>

      <Example
        code={`<MenuTrigger menu="actions">Actions</MenuTrigger>
<Menu id="actions">
  <MenuItem>Archive</MenuItem>
  <MenuItem>Duplicate</MenuItem>
  <MenuItem disabled>Delete</MenuItem>
</Menu>`}
      >
        <MenuTrigger menu="actions">Actions</MenuTrigger>
        <Menu id="actions">
          <MenuItem>Archive</MenuItem>
          <MenuItem>Duplicate</MenuItem>
          <MenuItem disabled>Delete</MenuItem>
        </Menu>
      </Example>

      <div className="docBlock">
        <h2>Installation</h2>
        <Install name="menu" />
      </div>

      <div className="docBlock">
        <h2>Usage</h2>
        <Code>{`import { Menu, MenuItem, MenuTrigger } from "@/components/ui/menu";

<MenuTrigger menu="actions">Actions</MenuTrigger>
<Menu id="actions">
  <MenuItem>Archive</MenuItem>
  <MenuItem>Duplicate</MenuItem>
</Menu>`}</Code>
      </div>

      <div className="docBlock">
        <h2>API</h2>
        <ApiTable rows={rows} />
      </div>
    </article>
  );
}
