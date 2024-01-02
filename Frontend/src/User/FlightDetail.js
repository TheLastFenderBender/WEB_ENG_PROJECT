import React, { useState, useEffect } from 'react';
import './FlightDetail.css';

const FlightDetail = ({ flightDetails, onClose }) => {

    const [routeDetails, setRouteDetails] = useState(null);
    // console.log('route id', flightDetails.routeID);

    const fetchRouteDetails = async () => {
        try {
            // console.log('flightDetails:', flightDetails);
            if (flightDetails) {
                const response = await fetch(`http://localhost:3000/routes/${flightDetails.routeID}`);
                if (response.ok) {
                    const data = await response.json();
                    // console.log('Route details:', data);
                    setRouteDetails(data);
                } else {
                    console.error('Failed to fetch route details');
                }
            }
        } catch (error) {
            console.error('Error fetching route details:', error);
        }
    };

    fetchRouteDetails(); 


    return (
        <div className="popup-container">
            <div className="popup">
                <button className="close-button" onClick={onClose}>X</button>
                <h3 className="section-heading">Flight Details</h3>
                <div className="details">
                    <p><strong>Airline:</strong> {flightDetails.airline}</p>
                    <p><strong>From:</strong> {flightDetails.departure} <strong>To:</strong> {flightDetails.arrival}</p>
                    <p><strong>Flight ID:</strong> {flightDetails.flightNumber}</p>
                    <p><strong>Aircraft ID:</strong> {flightDetails.aircraftID}</p>
                    <p><strong>Route ID:</strong> {flightDetails.routeID}</p>
                    <p><strong>Date:</strong> {flightDetails.date}</p>
                    <p><strong>Day:</strong> {flightDetails.day}</p>
                    <p><strong>Time:</strong> {flightDetails.time}</p>
                    <p><strong>Duration:</strong> {routeDetails ? `${routeDetails.travelTime} hours` : 'Loading...'}</p>
                    <p><strong>Available Seats:</strong> {flightDetails.availableSeats}</p>
                    <p><strong>Price:</strong> {flightDetails.price}</p>
                    {/* Add more details as needed */}
                </div>

                <hr className="divider" />

                <h3 className="section-heading">Aircraft Details</h3>
                <div className="details">
                    <p><strong>Aircraft Name:</strong> {flightDetails.aircraftName}</p>
                    <p><strong>Model:</strong> {flightDetails.model}</p>
                    <p><strong>Manufacturer:</strong> {flightDetails.manufacturer}</p>
                    {/* Add more aircraft details */}
                </div>

                {/* Add other sections if needed */}
            </div>
        </div>
    );
};

export default FlightDetail;
