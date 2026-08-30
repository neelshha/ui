"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { Button } from "@neelshha/ui";
import { icon } from "@/components/icons";

export function CopyCode({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <Button
      type="button"
      icon
      variant="outline"
      className="codeCopy"
      aria-label={copied ? "Copied" : "Copy"}
      onClick={async () => {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1400);
      }}
    >
      {copied ? <Check {...icon} /> : <Copy {...icon} />}
    </Button>
  );
}
