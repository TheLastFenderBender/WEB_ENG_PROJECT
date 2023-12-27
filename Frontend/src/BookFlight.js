// BookFlight.js
import React, { useState } from 'react';
import NavBar from './UserNavbar';
import BookSearch from './BookSearch';

const BookFlight = () => {
    const [searchParams, setSearchParams] = useState({
        origin: '',
        destination: '',
        departureDate: '',
        returnDate: '',
        tripType: 'one-way',
        // other parameters...
    });

    // Dummy flight data (replace this with actual flight data)
    const flights = [
        {
            id: 1,
            departureInfo: 'Flight 1 Departure - Destination - Date',
            arrivalInfo: 'Flight 1 Arrival - Destination - Date',
            date: 'Date 1',
        },
        {
            id: 2,
            departureInfo: 'Flight 2 Departure - Destination - Date',
            arrivalInfo: 'Flight 2 Arrival - Destination - Date',
            date: 'Date 2',
        },
        // Add more flight objects as needed
    ];
    const [currentFlightType, setCurrentFlightType] = useState('one-way'); // State to hold current flight type

    const handleFlightTypeChange = (flightType) => {
        setCurrentFlightType(flightType); // Update flight type based on selection
    };

    // Function to filter flights based on departure date
    const filterFlightsByDate = (flights, date) => {
        return flights.filter((flight) => flight.date === date);
    };

    // Dummy flight data for the entered date (replace this with filtered data)
    const flightsForEnteredDate = filterFlightsByDate(flights, searchParams.departureDate);


    const handleSearchParamsChange = (newSearchParams) => {
        setSearchParams(newSearchParams);
    };

    return (
        <div>
            <NavBar />
            <BookSearch
                onSearchParamsChange={handleSearchParamsChange}
                onFlightTypeChange={handleFlightTypeChange} // Pass the flight type change handler
            />

            {/* You can use searchParams here for other purposes if needed */}

            {/* Display Departure and Return flights based on trip type */}
            {currentFlightType === 'return' && (
                <div>
                    <h3>Select your departure flight from {searchParams.origin} to {searchParams.destination}</h3>
                    <p>Date: {searchParams.departureDate}</p>

                    {/* Display flights on the entered date */}
                    <div>
                        {/* Filter flights for the entered date */}
                        {/* flightsForEnteredDate is an array of flights on the entered date */}
                        {flightsForEnteredDate.length > 0 ? (
                            <div>
                                {flightsForEnteredDate.map((flight) => (
                                    <div key={flight.id}>
                                        <p>{flight.departureInfo}</p>
                                        <p>{flight.arrivalInfo}</p>
                                        <p>{flight.date}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No flights available on the entered date for return.</p>
                        )}
                    </div>

                    {/* Display flights on other dates */}
                    <div>
                        <h4>Other Dates:</h4>
                        {/* Loop through other dates and display flights */}
                        {/* ... */}
                    </div>
                </div>
            )}

            {currentFlightType === 'one-way' && (
                <div>
                    <h3>Select your departure flight from {searchParams.origin} to {searchParams.destination}</h3>
                    <p>Date: {searchParams.departureDate}</p>

                    {/* Display flights for one-way trip */}
                    <div>
                        {/* Replace this with logic to display one-way flights */}
                        {/* For example, if you have a list of one-way flights, loop through and display */}
                        {flightsForEnteredDate.length > 0 ? (
                            <div>
                                {flightsForEnteredDate.map((flight) => (
                                    <div key={flight.id}>
                                        <p>{flight.departureInfo}</p>
                                        <p>{flight.arrivalInfo}</p>
                                        <p>{flight.date}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No one-way flights available on the entered date.</p>
                        )}
                    </div>
                </div>
            )}


        </div>
    );
};

export default BookFlight;
