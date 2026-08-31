import { Link } from "@neelshha/ui";

const REPO = "https://github.com/neelshha/ui";

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="shell footerInner">
        <p>
          <Link href={REPO} target="_blank">
            Copy the source
          </Link>
          . MIT.
        </p>
      </div>
    </footer>
  );
}
