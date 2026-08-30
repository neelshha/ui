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
};

type ToastContextValue = {
  toast: (
    message: ReactNode,
    options?: { tone?: ToastTone; timeout?: number } | undefined,
  ) => void;
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
  const timers = useRef(new Map<string, number>());

  const dismiss = useCallback((id: string) => {
    const timer = timers.current.get(id);
    if (timer) window.clearTimeout(timer);
    timers.current.delete(id);
    setItems((current) => current.filter((item) => item.id !== id));
  }, []);

  const toast = useCallback(
    (
      message: ReactNode,
      options?: { tone?: ToastTone; timeout?: number } | undefined,
    ) => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      const tone = options?.tone ?? "default";
      const timeout = options?.timeout ?? 4000;
      setItems((current) => [...current, { id, message, tone }]);
      if (timeout > 0) {
        timers.current.set(
          id,
          window.setTimeout(() => dismiss(id), timeout),
        );
      }
    },
    [dismiss],
  );

  useEffect(() => {
    const active = timers.current;
    return () => {
      for (const timer of active.values()) window.clearTimeout(timer);
    };
  }, []);

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      <div className="ns-toast-region" aria-live="polite" aria-relevant="additions">
        {items.map((item) => (
          <div
            key={item.id}
            className={cx("ns-toast")}
            data-tone={item.tone}
            role={item.tone === "danger" ? "alert" : "status"}
            aria-atomic="true"
          >
            {item.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
