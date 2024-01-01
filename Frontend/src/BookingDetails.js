import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import UserNavbar from './UserNavbar'; 
import FeedbackPopup from './FeedbackPopup'; 
import './BookingDetails.css';
import './BookingDetailPopup.css';



const BookingDetails = () => {
    const { userId } = useParams();
    const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

    const [bookings, setBookings] = useState([]);
    const [selectedBooking, setSelectedBooking] = useState(null);

    const toggleFeedbackPopup = () => {
        setIsFeedbackOpen(!isFeedbackOpen);
    };


    console.log('flightnumeb ', selectedBooking.flightNumber);

    const fetchBookings = async () => {
        try {
            const response = await fetch(`http://localhost:3000/bookings/user/${userId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setBookings(data); // Set fetched bookings into state
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    
    fetchBookings(); // Fetch bookings when component mounts
    
    const openDetailsPopup = (bookings) => {
        setSelectedBooking(bookings);
    };

    const closeDetailsPopup = () => {
        setSelectedBooking(null);
    };
 

    return (
        <div>
            <UserNavbar userId={userId} /> {/* UserNavbar component with props */}
            <div className="container">
                <h2>Bookings</h2>
                {bookings.length === 0 ? (
                    <p>No bookings found for this user</p>
                ) : (
                bookings.map((booking) => (
                    <div key={booking.bookingId} className="booking-details">
                        {/* Display booking details */}
                        <p>Booking ID: {booking.bookingNumber}</p>
                        <p>Flight Number: {booking.flightNumber}</p>
                        <p>Date of Booking: {booking.dateOfBooking}</p>
                        <p>Status: {booking.bookingStatus}</p>
                        <p>Payment Status: {booking.paymentStatus}</p>
                        {/* <Link to={`/booking/${booking.bookingId}`}>View Details</Link>
                        <button>Cancel</button>
                        <button>Feedback</button> */}
                        <Link to="#" onClick={() => openDetailsPopup(booking)}>
                            View Details
                        </Link>

                        <div className="buttons-container">
                            <button>Cancel</button>
                            <button onClick={() => toggleFeedbackPopup()}>Feedback</button>

                        </div>
                    </div>
                )
                ))}
            </div>
            {selectedBooking && (
                <div className="popup">
                    <h2>Booking Details</h2>
                    <h3>Booking ID: {selectedBooking.bookingNumber}</h3>
                    <hr />
                    <div className="flight-details">
                        <h4>Flight Details</h4>
                        <p>Airline: {selectedBooking.flightDetails.airline}</p>
                        <p>Flight Number: {selectedBooking.flightNumber}</p>
                        <p>Date of Flight: {selectedBooking.flightDetails.date}</p>
                        <p>Departure: {selectedBooking.flightDetails.departure}</p>
                        {/* Include other relevant flight details */}
                    </div>
                    <hr />
                    <div className="booking-info">
                        <h4>Booking Information</h4>
                        <p>Date of Booking: {selectedBooking.createdAt}</p>
                        <p>Seat Number: {selectedBooking.seatNumber}</p>
                        <p>Booking Status: {selectedBooking.bookingStatus}</p>
                        <p>Payment Status: {selectedBooking.paymentStatus}</p>
                        <p>Payment Amount: {selectedBooking.paymentAmount}</p>
                        {/* Include other relevant booking details */}
                    </div>
                    {/* Add more sections for passenger details, price, payment status, feedback, etc. */}
                    <button onClick={closeDetailsPopup}>Close</button>
                </div>
            )}

            {isFeedbackOpen && (
                <FeedbackPopup
                    onClose={toggleFeedbackPopup}
                    userId={userId}
                
                    flightNumber={selectedBooking.flightNumber}
                    bookingId={selectedBooking.bookingId}
                />
            )}
        </div>
    );
};

export default BookingDetails;
