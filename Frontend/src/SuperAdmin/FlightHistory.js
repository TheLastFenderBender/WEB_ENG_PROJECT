import React, {useEffect, useState} from 'react';
import NavBar from './SuperAdminNavbar';

export default function FlightHistory() {

    const [flights, setFlights] = useState([]);

    useEffect(() => {
        const fetchFlights = async () => {
            try {
                const flightResponse = await fetch('http://localhost:3000/flights/history');
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
            <div className='flightContainer'>

            </div>
        </>
    )
}