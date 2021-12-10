import { jsonResponse } from "./mod.js";

export const directFileChildren = async ({ dir }) => {
  const _f = [];
  for await (const { name, isFile } of Deno.readDir(dir)) {
    if (isFile) {
      _f.push(name);
    }
  }
  return _f.sort((a, b) => a.localeCompare(b)).map((name) => ({ name }));
};

export const jsonApiFileLinks = async ({ dir, base = "" } = {}) => {
  const files = await directFileChildren({ dir });
  const links = files.map(({ name }) => ({ href: `${base}${name}` }));
  return jsonResponse({ links });
};
