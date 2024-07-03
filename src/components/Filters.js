import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Filters = ({ onSubmit }) => {
  const [filterParams, setFilterParams] = useState({
    search: '',
    market_ids: [],
    location_ids: [],
    deposit_types: [],
    created_at_from: '',
    created_at_until: '',
    deposit_date_on_from: '',
    deposit_date_on_until: '',
  });

  const [marketSelectOptions, setMarketSelectOptions] = useState([]);
  const [allAccessibleLocations, setAllAccessibleLocations] = useState([]);
  const depositTypes = ["Cash", "Check", "Credit"]; // Replace with your actual deposit types

  useEffect(() => {
    // Fetch market select options and accessible locations from API or define them statically
    axios.get('/api/market_select_options')
      .then(response => {
        setMarketSelectOptions(response.data);
      })
      .catch(error => {
        console.error('Error fetching market select options', error);
      });

    axios.get('/api/accessible_locations')
      .then(response => {
        setAllAccessibleLocations(response.data);
      })
      .catch(error => {
        console.error('Error fetching accessible locations', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilterParams({
      ...filterParams,
      [name]: value,
    });
  };

  const handleMultiSelectChange = (name, value) => {
    setFilterParams({
      ...filterParams,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(filterParams);
  };

  return (
    <form onSubmit={handleSubmit} className="form-horizontal">
      <div className="row form-group">
        <div className="col-sm-12 form-group">
          <div className="input-group">
            <div className="input-group-addon">
              <i className="fa fa-search"></i>
            </div>
            <input
              type="text"
              name="search"
              value={filterParams.search}
              onChange={handleChange}
              placeholder="Search by Pay Machine ID, Bag Number"
              className="form-control"
            />
          </div>
        </div>
      </div>

      <div className="row form-group">
        <div className="col-sm-4">
          <select
            name="market_ids"
            value={filterParams.market_ids}
            onChange={(e) => handleMultiSelectChange('market_ids', Array.from(e.target.selectedOptions, option => option.value))}
            className="form-control js-selectize"
            multiple
          >
            {marketSelectOptions.map(option => (
              <option key={option.id} value={option.id}>{option.name}</option>
            ))}
          </select>
        </div>
        <div className="col-sm-4">
          <select
            name="location_ids"
            value={filterParams.location_ids}
            onChange={(e) => handleMultiSelectChange('location_ids', Array.from(e.target.selectedOptions, option => option.value))}
            className="form-control js-selectize"
            multiple
          >
            {allAccessibleLocations.map(location => (
              <option key={location.id} value={location.id}>{location.name}</option>
            ))}
          </select>
        </div>
        <div className="col-sm-4">
          <select
            name="deposit_types"
            value={filterParams.deposit_types}
            onChange={(e) => handleMultiSelectChange('deposit_types', Array.from(e.target.selectedOptions, option => option.value))}
            className="form-control js-selectize"
            multiple
          >
            {depositTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="row form-group">
        <div className="col-sm-6">
          <input
            type="datetime-local"
            name="created_at_from"
            value={filterParams.created_at_from}
            onChange={handleChange}
            className="form-control datepicker-input js-date-time-picker"
            placeholder={`Created From - ${Intl.DateTimeFormat().resolvedOptions().timeZone}`}
          />
        </div>
        <div className="col-sm-6">
          <input
            type="datetime-local"
            name="created_at_until"
            value={filterParams.created_at_until}
            onChange={handleChange}
            className="form-control datepicker-input js-date-time-picker"
            placeholder={`Created Until - ${Intl.DateTimeFormat().resolvedOptions().timeZone}`}
          />
        </div>
      </div>

      <div className="row form-group">
        <div className="col-sm-6">
          <input
            type="datetime-local"
            name="deposit_date_on_from"
            value={filterParams.deposit_date_on_from}
            onChange={handleChange}
            className="form-control datepicker-input js-date-time-picker"
            placeholder={`Deposit Date From - ${Intl.DateTimeFormat().resolvedOptions().timeZone}`}
          />
        </div>
        <div className="col-sm-6">
          <input
            type="datetime-local"
            name="deposit_date_on_until"
            value={filterParams.deposit_date_on_until}
            onChange={handleChange}
            className="form-control datepicker-input js-date-time-picker"
            placeholder={`Deposit Date Until - ${Intl.DateTimeFormat().resolvedOptions().timeZone}`}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12">
          <button type="submit" className="btn btn-primary pull-right">Find</button>
        </div>
      </div>
    </form>
  );
};

export default Filters;
