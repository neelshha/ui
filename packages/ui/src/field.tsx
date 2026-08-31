import "./field.css";

import {

  Children,
  cloneElement,
  isValidElement,
  useId,
  type ComponentProps,
  type ReactElement,
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
  optionalLabel?: ReactNode | undefined;
  requiredLabel?: ReactNode | undefined;
  description?: ReactNode | undefined;
  error?: ReactNode | undefined;
  className?: string | undefined;
  chrome?: "stack" | "float" | "placeholder" | undefined;
};

export type FieldKind = "well" | "choice" | "select";

type ControlProps = {
  id?: string | undefined;
  disabled?: boolean | undefined;
  readOnly?: boolean | undefined;
  required?: boolean | undefined;
  "aria-invalid"?: boolean | "true" | "false" | undefined;
  "aria-describedby"?: string | undefined;
  "aria-required"?: boolean | undefined;
};

export type FieldProps = FieldChrome & {
  id?: string | undefined;
  disabled?: boolean | undefined;
  readOnly?: boolean | undefined;
  multiline?: boolean | undefined;
  kind?: FieldKind | undefined;
  invalid?: boolean | undefined;
  children: ReactElement<ControlProps>;
};

export type TextFieldProps = Omit<
  ComponentProps<"input">,
  "size" | "className" | "type"
> &
  FieldChrome & {
    type?: TextFieldType | undefined;
  };

export type TextAreaProps = Omit<ComponentProps<"textarea">, "className"> &
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

export function FieldMark({
  optional,
  required,
  optionalLabel = "Optional",
  requiredLabel,
}: {
  optional?: boolean | undefined;
  required?: boolean | undefined;
  optionalLabel?: ReactNode | undefined;
  requiredLabel?: ReactNode | undefined;
}) {
  if (optional) {
    return <span className="ns-field__optional"> {optionalLabel}</span>;
  }
  if (required) {
    if (requiredLabel != null) {
      return <span className="ns-field__required"> {requiredLabel}</span>;
    }
    return (
      <>
        <span
          className="ns-field__required ns-field__required--asterisk"
          aria-hidden="true"
        >
          *
        </span>
        <span className="ns-field__sr"> Required</span>
      </>
    );
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

function textPlaceholder(
  chrome: FieldChrome["chrome"],
  label: ReactNode,
  placeholder: string | undefined,
) {
  if (chrome === "placeholder" && typeof label === "string") return label;
  if (chrome === "float") return " ";
  return placeholder;
}

export function Field({
  label,
  optional,
  required,
  optionalLabel,
  requiredLabel,
  description,
  error,
  className,
  chrome = "stack",
  id,
  disabled,
  readOnly,
  multiline,
  kind = "well",
  invalid: invalidProp,
  children,
}: FieldProps) {
  const generatedId = useId();
  const child = Children.only(children);
  const childProps = isValidElement<ControlProps>(child) ? child.props : {};
  const inputId = id ?? childProps.id ?? generatedId;
  const descriptionId = `${inputId}-desc`;
  const errorId = `${inputId}-error`;
  const invalid =
    invalidProp === true ||
    error != null ||
    childProps["aria-invalid"] === true ||
    childProps["aria-invalid"] === "true";
  const requireControl = Boolean(required) && !optional;
  const placeholder = kind === "well" && chrome === "placeholder";
  const float = kind !== "choice" && chrome === "float";
  const stack = kind !== "choice" && chrome === "stack";
  const labelMode = kind === "choice" ? undefined : chrome;
  const mark = (
    <FieldMark
      optional={optional}
      required={required}
      optionalLabel={optionalLabel}
      requiredLabel={requiredLabel}
    />
  );

  const control = isValidElement<ControlProps>(child)
    ? cloneElement(child, {
        id: inputId,
        disabled: disabled ?? childProps.disabled,
        ...(readOnly != null ? { readOnly } : {}),
        required: requireControl || childProps.required,
        "aria-required": requireControl || childProps.required || undefined,
        "aria-invalid": invalid || undefined,
        "aria-describedby": describedBy(
          description != null && descriptionId,
          error != null && errorId,
          childProps["aria-describedby"],
        ),
      })
    : child;

  const visibleLabel = (
    <label className="ns-field__label" htmlFor={inputId}>
      {label}
      {mark}
    </label>
  );

  return (
    <div
      className={cx("ns-field", className)}
      data-invalid={invalid ? "true" : undefined}
      data-disabled={disabled ? "true" : undefined}
      data-readonly={readOnly ? "true" : undefined}
      data-multiline={multiline ? "true" : undefined}
      data-kind={kind === "well" ? undefined : kind}
      data-label={labelMode}
    >
      {placeholder ? (
        <label className="ns-sr ns-field__sr" htmlFor={inputId}>
          {label}
          {mark}
        </label>
      ) : null}
      {stack || float ? visibleLabel : null}
      <div className="ns-field__control">
        {control}
        {kind === "choice" ? visibleLabel : null}
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
    </div>
  );
}

export function TextField({
  label,
  optional,
  required,
  optionalLabel,
  requiredLabel,
  description,
  error,
  className,
  chrome,
  id,
  type = "text",
  disabled,
  readOnly,
  placeholder,
  ...rest
}: TextFieldProps) {
  const resolvedType = resolveType(type);

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
      chrome={chrome}
      disabled={disabled}
      readOnly={readOnly}
    >
      <input
        {...defaultsForType(resolvedType)}
        {...rest}
        className="ns-field__input"
        type={resolvedType}
        placeholder={textPlaceholder(chrome, label, placeholder)}
      />
    </Field>
  );
}

export function TextArea({
  label,
  optional,
  required,
  optionalLabel,
  requiredLabel,
  description,
  error,
  className,
  chrome,
  id,
  disabled,
  readOnly,
  rows = 4,
  placeholder,
  ...rest
}: TextAreaProps) {
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
      chrome={chrome}
      disabled={disabled}
      readOnly={readOnly}
      multiline
    >
      <textarea
        {...rest}
        className="ns-field__input"
        rows={rows}
        placeholder={textPlaceholder(chrome, label, placeholder)}
      />
    </Field>
  );
}
