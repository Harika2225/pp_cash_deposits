import React from "react";
import CashDepositForm from "./CashDepositForm";

const NewCashDeposit = () => {
  return (
    <div className="container">
      <div className="page-header p-2">
        <h1>New Cash Deposit</h1>
        <hr style={{ color: "#cfcfcf" }} />
        <div className="col-md-12">
          <CashDepositForm />
        </div>
      </div>
    </div>
  );
};

export default NewCashDeposit;
