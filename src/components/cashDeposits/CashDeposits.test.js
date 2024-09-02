import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import CashDepositTable from './CashDepositTable'; // Adjust the import based on your file structure

// Your test case
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
