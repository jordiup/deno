import { Router } from "https://deno.land/x/oak@v6.0.1/mod.ts";

import * as planets from "./models/planets.ts";

const router = new Router();

router.get("/", (ctx) => {
  ctx.response.body = `

    ███    ██   █████   ███████   █████  
    ████   ██  ██   ██  ██       ██   ██ 
    ██ ██  ██  ███████  ███████  ███████ 
    ██  ██ ██  ██   ██       ██  ██   ██ 
    ██   ████  ██   ██  ███████  ██   ██ 
                                             
    █████  Mission Control API 🚀  █████

    `;
});

router.get(
  "/planets",
  ((ctx) => {
    // two different error examples
    // throw new Error("sample error");
    // ctx.throw(400, "Sorry planets aren't available");
    ctx.response.body = planets.habitableEarths;
  }),
);

export default router;
