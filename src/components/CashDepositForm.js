import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CashDepositForm = ({ cashDepositId }) => {
  const [formData, setFormData] = useState({
    deposit_type: '',
    bag_number: '',
    deposit_date_on: '',
    business_date_on: '',
    bank_receipt_id: '',
    market: '',
    location: '',
    paystation_character: '',
    deposit_amount: '',
    cashier: '',
    bank_depositor: '',
    bank_account_last4_digits: '',
    digital_pull_time_at: '',
    digital_pull_2_time_at: '',
    shift: '',
    files: null,
    is_verified_in_bank: false,
    bank_deposit_date_on: '',
    bank_deposit_amount: '',
    bank_description: ''
  });

  useEffect(() => {
    if (cashDepositId) {
      // Fetch existing cash deposit data for editing
      axios.get(`/api/cash_deposits/${cashDepositId}`)
        .then(response => {
          setFormData(response.data);
        })
        .catch(error => {
          console.error('There was an error fetching the cash deposit data!', error);
        });
    }
  }, [cashDepositId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cashDepositId) {
      // Update existing cash deposit
      axios.put(`/api/cash_deposits/${cashDepositId}`, formData)
        .then(response => {
          console.log('Cash deposit updated successfully!', response.data);
        })
        .catch(error => {
          console.error('There was an error updating the cash deposit!', error);
        });
    } else {
      // Create new cash deposit
      axios.post('/api/cash_deposits', formData)
        .then(response => {
          console.log('Cash deposit created successfully!', response.data);
        })
        .catch(error => {
          console.error('There was an error creating the cash deposit!', error);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-horizontal">
      <div className="row">
        <div className="col-md-6">
          <div className="row">
            <div className="col-md-6">
              <label>Deposit Type</label>
              <select
                name="deposit_type"
                value={formData.deposit_type}
                onChange={handleChange}
                disabled={!!cashDepositId}
                className="form-control"
              >
                {/* Add options here */}
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <label>Bag Number</label>
              <input
                type="number"
                name="bag_number"
                value={formData.bag_number}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <label>Deposit Date</label>
              <input
                type="date"
                name="deposit_date_on"
                value={formData.deposit_date_on}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="col-md-6">
              <label>Business Date</label>
              <input
                type="date"
                name="business_date_on"
                value={formData.business_date_on}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <label>Bank Receipt ID</label>
              <input
                type="number"
                name="bank_receipt_id"
                value={formData.bank_receipt_id}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <label>Market</label>
              <select
                name="market"
                value={formData.market}
                onChange={handleChange}
                className="form-control"
              >
                {/* Add options here */}
              </select>
            </div>
            <div className="col-md-4">
              <label>Location</label>
              <select
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="form-control"
              >
                {/* Add options here */}
              </select>
            </div>
            <div className="col-md-4">
              <label>Pay Machine ID</label>
              <select
                name="paystation_character"
                value={formData.paystation_character}
                onChange={handleChange}
                className="form-control"
              >
                {/* Add options here */}
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <label>Deposit Amount</label>
              <input
                type="number"
                name="deposit_amount"
                value={formData.deposit_amount}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="col-md-6">
              <label>Cashier</label>
              <select
                name="cashier"
                value={formData.cashier}
                onChange={handleChange}
                className="form-control"
              >
                {/* Add options here */}
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <label>Bank Depositor</label>
              <select
                name="bank_depositor"
                value={formData.bank_depositor}
                onChange={handleChange}
                className="form-control"
              >
                {/* Add options here */}
              </select>
            </div>
            <div className="col-md-6">
              <label>Bank Account last4 digits</label>
              <input
                type="text"
                name="bank_account_last4_digits"
                value={formData.bank_account_last4_digits}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="row">
            <div className="col-md-6">
              <label>Digital Pull Time</label>
              <input
                type="datetime-local"
                name="digital_pull_time_at"
                value={formData.digital_pull_time_at}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="col-md-6">
              <label>Digital Pull 2 Time</label>
              <input
                type="datetime-local"
                name="digital_pull_2_time_at"
                value={formData.digital_pull_2_time_at}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <label>Shift</label>
              <select
                name="shift"
                value={formData.shift}
                onChange={handleChange}
                className="form-control"
              >
                {/* Add options here */}
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <label>Files</label>
              <input
                type="file"
                name="files"
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <label>Verified In Bank</label>
              <input
                type="checkbox"
                name="is_verified_in_bank"
                checked={formData.is_verified_in_bank}
                onChange={(e) => setFormData({
                  ...formData,
                  is_verified_in_bank: e.target.checked
                })}
                className="form-control"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <label>Bank Deposit Date</label>
              <input
                type="date"
                name="bank_deposit_date_on"
                value={formData.bank_deposit_date_on}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="col-md-6">
              <label>Bank Deposit Amount</label>
              <input
                type="number"
                name="bank_deposit_amount"
                value={formData.bank_deposit_amount}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <label>Bank Description</label>
              <input
                type="text"
                name="bank_description"
                value={formData.bank_description}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </div>
        </div>
      </div>
      <button type="submit" className="btn btn-primary">Save</button>
    </form>
  );
};

export default CashDepositForm;
