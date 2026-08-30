"use client";

import "./toast.css";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { cx } from "./cx";

export type ToastTone = "default" | "success" | "warning" | "danger" | "info";

type ToastItem = {
  id: string;
  message: ReactNode;
  tone: ToastTone;
  timeout: number;
  className?: string | undefined;
};

type Timer = {
  handle: number;
  remaining: number;
  started: number;
};

export type ToastOptions = {
  tone?: ToastTone | undefined;
  timeout?: number | undefined;
  className?: string | undefined;
};

type ToastContextValue = {
  toast: (message: ReactNode, options?: ToastOptions | undefined) => string;
  dismiss: (id: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside ToastProvider.");
  return ctx;
}

export type ToastProviderProps = {
  children: ReactNode;
};

export function ToastProvider({ children }: ToastProviderProps) {
  const [items, setItems] = useState<ToastItem[]>([]);
  const timers = useRef(new Map<string, Timer>());

  const dismiss = useCallback((id: string) => {
    const timer = timers.current.get(id);
    if (timer) window.clearTimeout(timer.handle);
    timers.current.delete(id);
    setItems((current) => current.filter((item) => item.id !== id));
  }, []);

  const arm = useCallback(
    (id: string, remaining: number) => {
      if (remaining <= 0) return;
      timers.current.set(id, {
        handle: window.setTimeout(() => dismiss(id), remaining),
        remaining,
        started: Date.now(),
      });
    },
    [dismiss],
  );

  const pause = useCallback((id: string) => {
    const timer = timers.current.get(id);
    if (!timer) return;
    window.clearTimeout(timer.handle);
    timer.remaining = Math.max(0, timer.remaining - (Date.now() - timer.started));
    timer.handle = 0;
  }, []);

  const resume = useCallback(
    (id: string) => {
      const timer = timers.current.get(id);
      if (!timer || timer.handle) return;
      arm(id, timer.remaining);
    },
    [arm],
  );

  const toast = useCallback(
    (message: ReactNode, options?: ToastOptions | undefined) => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      const tone = options?.tone ?? "default";
      const timeout = options?.timeout ?? 4000;
      const className = options?.className;
      setItems((current) => [
        ...current,
        { id, message, tone, timeout, className },
      ]);
      if (timeout > 0) arm(id, timeout);
      return id;
    },
    [arm],
  );

  useEffect(() => {
    const active = timers.current;
    return () => {
      for (const timer of active.values()) window.clearTimeout(timer.handle);
    };
  }, []);

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      <div
        className="ns-toast-region"
        role="region"
        aria-label="Notifications"
      >
        {items.map((item) => (
          <div
            key={item.id}
            className={cx("ns-toast", item.className)}
            data-tone={item.tone}
            role={item.tone === "danger" ? "alert" : "status"}
            aria-atomic="true"
            onMouseEnter={() => pause(item.id)}
            onMouseLeave={() => resume(item.id)}
            onFocus={() => pause(item.id)}
            onBlur={() => resume(item.id)}
          >
            <div className="ns-toast__message">{item.message}</div>
            <button
              type="button"
              className="ns-toast__dismiss"
              aria-label="Dismiss"
              onClick={() => dismiss(item.id)}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
