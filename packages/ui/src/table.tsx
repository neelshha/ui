import "./table.css";

import type { ComponentProps } from "react";
import { cx } from "./cx";

export type TableProps = ComponentProps<"table">;
export type TableCaptionProps = ComponentProps<"caption">;
export type TableHeaderProps = ComponentProps<"thead">;
export type TableBodyProps = ComponentProps<"tbody">;
export type TableRowProps = ComponentProps<"tr">;
export type TableHeadProps = ComponentProps<"th">;
export type TableCellProps = ComponentProps<"td">;

export function Table({ className, ...rest }: TableProps) {
  return (
    <div className="ns-table-wrap">
      <table className={cx("ns-table", className)} {...rest} />
    </div>
  );
}

export function TableCaption({ className, ...rest }: TableCaptionProps) {
  return <caption className={cx("ns-table__caption", className)} {...rest} />;
}

export function TableHeader({ className, ...rest }: TableHeaderProps) {
  return <thead className={cx("ns-table__header", className)} {...rest} />;
}

export function TableBody({ className, ...rest }: TableBodyProps) {
  return <tbody className={cx("ns-table__body", className)} {...rest} />;
}

export function TableRow({ className, ...rest }: TableRowProps) {
  return <tr className={cx("ns-table__row", className)} {...rest} />;
}

export function TableHead({ className, ...rest }: TableHeadProps) {
  return <th className={cx("ns-table__head", className)} {...rest} />;
}

export function TableCell({ className, ...rest }: TableCellProps) {
  return <td className={cx("ns-table__cell", className)} {...rest} />;
}
