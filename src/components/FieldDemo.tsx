import { TextArea, TextField } from "@neelshha/ui";

type FieldDemoProps = {
  chrome?: "stack" | "float" | "placeholder";
  error?: string;
  optional?: boolean;
  required?: boolean;
  multiline?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
};

export function FieldDemo({
  chrome = "stack",
  error,
  optional,
  required,
  multiline,
  disabled,
  readOnly,
}: FieldDemoProps) {
  if (multiline) {
    return (
      <TextArea
        label="Notes"
        name="notes"
        optional={optional}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        placeholder={readOnly ? undefined : "e.g. Leave at the front desk."}
        defaultValue={readOnly ? "Ships in two days." : undefined}
        {...(error ? { error } : {})}
      />
    );
  }

  return (
    <TextField
      label="Name"
      name="name"
      autoComplete="name"
      chrome={chrome}
      optional={optional}
      required={required}
      disabled={disabled}
      readOnly={readOnly}
      placeholder="John Doe"
      defaultValue={readOnly ? "Ada Lovelace" : undefined}
      {...(error ? { error } : {})}
    />
  );
}
