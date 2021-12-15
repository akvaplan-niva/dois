import { notFound, textResponse, jsonResponse } from "./response.js";

export const getslim = async ({ input, groups: { format }, request }) => {
  try {
    const path =
      format === "ndjson"
        ? `.${input}`
        : "." + input.replace(/\.json$/i, ".ndjson");
    const text = await Deno.readTextFile(path);
    if ("json" === format) {
      const arr = text.trim().split("\n").map(JSON.parse);
      return jsonResponse(arr);
    }
    return textResponse(text);
  } catch (e) {
    if (e.name && /NotFound/.test(e.name)) {
      return notFound({ request });
    }
  }
};
