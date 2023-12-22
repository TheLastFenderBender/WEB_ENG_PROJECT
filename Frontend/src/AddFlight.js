import React, { useState } from 'react';

const AddFlight = () => {
    const [flightData, setFlightData] = useState({
        aircraftID: '',
        departure: '',
        destination: '',
        date: '',
        time: '',
        availableSeats: ''
    });

    const handleChange = (e) => {
        setFlightData({ ...flightData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
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
        <form onSubmit={handleSubmit}>
            <input name="aircraftID" value={flightData.aircraftID} onChange={handleChange} placeholder="Aircraft ID" />
            <input name="departure" value={flightData.departure} onChange={handleChange} placeholder="Departure" />
            <input name="destination" value={flightData.destination} onChange={handleChange} placeholder="Destination" />
            <input name="date" value={flightData.date} onChange={handleChange} placeholder="Date" />
            <input name="time" value={flightData.time} onChange={handleChange} placeholder="Time" />
            <input name="availableSeats" value={flightData.availableSeats} onChange={handleChange} placeholder="Available Seats" />
            <button type="submit">Add Flight</button>
        </form>
    );
};

export default AddFlight;