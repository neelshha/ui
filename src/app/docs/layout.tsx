import type { ReactNode } from "react";
import { DocsNav } from "@/components/DocsNav";
import { DocsPager } from "@/components/DocsPager";

export default function DocsLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div className="shell frame">
      <a href="#content" className="skip ns-button" data-variant="outline">
        Skip to content
      </a>
      <DocsNav />
      <main id="content" className="main">
        {children}
        <DocsPager />
      </main>
    </div>
  );
}
