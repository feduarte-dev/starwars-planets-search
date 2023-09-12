import { render, screen } from '@testing-library/react';
import App from '../App';

test('Renderiza os elementos da home de acordo com o esperado', () => {
  render(<App />);
  const searchElement = screen.getByText(/search by planet name:/i);
  expect(searchElement).toBeInTheDocument();
});
