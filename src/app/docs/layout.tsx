import type { ReactNode } from "react";
import { DocsNav } from "@/components/DocsNav";
import { DocsPager } from "@/components/DocsPager";

export default function DocsLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div className="shell frame">
      <DocsNav />
      <div className="main">
        {children}
        <DocsPager />
      </div>
    </div>
  );
}
