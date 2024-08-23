import React, { useState } from "react";
import "./CashDeposits.css";
import Filters from "./Filters";
import CashDepositTable from "./CashDepositTable";

function CashDeposits() {
  const [isFilteredData, setisFilteredData] = useState([]);
  console.log(isFilteredData, "Filtered Data");

  return (
    <div className="container-fluid cash-deposits-container">
      <Filters isFilteredData={isFilteredData} setisFilteredData={setisFilteredData} />
      <CashDepositTable isFilteredData={isFilteredData} />
    </div>
  );
}

export default CashDeposits;
