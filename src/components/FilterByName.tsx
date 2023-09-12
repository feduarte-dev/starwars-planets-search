// import { useContext } from 'react';
// import PlanetsContext from '../context/PlanetsContext';

// function FilterByName() {
//   const { planets, searchValue,
//     setSearchValue, setFilteredPlanets } = useContext(PlanetsContext);

//   const handleNameChange = (event: { target: { value: string; }; }) => {
//     const inputValue = event.target.value.toLowerCase();
//     setSearchValue(inputValue);

//     const filtered = planets?.filter((planet: any) => planet
//       .name.toLowerCase().includes(inputValue));
//     setFilteredPlanets(filtered);
//   };
//   return (
//     <div>
//       <label htmlFor="name-filter">
//         <span>Search by planet name: </span>
//         <input
//           name="name-filter"
//           data-testid="name-filter"
//           type="text"
//           value={ searchValue }
//           onChange={ handleNameChange }
//         />
//       </label>
//     </div>
//   );
// }

// export default FilterByName;
