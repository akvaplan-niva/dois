export const doimap = new Map();

export const initDOIMapFromNDJSONFilesInDir = async ({ doimap, dir }) => {
  console.warn({doimap,dir})
  for await (const { name, isFile } of Deno.readDir(dir)) {
    console.warn({name})
    if (isFile) {
      const text = (await Deno.readTextFile(`${dir}/${name}`)).trim();
      const pubs = text.split("\n").map(JSON.parse);
      for (const { doi, ...p } of pubs) {
        doimap.set(doi.toLowerCase(), { doi, ...p });
      }
    }
  }
};
