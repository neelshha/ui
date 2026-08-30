import type { ComponentProps } from "react";
import { Field, type FieldChrome } from "./field";

export type SelectProps = Omit<
  ComponentProps<"select">,
  "className" | "size"
> &
  Omit<FieldChrome, "chrome">;

export function Select({
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
  children,
  ...rest
}: SelectProps) {
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
      kind="select"
    >
      <select {...rest} className="ns-field__input">
        {children}
      </select>
    </Field>
  );
}
