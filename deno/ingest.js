import { httpError, jsonResponse } from "./response.js";

export const initKVFromNDJSONFilesInDir = async ({ kv, dir }) => {
  let i = 0;
  let c = 0;
  for await (const { name, isFile } of Deno.readDir(dir)) {
    if (isFile) {
      const text = (await Deno.readTextFile(`${dir}/${name}`)).trim();
      const pubs = text.split("\n").map(JSON.parse);
      for (const slim of pubs) {
        c++;
        const {ok} = await kv.set(["dois", slim.doi], slim);
        if (ok) {
          i++;
        }
      }
    }
  }
  return {ingested: i, total: c };
};

export const ingest = async ({ kv, request }) => {
  if (!/POST/i.test(request.method)) {
    return httpError({ status: 405, request });
  }
  const start = new Date();
  const stats = await initKVFromNDJSONFilesInDir({ kv, dir: "slim" });
  const end = new Date();
  stats.elapsed = (end-start)/1000;
  stats.start = start.toJSON();
  stats.end = end.toJSON();
  stats.ok = stats.ingested === stats.total && stats.ingested>0;
  return jsonResponse(stats);
};
