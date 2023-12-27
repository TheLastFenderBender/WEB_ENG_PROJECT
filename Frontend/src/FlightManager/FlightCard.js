// Import React and Material-UI components
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardActions, Typography, Button } from '@mui/material';

// Define a function that takes a flight object as a prop and returns a JSX element
const FlightCard = ({ flight }) => {
  // Destructure the flight object to get the relevant properties
  const { flightNumber, airline, aircraftID, departure, arrival, date, time, availableSeats } = flight;

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
        <Link to={{ pathname: "/updateflight", state: { flightNumber: flightNumber } }}>
          <Button size="small" color="secondary">Edit</Button>
        </Link>
      </CardActions>
    </Card>
  );
};

// Export the component
export default FlightCard;