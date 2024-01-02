import React, { useState } from 'react';
import NavBar from './UserNavbar';
import BookSearch from './BookSearch';
import FlightSelectionPopup from './FlightSelectionPopup';
import FlightDetail from './FlightDetail';
import './BookFlight.css';
import { useParams } from 'react-router-dom';

const BookFlight = () => {

    const { userId } = useParams();

    const [flights, setFlights] = useState([]);
    const [searchPerformed, setSearchPerformed] = useState(false);
    const [selectedFlight, setSelectedFlight] = useState(null);
    const [selectedClass, setSelectedClass] = useState('');
    const [showFlightDetail, setShowFlightDetail] = useState(false);


    // Function to fetch flights based on search criteria
    const searchFlights = async (searchParams) => {
        const queryParams = new URLSearchParams(searchParams).toString();
        const url = `http://localhost:3000/flights/search?${queryParams}`;

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                const receivedFlights = data.flights || [];
                setFlights(receivedFlights);
                console.log('Fetched data:', data);
                // setFlights(data);
                console.log('Flights state after setFlights:', flights);
                setSearchPerformed(true);
                console.log('Search performed:', searchPerformed); // Log searchPerformed state

            } else {
                console.log('Failed to fetch flights. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
        }

        // useEffect(() => {
        //     console.log('Flights:', flights);
        //     console.log('Search performed:', searchPerformed);
        // }, [flights, searchPerformed]);

        console.log('Search performed:', searchPerformed); // Log searchPerformed state
        console.log('Flights:', flights); // Log flights state

    };

    const handleFlightSelection = (flight, flightClass) => {
        setSelectedFlight(flight);
        setSelectedClass(flightClass);
    };

    const handleClosePopup = () => {
        setSelectedFlight(null);
        setSelectedClass('');
    };

    const handleFlightDetailsClick = (flight) => {
        setSelectedFlight(flight);
        setShowFlightDetail(true);
    };

    const handleClosePopups = () => {
        setShowFlightDetail(false);
        setSelectedFlight(null);
    };



    return (
        <div>
            <NavBar />
            <BookSearch onSearch={searchFlights} />

            {/* Display flights or message */}
            {searchPerformed ? (
                <div>
                    <h3>Select your departure flight from {flights[0]?.departure || 'unknown departure'} to {flights[0]?.arrival || 'unknown arrival'}</h3>
                    <p>Date: {/* Date for which user searched */}</p>
                    {flights.map((flight, index) => (
                        <div key={index} className="flight-container">
                            <div className="left-container">
                                <div className="row">Flight Number: {flight.flightNumber}</div>
                                <div className="row">Time: {flight.time}</div>
                                <div className="row">Available Seats: {flight.availableSeats}</div>
                                <div className="row">
                                    <a href="#" onClick={() => handleFlightDetailsClick(flight)}>Flight details</a>
                                </div>
                            </div>
                            <div className="right-container">
                                <div className="class-box" onClick={() => handleFlightSelection(flight, 'economy')}>
                                    Economy Class: PKR {flight.Price} 
                                </div>
                                <div className="class-box" onClick={() => handleFlightSelection(flight, 'business')}>
                                    Business Class: PKR {flight.Price}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : null}

            {selectedFlight && selectedClass && (
                <FlightSelectionPopup
                    flight={selectedFlight}
                    flightClass={selectedClass}
                    userId={userId}
                    onClose={handleClosePopup}
                />
            )}

            {showFlightDetail && (
                <FlightDetail
                    flightDetails={selectedFlight}
                    onClose={handleClosePopups}
                />
            )}
        </div>
    );
};

export default BookFlight;