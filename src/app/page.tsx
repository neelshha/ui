import { ArrowRight, LayoutGrid } from "lucide-react";
import { Button } from "@neelshha/ui";
import { Catalog } from "@/components/Catalog";
import { Code } from "@/components/Code";
import { icon } from "@/components/icons";

export default function HomePage() {
  return (
    <div className="shell pageWrap">
      <div className="page">
        <header className="hero">
          <h1>Interface components. Yours once you add them.</h1>
          <p>
            A small library with a CLI. It copies source into your React or Next
            app. Light and dark, class or system. No Tailwind. No Radix. No
            shadcn.
          </p>
          <div className="heroActions">
            <Button href="/docs">
              Get started
              <ArrowRight {...icon} />
            </Button>
            <Button href="/components" variant="outline">
              <LayoutGrid {...icon} />
              View components
            </Button>
          </div>
        </header>

        <Catalog />

        <div className="docBlock">
          <h2>Install</h2>
          <Code>{`npx @neelshha/ui@latest init
npx @neelshha/ui@latest add field`}</Code>
        </div>
      </div>
    </div>
  );
}
