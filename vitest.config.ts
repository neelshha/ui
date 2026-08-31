import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: [
      "packages/ui/src/**/*.test.ts",
      "packages/cli/src/**/*.test.ts",
      "src/**/*.test.ts",
    ],
  },
});
