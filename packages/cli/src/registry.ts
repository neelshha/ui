import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import type { RegistryIndex, RegistryItem } from "./types.js";

export const DEFAULT_REGISTRY = "https://ui.neelshha.com/r";

/** Network calls must never hang the CLI indefinitely. */
const FETCH_TIMEOUT_MS = 10_000;

export type RegistryLoadOptions = {
  latest?: boolean;
  /** Registry base URL from ns.json. NS_REGISTRY still wins. */
  base?: string;
};

/** Validate an untrusted registry payload before anything touches it. Returns
    a normalized item, or null when the payload is not a usable registry item
    (truncated download, schema drift, wrong URL, …). */
export function asRegistryItem(value: unknown): RegistryItem | null {
  if (typeof value !== "object" || value === null) return null;
  const item = value as Partial<RegistryItem>;
  if (typeof item.name !== "string" || item.name.length === 0) return null;
  if (!Array.isArray(item.files) || item.files.length === 0) return null;
  if (
    !item.files.every(
      (file) =>
        typeof file === "object" &&
        file !== null &&
        typeof file.path === "string" &&
        typeof file.content === "string",
    )
  ) {
    return null;
  }
  const npm = Array.isArray(item.dependencies?.npm)
    ? item.dependencies.npm
    : [];
  const registry = Array.isArray(item.dependencies?.registry)
    ? item.dependencies.registry
    : [];
  return {
    name: item.name,
    title: typeof item.title === "string" ? item.title : item.name,
    ...(typeof item.docs === "string" ? { docs: item.docs } : {}),
    files: item.files as RegistryItem["files"],
    dependencies: { npm, registry },
  };
}

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
    const response = await fetch(url, {
      headers: { accept: "application/json" },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    // Timeout, network failure, or invalid JSON — fall back to bundled.
    return null;
  }
}

export function registryBase(options?: { base?: string }) {
  return process.env.NS_REGISTRY ?? options?.base ?? DEFAULT_REGISTRY;
}

function useRemoteFirst(options?: RegistryLoadOptions) {
  return (
    Boolean(process.env.NS_REGISTRY) ||
    Boolean(options?.latest) ||
    (options?.base !== undefined && options.base !== DEFAULT_REGISTRY)
  );
}

export async function loadIndex(
  options?: RegistryLoadOptions,
): Promise<RegistryIndex> {
  const base = registryBase(options);
  if (useRemoteFirst(options)) {
    const remote = await fetchJson<RegistryIndex>(`${base}/index.json`);
    if (Array.isArray(remote?.items)) return remote;
  }

  const bundled = readBundled<RegistryIndex>("index");
  if (Array.isArray(bundled?.items)) return bundled;

  const remote = await fetchJson<RegistryIndex>(`${base}/index.json`);
  if (Array.isArray(remote?.items)) return remote;
  throw new Error("Could not load the registry index.");
}

export async function loadItem(
  name: string,
  options?: RegistryLoadOptions,
): Promise<RegistryItem> {
  const base = registryBase(options);
  if (useRemoteFirst(options)) {
    const remote = asRegistryItem(
      await fetchJson<unknown>(`${base}/${name}.json`),
    );
    if (remote) return remote;
  }

  const bundled = asRegistryItem(readBundled<unknown>(name));
  if (bundled) return bundled;

  const remote = asRegistryItem(await fetchJson<unknown>(`${base}/${name}.json`));
  if (remote) return remote;
  throw new Error(`Unknown component "${name}". Run list.`);
}
