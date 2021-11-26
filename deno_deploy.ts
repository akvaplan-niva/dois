import { serve } from "https://deno.land/std@0.116.0/http/server.ts";

async function handleRequest(request: Request): Promise<Response> {
  const { pathname } = new URL(request.url);
  if (pathname.startsWith("/slim/")) {
    const file = await Deno.readFile("./slim/2021.ndjson");
    return new Response(file, {
      headers: {
        "content-type": "text/plain; charset=utf-8",
      },
    });
  }

  return new Response(
    `<html>
      <head>
        <link rel="stylesheet" href="style.css" />
      </head>
      <body>
        <h1>DOIS</h1>
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
