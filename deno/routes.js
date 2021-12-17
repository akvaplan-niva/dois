import { getdoi, getdois } from "./doi.js";
import { getslim } from "./slim.js";
import { count } from "./reduce/count.js";
import { group } from "./reduce/group.js";

const root = async (/*{ request }*/) => {
  const readme = new URL("readme.html", import.meta.url);
  const headers = new Headers({
    "content-type": `text/html; charset=utf-8`,
  });
  const r = await fetch(readme);
  return new Response(r.body, { headers });
};
//jsonResponse({ links: { self: new URL(request.url) } });

// https://developer.mozilla.org/en-US/docs/Web/API/URL_Pattern_API
const _patternHandlers = [
  {
    pattern: { pathname: "/doi" },
    handler: getdois,
  },
  { pattern: { pathname: "/doi/:prefix/:suffix" }, handler: getdoi },
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
