import {
  assertEquals,
  assertNotEquals,
} from "https://deno.land/std/testing/asserts.ts";

Deno.test({
  name: "example test",
  ignore: Deno.build.os !== "darwin", // only runs on darwin
  fn() {
    assertEquals("test", "test");
    assertNotEquals({
      runtime: "deno",
    }, {
      runtime: "node",
    });
  },
});

Deno.test({
  name: "ops leak test", // (will fail if sanitizeOps is true)
  sanitizeOps: true, // will check to see if all promises are closed
  fn() {
    setTimeout(console.log, 10000);
  },
});
