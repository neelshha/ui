import { registryIndex, registryItem, registryNames } from "@/lib/registry";

export function generateStaticParams() {
  return registryNames().flatMap((name) => [{ name }, { name: `${name}.json` }]);
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ name: string }> },
) {
  const { name } = await context.params;
  const body =
    name === "index.json" || name === "index"
      ? registryIndex()
      : registryItem(name.replace(/\.json$/, ""));

  if (!body) {
    return new Response("Not found", { status: 404 });
  }

  return Response.json(body);
}
