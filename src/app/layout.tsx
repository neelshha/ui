import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

const site = "https://ui.neelshha.com";

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: {
    default: "NS UI",
    template: "%s — NS UI",
  },
  description:
    "Interface components by Neel Shah. Copy them into a React or Next app.",
  alternates: { canonical: site },
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en-US">
      <body>
        <div className="page">
          <nav className="nav">
            <a href="/">NS UI</a>
            <a href="/field">Field</a>
          </nav>
          {children}
        </div>
      </body>
    </html>
  );
}
