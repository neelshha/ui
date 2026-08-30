import type { ReactNode } from "react";

export function Preview({
  children,
  wide = false,
}: {
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <div className={wide ? "demo demoWide" : "demo"}>
      <div className="demoInner">{children}</div>
    </div>
  );
}
