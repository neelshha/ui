import type { ReactNode } from "react";
import { DocsNav } from "@/components/DocsNav";
import { DocsPager } from "@/components/DocsPager";
import { MobileDocsNav } from "@/components/MobileDocsNav";

export default function DocsLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div className="shell frame">
      <a href="#content" className="skip ns-button" data-variant="outline">
        Skip to content
      </a>
      <div className="mobileDocsNavSlot">
        <MobileDocsNav />
      </div>
      <DocsNav />
      <main id="content" className="main">
        {children}
        <DocsPager />
      </main>
    </div>
  );
}
