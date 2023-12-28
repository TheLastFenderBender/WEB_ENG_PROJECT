import React from 'react';
import './FlightDetail.css';

const FlightDetail = ({ flightDetails, onClose }) => {
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
                    <p><strong>Duration:</strong> {flightDetails.duration}</p>
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
