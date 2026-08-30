import { useId, type ComponentProps } from "react";
import { describedBy, Field, type FieldChrome } from "./field";

export type SelectProps = Omit<
  ComponentProps<"select">,
  "className" | "size"
> &
  Omit<FieldChrome, "chrome">;

export function Select({
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
  children,
  ...rest
}: SelectProps) {
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
      kind="select"
      inputId={inputId}
      descriptionId={descriptionId}
      errorId={errorId}
      invalid={invalid}
    >
      <select
        {...rest}
        id={inputId}
        className="ns-field__input"
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
      >
        {children}
      </select>
    </Field>
  );
}
