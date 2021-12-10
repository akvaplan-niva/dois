import { textResponse, notFound } from "./response.js";

export const getslim = async ({ input, groups, request }) => {
  try {
    const text = await Deno.readTextFile(`.${input}`);
    return textResponse(text);
  } catch (e) {
    if (e.name && /NotFound/.test(e.name)) {
      return notFound({ request });
    }
  }
};
