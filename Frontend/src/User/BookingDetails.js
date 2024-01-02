import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import UserNavbar from './UserNavbar';
import './BookingDetails.css';
import './BookingDetailPopup.css';
// import './FeedbackPopup.css';




const BookingDetails = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    // const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
    // const [description, setDescription] = useState(''); // Define description state
    // const [rating, setRating] = useState(1); // Define rating state
    const [bookings, setBookings] = useState([]);
    const [selectedBooking, setSelectedBooking] = useState(null);

    // const toggleFeedbackPopup = () => {
    //     setIsFeedbackOpen(!isFeedbackOpen);
    // };



    // console.log('flightnumeb ', selectedBooking.flightNumber);

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

    // const handleSubmitFeedback = async (description, rating) => {
    //     if (!selectedBooking || !selectedBooking.bookingId || !selectedBooking.flightNumber) {
    //         console.error('Booking ID or Flight Number is missing.');
    //         return;
    //     }
    //     try {
    //         const response = await fetch(`http://localhost:3000/bookings/${selectedBooking.bookingId}/feedback`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 description,
    //                 userID: userId,
    //                 flightNumber: selectedBooking.flightNumber,
    //                 rating,
    //             }),
    //         });

    //         if (response.ok) {
    //             console.log('Feedback submitted successfully!');
    //             setIsFeedbackOpen(false);
    //         } else {
    //             console.error('Failed to submit feedback.');
    //         }
    //     } catch (error) {
    //         console.error('Error submitting feedback:', error);
    //     }
    // };
    // console.log('bookingid: ', bookings.bookingNumber);

    // const deleteBooking = async (bookingNumber) => {
    //     console.log('bookingid: inside  ',bookingNumber);

    //     try {

    //         // Call an API to delete the booking based on bookingId
    //         // Example:
    //         const response = await fetch(`http://localhost:3000/bookings/${bookingNumber}`, {
    //             method: 'DELETE',
    //         });

    //         if (response.ok) {
    //             // Navigate to refund page and pass necessary data
    //             navigate(`/Refund/${bookingNumber}`);
    //         } else {
    //             console.error('Failed to delete booking.');
    //         }
    //     } catch (error) {
    //         console.error('Error deleting booking:', error);
    //     }
    // };

    const cancelBooking = async (bookingNumber) => {
        console.log('bookingid: inside  ', bookingNumber);

        try {
            const response = await fetch(`http://localhost:3000/bookings/${bookingNumber}/cancel`, {
                method: 'PUT', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    bookingStatus: 'cancelled',
                }),
            });

            if (response.ok) {
                // Update the local state to reflect the cancelled booking
                // const updatedBookings = bookings.map(booking => {
                //     if (booking.bookingNumber === bookingNumber) {
                //         return {
                //             ...booking,
                //             bookingStatus: 'cancelled',
                //         };
                //     }
                //     return booking;
                // });

                // setBookings(updatedBookings);
                // Update the local state or perform any necessary actions upon successful cancellation
                console.log('Booking cancelled successfully in feych!');
                navigate(`/Refund/${userId}/${bookingNumber}`);

                // For example, update the booking status in the local state if needed
            } else {
                console.error('Failed to cancel booking.');
            }
        } catch (error) {
            console.error('Error cancelling booking:', error);
        }
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
                            <p>Date of Booking: {booking.createdAt}</p>
                            <p>Status: {booking.bookingStatus}</p>
                            <p>Payment Status: {booking.paymentStatus}</p>
                            {/* <Link to={`/booking/${booking.bookingId}`}>View Details</Link>
                        <button>Cancel</button>
                        <button>Feedback</button> */}
                            <Link to="#" onClick={() => openDetailsPopup(booking)}>
                                View Details
                            </Link>

                            <div className="buttons-container">
                                {/* <button onClick={() => deleteBooking(booking.bookingNumber)}>Cancel</button> */}
                                <button onClick={() => cancelBooking(booking.bookingNumber)}>Cancel</button>

                                {/* <button>Cancel</button> */}
                                {/* <button onClick={toggleFeedbackPopup}>Feedback</button> */}
                                {/* <button onClick={() => toggleFeedbackPopup()}>Feedback</button> */}

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

            {/* {isFeedbackOpen && selectedBooking && (
                <div className="popup">
                    <h2>Give Feedback</h2>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)} // Handle description change
                        placeholder="Enter your feedback..."
                    ></textarea>
                    <label>
                        Rating:
                        <input
                            type="number"
                            min="1"
                            max="5"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)} // Handle rating change
                        />
                    </label>
                    <button onClick={handleSubmitFeedback}>Submit</button>
                    <button onClick={toggleFeedbackPopup}>Close</button>
                </div>
            )} */}
        </div>
    );
};

export default BookingDetails;
