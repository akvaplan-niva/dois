import { jsonResponse, httpError } from "./response.js";
import { doimap } from "./doi-map.js";

const config = { limit: 1, format: "json" };

const validateRequest = ({ url }) => {
  return { status: 400 };
};

export const getdoi = ({ /*input,*/ groups: { prefix, suffix }, request }) => {
  const doi = `${prefix}/${suffix}`.toLowerCase();
  return doimap.has(doi)
    ? jsonResponse(doimap.get(doi))
    : httpError({ request, status: 404 });
};

const stringSortFactory = ({ key, dir = 1 } = {}) => (a, b) =>
  dir * a?.[key]?.localeCompare(b?.[key]);

export const getdois = ({ request, url, groups }) => {
  const { status } = validateRequest({ request });
  const limit = url.searchParams.get("limit") ?? config.limit;
  const format = url.searchParams.get("format") ?? config.format;
  const data = [...doimap.values()]
    .sort(stringSortFactory({ key: "title" }))
    .slice(0, limit);
  if ("json" === format) {
    return jsonResponse({
      data,
    });
  }
  console.warn(data);
  return new Response(data.map(JSON.stringify).join("\n"));
};
