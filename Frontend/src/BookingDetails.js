import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import UserNavbar from './UserNavbar'; 
import './BookingDetails.css';


const BookingDetails = () => {
    const { userId } = useParams();

    const [bookings, setBookings] = useState([]);

    const fetchBookings = async () => {
        try {
            const response = await fetch(`http://localhost:3000/${userId}`);
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
 

    return (
        <div>
            <UserNavbar userId={userId} /> {/* UserNavbar component with props */}
            <div className="container">
                <h2>Bookings</h2>
                {bookings.map((booking) => (
                    <div key={booking.bookingId} className="booking-details">
                        {/* Display booking details */}
                        <p>Booking ID: {booking.bookingNumber}</p>
                        <p>Flight Number: {booking.flightNumber}</p>
                        <p>Date of Booking: {booking.dateOfBooking}</p>
                        <p>Status: {booking.status}</p>
                        <p>Payment Status: {booking.paymentStatus}</p>
                        {/* <Link to={`/booking/${booking.bookingId}`}>View Details</Link>
                        <button>Cancel</button>
                        <button>Feedback</button> */}
                        <Link to={`/booking/${booking.bookingId}`}>View Details</Link>

                        <div className="buttons-container">
                            <button>Cancel</button>
                            <button>Feedback</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BookingDetails;
