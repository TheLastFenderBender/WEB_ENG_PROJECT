// BookingReport.js

import React, { useState, useEffect } from 'react';
import './BookingReport.css'; // Import the CSS file

const BookingReport = () => {
  const [reportData, setReportData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the booking report data from the server
    const fetchBookings = async () => {
      try {
        const response = await fetch('http://localhost:3000/getAdminBookings');
        const data = await response.json();
        setReportData(data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

 

  return (
    <div className="booking-report-container">
      <h4 className="booking-report-heading">Booking Report</h4>
      <table className="booking-report-table">
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>User ID</th>
            <th>Flight Number</th>
            <th>Seat Number</th>
            <th>Booking Status</th>
            <th>Payment Status</th>
            <th>Created At</th>
            <th>Updated At</th>
          </tr>
        </thead>
        <tbody>
          {reportData.map((booking) => (
            <tr key={booking.bookingId}>
              <td>{booking.bookingNumber}</td>
              <td>{booking.userId}</td>
              <td>{booking.flightNumber}</td>
              <td>{booking.seatNumber}</td>
              <td>{booking.bookingStatus}</td>
              <td>{booking.paymentStatus}</td>
              <td>{booking.createdAt}</td>
              <td>{booking.updatedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingReport;
