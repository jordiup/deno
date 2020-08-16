import { join } from "https://deno.land/std/path/mod.ts";
import { BufReader } from "https://deno.land/std/io/bufio.ts";
import { parse } from "https://deno.land/std/encoding/csv.ts";

async function loadPlanetsData() {
  const path = join(".", "kepler_exoplanets_nasa.csv"); // join allows you to join directories

  const file = await Deno.open(path);
  const bufReader = new BufReader(file);

  const result = await parse(bufReader, {
    header: true,
    comment: "#",
  });
  Deno.close(file.rid); // close the file (using its resource id)

  console.log(result);
}

await loadPlanetsData();
