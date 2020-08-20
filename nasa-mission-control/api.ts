import { Router } from "https://deno.land/x/oak@v6.0.1/mod.ts";

import * as planets from "./models/planets.ts";
import * as launches from "./models/launches.ts";
import { Launch } from "./interfaces.ts";

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

router.get(
  "/launches",
  ((ctx) => {
    ctx.response.body = launches.getAll();
  }),
);

router.get(
  "/launches/:id",
  ((ctx) => {
    if (ctx.params?.id) {
      const launchesList = launches.getOne(Number(ctx.params.id));
      if (launchesList) {
        ctx.response.body = launchesList;
      } else {
        ctx.throw(400, "Launch with that ID doesn't exist");
      }
    }
  }),
);

router.post("/launches", async (ctx) => {
  const body = ctx.request.body();
  const data: Launch = await body.value;

  launches.addOne(data);

  ctx.response.body = { success: true };
  ctx.response.status = 201;
});

router.delete("/launches/:id", (ctx) => {
  if (ctx.params?.id) {
    const result = launches.removeOne(Number(ctx.params.id));
    ctx.response.body = { success: result };
  }
  //   ctx.response.status = 201;
});

export default router;
