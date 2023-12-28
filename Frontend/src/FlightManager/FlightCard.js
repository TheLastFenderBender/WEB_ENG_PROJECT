// Import React and Material-UI components
import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardActions, Typography, Button } from '@mui/material';

// Define a function that takes a flight object as a prop and returns a JSX element
const FlightCard = ({ flight }) => {
  // Destructure the flight object to get the relevant properties
  const { flightNumber, airline, aircraftID, routeID, departure, arrival, date, time, availableSeats } = flight;

  const handleDeleteClick = async () => {
    try {
      console.log(flightNumber);
      const response = await axios.delete(`http://localhost:3000/flights/${flightNumber}`);
      console.log(response.data);
      alert("Flight deleted successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  // Return the JSX element
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          Flight: {flightNumber}
        </Typography>
        <Typography color="textSecondary">
          {date.split('T')[0]} | {time}
        </Typography>
        <Typography color="textSecondary">
          Aircraft: {aircraftID}
        </Typography>
        <Typography color="textSecondary">
          Route: {routeID}
        </Typography>
        <Typography color="textSecondary">
          {departure} - {arrival}
        </Typography>
        <Typography variant="body2" component="p">
          {airline}
        </Typography>
        <Typography variant="body2" component="p">
          Available Seats: {availableSeats}
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={`/updateflight/${flightNumber}`}>
          <Button size="small" color="secondary">Edit</Button>
        </Link>
        <Button size="small" color="secondary" onClick={() => handleDeleteClick()}>Delete</Button>
      </CardActions>
    </Card>
  );
};

// Export the component
export default FlightCard;