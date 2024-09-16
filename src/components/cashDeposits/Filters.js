import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_USER_MARKETS } from "../../graphql/queries/markets_query";
import { GET_LOCATIONS } from "../../graphql/queries/locations_query";
import { GET_USER_ACCESSIBLE_ENTITIES } from "../../graphql/queries/user_accessible_entities_query";
import { GET_MARKETS } from "../../graphql/queries/markets_query";
import "./CashDeposits.css";
import { MdOutlineSearch } from "react-icons/md";
import axios from "axios";
import Select from "react-select";

const Filters = ({
  isFilteredData,
  setisFilteredData,
  setIsFind,
  currentUserId,
}) => {
  const [filters, setFilters] = useState({
    search: "",
    marketId: [],
    locationId: [],
    depositType: [],
    createdFrom: "",
    createdUntil: "",
    depositDateFrom: "",
    depositDateUntil: "",
  });

  const { data: userAccessibleData } = useQuery(GET_USER_ACCESSIBLE_ENTITIES, {
    variables: { user_id: currentUserId },
  });

  const marketIds = userAccessibleData?.user_accessible_entities
    .filter((entity) => entity.entity_type === "Market")
    .map((entity) => entity.entity_id);

  const { data: marketsData } = useQuery(GET_USER_MARKETS, {
    variables: { marketIds: marketIds || [] },
    skip: !marketIds || marketIds.length === 0,
  });

  const { data: allMarketsData } = useQuery(GET_MARKETS, {
    skip: marketIds && marketIds.length > 0,
  });

  const { data: locationsData } = useQuery(GET_LOCATIONS);

  useEffect(() => {
    console.log("Current User ID in Filters:", currentUserId);
  }, [currentUserId]);

  const permissions = {
    canEdit: true,
  };

  const handleExport = async (e) => {
    e.preventDefault();
    const params = new URLSearchParams();

    params.append("report[kind]", "cash_deposits");
    params.append(
      "report[additional_data][created_at_from]",
      filters.createdFrom || ""
    );
    params.append(
      "report[additional_data][created_at_until]",
      filters.createdUntil || ""
    );
    params.append(
      "report[additional_data][deposit_date_on_from]",
      filters.depositDateFrom || ""
    );
    params.append(
      "report[additional_data][deposit_date_on_until]",
      filters.depositDateUntil || ""
    );
    params.append("report[additional_data][search]", filters.search || "");

    filters.marketId.forEach((id) => {
      params.append("report[additional_data][market_ids][]", id);
    });

    filters.locationId.forEach((id) => {
      params.append("report[additional_data][location_ids][]", id);
    });

    filters.depositType.forEach((type) => {
      params.append("report[additional_data][deposit_types][]", type);
    });

    const url = `${
      process.env.REACT_APP_RAILS_BACKEND
    }/reports1?${params.toString()}`;
    console.log("Generated URL:", url);

    try {
      const response = await axios.post(url);
      if (response.status === 200) {
        window.location.href = `${process.env.REACT_APP_RAILS_BACKEND}/reports`;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    console.log(isFilteredData, "Updated isFilteredData");
  }, [isFilteredData]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleFindClick = async (e) => {
    setIsFind(true);
    e.preventDefault();
    console.log("Filters before generating URL:", filters);
    const params = new URLSearchParams();

    params.append("cash_deposit[search]", filters.search || "");
    params.append("cash_deposit[created_at_from]", filters.createdFrom || "");
    params.append("cash_deposit[created_at_until]", filters.createdUntil || "");
    params.append(
      "cash_deposit[deposit_date_on_from]",
      filters.depositDateFrom || ""
    );
    params.append(
      "cash_deposit[deposit_date_on_until]",
      filters.depositDateUntil || ""
    );
    params.append("commit", "Find");

    filters.marketId.forEach((id) => {
      params.append("cash_deposit[market_ids][]", id);
    });

    filters.locationId.forEach((id) => {
      params.append("cash_deposit[location_ids][]", id);
    });

    filters.depositType.forEach((type) => {
      params.append("cash_deposit[deposit_types][]", type);
    });

    const url = `/cash_deposits/filter?${params.toString()}`;
    console.log("Generated URL:", url);

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_RAILS_BACKEND}${url}`
      );
      console.log("Response data:", response.data);
      setisFilteredData(response.data);
      console.log("Filter data set:", response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const sortedMarkets = (marketsData?.markets || allMarketsData?.markets || [])
    .filter((market) => market.name.trim() !== "")
    .sort((a, b) => a.name.localeCompare(b.name));

  const sortedLocations = locationsData?.locations
    ? locationsData.locations
        .filter((location) => location.name.trim() !== "")
        .sort((a, b) => a.name.localeCompare(b.name))
    : [];

  const handleMarketChange = (selectedOptions) => {
    const selectedMarketIds = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    setFilters((prevFilters) => ({
      ...prevFilters,
      marketId: selectedMarketIds,
      locationId: [],
    }));
  };
  const handleLocationChange = (selectedOptions) => {
    const selectedLocationIds = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    setFilters((prevFilters) => ({
      ...prevFilters,
      locationId: selectedLocationIds,
    }));
  };
  const handleDepositTypeChange = (selectedOptions) => {
    const selectedDepositTypes = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    setFilters((prevFilters) => ({
      ...prevFilters,
      depositType: selectedDepositTypes,
    }));
  };

  const marketOptions = sortedMarkets.map((market) => ({
    value: market.id,
    label: market.name,
  }));
  const selectedMarketOptions = marketOptions.filter((option) =>
    filters.marketId.includes(option.value)
  );

  const locationOptions = sortedLocations.map((location) => ({
    value: location.id,
    label: location.name,
  }));

  const selectedLocationOptions = locationOptions.filter((option) =>
    filters.locationId.includes(option.value)
  );

  const depositTypeOptions = [
    { value: "pay_machine", label: "Pay Machine" },
    { value: "valet", label: "Valet" },
    { value: "other", label: "Other" },
  ];

  return (
    <form onSubmit={handleFindClick}>
      <div className="container-fluid cash-deposits-container ">
        <div className="page-header form-column-filters">
          <div className="row filtersWidth">
            <div className="col-md-6">
              <h1>Cash Deposits</h1>
            </div>
            <div className="col-md-6 d-flex justify-content-end align-items-center">
              <div className="buttons">
                {permissions.canEdit && (
                  <Link
                    to="/react_cash_deposits/new"
                    className="btn btn-primary newButton"
                  >
                    New
                  </Link>
                )}
                <button
                  className="btn btn-info exportButton"
                  onClick={handleExport}
                  disabled={false}
                >
                  Export
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="filtersWidth">
          <div className="mb-3">
            <div className="input-group mb-3">
              <span className="input-group-text search-icon">
                <MdOutlineSearch />
              </span>
              <input
                type="text"
                className="form-control"
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
                placeholder="Search by Pay Machine ID, Bag Number"
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-4">
              <Select
                isMulti
                name="marketId"
                options={marketOptions}
                value={selectedMarketOptions}
                onChange={handleMarketChange}
                className="basic-multi-select"
                classNamePrefix="select"
                placeholder="All Markets"
                isSearchable={false}
                components={{
                  DropdownIndicator: null,
                  IndicatorSeparator: null,
                }}
              />
            </div>
            <div className="col-md-4">
              <Select
                isMulti
                name="locationId"
                options={locationOptions}
                value={selectedLocationOptions}
                onChange={handleLocationChange}
                isSearchable={false}
                className="basic-multi-select"
                classNamePrefix="select"
                placeholder="All Locations"
                components={{
                  DropdownIndicator: null,
                  IndicatorSeparator: null,
                }}
              />
            </div>
            <div className="col-md-4">
              <Select
                isMulti
                name="depositType"
                options={depositTypeOptions}
                value={depositTypeOptions.filter((option) =>
                  filters.depositType.includes(option.value)
                )}
                onChange={handleDepositTypeChange}
                isSearchable={false}
                className="basic-multi-select"
                classNamePrefix="select"
                placeholder="All Deposit Types"
                components={{
                  DropdownIndicator: null,
                  IndicatorSeparator: null,
                }}
              />
            </div>
          </div>
          <div className="row mb-3 row">
            <div className="col-md-6">
              <div className="date-wrapper">
                <input
                  type="text"
                  className="form-control"
                  name="createdFrom"
                  value={filters.createdFrom}
                  onChange={handleFilterChange}
                  placeholder="Created From - Central Time (US & Canada)"
                  onFocus={(e) => (e.target.type = "datetime-local")}
                  onBlur={(e) => (e.target.type = "text")}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="date-wrapper">
                <input
                  type="text"
                  className="form-control"
                  name="createdUntil"
                  value={filters.createdUntil}
                  onChange={handleFilterChange}
                  placeholder="Created Until - Central Time (US & Canada)"
                  onFocus={(e) => (e.target.type = "datetime-local")}
                  onBlur={(e) => (e.target.type = "text")}
                />
              </div>
            </div>
          </div>

          <div className="row mb-3 row">
            <div className="col-md-6">
              <div className="date-wrapper">
                <input
                  type="text"
                  className="form-control"
                  name="depositDateFrom"
                  value={filters.depositDateFrom}
                  onChange={handleFilterChange}
                  placeholder="Deposit Date From - Central Time (US & Canada)"
                  onFocus={(e) => (e.target.type = "datetime-local")}
                  onBlur={(e) => (e.target.type = "text")}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="date-wrapper">
                <input
                  type="text"
                  className="form-control"
                  name="depositDateUntil"
                  value={filters.depositDateUntil}
                  onChange={handleFilterChange}
                  placeholder="Deposit Date Until - Central Time (US & Canada)"
                  onFocus={(e) => (e.target.type = "datetime-local")}
                  onBlur={(e) => (e.target.type = "text")}
                />
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-end">
            <button
              className="btn btn-primary findButton"
              onClick={handleFindClick}
            >
              Find
            </button>
          </div>

          <hr />
        </div>
      </div>
    </form>
  );
};

export default Filters;
