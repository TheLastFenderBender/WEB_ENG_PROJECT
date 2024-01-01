import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardActions, Typography, Button } from '@mui/material';
import { Box } from '@mui/system';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import CompassCalibrationIcon from '@mui/icons-material/CompassCalibration';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const RouteCard = ({ route }) => {
    const { routeID, departure, arrival, distance, travelTime, active } = route;

    const handleDeleteClick = async () => {
        try {
            if (active) {
                alert("Route is active, cannot delete!");
                return;
            }
            console.log(routeID);
            const response = await axios.delete(`http://localhost:3000/routes/${routeID}`);
            console.log(response.data);
            alert("Route deleted successfully!");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Card>
            <CardContent>
                <Typography variant="h5" component="h2">
                    Route: {routeID}
                </Typography>
                <Typography color="textSecondary">
                    <FlightTakeoffIcon /> Departure: {departure}
                </Typography>
                <Typography color="textSecondary">
                    <FlightLandIcon /> Arrival: {arrival}
                </Typography>
                <Typography color="textSecondary">
                    <CompassCalibrationIcon /> Distance: {distance}
                </Typography>
                <Typography color="textSecondary">
                    <AccessTimeIcon /> Travel Time: {travelTime}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                    <Typography variant="body2" component="p">
                        Active:
                    </Typography>
                    {active ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}
                </Box>
            </CardContent>
            <CardActions>
                <Link to={`/updateroute/${routeID}`}>
                    <Button size="small" color="secondary">Edit</Button>
                </Link>
                <Button size="small" color="secondary" onClick={() => handleDeleteClick()}>Delete</Button>
            </CardActions>
        </Card>
    );
};

export default RouteCard;