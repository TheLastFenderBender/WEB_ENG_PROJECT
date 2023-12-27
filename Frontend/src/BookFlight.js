import React, { useState } from 'react';
import NavBar from './UserNavbar';
import BookSearch from './BookSearch';
import FlightSelectionPopup from './FlightSelectionPopup';
import './BookFlight.css';
import { useNavigate } from 'react-router-dom';



const BookFlight = () => {

    const navigate = useNavigate();

    const [showPopup, setShowPopup] = useState(false); // State to manage the pop-up display
    const [selectedFlight, setSelectedFlight] = useState(null); // State to hold selected flight information

    const [searchParams, setSearchParams] = useState({
        origin: '',
        destination: '',
        departureDate: '',
        returnDate: '',
        tripType: 'one-way',
        // other parameters...
    });

    // Function to handle selection of return flight
    const handleReturnFlightSelection = (selectedClass, flightId) => {
        const flight = displayedFlights.find((flight) => flight.id === flightId);
        const flightInfo = `Flight ${flightId}: ${flight.departureInfo} - ${flight.arrivalInfo}`;
        setSelectedFlight({ flightInfo, selectedClass }); // Set selected flight information

        // Logic to fetch price for the selected flight and class, update 'price' state

        setShowPopup(true); // Show the pop-up
    };

    // Function to handle confirmation of selected flight
    const handleConfirmation = () => {
        // If selectedFlight is not null and it's a return trip, navigate to the final booking page
        if (selectedFlight && currentFlightType === 'return') {
            // Log the details for now
            console.log('Selected Flight:', selectedFlight);

            // Reset states
            setShowPopup(false);
            setSelectedFlight(null);

            // Redirect to the final booking page
            navigate('/FinalBooking'); // Replace 'FinalBooking' with your actual screen name
        } else {
            // For other cases, just close the popup and reset the states
            setShowPopup(false);
            setSelectedFlight(null);
        }
        
    };
    const [displayedFlights, setDisplayedFlights] = useState([]); // State to hold displayed flights


    const handleFlightsFetch = (fetchedFlights) => {
        setDisplayedFlights(fetchedFlights); // Set fetched flights to be displayed
    };

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

    // Inside the BookFlight component

    const [selectedFlightInfo, setSelectedFlightInfo] = useState('');
    const [selectedClass, setSelectedClass] = useState('');

    // Function to handle class selection for a specific flight
    const handleClassSelection = (selectedClass, flightId) => {
        // Here, you might update the state with the selected class and flight information
        // For instance:
        setSelectedClass(selectedClass);
        // Retrieve and set the flight information for the selected flight
        const selectedFlight = displayedFlights.find(flight => flight.id === flightId);
        setSelectedFlightInfo(`Flight ${flightId}: ${selectedFlight.departureInfo} - ${selectedFlight.arrivalInfo}`);
        // Perform any additional actions related to class and flight selection
    };


    return (
        <div>
            <NavBar />
            <BookSearch
                onSearchParamsChange={handleSearchParamsChange}
                onFlightTypeChange={handleFlightTypeChange} // Pass the flight type change handler
                onFlightsFetch={handleFlightsFetch} // Pass the handler to update flights
            />

            {/* You can use searchParams here for other purposes if needed */}

            {/* display pop-up if showPopup is true */}
            {showPopup && (
                <FlightSelectionPopup
                    flightInfo={selectedFlight.flightInfo}
                    selectedClass={selectedFlight.selectedClass}
                    // price= '300000'
                    onConfirm={handleConfirmation}
                />
            )}

            {/* Display Departure and Return flights based on trip type */}
            {currentFlightType === 'return' && (
                <div>
                    {/* Flight details for return type */}
                    {/* Left container for flight details */}
                    <div className="flight-details">
                        <h3>Select your departure flight from {searchParams.origin} to {searchParams.destination}</h3>
                        <p>Date: {searchParams.departureDate}</p>
                        {/* Display flights for return type */}
                        {/* You can add a map function to display flight details */}
                        {/* flightsForEnteredDate is an array of flights on the entered date */}
                        {displayedFlights.length > 0 ? (
                            <div>
                                {displayedFlights.map((flight) => (
                                    <div key={flight.id}>
                                        <p>{flight.departureInfo}</p>
                                        <p>{flight.arrivalInfo}</p>
                                        <p>{flight.date}</p>
                                        {/* Include buttons for economy and business class selection */}
                                        <div>
                                            <button onClick={() => handleReturnFlightSelection('economy', flight.id)}>Economy - Price</button>
                                            <button onClick={() => handleReturnFlightSelection('business', flight.id)}>Business - Price</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No flights available on the entered date for return.</p>
                        )}
                    </div>
                    {/* Right container for class selection */}
                    <div className="class-selection">
                        {/* You can include any additional information or design here */}
                        {/* This section can display the selected flight details */}
                        {/* You might use state to store the selected flight and class */}
                        {/* For instance: */}
                        <p>Selected Flight: {selectedFlightInfo}</p>
                        <p>Selected Class: {selectedClass}</p>
                    </div>
                </div>
            )}

            {currentFlightType === 'one-way' && (
                <div>
                    {/* Flight details for one-way type */}
                    {/* Left container for flight details */}
                    <div className="flight-details">
                        <h3>Select your departure flight from {searchParams.origin} to {searchParams.destination}</h3>
                        <p>Date: {searchParams.departureDate}</p>
                        {/* Display flights for one-way type */}
                        {displayedFlights.length > 0 ? (
                            <div>
                                {displayedFlights.map((flight) => (
                                    <div key={flight.id}>
                                        <p>{flight.departureInfo}</p>
                                        <p>{flight.arrivalInfo}</p>
                                        <p>{flight.date}</p>
                                        {/* Include buttons for economy and business class selection */}
                                        <div>
                                            <button onClick={() => handleClassSelection('economy', flight.id)}>Economy - Price</button>
                                            <button onClick={() => handleClassSelection('business', flight.id)}>Business - Price</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No one-way flights available on the entered date.</p>
                        )}
                    </div>
                    {/* Right container for class selection */}
                    <div className="class-selection">
                        {/* You can include any additional information or design here */}
                        {/* This section can display the selected flight details */}
                        {/* You might use state to store the selected flight and class */}
                        {/* For instance: */}
                        <p>Selected Flight: {selectedFlightInfo}</p>
                        <p>Selected Class: {selectedClass}</p>
                    </div>
                </div>
            )}


        </div>
    );
};

export default BookFlight;
