// BookingReport.js

import React, { useState, useEffect } from 'react';

const BookingReport = () => {
  const [reportData, setReportData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the booking report data from the server
    const fetchReportData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/report/generate-report');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setReportData(data);
      } catch (error) {
        console.error('Fetch report data error:', error);
        setError('Error fetching report data');
      }
    };

    fetchReportData();
  }, []);

  return (
    <div>
      <h4>Booking Report</h4>
      {error && <p>Error: {error}</p>}
      <table>
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>User ID</th>
            <th>Flight ID</th>
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
              <td>{booking.bookingId}</td>
              <td>{booking.userId}</td>
              <td>{booking.flightId}</td>
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