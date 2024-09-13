import React, { useState } from "react";
import "./CashDeposits.css";
import Filters from "./Filters";
import CashDepositTable from "./CashDepositTable";

function CashDeposits() {
  const [isFilteredData, setisFilteredData] = useState([]);
  const [isFind, setIsFind] = useState(false);
  return (
    <div className="container-fluid cash-deposits-container">
      <Filters
        isFilteredData={isFilteredData}
        setisFilteredData={setisFilteredData}
        setIsFind={setIsFind}
      />
      <CashDepositTable isFilteredData={isFilteredData} isFind={isFind} />
    </div>
  );
}

export default CashDeposits;
