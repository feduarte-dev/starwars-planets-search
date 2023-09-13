export type PlanetType = {
  name: string,
  rotation_period: string,
  orbital_period: string,
  diameter: string,
  climate: string,
  gravity: string,
  terrain: string,
  surface_water: string,
  population: string,
  residents: string[],
  films: string[],
  created: string,
  edited: string,
  url: string
};

export type TagValuesType = {
  column: string;
  comparison: string;
  numberValue: string;
};

export type OrderType = {
  column: string;
  sort: string | undefined
};
