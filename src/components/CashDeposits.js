import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_CASH_DEPOSITS } from "./queries/cash_deposits_query";
import "./CashDeposits.css";
import { MdOutlineSearch } from "react-icons/md";

const CashDeposits = () => {
  const [deposits, setDeposits] = useState([]);
  const { loading, error, data } = useQuery(GET_CASH_DEPOSITS);

  const permissions = {
    canEdit: true,
  };

  useEffect(() => {
    if (data && data.cash_deposits) {
      const mappedDeposits = data.cash_deposits.map((deposit) => ({
        id: deposit.id,
        bag_number: deposit.bag_number,
        deposit_type_text:
          deposit.deposit_type.charAt(0).toUpperCase() +
          deposit.deposit_type.slice(1),
        formatted_business_date_on: formatDate(deposit.business_date_on),
        formatted_deposit_date_on: formatDate(deposit.deposit_date_on),
        market_name: deposit.market.name,
        location_name: deposit.location.name,
        // pay_machine_id: deposit.pay_machine_id,
        paystation_character: deposit.paystation_character,
        deposit_amount: deposit.deposit_amount_cents / 100,
        cashier_email: deposit.cashier.email,
        bank_depositor_email: deposit.bank_depositor?.email,
        is_verified_in_bank: deposit.is_verified_in_bank ? "Yes" : "No",
        bank_description: deposit.bank_description,
        bank_account_last4_digits: deposit.bank_account_last4_digits,
        bank_deposit_amount: deposit.bank_deposit_amount_cents / 100,
        formatted_bank_deposit_date_on: deposit.bank_deposit_date_on,
        variance:
          deposit.bank_deposit_amount_cents -
          deposit.deposit_amount_cents / 100,
        shift: deposit.shift,
        bank_receipt_id: deposit.bank_receipt_id,
        formatted_digital_pull_time_at: formatDateTime(
          deposit.digital_pull_time_at
        ),
        formatted_digital_pull_2_time_at: formatDateTime(
          deposit.digital_pull_2_time_at
        ),
        formatted_created_at: formatDateTime(deposit.created_at),
        files: deposit.files ? deposit.files.join("\n") : "",
      }));
      mappedDeposits.sort((a, b) => b.id - a.id);
      setDeposits(mappedDeposits);
    }
  }, [data]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return "";
    const dateTime = new Date(dateTimeString);
    const options = {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      timeZoneName: "short",
    };

    const formattedDateTime = dateTime.toLocaleString("en-US", options);
    const timeZoneAbbreviation = formattedDateTime.slice(-5); // Get last 3 characters for time zone abbreviation
    return formattedDateTime.replace(",", "") + ` (${timeZoneAbbreviation})`;
  };
  const handleExport = () => {
    // Add your export logic here
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching data. Please try again later.</p>;
  }

  if (!Array.isArray(deposits)) {
    return <p>No deposits found.</p>;
  }

  return (
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
              placeholder="Search by Pay Machine ID, Bag Number"
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-4">
            <select className="form-control">
              <option>All Markets</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <div className="col-md-4">
            <select className="form-control">
              <option>All Locations</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <div className="col-md-4">
            <select className="form-control">
              <option>All Deposit Types</option>
              {/* Add more options as needed */}
            </select>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <div className="date-wrapper">
              <input
                type="text"
                className="form-control date-input"
                placeholder="Created From - Central Time (US & Canada)"
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="date-wrapper">
              <input
                type="text"
                className="form-control date-input"
                placeholder="Created Until - Central Time (US & Canada)"
                onFocus={(e) => (e.target.type = "date")}
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
                placeholder="Deposit Date From - Central Time (US & Canada)"
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="date-wrapper">
              <input
                type="text"
                className="form-control date-input"
                placeholder="Deposit Date Until - Central Time (US & Canada)"
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
              />
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <button className="btn btn-primary findButton">Find</button>
        </div>
        <hr />
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Bag Number</th>
            <th>Deposit Type</th>
            <th>Pull Date</th>
            <th>Deposit Date</th>
            <th>Market Name</th>
            <th>Location Name</th>
            <th>Pay Machine ID</th>
            <th>Deposit Amount</th>
            <th>Employee Email</th>
            <th>Bank Depositor Email</th>
            <th>Verified In Bank</th>
            <th>Bank Description</th>
            <th>Bank Account Last 4 digits</th>
            <th>Verified Bank Deposit Amount</th>
            <th>Verified Bank Deposit Date</th>
            <th>Variance</th>
            <th>Shift</th>
            <th>Bank Receipt ID</th>
            <th>Digital Pull Time</th>
            <th>Digital Pull 2 Time</th>
            <th>Created At</th>
            <th>Files</th>
          </tr>
        </thead>
        <tbody>
          {deposits.map((deposit) => (
            <tr key={deposit.id}>
              <td>{deposit.id}</td>
              <td>{deposit.bag_number}</td>
              <td>{deposit.deposit_type_text}</td>
              <td className="no-wrap">{deposit.formatted_business_date_on}</td>
              <td>{deposit.formatted_deposit_date_on}</td>
              <td>{deposit.market_name}</td>
              <td>{deposit.location_name}</td>
              {/* <td>{deposit.pay_machine_id}</td> */}
              <td>
                {deposit.paystation_character
                  ? `${deposit.location_name}${deposit.paystation_character}`
                  : deposit.location_name}
              </td>
              <td>${deposit.deposit_amount.toFixed(2)}</td>
              <td>{deposit.cashier_email}</td>
              <td>{deposit.bank_depositor_email}</td>
              <td>{deposit.is_verified_in_bank}</td>
              <td>{deposit.bank_description}</td>
              <td>{deposit.bank_account_last4_digits}</td>
              <td>${deposit.bank_deposit_amount.toFixed(2)}</td>
              <td>{deposit.formatted_bank_deposit_date_on}</td>
              <td>
                {deposit.variance < 0
                  ? `-$${Math.abs(deposit.variance).toFixed(2)}`
                  : `$${deposit.variance.toFixed(2)}`}
              </td>
              <td>{deposit.shift}</td>
              <td>{deposit.bank_receipt_id}</td>
              <td className="no-wrap">
                {deposit.formatted_digital_pull_time_at}
              </td>
              <td className="no-wrap">
                {deposit.formatted_digital_pull_2_time_at}
              </td>
              <td className="no-wrap">{deposit.formatted_created_at}</td>
              <td>
                {deposit.files &&
                  deposit.files.split("\n").map((file, index) => (
                    <div key={index}>
                      <a href={file} download>
                        {file}
                      </a>
                    </div>
                  ))}
              </td>
              {permissions.canEdit && (
                <td>
                  <Link
                    to={`/react_cash_deposits/${deposit.id}/edit`}
                    className="btn btn-primary editButton"
                  >
                    Edit
                  </Link>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CashDeposits;
