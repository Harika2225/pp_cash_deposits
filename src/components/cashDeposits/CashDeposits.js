import React, { useContext, useState } from "react";
import { useQuery } from "@apollo/client";
import { UserContext } from "../../contexts/UserContext";
import { GET_USER_ACCESSIBLE_ENTITIES } from "../../graphql/queries/user_accessible_entities_query";
import { GET_USER_MARKETS } from "../../graphql/queries/markets_query";
import "./CashDeposits.css";
import Filters from "./Filters";
import CashDepositTable from "./CashDepositTable";

function CashDeposits() {
  const { currentUserId } = useContext(UserContext);
  const [isFilteredData, setisFilteredData] = useState([]);
  const [isFind, setIsFind] = useState(false);

  const {
    data: userAccessibleData,
    loading: userAccessibleLoading,
    error: userAccessibleError,
  } = useQuery(GET_USER_ACCESSIBLE_ENTITIES, {
    variables: { user_id: currentUserId },
    skip: !currentUserId,
  });

  const marketIds = userAccessibleData?.user_accessible_entities
    .filter((entity) => entity.entity_type === "Market")
    .map((entity) => entity.entity_id);

  const {
    data: marketsData,
    loading: marketsLoading,
    error: marketsError,
  } = useQuery(GET_USER_MARKETS, {
    variables: { marketIds: marketIds || [] },
    skip: !marketIds || marketIds.length === 0,
  });

  if (userAccessibleLoading || marketsLoading) return <div>Loading...</div>;
  if (userAccessibleError || marketsError)
    return (
      <div>Error: {userAccessibleError?.message || marketsError?.message}</div>
    );

  return (
    <div className="container-fluid cash-deposits-container">
      <Filters
        isFilteredData={isFilteredData}
        setisFilteredData={setisFilteredData}
        setIsFind={setIsFind}
        currentUserId={currentUserId}
        marketIds={marketIds}
      />
      <CashDepositTable
        isFilteredData={isFilteredData}
        isFind={isFind}
        currentUserId={currentUserId}
        marketIds={marketIds}
      />
    </div>
  );
}

export default CashDeposits;
