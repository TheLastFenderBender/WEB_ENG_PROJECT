import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SeatSelection.css';
import NavBar from './UserNavbar';
import { useParams} from 'react-router-dom';


const SeatSelection = () => {
    const navigate = useNavigate(); 

    const { userId, flightNumber } = useParams();

    const [selectedSeat, setSelectedSeat] = useState(null);

    const handleSeatSelection = (seatNumber) => {
        // Logic to handle seat selection, store selected seat in state
        setSelectedSeat(seatNumber);
    };

    const handleConfirmSeat = async () => {
        try {
            const response = await fetch('http://localhost:3000/bookflight', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: userId, // Replace with the actual userId
                    flightNumber: flightNumber, // Replace with the actual flightId
                    seatNumber: selectedSeat,
                }),
            });

            if (response.ok) {
                const bookingData = await response.json();
                // Handle successful booking, if needed
                console.log('Booking successful:', bookingData);
                const bookingNumber = bookingData.bookingNumber;
                console.log('booking number: ', bookingNumber);
                // Save bookingId to localStorage
                localStorage.setItem('bookingNumber', bookingNumber);
                navigate(`/TripSummary/${bookingNumber}`);
            } else {
                console.error('Failed to book the flight.');
            }
        } catch (error) {
            console.error('Error booking the flight:', error);
        }

        // After confirmation, navigate back to the final booking page
         // Navigate back to the FinalBooking page
    };

    // Generate seat components dynamically
    const seatRows = ['A', 'B', 'C', 'D', 'E'];
    const seatColumns = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

    return (
        <div>
            <NavBar />
            <h2>Seat Selection</h2>
            <div className="seat-selection">
             
                <div className="seat-grid">
                    {/* Display the seat grid with available seats */}
                    {seatRows.map((row) => (
                        <div key={row} className="seat-row">
                            {seatColumns.map((column) => (
                                <div
                                    key={row + column}
                                    className={`seat ${selectedSeat === row + column ? 'selected' : ''}`}
                                    onClick={() => handleSeatSelection(row + column)}
                                >
                                    {row + column}
                                </div>
                            ))}
                          
                            
                        </div>
                      
                    ))}
                </div>
                {selectedSeat && (
                    <div>
                        <p>Selected Seat: {selectedSeat}</p>
                        <button onClick={handleConfirmSeat}>Confirm Seat</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SeatSelection;
