export const doimap = new Map();

export const initKVFromNDJSONFilesInDir = async ({ kv, doimap, dir }) => {
  let i = 0;
  let c = 0;
  for await (const { name, isFile } of Deno.readDir(dir)) {
    console.warn({ name });
    if (isFile) {
      const text = (await Deno.readTextFile(`${dir}/${name}`)).trim();
      const pubs = text.split("\n").map(JSON.parse);
      for (const slim of pubs) {
        c++;
        const {ok} = await kv.set(["dois", slim.doi], slim);
        if (ok) {
          i++;
        }
      }
    }
  }
  return {ingested: i, total: c };
};

export const initDOIMapFromKV = async ({ kv, doimap }) => {
  const prefix = ["dois"];
  const consistency = "eventual";
  const batchSize = 500;
  for await (const { value } of kv.list({ prefix, consistency, batchSize })) {
    doimap.set(value.doi.toLowerCase(), value);
  }
};
