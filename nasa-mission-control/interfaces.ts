export interface Planet extends GenericPlanet {
  koi_prad?: string;
  koi_smass?: string;
  koi_srad?: string;
  kepler_name?: string;
  koi_disposition?: string;
  koi_count?: string;
  koi_steff?: string;
}

export interface GenericPlanet {
  [key: string]: string | undefined;
}

export interface Launch {
  flightNumber: Number;
  mission: string;
  rocket: string;
  customers: string[];
  launchDate: number;
  upcoming: boolean;
  success?: boolean;
  target?: string;
}
