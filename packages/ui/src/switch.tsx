import type { ComponentProps } from "react";
import { Field, type FieldChrome } from "./field";

export type SwitchProps = Omit<
  ComponentProps<"input">,
  "type" | "role" | "className" | "size"
> &
  Omit<FieldChrome, "chrome">;

export function Switch({
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
}: SwitchProps) {
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
      <input
        {...rest}
        className="ns-choice"
        type="checkbox"
        role="switch"
        data-kind="switch"
      />
    </Field>
  );
}
