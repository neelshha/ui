import type { Metadata } from "next";
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@neelshha/ui";
import { ApiTable } from "@/components/ApiTable";
import { Code, Install } from "@/components/Code";
import { Example } from "@/components/Example";

export const metadata: Metadata = {
  title: "Accordion",
  description: "Exclusive details. No JS.",
};

const rows = [
  {
    name: "name",
    type: "string",
    notes: "Cloned onto each details. Same name means exclusive — one open at a time.",
  },
  {
    name: "AccordionItem",
    type: "details",
    notes: "Native details. open is the usual attribute.",
  },
  {
    name: "AccordionTrigger",
    type: "summary",
    notes: "The clickable row. Marker is hidden.",
  },
  {
    name: "AccordionPanel",
    type: "div",
    notes: "The open body. Type, not chrome.",
  },
] as const;

export default function AccordionPage() {
  return (
    <article className="doc">
      <header className="docLead">
        <h1>Accordion</h1>
        <p>
          Native <code>details</code>. A shared <code>name</code> makes the
          group exclusive. No client file.
        </p>
      </header>

      <Example
        code={`<Accordion name="faq">
  <AccordionItem>
    <AccordionTrigger>Shipping</AccordionTrigger>
    <AccordionPanel>Leaves in two days.</AccordionPanel>
  </AccordionItem>
  <AccordionItem>
    <AccordionTrigger>Returns</AccordionTrigger>
    <AccordionPanel>Thirty days. Keep the box.</AccordionPanel>
  </AccordionItem>
</Accordion>`}
      >
        <Accordion name="faq">
          <AccordionItem>
            <AccordionTrigger>Shipping</AccordionTrigger>
            <AccordionPanel>Leaves in two days.</AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionTrigger>Returns</AccordionTrigger>
            <AccordionPanel>Thirty days. Keep the box.</AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Example>

      <Example
        title="Independent"
        description="Omit name and each details opens on its own."
        code={`<Accordion>
  <AccordionItem open>
    <AccordionTrigger>Shipping</AccordionTrigger>
    <AccordionPanel>Leaves in two days.</AccordionPanel>
  </AccordionItem>
  <AccordionItem>
    <AccordionTrigger>Returns</AccordionTrigger>
    <AccordionPanel>Thirty days. Keep the box.</AccordionPanel>
  </AccordionItem>
</Accordion>`}
      >
        <Accordion>
          <AccordionItem open>
            <AccordionTrigger>Shipping</AccordionTrigger>
            <AccordionPanel>Leaves in two days.</AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionTrigger>Returns</AccordionTrigger>
            <AccordionPanel>Thirty days. Keep the box.</AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Example>

      <div className="docBlock">
        <h2>Installation</h2>
        <Install name="accordion" />
      </div>

      <div className="docBlock">
        <h2>Usage</h2>
        <Code>{`import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@/components/ui/accordion";

<Accordion name="faq">
  <AccordionItem>
    <AccordionTrigger>Shipping</AccordionTrigger>
    <AccordionPanel>Leaves in two days.</AccordionPanel>
  </AccordionItem>
</Accordion>`}</Code>
      </div>

      <div className="docBlock">
        <h2>API</h2>
        <ApiTable rows={rows} />
      </div>
    </article>
  );
}
