import type { Metadata } from "next";
import { Catalog } from "@/components/Catalog";

export const metadata: Metadata = {
  title: "Components",
  description: "Thirty primitives. Add the ones you need.",
};

export default function ComponentsPage() {
  return (
    <main id="content" className="shell pageWrap">
      <article className="page">
        <header className="docLead">
          <h1>Components</h1>
          <p>Thirty primitives. Add the ones you need.</p>
        </header>
        <Catalog />
      </article>
    </main>
  );
}
