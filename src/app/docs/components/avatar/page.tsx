import type { Metadata } from "next";
import { Avatar, AvatarFallback, AvatarImage } from "@neelshha/ui";
import { ApiTable } from "@/components/ApiTable";
import { Code, Install } from "@/components/Code";
import { Example } from "@/components/Example";

export const metadata: Metadata = {
  title: "Avatar",
  description: "A silver face. Initials if the image fails.",
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
    notes: "Hides itself on error so the fallback shows. alt defaults to empty. Fallback leaves the tree once the image loads.",
  },
] as const;

export default function AvatarPage() {
  return (
    <article className="doc">
      <header className="docLead">
        <h1>Avatar</h1>
        <p>
          A silver face. Put an image in. If it fails, initials stay. This
          file is a client component because of <code>onError</code>.
        </p>
      </header>

      <Example
        code={`<Avatar>
  <AvatarImage src="/ada.jpg" alt="Ada" />
  <AvatarFallback>AS</AvatarFallback>
</Avatar>
<Avatar>
  <AvatarFallback>AS</AvatarFallback>
</Avatar>
<Avatar size="sm">
  <AvatarFallback>NS</AvatarFallback>
</Avatar>`}
      >
        <div className="demoRow">
          <Avatar>
            <AvatarImage
              src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect fill='%23c4b8a8' width='32' height='32'/%3E%3Ccircle fill='%235c5346' cx='16' cy='13' r='6'/%3E%3Cpath fill='%235c5346' d='M6 30c2-8 18-8 20 0'/%3E%3C/svg%3E"
              alt="Ada"
            />
            <AvatarFallback>AS</AvatarFallback>
          </Avatar>
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
