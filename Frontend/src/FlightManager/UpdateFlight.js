import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './Flight.css';
import NavBar from './NavBar';



const UpdateFlight = () => {
    const { flightNumber } = useParams();
    const [flightData, setFlightData] = useState({
        flightNumber: 0,
        airline: '',
        aircraftID: 0,
        routeID: 0,
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
        try {
            const response = await fetch(`http://localhost:3000/flights/${flightNumber}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(flightData)
            });
            const data = await response.json();
            alert('Flight Updated successfully');
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <NavBar />
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
                    <label htmlFor="routeID">Route ID:</label>
                    <input
                        type="number"
                        id="routeID"
                        name="routeID"
                        value={flightData.routeID}
                        onChange={handleChange}
                        placeholder="Route ID"
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
                <button type="submit" className="submit-button">Update Flight</button>
            </form>
        </>
    );
};

export default UpdateFlight;