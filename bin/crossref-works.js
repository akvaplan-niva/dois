import { fix } from "./fix-map.js";
import { cache } from "https://deno.land/x/cache@0.2.13/mod.ts";
import { main } from "https://deno.land/x/newline@v0.1.0/nd-map/main.js";
import { ndmapcommand as command } from "https://deno.land/x/newline@v0.1.0/nd-map/command.js";

const base = "https://api.crossref.org";
const isDOI = (s) => /^(https:\/\/doi.org\/)?10\./.test(String(s).trim());

const fetchAndCacheCrossrefDOI = async (d, i, args) => {
  try {
    let doi = d;
    if (!isDOI(doi)) {
      doi = e.doi;
    }
    if (isDOI(doi)) {
      doi = doi.toLowerCase().replace("https://doi.org/", "");
      const worksURL = new URL(`${base}/works/${doi}`);
      const file = await cache(worksURL);
      const { message } = JSON.parse(await Deno.readTextFile(file.path));
      return fix(message);
    }
  } catch (e) {
    console.error(String(d));
    console.error(e);
  }
};

if (import.meta.main) {
  main({ command, mapfx: fetchAndCacheCrossrefDOI });
}
