import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import type { RegistryIndex, RegistryItem } from "./types.js";

export const DEFAULT_REGISTRY = "https://ui.neelshha.com/r";

export type RegistryLoadOptions = {
  latest?: boolean;
};

function bundledDir() {
  return join(dirname(fileURLToPath(import.meta.url)), "../bundled");
}

function readBundled<T>(name: string): T | null {
  const file = join(bundledDir(), `${name}.json`);
  if (!existsSync(file)) return null;
  return JSON.parse(readFileSync(file, "utf8")) as T;
}

async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const response = await fetch(url, { headers: { accept: "application/json" } });
    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

export function registryBase() {
  return process.env.NS_REGISTRY ?? DEFAULT_REGISTRY;
}

function useRemoteFirst(options?: RegistryLoadOptions) {
  return Boolean(process.env.NS_REGISTRY) || Boolean(options?.latest);
}

export async function loadIndex(
  options?: RegistryLoadOptions,
): Promise<RegistryIndex> {
  if (useRemoteFirst(options)) {
    const remote = await fetchJson<RegistryIndex>(`${registryBase()}/index.json`);
    if (remote?.items) return remote;
  }

  const bundled = readBundled<RegistryIndex>("index");
  if (bundled?.items) return bundled;

  const remote = await fetchJson<RegistryIndex>(`${registryBase()}/index.json`);
  if (remote?.items) return remote;
  throw new Error("Could not load the registry index.");
}

export async function loadItem(
  name: string,
  options?: RegistryLoadOptions,
): Promise<RegistryItem> {
  if (useRemoteFirst(options)) {
    const remote = await fetchJson<RegistryItem>(
      `${registryBase()}/${name}.json`,
    );
    if (remote?.name && remote.files) return remote;
  }

  const bundled = readBundled<RegistryItem>(name);
  if (bundled?.name && bundled.files) return bundled;

  const remote = await fetchJson<RegistryItem>(`${registryBase()}/${name}.json`);
  if (remote?.name && remote.files) return remote;
  throw new Error(`Unknown component "${name}". Run list.`);
}
