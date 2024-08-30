import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_MARKETS } from "../../graphql/queries/markets_query";
import { GET_LOCATIONS } from "../../graphql/queries/locations_query";
import "./CashDeposits.css";
import { MdOutlineSearch } from "react-icons/md";
import axios from "axios";
import Select from "react-select";

const Filters = ({ isFilteredData, setisFilteredData, setIsFind }) => {
  const navigate = useNavigate();
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

  const { data: marketsData } = useQuery(GET_MARKETS);
  const { data: locationsData } = useQuery(GET_LOCATIONS);

  const permissions = {
    canEdit: true,
  };

  const handleExport = async (e) => {
    e.preventDefault();
    console.log("Filters before generating export URL:", filters);
    const params = new URLSearchParams();

    params.append("report[additional_data][search]", filters.search || "");
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
    params.append("report[kind]", "cash_deposits");

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
    }/reports?${params.toString()}`;
    console.log("Generated URL:", url);

    try {
      const response = await axios.get(url);
      console.log("Response data:", response.data);
      console.log(response.status, "statussss");
      if (response.status === 200) {
        window.location.href = `${process.env.REACT_APP_RAILS_BACKEND}/reports`;
      }
      console.log("Export data set:", response.data);
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
      const response = await axios.get(`${process.env.REACT_APP_RAILS_BACKEND}${url}`);
      console.log("Response data:", response.data);
      setisFilteredData(response.data);
      console.log("Filter data set:", response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const sortedMarkets = marketsData?.markets
    ? marketsData.markets
        .filter((market) => market.name.trim() !== "")
        .sort((a, b) => a.name.localeCompare(b.name))
    : [];
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
      <br />
      <a href={process.env.REACT_APP_RAILS_BACKEND}>Back</a>
      <div className="container-fluid cash-deposits-container">
        <div className="page-header form-column-filters">
          <br />
          <br />
          <div className="row mb-4 filtersWidth">
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
            <div className="search-input-container">
              <span className="left-icon">
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
          <div className="row mb-3">
            <div className="col-md-6">
              <div className="date-wrapper">
                <input
                  type="text"
                  className="form-control date-input"
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
                  className="form-control date-input"
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

          <div className="row mb-3">
            <div className="col-md-6">
              <div className="date-wrapper">
                <input
                  type="text"
                  className="form-control date-input"
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
                  className="form-control date-input"
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
