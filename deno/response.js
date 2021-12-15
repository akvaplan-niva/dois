import { STATUS_TEXT } from "https://deno.land/std@0.117.0/http/http_status.ts";

export const statusText = ({ status }) => STATUS_TEXT.get(status);

export const httpError = ({ request, status }) =>
  new Response(`${status} ${statusText({ status })}\n${request.url}\n`, {
    status,
  });

export const notFound = ({ request }) => httpError({ request, status: 404 });

export const jsonApiResponse = (o) =>
  new Response(JSON.stringify(o), {
    headers: {
      "content-type": "application/vnd.api+json; charset=utf-8",
    },
  });

export const jsonResponse = (o) =>
  new Response(JSON.stringify(o), {
    headers: {
      "content-type": "application/json; charset=utf-8",
    },
  });

export const textResponse = (text) =>
  new Response(text, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
    },
  });

// const ndjsonResponse = (a) => {
//   const ndjson = (o) => JSON.stringify(o) + "\n";
//   const text = a.map(ndjson).join("");
//   return new Response(text, {
//     headers: {
//       "content-type": "text/plain; charset=utf-8",
//     },
//   });
// };
