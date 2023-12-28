// Import React and Material-UI components
import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardActions, Typography, Button } from '@mui/material';

const AircraftCard = ({ aircraft }) => {
    const { aircraftID, model, capacity, active } = aircraft;


    const handleDeleteClick = async () => {
        try {
            if (active) {
                alert("Aircraft is active, cannot delete!");
                return;
            }
            console.log(aircraftID);
            const response = await axios.delete(`http://localhost:3000/aircrafts/${aircraftID}`);
            console.log(response.data);
            alert("Aircraft deleted successfully!");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Card>
            <CardContent>
                <Typography variant="h5" component="h2">
                    Aircraft: {aircraftID}
                </Typography>
                <Typography color="textSecondary">
                    Model: {model}
                </Typography>
                <Typography color="textSecondary">
                    Capacity: {capacity}
                </Typography>
                <Typography variant="body2" component="p">
                    Active: {active? "Yes" : "No"}
                </Typography>
            </CardContent>
            <CardActions>
                <Link to={`/updateaircraft/${aircraftID}`}>
                    <Button size="small" color="secondary">Edit</Button>
                </Link>
                <Button size="small" color="secondary" onClick={() => handleDeleteClick()}>Delete</Button>
            </CardActions>
        </Card>
    );
};

export default AircraftCard;