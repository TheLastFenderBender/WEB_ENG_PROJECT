import React, { useState } from 'react';

// this page will be the landing page for the flight manager.
// it will display all the flights in the database in a tile format.
// each tile will have a button to view the flight details
// and a button to edit the flight details.
// there will also be a button to add a new flight.
// the page will also have a search bar to search for flights by flight number.
// the search bar will be a separate component.
// the flight tiles will be a separate component.
// the flight details will be a separate component.
// the flight edit will be a separate component.
// the flight add will be a separate component.

const FlightManagerPage = () => {

    const response = fetch('http://localhost:3000/flights');
    const flights = response.json();
            

    return (
        <div>
            <h1>Flight Manager Page</h1>
            
        </div>
    );
}

export default FlightManagerPage;