import React from 'react';
import CashDepositForm from './CashDepositForm';

const NewCashDeposit = () => {
  return (
    <div className="page-header">
      <h1>New Cash Deposit</h1>
      <div className="col-md-12">
        <CashDepositForm />
      </div>
    </div>
  );
};

export default NewCashDeposit;
