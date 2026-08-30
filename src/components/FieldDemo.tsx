import { TextArea, TextField } from "@neelshha/ui";

type FieldDemoProps = {
  chrome?: "float" | "placeholder";
  error?: string;
  optional?: boolean;
  required?: boolean;
  multiline?: boolean;
  disabled?: boolean;
};

export function FieldDemo({
  chrome = "float",
  error,
  optional,
  required,
  multiline,
  disabled,
}: FieldDemoProps) {
  if (multiline) {
    return (
      <TextArea
        label="Notes"
        name="notes"
        optional={optional}
        required={required}
        disabled={disabled}
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
      {...(error ? { error } : {})}
    />
  );
}
