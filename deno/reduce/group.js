import { jsonResponse } from "../response.js";
import { doimap } from "../doi-map.js";

const groupMapFactory = ({ groupkey }) => (grmap, d) => {
  const grkey = groupkey(d);
  if (!grmap.has(grkey)) {
    grmap.set(grkey, [d]);
  } else {
    grmap.set(grkey, [...grmap.get(grkey), d]);
  }
  return grmap;
};

export const preprocess = ({ doimap, key, searchParams }) => {
  const mapper = !searchParams.has("fields[slim]")
    ? (d) => d
    : (d) => {
        const d2 = {};
        searchParams
          .get("fields[slim]")
          .split(",")
          .map((f) => (d2[f] = d[f]));
        return d2;
      };

  return [...doimap.values()]
    .map(mapper)
    .sort((a, b) => a?.[key]?.localeCompare(b?.[key]));
};

export const group = async ({ groups: { key, action, params }, url }) => {
  const { searchParams } = url;
  const prep = preprocess({ doimap, key, searchParams });
  console.warn({ key, params, action });
  params = params?.split(",").map(Number);
  const groupkey =
    "substring" !== action
      ? (d) => d[key]
      : (d) => {
          return d?.[key]?.substring(...params) ?? null;
        };

  const groupMap = prep.reduce(groupMapFactory({ groupkey }), new Map());
  return jsonResponse({
    links: { self: url },
    data: [...groupMap.entries()],
  });
};
