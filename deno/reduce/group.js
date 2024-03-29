import { jsonResponse } from "../response.js";
import { doimap, initDOIMapFromKV } from "../doi-map.js";

const groupReducerFactory = ({ groupkey }) => (grmap, d) => {
  const grkey = groupkey(d);
  if (!grmap.has(grkey)) {
    grmap.set(grkey, [d]);
  } else {
    grmap.set(grkey, [...grmap.get(grkey), d]);
  }
  return grmap;
};

export const preprocess = async ({ kv, doimap, key, searchParams }) => {
  if (doimap.size === 0) {
    await initDOIMapFromKV({ kv, doimap });
  }
  const mapper = !searchParams.has("fields[slim]") ? (d) => d : (d) => {
    const d2 = { [key]: d[key] }; // always include the member grouped on
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

export const group = async ({ kv, groups: { key, action, params }, url }) => {
  const { searchParams } = url;
  const prep = await preprocess({ kv, doimap, key, searchParams });

  params = params?.split(",").map(Number);
  const groupkey = "substring" !== action ? (d) => d[key] : (d) => {
    return d?.[key]?.substring(...params) ?? null;
  };

  const groupMap = prep.reduce(groupReducerFactory({ groupkey }), new Map());
  return jsonResponse({
    links: { self: url },
    data: [...groupMap.entries()],
  });
};
