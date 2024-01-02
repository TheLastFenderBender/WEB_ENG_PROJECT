import React, { useState } from 'react';
import UserNavbar from './UserNavbar';
import './BookingHistory.css'; // Styling for BookingHistory component
import { useParams } from 'react-router-dom';

const BookingHistory = () => {
    const { userId } = useParams();
    const [bookings, setBookings] = useState([]);
    const [userDetails, setUserDetails] = useState({
        name: '',
        email: '',
        // Other user details as needed
    });

    const [confirmedBookings, setConfirmedBookings] = useState([]);
    const [cancelledBookings, setCancelledBookings] = useState([]);

    const fetchBookingHistory = () => {
        fetch(`http://localhost:3000/bookings/user/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((bookingData) => {
                // Filter bookings based on status
                console.log(bookingData);
                const confirmed = bookingData.filter((booking) => booking.status === 'confirmed');
                const cancelled = bookingData.filter((booking) => booking.status === 'cancelled');

                console.log('Confirmed Bookings:', confirmed);
                console.log('Cancelled Bookings:', cancelled);
                setConfirmedBookings(confirmed);
                setCancelledBookings(cancelled);
            })
            .catch((error) => {
                console.error('Error fetching booking history:', error);
            });
    };


    const fetchUserDetails = () => {
        fetch(`http://localhost:3000/Users/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((userData) => {
                setUserDetails({
                    name: userData.name,
                    email: userData.email,
                    // Set other user details from the response
                });
            })
            .catch((error) => {
                console.error('Error fetching user details:', error);
            });
    };



    // Fetch user details and booking history when the component mounts
    React.useEffect(() => {
        fetchUserDetails();
        fetchBookingHistory();
    }, [userId]);

    return (
        <div>
            <UserNavbar />
            <h1 style={{ textAlign: 'center' }}>Booking History</h1>
            <div className="user-info">
                <h2>User Information</h2>
                <hr />
                <p><strong>Name:</strong> {userDetails.name}</p>
                <p><strong>Email:</strong> {userDetails.email}</p>
                {/* Display other user details here */}
            </div>
            <div className="booking-list">
                <h2>Bookings</h2>
                <hr />
                {confirmedBookings.length > 0 || cancelledBookings.length > 0 ? (
                    <div>
                        {confirmedBookings.length > 0 && (
                            <div className="booking-list">
                                <h2>Confirmed Bookings</h2>
                                <hr />
                                {/* Render confirmed bookings */}
                                <div className="booking-rows">
                                    {confirmedBookings.map((booking) => (
                                        <div className="booking-row" key={booking.bookingId}>
                                            <p><strong>Booking ID:</strong> {booking.bookingId}</p>
                                            <p><strong>Flight Number:</strong> {booking.flightNumber}</p>
                                            <p><strong>Date:</strong> {booking.date}</p>
                                            {/* Display other booking details */}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {cancelledBookings.length > 0 && (
                            <div className="booking-list">
                                <h2>Cancelled Bookings</h2>
                                <hr />
                                {/* Render cancelled bookings */}
                                <div className="booking-rows">
                                    {cancelledBookings.map((booking) => (
                                        <div className="booking-row" key={booking.bookingId}>
                                            <p><strong>Booking ID:</strong> {booking.bookingId}</p>
                                            <p><strong>Flight Number:</strong> {booking.flightNumber}</p>
                                            <p><strong>Date:</strong> {booking.date}</p>
                                            {/* Display other booking details */}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <p style={{ textAlign: 'center' }}>No flights booked.</p>
                )}
            </div>
        </div>
    );
};

export default BookingHistory;
