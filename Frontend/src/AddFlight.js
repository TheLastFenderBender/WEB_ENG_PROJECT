import React, { useState } from 'react';
import './Flight.css';

const AddFlight = () => {
    const [flightData, setFlightData] = useState({
        flightNumber: 0,
        airline: '',
        aircraftID: 0,
        departure: '',
        arrival: '',
        date: Date.now(),
        time: '',
        availableSeats: 0
    });

    const handleChange = (e) => {
        setFlightData({ ...flightData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(flightData);
        try {
            const response = await fetch('http://localhost:3000/flights', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(flightData)
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form className="add-flight-form" onSubmit={handleSubmit}>
            <div className="input-group">
                <label htmlFor="flightNumber">Flight Number:</label>
                <input
                    type="number"
                    id="flightNumber"
                    name="flightNumber"
                    value={flightData.flightNumber}
                    onChange={handleChange}
                    placeholder="Flight Number"
                />
            </div>
            <div className="input-group">
                <label htmlFor="airline">Airline:</label>
                <input
                    type="text"
                    id="airline"
                    name="airline"
                    value={flightData.airline}
                    onChange={handleChange}
                    placeholder="Airline"
                />
            </div>
            <div className="input-group">
                <label htmlFor="aircraftID">Aircraft ID:</label>
                <input
                    type="number"
                    id="aircraftID"
                    name="aircraftID"
                    value={flightData.aircraftID}
                    onChange={handleChange}
                    placeholder="Aircraft ID"
                />
            </div>
            <div className="input-group">
                <label htmlFor="departure">Departure:</label>
                <input
                    type="text"
                    id="departure"
                    name="departure"
                    value={flightData.departure}
                    onChange={handleChange}
                    placeholder="Departure"
                />
            </div>
            <div className="input-group">
                <label htmlFor="arrival">Arrival:</label>
                <input
                    type="text"
                    id="arrival"
                    name="arrival"
                    value={flightData.arrival}
                    onChange={handleChange}
                    placeholder="Arrival"
                />
            </div>
            <div className="input-group">
                <label htmlFor="date">Date:</label>
                <input
                    type="date"
                    id="date"
                    name="date"
                    value={flightData.date}
                    onChange={handleChange}
                />
            </div>
            <div className="input-group">
                <label htmlFor="time">Time:</label>
                <input
                    type="time"
                    id="time"
                    name="time"
                    value={flightData.time}
                    onChange={handleChange}
                />
            </div>
            <div className="input-group">
                <label htmlFor="availableSeats">Available Seats:</label>
                <input
                    type="number"
                    id="availableSeats"
                    name="availableSeats"
                    value={flightData.availableSeats}
                    onChange={handleChange}
                    placeholder="Available Seats"
                />
            </div>
            <button type="submit" className="submit-button">Add Flight</button>
        </form>
    );
};

export default AddFlight;