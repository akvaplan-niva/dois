# Akvaplan-niva DOIs

The git repository [akvaplan-niva/dois](https://github.com/akvaplan-niva/dois) contains Akvaplan-niva related publications with a DOI.

### Slim metadata

The [DOI pipeline](bin/doi-pipeline) yields one newline delimited JSON file per year, containing _slim_ metadata like:

```json
{
  "published": "2021-06-07",
  "type": "journal-article",
  "container": "Frontiers in Environmental Science",
  "title": "Microplastic Fiber Emissions From Wastewater Effluents: Abundance, Transport Behavior and Exposure Risk for Biota in an Arctic Fjord",
  "authors": [
    { "family": "Herzke", "given": "Dorte", "first": true },
    { "family": "Ghaffari", "given": "Peygham" },
    { "family": "Sundet", "given": "Jan Henry" },
    { "family": "Tranang", "given": "Caroline Aas" },
    { "family": "Halsband", "given": "Claudia" }
  ],
  "doi": "10.3389/fenvs.2021.662168",
  "open": true,
  "pdf": "https://www.frontiersin.org/articles/10.3389/fenvs.2021.662168/pdf"
}
```

## Use

### Add DOI

Add/edit NDJSON file in the [`doi/year`] folder and run pipeline:

```bash
./bin/doi-pipeline
```

## Pipeline details

The DOI pipeline consists of the following steps:

### 1. Create DOI list

First, create list of unique DOIs

- Extract DOIs from [`raw`] text references
- Add these into the NDJSON-formatted DOIs in [`doi`]
- De-deplicate the DOIs

### 2. Fetch metadata

For each DOI

- Fetch "works" metadata from [Crossref API](https://api.crossref.org/)
- Create slim metadata from Crossref works
- Fetch PDF location from [Unpaywall API](https://unpaywall.org/products/api)

> Notice: The pipeline aggressively caches all HTTP responses, calling the APIs just once per DOI across all invocations. On linux, the cache is located in `$HOME/.cache/deno/https/api.*.org`.

JSON metadata from Crossref is stored in: `crossref/akvaplan-works.ndjson` (not in git)
Unpaywall PDF links are unpaywall/akvaplan-pdfs.js

### Create slim metadata product

Finally

- Add PDF URL to slim metadata
- Partition slim metadata, creating one file per year in `slim`
- Show summary counts
- Verify SHA checksums

## Prerequisites

[Deno](https://deno.land) and [newline](https://deno.land/x/newline@v0.1.0) command line tools.
