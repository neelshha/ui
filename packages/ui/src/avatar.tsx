"use client";

import "./avatar.css";

import { useState, type ComponentProps } from "react";
import { cx } from "./cx";

export type AvatarProps = ComponentProps<"span"> & {
  size?: "sm" | "md" | undefined;
};

export type AvatarImageProps = ComponentProps<"img">;

export type AvatarFallbackProps = ComponentProps<"span">;

export function Avatar({ size = "md", className, ...rest }: AvatarProps) {
  return (
    <span
      className={cx("ns-avatar", className)}
      data-size={size === "md" ? undefined : size}
      {...rest}
    />
  );
}

export function AvatarImage({ className, onError, ...rest }: AvatarImageProps) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return (
    <img
      className={cx("ns-avatar__image", className)}
      onError={(event) => {
        setFailed(true);
        onError?.(event);
      }}
      {...rest}
    />
  );
}

export function AvatarFallback({ className, ...rest }: AvatarFallbackProps) {
  return <span className={cx("ns-avatar__fallback", className)} {...rest} />;
}
