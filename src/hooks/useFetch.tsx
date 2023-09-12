// import { useState, useEffect } from 'react';
// import { fetchAPI } from '../services/fetchAPI';
// import { PlanetType } from '../types';

// const useFetch = () => {
//   const [planets, setPlanets] = useState<PlanetType[]>();

//   const fetchData = async () => {
//     const data = await fetchAPI();
//     const { results } = data;
//     const noResidents = results.map((result: PlanetType) => {
//       const { residents, ...filteredData } = result;
//       return filteredData;
//     });
//     setPlanets(noResidents);
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return {
//     planets,
//   };
// };

// export default useFetch;
