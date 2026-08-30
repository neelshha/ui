export type RegistryFile = {
  path: string;
  content: string;
};

export type RegistryItem = {
  name: string;
  title: string;
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
};

export type Framework = "next" | "vite" | "react";
