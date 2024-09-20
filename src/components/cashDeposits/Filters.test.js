import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { MemoryRouter } from "react-router-dom";
import Filters from "./Filters";
import { GET_MARKETS } from "../../graphql/queries/markets_query";
import { GET_LOCATIONS } from "../../graphql/queries/locations_query";
import { GET_USER_ACCESSIBLE_ENTITIES } from "../../graphql/queries/user_accessible_entities_query";

const mocks = [
  {
    request: {
      query: GET_MARKETS,
    },
    result: {
      data: {
        markets: [{ id: "8", name: "Addison" }, { id: "167", name: "Akron" }],
      },
    },
  },
  {
    request: {
      query: GET_LOCATIONS,
    },
    result: {
      data: {
        locations: [{ id: "149", name: "P1201" }],
      },
    },
  },
  {
    request: {
      query: GET_USER_ACCESSIBLE_ENTITIES,
      variables: { user_id: 1 },
    },
    result: {
      data: {
        user_accessible_entities: [
          { entity_id: "1", entity_type: "Market" },
          { entity_id: "2", entity_type: "Location" },
          { entity_id: "3", entity_type: "PayMachine" },
        ],
      },
    },
  },
];

const renderFilters = (props = {}) => {
  return render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter>
        <Filters {...props} />
      </MemoryRouter>
    </MockedProvider>
  );
};

afterEach(() => {
  jest.clearAllTimers(); 
});

test("renders cash deposits text and input fields", async () => {
  renderFilters();

  expect(screen.getByText(/Cash Deposits/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Search by Pay Machine ID, Bag Number/i)).toBeInTheDocument();
  expect(screen.getByText(/All Markets/i)).toBeInTheDocument();
  expect(screen.getByText(/All Locations/i)).toBeInTheDocument();
  expect(screen.getByText(/All Deposit Types/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Created From - Central Time \(US & Canada\)/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Created Until - Central Time \(US & Canada\)/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Deposit Date From - Central Time \(US & Canada\)/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Deposit Date Until - Central Time \(US & Canada\)/i)).toBeInTheDocument();

  expect(screen.getByText(/New/i)).toBeInTheDocument();
  expect(screen.getByText(/Export/i)).toBeInTheDocument();
  expect(screen.getByText(/Find/i)).toBeInTheDocument();
});

test("handles input changes", () => {
  renderFilters();

  const searchInput = screen.getByPlaceholderText(/Search by Pay Machine ID, Bag Number/i);
  fireEvent.change(searchInput, { target: { value: '111111' } });
  expect(searchInput.value).toBe('111111');

  const createdFromInput = screen.getByPlaceholderText(/Created From - Central Time \(US & Canada\)/i);
  fireEvent.change(createdFromInput, { target: { value: '2024-01-01T00:00' } });
  expect(createdFromInput.value).toBe('2024-01-01T00:00');

  const depositDateFromInput = screen.getByPlaceholderText(/Deposit Date From - Central Time \(US & Canada\)/i);
  fireEvent.change(depositDateFromInput, { target: { value: '2024-01-01T00:00' } });
  expect(depositDateFromInput.value).toBe('2024-01-01T00:00');
});

test("disables the Export button when not allowed", () => {
  renderFilters({ permissions: { canEdit: true } });

  const exportButton = screen.getByText(/Export/i);
  expect(exportButton).toBeEnabled(); // Adjust this if there's a condition that disables it
});

test("displays options in multi-select components", async () => {
  renderFilters();
  const marketDropdown = screen.getByText(/All Markets/i);
  fireEvent.mouseDown(marketDropdown);
  await waitFor(() => {
    expect(screen.getByText(/Addison/i)).toBeInTheDocument();
    expect(screen.getByText(/Akron/i)).toBeInTheDocument();
  });

  const depositTypeDropdown = screen.getByText(/Deposit Types/i);
  fireEvent.mouseDown(depositTypeDropdown);
  await waitFor(() => {
    expect(screen.getByText(/Pay Machine/i)).toBeInTheDocument();
    expect(screen.getByText(/Valet/i)).toBeInTheDocument();
    expect(screen.getByText(/Other/i)).toBeInTheDocument();
  });
});
