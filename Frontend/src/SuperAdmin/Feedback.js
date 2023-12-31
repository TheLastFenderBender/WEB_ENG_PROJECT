import React, { useEffect, useState } from 'react';
import NavBar from './SuperAdminNavbar';
import './SuperAdminStyles/Feedback.css';
import './SuperAdminStyles/SuperAdminPage.css';

export default function Feedback() {

    const [feedback, setFeedback] = useState([]);

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const feedbacksResponse = await fetch('/feedback');
                const feedbackData = await feedbacksResponse.json();
                setFeedback(feedbackData);
            } catch (error) {
                console.error("Error fetching feedbacks: ", error);
            }
        }

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
                <table className='feedbackTable'>
                    <th>
                        <td>#</td>
                        <td>Description</td>
                        <td>UserID</td>
                        <td>BookingID</td>
                        <td>Flight No.</td>
                        <td>RATING</td>
                    </th>
                    {feedback.map((feedback) => {
                        <tr>
                            <td>{feedback._id}</td>
                            <td>{feedback.description}</td>
                            <td>{feedback.userID}</td>
                            <td>{feedback.bookingID}</td>
                            <td>{feedback.flightNumber}</td>
                            <td>{feedback.rating}</td>
                        </tr>
                    })}
                </table>
            </div>

        </>
    )
}