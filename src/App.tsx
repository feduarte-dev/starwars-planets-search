import { useState, useEffect } from 'react';
import Table from './components/Table';
import './App.css';
import PlanetsContext from './context/PlanetsContext';
import { PlanetType, TagValuesType } from './types';
import { fetchAPI } from './services/fetchAPI';
import FilterByName from './components/FilterByName';

const INITIAL_STATE = {
  column: 'population',
  comparison: 'maior que',
  numberValue: '0',
};

function App() {
  const [planets, setPlanets] = useState<PlanetType[]>();
  const [planetTags, setPlanetTags] = useState<string[]>();
  const [searchValue, setSearchValue] = useState('');
  const [filteredPlanets, setFilteredPlanets] = useState(planets);
  const [tagValues, setTagValues] = useState<TagValuesType>(INITIAL_STATE);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAPI();
      setFilteredPlanets(data);
      setPlanets(data);
      setPlanetTags(Object.keys(data[0]));
    };

    fetchData();
  }, []);

  const handleNameChange = (event: { target: { value: string; }; }) => {
    const inputValue = event.target.value.toLowerCase();
    setSearchValue(inputValue);

    const filtered = planets?.filter((planet) => planet
      .name.toLowerCase().includes(inputValue));
    setFilteredPlanets(filtered);
  };

  const handleTagFilter = ({ target: { name, value } }
  :React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const tagOptions = {
      ...tagValues,
      [name]: value,
    };
    setTagValues(tagOptions);
  };

  const handleBtnClick = () => {
    const filtered = filteredPlanets?.filter((planet: any) => {
      if (tagValues.comparison === 'maior que') {
        return planet[tagValues.column] > parseInt(tagValues.numberValue, 10);
      } if (tagValues.comparison === 'menor que') {
        return planet[tagValues.column] < parseInt(tagValues.numberValue, 10);
      }
      return planet[tagValues.column] === tagValues.numberValue;
    });
    setFilteredPlanets(filtered);
  };

  return (
    <PlanetsContext.Provider
      value={ {
        planetTags,
        filteredPlanets,
        handleNameChange,
        searchValue,
      } }
    >
      <FilterByName />
      <select
        data-testid="column-filter"
        name="column"
        onChange={ handleTagFilter }
        value={ tagValues.column }
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
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
      <label htmlFor="">
        <input
          onChange={ handleTagFilter }
          value={ tagValues.numberValue }
          type="number"
          name="numberValue"
          data-testid="value-filter"
        />
      </label>
      <button data-testid="button-filter" onClick={ handleBtnClick }>Filtrar</button>
      <Table />
    </PlanetsContext.Provider>
  );
}

export default App;
