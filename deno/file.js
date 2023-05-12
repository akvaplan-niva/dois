import { jsonResponse } from "./response.js";

export const path = ({ name, dir = Deno.cwd() } = {}) => `${dir}/${name ?? ""}`;

export const dir = `./slim`;

export async function* files({ dir }) {
  const dirIter = Deno.readDir(dir);
  for await (const { name, isFile, ...meta } of dirIter) {
    if (isFile) {
      yield { name, ...meta };
    }
  }
}

export const readNDJSONFile = async (args) => {
  const text = await Deno.readTextFile(args);
  return text.trim().split("\n").map(JSON.parse);
};

export const filesInDir = async ({ dir }) => {
  const _f = [];
  for await (const { name, isFile } of Deno.readDir(dir)) {
    if (isFile) {
      _f.push(name);
    }
  }
  return _f.sort((a, b) => a.localeCompare(b)).map((name) => ({ name }));
};

export const jsonFileLinks = async ({ dir, base = "" } = {}) => {
  const files = await filesInDir({ dir });
  const links = files.map(({ name }) => ({ href: `${base}${name}` }));
  return jsonResponse({ links });
};
