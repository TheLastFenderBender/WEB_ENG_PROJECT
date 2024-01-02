import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Flight.css';
import NavBar from './NavBar';

const AddAircraft = () => {
    const { aircraftID } = useParams();
    const [aircraftData, setAircraftData] = useState({
        model: '',
        capacity: 0,
    });

    useEffect(() => {
        const getAircraft = async () => {
            try {
                const response = await fetch(`http://localhost:3000/aircrafts/${aircraftID}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                setAircraftData(data);
            } catch (error) {
                console.error(error);
            }
        };
        getAircraft();
    }, []);

    const handleChange = (e) => {
        setAircraftData({ ...aircraftData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(aircraftData);
        try {
            const response = await fetch(`http://localhost:3000/aircrafts/${aircraftID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(aircraftData)
            });
            const data = await response.json();
            alert('Aircraft Updated successfully');
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
                <button type="submit" className="submit-button">Update Aircraft</button>
            </form>
        </>
    );
};

export default AddAircraft;