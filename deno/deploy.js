import { serve } from "https://deno.land/std@0.117.0/http/server.ts";
import { init, doimap } from "./doi.js";
import { dir } from "./file.js";
import { routes } from "./routes.js";

console.debug("Listening on http://localhost:8000");
await init({ doimap, dir });
await serve((request) => {
  for (const { pattern, handler } of routes) {
    const m = pattern.exec(new URL(request.url));
    if (m && m.pathname) {
      const { groups, input } = m.pathname;
      return handler({ groups, input, request });
    }
  }
});
