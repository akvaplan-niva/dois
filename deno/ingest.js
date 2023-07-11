import { httpError, jsonResponse } from "./response.js";
import { initKVFromNDJSONFilesInDir } from "./doi-map.js";

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
