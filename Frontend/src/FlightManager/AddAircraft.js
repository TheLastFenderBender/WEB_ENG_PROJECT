import React, { useState } from 'react';
import './Flight.css';
import NavBar from './NavBar';

const AddAircraft = () => {
    const [aircraftData, setAircraftData] = useState({
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
            alert('Aircraft Added successfully');
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
                <button type="submit" className="submit-button">Add Aircraft</button>
            </form>
        </>
    );
};

export default AddAircraft;