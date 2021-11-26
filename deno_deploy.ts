import { serve } from "https://deno.land/std@0.116.0/http/server.ts";

async function list(_req) {
  const posts = [];
  for await (const post of Deno.readDir(`${Deno.cwd()}/slim`)) {
    posts.push(post);
  }

  // Return JSON.
  return new Response(JSON.stringify(posts, null, 2), {
    headers: {
      "content-type": "application/json",
    },
  });
}

async function handleRequest(request: Request): Promise<Response> {
  const { pathname } = new URL(request.url);

  if (pathname.startsWith("/slim/") && /[12][0-9]{3}\.ndjson/.test(pathname)) {
    console.warn({ pathname });

    const file = await Deno.readFile("./style.css");
    return new Response(pathname, {
      headers: {
        "content-type": "text/plain; charset=utf-8",
      },
    });
  }
  return list(request);
}
console.warn("Deno.version", Deno.version);
await serve(handleRequest);
// return new Response(
//   `<html>
//     <head><script type="module"></script></head>
//     <body></body>
//   </html>`,
//   {
//     headers: {
//       "content-type": "text/html; charset=utf-8",
//     },
//   }
// );
