export const doimap = new Map();

export const initKVFromNDJSONFilesInDir = async ({ kv, doimap, dir }) => {
  for await (const { name, isFile } of Deno.readDir(dir)) {
    console.warn({ name });
    if (isFile) {
      const text = (await Deno.readTextFile(`${dir}/${name}`)).trim();
      const pubs = text.split("\n").map(JSON.parse);
      for (const slim of pubs) {
        await kv.set(["dois", slim.doi], slim);
      }
    }
  }
};

export const initDOIMapFromKV = async ({ kv, doimap }) => {
  for await (const { value } of kv.list({ prefix: ["dois"] })) {
    doimap.set(value.doi.toLowerCase(), value);
  }
};
