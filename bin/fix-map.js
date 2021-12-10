export const fixmap = new Map([
  [
    "10.3389/fmars.2015.00022",
    {
      title: [
        "Environmental factors structuring Arctic megabenthos — a case study from a shelf and two fjords",
      ],
    },
  ],
  [
    "10.4337/9780857934741.00012", // Oil-spill response in the Russian Arctic
    { published: { "date-parts": [[2015, 9, 25]] }, type: "book-chapter" },
  ],
  ["10.1007/0-306-48002-6_12", { published: { "date-parts": [[2003]] } }], // Arctic Coastal and Marine Environmental Monitorin
  [
    "10.5194/tcd-6-4305-2012-supplement", // Bedmap2 supplement
    { published: { "date-parts": [[2012]] } },
  ],
  [
    "10.5194/tc-2017-110", // Tidal influences on a future evolution of the Filchner-Ronne Ice Shelf cavity in the Weddell Sea, Antarctica
    { published: { "date-parts": [[2017]] } },
  ],
  [
    "10.3354/meps310033",
    {
      title: [
        "Trophic relationships and pelagic–benthic coupling during summer in the Barents Sea Marginal Ice Zone, revealed by stable carbon and nitrogen isotope measurements",
      ],
    },
  ],
  [
    "10.1007/978-3-540-48514-8_1",
    {
      published: { "date-parts": [[2007]] },
    },
  ],
  [
    "10.1007/978-3-540-48514-8_9",
    {
      published: { "date-parts": [[2007]] },
    },
  ],
  [
    "10.1093/plankt/fbw024",
    {
      title: [
        "A major <em>Calanus finmarchicus</em> overwintering population inside a deep fjord in northern Norway: implications for cod larvae recruitment success",
      ],
    },
  ],
  [
    "10.1023/a:1003009524563",
    {
      title: [
        "Sensitivity to stress in the bivalve Macoma balthica from the most northern (Arctic) to the most southern (French) populations: low sensitivity in Arctic populations because of genetic adaptations?",
      ],
    },
  ],
  [
    "10.1023/a:1009691314353",
    {
      title: [
        "Arsenic and other Trace Metals in Sediments from the Kara Sea and the Ob and Yenisey Estuaries, Russia",
      ],
    },
  ],
  [
    "10.4194/1303-2712-v16_2_06",
    {
      title: [
        "Effect of Fish Protein Replacement in Diets for Juvenile Turbot Scophthalmus maximus",
      ],
    },
  ],
]);

// Example for changing title[0]
// cat crossref/akvaplan-works.ndjson | nd-map [d.DOI,d.title] | grep 10.1093/plankt/fbw024
// ["10.1093/plankt/fbw024",["A majorCalanus finmarchicusoverwintering population inside a deep fjord in northern Norway: implications for cod larvae recruitment success"]]

// Needs title fix:
// "Climatic and ecological drivers of euphausiid community structure vary spatially in the Barents Sea: relationships from a long time series (1952â€“2009)"

// "A huge biocatalytic filter in the centre of Barents Sea shelf?**The present paper was based on the BANKMOD bilateral Norwegian – Polish projects (NFR 184719) and was completed thanks to additional financial support from the Polish Ministry of Science and Higher Education (384/W-Bankmod/2009/0 and 382/W-Akvaplan-niva/2009/0)"
// Oceanologia (2012-04)
// https://doi.org/10.5697/oc.54-2.325

// {"doi":"10.1080/10454438.2014.940797","title":"Triploid Induction in Atlantic Cod (Gadus morhuaL.) by the Use of Different Pressure Levels"}
// {"doi":"10.1111/anu.12080","title":"Improved performance of Atlantic cod (Gadus morhuaL.) larvae following enhancement of live feed using a fish protein hydrolysate"}
// {"doi":"10.1111/are.12082","title":"Production performance of Atlantic salmon (Salmo salarL.) postsmolts in cyclic hypoxia, and following compensatory growth"}
// {"doi":"10.1111/are.12312","title":"Effects of filleting method, stress, storage and season on the quality of farmed Atlantic cod (Gadus morhuaL.)"}

export const fix = (work) => {
  work = JSON.parse(JSON.stringify(work));
  work.title = work?.title.map((t) => t.replace(/\s{2,}/g, " "));
  if (fixmap.has(work?.DOI)) {
    const fixes = fixmap.get(work.DOI);
    const fixed = { ...work, ...fixes };
    work = fixed;
  }
  return work;
};
