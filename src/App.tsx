import React, { useState, useEffect } from 'react';
import Table from './components/Table';
import './App.css';
import PlanetsContext from './context/PlanetsContext';
import { PlanetType, TagValuesType, OrderType } from './types';
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

const ORDER = {
  column: 'population',
  sort: undefined,
};

function App() {
  const [planets, setPlanets] = useState<PlanetType[]>();
  const [planetTags, setPlanetTags] = useState<string[]>();
  const [searchValue, setSearchValue] = useState('');
  const [filteredPlanets, setFilteredPlanets] = useState<any>([]);
  const [tagValues, setTagValues] = useState<TagValuesType>(INITIAL_STATE);
  const [filters, setFilters] = useState<TagValuesType[]>([]);
  const [selects, setSelects] = useState<any>(SELECTS);
  const [order, setOrder] = useState<OrderType>(ORDER);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAPI();
      setPlanets(data);
      setFilteredPlanets(data);
      setPlanetTags(Object.keys(data[0]));
      setLoading(false);
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
    const filteredSelects = selects.filter((select: any) => {
      return !filters.some((filter) => select === filter.column);
    });

    setSelects(filteredSelects);
  }, [filters, filteredPlanets]);

  const handleDeleteAll = () => {
    setFilters([]);
    setFilteredPlanets(planets);
  };

  const handleDeleteFilter = (actualFilter:TagValuesType) => {
    const filtersToDelete = filters.filter((filter) => filter
      .column !== actualFilter.column);
    setFilters(filtersToDelete);
    const filteredSelects2 = SELECTS.filter((select) => select === actualFilter.column);
    const newSelects = [...selects, filteredSelects2];
    setSelects(newSelects);
    let filteredData = planets;
    filtersToDelete.forEach((filter) => {
      filteredData = filteredData?.filter((planet: any) => {
        if (filter.comparison === 'maior que') {
          return planet[filter.column] > parseInt(filter.numberValue, 10);
        }
        if (filter.comparison === 'menor que') {
          return planet[filter.column] < parseInt(filter.numberValue, 10);
        }
        return planet[filter.column] === filter.numberValue;
      });
    });
    setFilteredPlanets(filteredData);
  };

  const handleOrder = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const orderOptions = {
      ...order,
      [name]: value,
    };
    setOrder(orderOptions);
  };

  const handleSort = () => {
    const sortedByFilter = [...filteredPlanets];
    sortedByFilter.sort((a, b) => {
      const columnA = parseFloat(a[order.column]);
      const columnB = parseFloat(b[order.column]);

      if (Number.isNaN(columnA) && Number.isNaN(columnB)) {
        return 0;
      } if (Number.isNaN(columnA)) {
        return 1;
      } if (Number.isNaN(columnB)) {
        return -1;
      }

      if (order.sort === 'ASC') {
        return columnA - columnB;
      } if (order.sort === 'DESC') {
        return columnB - columnA;
      }

      return 0;
    });

    setFilteredPlanets(sortedByFilter);
  };

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
        loading,
        handleDeleteFilter,
        handleTagFilter,
        handleBtnClick,
        handleDeleteAll,
      } }
    >
      <FilterByName />
      <FilterByNumbers />
      <div>
        <select
          name="column"
          data-testid="column-sort"
          onChange={ handleOrder }
          value={ order.column }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
        <label>
          <span>Ascendente: </span>
          <input
            onChange={ handleOrder }
            type="radio"
            name="sort"
            value="ASC"
            data-testid="column-sort-input-asc"
          />
        </label>
        <label>
          <span>Descendente: </span>
          <input
            onChange={ handleOrder }
            type="radio"
            name="sort"
            value="DESC"
            data-testid="column-sort-input-desc"
          />
        </label>
        <button data-testid="column-sort-button" onClick={ handleSort }>Ordernar</button>
      </div>
      {loading ? <h1>Carrregando...</h1> : <Table />}

    </PlanetsContext.Provider>
  );
}

export default App;
