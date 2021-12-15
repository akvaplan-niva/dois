import { jsonResponse } from "../response.js";
import { doimap as map } from "../doi-map.js";

const countMapFactory = ({ key }) => (count, d) => {
  if (!count.has(d[key])) {
    count.set(d[key], 1);
  } else {
    count.set(d[key], 1 + count.get(d[key]));
  }
  return count;
};

const preprocess = ({ map, key, action, params }) => {
  params = params?.split(",");
  if ("substring" === action) {
    params = params.map(Number);
    map = [...map.values()].map((d) => ({
      [key]: d?.[key]?.substring(...params) ?? null,
    }));
  }
  return [...map.values()];
};

export const count = async ({ groups: { key, action, params }, url }) => {
  const prep = preprocess({ map, key, action, params });
  const countMap = prep.reduce(countMapFactory({ key }), new Map());
  return jsonResponse({
    links: { self: url },
    data: [...countMap.entries()],
  });
};
