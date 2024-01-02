import React, { useEffect, useState } from 'react';
import NavBar from './SuperAdminNavbar';
import './SuperAdminStyles/Feedback.css';
import './SuperAdminStyles/SuperAdminPage.css';
import Axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

export default function Feedback() {

    const [feedback, setFeedback] = useState([]);

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const feedbacksResponse = await Axios.get('http://127.0.0.1:3000/feedback');
                setFeedback(feedbacksResponse.data);
            } catch (error) {
                console.error('Error fetching feedbacks: ', error);
            }
        };

        fetchFeedbacks();
    }, []);

    return (
        <>
            <NavBar></NavBar>
            <div className='SATitle'>
                <h1>User Feedback</h1>
                <h3>View Feedback from Users</h3>
            </div>
            <div className='feedbackContainer'>
                <TableContainer component={Paper}>
                    <Table className='feedbackTable' aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Details</TableCell>
                                <TableCell>UserID</TableCell>
                                <TableCell>RATING</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {feedback.map((feedbackItem) => {
                                return (
                                    <TableRow key={feedbackItem._id}>
                                        <TableCell>{feedbackItem.description}</TableCell>
                                        <TableCell>{feedbackItem.userID}</TableCell>
                                        <TableCell>{feedbackItem.rating}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    )
}