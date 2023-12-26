// Import React and Material-UI components
import React from 'react';
import { Grid } from '@mui/material';

// Import the FlightCard component from the previous example
import FlightCard from './FlightCard';

// Define a function that takes an array of flights as a prop and returns a JSX element
const FlightGrid = ({ flights }) => {
  // Return the JSX element
  return (
    <Grid container spacing={3}>
      {flights.map((flight) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={flight.flightNumber}>
          <FlightCard flight={flight} />
        </Grid>
      ))}
    </Grid>
  );
};

// Export the component
export default FlightGrid;