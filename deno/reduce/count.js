import { jsonResponse } from "../response.js";
import { doimap, initDOIMapFromKV } from "../doi-map.js";

const countReducerFactory = ({ key }) => (count, d) => {
  if (!count.has(d[key])) {
    count.set(d[key], 1);
  } else {
    count.set(d[key], 1 + count.get(d[key]));
  }
  return count;
};

export const preprocess = async ({ kv, doimap, key, action, params }) => {
  if (doimap.size === 0) {
    await initDOIMapFromKV({ kv, doimap });
  }
  params = params?.split(",");
  if ("substring" === action) {
    params = params.map(Number);
    doimap = [...doimap.values()].map((d) => ({
      [key]: d?.[key]?.substring(...params) ?? null,
    }));
  }
  return [...doimap.values()];
};

export const count = async ({ kv, groups: { key, action, params }, url }) => {
  const prep = await preprocess({ kv, doimap, key, action, params });
  const countMap = prep.reduce(countReducerFactory({ key }), new Map());
  return jsonResponse({
    links: { self: url },
    data: [...countMap.entries()],
  });
};
