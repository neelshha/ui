import type { Metadata } from "next";
import type { ReactNode } from "react";
import { DM_Mono, Onest } from "next/font/google";
import { ThemeProvider, ThemeScript } from "@neelshha/ui";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SITE } from "@/lib/docs";
import "./globals.css";

const onest = Onest({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-onest",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

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
    <html
      lang="en-US"
      suppressHydrationWarning
      className={`${onest.variable} ${dmMono.variable}`}
    >
      <body>
        {/* A plain inline script, first in the body: it runs before paint so
            the theme never flashes, and React never has to re-render a script
            tag on the client (next/script's beforeInteractive logs a console
            error for exactly that in the App Router). */}
        <ThemeScript />
        <a href="#content" className="skip ns-button" data-variant="outline">
          Skip to content
        </a>
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
