// Import React and React Hooks
import React, { useState } from 'react';

// Import the SearchBar and FlightGrid components from the previous examples
import SearchBar from './SearchBar';
import FlightGrid from './FlightGrid';
import FlightManagerButtons from './FlightManagerButtons';
import NavBar from '../NavBar';

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
      <NavBar />
      <br></br>
      <SearchBar onSearch={handleSearch} />
      <br></br>
      <FlightManagerButtons />
      <br></br>
      <br></br>
      <FlightGrid flights={flightData} />
    </div>
  );
};

// Export the component
export default FlightManagerPage;
