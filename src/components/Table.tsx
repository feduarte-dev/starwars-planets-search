import { useEffect, useState } from 'react';
import { fetchAPI } from '../services/fetchAPI';
import { PlanetType } from '../types';

function Table() {
  const [planets, setPlanets] = useState<PlanetType[]>();
  const [planetTags, setPlanetTags] = useState<string[]>();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAPI();
      setPlanets(data);
      setPlanetTags(Object.keys(data[0]));
    };

    fetchData();
  }, []);

  return (
    <table className="table-container">
      <thead>
        <tr>
          {planetTags && planetTags.map((tag) => (
            <th key={ tag }>{tag}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {planets && planets.map(({ climate, created, diameter, edited, films,
          gravity, name, orbital_period, population, rotation_period,
          surface_water, terrain, url }) => (
            <tr key={ name }>
              <td>{name}</td>
              <td>{rotation_period}</td>
              <td>{orbital_period}</td>
              <td>{diameter}</td>
              <td>{climate}</td>
              <td>{gravity}</td>
              <td>{terrain}</td>
              <td>{surface_water}</td>
              <td>{population}</td>
              <td>{films}</td>
              <td>{created}</td>
              <td>{edited}</td>
              <td>{url}</td>
            </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
