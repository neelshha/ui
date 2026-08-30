"use client";

import { Button, ToastProvider, useToast } from "@neelshha/ui";

function Inner() {
  const { toast } = useToast();
  return (
    <div className="demoRow">
      <Button onClick={() => toast("Saved.", { tone: "success" })}>Save</Button>
      <Button
        variant="danger"
        onClick={() => toast("Payment failed.", { tone: "danger" })}
      >
        Fail
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
