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
      { source: "/docs/components", destination: "/components", permanent: true },
      ...componentRedirects,
    ];
  },
};

export default nextConfig;
