"use client";

import { useEffect, useRef, type ComponentProps } from "react";
import { Field, type FieldChrome } from "./field";

export type CheckboxProps = Omit<
  ComponentProps<"input">,
  "type" | "className" | "size"
> &
  Omit<FieldChrome, "chrome"> & {
    indeterminate?: boolean | undefined;
  };

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
  indeterminate,
  ...rest
}: CheckboxProps) {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) ref.current.indeterminate = Boolean(indeterminate);
  }, [indeterminate]);

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
      <input {...rest} ref={ref} className="ns-choice" type="checkbox" />
    </Field>
  );
}
