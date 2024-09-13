import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/react';
import NewCashDeposit from './NewCashDeposit';

jest.mock('./CashDepositForm', () => () => <div>Mocked CashDepositForm</div>);

describe('NewCashDeposit Component', () => {
  test('renders NewCashDeposit component', () => {
    render(<NewCashDeposit />);

    expect(screen.getByText('New Cash Deposit')).toBeInTheDocument();
    expect(screen.getByText('Mocked CashDepositForm')).toBeInTheDocument();

    const hrElement = screen.getByRole('separator');
    expect(hrElement).toHaveStyle('color: #cfcfcf');
  });
});
