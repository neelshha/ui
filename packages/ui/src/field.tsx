"use client";

import {
  useId,
  type ComponentProps,
  type ReactNode,
} from "react";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter((part): part is string => Boolean(part)).join(" ");
}

function describedBy(
  ...parts: Array<string | false | null | undefined>
): string | undefined {
  const value = parts.filter((part): part is string => Boolean(part)).join(" ");
  return value || undefined;
}

type Chrome = {
  label: ReactNode;
  optional?: boolean | undefined;
  description?: ReactNode | undefined;
  error?: ReactNode | undefined;
  className?: string | undefined;
  chrome?: "float" | "placeholder" | undefined;
};

export type TextFieldProps = Omit<
  ComponentProps<"input">,
  "size" | "className" | "placeholder"
> &
  Chrome;

export type TextAreaProps = Omit<
  ComponentProps<"textarea">,
  "className" | "placeholder"
> &
  Chrome;

type TypeDefaults = Pick<
  ComponentProps<"input">,
  "autoCapitalize" | "autoComplete" | "enterKeyHint" | "spellCheck"
>;

function defaultsForType(type: string | undefined): TypeDefaults {
  switch (type) {
    case "email":
      return {
        spellCheck: false,
        autoCapitalize: "off",
        autoComplete: "email",
      };
    case "password":
      return {
        spellCheck: false,
        autoCapitalize: "off",
        autoComplete: "current-password",
      };
    case "url":
      return {
        spellCheck: false,
        autoCapitalize: "off",
        autoComplete: "url",
      };
    case "tel":
      return { spellCheck: false, autoComplete: "tel" };
    case "search":
      return { enterKeyHint: "search", autoComplete: "off" };
    default:
      return {};
  }
}

function Field({
  label,
  optional,
  description,
  error,
  className,
  chrome = "float",
  disabled,
  readOnly,
  multiline,
  inputId,
  descriptionId,
  errorId,
  invalid,
  children,
}: Chrome & {
  disabled?: boolean | undefined;
  readOnly?: boolean | undefined;
  multiline?: boolean | undefined;
  inputId: string;
  descriptionId: string;
  errorId: string;
  invalid: boolean;
  children: ReactNode;
}) {
  const placeholder = chrome === "placeholder";

  return (
    <div
      className={cx("ns-field", className)}
      data-invalid={invalid ? "true" : undefined}
      data-disabled={disabled ? "true" : undefined}
      data-readonly={readOnly ? "true" : undefined}
      data-multiline={multiline ? "true" : undefined}
      data-label={placeholder ? "placeholder" : undefined}
    >
      {placeholder ? (
        <label className="ns-field__sr" htmlFor={inputId}>
          {label}
        </label>
      ) : null}
      <div className="ns-field__control">
        {children}
        {placeholder ? null : (
          <label className="ns-field__label" htmlFor={inputId}>
            {label}
            {optional ? (
              <span className="ns-field__optional"> Optional</span>
            ) : null}
          </label>
        )}
      </div>
      <div className="ns-field__meta">
        {error != null ? (
          <div className="ns-field__error" id={errorId} role="alert">
            {error}
          </div>
        ) : description != null ? (
          <div className="ns-field__description" id={descriptionId}>
            {description}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function TextField({
  label,
  optional,
  description,
  error,
  className,
  chrome,
  id,
  type = "text",
  disabled,
  readOnly,
  "aria-describedby": ariaDescribedBy,
  "aria-invalid": ariaInvalid,
  ...rest
}: TextFieldProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const descriptionId = `${inputId}-desc`;
  const errorId = `${inputId}-error`;
  const invalid = error != null || ariaInvalid === true || ariaInvalid === "true";
  const placeholder =
    chrome === "placeholder" && typeof label === "string" ? label : " ";

  return (
    <Field
      label={label}
      optional={optional}
      description={description}
      error={error}
      className={className}
      chrome={chrome}
      disabled={disabled}
      readOnly={readOnly}
      inputId={inputId}
      descriptionId={descriptionId}
      errorId={errorId}
      invalid={invalid}
    >
      <input
        {...defaultsForType(type)}
        {...rest}
        id={inputId}
        className="ns-field__input"
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        aria-invalid={invalid || undefined}
        aria-errormessage={error != null ? errorId : undefined}
        aria-describedby={describedBy(
          error != null ? errorId : description != null && descriptionId,
          ariaDescribedBy,
        )}
      />
    </Field>
  );
}

export function TextArea({
  label,
  optional,
  description,
  error,
  className,
  id,
  disabled,
  readOnly,
  rows = 4,
  "aria-describedby": ariaDescribedBy,
  "aria-invalid": ariaInvalid,
  ...rest
}: TextAreaProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const descriptionId = `${inputId}-desc`;
  const errorId = `${inputId}-error`;
  const invalid = error != null || ariaInvalid === true || ariaInvalid === "true";

  return (
    <Field
      label={label}
      optional={optional}
      description={description}
      error={error}
      className={className}
      disabled={disabled}
      readOnly={readOnly}
      multiline
      inputId={inputId}
      descriptionId={descriptionId}
      errorId={errorId}
      invalid={invalid}
    >
      <textarea
        {...rest}
        id={inputId}
        className="ns-field__input"
        placeholder=" "
        disabled={disabled}
        readOnly={readOnly}
        rows={rows}
        aria-invalid={invalid || undefined}
        aria-errormessage={error != null ? errorId : undefined}
        aria-describedby={describedBy(
          error != null ? errorId : description != null && descriptionId,
          ariaDescribedBy,
        )}
      />
    </Field>
  );
}
