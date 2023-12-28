import React, { useState } from 'react';
import './BookingComponent.css';
import './SearchFlight.css';
import { useNavigate } from 'react-router-dom';


const SearchFlight = () => {
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [tripType, setTripType] = useState('one-way');
    const [adults, setAdults] = useState(0);
    const [children, setChildren] = useState(0);
    const [infants, setInfants] = useState(0);
    const [flightClass, setFlightClass] = useState('economy');
    const [showPassengerClass, setShowPassengerClass] = useState(false);

    const navigate = useNavigate();

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`/flights?origin=${origin}&destination=${destination}&departureDate=${departureDate}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                navigate('/FlightResults');
            } else {
                // Handle error responses
                console.log('Failed to fetch flights. Please try again.');
            }
        } catch (error) {
            // Handle fetch or other errors
            console.error('Error:', error);
        }



    };



    const handleIncrement = (type) => {
        switch (type) {
            case 'adults':
                setAdults(adults + 1);
                break;
            case 'children':
                setChildren(children + 1);
                break;
            case 'infants':
                setInfants(infants + 1);
                break;
            default:
                break;
        }
    };

    const handleDecrement = (type) => {
        switch (type) {
            case 'adults':
                setAdults(adults > 0 ? adults - 1 : 0);
                break;
            case 'children':
                setChildren(children > 0 ? children - 1 : 0);
                break;
            case 'infants':
                setInfants(infants > 0 ? infants - 1 : 0);
                break;
            default:
                break;
        }
    };

    return (
        <div className="booking-tab">
            <h2>Search Flights</h2>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <label>
                        <input
                            type="radio"
                            value="one-way"
                            checked={tripType === 'one-way'}
                            onChange={() => setTripType('one-way')}
                        />
                        One Way
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="return"
                            checked={tripType === 'return'}
                            onChange={() => setTripType('return')}
                        />
                        Return
                    </label>
                </div>
                {tripType === 'one-way' && (
                    <div>
                        <label>From:</label>
                        <input
                            type="text"
                            value={origin}
                            onChange={(e) => setOrigin(e.target.value)}
                            placeholder="Origin"
                        />
                        <label>To:</label>
                        <input
                            type="text"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            placeholder="Destination"
                        />
                        <label>Departure:</label>
                        <input
                            type="date"
                            value={departureDate}
                            onChange={(e) => setDepartureDate(e.target.value)}
                        />
                    </div>
                )}
                {tripType === 'return' && (
                    <div>
                        <label>From:</label>
                        <input
                            type="text"
                            value={origin}
                            onChange={(e) => setOrigin(e.target.value)}
                            placeholder="Origin"
                        />
                        <label>To:</label>
                        <input
                            type="text"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            placeholder="Destination"
                        />
                        <label>Departure:</label>
                        <input
                            type="date"
                            value={departureDate}
                            onChange={(e) => setDepartureDate(e.target.value)}
                        />
                        <label>Return:</label>
                        <input
                            type="date"
                            value={returnDate}
                            onChange={(e) => setReturnDate(e.target.value)}
                        />
                    </div>
                )}

                <div
                    className="passenger-class-button"
                    onClick={() => setShowPassengerClass(!showPassengerClass)}
                >
                    Passengers/Class
                </div>
                {/* Passenger/Class section */}
                <div className="passenger-class">
                    {/* <button onClick={() => setShowPassengerClass(!showPassengerClass)}>
                        Passengers/Class
                    </button> */}

                    {showPassengerClass && (
                        <div className="passenger-class-content">
                            <h3>Passengers</h3>
                            <hr />
                            <div className="passenger-info">
                                <label style={{ textAlign: 'left' }}>
                                    Adults (12+ years)</label>
                                <span style={{ dsplay: 'inline-block' }}>
                                    <button style={{ marginRight: '15px', marginLeft: '52px', padding: '4px 8px', fontSize: '14px' }} onClick={() => handleDecrement('adults')}>-</button>
                                    {adults}</span>
                                <span> <button style={{ marginLeft: '15px', padding: '4px 8px', fontSize: '14px' }} onClick={() => handleIncrement('adults')}>+</button>
                                </span>
                            </div>
                            <div className="passenger-info">
                                <label style={{ textAlign: 'left' }}>Children (2-11 years) </label>
                                <span> <button style={{ marginRight: '15px', marginLeft: '33px', padding: '4px 8px', fontSize: '14px' }} onClick={() => handleDecrement('children')}>-</button>
                                    {children}</span>
                                <span>
                                    <button style={{ marginRight: '34px', marginLeft: '14px', padding: '4px 8px', fontSize: '14px' }} onClick={() => handleIncrement('children')}>+</button>
                                </span>
                            </div>
                            <div className="passenger-info">
                                <label style={{ textAlign: 'left' }}>Infants (Under 2 years)   </label>
                                <span> <button style={{ marginRight: '15px', marginLeft: '21px', padding: '4px 8px', fontSize: '14px' }} onClick={() => handleDecrement('infants')}>-</button>
                                    {infants}</span>
                                <span>
                                    <button style={{ marginRight: '5px', marginLeft: '13px', padding: '4px 8px', fontSize: '14px' }} onClick={() => handleIncrement('infants')}>+</button>
                                </span>
                            </div>
                            <h3>Class</h3>
                            <hr />
                            <div className="class-selection">
                                <label>
                                    <input
                                        type="radio"
                                        value="economy"
                                        checked={flightClass === 'economy'}
                                        onChange={() => setFlightClass('economy')}
                                    />
                                    Economy
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        value="business"
                                        checked={flightClass === 'business'}
                                        onChange={() => setFlightClass('business')}
                                    />
                                    Business/First
                                </label>
                            </div>

                        </div>
                    )}
                </div>
                <button type="submit">Search Flights</button>
            </form>
        </div>
    );
};

export default SearchFlight;
