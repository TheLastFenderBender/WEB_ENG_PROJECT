// Import React, lodash and Material-UI components
import React, { useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';
import { TextField, Select, MenuItem } from '@mui/material';

// Import the getFlightData function from the previous example
import getFlightData from './getFlightData';

// Define a function that takes a callback function as a prop and returns a JSX element
const SearchBar = ({ onSearch }) => {
  // Define a state variable for the search input
  const [searchInput, setSearchInput] = useState('');

  // Define a state variable for the selected option
  const [selectedOption, setSelectedOption] = useState('flightNumber');

  // Define a function that takes the search input and the selected option and invokes the callback function with the flight data
  const search = (searchInput, selectedOption) => {
    // Call the getFlightData function with the search input and the selected option and handle the promise
    getFlightData(searchInput, selectedOption)
      .then((flightData) => {
        // Invoke the callback function with the flight data
        onSearch(flightData);
      })
      .catch((error) => {
        // Handle the error
        console.error(error);
      });
  };

  // Create a debounced version of the search function
  const debouncedSearch = debounce(search, 500);

  // Use useCallback to memoize the debounced function
  const memoizedDebouncedSearch = useCallback(debouncedSearch, [debouncedSearch]);

  // Define a useEffect hook that runs whenever the search input or the selected option changes
  useEffect(() => {
    // Check if the search input is not empty
    if (searchInput) {
      // Call the debounced function with the search input and the selected option
      memoizedDebouncedSearch(searchInput, selectedOption);
    } else {
      // If the search input is empty, invoke the callback function with an empty array
      onSearch([]);
    }
  }, [searchInput, selectedOption, onSearch, memoizedDebouncedSearch]); // Add onSearch and memoizedDebouncedSearch to the dependency array

  // Define a handler function that updates the search input state
  const handleInputChange = (event) => {
    // Get the value from the event target
    const value = event.target.value;

    // Set the search input state to the value
    setSearchInput(value);
  };

  // Define a handler function that updates the selected option state
  const handleOptionChange = (event) => {
    // Get the value from the event target
    const value = event.target.value;

    // Set the selected option state to the value
    setSelectedOption(value);
  };

  // Return the JSX element
  return (
    <div className="flex">
      <TextField
        label="Search"
        value={searchInput}
        onChange={handleInputChange}
        fullWidth
      />
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

// Export the component
export default SearchBar;