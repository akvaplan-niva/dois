# Akvaplan-niva DOIs

This [repository](https://github.com/akvaplan-niva/dois) contains a register of Akvaplan-niva publications with a DOI.

# Pipeline

The following reads in a list DOIs, pipes them to the `crossref-works` command, before creating a slimmed down version of the metadata.

```sh
$ ./bin/doi-pipeline
```

## Crossref metadata

For each DOI, the complete JSON metadata is retrieved from the Crossref REST API, and put into: `crossref/akvaplan-works.ndjson`.

Notice: The `crossref-works` comand will cache all HTTP responses, calling the Crossref HTTP service just once per DOI.

## Simple metadata

The pipeline creates slimmer metadata in the `simple` folder, partitioned to one newline delimited JSON file per year.

## Prerequisites

[Deno](https://deno.land) and [newline](https://deno.land/x/newline@v0.1.0) command line tool.
