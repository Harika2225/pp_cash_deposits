import React from "react";
import { useQuery } from "@apollo/client";
import "./CashDepositForm.css";
import { useParams } from "react-router-dom";
import { GET_CASH_DEPOSIT_BY_ID } from "../../graphql/queries/cash_deposits_query";
import CashDepositForm from "./CashDepositForm";

const EditCashDeposit = () => {
  const { id } = useParams();
  const { loading, data } = useQuery(GET_CASH_DEPOSIT_BY_ID, {
    variables: { id: parseInt(id) },
  });

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container">
      <div className="page-header p-2">
        <h1>Edit Cash Deposit</h1>
        <hr style={{ color: "#cfcfcf" }} />
        <CashDepositForm
          cashDepositId={parseInt(id)}
          initialData={data.cash_deposit_by_pk}
        />
      </div>
    </div>
  );
};

export default EditCashDeposit;
