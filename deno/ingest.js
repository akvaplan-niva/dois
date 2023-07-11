import { httpError, jsonResponse } from "./response.js";
import { initKVFromNDJSONFilesInDir } from "./doi-map.js";

export const seed = async ({ kv, request }) => {
  if (!/POST/i.test(request.method)) {
    return httpError({ status: 405, request });
  }
  await initKVFromNDJSONFilesInDir({ kv, dir: "slim" });
  return jsonResponse({ seed: true });
};
