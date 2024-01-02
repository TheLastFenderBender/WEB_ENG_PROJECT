import React, { useState, useEffect } from 'react';
import UserNavBar from './UserNavbar';
import  FlightDetail from './FlightDetail';

import './FinalBooking.css';
import { useNavigate, useParams, Link } from 'react-router-dom';

const FinalBooking = () => {
    const { userId, flightNumber } = useParams();
    const numericUserId = parseInt(userId, 10); // Assuming userId is a string representing an integer
    console.log(typeof numericUserId);
    const navigate = useNavigate();
    const [selectedFlight, setSelectedFlight] = useState(null);
    const [userName, setUserName] = useState('');

    const [showReviewPopup, setShowReviewPopup] = useState(false);
    const [review, setReview] = useState('');
    const [ratings, setRatings] = useState(0);
    const [showFlightDetail, setShowFlightDetail] = useState(false);
    // Mock user name for demonstration purposes, replace with actual user data

    const handleSeatSelection = () => {
        navigate('/SeatSelection');
    };

    const handleReview = () => {
        setShowReviewPopup(true);
    };

    const handleSubmitReview = async () => {
        try {
            const response = await fetch('http://localhost:3000/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    description: review, 
                    rating: ratings,
                    userID: numericUserId,
                    flightNumber: selectedFlight.flightNumber,
                }),
            });

            if (response.ok) {
                // Handle success, e.g., close the popup, reset state, etc.
                setShowReviewPopup(false);
                setReview('');
                setRatings(0);
            } else {
                console.error('Failed to submit feedback');
            }
        } catch (error) {
            console.error('Error submitting feedback:', error);
        }
        // setShowReviewPopup(false);
        // // Reset the review and ratings after submission
        // setReview('');
        // setRatings(0);
    };

    const fetchFlightDetails = async () => {
        try {
            const response = await fetch(`http://localhost:3000/flights/${flightNumber}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                setSelectedFlight(data);
            } else {
                console.error('Failed to fetch flight details.');
            }
        } catch (error) {
            console.error('Error fetching flight details:', error);
        }
    };

    useEffect(() => {
        fetchFlightDetails();
    }, [flightNumber]);

    if (!selectedFlight) {
        return <div>Loading...</div>;
    }

    const fetchUserDetails = async () => {
        try {
            const response = await fetch(`http://localhost:3000/users/${numericUserId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const userData = await response.json();
                setUserName(userData.username); // Assuming username field is available in user data
            } else {
                console.error('Failed to fetch user details.');
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

        fetchFlightDetails();
        fetchUserDetails(); // Fetch user details when the component mounts
 

    return (
        <div>
            <UserNavBar />
            <h2 style={{ textAlign: 'center', marginTop: '10px' }}>Who's Traveling?</h2>
            <div style={{ textAlign: 'center', marginTop: '10px' }}>
                <p>Name: {userName}</p>
            </div>
            <div className="container">
                <h3>Trip Details</h3>
                <p>Airline: {selectedFlight.airline}</p>
                <p>From: {selectedFlight.departure}</p>
                <p>To: {selectedFlight.arrival}</p>
                <p>Date: {selectedFlight.date}</p>
                <p>Time: {selectedFlight.time}</p>
                <Link to="#" onClick={() => setShowFlightDetail(true)}>Flight Details</Link>
                {/* <Link to={`/FlightDetail`}>Flight Details</Link> */}
                <hr />
                <p>Grand Total: ${selectedFlight.price}</p>
                <hr />
                <Link to={`/SeatSelection/${userId}/${flightNumber}`}>
                    <button onClick={handleSeatSelection}>Choose Seat</button>
                </Link>
                <br/>
                <button onClick={handleReview}>Review</button>
            </div>

            {showReviewPopup && (
                <div className="review-popup">
                    <button className="close-button" onClick={() => setShowReviewPopup(false)}>
                        X
                    </button>
                    <h2 style={{ textAlign: 'center' }}>Feedback</h2>
                    <label>
                        Review:
                        <textarea
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            rows={4}
                            cols={50}
                        />
                    </label>
                    <label>
                        Ratings:
                        <input
                            type="number"
                            value={ratings}
                            onChange={(e) => setRatings(parseInt(e.target.value))}
                            min={0}
                            max={5}
                        />
                    </label>
                    <button onClick={handleSubmitReview}>Submit</button>
                </div>
            )}

            {showFlightDetail && (
                <div className="overlay">
                    <div className="centered-popup">
                        <FlightDetail
                            flightDetails={selectedFlight}
                            onClose={() => setShowFlightDetail(false)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default FinalBooking;
