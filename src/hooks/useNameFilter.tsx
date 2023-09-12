// import { useState } from 'react';
// import { PlanetType } from '../types';

// export function useNameFilter(initialData: PlanetType[]) {
//   const [planets, setPlanets] = useState<PlanetType[]>(initialData);
//   const [filteredPlanets2, setFilteredPlanets] = useState<PlanetType[]>(initialData);

//   const filterPlanetsByName = (searchValue: string) => {
//     const inputValue = searchValue.toLowerCase();
//     const filtered = planets
//       .filter((planet) => planet.name.toLowerCase().includes(inputValue));
//     setFilteredPlanets(filtered);
//   };

//   return { filteredPlanets2, filterPlanetsByName };
// }
