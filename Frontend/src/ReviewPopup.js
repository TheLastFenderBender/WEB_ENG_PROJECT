import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ReviewPopup.css';
import NavBar from './UserNavbar';

const ReviewPopup = () => {
    const navigate = useNavigate(); // Initialize useNavigate

    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0);

    const handleReviewSubmit = () => {
        // Perform actions for submitting the review
        // For example, sending the review and rating to a backend API

        // After submission, navigate back to the final booking page
        navigate('/FinalBooking'); // Navigate back to the FinalBooking page
    };

    
    return (
        <div>
               <NavBar/>
        <div className="review-popup">
            <h2>Feedback</h2>
                <div className="feedback-container">
                    <label htmlFor="review">Review:</label>
                    <textarea
                        id="review"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        rows="4"
                        cols="50"
                    />
                </div>
                <div className="ratings-container">
                    <label htmlFor="ratings">Ratings:</label>
                    <input
                        type="number"
                        id="ratings"
                        min="1"
                        max="5"
                        value={rating}
                        onChange={(e) => setRating(parseInt(e.target.value))}
                    />
                </div>
                <button onClick={handleReviewSubmit}>Submit</button>
            </div>
            </div>
    );
};

export default ReviewPopup;
