import "./progress.css";

import type { ComponentProps, CSSProperties } from "react";
import { cx } from "./cx";

export type ProgressProps = ComponentProps<"progress">;
export type MeterProps = ComponentProps<"meter">;

function amountOf(
  value: string | number | readonly string[] | undefined,
  max: string | number | undefined,
) {
  if (value === undefined || value === "") return undefined;
  const next = Number(value);
  const top = Number(max ?? 1);
  if (!Number.isFinite(next) || !Number.isFinite(top) || top === 0) {
    return undefined;
  }
  return Math.min(1, Math.max(0, next / top));
}

export function Progress({
  className,
  value,
  max,
  style,
  ...rest
}: ProgressProps) {
  const amount = amountOf(value, max);
  return (
    <progress
      {...rest}
      value={value}
      max={max}
      className={cx("ns-progress", className)}
      style={
        {
          ...style,
          ...(amount == null ? {} : { "--ns-progress": String(amount) }),
        } as CSSProperties
      }
    />
  );
}

export function Meter({ className, value, min, max, style, ...rest }: MeterProps) {
  const start = Number(min ?? 0);
  const top = Number(max ?? 1);
  const span = top - start;
  const filled =
    value === undefined || value === "" || !Number.isFinite(span) || span === 0
      ? undefined
      : Math.min(1, Math.max(0, (Number(value) - start) / span));

  return (
    <meter
      {...rest}
      value={value}
      min={min}
      max={max}
      className={cx("ns-meter", className)}
      style={
        {
          ...style,
          ...(filled == null ? {} : { "--ns-meter": String(filled) }),
        } as CSSProperties
      }
    />
  );
}
