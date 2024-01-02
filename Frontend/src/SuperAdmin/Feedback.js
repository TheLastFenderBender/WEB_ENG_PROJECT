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
                <table className='feedbackTable'>
                    <thead>
                        <tr>
                            <th>Details</th>
                            <th>UserID</th>
                            <th>RATING</th>
                        </tr>
                    </thead>
                    <tbody>
                        {feedback.map((feedbackItem) => {
                            return (
                                <tr key={feedbackItem._id}>
                                    <td>{feedbackItem.description}</td>
                                    <td>{feedbackItem.userID}</td>
                                    <td>{feedbackItem.rating}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}