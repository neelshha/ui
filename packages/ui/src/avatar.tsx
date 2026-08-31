"use client";

import "./avatar.css";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ComponentProps,
} from "react";
import { cx } from "./cx";

type AvatarContextValue = {
  loaded: boolean;
  setLoaded: (loaded: boolean) => void;
};

const AvatarContext = createContext<AvatarContextValue>({
  loaded: false,
  setLoaded: () => {},
});

export type AvatarProps = ComponentProps<"span"> & {
  size?: "sm" | "md" | undefined;
};

export type AvatarImageProps = ComponentProps<"img">;

export type AvatarFallbackProps = ComponentProps<"span">;

export type ImageSettle = "loaded" | "failed" | "pending";

/**
 * Decide from the element itself whether a load already settled. An image
 * that finished before hydration never fires onLoad/onError, so the state
 * must be read off `complete`/`naturalWidth` on mount.
 */
export function settleImage(
  img: Pick<HTMLImageElement, "complete" | "naturalWidth">,
): ImageSettle {
  if (!img.complete) return "pending";
  return img.naturalWidth > 0 ? "loaded" : "failed";
}

export function Avatar({ size = "md", className, ...rest }: AvatarProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <AvatarContext.Provider value={{ loaded, setLoaded }}>
      <span
        className={cx("ns-avatar", className)}
        data-size={size === "md" ? undefined : size}
        {...rest}
      />
    </AvatarContext.Provider>
  );
}

export function AvatarImage({
  className,
  alt = "",
  onError,
  onLoad,
  ...rest
}: AvatarImageProps) {
  const { setLoaded } = useContext(AvatarContext);
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  // An image that finished loading before hydration never fires onLoad, so
  // the fallback would sit over a loaded photo forever. Settle the state
  // from the element itself on mount.
  useEffect(() => {
    const img = ref.current;
    if (!img) return;
    const settled = settleImage(img);
    if (settled === "loaded") setLoaded(true);
    else if (settled === "failed") setFailed(true);
  }, []);

  if (failed) return null;
  return (
    <img
      ref={ref}
      className={cx("ns-avatar__image", className)}
      alt={alt}
      onLoad={(event) => {
        setLoaded(true);
        onLoad?.(event);
      }}
      onError={(event) => {
        setFailed(true);
        setLoaded(false);
        onError?.(event);
      }}
      {...rest}
    />
  );
}

export function AvatarFallback({ className, ...rest }: AvatarFallbackProps) {
  const { loaded } = useContext(AvatarContext);
  if (loaded) return null;
  return <span className={cx("ns-avatar__fallback", className)} {...rest} />;
}
