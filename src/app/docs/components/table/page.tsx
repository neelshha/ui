import type { Metadata } from "next";
import {
  Badge,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@neelshha/ui";
import { ApiTable } from "@/components/ApiTable";
import { Code, Install } from "@/components/Code";
import { Example } from "@/components/Example";

export const metadata: Metadata = {
  title: "Table",
  description: "A semantic table. Type on paper. Hairline rows.",
};

const rows = [
  {
    name: "Table",
    type: "table",
    notes: "Wraps a native table. Overflow scrolls on the wrap.",
  },
  {
    name: "TableCaption",
    type: "caption",
    notes: "Sits above. Sub type.",
  },
  {
    name: "TableHead / TableCell",
    type: "th / td",
    notes: "Hairline under the row. No sort. No virtualization.",
  },
] as const;

export default function TablePage() {
  return (
    <article className="doc">
      <header className="docLead">
        <h1>Table</h1>
        <p>
          A native <code>table</code>. Type on paper. Hairlines between rows.
          Not a data grid. Compact density tightens the cells.
        </p>
      </header>

      <Example wide>
        <Table>
          <TableCaption>Projects</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Owner</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Atlas</TableCell>
              <TableCell>
                <Badge tone="accent">Live</Badge>
              </TableCell>
              <TableCell>Ada</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Harbor</TableCell>
              <TableCell>
                <Badge>Draft</Badge>
              </TableCell>
              <TableCell>Nia</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Keel</TableCell>
              <TableCell>
                <Badge>Draft</Badge>
              </TableCell>
              <TableCell>Omar</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Example>

      <div className="docBlock">
        <h2>Installation</h2>
        <Install name="table" />
      </div>

      <div className="docBlock">
        <h2>Usage</h2>
        <Code>{`import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

<Table>
  <TableCaption>Projects</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Atlas</TableCell>
      <TableCell>Live</TableCell>
    </TableRow>
  </TableBody>
</Table>`}</Code>
      </div>

      <Example
        title="Compact"
        description={
          <>
            Set <code>data-density=&quot;compact&quot;</code> on a region.
            Cells tighten. The language stays.
          </>
        }
        wide
        code={`<div data-density="compact">
  <Table>…</Table>
</div>`}
      >
        <div data-density="compact">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Atlas</TableCell>
                <TableCell>Live</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Harbor</TableCell>
                <TableCell>Draft</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </Example>

      <div className="docBlock">
        <h2>API</h2>
        <ApiTable rows={rows} />
      </div>
    </article>
  );
}
