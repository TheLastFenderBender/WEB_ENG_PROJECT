import React, { useState, useEffect } from 'react';
import Modal from "react-modal";

import './BookingView.css'; // Import the CSS file

const BookingView = () => {
   const [bookings, setBookings] = useState([]);
  const [activeBooking, setActiveBooking] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [updatedBooking, setUpdatedBooking] = useState({});
  const [updatedSeatNumber, setUpdatedSeatNumber] = useState('');


  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('http://localhost:3000/getAdminBookings');
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, [bookings,updatedBooking]);

  const handleUpdateBookingClick = async () => {
    try {
      console.log("Save button clicked!");
      closeModal(); // Close the modal after saving
      const response = await
fetch(`http://localhost:3000/updateBookingSeatAdmin/${updatedBooking._id}`,
{
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ seatNumber: updatedSeatNumber }),
});

      if (response.ok) {
        // Handle successful update
        console.log('User updated successfully');
      } else {
        console.error('Failed to update user');
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      const response = await
fetch(`http://localhost:3000/bookings/${bookingId._id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Handle successful deletion
        console.log('User deleted successfully');
        setBookings((prevUsers) => prevUsers.filter((booking) =>
booking._id !== bookingId));
      } else {
        console.error('Failed to delete user');
        console.log("failed");

      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleUpdateBookingPayment = async (bookingId) => {

    try {

      console.log(bookingId._id);
      const response = await
fetch(`http://localhost:3000/AdminBookings/${bookingId._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ paymentStatus: "Paid" }),
      });

      if (response.ok) {
        // Handle successful update
        console.log('Payment status updated successfully');
        setUpdatedBooking(bookingId._id);
        setActiveBooking(bookingId);
      } else {
        console.error('Failed to update payment status');
      }
    } catch (error) {
      console.error('Error updating payment status:', error);
    }
  };
  const handleUpdateBooking = (bookingId) => {
    setUpdatedBooking(bookingId);
    setActiveBooking(bookingId);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  return (
    <div className="booking-view-container">
      <h4 className="booking-view-heading">Booking List</h4>
      <table className="booking-view-table">
        <thead>
          <tr>
            <th>User id</th>
            <th>Flight</th>
            <th>Seat Number</th>
            <th>Date</th>
            <th>Status</th>
            <th>Payment Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td>{booking.userId}</td>
              <td>{`${booking.flightDetails.departure} to ${booking.flightDetails.arrival}`}</td>
              <td>{booking.seatNumber}</td>
              <td>{booking.createdAt}</td>
              <td>{booking.bookingStatus}</td>
              <td>{booking.paymentStatus}</td>
              <td>
                <button className='BookingViewCancelButton' onClick={() => handleCancelBooking(booking)}>Cancel</button>
                <button className='BookingViewUpdateButton' onClick={()=> handleUpdateBooking(booking)}>Update</button>
                <button className='BookingViewProcessButton' onClick={() => handleUpdateBookingPayment(booking)}>ProcessPayment</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Update Booking Modal"
        className="booking-view-modal"
        style={{ overlay: { zIndex: 1000 } }}
      >
        <div>
          <h4>Update Booking</h4>
          <label>
            Seat Number:
            <input
              type="text"
              value={updatedSeatNumber}
              onChange={(e) => setUpdatedSeatNumber(e.target.value)}
            />
          </label>
          <button type="button" onClick={handleUpdateBookingClick}>
            Update Booking
          </button>
        </div>
      </Modal>
    </div>
  );

};


export default BookingView;