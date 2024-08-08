import React, { useState } from "react";
import "./CashDeposits.css";
import Filters from "./Filters";
import CashDepositTable from "./CashDepositTable";

function CashDeposits() {
  const [isFilterData, setIsFilterData] = useState([]);
  console.log(isFilterData, "Filtered Data");

  return (
    <div className="container-fluid cash-deposits-container">
      <Filters isFilterData={isFilterData} setIsFilterData={setIsFilterData} />
      <CashDepositTable isFilterData={isFilterData} />
    </div>
  );
}

export default CashDeposits;
