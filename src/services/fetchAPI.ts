import { PlanetType } from '../types';

const URL = 'https://swapi.dev/api/planets';

export const fetchAPI = async () => {
  const response = await fetch(URL);
  const data = await response.json();
  const { results } = data;
  return results.map((result: PlanetType) => {
    const { residents, ...filteredData } = result;
    return filteredData;
  });
};
