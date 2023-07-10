import { STATUS_TEXT } from "https://deno.land/std@0.117.0/http/http_status.ts";

export const statusText = ({ status }) => STATUS_TEXT.get(status);

export const corsHeaders = ({ contentType }) =>
  new Headers({
    "content-type": `${contentType}; charset=utf-8`,
    "access-control-allow-origin": "*",
  });

export const httpError = ({ request, status }) =>
  new Response(`${status} ${statusText({ status })}\n${request.url}\n`, {
    status,
  });

export const jsonResponse = (o) =>
  new Response(JSON.stringify(o) + "\n", {
    headers: corsHeaders({ contentType: "application/json" }),
  });

export const textResponse = (text) =>
  new Response(text, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
    },
  });

// const ndjsonResponse = (a) => {
//
//   const text = a.map(ndjson).join("");
//   return new Response(text, {
//     headers: {
//       "content-type": "text/plain; charset=utf-8",
//     },
//   });
// };
