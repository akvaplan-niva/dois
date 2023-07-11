import { routes } from "./routes.js";
import { httpError } from "./response.js";

import { serve } from "https://deno.land/std@0.193.0/http/server.ts";
import {
  acceptSafe,
  scryptBasicAuth,
} from "https://deno.land/x/scrypt_basic_auth@1.0.2/mod.ts";

const kv = await Deno.openKv();

Deno.serve(async (request) => {
  const basicAuth = await scryptBasicAuth(request, { accept: acceptSafe });
  if (!basicAuth.ok) {
    return basicAuth;
  }
  const url = new URL(request.url);
  const found = { route: false };

  for (const { pattern, handler } of routes) {
    const m = pattern.exec(url);
    if (m && m.pathname) {
      found.route = true;
      const { groups, input } = m.pathname;
      return handler({ groups, input, url, request, kv });
    }
  }
  if (!found.route) {
    return httpError({ status: 404, request });
  }
});
