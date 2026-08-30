import { useId, type ComponentProps } from "react";
import { describedBy, Field, type FieldChrome } from "./field";

export type CheckboxProps = Omit<
  ComponentProps<"input">,
  "type" | "className" | "size"
> &
  Omit<FieldChrome, "chrome">;

export function Checkbox({
  label,
  optional,
  required,
  description,
  error,
  className,
  id,
  disabled,
  "aria-describedby": ariaDescribedBy,
  "aria-invalid": ariaInvalid,
  ...rest
}: CheckboxProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const descriptionId = `${inputId}-desc`;
  const errorId = `${inputId}-error`;
  const invalid = error != null || ariaInvalid === true || ariaInvalid === "true";

  return (
    <Field
      label={label}
      optional={optional}
      required={required}
      description={description}
      error={error}
      className={className}
      disabled={disabled}
      kind="choice"
      inputId={inputId}
      descriptionId={descriptionId}
      errorId={errorId}
      invalid={invalid}
    >
      <input
        {...rest}
        id={inputId}
        className="ns-choice"
        type="checkbox"
        disabled={disabled}
        required={required}
        aria-required={required || undefined}
        aria-invalid={invalid || undefined}
        aria-errormessage={error != null ? errorId : undefined}
        aria-describedby={describedBy(
          description != null && descriptionId,
          error != null && errorId,
          ariaDescribedBy,
        )}
      />
    </Field>
  );
}
