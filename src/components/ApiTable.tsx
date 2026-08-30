type Row = {
  name: string;
  type: string;
  def?: string;
  notes: string;
};

export function ApiTable({ rows }: { rows: readonly Row[] }) {
  const showDefault = rows.some((row) => row.def !== undefined);

  return (
    <div className="apiWrap">
      <table className="api">
      <thead>
        <tr>
          <th>Prop</th>
          <th>Type</th>
          {showDefault ? <th>Default</th> : null}
          <th>Description</th>
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
            {showDefault ? (
              <td>{row.def ? <code>{row.def}</code> : null}</td>
            ) : null}
            <td>{row.notes}</td>
          </tr>
        ))}
      </tbody>
      </table>
    </div>
  );
}
