import React from 'react';
import { Grid } from '@mui/material';

import RouteCard from './RouteCard';

const RouteGrid = ({ routes }) => {
  return (
    <>
      <Grid container spacing={3}>
        {routes.map((route) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={route.routeID}>
            <RouteCard route={route} />
          </Grid>
        ))}
      </Grid>
      <br></br>
    </>
  );
};

export default RouteGrid;