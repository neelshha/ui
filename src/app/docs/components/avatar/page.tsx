import type { Metadata } from "next";
import { Avatar, AvatarFallback } from "@neelshha/ui";
import { ApiTable } from "@/components/ApiTable";
import { Code, Install } from "@/components/Code";
import { Example } from "@/components/Example";

export const metadata: Metadata = {
  title: "Avatar",
  description: "A face. Initials if the image fails.",
};

const rows = [
  {
    name: "size",
    type: '"sm" | "md"',
    def: '"md"',
    notes: "sm is a compact face.",
  },
  {
    name: "AvatarImage",
    type: "img",
    notes: "Hides itself on error so the fallback shows. Client, for onError.",
  },
] as const;

export default function AvatarPage() {
  return (
    <article className="doc">
      <header className="docLead">
        <h1>Avatar</h1>
        <p>
          A face. Put an image in. If it fails, initials stay. This file is a
          client component because of <code>onError</code>.
        </p>
      </header>

      <Example
        code={`<Avatar>
  <AvatarFallback>AS</AvatarFallback>
</Avatar>
<Avatar size="sm">
  <AvatarFallback>NS</AvatarFallback>
</Avatar>`}
      >
        <div className="demoRow">
          <Avatar>
            <AvatarFallback>AS</AvatarFallback>
          </Avatar>
          <Avatar size="sm">
            <AvatarFallback>NS</AvatarFallback>
          </Avatar>
        </div>
      </Example>

      <div className="docBlock">
        <h2>Installation</h2>
        <Install name="avatar" />
      </div>

      <div className="docBlock">
        <h2>Usage</h2>
        <Code>{`import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

<Avatar>
  <AvatarImage src="/ada.jpg" alt="Ada" />
  <AvatarFallback>AS</AvatarFallback>
</Avatar>`}</Code>
      </div>

      <div className="docBlock">
        <h2>API</h2>
        <ApiTable rows={rows} />
      </div>
    </article>
  );
}
