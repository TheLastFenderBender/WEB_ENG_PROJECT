import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Flight.css';
import NavBar from './NavBar';



const UpdateFlight = () => {
    const { flightNumber } = useParams();
    const [flightData, setFlightData] = useState({
        airline: '',
        aircraftID: 0,
        routeID: 0,
        departure: '',
        arrival: '',
        date: Date.now(),
        time: '',
        availableSeats: 0,
        flightType: '',
        flightClass: '',
        prices: {
            economy: 0,
            business: 0
        },
        status: 'scheduled'
    });

    useEffect(() => {
        const getFlight = async () => {
            try {
                const response = await fetch(`http://localhost:3000/flights/${flightNumber}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                setFlightData(data);
            } catch (error) {
                console.error(error);
            }
        };
        getFlight();
    }, []);

    const handleChange = (e) => {
        if (e.target.name === 'economy' || e.target.name === 'business') {
            setFlightData({ ...flightData, prices: { ...flightData.prices, [e.target.name]: e.target.value } });
        } else {
            setFlightData({ ...flightData, [e.target.name]: e.target.value });
        }
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
                <div className="input-group">
                    <label htmlFor="flightType">Flight Type:</label>
                    <select id="flightType" name="flightType" value={flightData.flightType} onChange={handleChange}>
                        <option value="">Select Flight Type</option>
                        <option value="one-way">One-way</option>
                    </select>
                </div>
                <div className="input-group">
                    <label htmlFor="flightClass">Flight Class:</label>
                    <select id="flightClass" name="flightClass" value={flightData.flightClass} onChange={handleChange}>
                        <option value="">Select Flight Class</option>
                        <option value="economy">Economy</option>
                        <option value="business">Business</option>
                    </select>
                </div>
                <div className="input-group">
                    <label htmlFor="economy">Economy Price:</label>
                    <input type="number" id="economy" name="economy" value={flightData.prices.economy} onChange={handleChange} placeholder="Economy Price" />
                </div>
                <div className="input-group">
                    <label htmlFor="business">Business Price:</label>
                    <input type="number" id="business" name="business" value={flightData.prices.business} onChange={handleChange} placeholder="Business Price" />
                </div>
                <div className="input-group">
                    <label htmlFor="status">Status:</label>
                    <select id="status" name="status" value={flightData.status} onChange={handleChange}>
                        <option value="scheduled">Scheduled</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="postponed">Postponed</option>
                    </select>
                </div>
                <button type="submit" className="submit-button">Update Flight</button>
            </form>
        </>
    );
};

export default UpdateFlight;