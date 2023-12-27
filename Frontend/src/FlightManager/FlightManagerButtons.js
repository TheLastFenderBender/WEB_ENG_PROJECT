// Import React and React Router components
import React from 'react';
import { Link } from 'react-router-dom';

// Import the Material-UI button component
import { Button } from '@mui/material';

// Define a function that returns a JSX element
const FlightManagerButtons = () => {
  // Return the JSX element
  return (
    <>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/addflight"
      >
        Add New Flight
      </Button>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/addaircraft"
      >
        Add New Aircraft
      </Button>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/addroute"
      >
        Add New Route
      </Button>
    </>
  );
};

// Export the component
export default FlightManagerButtons;