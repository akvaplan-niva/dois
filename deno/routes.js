import { getdoi } from "./doi.js";
import { getslim } from "./slim.js";
import { jsonFileLinks, dir } from "./file.js";

const _routes = [
  { pattern: { pathname: "/doi/:prefix/:suffix" }, handler: getdoi },
  { pattern: { pathname: "/slim/:id.ndjson" }, handler: getslim },
  {
    pattern: { pathname: "/" },
    handler: () => jsonFileLinks({ dir, base: "/slim/" }),
  },
];

export const routes = _routes.map(({ pattern, handler }) => ({
  pattern: new URLPattern(pattern),
  handler,
}));
