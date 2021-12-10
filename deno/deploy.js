import { serve } from "https://deno.land/std@0.117.0/http/server.ts";
import { jsonApiFileLinks, textResponse } from "./mod.js";

console.debug("Listening on http://localhost:8000");
await serve(async (request) => {
  const slimpattern = new URLPattern({ pathname: "/slim/:id.ndjson" });
  const match = slimpattern.exec(new URL(request.url));

  if (match) {
    const {
      input,
      groups: { id },
    } = match.pathname;

    // @todo try catch if !id exists => return new Response("Not Found\n", { status: 404 });
    const text = await Deno.readTextFile(`.${input}`);
    return textResponse(text);
  } else {
    return jsonApiFileLinks({ dir: `./slim`, base: "/slim/" });
  }
});
