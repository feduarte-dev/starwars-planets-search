import React, { useState, useEffect } from 'react';
import Table from './components/Table';
import './App.css';
import PlanetsContext from './context/PlanetsContext';
import { PlanetType, TagValuesType } from './types';
import { fetchAPI } from './services/fetchAPI';
import FilterByName from './components/FilterByName';
import FilterByNumbers from './components/FilterByNumbers';

const INITIAL_STATE = {
  column: 'population',
  comparison: 'maior que',
  numberValue: '0',
};

const SELECTS = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

function App() {
  const [planets, setPlanets] = useState<PlanetType[]>();
  const [planetTags, setPlanetTags] = useState<string[]>();
  const [searchValue, setSearchValue] = useState('');
  const [filteredPlanets, setFilteredPlanets] = useState(planets);
  const [tagValues, setTagValues] = useState<TagValuesType>(INITIAL_STATE);
  const [filters, setFilters] = useState<TagValuesType[]>([]);
  const [selects, setSelects] = useState<string[]>(SELECTS);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAPI();
      setFilteredPlanets(data);
      setPlanets(data);
      setPlanetTags(Object.keys(data[0]));
    };

    fetchData();
  }, []);

  const handleNameChange = (event: { target: { value: string } }) => {
    const inputValue = event.target.value.toLowerCase();
    setSearchValue(inputValue);

    const filterPlanets = planets?.filter((planet) => planet
      .name.toLowerCase().includes(inputValue));
    setFilteredPlanets(filterPlanets);
  };

  const handleTagFilter = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const tagOptions = {
      ...tagValues,
      [name]: value,
    };
    setTagValues(tagOptions);
  };

  const handleBtnClick = async () => {
    const filterCriteria = {
      column: tagValues.column,
      comparison: tagValues.comparison,
      numberValue: tagValues.numberValue,
    };

    const newFilters = [...filters, filterCriteria];

    const filtered = filteredPlanets?.filter((planet: any) => {
      if (tagValues.comparison === 'maior que') {
        return planet[tagValues.column] > parseInt(tagValues.numberValue, 10);
      }
      if (tagValues.comparison === 'menor que') {
        return planet[tagValues.column] < parseInt(tagValues.numberValue, 10);
      }
      return planet[tagValues.column] === tagValues.numberValue;
    });

    setFilteredPlanets(filtered);
    setFilters(newFilters);
    setTagValues(INITIAL_STATE);
  };

  useEffect(() => {
    const filteredSelects = selects.filter((select) => {
      return !filters.some((filter) => select === filter.column);
    });

    setSelects(filteredSelects);
  }, [filters, filteredPlanets]);

  return (
    <PlanetsContext.Provider
      value={ {
        planetTags,
        filteredPlanets,
        searchValue,
        handleNameChange,
        tagValues,
        filters,
        selects,
        handleTagFilter,
        handleBtnClick,
      } }
    >
      <FilterByName />
      <FilterByNumbers />
      <Table />
    </PlanetsContext.Provider>
  );
}

export default App;
