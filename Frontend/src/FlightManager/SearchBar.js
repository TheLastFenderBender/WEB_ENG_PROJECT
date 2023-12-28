import React, { useState, useEffect } from 'react';
import { TextField, Select, MenuItem } from '@mui/material';

import getFlightData from './getFlightData';

const SearchBar = ({ onSearch }) => {
  const [searchInput, setSearchInput] = useState('');
  const [selectedOption, setSelectedOption] = useState('flightNumber');

  
  useEffect(() => {       
    const search = (searchInput, selectedOption) => {
      getFlightData(searchInput, selectedOption)
        .then((flightData) => {
          onSearch(flightData);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    search(searchInput, selectedOption);
  }, [searchInput, selectedOption, onSearch]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchInput(value);
  };

  const handleOptionChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
  };

  return (
    <div className="flex">
      <TextField
        label="Search"
        value={searchInput}
        onChange={handleInputChange}
        fullWidth
      />
      <br></br>
      <br></br>
      <Select
        value={selectedOption}
        onChange={handleOptionChange}
      >
        <MenuItem value="flightNumber">Flight Number</MenuItem>
        <MenuItem value="airline">Airline Name</MenuItem>
        <MenuItem value="departure">Departure Airport</MenuItem>
        <MenuItem value="arrival">Arrival Airport</MenuItem>
        <MenuItem value="date">Date</MenuItem>
      </Select>
    </div>
  );
};

export default SearchBar;