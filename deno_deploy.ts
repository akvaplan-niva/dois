import { serve } from "https://deno.land/std@0.116.0/http/server.ts";

async function handleRequest(request: Request): Promise<Response> {
  const { pathname } = new URL(request.url);
  if (pathname.startsWith("/slim/") && /\.ndjson$/.test(pathname)) {
    const r = await fetch(pathname);
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
        <cc-icons
      license="cc-by"
      class="slotted"
      xmlns:cc="http://creativecommons.org/ns#"
      xmlns:dct="http://purl.org/dc/terms/"
    >
      <h2 slot="before">
        <a
          rel="cc:attributionURL dct:creator"
          property="cc:attributionName"
          href="#https://example.com/someone"
          >Someone</a
        >.

        <a
          property="dct:title"
          rel="cc:attributionURL"
          href="#https://example.com/work"
          >Work</a
        >
        (year) is licensed under
        <a
          rel="license noopener noreferrer"
          href="https://creativecommons.org/licenses/by/4.0/"
          target="_blank"
          >Creative Commons attribution</a
        >
      </h2>
      <h2 slot="after">
        <a href="#https://example.com/rights">Rights statement</a>
      </h2>
    </cc-icons>
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
