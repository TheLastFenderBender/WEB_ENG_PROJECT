import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardActions, Typography, Button } from '@mui/material';
import { Box } from '@mui/system';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import BusinessIcon from '@mui/icons-material/Business';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CancelIcon from '@mui/icons-material/Cancel';
import ScheduleIcon from '@mui/icons-material/Schedule';
import UpdateIcon from '@mui/icons-material/Update';

const FlightCard = ({ flight }) => {
  const { flightNumber, airline, aircraftID, routeID, departure, arrival, date, time, availableSeats, flightType, flightClass, prices, status } = flight;

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

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          <AirplanemodeActiveIcon /> Flight: {flightNumber}
        </Typography>
        <Typography color="textSecondary">
          <EventIcon /> {new Date(date).toLocaleDateString()} | <AccessTimeIcon /> {time}
        </Typography>
        <Typography color="textSecondary">
          <FlightTakeoffIcon /> {departure} - <FlightLandIcon /> {arrival}
        </Typography>
        <Typography variant="body2" component="p">
          <BusinessIcon /> {airline} | Class: {flightClass ? flightClass.charAt(0).toUpperCase() + flightClass.slice(1) : 'N/A'}
        </Typography>
        <Typography variant="body2" component="p">
          Available Seats: {availableSeats}
        </Typography>
        <Typography variant="body2" component="p">
          <AttachMoneyIcon /> Price: ${flightClass === 'economy' ? (prices ? prices.economy : 'N/A') : (prices ? prices.business : 'N/A')}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
          <Typography variant="body2" component="p">
            Status:
          </Typography>
          {status === 'scheduled' && <ScheduleIcon color="success" />}
          {status === 'cancelled' && <CancelIcon color="error" />}
          {status === 'postponed' && <UpdateIcon color="warning" />}
        </Box>
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

export default FlightCard;