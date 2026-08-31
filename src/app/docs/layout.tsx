import type { ReactNode } from "react";
import { DocsNav } from "@/components/DocsNav";
import { DocsPager } from "@/components/DocsPager";
import { OnThisPage } from "@/components/OnThisPage";

export default function DocsLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div className="shell frame">
      <div className="docsNavSlot">
        <DocsNav />
      </div>
      <main id="content" className="main">
        {children}
        <DocsPager />
      </main>
      <div className="tocSlot">
        <OnThisPage />
      </div>
    </div>
  );
}
