import React, {  useState } from 'react';
import UserNavbar from './UserNavbar'; // Import UserNavbar component
import './Refund.css'; // Import CSS file for styling
import { Link, useParams, useNavigate } from 'react-router-dom';



const RefundPage = () => {
    const navigate = useNavigate();

    const { userId, bookingNumber } = useParams();
    // console.log(bookingNumber);
    const [bookingDetails, setBookingDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [cancellationReason, setCancellationReason] = useState('');
    const [refundAmount, setRefundAmount] = useState(0);
    const [refundMethod, setRefundMethod] = useState('');
    const [additionalComments, setAdditionalComments] = useState('');

    // console.log('bookingnunber',bookingDetails.bookingNumber);
    const handleCancellationReason = (reason) => {
        setCancellationReason(reason);
    };

    const handleRefundAmountChange = (e) => {
        setRefundAmount(e.target.value);
    };

    const handleRefundMethodChange = (e) => {
        setRefundMethod(e.target.value);
    };

    const handleAdditionalCommentsChange = (e) => {
        setAdditionalComments(e.target.value);
    };

    const fetchBookingDetails = async () => {
        try {
            const response = await fetch(`http://localhost:3000/bookings/${bookingNumber}`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setBookingDetails(data); // Set fetched booking details into state
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    // Fetch data immediately when the component mounts
    fetchBookingDetails();

    const handleConfirmRefund = async () => {
        try {
            const response = await fetch(`http://localhost:3000/bookings/refund/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    // paymentStatus: 'refunded', // Update payment status to 'refunded'
                    refundedAmount: refundAmount,
                    refundMethod: refundMethod,
                    comment: additionalComments,
                    reason: cancellationReason,
                    refundStatus: 'Processed',
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update payment status');
            }
            navigate(`/UserDashBoard`);

            // else {
            //     try {
            //         const response = await fetch(`http://localhost:3000/bookings/${bookingNumber}/refundPay`, {
            //             method: 'PATCH', // Change to PUT if needed
            //             headers: {
            //                 'Content-Type': 'application/json',
            //             },
            //             body: JSON.stringify({
            //                 paymentStatus: 'refunded',
            //             }),
            //         });

            //         if (!response.ok) {
            //             throw new Error('Failed to update payment status');
            //         }

            //         // Handle success for updating payment status to "refunded"
            //     } catch (error) {
            //         console.error('Error updating payment status:', error);
            //         // Handle error scenario
            //     }
            // }

            // Handle success, maybe navigate to a success page or perform other actions
        } catch (error) {
            console.error('Error confirming refund:', error);
            // Handle error scenario
        }
    };


    if (loading) {
        return <div>Loading...</div>;
    }

    if (!bookingDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div className="refund-page">
            <UserNavbar /> {/* Display UserNavbar component */}
            <h2>Refund Details</h2>

            <div className="refund-container">

                {/* Booking ID Section */}
                <div className="section">
                    <h3>Booking ID</h3>
                    <hr/>
                    <p>{bookingDetails.bookingNumber}</p>
                </div>

                {/* Flight Details Section */}
                <div className="section">
                    <h3>Flight Details</h3>
                    <hr/>
                    {/* Display airline, flight number, date */}
                    <p>Airline: {bookingDetails.flightDetails.airline}</p>
                    <p>Flight Number: {bookingDetails.flightNumber}</p>
                    <p>Date of Flight: {bookingDetails.flightDetails.date}</p>
                    <p>Seat Number: {bookingDetails.seatNumber}</p>
                    <p>Payment Status: {bookingDetails.paymentStatus}</p>
                </div>

                {/* Cancellation Reason Section */}
                <div className="section">
                    <h3>Cancellation Reason</h3>
                    <hr />

                    <select onChange={(e) => handleCancellationReason(e.target.value)}>
                        <option value="">Select a reason</option>
                        <option value="Change of plans">Change of plans</option>
                        <option value="Personal reasons">Personal reasons</option>
                        <option value="Flight change/cancellation">Flight change/cancellation</option>
                    </select>
                </div>

                {/* Refund Details Section */}
                <div className="section">
                    <h3>Refund Details</h3>
                    <hr />

                    <div className="refund-info">
                        <label>Refund Amount:</label>
                        <input
                            type="number"
                            value={refundAmount}
                            onChange={handleRefundAmountChange}
                            placeholder="Enter refund amount"
                        />
                        <label>Refund Method:</label>
                        <select value={refundMethod} onChange={handleRefundMethodChange}>
                            <option value="">Select refund method</option>
                            <option value="Credit card">Credit card</option>
                            <option value="Bank transfer">Bank transfer</option>
                            <option value="PayPal">PayPal</option>
                            {/* Add more options as needed */}
                        </select>
                        <label>Additional Comments:</label>
                        <textarea
                            value={additionalComments}
                            onChange={handleAdditionalCommentsChange}
                            placeholder="Enter additional comments"
                        ></textarea>
                    </div>
                </div>

                {/* Buttons */}
                <div className="buttons">
                    <button className="confirm-button" onClick={handleConfirmRefund}>Confirm Refund</button>
                    <button className="cancel-button">Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default RefundPage;
