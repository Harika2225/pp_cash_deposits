import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { INSERT_CASH_DEPOSIT } from "./mutations/cash_deposits_mutations";
import "./CashDepositsForm.css";
import { Link, useNavigate } from "react-router-dom";
import { GET_CASH_DEPOSITS } from "./queries/cash_deposits_query";

const CashDepositForm = ({ cashDepositId }) => {
  const [formData, setFormData] = useState({
    deposit_type: "payMachine",
    bag_number: "",
    deposit_date_on: "",
    business_date_on: "",
    bank_receipt_id: "",
    market: "",
    location: "",
    paystation_character: "N/A",
    deposit_amount_cents: "",
    cashier_id: "",
    bank_depositor_id: "",
    bank_account_last4_digits: "",
    digital_pull_time_at: "",
    digital_pull_2_time_at: "",
    shift: "",
    files: [],
    is_verified_in_bank: false,
    bank_deposit_date_on: "",
    bank_deposit_amount_cents: "",
    bank_description: "",
  });
  const formatDate = (date) => {
    const pad = (num) => String(num).padStart(2, "0");
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
      date.getDate()
    )}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
      date.getSeconds()
    )}Z`;
  };

  const now = new Date();
  const currentTimestamp = formatDate(now);

  const initialVariables = {
    bank_depositor_id: formData.bank_depositor_id,
    cashier_id: formData.cashier_id,
    location_id: formData.location,
    market_id: formData.market,
    bank_deposit_date_on: formData.bank_deposit_date_on,
    business_date_on: formData.business_date_on,
    deposit_date_on: formData.deposit_date_on,
    bag_number: formData.bag_number,
    created_at: currentTimestamp,
    updated_at: currentTimestamp,
    bank_description: formData.bank_description,
    shift: formData.shift,
    bank_account_last4_digits: formData.bank_account_last4_digits,
    digital_pull_time_at: formData.digital_pull_time_at,
    digital_pull_2_time_at: formData.digital_pull_2_time_at,
    is_verified_in_bank: formData.is_verified_in_bank,
    deposit_amount_cents: formData.deposit_amount_cents,
    bank_deposit_amount_cents: formData.bank_deposit_amount_cents,
    files: formData.files.map((file) => file.name), // Convert files to their names
  };

  if (cashDepositId) {
    initialVariables.created_at = formData.created_at;
  }

  const navigate = useNavigate();
  const [insertCashDeposit] = useMutation(INSERT_CASH_DEPOSIT);

  const generateOptions = () => {
    const options = [];
    for (let i = 65; i <= 90; i++) {
      options.push(String.fromCharCode(i));
    }
    return options;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await insertCashDeposit({
        variables: initialVariables,
        refetchQueries: [{ query: GET_CASH_DEPOSITS }],
      });
      console.log("Cash deposit created successfully!", data);
      navigate("/react_cash_deposits");
    } catch (error) {
      console.error("There was an error submitting the data!", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : files ? Array.from(files) : value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="cash-deposit-form container">
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label>Deposit Type</label>
            <select
              name="deposit_type"
              value={formData.deposit_type}
              onChange={handleChange}
              disabled={!!cashDepositId}
              className="form-control"
            >
              <option value="payMachine">Pay Machine</option>
              <option value="valet">Valet</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label>Bag Number</label>
            <input
              type="text"
              name="bag_number"
              value={formData.bag_number}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="flexRow ">
            <div className="form-group col-md-6">
              <label>Deposit Date</label>
              <input
                type="date"
                name="deposit_date_on"
                value={formData.deposit_date_on}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="form-group col-md-6">
              <label>Pull Date</label>
              <input
                type="date"
                name="business_date_on"
                value={formData.business_date_on}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
          </div>
          <div className="flexRow">
            <div className="form-group col-md-4">
              <label>Market Group</label>
              <input
                type="text"
                name="market"
                value={formData.market}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="form-group col-md-4">
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="form-group col-md-4">
              <label>Pay Machine ID</label>
              <select
                name="paystation_character"
                value={formData.paystation_character}
                onChange={handleChange}
                className="form-control"
              >
                {generateOptions().map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>Deposit Amount</label>
            <input
              type="number"
              name="deposit_amount_cents"
              value={formData.deposit_amount_cents}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Employee Name</label>
            <input
              type="text"
              name="cashier_id"
              value={formData.cashier_id}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label>Bank Depositor</label>
            <input
              type="text"
              name="bank_depositor_id"
              value={formData.bank_depositor_id}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Bank Account last 4 Digits</label>
            <input
              type="text"
              name="bank_account_last4_digits"
              value={formData.bank_account_last4_digits}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="flexRow">
            <div className="form-group col-md-6">
              <label>Digital Pull Time</label>
              <input
                type="datetime-local"
                name="digital_pull_time_at"
                value={formData.digital_pull_time_at}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="form-group col-md-6">
              <label>Digital Pull 2 Time</label>
              <input
                type="datetime-local"
                name="digital_pull_2_time_at"
                value={formData.digital_pull_2_time_at}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label>Shift</label>
            <input
              type="text"
              name="shift"
              value={formData.shift}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label>Attachments</label>
            <input
              type="file"
              name="files"
              onChange={handleChange}
              className="form-control"
              multiple
              required
            />
          </div>
        </div>
        <div className="col-md-6 accounting-only">
          <h2>ACCOUNTING ONLY</h2>
          <div className="form-check flex">
            <input
              type="checkbox"
              name="is_verified_in_bank"
              checked={formData.is_verified_in_bank}
              onChange={handleChange}
              class="form-check"
            />
            <label>Verified in the bank</label>
          </div>
          <div className="flex">
            <div className="form-group col-md-6">
              <label>Verified Bank Deposit Date</label>
              <input
                type="date"
                name="bank_deposit_date_on"
                value={formData.bank_deposit_date_on}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group col-md-6">
              <label>Verified Bank Deposit Amount</label>
              <input
                type="number"
                name="bank_deposit_cents"
                value={formData.bank_deposit_cents}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </div>
          <div className="form-group">
            <label>Bank Description</label>
            <textarea
              name="bank_description"
              value={formData.bank_description}
              onChange={handleChange}
              className="form-control"
            ></textarea>
          </div>
        </div>
      </div>
      <button type="submit" className="btn btn-primary">
        Save
      </button>
      <Link to={"/react_cash_deposits"} className="btn btn-secondary">
        Cancel
      </Link>
    </form>
  );
};

export default CashDepositForm;
