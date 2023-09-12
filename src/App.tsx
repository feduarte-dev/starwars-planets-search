import { useState, useEffect } from 'react';
import Table from './components/Table';
import './App.css';
import PlanetsContext from './context/PlanetsContext';
import { PlanetType } from './types';
import { fetchAPI } from './services/fetchAPI';

function App() {
  const [planets, setPlanets] = useState<PlanetType[]>();
  const [planetTags, setPlanetTags] = useState<string[]>();
  const [searchValue, setSearchValue] = useState('');
  const [filteredPlanets, setFilteredPlanets] = useState(planets);

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

  return (
    <PlanetsContext.Provider value={ { planetTags, filteredPlanets } }>
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
      <Table />
    </PlanetsContext.Provider>
  );
}

export default App;
