import { getdoi, getdois } from "./doi.js";
import { getslim } from "./slim.js";
import { count } from "./reduce/count.js";
import { notFound, jsonResponse } from "./response.js";

const root = ({ request }) =>
  jsonResponse({ links: { self: new URL(request.url) } });

// https://developer.mozilla.org/en-US/docs/Web/API/URL_Pattern_API
const _patternHandlers = [
  {
    pattern: { pathname: "/doi" },
    handler: getdois,
    //validator: jsonapi
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
    pattern: { pathname: "/" },
    handler: root,
  },
  {
    pattern: { pathname: "*" },
    handler: notFound,
  },
];

export const routes = _patternHandlers.map(({ pattern, handler }) => ({
  pattern: new URLPattern(pattern),
  handler,
}));
