"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { slugify } from "@/lib/docs";

type Section = {
  id: string;
  label: string;
};

// The activation line matches the headings' scroll-margin-top: the sticky
// header height plus one space step. A hidden probe element resolves the
// token math in px, so the JS and the CSS can never drift apart (96 is the
// fallback when the tokens are absent).
function anchorLine() {
  if (typeof window === "undefined") return 96;
  const probe = document.createElement("div");
  probe.style.cssText =
    "position:absolute;visibility:hidden;pointer-events:none;height:calc(var(--header-height, 0px) + var(--space-5, 0px));";
  document.body.append(probe);
  const line = probe.getBoundingClientRect().height;
  probe.remove();
  return line > 0 ? line : 96;
}

export function OnThisPage() {
  const pathname = usePathname();
  const [sections, setSections] = useState<Section[]>([]);
  const [active, setActive] = useState<string | null>(null);

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
    setActive(list[0]?.id ?? null);
  }, [pathname]);

  // Mark the section nearest the top of the viewport as you scroll.
  useEffect(() => {
    if (sections.length === 0) return;
    const nodes = sections
      .map((section) => document.getElementById(section.id))
      .filter((node): node is HTMLElement => node != null);
    let frame = 0;
    const line = anchorLine();

    const measure = () => {
      let current = sections[0]?.id ?? null;
      for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i];
        if (node && node.getBoundingClientRect().top <= line) {
          current = sections[i]?.id ?? current;
        }
      }
      setActive(current);
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [sections]);

  if (sections.length === 0) return null;

  return (
    <nav className="toc" aria-label="On this page">
      <p className="tocTitle">On This Page</p>
      <ul className="tocList">
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              aria-current={active === section.id ? "location" : undefined}
            >
              {section.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
