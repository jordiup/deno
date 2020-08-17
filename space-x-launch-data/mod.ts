import * as log from "https://deno.land/std/log/mod.ts";
import * as _ from "https://raw.githubusercontent.com/lodash/lodash/4.17.15-es/lodash.js";

interface Launch {
  flightNumber: Number;
  mission: string;
  rocket: string;
  customers: string[];
}

const launches = new Map<Number, Launch>();

export async function downloadLaunchData() {
  // Pre download log
  log.info("Downloading launch data...");

  const response = await fetch(
    "https://api.spacexdata.com/v3/launches",
    { method: "GET" },
  );

  if (!response.ok) {
    log.warning("Problem downloading launch data");
    throw new Error("Launch data download failed");
  }

  const launchData = await response.json();
  for (const launch of launchData) {
    const payloads = launch["rocket"]["second_stage"]["payloads"];
    const customers = _.flatMap(payloads, (payload: any) => {
      return payload["customers"];
    });
    const flightData = {
      flightNumber: launch["flight_number"],
      mission: launch["mission_name"],
      rocket: launch["rocket"]["rocket_name"],
      customers,
    };

    launches.set(flightData.flightNumber, flightData);

    log.info(JSON.stringify(flightData));
  }

  //   console.log(launchData);
}
async function testPostRequest() {
  const response = await fetch(
    "https://reqres.in/api/users",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        name: "Elon Musk",
        job: "billionaire",
      }),
    },
  );

  console.log(response);
}
// testPostRequest();

// Default run if not called externally
if (import.meta.main) {
  await downloadLaunchData();
  log.info(JSON.stringify(import.meta));
  log.info(`Downloaded data for ${launches.size} SpaceX launches.`);
}
