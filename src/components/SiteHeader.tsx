import Link from "next/link";
import { Navbar, NavbarBrand, NavbarSpacer } from "@neelshha/ui";
import { SiteNav } from "@/components/SiteNav";
import { SiteThemeToggle } from "@/components/SiteThemeToggle";

export function SiteHeader() {
  return (
    <header className="header">
      <Navbar aria-label="Site">
        <NavbarBrand>
          <Link href="/">neelshha/ui</Link>
        </NavbarBrand>
        <SiteNav />
        <NavbarSpacer />
        <SiteThemeToggle />
      </Navbar>
    </header>
  );
}
