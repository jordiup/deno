import * as log from "https://deno.land/std/log/mod.ts";
import { Application, send } from "https://deno.land/x/oak@v6.0.1/mod.ts";
import api from "./api.ts";

const app = new Application();
const PORT = 8000;

await log.setup({
  handlers: {
    console: new log.handlers.ConsoleHandler("INFO"),
  },
  loggers: {
    default: {
      level: "INFO",
      handlers: ["console"],
    },
  },
});

app.addEventListener("error", (event) => {
  log.error(event.error);
});

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    log.error(err);
    ctx.response.body = "Internal server error";
    throw err;
  }
});

app.use(async (ctx, next) => {
  // Tells oak to continue executing middleware, when this resolve you have access to it all
  await next();
  const time = ctx.response.headers.get("X-Reponse-Time");
  log.info(`${ctx.request.method} ${ctx.request.url}: ${time}`);
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
  log.info(`Starting server on port ${PORT}...`);
  await app.listen({
    port: PORT,
  });
}

app.listen({
  port: PORT,
});
