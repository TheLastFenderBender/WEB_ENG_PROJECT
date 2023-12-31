import React, { useEffect, useState } from 'react';
import NavBar from './SuperAdminNavbar';

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

            </div>

        </>
    )
}