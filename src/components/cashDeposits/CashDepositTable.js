import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_CASH_DEPOSITS } from "../../graphql/queries/cash_deposits_query";

export default function CashDepositTable({ isFilteredData, isFind }) {
  const [deposits, setDeposits] = useState([]);
  const { data: depositsData, refetch: refetchDeposits } =
    useQuery(GET_CASH_DEPOSITS);

  useEffect(() => {
    console.log("Raw isFilteredData:", isFilteredData);
    if (isFind) {
      if (isFilteredData && isFilteredData.length > 0) {
        const formattedData = isFilteredData.map((deposit) => {
          return {
            id: deposit.id,
            bag_number: deposit.bag_number,
            deposit_type_text:
              deposit.deposit_type.charAt(0).toUpperCase() +
              deposit.deposit_type.slice(1).replace("_", " "),
            formatted_business_date_on: formatDate(deposit.business_date_on),
            formatted_deposit_date_on: formatDate(deposit.deposit_date_on),
            market_name: deposit.market_name || "",
            location_name: deposit.location_name || "",
            pay_machine_id: deposit.pay_machine_id,
            deposit_amount: deposit.deposit_amount_cents / 100,
            cashier_email: deposit.cashier_email || "",
            bank_depositor_email: deposit.bank_depositor_email || "",
            is_verified_in_bank: deposit.is_verified_in_bank ? "Yes" : "No",
            bank_description: deposit.bank_description,
            bank_account_last4_digits: deposit.bank_account_last4_digits,
            bank_deposit_amount: deposit.bank_deposit_amount_cents / 100,
            formatted_bank_deposit_date_on: formatDate(
              deposit.bank_deposit_date_on
            ),
            variance:
              (deposit.bank_deposit_amount_cents -
                deposit.deposit_amount_cents) /
              100,
            shift: deposit.shift,
            bank_receipt_id: deposit.bank_receipt_id,
            formatted_digital_pull_time_at: deposit.digital_pull_time_at,
            formatted_digital_pull_2_time_at: deposit.digital_pull_2_time_at,
            formatted_created_at: deposit.created_at,
            files: deposit.files
              ? deposit.files
                  .map((file) =>
                    file.url.substring(file.url.lastIndexOf("/") + 1)
                  )
                  .join("\n")
              : "",
          };
        });
        setDeposits(formattedData);
      } else {
        setDeposits([]);
      }
    } else if (depositsData && depositsData.cash_deposits) {
      const mappedDeposits = depositsData.cash_deposits.map((deposit) => ({
        id: deposit.id,
        bag_number: deposit.bag_number,
        deposit_type_text:
          deposit.deposit_type.charAt(0).toUpperCase() +
          deposit.deposit_type.slice(1).replace("_", " "),
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
          deposit.bank_deposit_amount_cents / 100 -
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
  }, [depositsData, isFilteredData]);

  useEffect(() => {
    refetchDeposits();
  }, [refetchDeposits]);

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

  if (!Array.isArray(deposits)) {
    return <p>No deposits found.</p>;
  }

  const permissions = {
    canEdit: true,
  };

  return (
    <div className="container-fluid cash-deposits-container">
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
                    <a key={index} href={file} download>
                      {file}
                    </a>
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
}
