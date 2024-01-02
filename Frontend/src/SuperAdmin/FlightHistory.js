import React, { useEffect, useState } from 'react';
import NavBar from './SuperAdminNavbar';
import './SuperAdminStyles/FlightHistory.css';
import Axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

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
                <TableContainer component={Paper}>
                    <Table className='flightHTable' aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Flight No.</TableCell>
                                <TableCell>Airline</TableCell>
                                <TableCell>AirCraft ID</TableCell>
                                <TableCell>Departure</TableCell>
                                <TableCell>Arrival</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Flight Type</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                flights.map((flight) => (
                                    <TableRow key={flight.flightNumber}>
                                        <TableCell>{flight.flightNumber}</TableCell>
                                        <TableCell>{flight.airline}</TableCell>
                                        <TableCell>{flight.aircraftID}</TableCell>
                                        <TableCell>{flight.departure}</TableCell>
                                        <TableCell>{flight.arrival}</TableCell>
                                        <TableCell>{flight.date.split('T')[0]}</TableCell>
                                        <TableCell>{flight.flightType}</TableCell>
                                        <TableCell>{flight.status}</TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    )
}