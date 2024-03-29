import { doi, getdois } from "./doi.js";
//import { candidate } from "./candidate.js";
import { ingest } from "./ingest.js";
import { getslim } from "./slim.js";
import { count } from "./reduce/count.js";
import { group } from "./reduce/group.js";

export const root = async (/*{ request }*/) => {
  const readmeURL = new URL("readme.html", import.meta.url);
  const headers = new Headers({
    "content-type": `text/html; charset=utf-8`,
  });
  const readme = await Deno.readTextFile(readmeURL);
  return new Response(readme, { headers });
};
//jsonResponse({ links: { self: new URL(request.url) } });

// https://developer.mozilla.org/en-US/docs/Web/API/URL_Pattern_API
const _patternHandlers = [
  {
    pattern: { pathname: "/doi" },
    handler: getdois,
  },
  { pattern: { pathname: "/doi/:prefix/:suffix*" }, handler: doi },

  //{ pattern: { pathname: "/candidate/:prefix/:suffix*" }, handler: candidate },
  {
    pattern: { pathname: "/slim/:basename.:format(ndjson|json)" },
    handler: getslim,
  },
  {
    pattern: { pathname: "/count/:key/:action?/:params?" },
    handler: count,
  },
  {
    pattern: { pathname: "/group/:key/:action?/:params?" },
    handler: group,
  },

  {
    pattern: { pathname: "/ingest" },
    handler: ingest,
  },
  {
    pattern: { pathname: "/" },
    handler: root,
  },
  // {
  //   pattern: { pathname: "*" },
  //   handler: notFound,
  // },
];

export const routes = _patternHandlers.map(({ pattern, handler }) => ({
  pattern: new URLPattern(pattern),
  handler,
}));
