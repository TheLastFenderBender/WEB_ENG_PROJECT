// Import React, lodash and Material-UI components
import React, { useState, useEffect } from 'react';
import { debounce } from 'lodash';
import { TextField } from '@mui/material';

// Import the getFlightData function from the previous example
import getFlightData from './getFlightData';

// Define a function that takes a callback function as a prop and returns a JSX element
const SearchBar = ({ onSearch }) => {
  // Define a state variable for the search input
  const [searchInput, setSearchInput] = useState('');

  // Define a debounced function that takes the search input and invokes the callback function with the flight data
  const debouncedSearch = debounce((searchInput) => {
    // Call the getFlightData function with the search input and handle the promise
    getFlightData(searchInput)
      .then((response) => {
        // Get the flight data from the response
        const flightData = response.data.data;

        // Invoke the callback function with the flight data
        onSearch(flightData);
      })
      .catch((error) => {
        // Handle the error
        console.error(error);
      });
  }, 500); // Set the debounce delay to 500 milliseconds

  // Define a useEffect hook that runs whenever the search input changes
  useEffect(() => {
    // Check if the search input is not empty
    if (searchInput) {
      // Call the debounced function with the search input
      debouncedSearch(searchInput);
    } else {
      // If the search input is empty, invoke the callback function with an empty array
      onSearch([]);
    }
  }, [searchInput]); // Set the dependency array to the search input

  // Define a handler function that updates the search input state
  const handleInputChange = (event) => {
    // Get the value from the event target
    const value = event.target.value;

    // Set the search input state to the value
    setSearchInput(value);
  };

  // Return the JSX element
  return (
    <TextField
      label="Search by flight number"
      value={searchInput}
      onChange={handleInputChange}
      fullWidth
    />
  );
};

// Export the component
export default SearchBar;