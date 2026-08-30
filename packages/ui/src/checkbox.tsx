import type { ComponentProps } from "react";
import { Field, type FieldChrome } from "./field";

export type CheckboxProps = Omit<
  ComponentProps<"input">,
  "type" | "className" | "size"
> &
  Omit<FieldChrome, "chrome">;

export function Checkbox({
  label,
  optional,
  required,
  optionalLabel,
  requiredLabel,
  description,
  error,
  className,
  id,
  disabled,
  ...rest
}: CheckboxProps) {
  return (
    <Field
      id={id}
      label={label}
      optional={optional}
      required={required}
      optionalLabel={optionalLabel}
      requiredLabel={requiredLabel}
      description={description}
      error={error}
      className={className}
      disabled={disabled}
      kind="choice"
    >
      <input {...rest} className="ns-choice" type="checkbox" />
    </Field>
  );
}
