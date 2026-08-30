import {
  Navbar,
  NavbarBrand,
  NavbarSpacer,
  ThemeToggle,
} from "@neelshha/ui";
import { SiteNav } from "@/components/SiteNav";

export function SiteHeader() {
  return (
    <header className="header">
      <Navbar aria-label="Site">
        <NavbarBrand href="/">neelshha/ui</NavbarBrand>
        <SiteNav />
        <NavbarSpacer />
        <ThemeToggle />
      </Navbar>
    </header>
  );
}
