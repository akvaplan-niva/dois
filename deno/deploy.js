import { serve } from "https://deno.land/std@0.117.0/http/server.ts";
import { doimap, init } from "./doi-map.js";
import { dir } from "./file.js";
import { routes } from "./routes.js";
import { corsHeaders, httpError } from "./response.js";

const validateRequest = ({ request }) => {
  if (!/(get|head|options)/i.test(request.method)) {
    return { status: 405 };
  }
  return { status: 200 };
};

await init({ doimap, dir });

await serve((request) => {
  const { status } = validateRequest({ request });
  if (status >= 300) {
    return httpError({ request, status });
  }
  // if (/options/i.test(request.method) {
  //   return new Response(null, { headers: corsHeaders });
  // }
  const url = new URL(request.url);
  for (const { pattern, handler } of routes) {
    const m = pattern.exec(url);
    if (m && m.pathname) {
      const { groups, input } = m.pathname;
      const response = handler({ groups, input, url, request });
      return response;
    }
  }
});
