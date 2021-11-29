import { serve } from "https://deno.land/std@0.116.0/http/server.ts";
import { fileList, jsonResponse, textResponse } from "./mod.js";

const json = async () => {
  const files = await fileList();
  return jsonResponse(files);
};

console.log("Listening on http://localhost:8000");
await serve(async (request) => {
  const pattern = new URLPattern({ pathname: "/slim/:id.ndjson" });
  const match = pattern.exec(new URL(request.url));

  if (match) {
    const {
      input,
      groups: { id },
    } = match.pathname;

    // @todo try catch if !id exists => return new Response("Not Found\n", { status: 404 });
    const text = await Deno.readTextFile(`.${input}`);
    return textResponse(text);

    return jsonResponse({ true: false });
  } else {
    return json();
  }
});
