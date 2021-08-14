# Akvaplan-niva DOIs

This [repository](https://github.com/akvaplan-niva/dois) contains a register of Akvaplan-niva publications with a DOI,
together with slim publication metadata from the Crossref API.

## Pipeline

The following reads in a list DOIs, pipes them to the `crossref-works` command, before creating a slimmed down version of the metadata.

```sh
$ ./bin/doi-pipeline
```

## Output

### Crossref

For each DOI, JSON metadata is retrieved from the [Crossref API](https://api.crossref.org/), and put into: `crossref/akvaplan-works.ndjson` (not in git)

Notice: The `crossref-works` comand will cache all HTTP responses, calling the Crossref HTTP service just once per DOI across all invocations.

### Slim

The pipeline creates simplified metadata in the `slim` folder, partitioned to one newline delimited JSON file per year, with the following JSON structure (prettified):

```json
{
  "published": "2021-07",
  "type": "journal-article",
  "container": "Environmental Pollution",
  "title": "Terrestrial inputs govern spatial distribution of polychlorinated biphenyls (PCBs) and hexachlorobenzene (HCB) in an Arctic fjord system (Isfjorden, Svalbard)",
  "authors": [
    { "family": "Johansen", "given": "Sverre", "first": true },
    { "family": "Poste", "given": "Amanda" },
    { "family": "Allan", "given": "Ian" },
    { "family": "Evenset", "given": "Anita" },
    { "family": "Carlsson", "given": "Pernilla" }
  ],
  "doi": "10.1016/j.envpol.2021.116963",
  "creativecommons": "by",
  "open": true
}
```

## Prerequisites

[Deno](https://deno.land) and [newline](https://deno.land/x/newline@v0.1.0) command line tools.
