import { dir } from "./file.js";
import { jsonResponse, notFound } from "./response.js";

export const doimap = new Map();

export const init = async ({ doimap, dir }) => {
  for await (const { name, isFile } of Deno.readDir(dir)) {
    if (isFile) {
      const text = (await Deno.readTextFile(`${dir}/${name}`)).trim();
      const pubs = text.split("\n").map(JSON.parse);
      for (const { doi, ...p } of pubs) {
        doimap.set(doi.toLowerCase(), { doi, ...p });
      }
    }
  }
};

export const getdoi = ({ input, groups, request }) => {
  const { prefix, suffix } = groups;
  const doi = `${prefix}/${suffix}`.toLowerCase();
  return doimap.has(doi)
    ? jsonResponse(doimap.get(doi))
    : notFound({ request });
};
