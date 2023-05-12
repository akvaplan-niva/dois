import { httpError, jsonResponse } from "./response.js";
import { doimap } from "./doi-map.js";

const config = {
  limit: 10,
  format: "json",
  sort: "-published",
};

const validateRequest = ({ url }) => {
  return { status: 200 };
};

export const getdoi = ({ groups: { prefix, suffix }, request }) => {
  const doi = `${prefix}/${suffix}`.toLowerCase();
  return doimap.has(doi)
    ? jsonResponse(doimap.get(doi))
    : httpError({ request, status: 404 });
};

const stringSortFactory = ({ key, dir = 1 } = {}) =>
  (a, b) => dir * a?.[key]?.localeCompare(b?.[key]);

const forceDefaultParams = ({ url }) => {
  const { searchParams } = url;
  ["limit", "format", "sort"].map((k) => {
    if (!searchParams.has(k)) {
      searchParams.set(k, config?.[k]);
    }
  });
  return url;
};

export const getdois = ({ request, url, groups }) => {
  //const { status } = validateRequest({ request });
  url = forceDefaultParams({ url });

  const limit = url.searchParams.get("limit");
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
