import React, { useState, useEffect } from 'react';

import AircraftGrid from './AircraftGrid';
import NavBar from './NavBar';

const ViewAircrafts = () => {

    const [aircraftData, setAircraftData] = useState([]);

    
    const getAircrafts = async () => {
        try {
            const response = await fetch("http://localhost:3000/aircrafts");
            const Data = await response.json();

            setAircraftData(Data);
        } catch (error) {
            console.error(error);
        }
    };
    
    useEffect(() => {
        getAircrafts();
    }, []);

  return (
    <div>
      <NavBar />
      <br></br>
      <AircraftGrid aircrafts={aircraftData} />
    </div>
  );
};

export default ViewAircrafts;
