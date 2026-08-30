"use client";

import { Button, ToastProvider, useToast } from "@neelshha/ui";

function Inner() {
  const { toast } = useToast();
  return (
    <div className="demoRow">
      <Button
        variant="outline"
        onClick={() => toast("Copied.", { tone: "default" })}
      >
        Default
      </Button>
      <Button
        variant="success"
        onClick={() => toast("Saved.", { tone: "success" })}
      >
        Success
      </Button>
      <Button
        variant="warning"
        onClick={() => toast("Quota is low.", { tone: "warning" })}
      >
        Warning
      </Button>
      <Button
        variant="danger"
        onClick={() => toast("Payment failed.", { tone: "danger" })}
      >
        Danger
      </Button>
      <Button
        variant="outline"
        onClick={() => toast("A new version is out.", { tone: "info" })}
      >
        Info
      </Button>
    </div>
  );
}

export function ToastDemo() {
  return (
    <ToastProvider>
      <Inner />
    </ToastProvider>
  );
}
