import { join } from "https://deno.land/std/path/mod.ts";
import { BufReader } from "https://deno.land/std/io/bufio.ts";
import { parse } from "https://deno.land/std/encoding/csv.ts";

import * as _ from "https://raw.githubusercontent.com/lodash/lodash/4.17.15-es/lodash.js";
import { Planet } from "../interfaces.ts";

// Could also be written as
// type Planet = Record<string, string>;

export function filterHabitablePlanets(planets: Planet[]) {
  return planets.filter((planet) => {
    const planetaryRadius = Number(planet["koi_prad"]); // used to
    const starsMass = Number(planet["koi_smass"]); // used to predict chance of intelligent life
    const starsRadius = Number(planet["koi_srad"]);

    return planet["koi_disposition"] === "CONFIRMED" &&
      planetaryRadius > .5 && planetaryRadius < 1.5 &&
      starsMass > .78 && starsMass < 1.04 &&
      starsRadius > .99 && starsRadius < 1.01;
  });
}

async function loadPlanetsData() {
  const path = join("data", "kepler_exoplanets_nasa.csv"); // join allows you to join directories

  const file = await Deno.open(path);
  const bufReader = new BufReader(file);

  const rawResult = await parse(bufReader, {
    header: true,
    comment: "#",
  });
  Deno.close(file.rid); // close the file (using its resource id)

  const result: Planet[] = rawResult.map((planet) => {
    return _.pick(planet, [
      "koi_prad",
      "koi_smass",
      "koi_srad",
      "kepler_name",
      "koi_disposition",
      "koi_count",
      "koi_steff",
    ]);
  });

  return {
    allPlanets: result,
    habitableEarths: filterHabitablePlanets(result),
  };
}

export const { allPlanets, habitableEarths } = await loadPlanetsData();
console.log(`
  ${allPlanets.length}  planets found
  ${habitableEarths.length} habitable planets found
`);

// for (const planet of habitableEarths) {
//   console.log(planet);
// }
