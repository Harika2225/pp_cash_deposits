import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CashDepositTable from './CashDepositTable';
import { MockedProvider } from '@apollo/client/testing';

test('displays filtered deposits correctly', () => {
  const mocks = []; // Define your mocks here
  const isFilteredData = true; // Example data

  const { getByText } = render(
    <MemoryRouter>
      <MockedProvider mocks={mocks} addTypename={false}>
        <CashDepositTable isFilteredData={isFilteredData} isFind={true} />
      </MockedProvider>
    </MemoryRouter>
  );
  
  // Add your assertions here
});
