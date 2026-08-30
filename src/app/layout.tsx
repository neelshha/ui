import type { Metadata } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import { ThemeProvider } from "@neelshha/ui";
import { THEME_SCRIPT } from "@neelshha/ui/theme";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SITE } from "@/lib/docs";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "neelshha/ui",
    template: "%s — neelshha/ui",
  },
  description:
    "Interface components by Neel Shah. Copy them into a React or Next app.",
  alternates: { canonical: SITE },
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en-US" suppressHydrationWarning>
      <body>
        <Script id="ns-theme" strategy="beforeInteractive">
          {THEME_SCRIPT}
        </Script>
        <ThemeProvider>
          <div className="site">
            <SiteHeader />
            {children}
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
