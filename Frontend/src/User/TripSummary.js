import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import UserNavBar from './UserNavbar';
import './TripSummary.css';

const TripSummary = () => {
    const navigate = useNavigate();
    const { bookingNumber } = useParams();
    const [bookingDetails, setBookingDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userDetails, setUserDetails] = useState(null);

    const [showRefundPopup, setShowRefundPopup] = useState(false);
    const fetchBookingDetails = async () => {
        try {
            const response = await fetch(`http://localhost:3000/bookings/${bookingNumber}`);
            if (response.ok) {
                const bookingData = await response.json();
                setBookingDetails(bookingData);
                fetchUserDetails(bookingData.userId); 
            } else {
                setError('Failed to fetch booking details');
            }
            setLoading(false);
        } catch (error) {
            setError('Error fetching booking details');
            setLoading(false);
        }
    };

    const fetchUserDetails = async (userId) => {
        try {
            const userResponse = await fetch(`http://localhost:3000/users/${userId}`);
            if (userResponse.ok) {
                const userData = await userResponse.json();
                setUserDetails(userData);
            } else {
                setError('Failed to fetch user details');
            }
        } catch (error) {
            setError('Error fetching user details');
        }
    };


    // Call fetchBookingDetails directly in your component logic, maybe in response to a user action or another event
    useEffect(() => {
        fetchBookingDetails();
    }, [bookingNumber]);

    const handlePayNow = () => {
        navigate(`/UserPayment/${bookingNumber}`);
    };

    const handleHoldBooking = () => {
        navigate('/HoldBooking');
    };

    const handleRefundPopup = () => {
        setShowRefundPopup(true);
    };


    const closeRefundPopup = () => {
        setShowRefundPopup(false);
    };


    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <UserNavBar />
            <div className="trip-summary-container">
                <h2>Trip Summary</h2>
                <hr />
                {/* Display booking details */}
                {bookingDetails && userDetails &&  (
                    <>
                        <div className="summary-details">
                            <p>Destination to Arrival: {bookingDetails.flightDetails.departure} to {bookingDetails.flightDetails.arrival}</p>
                            <hr />
                            <p>Date of the Flight: {bookingDetails.flightDetails.date}</p>
                            <hr />
                            <p>Time: {bookingDetails.flightDetails.time}</p>
                            <hr />
                            <p>Flight Class: {bookingDetails.flightDetails.flightClass}</p>
                            <hr />
                            <p>Seat Number: {bookingDetails.seatNumber}</p>
                            <hr />
                            {/* Passenger details */}
                            <h3>Passenger Details</h3>
                            <hr />
                            <p>User Name: {userDetails.username}</p>
                            <hr />
                            <p>Passport Number: {userDetails.passportNumber}</p>
                            <hr />
                            <p>Age: {userDetails.age}</p>
                            <hr />
                            {/* Contact details */}
                            <h3>Contact Details</h3>
                            <hr />
                            <p>Email: {userDetails.email}</p>
                            <hr />
                            <p>Phone Number: {userDetails.mobileNumber}</p>
                            <hr />
                            {/* Refund rules link */}
                            <p>
                                <a href="#" onClick={handleRefundPopup}>Refund Rules</a>
                            </p>
                            <hr />
                            <p>Payment Amount: {bookingDetails.flightDetails.price}</p>
                        </div>
                        {/* Buttons */}
                       
                            <div className="button-container">
                            <Link to={`/UserPayment/${bookingNumber}`}>
                                <button>Pay Now</button>
                            </Link>
                            <Link to="/UserDashBoard">
                                <button>Hold Booking</button>
                            </Link>
                            </div>
                        
                    </>
                )}
            </div>

            {showRefundPopup && (
                <div className="refund-popup">
                    <div className="popup-content">
                        <span className="close" onClick={closeRefundPopup}>
                            &times;
                        </span>
                        <h3>Refund Information</h3>
                        <p>
                            If payment is not completed within 2 days, the booking will be cancelled and
                            the refund process will be initiated.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TripSummary;
