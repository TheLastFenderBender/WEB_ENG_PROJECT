import React, { useState } from 'react';
import './AddFlight.css';

const AddFlight = () => {
    const [flightData, setFlightData] = useState({
        aircraftID: '',
        departure: '',
        destination: '',
        date: Date.now(),
        time: '',
        availableSeats: ''
    });

    const handleChange = (e) => {
        setFlightData({ ...flightData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(flightData);
        try {
            const response = await fetch('http:/localhost:3000/flights', {
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
                <label htmlFor="aircraftID">Aircraft ID:</label>
                <input
                    type="text"
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
                <label htmlFor="destination">Destination:</label>
                <input
                    type="text"
                    id="destination"
                    name="destination"
                    value={flightData.destination}
                    onChange={handleChange}
                    placeholder="Destination"
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
                    type="text"
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