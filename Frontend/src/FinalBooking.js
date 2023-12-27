import React, { useState } from 'react';
import NavBar from './UserNavbar';
import './FinalBooking';
import { useNavigate } from 'react-router-dom'; 

const FinalBooking = () => {
    const navigate = useNavigate();

    const [isReturnTrip] = useState(true); // Replace this with your logic to determine if it's a return trip or one way

    // Replace these dummy data with actual selected flight details
    const selectedFlight = {
        flightNumber: 'ABC123',
        origin: 'Origin',
        destination: 'Destination',
        departureDate: '2023-12-30',
        returnDate: '2023-12-31', // Add return date for return trip
        price: '500', // Replace with actual price
    };

    const handleSeatSelection = () => {
        // Navigate to the seat selection page
        navigate('/SeatSelection');// Replace '/seat-selection' with your actual route
    };

    const handleReview = () => {
        // Open the review popup
        navigate('/ReviewPopup');
        // You may need to set up state and logic to manage the review popup visibility
        // Show/hide the review popup accordingly
    };

  

    return (
        <div>
            <NavBar />
            <h2 style={{ textAlign: 'center', marginTop: '10px' }}>
                Book Flight: {selectedFlight.flightNumber}
            </h2>

            {/* Container in the center of the page */}
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <h3 style={{ fontWeight: 'bold' }}>Trip Details</h3>
                <p>{isReturnTrip ? 'Return Trip' : 'One Way'}</p>
                <p>{selectedFlight.origin} to {selectedFlight.destination}</p>
                <p>{selectedFlight.departureDate}</p>
                {isReturnTrip && <p>{selectedFlight.destination} to {selectedFlight.origin}</p>}
                <p>Price: ${selectedFlight.price}</p>
                {/* <button onClick={handlePaymentSummary}>Payment Summary</button> */}
                <button onClick={handleSeatSelection}>Choose Seat</button>
                <button onClick={handleReview}>Review</button>
            </div>

            {/* Popups */}
            {/* Include logic to show/hide these popups based on user interaction */}
            {/* Payment Summary Popup */}
            {/* Seat Selection Popup */}
            {/* Review Popup */}
        </div>
    );
};

export default FinalBooking;
