export const doimap = new Map();

export const initDOIMapFromKV = async ({ kv, doimap }) => {
  const prefix = ["dois"];
  const consistency = "eventual";
  const batchSize = 500;
  for await (const { value } of kv.list({ prefix, consistency, batchSize })) {
    doimap.set(value.doi.toLowerCase(), value);
  }
};
