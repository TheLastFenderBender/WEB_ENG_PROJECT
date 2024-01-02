import React, {useEffect, useState} from 'react';
import NavBar from './SuperAdminNavbar';
import './SuperAdminStyles/FlightHistory.css'
import Axios from 'axios';

export default function FlightHistory() {

    const [flights, setFlights] = useState([]);

    useEffect(() => {
        const fetchFlights = async () => {
            try {
                const flightResponse = await Axios.get('http://127.0.0.1:3000/flighthistory');
                setFlights(flightResponse.data);
            } catch (error) {
                console.error('Error getting flight data: ', error);
            }
        };

        fetchFlights();
    }, []);

    return (
        <>
            <NavBar></NavBar>
            <div className='SATitle'>
                <h1>Flight History</h1>
                <h3>View Previous Completed Flights</h3>
            </div>
            <div className='flightHContainer'>
                <table className='flightHTable'>
                    <thead>
                        <tr>
                            <th>Flight No.</th>
                            <th>Airline</th>
                            <th>AirCraft ID</th>
                            <th>Departure</th>
                            <th>Arrival</th>
                            <th>Date</th>
                            <th>Flight Type</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            flights.map((flight) => (
                                <tr key={flight.flightNumber}>
                                    <td>{flight.flightNumber}</td>
                                    <td>{flight.airline}</td>
                                    <td>{flight.aircraftID}</td>
                                    <td>{flight.departure}</td>
                                    <td>{flight.arrival}</td>
                                    <td>{flight.date.split('T')[0]}</td>
                                    <td>{flight.flightType}</td>
                                    <td>{flight.status}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}