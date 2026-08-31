"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { slugify } from "@/lib/docs";

type Section = {
  id: string;
  label: string;
};

export function OnThisPage() {
  const pathname = usePathname();
  const [sections, setSections] = useState<Section[]>([]);

  // Collect the page's h2 sections and anchor the untitled ones.
  useEffect(() => {
    const main = document.getElementById("content");
    if (!main) return;
    const headings = Array.from(main.querySelectorAll<HTMLElement>(".doc h2"));
    const used = new Set(
      headings.filter((heading) => heading.id).map((heading) => heading.id),
    );
    const list: Section[] = [];
    for (const heading of headings) {
      if (!heading.id) {
        const base = slugify(heading.textContent ?? "");
        if (!base) continue;
        let id = base;
        while (used.has(id)) id = `${id}-2`;
        used.add(id);
        heading.id = id;
      }
      list.push({ id: heading.id, label: heading.textContent ?? "" });
    }
    setSections(list);
  }, [pathname]);

  if (sections.length === 0) return null;

  return (
    <nav className="toc" aria-label="On this page">
      <div className="tocBody">
        <p className="tocTitle">On This Page</p>
        <ul className="tocList">
          {sections.map((section) => (
            <li key={section.id}>
              <a href={`#${section.id}`}>{section.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
