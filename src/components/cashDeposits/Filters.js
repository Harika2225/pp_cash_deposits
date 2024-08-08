import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_MARKETS } from "../queries/markets_query";
import { GET_LOCATIONS } from "../queries/locations_query";
import "./CashDeposits.css";
import { MdOutlineSearch } from "react-icons/md";
import axios from "axios";

const Filters = ({ isFilterData, setIsFilterData }) => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    search: "",
    marketId: "",
    locationId: "",
    depositType: "",
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

  const handleExport = () => {
    // Add your export logic here
  };
  
  useEffect(() => {
    console.log(isFilterData, "Updated isFilterData");
  }, [isFilterData]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleFindClick = async () => {
    console.log("Filters before generating URL:", filters);
    const params = new URLSearchParams();

    params.append("cash_deposit[search]", filters.search || "");
    params.append("cash_deposit[market_ids][]", filters.marketId);
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

    const url = `/cash_deposits?${params.toString()}`;
    console.log("Generated URL:", url);
    navigate(url);

    try {
      const response = await axios.get(`http://manage.lvh.me:5000${url}`, {
        params: filters,
      });
      console.log(response.data, "dataaaa");
      setIsFilterData(response.data);
      console.log(isFilterData,"filter data")
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const sortedMarkets = marketsData?.markets
    ? marketsData.markets
        .filter((market) => market.name.trim() !== "")
        .sort((a, b) => a.name.localeCompare(b.name))
    : [];

  const marketId = Number(filters?.marketId);
  const isMarketVisible = marketsData?.markets.some(
    (market) => market.id === marketId && market.visible
  );
  console.log(marketId, isMarketVisible, "markettt");
  const sortedLocations = isMarketVisible
    ? locationsData?.locations
        .filter(
          (location) =>
            location.market_id === marketId && location.name.trim() !== ""
        )
        .sort((a, b) => a.name.localeCompare(b.name))
    : [];

  return (
    <form onSubmit={handleFindClick}>
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
              <select
                name="marketId"
                className="form-control"
                value={filters.marketId}
                onChange={handleFilterChange}
              >
                <option>All Markets</option>
                {sortedMarkets.map((market) => (
                  <option key={market.id} value={market.id}>
                    {market.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-4">
              <select
                name="locationId"
                className="form-control"
                value={filters.locationId}
                onChange={handleFilterChange}
              >
                {" "}
                <option>All Locations</option>
                {sortedLocations.map((location) => (
                  <option key={location.id} value={location.id}>
                    {location.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-4">
              <select
                name="depositType"
                className="form-control"
                value={filters.depositType}
                onChange={handleFilterChange}
              >
                <option>All Deposit Types</option>
                <option>Pay Machine</option>
                <option>Valet</option>
                <option>Other</option>
              </select>
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
                  onFocus={(e) => {
                    e.target.type = "datetime-local";
                  }}
                  onBlur={(e) => {
                    e.target.type = "text";
                  }}
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
                  onFocus={(e) => {
                    e.target.type = "datetime-local";
                  }}
                  onBlur={(e) => {
                    e.target.type = "text";
                  }}
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
                  onFocus={(e) => {
                    e.target.type = "datetime-local";
                  }}
                  onBlur={(e) => {
                    e.target.type = "text";
                  }}
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
                  onFocus={(e) => {
                    e.target.type = "datetime-local";
                  }}
                  onBlur={(e) => {
                    e.target.type = "text";
                  }}
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
