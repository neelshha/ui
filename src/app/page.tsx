import { Button, TextField } from "@neelshha/ui";
import { Code } from "@/components/Code";
import { Preview } from "@/components/Preview";

export default function HomePage() {
  return (
    <article className="doc">
      <header className="docLead">
        <h1>Interface components. Yours once you add them.</h1>
        <p>
          A small library with a CLI. It copies source into your React or Next
          app. Light and dark, class or system. No Tailwind. No Radix. No
          shadcn.
        </p>
      </header>

      <Preview>
        <div className="stack">
          <TextField label="Email" type="email" name="email" />
          <div className="demoRow">
            <Button>Save</Button>
            <Button variant="ghost">Cancel</Button>
          </div>
        </div>
      </Preview>

      <div className="docBlock">
        <h2>Install</h2>
        <Code>{`npx @neelshha/ui@latest init
npx @neelshha/ui@latest add field`}</Code>
      </div>
    </article>
  );
}
