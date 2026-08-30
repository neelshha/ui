"use client";

import { TextArea, TextField } from "@neelshha/ui";

type FieldDemoProps = {
  chrome?: "float" | "placeholder";
  error?: string;
  optional?: boolean;
  multiline?: boolean;
};

export function FieldDemo({
  chrome = "float",
  error,
  optional,
  multiline,
}: FieldDemoProps) {
  if (multiline) {
    return (
      <TextArea
        label="Notes"
        name="notes"
        optional={optional}
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
      {...(error ? { error } : {})}
    />
  );
}
