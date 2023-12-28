import React from 'react';
import { Grid } from '@mui/material';

import FlightCard from './FlightCard';

const FlightGrid = ({ flights }) => {
  return (
    <>
      <Grid container spacing={3}>
        {flights.map((flight) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={flight.flightNumber}>
            <FlightCard flight={flight} />
          </Grid>
        ))}
      </Grid>
      <br></br>
    </>
  );
};

export default FlightGrid;