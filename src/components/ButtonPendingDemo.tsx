"use client";

import { useState } from "react";
import { Button } from "@neelshha/ui";

export function ButtonPendingDemo() {
  const [pending, setPending] = useState(false);

  return (
    <div className="demoRow">
      <Button
        pending={pending}
        onClick={() => {
          setPending(true);
          window.setTimeout(() => setPending(false), 1200);
        }}
      >
        Save
      </Button>
      <Button variant="outline" pending>
        Generating
      </Button>
    </div>
  );
}
