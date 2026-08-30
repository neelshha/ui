import {
  Children,
  cloneElement,
  isValidElement,
  useId,
  type ComponentProps,
  type ReactNode,
} from "react";
import { cx } from "./cx";
import { describedBy, Field, type FieldChrome } from "./field";

export type RadioProps = Omit<
  ComponentProps<"input">,
  "type" | "className" | "size"
> &
  Omit<FieldChrome, "chrome">;

export type RadioGroupProps = Omit<FieldChrome, "chrome"> & {
  name: string;
  disabled?: boolean | undefined;
  children: ReactNode;
};

export function Radio({
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
}: RadioProps) {
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
        type="radio"
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

export function RadioGroup({
  label,
  optional,
  required,
  description,
  error,
  className,
  name,
  disabled,
  children,
}: RadioGroupProps) {
  const generatedId = useId();
  const descriptionId = `${generatedId}-desc`;
  const errorId = `${generatedId}-error`;
  const invalid = error != null;

  return (
    <fieldset
      className={cx("ns-field", className)}
      data-kind="group"
      data-invalid={invalid ? "true" : undefined}
      data-disabled={disabled ? "true" : undefined}
      disabled={disabled}
      aria-required={required || undefined}
      aria-invalid={invalid || undefined}
      aria-describedby={describedBy(
        description != null && descriptionId,
        error != null && errorId,
      )}
    >
      <legend className="ns-field__legend">
        {label}
        {optional ? (
          <span className="ns-field__optional"> Optional</span>
        ) : required ? (
          <span className="ns-field__required"> Required</span>
        ) : null}
      </legend>
      <div className="ns-field__options">
        {Children.map(children, (child) => {
          if (!isValidElement<RadioProps>(child)) return child;
          return cloneElement(child, {
            name,
            disabled: child.props.disabled ?? disabled,
          });
        })}
      </div>
      {description != null || error != null ? (
        <div className="ns-field__meta">
          {description != null ? (
            <div className="ns-field__description" id={descriptionId}>
              {description}
            </div>
          ) : null}
          {error != null ? (
            <div className="ns-field__error" id={errorId} role="alert">
              {error}
            </div>
          ) : null}
        </div>
      ) : null}
    </fieldset>
  );
}
