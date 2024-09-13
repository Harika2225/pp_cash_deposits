import React from 'react';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { MemoryRouter } from 'react-router-dom';
import CashDepositTable from './CashDepositTable';
import { GET_CASH_DEPOSITS } from '../../graphql/queries/cash_deposits_query';

const mocks = [
  {
    request: {
      query: GET_CASH_DEPOSITS,
      variables: { id: 1 },
    },
    result: {
      data: {
        cash_deposit_by_pk: {
          id: 1,
          amount: 1000,
          date: "2024-01-01",
          __typename: "CashDeposit",
        },
      },
    },
  },
];

test('renders text', () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <CashDepositTable isFind={true} isFilteredData={[]} />
        </MemoryRouter>
      </MockedProvider>
    );
    
    const linkElement = screen.getByText(/Bag Number/i);
    expect(linkElement).toBeInTheDocument();
});
