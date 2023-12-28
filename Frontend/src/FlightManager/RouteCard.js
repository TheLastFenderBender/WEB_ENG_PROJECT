// Import React and Material-UI components
import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardActions, Typography, Button } from '@mui/material';

// Define a function that takes a route object as a prop and returns a JSX element
const RouteCard = ({ route }) => {
    // Destructure the route object to get the relevant properties
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

    // Return the JSX element
    return (
        <Card>
            <CardContent>
                <Typography variant="h5" component="h2">
                    Route: {routeID}
                </Typography>
                <Typography color="textSecondary">
                    departure: {departure}
                </Typography>
                <Typography color="textSecondary">
                    Arrival: {arrival}
                </Typography>
                <Typography color="textSecondary">
                    Distance: {distance}
                </Typography>
                <Typography color="textSecondary">
                    Travel Time: {travelTime}
                </Typography>
                <Typography variant="body2" component="p">
                    Active: {active? "Yes" : "No"}
                </Typography>
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

// Export the component
export default RouteCard;