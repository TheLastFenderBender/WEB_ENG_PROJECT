import React from 'react';
import './BookFlight.css';
import { Link, useNavigate } from 'react-router-dom';



const FlightSelectionPopup = ({ flight, flightClass, price, onConfirm, onClose, userId }) => {
    const navigate = useNavigate(); 

    // const handleConfirm = () => {
    //     if (flight && flight.flightNumber) {
    //         const parsedFlightId = parseInt(flight.flightNumber);
            console.log('Parsed Flight ID in selec:', userId);
    //         // console.log('Flight Number:', flight.flightNumber);
    //         // navigate(`/FinalBooking/${flight.flightNumber}`);
    //         // <Link to={`/FinalBooking/${flight.flightNumber}`} ></Link>

    //     } else {
    //         console.error('Flight or flightNumber is not available.');
    //     }
    // };


    return (
        <div className="popup-container">
            <div className="popup-header">
                <button className="close-button" onClick={onClose}>X</button>
            </div>
            <div className="popup-content">
                <h3>Flight Selected</h3>
                <p>Selected Flight Number:{flight.flightNumber}</p>
                <p>Class: {flightClass}</p>
                <p>Price: {price}</p>
                <Link to={`/FinalBooking/${userId}/${flight.flightNumber}`}>
                    <button>Confirm</button>
                </Link>

                {/* <button onClick={handleConfirm}>Confirm</button> */}
            </div>
        </div>
    );
};

export default FlightSelectionPopup;
