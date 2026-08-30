import type { Metadata } from "next";
import {
  Sidebar,
  SidebarGroup,
  SidebarItem,
  SidebarLabel,
  SidebarList,
  SidebarNav,
} from "@neelshha/ui";
import { ApiTable } from "@/components/ApiTable";
import { Code, Install } from "@/components/Code";
import { Example } from "@/components/Example";

export const metadata: Metadata = {
  title: "Sidebar",
  description: "A paper rail. The current item is seated.",
};

const rows = [
  {
    name: "Sidebar",
    type: "aside",
    notes: "A paper rail with a hairline on the inline-end.",
  },
  {
    name: "SidebarLabel",
    type: "p",
    notes: "A group title. Optional href makes the title an a.",
  },
  {
    name: "SidebarItem href",
    type: "string",
    notes: "A text link. href makes an a. Omit href and pass a child to keep your own router.",
  },
  {
    name: "SidebarItem current",
    type: "boolean",
    def: "false",
    notes: "Sets aria-current=page and seats the item. Same language as Navbar and Tabs.",
  },
] as const;

export default function SidebarPage() {
  return (
    <article className="doc">
      <header className="docLead">
        <h1>Sidebar</h1>
        <p>
          A paper rail. Links are type. The current one is seated — same
          language as Navbar and Tabs. This site uses it. No JS.
        </p>
      </header>

      <Example
        code={`<Sidebar>
  <SidebarNav aria-label="Docs">
    <SidebarGroup>
      <SidebarLabel>Get started</SidebarLabel>
      <SidebarList>
        <SidebarItem href="/docs" current>Introduction</SidebarItem>
        <SidebarItem href="/docs/installation">Installation</SidebarItem>
      </SidebarList>
    </SidebarGroup>
    <SidebarGroup>
      <SidebarLabel>Components</SidebarLabel>
      <SidebarList>
        <SidebarItem href="/docs/components/field">Field</SidebarItem>
        <SidebarItem href="/docs/components/button">Button</SidebarItem>
      </SidebarList>
    </SidebarGroup>
  </SidebarNav>
</Sidebar>`}
      >
        <Sidebar>
          <SidebarNav aria-label="Example">
            <SidebarGroup>
              <SidebarLabel>Get started</SidebarLabel>
              <SidebarList>
                <SidebarItem href="/docs" current>
                  Introduction
                </SidebarItem>
                <SidebarItem href="/docs/installation">Installation</SidebarItem>
              </SidebarList>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarLabel>Components</SidebarLabel>
              <SidebarList>
                <SidebarItem href="/docs/components/field">Field</SidebarItem>
                <SidebarItem href="/docs/components/button">Button</SidebarItem>
              </SidebarList>
            </SidebarGroup>
          </SidebarNav>
        </Sidebar>
      </Example>

      <div className="docBlock">
        <h2>Installation</h2>
        <Install name="sidebar" />
      </div>

      <div className="docBlock">
        <h2>Usage</h2>
        <Code>{`import {
  Sidebar,
  SidebarGroup,
  SidebarItem,
  SidebarLabel,
  SidebarList,
  SidebarNav,
} from "@/components/ui/sidebar";

<Sidebar>
  <SidebarNav aria-label="Docs">
    <SidebarGroup>
      <SidebarLabel>Get started</SidebarLabel>
      <SidebarList>
        <SidebarItem href="/docs" current>Introduction</SidebarItem>
        <SidebarItem href="/docs/installation">Installation</SidebarItem>
      </SidebarList>
    </SidebarGroup>
  </SidebarNav>
</Sidebar>`}</Code>
      </div>

      <div className="docBlock">
        <h2>Current</h2>
        <p>
          Pass <code>current</code> on the item that matches the page. It sets{" "}
          <code>aria-current=&quot;page&quot;</code> and seats the item. The
          others stay type.
        </p>
        <p>
          <code>href</code> is a native <code>a</code>. In Next, omit{" "}
          <code>href</code> and pass <code>next/link</code> as the child so the
          layout does not reload.
        </p>
      </div>

      <div className="docBlock">
        <h2>API</h2>
        <ApiTable rows={rows} />
      </div>
    </article>
  );
}
