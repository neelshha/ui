import "./field.css";

import {
  useId,
  type ComponentProps,
  type ReactNode,
} from "react";
import { cx } from "./cx";

export function describedBy(
  ...parts: Array<string | false | null | undefined>
): string | undefined {
  const value = parts.filter((part): part is string => Boolean(part)).join(" ");
  return value || undefined;
}

export const TEXT_FIELD_TYPES = [
  "text",
  "email",
  "password",
  "url",
  "tel",
  "search",
  "number",
] as const;

export type TextFieldType = (typeof TEXT_FIELD_TYPES)[number];

export type FieldChrome = {
  label: ReactNode;
  optional?: boolean | undefined;
  required?: boolean | undefined;
  description?: ReactNode | undefined;
  error?: ReactNode | undefined;
  className?: string | undefined;
  chrome?: "float" | "placeholder" | undefined;
};

export type FieldKind = "well" | "choice" | "select";

export type FieldProps = FieldChrome & {
  disabled?: boolean | undefined;
  readOnly?: boolean | undefined;
  multiline?: boolean | undefined;
  kind?: FieldKind | undefined;
  inputId: string;
  descriptionId: string;
  errorId: string;
  invalid: boolean;
  children: ReactNode;
};

export type TextFieldProps = Omit<
  ComponentProps<"input">,
  "size" | "className" | "placeholder" | "type"
> &
  FieldChrome & {
    type?: TextFieldType | undefined;
  };

export type TextAreaProps = Omit<
  ComponentProps<"textarea">,
  "className" | "placeholder"
> &
  FieldChrome;

type TypeDefaults = Pick<
  ComponentProps<"input">,
  "autoCapitalize" | "autoComplete" | "enterKeyHint" | "spellCheck"
>;

function isTextFieldType(type: string): type is TextFieldType {
  return (TEXT_FIELD_TYPES as readonly string[]).includes(type);
}

function resolveType(type: string | undefined): TextFieldType {
  const next = type ?? "text";
  if (isTextFieldType(next)) return next;
  if (process.env.NODE_ENV !== "production") {
    console.warn(
      `TextField: type="${type}" is not supported. Use text, email, password, url, tel, search, or number.`,
    );
  }
  return "text";
}

function LabelMark({
  optional,
  required,
}: {
  optional?: boolean | undefined;
  required?: boolean | undefined;
}) {
  if (optional) {
    return <span className="ns-field__optional"> Optional</span>;
  }
  if (required) {
    return <span className="ns-field__required"> Required</span>;
  }
  return null;
}

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

export function Field({
  label,
  optional,
  required,
  description,
  error,
  className,
  chrome = "float",
  disabled,
  readOnly,
  multiline,
  kind = "well",
  inputId,
  descriptionId,
  errorId,
  invalid,
  children,
}: FieldProps) {
  const placeholder = kind === "well" && chrome === "placeholder";
  const mark = <LabelMark optional={optional} required={required} />;

  return (
    <div
      className={cx("ns-field", className)}
      data-invalid={invalid ? "true" : undefined}
      data-disabled={disabled ? "true" : undefined}
      data-readonly={readOnly ? "true" : undefined}
      data-multiline={multiline ? "true" : undefined}
      data-kind={kind === "well" ? undefined : kind}
      data-label={placeholder ? "placeholder" : undefined}
    >
      {placeholder ? (
        <label className="ns-sr ns-field__sr" htmlFor={inputId}>
          {label}
          {mark}
        </label>
      ) : null}
      <div className="ns-field__control">
        {children}
        {placeholder ? null : (
          <label className="ns-field__label" htmlFor={inputId}>
            {label}
            {mark}
          </label>
        )}
      </div>
      {kind === "well" || description != null || error != null ? (
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
    </div>
  );
}

export function TextField({
  label,
  optional,
  required,
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
  const resolvedType = resolveType(type);
  const invalid = error != null || ariaInvalid === true || ariaInvalid === "true";
  const placeholder =
    chrome === "placeholder" && typeof label === "string" ? label : " ";

  return (
    <Field
      label={label}
      optional={optional}
      required={required}
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
        {...defaultsForType(resolvedType)}
        {...rest}
        id={inputId}
        className="ns-field__input"
        type={resolvedType}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
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

export function TextArea({
  label,
  optional,
  required,
  description,
  error,
  className,
  chrome,
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
  const placeholder =
    chrome === "placeholder" && typeof label === "string" ? label : " ";

  return (
    <Field
      label={label}
      optional={optional}
      required={required}
      description={description}
      error={error}
      className={className}
      chrome={chrome}
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
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        rows={rows}
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
