const unpaywallUpdates = JSON.parse(
  `[["10.1111/ecog.03020",{"pdf":"https://onlinelibrary.wiley.com/doi/pdfdirect/10.1111/ecog.03020"}],["10.1016/j.envres.2017.06.007",{"pdf":"https://ntnuopen.ntnu.no/ntnu-xmlui/bitstream/11250/2457519/1/Melnes%2bet%2bal%2b2017%2bpostprint%2bENVIRON%2bRES.pdf"}],["10.1016/j.envpol.2017.06.095",{"pdf":"https://ntnuopen.ntnu.no/ntnu-xmlui/bitstream/11250/2460692/2/Ciesielski%2bet%2bal.%2b2017%2bpostprint.pdf"}],["10.1016/j.envres.2018.04.026",{"pdf":"https://ntnuopen.ntnu.no/ntnu-xmlui/bitstream/11250/2590963/2/Ciesielski_et_al_ER-2018.pdf"}],["10.1007/s13280-019-01185-y",{"pdf":"https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6989709/pdf/13280_2019_Article_1185.pdf"}],["10.1016/j.csr.2019.104030",{"pdf":"https://munin.uit.no/bitstream/10037/16975/5/article.pdf"}],["10.1007/s00300-020-02642-1",{"pdf":"https://bora.uib.no/bora-xmlui/bitstream/11250/2758515/1/Andrade%2bet%2bal%2b2020.%2bOntogenetic%2bmovements%2bof%2bcod.pdf"}],["10.3354/meps13854",{"pdf":"https://www.int-res.com/articles/meps_oa/m676p255.pdf"}],["10.3354/meps13872",{"pdf":"https://www.int-res.com/articles/meps_oa/m676p127.pdf"}],["10.1111/gcb.15497",{"pdf":"http://nora.nerc.ac.uk/id/eprint/529305/1/N529305PP.pdf"}],["10.1016/j.scitotenv.2020.144611",{"pdf":"http://manuscript.elsevier.com/S0048969720381420/pdf/S0048969720381420.pdf"}],["10.1016/j.pocean.2021.102616",{"pdf":"https://darchive.mblwhoilibrary.org/bitstream/1912/27648/1/1-s2.0-S0079661121001038-main.pdf"}],["10.1007/978-3-030-10618-8_12-1",{"pdf":"https://link.springer.com/content/pdf/10.1007%2F978-3-030-10618-8_12-1.pdf"}],["10.3389/fmars.2021.767191",{"pdf":"https://www.frontiersin.org/articles/10.3389/fmars.2021.767191/pdf"}]]`,
);

const unicode = JSON.parse(`[
["10.3402/polar.v13i1.6684", {"authors":[{"family":"Haakstad","given":"M.","first":true},{"family":"Kögeler","given":"J. W."},{"family":"Dahle","given":"S."}]}],
["10.1007/bf00287419",{"authors":[{"family":"Kögeler","given":"Johannes W.","first":true},{"family":"Falk-Petersen","given":"Stig"},{"family":"Kristensen","given":"Åge"},{"family":"Pettersen","given":"Fritz"},{"family":"Dalen","given":"John"}]}],
["10.1007/bf00396290", {"authors": [{"family":"Blaxter","given":"J. H. S.","first":true},{"family":"Danielssen","given":"D."},{"family":"Moksness","given":"E."},{"family":"Øiestad","given":"V."}]}],
["10.1007/bf00541658",{"authors":[{"family":"Falk-Petersen","given":"S.","first":true},{"family":"Sargent","given":"J. R."},{"family":"Fox","given":"C."},{"family":"Falk-Petersen","given":"I. -B."},{"family":"Haug","given":"T."},{"family":"Kjørsvik","given":"E."}]}],
["10.1007/bf00428278",{"authors":[{"family":"Klungsøyr","given":"J.","first":true},{"family":"Tilseth","given":"S."},{"family":"Wilhelmsen","given":"S."},{"family":"Falk-Petersen","given":"S."},{"family":"Sargent","given":"J. R."}]}],["10.1007/bf00240916",{"authors":[{"family":"Strand","given":"Hans K.","first":true},{"family":"Hansen","given":"ToveK."},{"family":"Pedersen","given":"Arvid"},{"family":"Falk-Petersen","given":"IngerBritt"},{"family":"Øiestad","given":"Victor"}]}],["10.1007/s11160-004-1632-6",{"authors":[{"family":"Imsland","given":"A. K.","first":true},{"family":"Foss","given":"A."},{"family":"Conceição","given":"L. E. C."},{"family":"Dinis","given":"M. T."},{"family":"Delbare","given":"D."},{"family":"Schram","given":"E."},{"family":"Kamstra","given":"A."},{"family":"Rema","given":"P."},{"family":"White","given":"P."}]}]
]`);

