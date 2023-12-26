// Import React and Material-UI components
import React from 'react';
import { Card, CardContent, CardActions, Typography, Button } from '@mui/material';

// Define a function that takes a flight object as a prop and returns a JSX element
const FlightCard = ({ flight }) => {
  // Destructure the flight object to get the relevant properties
  const { flight: { number: flight_number }, flight_status, departure, arrival, airline } = flight;

  // Return the JSX element
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          Flight {flight_number}
        </Typography>
        <Typography color="textSecondary">
          {departure.airport} - {arrival.airport}
        </Typography>
        <Typography variant="body2" component="p">
          {airline.name}
        </Typography>
        <Typography variant="body2" component="p">
          Status: {flight_status}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">View Details</Button>
        <Button size="small" color="secondary">Edit</Button>
      </CardActions>
    </Card>
  );
};

// Export the component
export default FlightCard;