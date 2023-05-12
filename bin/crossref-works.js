import { fix } from "./fix-map.js";
import { cache } from "https://deno.land/x/cache@0.2.13/mod.ts";
import { main } from "https://deno.land/x/newline@v0.2.0/nd-map/main.js";
import { ndmapcommand as command } from "https://deno.land/x/newline@v0.2.0/nd-map/command.js";

const base = "https://api.crossref.org";
const isDOI = (s) => /^(https:\/\/doi.org\/)?10\./.test(String(s).trim());

//DataCite DOI prefixes
const datacites = [
  "10.18710", // dataverse.no
  "10.5281", // zenodo
  "10.1594", // pangaea
  "10.6084", // figshare
  "10.5061", // dryad
];
const notCrossref = [...datacites];

const fetchAndCacheCrossrefDOI = async (d, i, args) => {
  try {
    let doi = d;

    if (!isDOI(doi)) {
      doi = d.doi;
    }
    if (isDOI(doi)) {
      //console.warn({ doi });
      doi = doi.replace("https://doi.org/", "").trim().replace(/\.$/, "");

      const [prefix] = doi.split("/");
      if (notCrossref.includes(prefix)) {
        console.warn("Not in Crossref:", doi);
      } else {
        const worksURL = new URL(`${base}/works/${doi}`).href;
        const file = await cache(worksURL);
        const { message } = JSON.parse(await Deno.readTextFile(file.path));
        //console.warn(doi, message.title);
        return fix(message);
      }
    }
  } catch (e) {
    console.error(e.prototype, e?.class?.name, e?.message, String(d));
  }
};

if (import.meta.main) {
  main({ command, mapfx: fetchAndCacheCrossrefDOI });
}
