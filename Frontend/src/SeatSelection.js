import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SeatSelection.css';
import NavBar from './UserNavbar';

const SeatSelection = () => {
    const navigate = useNavigate(); // Initialize useNavigate

    const [selectedSeat, setSelectedSeat] = useState(null);

    const handleSeatSelection = (seatNumber) => {
        // Logic to handle seat selection, store selected seat in state
        setSelectedSeat(seatNumber);
    };

    const handleConfirmSeat = () => {
        // Logic to confirm seat selection
        // For example, send selected seat to backend for booking

        // After confirmation, navigate back to the final booking page
        navigate('/TripSummary'); // Navigate back to the FinalBooking page
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
