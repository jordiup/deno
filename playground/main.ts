// To run this comand with least priveliges is best to use:
// deno run --allow-env main.ts

console.log("hello", Deno.env.get("USER"));
