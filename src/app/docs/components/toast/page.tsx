import type { Metadata } from "next";
import { ApiTable } from "@/components/ApiTable";
import { Code, Install } from "@/components/Code";
import { Example } from "@/components/Example";
import { ToastDemo } from "@/components/ToastDemo";

export const metadata: Metadata = {
  title: "Toast",
  description: "A live region. Not a modal.",
};

const rows = [
  {
    name: "ToastProvider",
    type: "context",
    notes: "Wrap the region that toasts, not the whole site.",
  },
  {
    name: "toast(message, options)",
    type: "fn",
    notes: "tone is default | success | warning | danger | info. timeout defaults to 4000.",
  },
] as const;

export default function ToastPage() {
  return (
    <article className="doc">
      <header className="docLead">
        <h1>Toast</h1>
        <p>
          A live region. Hairline plate. Not a modal, not a raise. This file
          is a client component. Wrap the place that toasts — not the layout.
        </p>
      </header>

      <Example>
        <ToastDemo />
      </Example>

      <div className="docBlock">
        <h2>Installation</h2>
        <Install name="toast" />
      </div>

      <div className="docBlock">
        <h2>Usage</h2>
        <Code>{`import { Button } from "@/components/ui/button";
import { ToastProvider, useToast } from "@/components/ui/toast";

function Inner() {
  const { toast } = useToast();
  return <Button onClick={() => toast("Saved.", { tone: "success" })}>Save</Button>;
}

<ToastProvider>
  <Inner />
</ToastProvider>`}</Code>
      </div>

      <div className="docBlock">
        <h2>API</h2>
        <ApiTable rows={rows} />
      </div>
    </article>
  );
}
