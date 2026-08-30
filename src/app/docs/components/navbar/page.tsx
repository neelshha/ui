import type { Metadata } from "next";
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarItem,
  NavbarList,
  NavbarMenu,
  NavbarSpacer,
} from "@neelshha/ui";
import { ApiTable } from "@/components/ApiTable";
import { Code, Install } from "@/components/Code";
import { Example } from "@/components/Example";

export const metadata: Metadata = {
  title: "Navbar",
  description: "A paper rail. The current item is seated.",
};

const rows = [
  {
    name: "NavbarBrand href",
    type: "string",
    notes: "Text wordmark. Renders an a. Not a button. Omit href for a span.",
  },
  {
    name: "NavbarMenu label",
    type: "ReactNode",
    def: '"Menu"',
    notes: "The disclosure summary. Hidden from 48rem up. Native details. No JS.",
  },
  {
    name: "NavbarItem href",
    type: "string",
    notes: "A ghost Button. href makes an a. Omit href and pass a child to keep your own router.",
  },
  {
    name: "NavbarItem current",
    type: "boolean",
    def: "false",
    notes: "Sets aria-current=page and seats the key.",
  },
  {
    name: "NavbarSpacer",
    type: "div",
    notes: "Pushes trailing actions to the end of the rail.",
  },
] as const;

export default function NavbarPage() {
  return (
    <article className="doc">
      <header className="docLead">
        <h1>Navbar</h1>
        <p>
          A paper rail with a hairline under it. The wordmark is text. Links
          are ghost keys; the current one is seated. The menu is{" "}
          <code>details</code>, so it stays a Server Component.
        </p>
      </header>

      <Example wide>
        <Navbar>
          <NavbarBrand href="/">Acme</NavbarBrand>
          <NavbarMenu>
            <NavbarList>
              <NavbarItem href="/docs" current>
                Docs
              </NavbarItem>
              <NavbarItem href="/docs/components">Components</NavbarItem>
            </NavbarList>
          </NavbarMenu>
          <NavbarSpacer />
          <Button href="/docs/installation" variant="outline">
            Get started
          </Button>
        </Navbar>
      </Example>

      <div className="docBlock">
        <h2>Installation</h2>
        <Install name="navbar" />
      </div>

      <div className="docBlock">
        <h2>Usage</h2>
        <Code>{`import { Button } from "@/components/ui/button";
import {
  Navbar,
  NavbarBrand,
  NavbarItem,
  NavbarList,
  NavbarMenu,
  NavbarSpacer,
} from "@/components/ui/navbar";

<Navbar>
  <NavbarBrand href="/">Acme</NavbarBrand>
  <NavbarMenu>
    <NavbarList>
      <NavbarItem href="/docs" current>Docs</NavbarItem>
      <NavbarItem href="/pricing">Pricing</NavbarItem>
    </NavbarList>
  </NavbarMenu>
  <NavbarSpacer />
  <Button href="/login" variant="outline">Log in</Button>
</Navbar>`}</Code>
      </div>

      <Example
        title="Current page"
        description={
          <>
            Pass <code>current</code> on the item that matches the route. It
            sets <code>aria-current=&quot;page&quot;</code> and seats the key.
            The others stay ghost.
          </>
        }
        wide
        code={`<NavbarItem href="/docs" current>Docs</NavbarItem>`}
      >
        <Navbar>
          <NavbarBrand href="/">Acme</NavbarBrand>
          <NavbarMenu>
            <NavbarList>
              <NavbarItem href="/docs" current>
                Docs
              </NavbarItem>
              <NavbarItem href="/pricing">Pricing</NavbarItem>
              <NavbarItem href="/blog">Blog</NavbarItem>
            </NavbarList>
          </NavbarMenu>
        </Navbar>
      </Example>

      <Example
        title="Actions"
        description="Put keys after the spacer. They are ordinary buttons. Outline for a quiet action, solid for the one that matters."
        wide
        code={`<NavbarSpacer />
<Button href="/login" variant="ghost">Log in</Button>
<Button href="/signup">Sign up</Button>`}
      >
        <Navbar>
          <NavbarBrand href="/">Acme</NavbarBrand>
          <NavbarMenu>
            <NavbarList>
              <NavbarItem href="/docs">Docs</NavbarItem>
            </NavbarList>
          </NavbarMenu>
          <NavbarSpacer />
          <Button href="/docs" variant="ghost">
            Log in
          </Button>
          <Button href="/docs/installation">Sign up</Button>
        </Navbar>
      </Example>

      <div className="docBlock">
        <h2>API</h2>
        <ApiTable rows={rows} />
      </div>
    </article>
  );
}
