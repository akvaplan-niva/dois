import { serve } from "https://deno.land/std@0.116.0/http/server.ts";

async function handleRequest(request: Request): Promise<Response> {
  const { pathname } = new URL(request.url);

  if (pathname.startsWith("/slim/") && /[12][0-9]{3}\.ndjson/.test(pathname)) {
    console.warn({ pathname });

    return new Response(pathname, {
      headers: {
        "content-type": "text/plain; charset=utf-8",
      },
    });
  }

  return new Response(
    `<html>
      <head><script type="module"></script></head>
      <body></body>
    </html>`,
    {
      headers: {
        "content-type": "text/html; charset=utf-8",
      },
    }
  );
}
await serve(handleRequest);
