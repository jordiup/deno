import { Application, send } from "https://deno.land/x/oak@v6.0.1/mod.ts";
import api from "./api.ts";

const app = new Application();
const PORT = 8000;

app.use(async (ctx, next) => {
  // Tells oak to continue executing middleware, when this resolve you have access to it all
  await next();
  const time = ctx.response.headers.get("X-Reponse-Time");
  console.log(`${ctx.request.method} ${ctx.request.url}: ${time}`);
});

app.use(api.routes());

app.use(async (ctx, next) => {
  const filePath = ctx.request.url?.pathname || "";
  const fileWhiteList = [
    "/index.html",
    "/javascripts/script.js",
    "/stylesheets/style.css",
    "/images/favicon.png",
  ];
  if (fileWhiteList.includes(filePath)) {
    await send(ctx, filePath, {
      root: `${Deno.cwd()}/public`,
    });
  }
});

// app.use(async (ctx, next) => {
//     ctx.response.body =
// })

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const delta = Date.now() - start;
  ctx.response.headers.set("X-Reponse-Time", `${delta}ms`);
});

// app.use(async (ctx) => {
// });

if (import.meta.main) {
  await app.listen({
    port: PORT,
  });
}

app.listen({
  port: PORT,
});
