import React from 'react';
import CashDepositForm from './CashDepositForm';

const EditCashDeposit = ({ match }) => {
  const { id } = match.params;
  return (
    <div className="page-header">
      <h1>Edit Cash Deposit</h1>
      <div className="col-md-12">
        <CashDepositForm cashDepositId={id} />
      </div>
    </div>
  );
};

export default EditCashDeposit;
