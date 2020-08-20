import {
  assertEquals,
  assertNotEquals,
} from "../deps_testing.ts";
import { Planet, GenericPlanet } from "../interfaces.ts";
import { filterHabitablePlanets } from "./planets.ts";

const HABITABLE_PLANET: GenericPlanet = {
  koi_disposition: "CONFIRMED",
  koi_prad: "1",
  koi_srad: "1",
  koi_smass: "1",
};

const NOT_CONFIRMED: GenericPlanet = {
  koi_disposition: "FALSE POSITIVE",
};

const PRAD_TOO_LARGE: GenericPlanet = {
  koi_disposition: "CONFIRMED",
  koi_prad: "1.5",
  koi_srad: "1",
  koi_smass: "1",
};

const SRAD_TOO_LARGE: GenericPlanet = {
  koi_disposition: "CONFIRMED",
  koi_prad: "1",
  koi_srad: "1.01",
  koi_smass: "1",
};

const SMASS_TOO_LARGE: GenericPlanet = {
  koi_disposition: "CONFIRMED",
  koi_prad: "1",
  koi_srad: "1",
  koi_smass: "1.04",
};

Deno.test("filter only habitable planets", () => {
  const filtered = filterHabitablePlanets(
    [
      HABITABLE_PLANET,
      NOT_CONFIRMED,
      PRAD_TOO_LARGE,
      SRAD_TOO_LARGE,
      SMASS_TOO_LARGE,
    ],
  );
  assertEquals(filtered, [
    HABITABLE_PLANET,
  ]);
});

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
  sanitizeOps: false, // will check to see if all promises are closed
  fn() {
    setTimeout(console.log, 10000);
  },
});
