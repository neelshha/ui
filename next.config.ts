import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@neelshha/ui"],
  async redirects() {
    return [
      { source: "/field", destination: "/docs/components/field", permanent: true },
      { source: "/button", destination: "/docs/components/button", permanent: true },
      { source: "/label", destination: "/docs/components/label", permanent: true },
      { source: "/card", destination: "/docs/components/card", permanent: true },
      { source: "/badge", destination: "/docs/components/badge", permanent: true },
      { source: "/separator", destination: "/docs/components/separator", permanent: true },
      { source: "/text", destination: "/docs/components/text", permanent: true },
      { source: "/alert", destination: "/docs/components/alert", permanent: true },
      { source: "/checkbox", destination: "/docs/components/checkbox", permanent: true },
      { source: "/dialog", destination: "/docs/components/dialog", permanent: true },
      { source: "/radio", destination: "/docs/components/radio", permanent: true },
      { source: "/select", destination: "/docs/components/select", permanent: true },
      { source: "/switch", destination: "/docs/components/switch", permanent: true },
      { source: "/table", destination: "/docs/components/table", permanent: true },
      { source: "/tabs", destination: "/docs/components/tabs", permanent: true },
      { source: "/navbar", destination: "/docs/components/navbar", permanent: true },
      { source: "/accordion", destination: "/docs/components/accordion", permanent: true },
      { source: "/avatar", destination: "/docs/components/avatar", permanent: true },
      { source: "/breadcrumb", destination: "/docs/components/breadcrumb", permanent: true },
      { source: "/kbd", destination: "/docs/components/kbd", permanent: true },
      { source: "/link", destination: "/docs/components/link", permanent: true },
      { source: "/menu", destination: "/docs/components/menu", permanent: true },
      { source: "/popover", destination: "/docs/components/popover", permanent: true },
      { source: "/progress", destination: "/docs/components/progress", permanent: true },
      { source: "/skeleton", destination: "/docs/components/skeleton", permanent: true },
      { source: "/spinner", destination: "/docs/components/spinner", permanent: true },
      { source: "/toast", destination: "/docs/components/toast", permanent: true },
      { source: "/tooltip", destination: "/docs/components/tooltip", permanent: true },
    ];
  },
};

export default nextConfig;
