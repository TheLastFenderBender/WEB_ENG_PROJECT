import React, { useState } from 'react';
import UserNavbar from './UserNavbar';
import './UserPayment.css';
import { useNavigate, useParams } from 'react-router-dom';

const UserPayment = () => {

    const { bookingNumber } = useParams();
    const [cardDetails, setCardDetails] = useState({
        cardType: '',
        cardNumber: '',
        cardExpiry: '',
        cvv: '',
        nameOnCard: '',
        agreeTerms: false,
    });

    const navigate = useNavigate();
    const cardTypeOptions = ['Visa', 'MasterCard', 'American Express'];
    const [paymentSuccess, setPaymentSuccess] = useState(false); // State to manage payment success pop-up

    const handleInputChange = (e) => {
        const { name, value, checked, type } = e.target;
        setCardDetails((prevDetails) => ({
            ...prevDetails,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleGenerateInvoice = (invoiceDetails) => {
        // Logic to generate invoice
        // Logic to generate the invoice based on provided details
        // This could involve formatting the details, creating a PDF, etc.

        // For example, creating a simple invoice string
        const invoiceString = `
        Invoice Details:
        ---------------------------
        Name: ${invoiceDetails.name}
        Flight Number: ${invoiceDetails.flightNumber}
        Date: ${invoiceDetails.date}
        Total Amount: ${invoiceDetails.amount}
        // Add more details as needed
    `;

        const popup = document.createElement('div');
        popup.classList.add('invoice-popup');

        // Close button creation
        const closeButton = document.createElement('button');
        closeButton.textContent = 'Close';
        closeButton.classList.add('close-button');
        closeButton.addEventListener('click', () => {
            // Remove the invoice popup on close button click
            document.body.removeChild(popup);
        });
        popup.appendChild(closeButton);
        const invoiceText = document.createElement('textarea');
        invoiceText.value = invoiceString;
        invoiceText.setAttribute('readonly', true);
        invoiceText.classList.add('invoice-text');
        popup.appendChild(invoiceText);

        const downloadButton = document.createElement('button');
        downloadButton.textContent = 'Download Invoice';
        downloadButton.classList.add('download-button');
        downloadButton.addEventListener('click', () => {
            // Logic to download the invoice here
            // Replace this with your actual download logic
            // For example, creating a download link
            const invoiceBlob = new Blob([invoiceString], { type: 'text/plain' });
            const downloadLink = document.createElement('a');
            downloadLink.href = URL.createObjectURL(invoiceBlob);
            downloadLink.download = 'invoice.txt';
            downloadLink.click();
        });
        popup.appendChild(downloadButton);

        // Append the popup to the document body or any desired container
        document.body.appendChild(popup);
    };

    const handleConfirmPayment = async () => {
        try {

            const dataToSend = {
                ...cardDetails,
                bookingNumber: bookingNumber // assuming bookingNumber is available in the scope
            };

            // Store payment details
            const paymentResponse = await fetch('http://localhost:3000/storepayment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend), // Sending the payment details
            });

            // Check if storing payment details was successful
            if (paymentResponse.ok) {
                // Update booking/payment status
                const bookingResponse = await fetch(`http://localhost:3000/bookings/${bookingNumber}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                // Check if updating booking/payment status was successful
                if (bookingResponse.ok) {
                    // Both operations succeeded
                    setPaymentSuccess(true);
                    navigate('/UserDashboard');
                } else {
                    // Handle the scenario when updating booking/payment status fails
                    // Show an error message or take necessary actions
                }
            } else {
                // Handle the scenario when storing payment details fails
                // Show an error message or take necessary actions
            }
        } catch (error) {
            // Handle network errors or other exceptions
            console.error('Error:', error);
        }

        
    };

    return (
        <div>
            <UserNavbar />
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <h2>Payment</h2>
                <div style={{ border: '1px solid #ccc', padding: '20px', maxWidth: '600px', margin: '0 auto' }}>

                    <h3>Select Your Preferred Payment Method</h3>
                    <div style={{ marginTop: '10px' }}>
                        {/* Dropdown for card type selection */}
                        <select
                            name="cardType"
                            value={cardDetails.cardType}
                            onChange={handleInputChange}
                            style={{ width: '100%', padding: '8px' }}
                        >
                            <option value="">Select Card Type</option>
                            {cardTypeOptions.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                    <hr />
                    <h3>Card Details</h3>
                    <div style={{ marginTop: '10px' }}>
                        <input
                            type="text"
                            placeholder="Card Number"
                            name="cardNumber"
                            value={cardDetails.cardNumber}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            placeholder="Card Expiry (MM/YYYY)"
                            name="cardExpiry"
                            value={cardDetails.cardExpiry}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            placeholder="CVV/CVC"
                            name="cvv"
                            value={cardDetails.cvv}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            placeholder="Name on Card"
                            name="nameOnCard"
                            value={cardDetails.nameOnCard}
                            onChange={handleInputChange}
                        />
                       
                    <br/>
                        <label>
                            <input
                                type="checkbox"
                                name="agreeTerms"
                                checked={cardDetails.agreeTerms}
                                onChange={handleInputChange}
                            />
                             I agree to the Avio Airways Terms and Conditions of payment.
                        </label>
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <a href="#" onClick={handleGenerateInvoice}>
                            Generate Invoice and Download
                        </a>
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <button onClick={handleConfirmPayment}>Confirm Payment</button>
                    </div>
                    {/* Payment success pop-up */}
                    {paymentSuccess && (
                        <div className="payment-success-popup">
                            <p>Payment done successfully!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserPayment;
