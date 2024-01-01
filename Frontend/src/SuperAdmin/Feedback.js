import React, { useEffect, useState } from 'react';
import NavBar from './SuperAdminNavbar';
import './SuperAdminStyles/Feedback.css';
import './SuperAdminStyles/SuperAdminPage.css';
import Axios from 'axios';


export default function Feedback() {

    const [feedback, setFeedback] = useState([]);

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const feedbacksResponse = await Axios.get('http://localhost:3000/feedback');
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
                <table className='feedbackTable'>

                        <th>#</th>
                        <th>Details</th>
                        <th>UserID</th>
                        <th>BookingID</th>
                        <th>RATING</th>

                    {feedback.map((feedback) => {
                        <tr>
                            <td>{feedback._id}</td>
                            <td>{feedback.description}</td>
                            <td>{feedback.userID}</td>
                            <td>{feedback.bookingID}</td>
                            <td>{feedback.rating}</td>
                        </tr>
                    })}
                </table>
            </div>

        </>
    )
}