import React, {useEffect, useState} from 'react';
import NavBar from './SuperAdminNavbar';
import './SuperAdminStyles/FlightHistory.css'
import Axios from 'axios';


export default function FlightHistory() {

    const [flights, setFlights] = useState([]);

    useEffect(() => {
        const fetchFlights = async () => {
            try {
                const flightResponse = await Axios.get('http://localhost:3000/flights/history');
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
                    <th>
                        <td>Flight No.</td>
                        <td>Airline</td>
                        <td>AirCraft ID</td>
                        <td>Departure</td>
                        <td>Arrival</td>
                        <td>Date</td>
                        <td>Flight Type</td>
                        <td>Status</td>
                    </th>
                    {
                        flights.map((flight) => {
                            <tr>
                                <td>{flight.flighNumber}</td>
                                <td>{flight.airline}</td>
                                <td>{flight.aircraftID}</td>
                                <td>{flight.departure}</td>
                                <td>{flight.arrival}</td>
                                <td>{flight.date}</td>
                                <td>{flight.flightType}</td>
                                <td>{flight.status}</td>
                            </tr>
                        })
                    }
                </table>
            </div>
        </>
    )
}