import React, { useState } from 'react';

import SearchBar from './SearchBar';
import FlightGrid from './FlightGrid';
import FlightManagerButtons from './FlightManagerButtons';
import NavBar from './NavBar';

const FlightManagerPage = () => {
  const [flightData, setFlightData] = useState([]);

  const handleSearch = (data) => {
    // Set the flight data state to the data
    setFlightData(data);
  };

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

export default FlightManagerPage;
