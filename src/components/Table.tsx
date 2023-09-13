import { useContext } from 'react';
import { PlanetType } from '../types';
import PlanetsContext from '../context/PlanetsContext';

function Table() {
  const { planetTags, filteredPlanets } = useContext(PlanetsContext);

  return (
    <table>
      <thead>
        <tr>
          {planetTags && planetTags.map((tag: string[], index: number) => (
            <th key={ index }>{tag}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {filteredPlanets && filteredPlanets
          .map(({ climate, created, diameter, edited, films,
            gravity, name, orbital_period, population, rotation_period,
            surface_water, terrain, url }: PlanetType) => (
              <tr key={ name }>
                <td data-testid="planet-name">{name}</td>
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
