export type RegistryFile = {
  path: string;
  content: string;
};

export type RegistryItem = {
  name: string;
  title: string;
  /** Optional setup note printed by add after the files are written. */
  docs?: string;
  files: RegistryFile[];
  dependencies: {
    npm: string[];
    registry: string[];
  };
};

export type RegistryIndex = {
  items: Array<{ name: string; title: string }>;
};

export type NsConfig = {
  aliases: {
    ui: string;
  };
  path: string;
  /** Registry base URL recorded at init. NS_REGISTRY env still wins. */
  registry?: string;
};

export type Framework = "next" | "vite" | "react";
