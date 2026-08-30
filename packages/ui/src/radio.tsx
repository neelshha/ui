import {
  Children,
  cloneElement,
  isValidElement,
  useId,
  type ComponentProps,
  type ReactNode,
} from "react";
import { cx } from "./cx";
import {
  describedBy,
  Field,
  FieldMark,
  type FieldChrome,
} from "./field";

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
  optionalLabel,
  requiredLabel,
  description,
  error,
  className,
  id,
  disabled,
  ...rest
}: RadioProps) {
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
      <input {...rest} className="ns-choice" type="radio" />
    </Field>
  );
}

export function RadioGroup({
  label,
  optional,
  required,
  optionalLabel,
  requiredLabel,
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
      aria-required={required && !optional ? true : undefined}
      aria-invalid={invalid || undefined}
      aria-describedby={describedBy(
        description != null && descriptionId,
        error != null && errorId,
      )}
    >
      <legend className="ns-field__legend">
        {label}
        <FieldMark
          optional={optional}
          required={required}
          optionalLabel={optionalLabel}
          requiredLabel={requiredLabel}
        />
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
            <div className="ns-field__error" id={errorId}>
              {error}
            </div>
          ) : null}
        </div>
      ) : null}
    </fieldset>
  );
}
