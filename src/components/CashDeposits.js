import React from "react";
import { Link } from "react-router-dom";
import "./CashDeposits.css";

const CashDeposits = () => {
  const permissions = {
    canEdit: true, // Replace with your actual permission logic
  };

  const deposits = [
    {
      id: 125,
      bagNumber: "15423",
      depositType: "Valet",
      pullDate: "May 31, 2024",
      depositDate: "May 31, 2024",
      marketName: "Algiers Point",
      locationName: "P6619",
      payMachineID: "P6619",
      depositAmount: "$5,000.00",
      employeeEmail: "rajkumar.prajapti@yopmail.com",
      bankDepositorEmail: "rajkumar.prajapti@yopmail.com",
      verifiedInBank: "No",
      bankDescription: "",
      bankAccountLast4: "5216",
      verifiedBankDepositAmount: "$0.00",
      verifiedBankDepositDate: "",
      variance: "-%5,000.00",
      shift: "",
      bankReceiptID: "120.3",
      digitalPullTime: "",
      digitalPullTime: "",
      createdAt: "05/31/2024 6:31 AM (CDT)",
      files: "	6b7b3e431aa8aab179e78f6173570bf7.PNG",
    },
    {
      id: 124,
      bagNumber: "485123",
      depositType: "Valet",
      pullDate: "May 14, 2024",
      depositDate: "May 14, 2024",
      marketName: "Annapolis",
      locationName: "P2626",
      payMachineID: "P2626",
      depositAmount: "$100.00",
      employeeEmail: "fs-edit-operator@flatstack.com",
      bankDepositorEmail: "mariya.valeeva@flatstack.com",
      verifiedInBank: "No",
      bankDescription: "",
      bankAccountLast4: "5216",
      verifiedBankDepositAmount: "$0.00",
      verifiedBankDepositDate: "",
      variance: "-%100.00",
      shift: "night",
      bankReceiptID: "12220.3",
      digitalPullTime: "",
      digitalPullTime: "",
      createdAt: "05/14/2024 5:14 AM (CDT)",
      files: "	2ae2f7e35ac25c16856c8a2605741c95.jpg",
    },
  ];

  const reportParams = {}; // Replace with your actual report parameters

  const handleExport = () => {
    // Add your export logic here
  };

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
                  to="/new-manage-cash-deposit"
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
          <input
            type="text"
            className="form-control"
            placeholder="Search by Pay Machine ID, Bag Number"
          />
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
            <th>Bank Account Last4</th>
            <th>Verified Bank Deposit Amount</th>
            <th>Verified Bank Deposit Date</th>
            <th>Variance</th>
            <th>Shift</th>
            <th>Bank Receipt ID</th>
            <th>Digital Pull Time</th>
            <th>Digital Pull 2 Time</th>
            <th>Created At</th>
            <th>Files</th>
            {/* {permissions.canEdit && <th>Edit</th>} */}
          </tr>
        </thead>
        <tbody>
          {deposits.map((deposit) => (
            <tr key={deposit.id}>
              <td>{deposit.id}</td>
              <td>{deposit.bagNumber}</td>
              <td>{deposit.depositType}</td>
              <td className="no-wrap">{deposit.pullDate}</td>
              <td>{deposit.depositDate}</td>
              <td>{deposit.marketName}</td>
              <td>{deposit.locationName}</td>
              <td>{deposit.payMachineID}</td>
              <td>{deposit.depositAmount}</td>
              <td>{deposit.employeeEmail}</td>
              <td>{deposit.bankDepositorEmail}</td>
              <td>{deposit.verifiedInBank}</td>
              <td>{deposit.bankDescription}</td>
              <td>{deposit.bankAccountLast4}</td>
              <td>{deposit.verifiedBankDepositAmount}</td>
              <td>{deposit.verifiedBankDepositDate}</td>
              <td>{deposit.variance}</td>
              <td>{deposit.shift}</td>
              <td>{deposit.bankReceiptID}</td>
              <td>{deposit.digitalPullTime}</td>
              <td>{deposit.digitalPull2Time}</td>
              <td>{deposit.createdAt}</td>
              {/* <td>{deposit.files}</td> */}
              <td>
                <a href={deposit.files} download>
                  {deposit.files}
                </a>
              </td>
              {permissions.canEdit && (
                <td>
                  <button className="btn btn-primary editButton">Edit</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination Component should be added here */}
    </div>
  );
};

export default CashDeposits;
