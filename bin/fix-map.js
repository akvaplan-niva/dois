export const fixmap = new Map([
  [
    "10.3389/fmars.2015.00022",
    {
      title: [
        "Environmental factors structuring Arctic megabenthos—a case study from a shelf and two fjords",
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
]);

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
