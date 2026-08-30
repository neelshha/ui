import type { Metadata } from "next";
import { Tab, TabList, TabPanel, Tabs } from "@neelshha/ui";
import { ApiTable } from "@/components/ApiTable";
import { Code, Install } from "@/components/Code";
import { Example } from "@/components/Example";

export const metadata: Metadata = {
  title: "Tabs",
  description: "A tablist. The current tab is seated.",
};

const rows = [
  {
    name: "defaultValue / value",
    type: "string",
    notes: "Uncontrolled default, or controlled value. onValueChange fires the next id.",
  },
  {
    name: "Tab value",
    type: "string",
    notes: "Required. Matches a TabPanel. Arrow keys move and select.",
  },
  {
    name: "Tab disabled",
    type: "boolean",
    def: "false",
    notes: "Skipped by click and arrows.",
  },
  {
    name: "TabPanel value",
    type: "string",
    notes: "Shown when it matches the selected tab.",
  },
] as const;

export default function TabsPage() {
  return (
    <article className="doc">
      <header className="docLead">
        <h1>Tabs</h1>
        <p>
          A native tablist. Tabs are ghost keys. The current one is seated,
          same language as Navbar. This file is a client component.
        </p>
      </header>

      <Example>
        <Tabs defaultValue="profile">
          <TabList>
            <Tab value="profile">Profile</Tab>
            <Tab value="billing">Billing</Tab>
            <Tab value="members">Members</Tab>
          </TabList>
          <TabPanel value="profile">
            Name, email, and the theme you already set.
          </TabPanel>
          <TabPanel value="billing">
            Plan and invoices. A table goes here.
          </TabPanel>
          <TabPanel value="members">
            People with access. Invite is a solid key.
          </TabPanel>
        </Tabs>
      </Example>

      <Example
        title="Disabled"
        description="A disabled tab is skipped. Arrows jump over it."
        code={`<Tabs defaultValue="profile">
  <TabList>
    <Tab value="profile">Profile</Tab>
    <Tab value="billing" disabled>Billing</Tab>
    <Tab value="members">Members</Tab>
  </TabList>
</Tabs>`}
      >
        <Tabs defaultValue="profile">
          <TabList>
            <Tab value="profile">Profile</Tab>
            <Tab value="billing" disabled>
              Billing
            </Tab>
            <Tab value="members">Members</Tab>
          </TabList>
        </Tabs>
      </Example>

      <div className="docBlock">
        <h2>Installation</h2>
        <Install name="tabs" />
      </div>

      <div className="docBlock">
        <h2>Usage</h2>
        <Code>{`import { Tab, TabList, TabPanel, Tabs } from "@/components/ui/tabs";

<Tabs defaultValue="profile">
  <TabList>
    <Tab value="profile">Profile</Tab>
    <Tab value="billing">Billing</Tab>
  </TabList>
  <TabPanel value="profile">Profile copy.</TabPanel>
  <TabPanel value="billing">Billing copy.</TabPanel>
</Tabs>`}</Code>
      </div>

      <div className="docBlock">
        <h2>API</h2>
        <ApiTable rows={rows} />
      </div>
    </article>
  );
}
