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
