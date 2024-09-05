import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import "./CashDepositForm.css";
import { Link, useNavigate } from "react-router-dom";
import { GET_CASH_DEPOSIT_BY_ID } from "../../graphql/queries/cash_deposits_query";
import { GET_MARKETS } from "../../graphql/queries/markets_query";
import { GET_LOCATIONS } from "../../graphql/queries/locations_query";
import { GET_USERS } from "../../graphql/queries/users_query";
import { MdArrowDropDown } from "react-icons/md";
import axios from "axios";
import Select from "react-select";

function CashDepositForm({ cashDepositId }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    deposit_type: "pay_machine",
    bag_number: "",
    deposit_date_on: "",
    business_date_on: "",
    bank_receipt_id: "",
    market_id: "",
    market_name: "",
    location_id: "",
    location_name: "",
    paystation_character: "",
    deposit_amount_cents: "",
    cashier_id: "",
    cashier_name: "",
    bank_depositor_id: "",
    bank_depositor_name: "",
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

  const { loading, data } = useQuery(GET_CASH_DEPOSIT_BY_ID, {
    variables: { id: cashDepositId },
  });

  const {
    loading: marketsLoading,
    error: marketsError,
    data: marketsData,
  } = useQuery(GET_MARKETS);

  useEffect(() => {
    if (
      !marketsLoading &&
      marketsData &&
      marketsData.markets &&
      !cashDepositId
    ) {
      setFormData((prevState) => ({
        ...prevState,
        market: marketsData.markets[0]?.id || "",
      }));
    }
  }, [marketsLoading, marketsData, cashDepositId]);

  const { loading: locationsLoading, data: locationsData } =
    useQuery(GET_LOCATIONS);

  useEffect(() => {
    if (
      !locationsLoading &&
      locationsData &&
      locationsData.locations &&
      !cashDepositId
    ) {
      setFormData((prevState) => ({
        ...prevState,
        location: locationsData.locations[0]?.id || "",
      }));
    }
  }, [locationsLoading, locationsData, cashDepositId]);

  const { loading: usersLoading, data: usersData } = useQuery(GET_USERS);

  useEffect(() => {
    if (!usersLoading && usersData && usersData.users && !cashDepositId) {
      setFormData((prevState) => ({
        ...prevState,
        user: usersData.users[0]?.id || "",
      }));
    }
  }, [usersLoading, usersData, cashDepositId]);

  useEffect(() => {
    if (!loading && data && data.cash_deposits_by_pk) {
      const {
        deposit_type,
        bag_number,
        deposit_date_on,
        business_date_on,
        bank_receipt_id,
        market_id,
        location_id,
        paystation_character,
        deposit_amount_cents,
        cashier_id,
        bank_depositor_id,
        bank_account_last4_digits,
        digital_pull_time_at,
        digital_pull_2_time_at,
        shift,
        bank_deposit_date_on,
        bank_deposit_amount_cents,
        bank_description,
      } = data.cash_deposits_by_pk;

      setFormData({
        deposit_type,
        bag_number,
        deposit_date_on,
        business_date_on,
        bank_receipt_id,
        market_id: market_id || "",
        location_id: location_id || "",
        paystation_character,
        deposit_amount_cents,
        cashier_id: cashier_id || "",
        bank_depositor_id: bank_depositor_id || "",
        bank_account_last4_digits,
        digital_pull_time_at,
        digital_pull_2_time_at,
        shift,
        files: [],
        is_verified_in_bank: false,
        bank_deposit_date_on,
        bank_deposit_amount_cents,
        bank_description,
      });
    }
  }, [loading, data, cashDepositId]);

  const initialVariables = {
    deposit_type: formData.deposit_type,
    bank_depositor_id: formData.bank_depositor_id,
    cashier_id: formData.cashier_id,
    location_id: formData.location_id,
    market_id: formData.market_id,
    bank_deposit_date_on: formData.bank_deposit_date_on,
    business_date_on: formData.business_date_on,
    deposit_date_on: formData.deposit_date_on,
    bag_number: formData.bag_number,
    bank_description: formData.bank_description,
    shift: formData.shift,
    paystation_character: formData.paystation_character,
    bank_account_last4_digits: formData.bank_account_last4_digits,
    digital_pull_time_at: formData.digital_pull_time_at,
    digital_pull_2_time_at: formData.digital_pull_2_time_at,
    is_verified_in_bank: formData.is_verified_in_bank,
    deposit_amount_cents: formData.deposit_amount_cents,
    bank_deposit_amount_cents: formData.bank_deposit_amount_cents,
    bank_receipt_id: formData?.bank_receipt_id,
  };

  const generateOptions = () => {
    const options = [];
    options.push("N/A");
    for (let i = 65; i <= 90; i++) {
      options.push(String.fromCharCode(i));
    }
    return options;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = cashDepositId
        ? `${process.env.REACT_APP_CASH_DEPOSITS}/${cashDepositId}`
        : process.env.REACT_APP_CASH_DEPOSITS;
      const method = cashDepositId ? "PUT" : "POST";

      const formData = new FormData();
      for (const key in initialVariables) {
        if (initialVariables.hasOwnProperty(key)) {
          formData.append(`cash_deposit[${key}]`, initialVariables[key]);
        }
      }
      const fileInput = document.querySelector('input[type="file"]');
      const files = fileInput.files;
      for (let i = 0; i < files.length; i++) {
        formData.append("cash_deposit[files][]", files[i]);
      }

      const response = await axios({
        method,
        url,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(
        `Cash deposit ${cashDepositId ? "updated" : "created"} successfully!`,
        response.data
      );
      navigate("/react_cash_deposits");
    } catch (error) {
      console.error("There was an error submitting the data!", error);
    }
  };

  const [rawValues, setRawValues] = useState({
    deposit_amount_cents:
      (formData.deposit_amount_cents / 100).toFixed(2) || "",
    bank_deposit_amount_cents:
      (formData.bank_deposit_amount_cents / 100).toFixed(2) || "",
  });

  useEffect(() => {
    setRawValues({
      deposit_amount_cents:
        (formData.deposit_amount_cents / 100).toFixed(2) || "",
      bank_deposit_amount_cents:
        (formData.bank_deposit_amount_cents / 100).toFixed(2) || "",
    });
  }, [formData]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (
      name === "deposit_amount_cents" ||
      name === "bank_deposit_amount_cents"
    ) {
      setRawValues((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]:
          type === "checkbox" ? checked : files ? Array.from(files) : value,
      }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    let value = rawValues[name];
    if (value === "") {
      setFormData((prevState) => ({
        ...prevState,
        [name]: "",
      }));
      return;
    }
    if (value && !value.includes(".")) {
      value = `${value}.00`;
    } else if (value && value.endsWith(".")) {
      value = `${value}00`;
    } else if (value && value.match(/\.\d$/)) {
      value = `${value}0`;
    }

    const formattedValue = parseFloat(value) * 100;
    setFormData((prevState) => ({
      ...prevState,
      [name]: formattedValue,
    }));
    setRawValues((prevState) => ({
      ...prevState,
      [name]: (formattedValue / 100).toFixed(2),
    }));
  };

  if (marketsLoading) return <p>Loading markets...</p>;
  if (marketsError) return <p>Error loading markets: {marketsError.message}</p>;

  const sortedMarkets = marketsData?.markets
    ? marketsData.markets
        .filter((market) => market.name.trim() !== "")
        .sort((a, b) => a.name.localeCompare(b.name))
    : [];

  const marketId = Number(formData?.market_id);
  const isMarketVisible = marketsData?.markets.some(
    (market) => market.id === marketId && market.visible
  );

  const sortedLocations = isMarketVisible
    ? locationsData?.locations
        .filter(
          (location) =>
            location.market_id === marketId && location.name.trim() !== ""
        )
        .sort((a, b) => a.name.localeCompare(b.name))
    : [];

  const sortedUsers = usersData?.users
    ? usersData.users
        .filter((user) => user.email)
        .sort((a, b) => a.email.localeCompare(b.email))
    : [];

  const marketOptions = sortedMarkets.map((market) => ({
    value: market.id,
    label: market.name,
  }));

  const locationOptions = sortedLocations.map((location) => ({
    value: location.id,
    label: location.name,
  }));

  const depositTypeOptions = [
    { value: "pay_machine", label: "Pay Machine" },
    { value: "valet", label: "Valet" },
    { value: "other", label: "Other" },
  ];

  const paystationOptions = generateOptions().map((option) => ({
    value: option,
    label: option,
  }));

  const userOptions = sortedUsers.map((user) => ({
    value: user.id,
    label: user.email,
  }));

  const selectedMarket =
    marketOptions.find((option) => option.value === formData.market_id) || null;

  const selectedLocation =
    locationOptions.find((option) => option.value === formData.location_id) ||
    null;

  const selectedDepositType =
    depositTypeOptions.find(
      (option) => option.value === formData.deposit_type
    ) || null;

  const selectedPaystation =
    paystationOptions.find(
      (option) => option.value === formData.paystation_character
    ) || null;

  const selectedCashier =
    userOptions.find((option) => option.value === formData.cashier_id) || null;

  const selectedBankDepositor =
    userOptions.find((option) => option.value === formData.bank_depositor_id) ||
    null;

  const handleDepositTypeChange = (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      deposit_type: selectedOption ? selectedOption.value : "",
    }));
  };

  const handleMarketChange = (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      market_id: selectedOption ? selectedOption.value : "",
      location_id: "",
    }));
  };

  const handleLocationChange = (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      location_id: selectedOption ? selectedOption.value : "",
    }));
  };

  const handlePaystationChange = (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      paystation_character: selectedOption ? selectedOption.value : "",
    }));
  };

  const handleCashierChange = (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      cashier_id: selectedOption ? selectedOption.value : "",
    }));
  };

  const handleBankDepositorChange = (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      bank_depositor_id: selectedOption ? selectedOption.value : "",
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="cash-deposit-form container">
      <div className="row">
        <div className="col-md-6 depositDetails">
          <div className="form-group col-md-6 dropdown">
            <label>Deposit Type</label>
            <div className="select-container">
              <Select
                name="deposit_type"
                value={selectedDepositType}
                onChange={handleDepositTypeChange}
                isDisabled={!!cashDepositId}
                options={depositTypeOptions}
                isSearchable={false}
                className="basic-select"
                classNamePrefix="select"
                components={{
                  DropdownIndicator: null,
                  IndicatorSeparator: null,
                }}
              />
              <span className="right-icon">
                <MdArrowDropDown />
              </span>
            </div>
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
          <div className="flexRow">
            <div className="form-group col-md-6 date">
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
              <label>
                {formData.deposit_type === "pay_machine"
                  ? "Pull Date"
                  : "Bank Receipt ID"}
              </label>
              <input
                type={formData.deposit_type === "pay_machine" ? "date" : "text"}
                name={
                  formData.deposit_type === "pay_machine"
                    ? "business_date_on"
                    : "bank_receipt_id"
                }
                value={
                  formData.deposit_type === "pay_machine"
                    ? formData.business_date_on
                    : formData.bank_receipt_id
                }
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
          </div>
          <div className="flexRow">
            <div className="form-group col-md-4">
              <label>Market Group</label>
              <div className="select-container">
                <Select
                  name="market_id"
                  value={selectedMarket}
                  onChange={handleMarketChange}
                  options={marketOptions}
                  className="basic-select"
                  classNamePrefix="select"
                  isClearable
                  isSearchable={false}
                  placeholder={false}
                  required
                  components={{
                    DropdownIndicator: null,
                    IndicatorSeparator: null,
                  }}
                />
                <span className="right-icon">
                  <MdArrowDropDown />
                </span>
              </div>
            </div>

            <div className="col-md-4 form-group">
              <label>Location</label>
              <div className="select-container">
                <Select
                  name="location_id"
                  value={selectedLocation}
                  onChange={handleLocationChange}
                  options={locationOptions}
                  className="basic-select"
                  classNamePrefix="select"
                  isClearable
                  isSearchable={false}
                  placeholder={false}
                  required
                  components={{
                    DropdownIndicator: null,
                    IndicatorSeparator: null,
                  }}
                />
                <span className="right-icon">
                  <MdArrowDropDown />
                </span>
              </div>
            </div>

            {formData.deposit_type === "pay_machine" && (
              <div className="form-group">
                <label>Pay Machine ID</label>
                <div className="select-container">
                  <Select
                    name="paystation_character"
                    value={selectedPaystation}
                    onChange={handlePaystationChange}
                    options={paystationOptions}
                    className="basic-select"
                    classNamePrefix="select"
                    isSearchable={false}
                    placeholder={"N/A"}
                    components={{
                      DropdownIndicator: null,
                      IndicatorSeparator: null,
                    }}
                  />
                  <span className="right-icon">
                    <MdArrowDropDown />
                  </span>
                </div>
              </div>
            )}
          </div>
          <div className="form-group">
            <label>Deposit Amount</label>
            <input
              type="number"
              name="deposit_amount_cents"
              value={rawValues.deposit_amount_cents}
              onChange={handleChange}
              onBlur={handleBlur}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Employee Name</label>
            <div className="select-container">
              <Select
                name="cashier_id"
                value={selectedCashier}
                onChange={handleCashierChange}
                options={userOptions}
                className="basic-select"
                classNamePrefix="select"
                isClearable
                isSearchable={false}
                placeholder={false}
                required
                components={{
                  DropdownIndicator: null,
                  IndicatorSeparator: null,
                }}
              />
              <span className="right-icon">
                <MdArrowDropDown />
              </span>
            </div>
          </div>

          <div className="form-group">
            <label>Bank Depositor</label>
            <div className="select-container">
              <Select
                name="bank_depositor_id"
                value={selectedBankDepositor}
                onChange={handleBankDepositorChange}
                options={userOptions}
                className="basic-select"
                classNamePrefix="select"
                isClearable
                isSearchable={false}
                placeholder={false}
                required
                components={{
                  DropdownIndicator: null,
                  IndicatorSeparator: null,
                }}
              />
              <span className="right-icon">
                <MdArrowDropDown />
              </span>
            </div>
          </div>
          <div className="form-group">
            <label>Bank Account last 4 Digits</label>
            <input
              type="text"
              name="bank_account_last4_digits"
              value={formData.bank_account_last4_digits}
              maxLength={4}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          {formData.deposit_type === "pay_machine" && (
            <>
              <div className="flexRow">
                <div className="form-group col-md-6 date">
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
            </>
          )}
          <div className="form-group">
            <label>Attachments</label>
            <input
              type="file"
              name="files"
              onChange={handleChange}
              // className="form-control"
              className="file-input"
              multiple
            />
          </div>
        </div>
        <div className="col-md-5 accounting-only">
          <h2>ACCOUNTING ONLY</h2>
          <div className="form-check flexCheckBox">
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
            <div className="form-group col-md-6 date">
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
                name="bank_deposit_amount_cents"
                value={rawValues.bank_deposit_amount_cents}
                onChange={handleChange}
                onBlur={handleBlur}
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
              rows="2"
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
}

export default CashDepositForm;
