import React from 'react';
import './BookFlight.css';


const FlightSelectionPopup = ({ flightInfo, selectedClass, price, onConfirm }) => {
    return (
        <div className="popup-container">
            <div className="popup-content">
                <h3>Flight Selection</h3>
                <p>{flightInfo}</p>
                <p>Class: {selectedClass}</p>
                <p>Price: {price}</p>
                <button onClick={onConfirm}>Confirm</button>
            </div>
        </div>
    );
};

export default FlightSelectionPopup;
