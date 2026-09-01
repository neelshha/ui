import type { NextConfig } from "next";
import { components } from "./src/lib/docs";

// Short component URLs are generated from the docs list so a new component
// never 404s on /<slug> just because the config was not touched.
const componentRedirects = components.map((component) => ({
  source: `/${component.slug}`,
  destination: `/docs/components/${component.slug}`,
  permanent: true,
}));

const nextConfig: NextConfig = {
  transpilePackages: ["@neelshha/ui"],
  async redirects() {
    return [
      // The components catalog lives in the docs tree, next to the component
      // pages. Old standalone links land in the sidebar layout. This one
      // stays temporary (307): permanent redirects are cached by browsers,
      // and this URL already flipped direction once — a pinned 308 here
      // would loop old visitors through a full page reload on every click.
      { source: "/components", destination: "/docs/components", permanent: false },
      ...componentRedirects,
    ];
  },
};

export default nextConfig;
