import { loadIndex } from "../registry.js";

export async function list() {
  const index = await loadIndex();
  if (index.items.length === 0) {
    console.log("No components in the registry.");
    return;
  }
  for (const item of index.items) {
    console.log(`${item.name}\t${item.title}`);
  }
}
