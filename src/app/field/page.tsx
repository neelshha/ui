import type { Metadata } from "next";
import { FieldDemo } from "@/components/FieldDemo";

export const metadata: Metadata = {
  title: "Field",
  description: "A text field with a label that stays.",
};

const rows = [
  { name: "label", type: "ReactNode", notes: "Required. The name of the field." },
  {
    name: "chrome",
    type: '"float" | "placeholder"',
    notes: "Float keeps the name. Placeholder drops it when you type.",
  },
  { name: "optional", type: "boolean", notes: "Renders an Optional mark on the label." },
  { name: "description", type: "ReactNode", notes: "Help under the field. Hidden when error is set." },
  { name: "error", type: "ReactNode", notes: "A sentence. The field height does not jump." },
  { name: "disabled", type: "boolean", notes: "Dashed border. Native disabled." },
  { name: "readOnly", type: "boolean", notes: "Dotted border. Native readOnly." },
] as const;

export default function FieldPage() {
  return (
    <main className="stack">
      <h1>Field</h1>
      <p>
        A label that starts in the field and sits on the border when you type.
        <code> TextField</code> and <code>TextArea</code>.
      </p>

      <div className="demo">
        <div className="demoInner">
          <FieldDemo />
        </div>
      </div>

      <h2>Install</h2>
      <pre>
        <code>{`npx @neelshha/ui@latest init
npx @neelshha/ui@latest add field`}</code>
      </pre>

      <h2>Placeholder</h2>
      <p>The name is gone the moment you type.</p>
      <div className="demo">
        <div className="demoInner">
          <FieldDemo chrome="placeholder" />
        </div>
      </div>

      <h2>Error</h2>
      <p>A sentence under the field. Height is reserved so the form does not jump.</p>
      <div className="demo">
        <div className="demoInner">
          <FieldDemo error="Enter a name." />
        </div>
      </div>

      <h2>API</h2>
      <table className="api">
        <thead>
          <tr>
            <th>Prop</th>
            <th>Type</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name}>
              <td>
                <code>{row.name}</code>
              </td>
              <td>
                <code>{row.type}</code>
              </td>
              <td>{row.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
