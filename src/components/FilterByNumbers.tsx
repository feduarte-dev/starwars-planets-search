import { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import { TagValuesType } from '../types';

function FilterByNumbers() {
  const { handleTagFilter, tagValues,
    selects, handleBtnClick, filters,
    handleDeleteAll, handleDeleteFilter } = useContext(PlanetsContext);

  return (
    <div>
      <select
        data-testid="column-filter"
        name="column"
        onChange={ handleTagFilter }
        value={ tagValues.column }
      >
        {selects.map((select: string, index: number) => (
          <option key={ index } value={ select }>
            {select}
          </option>
        ))}
      </select>
      <select
        data-testid="comparison-filter"
        name="comparison"
        onChange={ handleTagFilter }
        value={ tagValues.comparison }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <label>
        <input
          onChange={ handleTagFilter }
          value={ tagValues.numberValue }
          type="number"
          name="numberValue"
          data-testid="value-filter"
        />
      </label>
      <button data-testid="button-filter" onClick={ handleBtnClick }>
        Filtrar
      </button>
      <button
        data-testid="button-remove-filters"
        onClick={ handleDeleteAll }
      >
        Remover todas filtragens
      </button>
      {filters
        && filters.map((filter: TagValuesType, index: number) => (
          <div key={ index } data-testid="filter">
            <span>{filter.column}</span>
            <span>{filter.comparison}</span>
            <span>{filter.numberValue}</span>
            <button onClick={ () => handleDeleteFilter(filter) }>X</button>
          </div>
        ))}
    </div>
  );
}

export default FilterByNumbers;
