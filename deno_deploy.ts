import { serve } from "https://deno.land/std@0.116.0/http/server.ts";

async function handleRequest(request: Request): Promise<Response> {
  const { pathname } = new URL(request.url);
  console.warn(pathname);
  if (pathname.startsWith("/slim/") && /\.ndjson$/.test(pathname)) {
    const r = await fetch(pathname);
    console.warn(r);
    return new Response(r.body, {
      headers: {
        "content-type": "text/plain; charset=utf-8",
      },
    });
  }

  return new Response(
    `<html>
      <head><script type="module" src="https://cc-icons.vercel.app/define.js"></script></head>
      <body>
        <h1></h1>
      </body>
    </html>`,
    {
      headers: {
        "content-type": "text/html; charset=utf-8",
      },
    }
  );
}
await serve(handleRequest);
