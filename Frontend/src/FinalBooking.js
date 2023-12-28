import React, { useState, useEffect } from 'react';
import NavBar from './UserNavbar';
import './FinalBooking.css';
import { useNavigate, useParams } from 'react-router-dom'; 

const FinalBooking = () => {
    const navigate = useNavigate();
    const { flightId, userId } = useParams();
    const [selectedFlight, setSelectedFlight] = useState(null);

    const handleSeatSelection = () => {
        navigate('/SeatSelection');
    };

    const handleReview = () => {
        navigate('/ReviewPopup');
    };

    useEffect(() => {
        const fetchFlightDetails = async () => {
            try {
                const parsedFlightId = parseInt(flightId);
                console.log('Parsed Flight ID:', parsedFlightId);
                const response = await fetch(`http://localhost:3000/flights/${parsedFlightId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log('Fetched Flight Details:', data);
                    setSelectedFlight(data);
                } else {
                    console.error('Failed to fetch flight details.');
                }
            } catch (error) {
                console.error('Error fetching flight details:', error);
            }
        };

        fetchFlightDetails();
    }, [flightId]);
    // // Fetch flight details using flightId
    // const fetchFlightDetails = async () => {
    //     try {
    //         const parsedFlightId = parseInt(flightId);
    //         // Make an API call or fetch data source for the flight details
    //         const response = await fetch(`http://localhost:3000/flights/${parsedFlightId}`, {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //         });
    //         if (response.ok) {
    //             const data = await response.json();
    //             setSelectedFlight(data); // Update selectedFlight state with fetched data
    //         } else {
    //             console.error('Failed to fetch flight details.');
    //         }
    //     } catch (error) {
    //         console.error('Error fetching flight details:', error);
    //     }
    // };
    // // Call fetchFlightDetails when the component renders
    // fetchFlightDetails();


    if (!selectedFlight) {
        return <div>Loading...</div>; // Display a loading message or spinner until data is fetched
    }

    
    return (
        <div>
            <NavBar />
            <h2 style={{ textAlign: 'center', marginTop: '10px' }}>
                Book Flight {selectedFlight.flightNumber}
            </h2>

            {/* Container in the center of the page */}
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <h3 style={{ fontWeight: 'bold' }}>Trip Details</h3>
                {/* <p>{isReturnTrip ? 'Return Trip' : 'One Way'}</p> */}
                <p>{selectedFlight.origin} to {selectedFlight.destination}</p>
                <p>{selectedFlight.departureDate}</p>
            <p>{selectedFlight.destination} to {selectedFlight.origin}</p>
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
