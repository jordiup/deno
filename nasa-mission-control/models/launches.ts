import { log, _ } from "../deps.ts";
import { Launch } from "../interfaces.ts";

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
      launchDate: launch["launch_date_unix"],
      upcoming: launch["upcoming"],
      success: launch["launch_success"],
      customers: customers,
    };

    launches.set(flightData.flightNumber, flightData);

    log.info(JSON.stringify(flightData));
  }

  //   console.log(launchData);
}

// Default run if not called externally
await downloadLaunchData();
// log.info(JSON.stringify(import.meta));
log.info(`Downloaded data for ${launches.size} SpaceX launches.`);

export function getAll() {
  return Array.from(launches.values());
}

export function getOne(id: number) {
  if (launches.has(id)) {
    return launches.get(id);
  } else return null;
}

export function addOne(data: Launch) {
  // data &&
  launches.set(
    data.flightNumber,
    Object.assign(data, {
      upcoming: true,
      customers: ["RocketMan Inc.", "NASA"],
    }),
  );
}
export function removeOne(id: Number) {
  const aborted = launches.get(id);
  if (aborted) {
    aborted.upcoming = false;
    aborted.success = false;
  }
  return aborted;
}
