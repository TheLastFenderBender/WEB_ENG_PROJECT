// Import React and React Hooks
import React, { useState } from 'react';

// Import the SearchBar and FlightGrid components from the previous examples
import SearchBar from './SearchBar';
import FlightGrid from './FlightGrid';
import FlightManagerButtons from './FlightManagerButtons';

// Define a function that returns a JSX element
const FlightManagerPage = () => {
  // Define a state variable for the flight data
  const [flightData, setFlightData] = useState([]);

  // Define a handler function that updates the flight data state
  const handleSearch = (data) => {
    // Set the flight data state to the data
    setFlightData(data);
  };

  // Return the JSX element
  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <FlightGrid flights={flightData} />
      <FlightManagerButtons />
    </div>
  );
};

// Export the component
export default FlightManagerPage;
