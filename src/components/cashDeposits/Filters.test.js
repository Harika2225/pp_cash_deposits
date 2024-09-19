import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { MemoryRouter } from 'react-router-dom';
import Filters from './Filters';
import { GET_MARKETS } from '../../graphql/queries/markets_query';
import { GET_LOCATIONS } from '../../graphql/queries/locations_query';

const mocks = [
  {
    request: {
      query: GET_MARKETS,
    },
    result: {
      data: {
        markets: [{ id: '8', name: 'Addison' }],
      },
    },
  },
  {
    request: {
      query: GET_LOCATIONS,
    },
    result: {
      data: {
        locations: [{ id: '149', name: 'P1201' }],
      },
    },
  },
];

afterEach(() => {
    jest.clearAllTimers(); // Clear any pending timers
  });

test('renders cash deposits text', async() => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter>
        <Filters />
      </MemoryRouter>
    </MockedProvider>
  );
  
  const linkElement = screen.getByText(/Cash Deposits/i);
  expect(linkElement).toBeInTheDocument();
});