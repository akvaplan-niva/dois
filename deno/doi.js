import { doimap, initDOIMapFromKV } from "./doi-map.js";
import { httpError, jsonResponse } from "./response.js";

const config = {
  limit: 10,
  format: "json",
  sort: "-published",
};

const _delete = async ({ kv, groups: { prefix, suffix }, request }) => {
  const doi = `${prefix}/${suffix}`.toLowerCase();
  const { value } = await kv.get(["dois", doi]);
  if (value) {
    await kv.delete(["dois", doi]);
    return jsonResponse(value);
  }
  return httpError({ request, status: 404 });
};

const _get = async ({ kv, groups: { prefix, suffix }, request }) => {
  const doi = `${prefix}/${suffix}`.toLowerCase();
  const { value } = await kv.get(["dois", doi]);
  return value ? jsonResponse(value) : httpError({ request, status: 404 });
};

const _set = async ({ kv, request }) => {
  const slim = await request.json();
  // @todo schema validate
  const { ok } = await kv.set(["dois", slim.doi], slim);
  if (!ok) {
    return httpError({ request, status: 500 });
  }
  const status = 201;
  return jsonResponse(slim, { status });
};

export const doi = async ({ kv, groups, request }) => {
  switch (request.method) {
    case "GET":
      return _get({ kv, request, groups });
    case "POST":
    case "PUT":
      return _set({ kv, request, groups });
    case "DELETE":
      return _delete({ kv, request, groups });
    default:
      return httpError({ request, status: 405 });
  }
};

const stringSortFactory = ({ key, dir = 1 } = {}) => (a, b) =>
  dir * a?.[key]?.localeCompare(b?.[key]);

const forceDefaultParams = ({ url }) => {
  const { searchParams } = url;
  ["limit", "format", "sort"].map((k) => {
    if (!searchParams.has(k)) {
      searchParams.set(k, config?.[k]);
    }
  });
  return url;
};

export const getdois = async ({ kv, request, url, groups }) => {
  if (doimap.size === 0) {
    await initDOIMapFromKV({ kv, doimap });
  }
  url = forceDefaultParams({ url });

  const _limit = url.searchParams.has("limit")
    ? url.searchParams.get("limit")
    : doimap.size;
  const limit = "-1" === _limit ? doimap.size : Number(_limit);

  const format = url.searchParams.get("format");
  const sort = url.searchParams.get("sort");
  const dir = /^-/.test(sort) ? -1 : 1;
  const key = sort.replace(/^-/, "");

  const links = { self: url };

  const data = [...doimap.values()]
    .sort(stringSortFactory({ key, dir }))
    .slice(0, limit);

  if ("json" === format) {
    return jsonResponse({ links, data });
  }
  return new Response(data.map(JSON.stringify).join("\n"));
};
