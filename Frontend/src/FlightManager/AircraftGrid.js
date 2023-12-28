import React from 'react';
import { Grid } from '@mui/material';

import AircraftCard from './AircraftCard';

const AircraftGrid = ({ aircrafts }) => {
  return (
    <>
      <Grid container spacing={3}>
        {aircrafts.map((aircraft) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={aircraft.aircraftID}>
            <AircraftCard aircraft={aircraft} />
          </Grid>
        ))}
      </Grid>
      <br></br>
    </>
  );
};

export default AircraftGrid;