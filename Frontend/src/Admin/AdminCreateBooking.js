import React, { useState, useEffect } from 'react';
import AuthNavBar from '../AuthNavBar';
import './AdminCreateBooking.css'; // Import the CSS module

const AdminCreateBooking = () => {
  const [flights, setFlights] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState('');
  const [seatNumber, setSeatNumber] = useState('');

  useEffect(() => {
    // Fetch the list of flights from the backend API
    const fetchFlights = async () => {
      try {
        const response = await fetch('http://localhost:3000/flights');
        const data = await response.json();
        setFlights(data);
      } catch (error) {
        console.error('Error fetching flights:', error);
      }
    };

    fetchFlights();
  }, []);

  const handleBookingSubmit = async () => {
    try {
      // Make a fetch request to create a new booking
      const response = await fetch('http://localhost:3000/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          flightId: selectedFlight,
          seatNumber,
        }),
      });

      if (response.ok) {
        // Booking created successfully
        console.log('Booking created successfully');
      } else {
        // Handle error cases
        console.error('Error creating booking:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating booking:', error.message);
    }
  };

  return (
    <div>
      
      <AuthNavBar />
      <div className="admin-create-booking-container">
      
      <h4 className="admin-create-booking-heading">Create New Booking</h4>
      <label className="admin-create-booking-label">
        Select Flight:
        <select
          value={selectedFlight}
          onChange={(e) => setSelectedFlight(e.target.value)}
          className="admin-create-booking-select"
        >
          <option value="" disabled>Select a Flight</option>
          {flights.map((flight) => (
            <option key={flight._id} value={flight._id}>
              {flight.departure} to {flight.arrival}
            </option>
          ))}
        </select>
      </label>
      <br />
      <label className="admin-create-booking-label">
        Seat Number:
        <input
          type="text"
          value={seatNumber}
          onChange={(e) => setSeatNumber(e.target.value)}
          className="admin-create-booking-input"
        />
      </label>
      <br />
      <button onClick={handleBookingSubmit} className="admin-create-booking-button">
        Create Booking
      </button>
    </div>
    <div className='FooterSettingDiv'></div>
    </div>
  );
};

export default AdminCreateBooking;
