export * from "./response.js";

export const fileList = async () => {
  const _f = [];
  for await (const { name, isFile } of Deno.readDir(`./slim`)) {
    if (isFile) {
      _f.push(name);
    }
  }
  return _f.sort((a, b) => a.localeCompare(b)).map((name) => ({ name }));
};
