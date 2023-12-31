import React, {useEffect, useState} from 'react';
import NavBar from './SuperAdminNavbar';
import './SuperAdminStyles/FlightHistory.css'

export default function FlightHistory() {

    const [flights, setFlights] = useState([]);

    useEffect(() => {
        const fetchFlights = async () => {
            try {
                const flightResponse = await fetch('/flights/history');
                const flightData = await flightResponse.json();
                setFlights(flightData);
            } catch (error) {
                console.error('Error getting flight data: ', error);
            }
        }

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

            </div>
        </>
    )
}