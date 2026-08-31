import type { Metadata } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import { DM_Mono, Onest } from "next/font/google";
import { ThemeProvider } from "@neelshha/ui";
import { THEME_SCRIPT } from "@neelshha/ui/theme";
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
        <Script id="ns-theme" strategy="beforeInteractive">
          {THEME_SCRIPT}
        </Script>
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
