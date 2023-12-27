import React, { useState } from 'react';
import './BookingComponent.css';
// import './SearchFlight.css'; // Import the CSS file used for SearchFlight component

const FlightStatus = () => {
    const [searchBy, setSearchBy] = useState('route');
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [date, setDate] = useState('');
    const [flightNumber, setFlightNumber] = useState('');

    const handleSearchByChange = (value) => {
        setSearchBy(value);
    };

    const handleSearch = () => {
        // Implement the search functionality here
        // Use 'searchBy', 'from', 'to', 'date', and 'flightNumber' states to perform the search
    };

    return (
        <div className="flight-status-tab">
            <h2>Flight Status</h2>
            <div className="search-options">
                <button
                    className={`search-option-button ${searchBy === 'route' ? 'active' : ''}`}
                    onClick={() => handleSearchByChange('route')}
                >
                    By Route
                </button>
                <button
                    className={`search-option-button ${searchBy === 'flightNumber' ? 'active' : ''}`}
                    onClick={() => handleSearchByChange('flightNumber')}
                >
                    By Flight Number
                </button>
            </div>
            <hr />
            {searchBy === 'route' && (
                <form onSubmit={handleSearch}>
                    <div className="search-fields">
                        <label htmlFor="from">From:</label>
                        <input
                            type="text"
                            id="from"
                            value={from}
                            onChange={(e) => setFrom(e.target.value)}
                            placeholder="Origin"
                        />
                        <label htmlFor="to">To:</label>
                        <input
                            type="text"
                            id="to"
                            value={to}
                            onChange={(e) => setTo(e.target.value)}
                            placeholder="Destination"
                        />
                        <label htmlFor="date">Date:</label>
                        <input
                            type="date"
                            id="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>
                    <button type="submit">Search</button>
                </form>
            )}
            {searchBy === 'flightNumber' && (
                <form onSubmit={handleSearch}>
                    <div className="search-fields">
                        <div className="input-row">
                            <label htmlFor="flightNumber">Flight Number:</label>
                            <input
                                type="text"
                                id="flightNumber"
                                value={flightNumber}
                                onChange={(e) => setFlightNumber(e.target.value)}
                                placeholder="Flight Number"
                            />
                        </div>
                        <div className="input-row">
                            <label htmlFor="date">Date:</label>
                            <input
                                type="date"
                                id="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>
                    </div>
                    <button type="submit">Search</button>
                </form>
            )}
        </div>
    );
};

export default FlightStatus;
