import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardActions, Typography, Button } from '@mui/material';
import { Box } from '@mui/system';
import FlightIcon from '@mui/icons-material/Flight';
import ModelIcon from '@mui/icons-material/ModelTraining';
import PeopleIcon from '@mui/icons-material/People';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

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
                    <FlightIcon /> Aircraft: {aircraftID}
                </Typography>
                <Typography color="textSecondary">
                    <ModelIcon /> Model: {model}
                </Typography>
                <Typography color="textSecondary">
                    <PeopleIcon /> Capacity: {capacity}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                    <Typography variant="body2" component="p">
                        Active: 
                    </Typography>
                    {active ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}
                </Box>
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