import React, { useState, useEffect } from 'react';
import BookingUpdate from './BookingUpdate';
import Modal from "react-modal";

const BookingView = () => {
   const [bookings, setBookings] = useState([
  {"_id": "1", "userId": {"username": "User_1"}, "flightId": {"departure": "City_8", "destination": "City_13"}, "seatNumber": "B22", "Date": "24/2/23", "status": "Cancelled","Amount":"100pkr" , "paymentStatus": "Paid"},
  {"_id": "2", "userId": {"username": "User_5"}, "flightId": {"departure": "City_5", "destination": "City_14"}, "seatNumber": "A8", "Date": "24/2/23", "status": "Confirmed", "Amount":"100pkr" ,"paymentStatus": "Unpaid"},
  {"_id": "3", "userId": {"username": "User_6"}, "flightId": {"departure": "City_10", "destination": "City_19"}, "seatNumber": "C16", "Date": "24/2/23", "status": "Pending", "Amount":"100pkr" ,"paymentStatus": "Unpaid"},
  {"_id": "4", "userId": {"username": "User_3"}, "flightId": {"departure": "City_9", "destination": "City_15"}, "seatNumber": "A18", "Date": "24/2/23", "status": "Confirmed", "Amount":"100pkr" ,"paymentStatus": "Unpaid"},
  {"_id": "5", "userId": {"username": "User_2"}, "flightId": {"departure": "City_3", "destination": "City_19"}, "seatNumber": "D26", "Date": "24/2/23", "status": "Pending", "Amount":"100pkr" ,"paymentStatus": "Unpaid"},
  {"_id": "6", "userId": {"username": "User_6"}, "flightId": {"departure": "City_10", "destination": "City_13"}, "seatNumber": "E25", "Date": "24/2/23", "status": "Cancelled","Amount":"100pkr" , "paymentStatus": "Unpaid"},
  {"_id": "7", "userId": {"username": "User_8"}, "flightId": {"departure": "City_3", "destination": "City_19"}, "seatNumber": "F17", "Date": "24/2/23", "status": "Confirmed", "Amount":"100pkr" ,"paymentStatus": "Paid"},
  {"_id": "8", "userId": {"username": "User_9"}, "flightId": {"departure": "City_9", "destination": "City_15"}, "seatNumber": "D4", "Date": "24/2/23", "status": "Confirmed", "Amount":"100pkr" ,"paymentStatus": "Paid"},
  {"_id": "9", "userId": {"username": "User_6"}, "flightId": {"departure": "City_10", "destination": "City_19"}, "seatNumber": "C15", "Date": "24/2/23", "status": "Pending", "Amount":"100pkr" ,"paymentStatus": "Paid"},
  {"_id": "10", "userId": {"username": "User_9"}, "flightId": {"departure": "City_10", "destination": "City_19"}, "seatNumber": "F6", "Date": "24/2/23", "status": "Cancelled", "Amount":"100pkr" ,"paymentStatus": "Paid"}
]);
  const [activeBooking, setActiveBooking] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [updatedBooking, setUpdatedBooking] = useState({});
  const [updatedSeatNumber, setUpdatedSeatNumber] = useState('');


  // useEffect(() => {
  //   const fetchBookings = async () => {
  //     try {
  //       const response = await fetch('http://localhost:3000/book');
  //       const data = await response.json();
  //       setBookings(data);
  //     } catch (error) {
  //       console.error('Error fetching bookings:', error);
  //     }
  //   };

  //   fetchBookings();
  // }, []);

  const handleUpdateBookingClick = async () => {
    try {
      console.log("Save button clicked!");
      closeModal(); // Close the modal after saving
      const response = await fetch(`http://localhost:3000/updateBooking/${updatedBooking._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedBooking),
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
      const response = await fetch(`http://localhost:3000/deleteBooking/${bookingId._id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Handle successful deletion
        console.log('User deleted successfully');
        setBookings((prevUsers) => prevUsers.filter((booking) => booking._id !== bookingId));
      } else {
        console.error('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  
  const handleUpdateBookingPayment = async (bookingId) => {
    setUpdatedBooking(bookingId);
    setActiveBooking(bookingId);
    try {
      console.log("Save button clicked!");
      const response = await fetch(`http://localhost:3000/updateBookingPayment/${updatedBooking._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ paymentStatus: "Paid" }),
      });
    
      if (response.ok) {
        // Handle successful update
        console.log('Payment status updated successfully');
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
    <div>
      <h4>Booking List</h4>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Flight</th>
            <th>Seat Number</th>
            <th>Date</th>
            <th>Status</th>
            <th>Amount</th>
            <th>Payment Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td>{booking.userId.username}</td>
              <td>{`${booking.flightId.departure} to ${booking.flightId.destination}`}</td>
              <td>{booking.seatNumber}</td>
              <td>{booking.Date}</td>
              <td>{booking.status}</td>
              <td>{booking.Amount}</td>
              <td>{booking.paymentStatus}</td>
              <td>
                <button onClick={() => handleCancelBooking(booking)}>Cancel</button>
                <button onClick={() => handleUpdateBooking(booking)}>Update</button>
                <button onClick={() => handleUpdateBookingPayment(booking)}>Process Payment</button>

              </td>
            </tr>
          ))}
                 <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        style={{ zIndex: 1000 }}
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
          Update User
        </button>
    </div>
        
       </Modal>
        </tbody>
      </table>

      {/* {activeBooking && <BookingUpdate bookingId={activeBooking} setActiveBooking={setActiveBooking} />} */}
    </div>
  );
};

export default BookingView;
