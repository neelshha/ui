import type { Metadata } from "next";
import { Catalog } from "@/components/Catalog";

export const metadata: Metadata = {
  title: "Components",
  description: "The catalog.",
};

export default function ComponentsPage() {
  return (
    <article className="doc">
      <header className="docLead">
        <h1>Components</h1>
        <p>Twenty-eight primitives. Add the ones you need.</p>
      </header>
      <Catalog />
    </article>
  );
}
