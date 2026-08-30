import type { Metadata } from "next";
import { ApiTable } from "@/components/ApiTable";
import { Code, Install } from "@/components/Code";
import { DialogDemo } from "@/components/DialogDemo";
import { Example } from "@/components/Example";

export const metadata: Metadata = {
  title: "Dialog",
  description: "A silver key modal. showModal, not a portal.",
};

const rows = [
  {
    name: "open",
    type: "boolean",
    notes: "Controlled. Calls showModal and close. Omit it to drive the dialog yourself.",
  },
  {
    name: "onOpenChange",
    type: "(open: boolean) => void",
    notes: "Fires false when the dialog closes, including Escape.",
  },
  {
    name: "DialogTitle",
    type: "h2",
    notes: "The heading. Dialog sets aria-labelledby to it.",
  },
  {
    name: "DialogDescription",
    type: "p",
    notes: "Supporting copy. Dialog sets aria-describedby to it.",
  },
  {
    name: "DialogActions",
    type: "div",
    notes: "A trailing row for keys.",
  },
  {
    name: "DialogClose",
    type: "button",
    notes: "A form with method=dialog. variant matches Button.",
  },
] as const;

export default function DialogPage() {
  return (
    <article className="doc">
      <header className="docLead">
        <h1>Dialog</h1>
        <p>
          A native <code>dialog</code>. Controlled <code>open</code> calls{" "}
          <code>showModal</code>. <code>DialogClose</code> is a form with{" "}
          <code>method=&quot;dialog&quot;</code>. This file is a client
          component.
        </p>
      </header>

      <Example>
        <DialogDemo />
      </Example>

      <div className="docBlock">
        <h2>Installation</h2>
        <Install name="dialog" />
      </div>

      <div className="docBlock">
        <h2>Usage</h2>
        <Code>{`import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogActions,
  DialogClose,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Delete</Button>
<Dialog open={open} onOpenChange={setOpen}>
  <DialogTitle>Delete this project?</DialogTitle>
  <DialogDescription>This cannot be undone.</DialogDescription>
  <DialogActions>
    <DialogClose>Cancel</DialogClose>
    <DialogClose variant="danger">Delete</DialogClose>
  </DialogActions>
</Dialog>`}</Code>
      </div>

      <div className="docBlock">
        <h2>Uncontrolled</h2>
        <p>
          Omit <code>open</code> and call <code>showModal</code> on a ref, or
          use the invoker commands when the browser has them. Escape still
          closes it.
        </p>
      </div>

      <div className="docBlock">
        <h2>API</h2>
        <ApiTable rows={rows} />
      </div>
    </article>
  );
}
