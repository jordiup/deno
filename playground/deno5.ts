// This is a psudo 'ls' command written using Deno's built in functions
// https://doc.deno.land/https/github.com/denoland/deno/releases/latest/download/lib.deno.d.ts#Deno.readDir
// Must be run with --allow-read...
// deno run --allow-read deno5.ts
for await (const dirEntry of Deno.readDir("/")) {
  console.log(dirEntry.name);
}
