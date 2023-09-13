import {
  render,
  screen,
  waitForElementToBeRemoved,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { results } from "./mocks";
import { vi } from "vitest";
import Table from "../components/Table";

beforeEach(() => {
  const MOCK_RESPONSE = {
    ok: true,
    status: 200,
    json: async () => results,
  } as Response;

  const mockFetch = vi.spyOn(global, "fetch").mockResolvedValue(MOCK_RESPONSE);
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("Testa funcionalidades da aplicacaco", () => {
  it("Verifica se os filtros sao renderizados", () => {
    render(<App />);
    const searchInput = screen.getByRole("textbox");
    const filterBtn = screen.getByRole("button", { name: /filtrar/i });
    const removeAllFilters = screen.getByRole("button", {
      name: /remover todas filtragens/i,
    });
    const orderBtn = screen.getByRole("button", { name: /ordernar/i });
    expect(searchInput).toBeInTheDocument();
    expect(filterBtn).toBeInTheDocument();
    expect(removeAllFilters).toBeInTheDocument();
    expect(orderBtn).toBeInTheDocument();
  });

  it("Verifica filtro de nomes", async () => {
    render(<App />);
    const tatooine = await screen.findByRole("cell", { name: /tatooine/i });
    expect(tatooine).toBeInTheDocument();
    await userEvent.type(screen.getByRole("textbox"), "oo");
    const yavinIV = screen.queryByRole("cell", { name: /yavin iv/i });
    expect(yavinIV).not.toBeInTheDocument();
  });

  it("Verifica filtro de numeros", async () => {
    render(<App />);
    const tatooine = await screen.findByRole("cell", { name: /tatooine/i });
    expect(tatooine).toBeInTheDocument();
    await userEvent.type(screen.getByRole("spinbutton"), "4500000000");
    await userEvent.click(screen.getByRole("button", { name: /filtrar/i }));
    const coruscant = screen.getByRole("button", { name: /filtrar/i });
    const yavinIV = screen.queryByRole("cell", { name: /yavin iv/i });
    expect(yavinIV).not.toBeInTheDocument();
    expect(coruscant).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: /x/i }));
    const view = screen.queryByTestId("filter");
    expect(view).not.toBeInTheDocument();
  });

  it("Verifica filtro de numeros", async () => {
    render(<App />);
    const tatooine = await screen.findByRole("cell", { name: /tatooine/i });
    expect(tatooine).toBeInTheDocument();
    await userEvent.selectOptions(
      screen.getByTestId("column-filter"),
      "diameter"
    );
    await userEvent.selectOptions(
      screen.getByTestId("comparison-filter"),
      "menor que"
    );
    await userEvent.type(screen.getByRole("spinbutton"), "9000");
    await userEvent.click(screen.getByRole("button", { name: /filtrar/i }));
await userEvent.click(screen.getByRole('button', {
  name: /remover todas filtragens/i
}))

   
    const dagobah = screen.queryByRole("cell", { name: /dagobah/i });

    expect(dagobah).toBeInTheDocument();
  });

  it("Verifica filtro de ordem", async () => {
    render(<App />);
    const tatooine = await screen.findByRole("cell", { name: /tatooine/i });
    expect(tatooine).toBeInTheDocument();
    await userEvent.click(screen.getByRole("radio", { name: /ascendente:/i }));
  });
});

// data-testid="column-filter"

// data-testid="comparison-filter"
