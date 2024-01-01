import React, { useState } from 'react';
import './Flight.css';
import NavBar from './NavBar';

const AddRoute = () => {
    const [routeData, setRouteData] = useState({
        departure: '',
        arrival: '',
        distance: 0,
        travelTime: 0,
    });

    const handleChange = (e) => {
        setRouteData({ ...routeData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(routeData);
        try {
            const response = await fetch('http://localhost:3000/routes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(routeData)
            });
            const data = await response.json();
            alert('Route added successfully');
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
                    <label htmlFor="departure">Departure:</label>
                    <input
                        type="text"
                        id="departure"
                        name="departure"
                        value={routeData.departure}
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
                        value={routeData.arrival}
                        onChange={handleChange}
                        placeholder="Arrival"
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="distance">Distance:</label>
                    <input
                        type="number"
                        id="distance"
                        name="distance"
                        value={routeData.distance}
                        onChange={handleChange}
                        placeholder="Distance"
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="travelTime">Travel Time:</label>
                    <input
                        type="number"
                        id="travelTime"
                        name="travelTime"
                        value={routeData.travelTime}
                        onChange={handleChange}
                        placeholder="Travel Time"
                    />
                </div>
                <button type="submit" className="submit-button">Add Route</button>
            </form>
        </>
    );
};

export default AddRoute;