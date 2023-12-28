import React, { useState } from 'react';
import './Flight.css';
import NavBar from '../NavBar';

const AddAircraft = () => {
    const [aircraftData, setAircraftData] = useState({
        aircraftID: 0,
        model: '',
        capacity: 0,
    });

    const handleChange = (e) => {
        setAircraftData({ ...aircraftData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(aircraftData);
        try {
            const response = await fetch('http://localhost:3000/aircrafts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(aircraftData)
            });
            const data = await response.json();
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
                    <label htmlFor="aircraftID">Aircraft ID:</label>
                    <input
                        type="number"
                        id="aircraftID"
                        name="aircraftID"
                        value={aircraftData.aircraftID}
                        onChange={handleChange}
                        placeholder="Aircraft ID"
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="model">Model:</label>
                    <input
                        type="text"
                        id="model"
                        name="model"
                        value={aircraftData.model}
                        onChange={handleChange}
                        placeholder="model"
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="capacity">Capacity:</label>
                    <input
                        type="number"
                        id="capacity"
                        name="capacity"
                        value={aircraftData.capacity}
                        onChange={handleChange}
                        placeholder="Capacity"
                    />
                </div>
                <button type="submit" className="submit-button">Add Flight</button>
            </form>
        </>
    );
};

export default AddAircraft;