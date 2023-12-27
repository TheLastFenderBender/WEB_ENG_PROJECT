import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from './UserNavbar';
import './TripSummary.css'; // Your TripSummary styles

const TripSummary = () => {
    const navigate = useNavigate();

    const handlePayNow = () => {
        // Logic for handling payment
        navigate('/UserPayment'); // Navigate to the Payment page
    };

    const handleHoldBooking = () => {
        // Logic for holding the booking
        navigate('/HoldBooking'); // Navigate to the HoldBooking page
    };

    return (
        <div>
            <NavBar />
            <div className="trip-summary-container">
                <h2>Trip Summary</h2>
                {/* Summary details */}
                <div className="summary-details">
                    <p>Write your summary details here...</p>
                    <hr /> {/* Horizontal line */}
                    <p>Origin to Arrival Location</p>
                    <p>Date of the Flight</p>
                    <p>Departure and Arrival Times</p>
                    <p>Stops</p>
                    <p>Duration</p>
                    <p>Economy or Business Class</p>
                    <p>Price</p>
                    {/* Add other necessary details */}
                </div>
                {/* Buttons */}
                <div className="button-container">
                    <button onClick={handlePayNow}>Pay Now</button>
                    <button onClick={handleHoldBooking}>Hold My Booking</button>
                </div>
            </div>
        </div>
    );
};

export default TripSummary;
