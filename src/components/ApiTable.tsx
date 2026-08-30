import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@neelshha/ui";

type Row = {
  name: string;
  type: string;
  def?: string;
  notes: string;
};

export function ApiTable({ rows }: { rows: readonly Row[] }) {
  const showDefault = rows.some((row) => row.def !== undefined);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Prop</TableHead>
          <TableHead>Type</TableHead>
          {showDefault ? <TableHead>Default</TableHead> : null}
          <TableHead>Description</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.name}>
            <TableCell>
              <code>{row.name}</code>
            </TableCell>
            <TableCell>
              <code>{row.type}</code>
            </TableCell>
            {showDefault ? (
              <TableCell>{row.def ? <code>{row.def}</code> : null}</TableCell>
            ) : null}
            <TableCell>{row.notes}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