const wrong = JSON.parse(
  `[
["10.7717/peerj.3123", { "authors": [{"family":"Häussermann","given":"Verena","first":true},{"family":"Gutstein","given":"Carolina S."},{"family":"Bedington","given":"Michael"},{"family":"Cassis","given":"David"},{"family":"Olavarria","given":"Carlos"},{"family":"Dale","given":"Andrew C."},{"family":"Valenzuela-Toro","given":"Ana M."},{"family":"Perez-Alvarez","given":"Maria Jose"},{"family":"Sepúlveda","given":"Hector H."},{"family":"McConnell","given":"Kaitlin M."},{"family":"Horwitz","given":"Fanny E."},{"family":"Försterra","given":"Günter"}]}],
["10.1117/12.165505",{"authors":[{"family":"Kögeler","given":"Jos","first":true},{"family":"Sorensen","given":"Kai"}]}],
["10.1111/j.1751-8369.1994.tb00440.x",{"authors":[{"family":"Haakstad","given":"M.","first":true},{"family":"Kögeler","given":"J. W."},{"family":"Dahle","given":"S."}]}]]`,
);

const notitle = [
  ["10.1023/a:1003013725472", { "title": "Soft-bottom macro invertebrate fauna of North Norwegian coastal waters with particular reference to sill-basins. Part one: Bottom topography and species diversity" }],
  ["10.1023/a:1018328626979", { "title": "Growth and the effect of grading, of turbot in a shallow raceway system"}],
  ["10.1023/a:1009265602388", { "title": "Effects of size grading on growth and survival of juvenile turbot at two temperatures"}],
  // ["10.1023/a:1008033201227"],
  //["10.1023/a:1008962601914"],
  ["10.1023/a:1007815402911", { "title": "Hemoglobin genotypes of turbot (Scophthalmus maximus): consequences for growth and variations in optimal temperature for growth"}],
  // ["10.1023/a:1014240430779"]
  ["10.1023/a:1014473012572", { "title": "Intraspecific Variation in Trophic Feeding Levels and Organochlorine Concentrations in Glaucous Gulls (Larus hyperboreus) from Bjørnøya, the Barents Sea"}],
  // ["10.1023/a:1020167027942"],
  // ["10.1023/a:1020315817235"],
  // ["10.1023/a:1025465705717"],
  // ["10.1023/a:1026373509576"]
]

const misc = [
  ["10.1017/cbo9781316164624.008", { published: "2015" }], //Ocean Sustainability in the 21st Century
  [
    "10.1175/jpo-d-13-0231.1",
    {
      pdf:
        "https://journals.ametsoc.org/downloadpdf/journals/phoc/44/8/jpo-d-13-0231.1.xml",
    },
  ],
  [
    "10.1093/plankt/25.1.1",
    {
      authors: [
        { given: "Slawek", family: "Kwasniewski", sequence: "first" },
        { given: "Haakon", family: "Hop" },
        { given: "Stig", family: "Falk-Petersen" },
        { given: "Gunnar", family: "Pedersen" },
      ],
    },
  ],
  [
    "10.1002/9781118846582.ch11",
    {
      title: "Ecology of Arctic Shallow Subtidal and Intertidal Benthos",
      type: "book-chapter",
    },
  ],
  ["10.1002/9781118846582.ch9", { type: "book-chapter" }],
  ["10.3354/meps128001", {
    title:
      "Sources of primary production, benthic-pelagic coupling, and trophic relationships within the Northeast Water Polynya: insights from δ13C and δ15N analysis",
  }]
];

const errata = [["10.1007/s10695-011-9545-5",{"type":"erratum"}], 
  ["10.1016/j.aquatox.2009.10.013",{"type":"erratum"}], 
  ["10.1016/j.ecss.2013.06.010",{"type":"erratum"}], 
  ["10.1016/j.envpol.2016.12.062",{"type":"erratum"}], 
  ["10.1016/j.seares.2023.102379",{"type":"erratum"}], 
  ["10.1038/ncomms16126",{"type":"erratum"}], 
  ["10.1016/j.pocean.2007.01.014",{"type":"erratum"}]
]; 

export const patches = new Map([
  ...unpaywallUpdates,
  ...unicode,
  ...wrong,
  ...notitle,
  ...misc,
  ...errata
  //LÃ¸kken => ø
  //JÃ¸rgensen
  //â€“ => –
  //["10.1577/1548-8659(1985)114%3C590:mpoacj%3E2.0.co;2", { published: "1985" }],

]);

// Books/chapters missing printed
// ["10.1007/0-306-48002-6_12",{"printed":"2003"}] // ok
// ["10.1007/978-3-540-48514-8_1",{"printed":"2007"}]
// ["10.1007/978-3-540-48514-8_9",{"printed":"2007"}]
// ["10.1017/cbo9781316164624.008",{"printed":"2015"}] ok
// ["10.4337/9780857934741.00012",{"printed":"2015-09-25"}]
// ["10.1201/9780367812423",{"printed":"2020-02-03"}]
// ["10.1201/9781003053071",{"printed":"2020-07-30"}]
