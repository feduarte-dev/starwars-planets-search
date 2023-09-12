import { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function FilterByName() {
  const { searchValue, handleNameChange } = useContext(PlanetsContext);

  return (
    <div>
      <label htmlFor="name-filter">
        <span>Search by planet name: </span>
        <input
          name="name-filter"
          data-testid="name-filter"
          type="text"
          value={ searchValue }
          onChange={ handleNameChange }
        />
      </label>
    </div>
  );
}

export default FilterByName;
