import { Link } from "@neelshha/ui";
import { headerNav } from "@/lib/docs";

const REPO = "https://github.com/neelshha/ui";
const YEAR = new Date().getFullYear();

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="shell footerInner">
        <div className="footerTop">
          <div className="footerBrand">
            <span className="footerMark">n/ui</span>
            <span className="footerTagline">
              Interface components. Yours once you add them.
            </span>
          </div>
          <nav className="footerNav" aria-label="Footer">
            {headerNav.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
            <Link href={REPO} target="_blank">
              GitHub
            </Link>
          </nav>
        </div>
        <div className="footerMeta">
          <span>© {YEAR} Neel Shah</span>
          <span>
            <Link href={REPO} target="_blank">
              Copy the source
            </Link>{" "}
            · MIT
          </span>
        </div>
      </div>
    </footer>
  );
}
