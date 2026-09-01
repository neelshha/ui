import Link from "next/link";
import { Navbar, NavbarBrand, NavbarSpacer, ThemeToggle } from "@neelshha/ui";
import { MobileDocsNav } from "@/components/MobileDocsNav";
import { SiteNav } from "@/components/SiteNav";

export function SiteHeader() {
  return (
    <header className="header">
      <Navbar aria-label="Site">
        <NavbarBrand>
          <Link href="/">neelshha/ui</Link>
        </NavbarBrand>
        <SiteNav />
        <NavbarSpacer />
        <ThemeToggle icon variant="ghost" />
        <MobileDocsNav />
      </Navbar>
    </header>
  );
}
