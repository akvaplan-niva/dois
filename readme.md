# Akvaplan-niva DOIs

This [git repository](https://github.com/akvaplan-niva/dois) contains metadata for Akvaplan-niva publications with a DOI.

The metadata is collected by an automated pipeline and stored as NDJSON in the `slim` directory.

The [Deno Deploy](https://deno.com/deploy) service https://dois.deno.dev/ is connected to `main` on this repository and is the data source of https://akvaplan.no/en/publications

## Output format

The [DOI pipeline](bin/doi-pipeline) yields one newline delimited JSON file per year, containing _slim_ metadata ([example](https://dois.deno.dev/doi/10.3389/fenvs.2021.662168).

## Use

### Add DOIs (to local disk)

Add/edit a NDJSON file in `doi/*/*.ndjson` and run pipeline:

```sh
./bin/doi-pipeline
```


### Update service
Inspect and push approved changes in `slim/*.ndjson`.

To update the data service, run 
```sh
$ curl --netrc -XPOST https://dois.deno.dev/ingest
```

```json
{"ingested":1669,"total":1669,"elapsed":198.636,"start":"2023-07-11T13:16:13.589Z","end":"2023-07-11T13:19:32.225Z","ok":true}
```



## Pipeline details

The DOI pipeline consists of the following steps:

### 1. Create DOI list

First, create list of unique DOIs

- Extract DOIs from [`raw`](raw) text references
- Add these into the NDJSON-formatted DOIs in [`doi`](doi)
- De-deplicate the DOIs

(The raw text references were augmented with DOIs from Crossref's [SimpleTextQuery](https://apps.crossref.org/SimpleTextQuery), when missing in in the original source.)

### 2. Fetch metadata

For each DOI

- Fetch "works" metadata from [Crossref API](https://api.crossref.org/)
- Create slim metadata from Crossref works
- Fetch PDF location from [Unpaywall API](https://unpaywall.org/products/api)

> Notice: The pipeline aggressively caches all HTTP responses, calling the APIs just once per DOI across all invocations. On linux, the cache is located in `$HOME/.cache/deno/https/api.*.org`.

### 3. Create slim metadata product

Finally

- Add PDF URL to slim metadata
- Partition slim metadata, creating one file per year in `slim`
- Show summary counts
- Verify SHA checksums

## Prerequisites

[Deno](https://deno.land) and [newline](https://deno.land/x/newline@v0.1.0) command line tools.
