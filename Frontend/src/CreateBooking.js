import React, { useState, useEffect } from 'react';

const CreateBooking = () => {
  const [flights, setFlights] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState('');
  const [seatNumber, setSeatNumber] = useState('');

  useEffect(() => {
    // Fetch the list of flights from the backend API
    const fetchFlights = async () => {
      try {
        const response = await fetch('ENDPOINT/flights');
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
      const response = await fetch('ENDPOINT/bookings', {
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
      <h4>Create New Booking</h4>
      <label>
        Select Flight:
        <select value={selectedFlight} onChange={(e) => setSelectedFlight(e.target.value)}>
          <option value="" disabled>Select a Flight</option>
          {flights.map((flight) => (
            <option key={flight._id} value={flight._id}>
              {flight.departure} to {flight.destination}
            </option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Seat Number:
        <input type="text" value={seatNumber} onChange={(e) => setSeatNumber(e.target.value)} />
      </label>
      <br />
      <button onClick={handleBookingSubmit}>Create Booking</button>
    </div>
  );
};

export default CreateBooking;
