import React, { useState } from 'react';
import './FeedbackPopup.css';


const FeedbackPopup = ({ onClose, userId, flightNumber, bookingId }) => {
    const [description, setDescription] = useState('');
    const [rating, setRating] = useState(1);

    const handleSubmit = async () => {
        // Logic to send feedback data to the server
        try {
            const response = await fetch(`http://localhost:3000/bookings/${bookingId}/feedback`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    description,
                    userID: userId,
                    bookingId,
                    flightNumber,
                    rating,
                }),
            });

            if (response.ok) {
                console.log('Feedback submitted successfully!');
                // Close the feedback popup
                onClose();
            } else {
                console.error('Failed to submit feedback.');
            }
        } catch (error) {
            console.error('Error submitting feedback:', error);
        }
    };

    return (
        <div className="feedback-popup">
            <h2>Give Feedback</h2>
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter your feedback..."
            ></textarea>
            <label>
                Rating:
                <input
                    type="number"
                    min="1"
                    max="5"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                />
            </label>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default FeedbackPopup;
