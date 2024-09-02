
import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import CashDepositTable from './CashDepositTable';
import { GET_CASH_DEPOSITS } from '../../graphql/queries/cash_deposits_query';

const mocks = [
  {
    request: {
      query: GET_CASH_DEPOSITS,
    },
    result: {
      data: {
        cash_deposits: [
          {
            id: '1',
            bag_number: '123',
            deposit_type: 'cash_collection',
            business_date_on: '2023-01-01T00:00:00.000Z',
            deposit_date_on: '2023-01-02T00:00:00.000Z',
            market: { name: 'Market1' },
            location: { name: 'Location1' },
            paystation_character: 'A',
            deposit_amount_cents: 10000,
            cashier: { email: 'cashier1@example.com' },
            bank_depositor: { email: 'depositor1@example.com' },
            is_verified_in_bank: true,
            bank_description: 'Verified',
            bank_account_last4_digits: '1234',
            bank_deposit_amount_cents: 10000,
            digital_pull_time_at: '2023-01-03T10:00:00.000Z',
            digital_pull_2_time_at: '2023-01-04T10:00:00.000Z',
            created_at: '2023-01-05T10:00:00.000Z',
            files: ['file1.pdf', 'file2.pdf'],
            shift: 'Morning',
            bank_receipt_id: 'BR123'
          }
        ],
      },
    },
  },
  {
    request: {
      query: GET_CASH_DEPOSITS,
    },
    result: {
      data: {
        cash_deposits: [],
      },
    },
  },
];

describe('CashDepositTable', () => {
  it('renders without error', async () => {
    const { getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CashDepositTable isFilteredData={false} isFind={false} />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(getByText('ID')).toBeInTheDocument();
      expect(getByText('Bag Number')).toBeInTheDocument();
    });
  });

  it('displays filtered deposits correctly', async () => {
    const isFilteredData = [
      { 
        id: '2', bag_number: '456', deposit_type: 'coin_collection', business_date_on: '2023-01-10T00:00:00.000Z', deposit_date_on: '2023-01-12T00:00:00.000Z', 
        market_name: 'Market2', location_name: 'Location2', 
        pay_machine_id: 'P12', 
        files: [],
        deposit_amount_cents: 20000,
        cashier_email: 'cashier2@example.com',
        bank_depositor_email: 'depositor2@example.com',
        is_verified_in_bank: false,
        bank_description: 'Pending',
        bank_account_last4_digits: '5678',
        bank_deposit_amount_cents: 20000,
        digital_pull_time_at: '2023-01-13T15:30:00.000Z',
        digital_pull_2_time_at: '2023-01-14T15:30:00.000Z',
        created_at: '2023-01-15T15:30:00.000Z',
        shift: 'Evening',
        bank_receipt_id: 'BR456'
      }
    ];
    const { getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CashDepositTable isFilteredData={isFilteredData} isFind={true} />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(getByText('456')).toBeInTheDocument();
      expect(getByText('Market2')).toBeInTheDocument();
      expect(getByText('Location2')).toBeInTheDocument();
      expect(getByText('$200.00')).toBeInTheDocument();
      expect(getByText('Evening')).toBeInTheDocument();
    });
  });

  it('shows no deposits when data is empty', async () => {
    const { getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CashDepositTable isFilteredData={[]} isFind={true} />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(getByText('No deposits found.')).toBeInTheDocument();
    });
  });
});
