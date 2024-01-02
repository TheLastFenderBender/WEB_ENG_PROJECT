// Report.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './SuperAdminNavbar';

const Report = () => {
  const [flights, setFlights] = useState([]);
  const [maintenance, setMaintenance] = useState([]);
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    // Fetch flight details
    axios.get('http://localhost:3000/flights')
      .then(response => setFlights(response.data))
      .catch(error => console.error('Error fetching flights:', error));

    // Fetch maintenance details
    axios.get('http://localhost:3000/maintenance')
      .then(response => setMaintenance(response.data))
      .catch(error => console.error('Error fetching maintenance details:', error));

    // Fetch feedback details
    axios.get('http://localhost:3000/feedback')
      .then(response => setFeedback(response.data))
      .catch(error => console.error('Error fetching feedback details:', error));
  }, []);

  return (
    <div>
      <Navbar></Navbar>
      <h2>Flight Details</h2>
      <ul>
        {flights.map(flight => (
          <li key={flight._id}>
            Flight Number: {flight.flightNumber}, Airline: {flight.airline}, Status: {flight.status}
          </li>
        ))}
      </ul>

      <h2>Maintenance Details</h2>
      <ul>
        {maintenance.map(maintenanceItem => (
          <li key={maintenanceItem._id}>
            Aircraft ID: {maintenanceItem.aircraftId}, Scheduled Date: {maintenanceItem.scheduledDate}, Status: {maintenanceItem.status}
          </li>
        ))}
      </ul>

      <h2>Feedback Details</h2>
      <ul>
        {feedback.map(feedbackItem => (
          <li key={feedbackItem._id}>
            User ID: {feedbackItem.userID}, Flight Number: {feedbackItem.flightNumber}, Rating: {feedbackItem.rating}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Report;
