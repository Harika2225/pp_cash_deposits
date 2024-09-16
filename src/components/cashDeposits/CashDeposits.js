import React, { useState, useEffect } from "react";
import "./CashDeposits.css";
import Filters from "./Filters";
import CashDepositTable from "./CashDepositTable";

function CashDeposits() {
  const [isFilteredData, setisFilteredData] = useState([]);
  const [isFind, setIsFind] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const fetchCurrentUserId = async () => {
      try {
        const url = `${process.env.REACT_APP_RAILS_BACKEND}/user_id/current_user_id`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setCurrentUserId(data.user_id);
      } catch (error) {
        console.error("Failed to fetch current user ID:", error);
      }
    };

    fetchCurrentUserId();
  }, []);

  return (
    <div className="container-fluid cash-deposits-container">
      <Filters
        isFilteredData={isFilteredData}
        setisFilteredData={setisFilteredData}
        setIsFind={setIsFind}
        currentUserId={currentUserId}
      />
      <CashDepositTable
        isFilteredData={isFilteredData}
        isFind={isFind}
        currentUserId={currentUserId}
      />
    </div>
  );
}

export default CashDeposits;
