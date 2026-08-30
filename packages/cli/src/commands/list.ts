import { loadIndex } from "../registry.js";

export async function list(flags: { latest?: boolean } = {}) {
  const index = await loadIndex({ ...(flags.latest ? { latest: true } : {}) });
  if (index.items.length === 0) {
    console.log("No components in the registry.");
    return;
  }
  for (const item of index.items) {
    console.log(`${item.name}\t${item.title}`);
  }
}
